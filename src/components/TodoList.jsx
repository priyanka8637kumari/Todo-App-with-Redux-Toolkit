import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTodo,
  toggleTodo,
  updateTodo,
  setTodos,
} from "../features/Todo/TodoSlice";
import AddTodo from "./AddTodo";

function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const [editingTodo, setEditingTodo] = React.useState(null);

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleUpdate = (text) => {
    if (editingTodo) {
      dispatch(updateTodo({ id: editingTodo.id, text }));
      setEditingTodo(null);
    }
  };

  //load todos from local storage on componemt mount

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      dispatch(setTodos(storedTodos));
    }
  }, [dispatch]);

  //save todos to local storage on state change
  useEffect(() => {
    if (todos && todos.length > 0) {
    localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <div className="w-full max-w-md">
      <AddTodo editingTodo={editingTodo} handleUpdate={handleUpdate} />
      <ul className="list-none p-0">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center py-2 px-4 mb-4 border-2 rounded-lg ${
              todo.completed
                ? "border-gray-400 bg-gray-300"
                : "border-gray-300 bg-white"
            }`}
          >
            <div>
              <input
                className="mr-2"
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo({ id: todo.id }))}
              />
              <span
                className={`${
                  todo.completed ? "line-through text-gray-500" : "text-black"
                }`}
              >
                {todo.text}
              </span>
            </div>
            <div className="flex gap-4">
              <button
                className={`text-blue-500 font-bold hover:text-blue-700 transition duration-300 ${
                  todo.completed ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleEdit(todo)}
                disabled={todo.completed}
              >
                ✏️
                {/* 📁 */}
              </button>

              <button
                className="text-red-500 font-bold hover:text-red-700 transition duration-300"
                onClick={() => dispatch(removeTodo(todo.id))}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
