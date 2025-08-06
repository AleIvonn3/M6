import { useReducer, useRef, useEffect, useCallback } from "react";
import './App.css';

const initialState = { count: 0, history: [] };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { 
        count: state.count + 1, 
        history: [...state.history, `+1 (Nuevo valor: ${state.count + 1})`] 
      };
    case "decrement":
      return { 
        count: state.count - 1, 
        history: [...state.history, `-1 (Nuevo valor: ${state.count - 1})`] 
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function getInitialState() {
  const saved = localStorage.getItem("counterState");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialState;
    }
  }
  return initialState;
}

function CounterGame() {
  const [state, dispatch] = useReducer(reducer, getInitialState);
  const incrementBtnRef = useRef(null);

  useEffect(() => {
    incrementBtnRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("counterState", JSON.stringify(state));
  }, [state]);

  const handleIncrement = useCallback(() => {
    dispatch({ type: "increment" });
  }, []);

  const handleDecrement = useCallback(() => {
    dispatch({ type: "decrement" });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  return (
    <div className="counter-container">
      <h2>Contador: {state.count}</h2>
      <button ref={incrementBtnRef} onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleReset}>Reset</button>

      
    </div>
  );
}

export default CounterGame;