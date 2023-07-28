import TodoBox from "../todoboxcomponents/TodoBox";
import React, { useState, useEffect } from "react";
import classes from "./TodoList.module.css";

interface ToDo {
  tarefa: string;
  todoId: number;
  isDone: boolean;
}

function TodoList() {
  const [addToDo, setAddToDo] = useState<boolean>(false);
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [toDoL, setToDoL] = useState<JSX.Element[]>([]);
  const [doneL, setDoneL] = useState<JSX.Element[]>([]);
  const [formData, setFormData] = useState("");

  //adding drag and drop

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    position: number
  ) => {
    e.dataTransfer.setData("position", position.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    const dragPosition = e.dataTransfer.getData("position");
    const dragItem = toDoL[parseInt(dragPosition)];
    const newItems = [...toDoL];
    newItems.splice(parseInt(dragPosition), 1);
    newItems.splice(position, 0, dragItem);
    setToDoL(newItems);
  };
  //end of drag and drop

  if (toDos === undefined) {
    setToDos([{ tarefa: "", todoId: 0, isDone: false }]);
  }

  useEffect(() => {
    fetch("https://localhost:7293/api/ToDo")
      .then((response) => response.json())
      .then((data) => {
        if (data !== undefined && data.length > 0) {
          setToDos(data);
          console.log(data);
          const dones = data.filter((toDo: ToDo) => toDo.isDone);
          const notDones = data.filter((toDo: ToDo) => !toDo.isDone);

          const todoLfill = notDones.map((toDo: ToDo) => (
            <li key={toDo.todoId}>
              <TodoBox addToDo={setAddToDo} key={toDo.todoId} toDo={toDo} />
            </li>
          ));

          console.log(dones);
          const doneLfill = dones.map((toDo: ToDo) => (
            <li key={toDo.todoId}>
              <TodoBox addToDo={setAddToDo} key={toDo.todoId} toDo={toDo} />
            </li>
          ));
          setDoneL(doneLfill);
          setToDoL(todoLfill);
        } else {
          setToDos([{ tarefa: "", todoId: 0, isDone: false }]);
        }
      })
      .catch((error) => {
        console.error("erro ao tentar carregar tarefas", error);
        setToDos([{ tarefa: "", todoId: 0, isDone: false }]);
      });

    //separete the to-do and done lists
  }, [addToDo]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    const data = {
      tarefa: formData,
    };
    fetch("https://localhost:7293/api/ToDo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao cadastrar a tarefa");
        }
      })
      .then((responseData) => {
        console.log(responseData);
        addToDoHandler();
      })
      .catch((error) => {
        console.log(error);
      });
    setFormData("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(event.target.value);
  };

  const formDiv = (
    <div className={classes.addTodoFormDiv}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={formData} onChange={handleChange} />
      </form>
    </div>
  );

  function addToDoHandler() {
    setAddToDo(!addToDo);
  }

  return (
    <div className={classes.todoList}>
      <div className={classes.doesAndDones}>
        <div>
          <h2>To-Dos</h2>
        </div>
        <ul>{toDoL}</ul>
        <div className={classes.addBtnDiv}>
          {addToDo ? null : (
            <button className={classes.addBtn} onClick={addToDoHandler}>
              +
            </button>
          )}

          {addToDo ? formDiv : null}
        </div>
      </div>
      <div className={classes.donesAndDoes}>
        <h2>Dones</h2>
        <ul>{doneL}</ul>
      </div>
    </div>
  );
}

export default TodoList;
