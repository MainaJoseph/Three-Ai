import React, { useState, useRef } from "react";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";
import { FaRedoAlt, FaUndo, FaRegClipboard } from "react-icons/fa";
import copy from "clipboard-copy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import state from "../store";

const ColorPicker = () => {
  const snap = useSnapshot(state);
  const [displayColorCode, setDisplayColorCode] = useState(false);
  const colorHistory = useRef([snap.color]);
  const historyIndex = useRef(0);

  const buttonStyle = {
    backgroundColor: snap.color,
  };

  const inputStyle = {
    width: "100%",
    borderColor: snap.color,
    paddingRight: "2rem", // Add right padding for the clipboard icon
  };

  const handleColorChange = (color) => {
    const newColor = color.hex;
    if (newColor !== snap.color) {
      colorHistory.current.splice(historyIndex.current + 1);
      colorHistory.current.push(newColor);
      historyIndex.current = colorHistory.current.length - 1;
      state.color = newColor;
    }
  };

  const undo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current--;
      state.color = colorHistory.current[historyIndex.current];
    }
  };

  const redo = () => {
    if (historyIndex.current < colorHistory.current.length - 1) {
      historyIndex.current++;
      state.color = colorHistory.current[historyIndex.current];
    }
  };

  const copyColorCode = () => {
    copy(snap.color);
    toast.success("Color code copied!");
  };

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={handleColorChange}
      />
      <div className="mt-2">
        <button
          className="text-white font-bold py-2 px-8 rounded"
          style={buttonStyle}
          onClick={() => setDisplayColorCode(!displayColorCode)}
        >
          {displayColorCode ? "Hide Color Code" : "Show Color Code"}
        </button>
        {displayColorCode && (
          <div className="mt-2" style={{ position: "relative" }}>
            <div style={{ display: "flex", position: "relative" }}>
              <input
                type="text"
                value={snap.color}
                onChange={(e) => handleColorChange({ hex: e.target.value })}
                className="border rounded-md p-2 text-center font-semibold"
                style={inputStyle}
              />
              <div
                onClick={copyColorCode}
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  right: "8px", // Adjust the right position as needed
                  cursor: "pointer",
                }}
              >
                <FaRegClipboard className="mt-2" size={25} />
              </div>
            </div>
            <div>
              <ToastContainer
                position="top-left"
                draggable:true
                className="mr-6"
                autoClose={3000}
                theme="dark"
              />
            </div>
          </div>
        )}
        <div className="mt-2 flex items-center">
          <button
            onClick={undo}
            className="text-white bg-gray-400 hover:bg-gray-500 py-2 px-3 rounded mr-2"
          >
            <FaUndo />
          </button>
          <button
            onClick={redo}
            className="text-white bg-gray-400 hover-bg-gray-500 py-2 px-3 rounded mr-2"
          >
            <FaRedoAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
