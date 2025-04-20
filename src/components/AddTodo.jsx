import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/Todo/TodoSlice";

function AddTodo({ editingTodo, handleUpdate }) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  //load todos from local storage on component mount
  useEffect(() => {
    if (editingTodo) {
      setInput(editingTodo.text);
    } else {
      setInput("");
    }
  }, [editingTodo]);


  const handleAddTodo = (e) => {
    e.preventDefault();
    if (editingTodo) {
      handleUpdate(input);
    } else {
      dispatch(addTodo(input));
    }
    setInput("");
  };

  return (
    <div className="mb-4 w-full max-w-md">
      <form onSubmit={handleAddTodo} className="flex gap-2 items-center">
        <input
          className="border-2 border-gray-300 rounded p-2 w-full focus:outline-none focus:border-blue-500 transition duration-300"
          type="text"
          placeholder="Enter todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          className="px-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600 border-2 border-blue-500 transition duration-300"
        type="submit">
          {editingTodo ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
