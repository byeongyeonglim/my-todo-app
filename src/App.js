import React, { useState } from 'react'; // React와 useState 훅을 불러옴
import TodoForm from './TodoForm'; // 할 일 추가 폼 컴포넌트
import TodoList from './TodoList'; // 할 일 목록 컴포넌트
import './App.css';

function App() {
  const [todos, setTodos] = useState([]); // 할 일 목록 상태(todos)와 상태를 변경하는 함수(setTodos)를 선언, 초기값은 빈 배열

  // 할 일 추가 함수. 입력받은 텍스트를 새로운 할 일로 추가
  const handleAdd = (text) => {
    setTodos([
      ...todos, // 전개 연산자를 활용한 기존 할 일 목록을 복사
      { id: Date.now(), text, completed: false }, // 새 할 일 객체 추가 (id는 현재 시간, 완료 상태는 false)
    ]);
  };

  // 할 일 완료 상태 토글 함수. 클릭한 할 일의 completed 값을 반전
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        // map 함수는 todos 배열의 각 요소(todo)를 순회하며 새로운 배열을 만듭니다.
        // 각 todo에 대해 아래의 콜백 함수가 실행됩니다.
        todo.id === id
          // 만약 현재 todo의 id가 주어진 id와 같다면,
          ? { ...todo, completed: !todo.completed } // 해당 todo의 completed 값을 반전시킨 새 객체를 반환합니다.
          : todo // 그렇지 않으면 기존 todo 객체를 그대로 반환합니다.
        // 이렇게 하면 todos 배열에서 특정 id를 가진 todo만 completed 값이 바뀐 새 배열이 생성됩니다.
      )
    );
  };

  // 할 일 삭제 함수. 클릭한 할 일의 id와 다른 것만 남김
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 실제 화면에 보여줄 내용(JSX)
  return (
    <div className="app-container"> {/* 앱 전체를 감싸는 div, 스타일 적용 */}
      <h1 className="app-title">To do List</h1> {/* 앱 제목 */}
      <TodoForm onAdd={handleAdd} /> {/* 할 일 추가 폼, handleAdd 함수를 props로 전달 */}
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} /> {/* 할 일 목록, 상태와 함수들을 props로 전달 */}
    </div>
  );
}

export default App; // App 컴포넌트를 내보냄 (다른 파일에서 사용할 수 있게 함)
