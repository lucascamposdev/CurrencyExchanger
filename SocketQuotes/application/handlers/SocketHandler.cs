using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SocketQuotes.application.services;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Threading;
using System.Collections.Concurrent;

namespace SocketQuotes.application.handlers;

public static class SocketHandler
{
    private static readonly ConcurrentDictionary<WebSocket, ClientState> _clients = new();

    public static async Task HandleAsync(WebSocket webSocket, SocketService quoteService)
    {
        var buffer = new byte[1024 * 4];
        WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

        if (result.MessageType == WebSocketMessageType.Text && !result.CloseStatus.HasValue)
        {
            try
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                var request = JObject.Parse(message);

                // Remove the existing ClientState if it exists
                if (_clients.TryGetValue(webSocket, out var existingState))
                {
                    existingState.Timer?.Change(Timeout.Infinite, 0); 
                }

                var currency = request["currency"]?.ToString() ?? "USD";

                // Create and store the new ClientState
                var clientState = new ClientState(currency);
                _clients[webSocket] = clientState;

                clientState.Timer = new Timer(async _ =>
                    await SendQuotesPeriodically(webSocket, quoteService, clientState),
                    null, TimeSpan.Zero, TimeSpan.FromMinutes(1));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error handling initial WebSocket message: {ex.Message}");
            }
        }

        while (!result.CloseStatus.HasValue)
        {
            result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
        }

        if (_clients.TryRemove(webSocket, out var state))
        {
            state.Timer?.Change(Timeout.Infinite, 0);
            state.Timer?.Dispose(); 
        }

        await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
    }

    private static async Task SendQuotesPeriodically(WebSocket webSocket, SocketService quoteService, ClientState clientState)
    {
        try
        {
            if (webSocket.State == WebSocketState.Open)
            {
                var apiResponse = await quoteService.GetQuotesAsync(clientState.Currency);
                var responseMessage = JsonConvert.SerializeObject(apiResponse);
                var messageBuffer = Encoding.UTF8.GetBytes(responseMessage);

                await webSocket.SendAsync(new ArraySegment<byte>(messageBuffer), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending periodic quotes: {ex.Message}");
        }
    }

    private class ClientState
    {
        public string Currency { get; }
        public Timer Timer { get; set; }

        public ClientState(string currency)
        {
            Currency = currency;
        }
    }
}
