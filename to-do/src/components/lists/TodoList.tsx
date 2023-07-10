import TodoBox from "../todoboxcomponents/TodoBox";
import React, { useState, useEffect } from "react";

function AddToDoForm() {
  const [formData, setFormData] = useState("");

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
      })
      .catch((error) => {
        console.log(error);
      });
    setFormData("");
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={formData} onChange={handleChange} />
      </form>
    </div>
  );
}

function TodoList() {
  const [addToDo, setAddToDo] = useState(false);
  const [addToDoForm, setAddToDoForm] = useState<JSX.Element | null>(null);
  const [toDos, setToDos] = useState([{ tarefa: "", id: 0 }]);

  if (toDos === undefined) {
    setToDos([{ tarefa: "", id: 0 }]);
  }

  useEffect(() => {
    fetch("https://localhost:7293/api/ToDo")
      .then((response) => response.json())
      .then((data) => {
        if (data !== undefined && data.length > 0) {
          setToDos(data);
        } else {
          setToDos([{ tarefa: "", id: 0 }]);
        }
      })
      .catch((error) => {
        console.error("erro ao tentar carregar tarefas", error);
        setToDos([{ tarefa: "", id: 0 }]);
      });
  }, []);

  const mapToDos = () => {
    if (toDos !== undefined && toDos.length > 0) {
      return toDos.map((toDo) => {
        return <TodoBox key={toDo.id} toDo={toDo} />;
      });
    } else {
      setToDos([{ tarefa: "adcione uma nova tarefa", id: 0 }]);
    }
  };

  function addToDoHandler() {
    setAddToDo(true);
    setAddToDoForm(<AddToDoForm />);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={addToDoHandler}>addToDO</button>
      {addToDo ? addToDoForm : null}
      {mapToDos()}
    </div>
  );
}

export default TodoList;
