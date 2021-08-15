import { createAction } from '@reduxjs/toolkit';

export const addTodo = createAction('todo/Add');

export const removeTodo = createAction('todo/Remove');

export const changeTodo = createAction('todo/Change');

export const setCurrentTodo = createAction('todo/Current');
