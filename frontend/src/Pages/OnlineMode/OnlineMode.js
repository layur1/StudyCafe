// src/Pages/OnlineMode/OnlineMode.js
import React from "react";
import Pomodoro from "../../Components/Pomodoro/Pomodoro"; // Capital C
import TodoList from "../../Components/TodoList/TodoList"; // Capital C
import Draggable from "react-draggable";
import "./OnlineMode.css"; // local css file

const OnlineMode = () => {
  return (
    <div className="online-mode-container">
      <div className="todo-list-container">
        <TodoList />
      </div>
      <div className="pomodoro-timer-container">
        <Pomodoro />
      </div>
    </div>
  );
};

export default OnlineMode;
