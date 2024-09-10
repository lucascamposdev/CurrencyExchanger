using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SocketQuotes.application.handlers;
using SocketQuotes.application.services;

namespace SocketQuotes.application.controllers;

[ApiController]
[Route("ws")]
public class SocketController : ControllerBase
{
    private readonly SocketService _socketService;

    public SocketController(SocketService quoteService)
    {
        _socketService = quoteService;
    }

    [HttpGet]
    public async Task Get()
    {
        if (HttpContext.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            await SocketHandler.HandleAsync(webSocket, _socketService);
        }
        else
        {
            HttpContext.Response.StatusCode = 400;
        }
    }
}