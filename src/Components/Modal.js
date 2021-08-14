import React from 'react';
import styled from 'styled-components';

const Modal = ({ cursorPos }) => {
  const Wrapper = styled.div`
    position: absolute;
    top: ${cursorPos};
    left: 50%;
  `;
  return (
    <div>
      <ul>
        <li>
          <form action='submit'>
            <input type='text' name='event-name' />
            <input type='text' name='event-date' />
            <input type='text' name='event-timer' />
            <input type='text' name='event-notes' />
            <button type='button'>Cancel</button>
            <button type='submit'>Save</button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default Modal;
