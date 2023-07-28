using Microsoft.AspNetCore.Mvc;
using ToDoAPI.Models;
using ToDoAPI.Services;

namespace ToDoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly IToDoServices _toDoServices;
        public ToDoController(IToDoServices toDoServices)
        {
            _toDoServices = toDoServices;
        }


        [HttpPost]
        public ToDo Post([FromBody] ToDo tarefa)
        {
            _toDoServices.AddToDo(tarefa);

            return tarefa;
        }
        [HttpGet]
        public List<ToDo> GetAll()
        {
            return _toDoServices.GetAllToDo(); 
        }
        [HttpDelete("/api/ToDo/{id}")] 
        public IActionResult Delete (int id)

        {
            _toDoServices.DeleteToDo(id);
            return Ok();
        }
        [HttpPut("/api/ToDo/{id}")]
        public IActionResult Put(int id) 
        {
            _toDoServices.PutTodo(id);
            return Ok(id);
        }
    }
}
