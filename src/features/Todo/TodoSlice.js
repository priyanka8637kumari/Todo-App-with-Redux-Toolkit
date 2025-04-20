import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: nanoid(),
                text:action.payload,
                completed: false,
            }
            state.todos.push(newTodo);
        },

        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },

        updateTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.text = action.payload.text;
            }
        },

        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },

        setTodos: (state, action) => {
            state.todos = action.payload;
        },
    },
});

export const { addTodo, removeTodo, updateTodo, toggleTodo, setTodos} = todoSlice.actions;

export default todoSlice.reducer;
