import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ReactComponent as CustomArrow } from "../assets/customArrow.svg";
// import PotatoControls from "./PotatoControls";

const PotatoGrid = forwardRef((props, ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("up");

  const moveForward = () => {
    setPosition((prev) => {
      const newPos = { ...prev };
      switch (direction) {
        case "up":
          newPos.y = Math.max(0, prev.y - 1);
          break;
        case "down":
          newPos.y = Math.min(4, prev.y + 1);
          break;
        case "left":
          newPos.x = Math.max(0, prev.x - 1);
          break;
        case "right":
          newPos.x = Math.min(4, prev.x + 1);
          break;
        default:
          console.warn(`Unexpected direction: ${direction}`);
          break;
      }
      return newPos;
    });
  };

  const handleDirectionChange = (newDirection) => {
    if (direction === newDirection) {
      moveForward();
    } else {
      setDirection(newDirection);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          handleDirectionChange("up");
          break;
        case "ArrowDown":
          handleDirectionChange("down");
          break;
        case "ArrowLeft":
          handleDirectionChange("left");
          break;
        case "ArrowRight":
          handleDirectionChange("right");
          break;
        case " ": // Space bar
          moveForward();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]); // Re-run effect if direction changes

  useImperativeHandle(ref, () => ({
    moveForward,
    handleDirectionChange,
  }));

  const renderRobot = () => {
    let rotate;

    switch (direction) {
      case "up":
        rotate = "0deg";
        break;
      case "down":
        rotate = "180deg";
        break;
      case "left":
        rotate = "-90deg";
        break;
      case "right":
        rotate = "90deg";
        break;
      default:
        rotate = "0deg";
        break;
    }

    return (
      <span
        role="img"
        aria-label="robot"
        style={{
          display: "inline-block",
          fontSize: "2rem", // Adjust size as needed
          transform: `rotate(${rotate})`,
          transition: "transform 0.3s",
        }}
      >
        🤖
      </span>
    );
  };

  return (
    <>
      <div className="potato-grid">
        {[...Array(25)].map((_, index) => {
          const x = index % 5;
          const y = Math.floor(index / 5);
          return (
            <div
              key={index}
              className={`grid-cell ${
                x === position.x && y === position.y ? "active" : ""
              }`}
            >
              {x === position.x && y === position.y && renderRobot()}
            </div>
          );
        })}
      </div>
      {/* Insert Potato Controls here */}
      <div className="control-buttons">
        <div className="button-row">
          <button
            onClick={() => handleDirectionChange("up")}
            className="control-button rotate-up"
          >
            <CustomArrow />
          </button>
        </div>
        <div className="button-row">
          <button
            onClick={() => handleDirectionChange("left")}
            className="control-button rotate-left"
          >
            <CustomArrow />
          </button>
          <button
            onClick={() => handleDirectionChange("down")}
            className="control-button rotate-down"
          >
            <CustomArrow />
          </button>
          <button
            onClick={() => handleDirectionChange("right")}
            className="control-button rotate-right"
          >
            <CustomArrow />
          </button>
        </div>
      </div>
    </>
  );
});

export default PotatoGrid;
