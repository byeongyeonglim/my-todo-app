import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <tr className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <td style={{verticalAlign:'middle'}}>{todo.date || ''}</td>
      <td style={{verticalAlign:'middle'}}>
        <span
          className="todo-text"
          onClick={() => onToggle(todo.id)}
          tabIndex={0}
          role="button"
          aria-pressed={todo.completed}
        >
          {todo.text || ''}
        </span>
      </td>
      <td style={{verticalAlign:'middle'}}>{(todo.start && todo.end) ? `${todo.start}~${todo.end}` : ''}</td>
      <td style={{verticalAlign:'middle'}}>
        <button className="delete-btn" onClick={() => onDelete(todo.id)} aria-label="삭제">✕</button>
      </td>
    </tr>
  );
}

export default TodoItem;
