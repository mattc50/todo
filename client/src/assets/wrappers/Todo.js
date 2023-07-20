import styled from 'styled-components';

const Wrapper = styled.article`
.todo-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem;
}

form {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

p {
  margin: 0;
}

.task {
  height: 2.5rem;
  outline: none;
  background-color: var(--grey-50);
  padding: 0 0.5rem;
  text-overflow: ellipsis;
}

.task:hover {
  background-color: var(--grey-200);
}

.task:is(:focus, :active, :focus-visible) {
  transition: box-shadow, background-color 0.2s;
  outline: 2px solid var(--primary-400);
  background-color: var(--white);
}

.task:disabled {
  pointer-events: none;
  color: var(--grey-400);
  background-color: transparent;
}

input:-webkit-autofill {
  -webkit-text-fill-color: var(--grey-700);
  -webkit-box-shadow: 0 0 0 1000px var(--grey-50) inset;
}

input:-webkit-autofill:hover {
  -webkit-transition: -webkit-box-shadow 0.1s linear;
  -webkit-box-shadow: 0 0 0 1000px var(--grey-200) inset;
}

input:-webkit-autofill:disabled, input:-webkit-autofill:disabled:is(:focus, :active, :focus-visible) {
  -webkit-text-fill-color: var(--grey-400);
  -webkit-transition: -webkit-box-shadow 0.1s linear;
  -webkit-box-shadow: 0 0 0 1000px var(--grey-50) inset;
}

.status-container {
  border-radius: 50%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.status-container:focus-within{
  transition: box-shadow 0.2s;
  outline: 2px solid var(--primary-400);
  box-shadow: 0px 0px 10px 2px rgba(var(--grey-400-rgb), 0.20);
}

.checkbox-container {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: var(--grey-300);
  /* background: linear-gradient(45deg, var(--grey-200) 50%, var(--grey-300)); */
  margin: 0;
  padding: 0;
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
  background-color: var(--primary-200) !important;
  /* background: linear-gradient(45deg, var(--primary-200) 50%, var(--primary-200)) !important; */

}

.checkbox-container:hover .checkmark {
  transition: 0.2s;
  opacity: 50% !important;
}

.checkbox-container:checked:is(:hover, :active) {
  transition: 0.5s;
  background-color: var(--primary-600);
  /* background: linear-gradient(45deg, var(--primary-700) 50%, var(--primary-700)); */
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

.add {
  height: 2.5rem;
  width: 2.5rem;
  min-width: 2.5rem;
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
  /* background-color: var(--grey-200); */
  background-color: transparent;
}

.form-action:hover {
  transition: 0.2s;
  background-color: var(--grey-200);
}

.form-action:is(:focus, :active, :focus-visible) {
  transition: background-color 0.2s;
  background-color: var(--grey-200);
  outline: 2px solid var(--primary-400) !important;
}

.form-action * {
  height: 1.25rem;
  width: 1.25rem;
  color: var(--grey-500);
}

.submit:disabled {
  visibility: hidden;
}

.submit:enabled {
  transition: background-color 0.2s;
  outline: 2px solid var(--primary-200);
}

.submit:enabled * {
  transition: 0.2s linear;
  color: var(--primary-200);
}

.submit:enabled:is(:hover, :focus, :active, :focus-visible)  {
  background-color: white;
  transition: 0.2s;
  outline: 2px solid var(--primary-400);
  
}

.submit:enabled:is(:hover, :focus, :active, :focus-visible) * {
  color: var(--primary-400);
}

.form-action:disabled, .form-action:disabled * {
  color: var(--grey-400);
  pointer-events: none;
}

/* .checkbox-container:hover input ~ .checkmark {
    background-color: #d4d4d4;
} */

/* .checkbox-container input:checked ~ .checkmark {
    background-color: var(--primary-400);
    background: linear-gradient(45deg, var(--primary-400) 50%, var(--primary-500));
} */

@keyframes checkInIn {
  0% {background-color: var(--grey-300);/*background: linear-gradient(45deg, var(--grey-200) 50%, var(--grey-300));*/}
  100% {background-color: var(--primary-400);/*background: linear-gradient(45deg, var(--grey-300) 50%, var(--grey-400));*/}
}

@keyframes checkOutIn {
  0% {background-color: var(--primary-400);/*background: linear-gradient(45deg, var(--primary-400) 50%, var(--primary-500));*/}
  100% {background-color: var(--primary-500);/*background: linear-gradient(45deg, var(--primary-700) 50%, var(--primary-700));*/}
}

@keyframes checkInOut {
  0% {background-color: var(--primary-500);/*background: linear-gradient(45deg, var(--primary-700) 50%, var(--primary-700));*/}
  100% {background-color: var(--primary-400);/*background: linear-gradient(45deg, var(--primary-400) 50%, var(--primary-500));*/}
}

@keyframes checkOutOut {
  0% {background-color: var(--primary-400);/*background: linear-gradient(45deg, var(--grey-300) 50%, var(--grey-400));*/}
  100% {background-color: var(--grey-300);/*background: linear-gradient(45deg, var(--grey-200) 50%, var(--grey-300));*/}
}

.c-in-in {
  animation: checkInIn 1s linear forwards;
}

.c-in-out, .checkbox-container input:checked ~ .checkmark {
  animation: checkInOut 0.2s ease-in forwards;
}

.c-out-out {
  animation: checkOutOut 0.2s ease-in forwards;
}

.c-out-in {
  animation: checkOutIn 1s linear forwards;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
    display: block;
}

@keyframes disabledLoad {
  0% {
    /* background-color: none; */
    background: linear-gradient(45deg, var(--primary-100) 0%, var(--primary-300) 100%);
    filter: saturate(25%);
    background-size: 200% 200%;
    background-position: 0% 50%;
  }
  100% {
    /* background-color: none; */
    background: linear-gradient(45deg, var(--primary-100) 0%, var(--primary-300) 100%);
    filter: saturate(25%);
    background-size: 200% 200%;
    background-position: 100% 50%;
  }
}

.checkbox-container input:disabled ~ .checkmark {
  background-color: none;
  animation: disabledLoad 0.5s ease-in-out forwards !important;
  /* filter: saturate(50%) */
}

.checkbox-container .checkmark:after {
    left: 40%;
    top: 22.5%;
    width: 22.5%;
    height: 45%;
    border: solid white;
    border-width: 0 4px 4px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

@keyframes skeletonLoad {
  0% {
    
    background-position: right;
  }
  100% {
    background-position: left;
  }
}

.skeleton {
  background-image: linear-gradient(
    90deg,
    var(--grey-100) 33%, 
    var(--grey-200) 40%, 
    var(--grey-100) 47%,
    var(--grey-100)
  );
  background-size: 400% 400%;
  animation: skeletonLoad 0.8s linear infinite;
  border-radius: var(--borderRadius);
  height: 2.5rem;
  width: 100%;
}

`
export default Wrapper