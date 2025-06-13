import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <span
        className="todo-text"
        onClick={() => onToggle(todo.id)}
        tabIndex={0}
        role="button"
        aria-pressed={todo.completed}
      >
        {todo.text}
      </span>
      <button className="delete-btn" onClick={() => onDelete(todo.id)} aria-label="삭제">✕</button>
    </li>
  );
}

export default TodoItem;
