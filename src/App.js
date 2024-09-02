import React, { useState } from "react";
import "./App.css";
import PotatoGrid from "./components/PotatoGrid";

function App() {
  const gridRef = React.useRef();

  return (
    <div className="App">
      <div className="custom-nav">
        <span>🤖 Aaron Ngoi 🥔</span>
        <span className="caption-text">
          <a
            href="https://www.AaronNgoi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            See my work at AaronNgoi.com
          </a>
        </span>
      </div>
      <div className="announcement">
        <h5 className="subtitle-text">Robot Control Instructions</h5>
        <p className="plain-text">
          Use the arrow keys (↑ ↓ ← →) to change the robot's direction. Press
          the spacebar to move the robot forward. You can also use the on-screen
          buttons to control the robot.
        </p>
      </div>
      <PotatoGrid ref={gridRef} />
    </div>
  );
}

export default App;
