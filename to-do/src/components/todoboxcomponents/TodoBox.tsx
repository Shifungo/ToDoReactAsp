import React from "react";
import classes from "./TodoBox.module.css";
import { useState } from "react";

interface ToDo {
  tarefa: string;
  id: number;
}

function TodoBox(props: { key: number; toDo: ToDo }) {
  const [toDo, setToDo] = useState(props.toDo);

  return (
    <div className={classes.box}>
      <div>
        <h1 className={classes.titulo}>{toDo.tarefa}</h1>
      </div>
      <div>
        <button>
          <span>-</span>
        </button>
        <button>
          <span>x</span>
        </button>
      </div>
    </div>
  );
}

export default TodoBox;
