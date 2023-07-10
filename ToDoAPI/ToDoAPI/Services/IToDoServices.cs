using System.Reflection.Metadata.Ecma335;
using ToDoAPI.Models;

namespace ToDoAPI.Services
{
    public interface IToDoServices
    {
        void AddToDo(ToDo ToDO);

        List<ToDo> GetAllToDo();
    }
}
