using backend.application.Mapper;
using Microsoft.Extensions.Configuration;
using SocketQuotes.application.services;

var builder = WebApplication.CreateBuilder(args);

// Adicionar servi�os � cole��o de servi�os

builder.Services.AddControllers();
builder.Services.AddHttpClient();

builder.Services.AddScoped<SocketService>();

builder.Services.AddAutoMapper(typeof(MappingProfile));

var app = builder.Build();
// Habilitar suporte para WebSocket
app.UseWebSockets();

app.MapControllers();


app.Run();