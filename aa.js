import React, { useState } from "react";

const example = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{`Count : ${count} times`}</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
};

export default aa;
