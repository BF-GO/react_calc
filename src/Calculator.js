// Calculator.js
import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";

function Calculator({ addToHistory }) {
  const [expression, setExpression] = useState("");

  // Обработка событий клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      const allowedKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "+",
        "-",
        "*",
        "/",
        "Enter",
        "Backspace",
        ".",
        "(",
        ")",
      ];

      if (allowedKeys.includes(e.key)) {
        e.preventDefault();
        if (e.key === "Enter") {
          handleCalculate();
        } else if (e.key === "Backspace") {
          handleBackspace();
        } else {
          handleButtonClick(e.key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Очистка обработчика при размонтировании компонента
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expression]);

  const handleButtonClick = (value) => {
    if (value === "C") {
      handleClear();
    } else if (value === "←") {
      handleBackspace();
    } else if (value === "=") {
      handleCalculate();
    } else {
      setExpression((prev) => prev + value);
    }
  };

  const handleClear = () => {
    setExpression("");
  };

  const handleBackspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      // Проверка на пустое выражение
      if (expression.trim() === "") {
        return;
      }
      const result = evaluate(expression);
      addToHistory(expression, result);
      setExpression(String(result));
    } catch (error) {
      alert("Ошибка в выражении");
    }
  };

  const buttons = [
    { label: "C", type: "function" },
    { label: "←", type: "function" },
    { label: "/", type: "operator" },
    { label: "*", type: "operator" },
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "-", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "+", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "=", type: "operator" },
    { label: "0", type: "number", className: "zero" },
    { label: ".", type: "number" },
    { label: "(", type: "operator" },
    { label: ")", type: "operator" },
  ];

  return (
    <div className="calculator">
      <input type="text" value={expression} readOnly placeholder="0" />

      <div className="buttons">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className={`button ${btn.type} ${
              btn.className ? btn.className : ""
            }`}
            onClick={() => handleButtonClick(btn.label)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
