using Microsoft.EntityFrameworkCore;
using ToDoAPI.Models;
using ToDoAPI.Services;

var MyAllowSpecificOrigins = "_myAllowSpecifcOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TodoContext>(options =>
{
    options.UseMySql("server=127.0.0.1;uid=root;pwd=533266;database=todos", ServerVersion.AutoDetect("server=127.0.0.1;uid=root;pwd=533266;database=todos"));
});
builder.Services.AddScoped<IToDoServices, ToDoServices>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
