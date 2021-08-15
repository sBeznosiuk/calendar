import moment from 'moment';
import Header from './Components/Header';
import Controls from './Components/Controls';
import CalendarWrap from './Components/CalendarWrap';
import React, { useState } from 'react';
import Modal from './Components/Modal';
import { setCurrentTodo } from './redux/actions';
import { useDispatch } from 'react-redux';

function App() {
  moment.updateLocale('en', {
    week: { dow: 1 },
  });

  const [today, setToday] = useState(moment());
  const [isShown, setIsShown] = useState(false);
  const [cursorPos, setCursorPos] = useState({});
  const [chosenDate, setChosenDate] = useState('');
  const dispatch = useDispatch();

  const firstDay = today
    .clone()
    .startOf('month')
    .startOf('week');

  const currentMonthInFormat = today
    .clone()
    .format('MMMM YYYY');

  const nextMonthHandler = () =>
    setToday(today.clone().add(1, 'month'));
  const currentMonthHandler = () => setToday(moment());
  const prevMonthHandler = () =>
    setToday(today.clone().subtract(1, 'month'));

  const handleModalPosition = (e, todo) => {
    e.preventDefault();
    setCursorPos({
      left: `${e.pageX - 100.5}px`,
      top: `${e.pageY + 40}px`,
    });
    // if (e.currentTarget.id !== 'todo') {
    //   dispatch(setCurrentTodo(1));
    // } else {
    //   dispatch(setCurrentTodo(todo));
    // }

    setIsShown(true);
    console.log(cursorPos);
  };

  const handleOpenModal = (e, day) => {
    setChosenDate(day.format('YYYY-MM-DD'));
    if (e.target.id !== 'todo') {
      handleModalPosition(e);

      dispatch(setCurrentTodo(null));
    }
  };

  const handleModalClose = () => {
    setIsShown(false);
  };

  return (
    <div className='container'>
      <Header />
      <Controls
        currentMonth={currentMonthInFormat}
        nextMonthHandler={nextMonthHandler}
        currentMonthHandler={currentMonthHandler}
        prevMonthHandler={prevMonthHandler}
      />
      <CalendarWrap
        firstDay={firstDay}
        selectedMonth={today}
        handleOpenModal={handleOpenModal}
        handleModalPosition={handleModalPosition}
      />
      {isShown && (
        <Modal
          cursorPos={cursorPos}
          handleModalClose={handleModalClose}
          chosenDate={chosenDate}
        />
      )}
    </div>
  );
}

export default App;
