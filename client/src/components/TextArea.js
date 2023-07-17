import { useAppContext } from "../context/appContext";
import React, { useEffect, useRef, useState, useMemo } from "react";

const initialFF = localStorage.getItem('free-form')

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
  const [currentValue, setCurrentValue] = useState(initialFF);// you can manage data with it

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [currentValue]);

  const debounce = () => {
    let timeoutID
    return (e) => {
      setCurrentValue(e.target.value)
      clearTimeout(timeoutID)
      // ID to use in the next run
      timeoutID = setTimeout(() => {
        localStorage.setItem('free-form', e.target.value)
      }, 700)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      < textarea
        autoCorrect="off"
        type={type}
        ref={textareaRef}
        style={style}
        value={currentValue}
        name={name}
        onChange={optimizedDebounce}
        className="form-input"
      />
    </div>
  )
}

export default TextArea;