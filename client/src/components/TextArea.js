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
  const [currentValue, setCurrentValue] = useState(initialFF);// you can manage data with it
  const [scrollHeight, setScrollHeight] = useState(0)

  const handleResize = () => {
    // console.log(textareaRef.current.scrollTop)
    const maxHeight = Math.ceil((1.15 * 16 * 10) + 32);
    if (textareaRef.current) {
      let currentHeight = scrollHeight;
      textareaRef.current.style.height = '0px';
      if (textareaRef.current.scrollHeight < maxHeight) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      } else {
        textareaRef.current.style.overflow = "auto"
        textareaRef.current.style.height = `${maxHeight}px`
      }
      let newHeight = textareaRef.current.scrollHeight;
      console.log(`curr: ${currentHeight}, new: ${newHeight}`)
      const scrollPos = textareaRef.current.scrollHeight - textareaRef.current.offsetHeight;
      // console.log(Math.ceil(scrollPos))
      console.log(scrollPos)
      console.log(textareaRef.current.scrollTop)

      console.log(currentHeight < newHeight)
      console.log(parseInt(textareaRef.current.style.height) >= 216)
      console.log(`mod: ${scrollPos - textareaRef.current.scrollTop <= 19}`)
      const permissibleVals = [18, 19, 34, 35]
      if (
        currentHeight < newHeight &&
        parseInt(textareaRef.current.style.height) >= 216 &&
        (
          permissibleVals.find(el => el === scrollPos - textareaRef.current.scrollTop)
        )
      ) {
        console.log('run')
        setScrollHeight(scrollPos)
        console.log(scrollHeight)
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight
      }
      // return { currentHeight, newHeight }



      return scrollPos;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  // handleResize()


  useEffect(() => {
    document.getElementById('textarea').onscroll = () => {
      if (textareaRef.current) {
        if (textareaRef.current.scrollTop <= 19) {
          console.log('fire!')
          textareaRef.current.scrollTop = 0;
        }
        if (((textareaRef.current.scrollHeight - textareaRef.current.offsetHeight) -
          textareaRef.current.scrollTop) <= 19) {
          console.log('fire here!')

          textareaRef.current.scrollTop = textareaRef.current.scrollHeight;

        }
      }
    }
    handleResize()
  }, [setScrollHeight]);

  const debounce = () => {
    let timeoutID
    return (e) => {
      setCurrentValue(e.target.value)
      handleResize();

      if (textareaRef.current) {
      }
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
          id="textarea"
          className="form-input"
        />
      </div>
    </Wrapper>

  )
}

export default TextArea;