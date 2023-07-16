import styled from 'styled-components';

const Wrapper = styled.article`

form {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  outline: 1px solid var(--grey-400);
  border-radius: 0.5rem;
}

p {
  margin: 0;
}

form:hover {
  transition: 0.2s;
  background-color: var(--grey-100);
}

.task-field {
  /* -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none; */
  height: 2.5rem;
  width: 100%;
  border: none;
  background-color: var(--grey-100);
  border-radius: 0.5rem;
  padding: 0 0 0 0.5rem;
}

.task-field:hover {
  background-color: var(--grey-200);
}

.task-field:is(:focus, :active, :focus-visible) {
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
  margin: 0 0.5rem 0 0;
  padding: 0;
}

.status-container:focus-within{
  transition: box-shadow 0.2s;
  outline: 2px solid var(--primary-400);
  box-shadow: 0px 0px 10px 2px rgba(189, 189, 189, 0.20);
  }

.status-container:hover {
}

.checkbox-container {
  width: 2.5rem;
  height: 2.5rem;
  clip-path: circle(46% at 50% 50%);
  /* border-radius: 50%; */
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

    position: absolute;

    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;

}




.checkbox-container:hover {
  box-shadow: var(--input-shadow);
  transition: 0.2s;
  background-color: var(--primary-200) !important
}

.checkbox-container:hover .checkmark {
  transition: 0.2s;
  opacity: 50% !important
}
/* .checkbox-container:active {
  transition: 0.2s;
  background-color: var(--grey-300)
} */

.checkbox-container:checked:is(:hover, :active) {
  transition: 0.5s;
  background-color: var(--primary-600)
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;

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
  animation: checkInOut 0.2s linear forwards;
}

.c-out-out {
  animation: checkOutOut 0.2s linear forwards;
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
    left: 39%;
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