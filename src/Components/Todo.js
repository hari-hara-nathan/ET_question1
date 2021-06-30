import React, { useState } from "react";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { Checkbox } from "@material-ui/core";
import "./Todo.css";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  let date = new Date();

  let formated_date = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const handleInput = (event) => {
    setInput(event.target.value);
  };


  const handleAdd = () => {
    if (input !== "" && input !== undefined) {
      tasks.push({
        id: tasks.length,
        todo: input,
        done: false,
      });
      setInput("");
    }
  };

  const handleDone = (event, id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.done = event.target.checked;
        }
        return task;
      }),
    );
  };


  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  
  return (
    <div className='todo'>
      <div className='header'>
        <h2 id='date'>{formated_date}</h2>
      </div>

      <div className='todo-list'>
        <ul>
          {tasks.map((task) => {
            return (
              <li className='item' id={task.id} key={task.id}>
                <Checkbox
                  checked={task.done}
                  onChange={(event) => {
                    handleDone(event, task.id);
                  }}
                  color='default'
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleChecked />}
                />
                <span
                  className={task.done ? "task-task completed" : "task-text"}>
                  {task.todo}
                </span>
                <button
                  onClick={() => {
                    handleDelete(task.id);
                  }}>
                  <CancelOutlinedIcon />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className='input-box'>
        <input
          type='text'
          placeholder='Write a new task'
          value={input}
          maxLength='24'
          onChange={handleInput}
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
              handleAdd();
            }
          }}
        />
        <button onClick={handleAdd}>+</button>
      </div>
    </div>
  );
}

export default Todo;
