import React, { useState, useEffect } from "react";
import "./Pomodoro.css";

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // Default to 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("pomodoro"); // "pomodoro", "shortBreak", "longBreak"
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [newPomodoroTime, setNewPomodoroTime] = useState(25);
  const [newShortBreakTime, setNewShortBreakTime] = useState(5);
  const [newLongBreakTime, setNewLongBreakTime] = useState(10);

  // Timer countdown logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsRunning(false); // Stop timer when it reaches 0
      alert("Time's up!");
    }
  }, [isRunning, timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleStartPause = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setIsRunning(false);
    if (mode === "pomodoro") setTimeLeft(newPomodoroTime * 60);
    else if (mode === "shortBreak") setTimeLeft(newShortBreakTime * 60);
    else if (mode === "longBreak") setTimeLeft(newLongBreakTime * 60);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === "pomodoro") setTimeLeft(newPomodoroTime * 60);
    else if (newMode === "shortBreak") setTimeLeft(newShortBreakTime * 60);
    else if (newMode === "longBreak") setTimeLeft(newLongBreakTime * 60);
  };

  const handleSaveSettings = () => {
    setIsSettingsOpen(false);
    handleReset(); // Reset the timer with updated values
  };

  const handleCloseSettings = () => setIsSettingsOpen(false);

  return (
    <div className="pomodoro-timer">
      <div className="timer-content">
        <div className="timer-modes">
          <button
            className={`mode-button ${mode === "pomodoro" ? "active" : ""}`}
            onClick={() => handleModeChange("pomodoro")}
          >
            Pomodoro
          </button>
          <button
            className={`mode-button ${mode === "shortBreak" ? "active" : ""}`}
            onClick={() => handleModeChange("shortBreak")}
          >
            Short Break
          </button>
          <button
            className={`mode-button ${mode === "longBreak" ? "active" : ""}`}
            onClick={() => handleModeChange("longBreak")}
          >
            Long Break
          </button>
        </div>

        <div className="timer-display">{formatTime(timeLeft)}</div>

        <div className="timer-controls">
          <button className="control-button" onClick={handleStartPause}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className="control-button reset-button" onClick={handleReset}>
            ↺
          </button>
          <button className="control-button" onClick={() => setIsSettingsOpen(true)}>
            ⚙
          </button>
        </div>
      </div>

      {isSettingsOpen && (
        <div className="settings-modal">
          <div className="settings-content">
            <h3>Timer Settings</h3>
            <div className="settings-item">
              <label htmlFor="pomodoro">Pomodoro</label>
              <input
                type="number"
                id="pomodoro"
                value={newPomodoroTime}
                onChange={(e) => setNewPomodoroTime(Number(e.target.value))}
              />
              <div className="unit">minutes</div>
            </div>
            <div className="settings-item">
              <label htmlFor="shortBreak">Short Break</label>
              <input
                type="number"
                id="shortBreak"
                value={newShortBreakTime}
                onChange={(e) => setNewShortBreakTime(Number(e.target.value))}
              />
              <div className="unit">minutes</div>
            </div>
            <div className="settings-item">
              <label htmlFor="longBreak">Long Break</label>
              <input
                type="number"
                id="longBreak"
                value={newLongBreakTime}
                onChange={(e) => setNewLongBreakTime(Number(e.target.value))}
              />
              <div className="unit">minutes</div>
            </div>
            <div className="settings-actions">
              <button className="save-button" onClick={handleSaveSettings}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCloseSettings}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pomodoro;
