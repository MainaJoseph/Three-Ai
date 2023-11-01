import React, { useState } from "react";

import CustomButton from "./CustomButton";

const TextPicker = ({ text, setText, generatingTShirt, handleEmbedText }) => {
  return (
    <div className="textpicker-container">
      <input
        type="text"
        placeholder="Type your text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="textpicker-input"
      />
      <div className="flex flex-wrap gap-3">
        {generatingTShirt ? (
          <CustomButton
            type="outline"
            title="Embedding Text..."
            customStyles="text-xs"
          />
        ) : (
          <CustomButton
            type="filled"
            title="Embed Text on T-Shirt"
            handleClick={() => handleEmbedText(text)}
            customStyles="text-xs"
          />
        )}
      </div>
    </div>
  );
};

export default TextPicker;
