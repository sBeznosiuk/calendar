import moment from 'moment';
import React from 'react';
import shortid from 'shortid';
import styled from 'styled-components';

const RowWrapper = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'flex-start'};
`;

const CalendarWrap = ({
  firstDay,
  selectedMonth,
  handleOpenModal,
}) => {
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
          onClick={handleOpenModal}
        >
          <RowWrapper justifyContent='flex-end'>
            <p className={classesIntializer(dayItem)}>
              {dayItem.format('D')}
            </p>
          </RowWrapper>
        </div>
      ))}
    </div>
  );
};

export default CalendarWrap;
