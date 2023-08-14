import React, { useState } from "react";

const ModeSwitchButton = ({ onToggle }) => {
  return (
    <button onClick={onToggle}>
      Dark Mode
    </button>
  );
};

export default ModeSwitchButton;
