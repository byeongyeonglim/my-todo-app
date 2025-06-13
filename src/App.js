import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './App.css';

dayjs.locale('ko');

const API_URL = 'http://localhost:3001/todos';

// 날짜를 yyyy-mm-dd 문자열로 반환하는 함수
function formatDate(date) {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM-DD');
}

function App() {
  // 전체 todos
  const [todos, setTodos] = useState([]);
  // 선택된 날짜 상태 (dayjs 객체)
  const [selectedDate, setSelectedDate] = useState(dayjs());
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

  // 선택된 날짜의 할 일만 필터링
  const dateKey = formatDate(selectedDate);
  const todosForDate = todos.filter((todo) => todo.date === dateKey);

  // 할 일 추가 함수
  const handleAdd = async (text) => {
    const newTodo = {
      text,
      completed: false,
      date: dateKey,
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

  // 캘린더에 할 일 존재 dot 표시
  const dayHasTodos = (date) => {
    const key = formatDate(date);
    return todos.some((todo) => todo.date === key);
  };

  return (
    <div className="app-container">
      {/* MUI DatePicker로 한국식 달력 제공 */}
      <div className="calendar-ios-wrap">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            format="YYYY-MM-DD"
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'small',
                fullWidth: true,
                sx: { background: '#f8fafc', borderRadius: 2, fontWeight: 600 },
              },
              day: (ownerState) => {
                const key = formatDate(ownerState.day);
                return {
                  sx: {
                    position: 'relative',
                    '&::after': dayHasTodos(ownerState.day)
                      ? {
                          content: '"●"',
                          color: '#facc15',
                          fontSize: '1.1em',
                          position: 'absolute',
                          left: '50%',
                          bottom: 4,
                          transform: 'translateX(-50%)',
                        }
                      : {},
                  },
                };
              },
            }}
            disableFuture={false}
            showDaysOutsideCurrentMonth
            views={['year', 'month', 'day']}
            openTo="day"
          />
        </LocalizationProvider>
      </div>
      <h1 className="app-title">To do List</h1>
      <TodoForm onAdd={handleAdd} />
      {loading ? (
        <div style={{ textAlign: 'center', color: '#6366f1', marginTop: 20 }}>로딩 중...</div>
      ) : (
        <TodoList todos={todosForDate} onToggle={handleToggle} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;
