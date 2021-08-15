import React, { useState } from 'react';
import {
  addTodo,
  changeTodo,
  removeTodo,
} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTodo } from '../redux/todos-selectors';
import shortid from 'shortid';
import moment from 'moment';

const Modal = ({
  cursorPos,
  handleModalClose,
  chosenDate,
}) => {
  const currentTodo = useSelector(getCurrentTodo);
  const [date, setDate] = useState(chosenDate);
  const [time, setTime] = useState(
    currentTodo ? currentTodo.time : ''
  );
  const [notes, setNotes] = useState(
    currentTodo?.notes || ''
  );
  const id = currentTodo?.id;

  const dispatch = useDispatch();

  const handleChange = e => {
    const { value, name } = e.target;

    setDate(chosenDate);

    if (name === 'event-date') {
      setDate(value);
      console.log(value);
    }
    if (name === 'event-time') {
      setTime(value);

      console.log(time);
    }
    if (name === 'event-notes') {
      value.length <= 30
        ? setNotes(value)
        : alert('Too many symbols');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleModalClose();
    console.log(time);

    if (!currentTodo) {
      const notPastDates = new Date();

      if (time.length !== 0 && notes.length !== 0) {
        dispatch(
          addTodo({
            date,
            time,
            notes,
            id: shortid.generate(),
          })
        );

        setDate('');
        setTime('');
        setNotes('');
      } else {
        alert('All fields required');
      }
    } else {
      if (time.length !== 0 && notes.length !== 0) {
        dispatch(
          changeTodo({
            date,
            time,
            notes,
            id,
          })
        );
      }
    }
  };

  const handleTodoRemove = () => {
    dispatch(removeTodo(currentTodo));
  };

  return (
    <div id='modal' style={cursorPos}>
      <ul>
        <li>
          <form action='submit' onSubmit={handleSubmit}>
            <label htmlFor='event-date'>event date</label>
            <input
              type='date'
              name='event-date'
              value={chosenDate}
              onChange={handleChange}
            />
            <label htmlFor='event-time'>event time</label>
            <input
              type='time'
              name='event-time'
              value={time}
              onChange={handleChange}
            />
            <label htmlFor='event-notes'>event notes</label>
            <input
              type='text'
              name='event-notes'
              onChange={handleChange}
              value={notes}
            />
            <div className='modal-buttons'>
              {currentTodo ? (
                <button
                  type='button'
                  onClick={handleTodoRemove}
                >
                  Remove
                </button>
              ) : (
                <button
                  type='button'
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
              )}
              {currentTodo ? (
                <button type='submit'>Change</button>
              ) : (
                <button type='submit'>Save</button>
              )}
            </div>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default Modal;
