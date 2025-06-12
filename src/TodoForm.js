import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAdd }) { // 부모 컴포넌트로부터 onAdd 함수를 props로 받음
  const [value, setValue] = useState(''); // 입력창의 값을 관리하는 상태 value와 그 값을 바꾸는 setValue 함수 선언, 초기값은 빈 문자열

  // 폼 제출 시 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼의 기본 동작(새로고침) 막기
    if (!value.trim()) return; // 입력값이 비어있으면 아무것도 하지 않음
    onAdd(value.trim()); // 부모에게 입력값 전달하여 할 일 추가
    setValue(''); // 입력창 비우기
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}> {/* 폼 요소, 제출 시 handleSubmit 실행 */}
      <input
        className="todo-input" // 입력창에 스타일 적용
        type="text" // 텍스트 입력 타입
        placeholder="할 일을 입력하세요..." // 입력창에 표시되는 안내 문구
        value={value} // 입력창의 값은 value 상태와 연결
        onChange={(e) => setValue(e.target.value)} // 입력값이 바뀔 때마다 value 상태를 변경
      />
      <button className="todo-btn" type="submit">추가</button> {/* 할 일 추가 버튼 */}
    </form>
  );
}

export default TodoForm; // TodoForm 컴포넌트를 내보냄
