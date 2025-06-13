import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodayTimeline from './TodayTimeline';
import './App.css';

dayjs.locale('ko');

const API_URL = 'http://localhost:5000/todos';

// 날짜를 yyyy-mm-dd 문자열로 반환하는 함수
function formatDate(date) {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM-DD');
}

function App() {
  // 전체 todos
  const [todos, setTodos] = useState([]);
  // 로딩 상태
  const [loading, setLoading] = useState(false);

  // 서버에서 전체 todos 불러오기
  useEffect(() => {
    fetchTodos();
  }, []);

  // todos를 서버에서 가져오는 함수
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (e) {
      alert('서버에서 데이터를 불러오지 못했습니다.');
    }
    setLoading(false);
  };

  // 오늘 날짜의 타임라인용 todos
  const todayKey = formatDate(dayjs());
  const todayTodos = todos.filter((todo) => todo.date === todayKey);

  // 할 일 추가
  const handleAdd = async (text, start, end, date) => {
    const newTodo = {
      text,
      completed: false,
      date: date,
      start, // 시작 시간
      end,   // 종료 시간
    };
    try {
      const res = await axios.post(API_URL, newTodo);
      setTodos([...todos, res.data]);
    } catch (e) {
      alert('할 일 추가에 실패했습니다.');
    }
  };

  // 할 일 완료 상태 토글 함수
  const handleToggle = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      const res = await axios.patch(`${API_URL}/${id}`, { completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === id ? { ...t, completed: res.data.completed } : t)));
    } catch (e) {
      alert('상태 변경에 실패했습니다.');
    }
  };

  // 할 일 삭제 함수
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (e) {
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">To do List</h1>
      <TodoForm onAdd={handleAdd} />
      {loading ? (
        <div style={{textAlign:'center', color:'#6366f1', marginTop:20}}>로딩 중...</div>
      ) : (
        <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      )}
      <TodayTimeline todos={todayTodos} />
    </div>
  );
}

export default App;
