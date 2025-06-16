import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

function TodoForm({ onAdd }) {
  const [value, setValue] = useState('');
  const [date, setDate] = useState(dayjs());
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || !date || !start || !end) return;
    onAdd(
      value.trim(),
      start.format('HH:mm'),
      end.format('HH:mm'),
      date.format('YYYY-MM-DD')
    );
    setValue('');
    setStart(null);
    setEnd(null);
    setDate(dayjs());
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <div className="todo-form-row">
          <DatePicker
            value={date}
            onChange={setDate}
            format="YYYY-MM-DD"
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'small',
                sx: { background: '#f1f5f9', borderRadius: 2, minWidth: 120 },
              },
            }}
          />
        </div>
        <div className="todo-form-row">
          <TimePicker
            value={start}
            onChange={setStart}
            ampm={false}
            format="HH:mm"
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'small',
                sx: { background: '#f1f5f9', borderRadius: 2, minWidth: 90 },
              },
            }}
            label="시작 시간"
          />
          <span className="time-sep">~</span>
          <TimePicker
            value={end}
            onChange={setEnd}
            ampm={false}
            format="HH:mm"
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'small',
                sx: { background: '#f1f5f9', borderRadius: 2, minWidth: 90 },
              },
            }}
            label="종료 시간"
          />
        </div>
        <div className="todo-form-row">
          <input
            className="todo-input"
            type="text"
            placeholder="할 일을 입력하세요..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ flex: 2, minWidth: 0 }}
          />
          <button className="todo-btn" type="submit">추가</button>
        </div>
      </LocalizationProvider>
    </form>
  );
}

export default TodoForm;
