import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete }) {
  // 최신순(날짜+시작시간 내림차순) 정렬
  const sorted = [...todos].sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return b.start.localeCompare(a.start);
  });
  return (
    <table className="todo-list-table">
      <thead>
        <tr>
          <th>날짜</th>
          <th>할 일</th>
          <th>시간</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sorted.length === 0 ? (
          <tr><td colSpan={4} className="empty">할 일이 없습니다.</td></tr>
        ) : (
          sorted.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </tbody>
    </table>
  );
}

export default TodoList;
