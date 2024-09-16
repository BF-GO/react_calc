// App.js
import React, { useState, useEffect } from "react";
import Calculator from "./Calculator";
import History from "./History";
import "./styles.css";

function App() {
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Сохранение темы в localStorage для сохранения состояния при обновлении страницы
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const addToHistory = (expression, result) => {
    setHistory([{ expression, result }, ...history]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="App">
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Светлая тема" : "Тёмная тема"}
      </button>
      <Calculator addToHistory={addToHistory} />
      <History history={history} />
    </div>
  );
}

export default App;
