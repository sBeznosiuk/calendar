import {
  combineReducers,
  configureStore,
  createReducer,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import moment from 'moment';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  addTodo,
  removeTodo,
  setCurrentTodo,
  changeTodo,
} from './actions';

const persistConfig = {
  key: 'Todos',
  storage,
};

const todosReducer = createReducer(
  {
    items: [],
    current: {},
  },
  {
    [addTodo]: (state, { payload }) => {
      if (
        new Date() <
        new Date(`${payload.date}, ${payload.time}`)
      ) {
        return {
          items: [...state.items, payload],
        };
      } else {
        alert(
          'it is impossible to record an event on the previous date'
        );
      }
    },
    [removeTodo]: (state, { payload }) => ({
      items: [
        ...state.items.filter(i => i.id !== payload.id),
      ],
    }),
    [changeTodo]: (state, { payload }) => ({
      items: [
        ...state.items.filter(i => i.id !== payload.id),
        payload,
      ],
    }),
    [setCurrentTodo]: (state, { payload }) => ({
      ...state,
      current: payload,
    }),
  }
);

const rootReducer = combineReducers({
  todos: todosReducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
      ],
    },
  }),
  logger,
];

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware,
});

const persistor = persistStore(store);

export { store, persistor };
