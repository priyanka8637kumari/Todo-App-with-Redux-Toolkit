import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../features/Todo/TodoSlice';

const store = configureStore({
    reducer: {
        todos: todoReducer, // Define the slice name as "todos"
    },
})

export default store; 