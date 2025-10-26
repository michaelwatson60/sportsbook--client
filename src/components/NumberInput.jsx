import React from 'react';

const blockInvalidChar = e =>
  ['e', 'E', '+', '-', '.', ','].includes(e.key) && e.preventDefault();

const NumberInput = props => {
  return <input type="number" onKeyDown={blockInvalidChar} {...props} />;
};

export default NumberInput;
