import React from 'react'; // React 불러오기
import './TodoItem.css'; // 스타일 파일 불러오기

function TodoItem({ todo, onToggle, onDelete }) { // 부모로부터 할 일 객체(todo), 토글 함수, 삭제 함수 props로 받음
  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}> {/* 할 일 아이템 li, 완료 시 completed 클래스 추가 */}
      <span
        className="todo-text" // 할 일 텍스트에 스타일 적용
        onClick={() => onToggle(todo.id)} // 클릭 시 완료 상태 토글
        tabIndex={0} // 키보드 접근성(탭 이동) 지원
        role="button" // 접근성: 버튼 역할
        aria-pressed={todo.completed} // 접근성: 완료 상태 표시
      >
        {todo.text} {/* 할 일 내용 표시 */}
      </span>
      <button className="delete-btn" onClick={() => onDelete(todo.id)} aria-label="삭제">✕</button> {/* 삭제 버튼 */}
    </li>
  );
}

export default TodoItem; // TodoItem 컴포넌트 내보내기
