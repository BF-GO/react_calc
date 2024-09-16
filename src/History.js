// History.js
import React from "react";

function History({ history }) {
  return (
    <div className="history">
      <h2>История операций</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.expression} = {item.result}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
