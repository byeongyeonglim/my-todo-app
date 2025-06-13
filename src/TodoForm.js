import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAdd }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="할 일을 입력하세요..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="todo-btn" type="submit">추가</button>
    </form>
  );
}

export default TodoForm;
