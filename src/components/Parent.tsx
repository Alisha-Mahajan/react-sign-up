import { useRef, useState } from "react";

import { INITIAL_VALUE } from "../immutables/constants";
import Counter from "./Counter/Counter";

function Parent() {
  const [state, setstate] = useState(INITIAL_VALUE);
  const inputRef = useRef(null);

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        value={state}
        onChange={(event) => setstate(+event.target.value)}
      />
      <Counter counterField={inputRef} />
    </>
  );
}

export default Parent;
