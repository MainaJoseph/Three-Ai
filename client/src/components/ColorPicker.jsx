import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "../store";

const ColorPicker = () => {
  const snap = useSnapshot(state);
  const [displayColorCode, setDisplayColorCode] = useState(false);

  const buttonStyle = {
    backgroundColor: snap.color,
  };

  const inputStyle = {
    width: "100%",
    borderColor: snap.color,
  };

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (state.color = color.hex)}
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
          <div className="mt-2">
            <input
              type="text"
              value={snap.color}
              onChange={(e) => (state.color = e.target.value)}
              className="border rounded-md p-2"
              style={inputStyle}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
