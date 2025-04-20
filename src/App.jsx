import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App flex flex-col items-center justify-center min-h-screen">  
      <h1 className="text-4xl font-bold mb-8">Todo List</h1>
      {/* <AddTodo /> */}
      <TodoList />
    </div>
  );
}

export default App;
