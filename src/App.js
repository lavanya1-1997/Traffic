import React, { useState, useEffect } from "react";
import "./TrafficLight.css"; // CSS file for styling

const TrafficLight = () => {
  const [signal, setSignal] = useState("red"); // Default signal is red
  const [timer, setTimer] = useState(60000); // Default timer duration is 1 minute (red)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          switch (signal) {
            case "red":
              setSignal("yellow");
              setTimer(30000); // Switch to yellow after 30 seconds
              break;
            case "yellow":
              setSignal("green");
              setTimer(120000); // Switch to green after 2 minutes
              break;
            case "green":
              setSignal("red");
              setTimer(60000); // Switch to red after 1 minute
              break;
            default:
              break;
          }
        }
        return prevTimer - 1000; // Decrease timer by 1 second
      });
    }, 1000); // Repeat every 1 second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [signal]);

  const handleClick = (newSignal) => {
    setSignal(newSignal);
    clearTimeout();
    switch (newSignal) {
      case "red":
        setTimer(60000); // Set timer duration to 1 minute (red)
        break;
      case "yellow":
        setTimer(30000); // Set timer duration to 30 seconds (yellow)
        break;
      case "green":
        setTimer(120000); // Set timer duration to 2 minutes (green)
        break;
      default:
        break;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="traffic-light">
      <div
        className={`light red ${signal === "red" ? "active" : ""}`}
        onClick={() => handleClick("red")}
      >
        <span className="message">Stop</span>
      </div>
      <div
        className={`light yellow ${signal === "yellow" ? "active" : ""}`}
        onClick={() => handleClick("yellow")}
      >
        <span className="message">Ready</span>
      </div>
      <div
        className={`light green ${signal === "green" ? "active" : ""}`}
        onClick={() => handleClick("green")}
      >
        <span className="message">Go</span>
      </div>
      <div className="timer">{formatTime(timer)}</div>
    </div>
  );
};

export default TrafficLight;
