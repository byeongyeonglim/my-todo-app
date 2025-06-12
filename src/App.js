import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './App.css';

// 날짜를 yyyy-mm-dd 문자열로 반환하는 함수
function formatDate(date) {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM-DD');
}

dayjs.locale('ko');

function App() {
  // 날짜별로 할 일 목록을 관리 (예: { '2025-06-12': [todo, ...], ... })
  const [todosByDate, setTodosByDate] = useState({});
  // 선택된 날짜 상태 (dayjs 객체)
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // 선택된 날짜의 할 일 목록
  const dateKey = formatDate(selectedDate);
  const todos = todosByDate[dateKey] || [];

  // 할 일 추가 함수
  const handleAdd = (text) => {
    setTodosByDate({
      ...todosByDate,
      [dateKey]: [
        ...(todosByDate[dateKey] || []),
        { id: Date.now(), text, completed: false },
      ],
    });
  };

  // 할 일 완료 상태 토글 함수
  const handleToggle = (id) => {
    setTodosByDate({
      ...todosByDate,
      [dateKey]: todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    });
  };

  // 할 일 삭제 함수
  const handleDelete = (id) => {
    setTodosByDate({
      ...todosByDate,
      [dateKey]: todos.filter((todo) => todo.id !== id),
    });
  };

  return (
    <div className="app-container">
      {/* MUI DatePicker로 한국식 달력 제공 */}
      <div className="calendar-ios-wrap">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
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
                    '&::after': todosByDate[key] && todosByDate[key].length > 0 ? {
                      content: '"●"',
                      color: '#facc15',
                      fontSize: '1.1em',
                      position: 'absolute',
                      left: '50%',
                      bottom: 4,
                      transform: 'translateX(-50%)',
                    } : {},
                  },
                };
              },
            }}
            disableFuture={false}
            showDaysOutsideCurrentMonth
            views={["year", "month", "day"]}
            openTo="day"
          />
        </LocalizationProvider>
      </div>
      <h1 className="app-title">To do List</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default App;
