import React, { useState } from 'react';

function editBar(props) {
  const [text, setText] = useState('');

  const editText = (event) => {
    console.log(event.target.value);
    setText(event.target.value);
  };
  return (
    <div>

      <input value={text} onChange={editText} />
    </div>

  );
}

export default editBar;
