import React from "react";
import { useState } from "react";
import "./Main.css";

export default function Main() {
  const [screenValue, setScreenValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [operation, setOperation] = useState(null);

  const handleClick = (event) => {
    let value = event.target.innerText;
    if (value >= "0" && value <= "9") {
      let newCurrentValue = currentValue + value;
      setCurrentValue(newCurrentValue);
      if (operation) {
        setScreenValue(previousValue + " " + operation + " " + newCurrentValue);
      } else {
        setScreenValue(newCurrentValue);
      }
    } else if (value === "+" || value === "-" || value === "X" || value === "÷") {
      setPreviousValue(currentValue);
      setCurrentValue("");
      setOperation(value);
      setScreenValue(currentValue + " " + value);
    } else if (value === "=") {
      performCalculation();
    } else if (value === ".") {
      if (!currentValue.includes(".")) {
        let newCurrentValue = currentValue + value;
        setCurrentValue(newCurrentValue);
        setScreenValue(newCurrentValue);
      }
    } else if (value === "%") {
      let newCurrentValue = (parseFloat(currentValue) / 100).toString();
      setCurrentValue(newCurrentValue);
      setScreenValue(newCurrentValue);
    } else if (value === "⌫") {
      let newCurrentValue = currentValue.slice(0, -1);
      setCurrentValue(newCurrentValue);
      setScreenValue(newCurrentValue);
    } else if (value === "AC") {
      setCurrentValue("");
      setPreviousValue("");
      setOperation(null);
      setScreenValue("");
    }
  };

  const performCalculation = () => {
    if (previousValue && currentValue) {
      let result;
      if (operation === "+") {
        result = parseFloat(previousValue) + parseFloat(currentValue);
      } else if (operation === "-") {
        result = parseFloat(previousValue) - parseFloat(currentValue);
      } else if (operation === "X") {
        result = parseFloat(previousValue) * parseFloat(currentValue);
      } else if (operation === "÷") {
        result = parseFloat(previousValue) / parseFloat(currentValue);
      }
      let newCurrentValue = result.toString();
      setCurrentValue(newCurrentValue);
      setScreenValue(newCurrentValue);
      setPreviousValue("");
      setOperation(null);
    }
  };
  
  return (
    <div>
      <div className="navbar">
        <p>Calculator</p>
      </div>
      <div className="main">
        <div className="screen">{screenValue}</div>
        <div className="buttons">
          <div className="upper-lower">
            <button id="ac" onClick={handleClick}>AC</button>
            <button onClick={handleClick}>⌫</button>
            <button onClick={handleClick}>÷</button>
          </div>
          <div className="upper-lower">
            <button onClick={handleClick}>7</button>
            <button onClick={handleClick}>8</button>
            <button onClick={handleClick}>9</button>
            <button onClick={handleClick}>X</button>
          </div>
          <div className="mid">
            <button onClick={handleClick}>4</button>
            <button onClick={handleClick}>5</button>
            <button onClick={handleClick}>6</button>
            <button onClick={handleClick}>-</button>
          </div>
          <div className="lower-upper">
            <button onClick={handleClick}>1</button>
            <button onClick={handleClick}>2</button>
            <button onClick={handleClick}>3</button>
            <button onClick={handleClick}>+</button>
          </div>
          <div className="lower">
            <button onClick={handleClick}>0</button>
            <button id="dot" onClick={handleClick}>
              .
            </button>
            <button id="equal" onClick={handleClick}>
              =
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>@ayush</p>
      </div>
    </div>
  );
}
