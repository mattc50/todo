import styled from 'styled-components';

const Wrapper = styled.article`


.todo-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  /* margin-bottom: 1rem; */
  padding: 0.5rem;
  /* border: 1px solid var(--grey-400); */
  /* border: 1px solid transparent; */
  /* background-image: linear-gradient(45deg, var(--primary-100), var(--primary-400)) 27 / 1px; */
  /* background: linear-gradient(var(--grey-100), var(--grey-100)), 
              linear-gradient(15deg, var(--grey-100), var(--grey-400));
  border-radius: 0.5rem;
  background-origin: border-box;
  background-clip: content-box, border-box; */
}

form {
  
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

p {
  margin: 0;
}

/* form:hover {
  transition: 0.2s;
  background-color: var(--grey-100);
} */

.todo-item:hover {

}

.task {
  /* -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none; */

  height: 2.5rem;
  width: 100%;
  /* border: none; */
  outline: none;
  background-color: var(--grey-50);
  border-radius: 0.5rem;
  padding: 0 0 0 0.5rem;
}

.task:hover {
  background-color: var(--grey-200);
}

.task:is(:focus, :active, :focus-visible) {
  /* -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none; */
  transition: box-shadow, background-color 0.2s;
  outline: 2px solid var(--primary-400);
  box-shadow: 0px 0px 10px 2px rgba(189, 189, 189, 0.20);
  background-color: var(--white)
}

/* .checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  margin-right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  outline: 1px solid var(--grey-400);
  font-size: 0.5rem;
} */

/* .checkbox:checked {
  background-color: var(--primary-400);
  outline: none;
} */

.status-container {
  border-radius: 50%;
  padding: 0;
  margin: 0;
  padding: 0;
}

.status-container:focus-within{
  transition: box-shadow 0.2s;
  outline: 2px solid var(--primary-400);
  box-shadow: 0px 0px 10px 2px rgba(189, 189, 189, 0.20);
}

.checkbox-container {
  width: 2.5rem;
  height: 2.5rem;
  /* clip-path: circle(44% at 50% 50%); */
  border-radius: 50%;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: var(--grey-300);
  margin: 0;
  padding: 0;
  /* .checkbox-container input:is(:focus, :active, :focus-visible){
    background-color: var(--primary-700);
    outline: 2px solid var(--primary-400);
    box-shadow: var(--input-shadow)
  } */
}

.checkbox-container input {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  cursor: pointer;
  z-index: 1;
  outline: none;
  position: absolute;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.checkbox-container:hover {
  /* box-shadow: var(--input-shadow); */
  transition: 0.2s;
  background-color: var(--primary-200);
}

.checkbox-container:hover .checkmark {
  transition: 0.2s;
  opacity: 50% !important;
}

.checkbox-container:checked:is(:hover, :active) {
  transition: 0.5s;
  background-color: var(--primary-600);
}

.checkmark {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;   
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  }


  /* .new {
    outline: 1px solid var(--grey-300);
    border: 1px solid var(--grey-300);
    background: none;
  } */

  /* .new:focus-within {
    outline: 1px solid var(--grey-400)
  } */

  .add {
    height: 2.5rem;
    width: 2.5rem;
    /* margin-right: 0.5rem; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .add * {
    height: 1.5rem;
    width: 1.5rem;
    color: var(--grey-500);
  }

  .form-action {
    -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  cursor: pointer;
  border: none;
  display: flex;
  justify-content: center;
    align-items: center;
  border-radius: 50%;
  height: 2.5rem;
  width: 2.5rem;
  min-width: 2.5rem;
  padding: 0;
  background-color: var(--grey-200);
  }

  .form-action:hover {
    transition: 0.2s;
    background-color: var(--grey-300);
  }

  .form-action:is(:focus, :active, :focus-visible) {
    transition: background-color 0.2s;
    background-color: var(--grey-300);
    outline: 2px solid var(--primary-400) !important;
  }

  .form-action * {
    height: 1.25rem;
    width: 1.25rem;
    color: var(--primary-400);
  }

  .delete * {
    color: var(--grey-500)
  }

  .submit:enabled {
    transition: background-color 0.2s;
    background-color: white;
    outline: 2px solid var(--primary-100)
  }

  .submit:enabled:hover {
    transition: 0.2s;
    outline: 2px solid var(--primary-400)
  }

  .form-action:disabled {
    color: var(--grey-400);
    pointer-events: none;
  }

  .form-action:disabled * {
    color: var(--grey-400);
    pointer-events: none;
  }

/* .checkbox-container:hover input ~ .checkmark {
    background-color: #d4d4d4;
} */

@keyframes checkInIn {
  0% { background-color: var(--grey-300);}
  100% {background-color: var(--primary-400);}
}

@keyframes checkOutIn {
  0% {/*filter: saturate(0%);*/background-color: var(--primary-400);}
  100% {/*filter: saturate(100%);*/background-color: var(--primary-700);}
}

@keyframes checkInOut {
  0% {/*filter: saturate(100%);*/background-color: var(--primary-700);}
  100% {/*filter: saturate(0%);*/background-color: var(--primary-400);}
}

@keyframes checkOutOut {
  0% {background-color: var(--primary-400);}
  100% { background-color: var(--grey-300);}
}

.c-in-in {
  animation: checkInIn 1s linear forwards;
}

.c-in-out {
  animation: checkInOut 0.5s linear forwards;
}

.c-out-out {
  animation: checkOutOut 0.5s linear forwards;
}

.c-out-in {
  animation: checkOutIn 1s linear forwards;
}

/* .checkbox-container input:checked {
  animation: uncheckToCheck 1s linear forwards;

} */

.checkbox-container input:checked ~ .checkmark {
    background-color: var(--primary-400);
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
    display: block;
}

.checkbox-container .checkmark:after {
    left: 40%;
    top: 22.5%;
    width: 0.55rem;
    height: 1.1rem;
    border: solid white;
    border-width: 0 4px 4px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
`
export default Wrapper