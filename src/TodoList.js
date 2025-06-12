import React from 'react'; // React 불러오기
import TodoItem from './TodoItem'; // 할 일 아이템 컴포넌트 불러오기
import './TodoList.css'; // 스타일 파일 불러오기

function TodoList({ todos, onToggle, onDelete }) { // 부모로부터 할 일 목록(todos), 토글 함수, 삭제 함수 props로 받음
  return (
    <ul className="todo-list"> {/* 할 일 목록을 감싸는 ul */}
      {todos.length === 0 ? (
        <li className="empty">할 일이 없습니다.</li> // 할 일이 없을 때 표시
      ) : (
        todos.map((todo) => (
          // todos 배열을 순회하며 각 todo를 TodoItem 컴포넌트로 렌더링
          <TodoItem
            key={todo.id} // 각 아이템의 고유 key (React가 효율적으로 렌더링하기 위해 필요)
            todo={todo} // 할 일 객체 전달
            onToggle={onToggle} // 완료 토글 함수 전달
            onDelete={onDelete} // 삭제 함수 전달
          />
        ))
      )}
    </ul>
  );
}

export default TodoList; // TodoList 컴포넌트 내보내기
