import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const COLORS = [
  '#6366f1', // 파랑
  '#22c55e', // 초록
  '#f59e42', // 주황
  '#a855f7', // 보라
  '#ec4899', // 분홍
  '#0ea5e9', // 하늘
  '#f43f5e', // 빨강
  '#eab308', // 노랑
];
const HOURS = Array.from({ length: 25 }, (_, i) => i); // 0~24시까지 1시간 단위

function timeToPercent(time) {
  const [h, m] = time.split(':').map(Number);
  return ((h + m / 60) / 24) * 100;
}

function assignTimelineRows(todos) {
  const rows = [];
  const sorted = [...todos].sort((a, b) => a.start.localeCompare(b.start));
  return sorted.map(todo => {
    const start = todo.start;
    let rowIdx = 0;
    while (rowIdx < rows.length && rows[rowIdx] > start) rowIdx++;
    if (rows[rowIdx] === undefined) rows[rowIdx] = todo.end;
    else rows[rowIdx] = todo.end;
    return { ...todo, row: rowIdx };
  });
}

function showTodoModal(todo) {
  MySwal.fire({
    title: <span style={{color:'#6366f1',fontWeight:600}}>{todo.text}</span>,
    html: (
      <div style={{textAlign:'left',fontSize:'1.08em'}}>
        <div><b>시간:</b> {todo.start} ~ {todo.end}</div>
        <div><b>상태:</b> {todo.completed ? <span style={{color:'#22c55e'}}>완료됨 ✔</span> : '진행중'}</div>
      </div>
    ),
    showCloseButton: true,
    confirmButtonText: '확인',
    customClass: {
      popup: 'swal2-todo-modal',
      confirmButton: 'swal2-todo-confirm',
    },
    width: 340,
    background: '#fff',
    backdrop: true,
  });
}

function TodayTimeline({ todos }) {
  if (!todos.length) return null;
  const today = new Date().toISOString().slice(0, 10);
  const todayTodos = todos.filter(todo => todo.date === today);
  if (!todayTodos.length) return null;
  const todosWithRow = assignTimelineRows(todayTodos);
  const rowCount = Math.max(...todosWithRow.map(t => t.row), 0) + 1;

  return (
    <div className="timeline-container custom-timeline">
      <h2 className="timeline-title">오늘의 타임라인</h2>
      <div className="timeline-hours">
        {HOURS.map(h => (
          <div
            key={h}
            className="timeline-hour"
            data-hour={h}
            style={{
              '--hour': h,
            }}
          >
            {h.toString().padStart(2, '0')}
          </div>
        ))}
      </div>
      <div className="timeline-bar-bg" style={{ height: `${rowCount * 38}px` }}>
        {todosWithRow.map((todo, idx) => {
          const left = timeToPercent(todo.start);
          const right = timeToPercent(todo.end);
          const width = Math.max(right - left, 2);
          const color = COLORS[idx % COLORS.length];
          return (
            <div
              key={todo.id}
              className={`timeline-bar-custom${todo.completed ? ' completed' : ''}`}
              style={{
                left: `${left}%`,
                width: `${width}%`,
                background: todo.completed ? '' : color,
                borderColor: todo.completed ? color : 'transparent',
                top: `${todo.row * 38 + 6}px`,
                cursor: 'pointer',
              }}
              title={`${todo.start}~${todo.end}  ${todo.text}`}
              onClick={() => showTodoModal(todo)}
            >
              <span className="timeline-bar-time">{todo.start}~{todo.end}</span>
              <span className="timeline-bar-text">{todo.text}</span>
              {todo.completed && <span className="timeline-bar-check">✔</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodayTimeline;
