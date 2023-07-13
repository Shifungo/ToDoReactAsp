using Microsoft.EntityFrameworkCore;
using ToDoAPI.Models;

namespace ToDoAPI.Services 
{
    public class ToDoServices : IToDoServices
    {
        private readonly TodoContext _todoContext;
        private readonly DbSet<ToDo> _toDoSet;
        public ToDoServices(TodoContext todoContext) 
        {
            _todoContext = todoContext;
            _toDoSet = _todoContext.Set<ToDo>();
        }
        public void AddToDo(ToDo toDo) 
        {
            _toDoSet.Add(toDo);
            _todoContext.SaveChanges();
        }
        public List<ToDo> GetAllToDo()
        {
           return _toDoSet.Select(x => x).ToList();
        } 
        public void DeleteToDo(int id)
        {
            var todo = _toDoSet.Where(t => t.TodoId == id).FirstOrDefault();

            if (todo != null)
            {
                _toDoSet.Remove(todo); _todoContext.SaveChanges();

            }


        }
    }
}
