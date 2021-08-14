import moment from 'moment';
import Header from './Components/Header';
import Controls from './Components/Controls';
import CalendarWrap from './Components/CalendarWrap';
import React, { useState } from 'react';
import Modal from './Components/Modal';

function App() {
  moment.updateLocale('en', {
    week: { dow: 1 },
  });

  const [today, setToday] = useState(moment());
  const [isShown, setIsShown] = useState(false);
  const [cursorPos, setCursorPos] = useState(0);

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

  const handleOpenModal = e => {
    setCursorPos(e.clientY);
    setIsShown(true);
    console.log(cursorPos);
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
      />
      {isShown && <Modal cursorPos={cursorPos} />}
    </div>
  );
}

export default App;
