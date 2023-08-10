import styled from 'styled-components';

const Wrapper = styled.article`
.todo-item {
  display: grid;
  grid-template-columns: 1fr auto;
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
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -ms-transition: 0.2s;
  transition: 0.2s;
  background-color: var(--primary-200) !important;
}

.checkbox-container:hover .checkmark {
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -ms-transition: 0.2s;
  transition: 0.2s;

  opacity: 50% !important;
}

.checkbox-container:checked:is(:hover, :active) {
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -ms-transition: 0.5s;
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

.submit:disabled {
  visibility: hidden;
}

.submit:enabled {
  -webkit-transition: background-color 0.2s;
  -moz-transition: background-color 0.2s;
  -ms-transition: background-color 0.2s;
  transition: background-color 0.2s;

  outline: 2px solid var(--primary-200);
}

.submit:enabled * {
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -ms-transition: 0.2s;
  transition: 0.2s;
  
  color: var(--primary-200);
}

.submit:enabled:is(:hover, :focus, :active, :focus-visible)  {
  background-color: white;
  
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -ms-transition: 0.2s;
  transition: 0.2s;

  outline: 2px solid var(--primary-400);
}

.submit:enabled:is(:hover, :focus, :active, :focus-visible) * {
  color: var(--primary-400);
}

@keyframes checkInIn {
  0% {background-color: var(--grey-300)};
  100% {background-color: var(--primary-400)};
}

@keyframes checkOutIn {
  0% {background-color: var(--primary-400)};
  100% {background-color: var(--primary-500)};
}

@keyframes checkInOut {
  0% {
    background-color: var(--primary-500);

    -webkit-box-shadow: var(--input-shadow);
    -moz-box-shadow: var(--input-shadow);
    -ms-box-shadow: var(--input-shadow);
    box-shadow: var(--input-shadow);
  }
  100% {
    background-color: var(--primary-400);

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    -ms-box-shadow: none;
    box-shadow: none;
  }
}

@keyframes checkOutOut {
  0% {background-color: var(--primary-400)};
  100% {background-color: var(--grey-300)};
}

.c-in-in {
  -webkit-animation: checkInIn 1s linear forwards;
  -moz-animation: checkInIn 1s linear forwards;
  -ms-animation: checkInIn 1s linear forwards;
  animation: checkInIn 1s linear forwards;
}

.c-in-out, .checkbox-container input:checked ~ .checkmark {
  -webkit-animation: checkInOut 0.2s ease-in forwards;
  -moz-animation: checkInOut 0.2s ease-in forwards;
  -ms-animation: checkInOut 0.2s ease-in forwards;
  animation: checkInOut 0.2s ease-in forwards;
}

.c-out-out {
  -webkit-animation: checkOutOut 0.2s ease-in forwards;
  -moz-animation: checkOutOut 0.2s ease-in forwards;
  -ms-animation: checkOutOut 0.2s ease-in forwards;
  animation: checkOutOut 0.2s ease-in forwards;
}

.c-out-in {
  -webkit-animation: checkOutIn 1s linear forwards;
  -moz-animation: checkOutIn 1s linear forwards;
  -ms-animation: checkOutIn 1s linear forwards;
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
    -webkit-background-position: 100% 50%;
    -moz-background-position: 100% 50%;
    -ms-background-position: 100% 50%;
    background-position: 100% 50%;
  }
  100% {
    -webkit-background-position: 0% 50%;
    -moz-background-position: 0% 50%;
    -ms-background-position: 0% 50%;
    background-position: 0% 50%;
  }
}

input:is([type="checkbox"], [type="radio"]):checked:disabled {
  background-color: transparent;
}

.checkbox-container input:disabled ~ .checkmark {
  background: -webkit-linear-gradient(
    90deg,
    var(--primary-100) 0%, 
    var(--primary-100) 20%, 
    var(--primary-200) 50%,
    var(--primary-100) 80%,
    var(--primary-100) 100%
  );

  background: linear-gradient(
    90deg,
    var(--primary-100) 0%, 
    var(--primary-100) 20%, 
    var(--primary-200) 50%,
    var(--primary-100) 80%,
    var(--primary-100) 100%
  );

  -webkit-filter: saturate(25%);
  -moz-filter: saturate(25%);
  -ms-filter: saturate(25%);
  filter: saturate(25%);

  -webkit-background-size: 800% 800%;
  -moz-background-size: 800% 800%;
  -ms-background-size: 800% 800%;
  background-size: 800% 800%;
  
  background-color: none;

  -webkit-animation: disabledLoad 1.5s ease-in-out infinite !important;
  -moz-animation: disabledLoad 1.5s ease-in-out infinite !important;
  -ms-animation: disabledLoad 1.5s ease-in-out infinite !important;
  animation: disabledLoad 1.5s ease-in-out infinite !important;
}

.checkbox-container .checkmark:after {
  left: 40%;
  top: 22.5%;
  width: 22.5%;
  height: 45%;
  border: solid white;
  border-width: 0 4px 4px 0;
  
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

@keyframes skeletonLoad {
  0% {
    -webkit-background-position: right;
    -moz-background-position: right;
    -ms-background-position: right;
    background-position: right;
  };
  100% {
    -webkit-background-position: left;
    -moz-background-position: left;
    -ms-background-position: left;
    background-position: left;
  };
}

.skeleton {
  background: -webkit-linear-gradient(
    90deg,
    var(--grey-100) 33%, 
    var(--grey-200) 40%, 
    var(--grey-100) 47%,
    var(--grey-100)
  );

  background: linear-gradient(
    90deg,
    var(--grey-100) 33%, 
    var(--grey-200) 40%, 
    var(--grey-100) 47%,
    var(--grey-100)
  );

  -webkit-background-size: 400% 400%;
  -moz-background-size: 400% 400%;
  -ms-background-size: 400% 400%;
  background-size: 400% 400%;

  -webkit-animation: skeletonLoad 1.5s linear backwards infinite;
  -moz-animation: skeletonLoad 1.5s linear backwards infinite;
  -ms-animation: skeletonLoad 1.5s linear backwards infinite;
  animation: skeletonLoad 1.5s linear backwards infinite;

  border-radius: var(--borderRadius);
  height: 2.5rem;
  width: 100%;
}

.new {
  display: flex;
}

.set-ref:hover small {
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -ms-transition: 0.2s;
  transition: 0.2s;
  
  color: var(--primary-400);
  text-decoration: underline;
}
`

export default Wrapper