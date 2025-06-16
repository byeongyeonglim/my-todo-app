import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import axios from 'axios';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
import TodayTimeline from './Components/TodayTimeline';
import './App.css';

dayjs.locale('ko');

const API_URL = 'http://localhost:5000/todos';

// 날짜를 yyyy-mm-dd 문자열로 반환하는 함수
function formatDate(date) {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM-DD');
}

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverAvailable, setServerAvailable] = useState(true);
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');
  const [inputName, setInputName] = useState('');
  const [lastUserName, setLastUserName] = useState(() => localStorage.getItem('userName') || '');

  useEffect(() => {
    (async () => {
      try {
        await axios.get(API_URL + '?_limit=1');
        setServerAvailable(true);
      } catch {
        setServerAvailable(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!userName) return;
    if (serverAvailable) {
      fetchTodos(userName);
    } else {
      const local = JSON.parse(localStorage.getItem('todos') || '[]');
      setTodos(local.filter(t => t.user === userName));
    }
  }, [userName, serverAvailable]);

  // 이름별 할 일만 불러오기
  const fetchTodos = async (name) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}?user=${encodeURIComponent(name)}`);
      setTodos(res.data);
    } catch {
      setServerAvailable(false);
    }
    setLoading(false);
  };

  const todayKey = formatDate(dayjs());
  const todayTodos = todos.filter((todo) => todo.date === todayKey);

  const handleAdd = async (text, start, end, date) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      date,
      start,
      end,
      user: userName,
    };
    if (serverAvailable) {
      try {
        const res = await axios.post(API_URL, newTodo);
        setTodos([...todos, res.data]);
      } catch {
        setServerAvailable(false);
      }
    } else {
      const updated = [...todos, newTodo];
      setTodos(updated);
      localStorage.setItem('todos', JSON.stringify(updated));
    }
  };

  const handleToggle = async (id) => {
    if (serverAvailable) {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
      try {
        const res = await axios.patch(`${API_URL}/${id}`, { completed: !todo.completed });
        setTodos(todos.map((t) => (t.id === id ? { ...t, completed: res.data.completed } : t)));
      } catch {
        setServerAvailable(false);
      }
    } else {
      const updated = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
      setTodos(updated);
      localStorage.setItem('todos', JSON.stringify(updated));
    }
  };

  const handleDelete = async (id) => {
    if (serverAvailable) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setTodos(todos.filter((t) => t.id !== id));
      } catch {
        setServerAvailable(false);
      }
    } else {
      const updated = todos.filter((t) => t.id !== id);
      setTodos(updated);
      localStorage.setItem('todos', JSON.stringify(updated));
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      setUserName(inputName.trim());
      setLastUserName(inputName.trim());
      localStorage.setItem('userName', inputName.trim());
    }
  };

  const handleResetName = () => {
    setUserName('');
    setInputName('');
    localStorage.removeItem('userName');
    setTodos([]);
  };

  // 이름이 입력되지 않은 경우 이름 입력 폼 표시
  if (!userName) {
    return (
      <div className="app-container" style={{justifyContent:'center', minHeight:'60vh'}}>
        <form onSubmit={handleNameSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:20, width:'100%'}}>
          <div style={{fontSize:'2.5rem'}}>📝</div>
          <label htmlFor="username" style={{fontSize:'1.4rem', color:'#6366f1', fontWeight:700, marginBottom:4}}>
            오늘의 할 일, 누구의 리스트로 만들어볼까요?
          </label>
          <div style={{color:'#64748b', fontSize:'1rem', marginBottom:8}}>
            이름을 알려주시면 맞춤 리스트를 만들어드릴게요
          </div>
          <input
            id="username"
            type="text"
            value={inputName}
            onChange={e => setInputName(e.target.value)}
            placeholder="이름을 입력해 주세요 (예: 홍길동)"
            style={{fontSize:'1.2rem', padding:'12px 18px', borderRadius:8, border:'1.5px solid #c7d2fe', width:'100%', maxWidth:320, outline:'none'}}
            autoFocus
          />
          <button type="submit" style={{marginTop:8, padding:'10px 32px', borderRadius:8, background:'linear-gradient(90deg,#6366f1 60%,#60a5fa 100%)', color:'#fff', fontWeight:600, fontSize:'1.1rem', border:'none', cursor:'pointer'}}>
            내 리스트 만들기
          </button>
        </form>
      </div>
    );
  }

  // 이름이 입력된 경우 할 일 목록 및 타임라인 표시
  return (
    <div className="app-container">
      <h1 className="app-title">{userName}'s To do List'
        <button onClick={handleResetName} style={{marginLeft:12, fontSize:'0.9rem', color:'#6366f1', background:'none', border:'none', cursor:'pointer', textDecoration:'underline'}}>이름 다시 입력</button>
      </h1>
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
