import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import styled from 'styled-components';
import { setCurrentTodo } from '../redux/actions';
import { getTodos } from '../redux/todos-selectors';

const RowWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  & div {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 30px;
    margin-bottom: 3px;

    border-radius: 7px;
    background-color: #3b86ff;
    color: #fff;
  }
`;

const CalendarWrap = ({
  firstDay,
  selectedMonth,
  handleOpenModal,
  handleModalPosition,
}) => {
  const todos = useSelector(getTodos);
  const dispatch = useDispatch();
  const totalDays = 42;

  const day = firstDay.clone().subtract(1, 'day');
  const daysArray = [...Array(totalDays)].map(() =>
    day.add(1, 'day').clone()
  );
  const isCurrentDay = day => moment().isSame(day, 'day');
  const isSelectedMonth = month =>
    selectedMonth.isSame(month, 'month');

  const classesIntializer = moment => {
    if (isCurrentDay(moment)) {
      return 'date current-day';
    } else if (!isSelectedMonth(moment)) {
      return 'date opacity';
    } else {
      return 'date';
    }
  };

  const handleTodoModal = (e, todo) => {
    dispatch(setCurrentTodo(todo));
    handleModalPosition(e, todo);
    console.log(todo);
  };

  return (
    <div className='calendar-wrap'>
      {[...Array(7)].map((_, i) => (
        <div
          className='calendar-cell header-cell'
          key={shortid.generate()}
        >
          {moment()
            .day(i + 1)
            .format('ddd')}
        </div>
      ))}
      {daysArray.map(dayItem => (
        <div
          className='calendar-cell'
          key={dayItem.unix()}
          onClick={e => handleOpenModal(e, dayItem)}
        >
          <RowWrapper>
            <p className={classesIntializer(dayItem)}>
              {dayItem.format('D')}
            </p>
            {[...todos]
              .sort(
                (a, b) =>
                  new Date(`${a.date}, ${a.time}`) -
                  new Date(`${b.date}, ${b.time}`)
              )
              .map(
                todo =>
                  todo.date ===
                    dayItem.format('YYYY-MM-DD') && (
                    <div
                      id='todo'
                      key={shortid.generate()}
                      onClick={e =>
                        handleTodoModal(e, todo)
                      }
                    >
                      {todo.notes}
                    </div>
                  )
              )}
          </RowWrapper>
        </div>
      ))}
    </div>
  );
};

export default CalendarWrap;
