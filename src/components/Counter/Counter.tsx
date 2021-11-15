import React, { useContext, useReducer } from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@material-ui/core";
import { CounterContext } from "../../App";

const reducer = (state, action) => {
  const newState = { count: state.count };
  const delta = action.value ?? 1;
  switch (action.type) {
    case 'increment':
      newState.count += delta;
      break;
    case 'decrement':
      newState.count -= delta;
      break;
    case 'reset':
      newState.count = 0;
      break;
  }
  return newState;
};

const initialState = {
  count: 0,
};

function Counter(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { delta } = useContext(CounterContext);
  return (
    <React.Fragment>
      <Stack spacing={2}>
        Count - {state.count}
        <Button
          variant="contained"
          color="primary"
          style={{ width: "150px" }}
          onClick={() => {
            dispatch({ type: "increment", value: delta });
          }}
        >
          {" "}
          Increment{" "}
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ width: "150px" }}
          onClick={() => {
            dispatch({ type: "decrement", value: delta });
          }}
        >
          {" "}
          Decrement
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ width: "150px" }}
          onClick={() => {
            dispatch({ type: "reset" });
          }}
        >
          {" "}
          Reset
        </Button>
        <Button
          onClick={() => {
            props.counterField.current.focus();
            console.log(props.counterField.current.value);
          }}
        >
          Focus input field of parent
        </Button>
      </Stack>
    </React.Fragment>
  );
}

export default Counter;
