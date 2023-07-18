import React, { useEffect, useRef, useState, useMemo } from "react";
import Wrapper from "../assets/wrappers/TextArea";

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
  labelText
}) => {
  const textareaRef = useRef(null);
  const [currentValue, setCurrentValue] = useState(initialFF);// you can manage data with it

  const handleResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      if (textareaRef.current.scrollHeight < 200) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        //defaultStyle.overflow = "visible"
      } else {
        textareaRef.current.style.height = "200px"
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  useEffect(() => {
    handleResize()
  }, []);

  const debounce = () => {
    let timeoutID
    return (e) => {
      setCurrentValue(e.target.value)
      handleResize()
      clearTimeout(timeoutID)
      // ID to use in the next run
      timeoutID = setTimeout(() => {
        localStorage.setItem('free-form', e.target.value)
      }, 700)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])

  return (
    <Wrapper>
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
    </Wrapper>

  )
}

export default TextArea;