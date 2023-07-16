import { useAppContext } from "../context/appContext";
import React, { useEffect, useRef, useState } from "react";
const defaultStyle = {
  display: "block",
  overflow: "hidden",
  resize: "none",
  width: "100%",
};

const TextArea = ({
  style = defaultStyle,
  type,
  name,
  value,
  handleChange,
  // handleBlur,
  labelText,
  // isError,
  // feedback
}) => {
  const textareaRef = useRef(null);
  const [currentValue, setCurrentValue] = useState("");// you can manage data with it

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [currentValue]);

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      < textarea
        type={type}
        ref={textareaRef}
        style={style}
        value={currentValue}
        name={name}
        onChange={(e) => setCurrentValue(e.target.value)}
        className={"form-input"}
      />
    </div>
  )
}

export default TextArea;