import React from "react";
import classes from "./TodoBox.module.css";
import { useState } from "react";
import { type } from "os";

interface ToDo {
  tarefa: string;
  todoId: number;
  isDone: boolean;
}
interface Props {
  key: number;
  toDo: ToDo;
  addToDo: React.Dispatch<React.SetStateAction<boolean>>;
}

function TodoBox(props: Props) {
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const toDoB = props.toDo;

  function handleDeleteBtn() {
    setDeleteConfirm(!deleteConfirm);
  }
  function handleDeleteNot() {
    setDeleteConfirm(false);
  }

  function deleteToDo() {
    console.log(toDoB);
    console.log(toDoB.tarefa, toDoB);
    let key = toDoB.todoId;
    fetch("https://localhost:7293/api/ToDo/" + key, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        props.addToDo((prev) => !prev);
      })
      .catch((error) => {
        console.error("erro ao tentar deletar tarefa", error);
      });
  }

  const deleteConfirmBox = (
    <div className={classes.confirmBtn}>
      <button
        className={`${classes.confirmDeleteBtn} ${classes.yesDeleteBtn}`}
        onClick={deleteToDo}
      >
        <span>YES</span>
      </button>
      <button
        className={`${classes.confirmDeleteBtn} ${classes.noDeleteBtn}`}
        onClick={handleDeleteNot}
      >
        <span>NO</span>
      </button>
    </div>
  );

  function handleDoneBtn() {
    console.log(toDoB);
    console.log(toDoB.tarefa, toDoB);
    let key = toDoB.todoId;
    toDoB.isDone = !toDoB.isDone;
    fetch("https://localhost:7293/api/ToDo/" + key, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDoB),
    })
      .then((response) => {
        console.log(response);
        props.addToDo((prev) => !prev);
      })
      .catch((error) => {
        console.error("erro ao tentar deletar tarefa", error);
      });
  }

  return (
    <div className={classes.box}>
      <div className={classes.btns}>
        <button onClick={handleDeleteBtn}>
          {deleteConfirm ? <span>Delete ? </span> : <span>x</span>}
        </button>
        {deleteConfirm ? deleteConfirmBox : null}
      </div>
      <div>
        <p className={classes.titulo}>{toDoB.tarefa}</p>
      </div>
      <div className={classes.btns}>
        <button onClick={handleDoneBtn}>
          <span>&gt;</span>
        </button>
      </div>
    </div>
  );
}

export default TodoBox;
