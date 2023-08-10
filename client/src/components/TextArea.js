import React, { useEffect, useRef, useState, useMemo } from "react";
import Wrapper from "../assets/wrappers/TextArea";

const initialFF = localStorage.getItem('free-form')

const defaultStyle = {
  display: "block",
  overflow: "hidden",
  width: "100%",
};

const TextArea = ({
  style = defaultStyle,
  type,
  name,
  labelText
}) => {
  const textareaRef = useRef(null);
  const [currentValue, setCurrentValue] = useState(initialFF || "");// you can manage data with it

  const handleResize = () => {
    console.log('run')

    const maxHeight = Math.ceil((1.15 * 16 * 10));
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      if (textareaRef.current.scrollHeight < maxHeight) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      } else {
        textareaRef.current.style.overflow = "auto"
        textareaRef.current.style.height = `${maxHeight}px`
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  // handleResize()

  useEffect(() => {
    handleResize()
    // eslint-disable-next-line
  }, []);

  const debounce = () => {
    let timeoutID
    return (e) => {
      setCurrentValue(e.target.value)
      handleResize();

      clearTimeout(timeoutID)
      // ID to use in the next run
      timeoutID = setTimeout(() => {
        localStorage.setItem('free-form', e.target.value)
      }, 700)
    }
  }

  const optimizedDebounce = useMemo(() =>
    debounce(),
    //eslint-disable-next-line
    [])

  return (
    <Wrapper>
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <div className="textarea-container">
          <textarea
            autoCorrect="off"
            type={type}
            ref={textareaRef}
            style={style}
            value={currentValue}
            name={name}
            onChange={optimizedDebounce}
            id="textarea"
            className="form-input"
          />
        </div>
      </div>
    </Wrapper>

  )
}

export default TextArea;