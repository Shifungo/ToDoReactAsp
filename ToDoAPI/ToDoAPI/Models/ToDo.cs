using System.ComponentModel.DataAnnotations;

namespace ToDoAPI.Models

{
#pragma warning disable CS8618
    public class ToDo
    {

        public string Tarefa { get; set; }
        [Key]
        public int TodoId { get; set; }
    }
#pragma warning restore
}
