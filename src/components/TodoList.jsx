import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { useTodos } from "../context/TodoContext";

const TodoList = () => {
  const { todos, loading, toggleStatus, deleteTodo, addTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo({title: newTodo});
      setNewTodo('')
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Render TodoForm with the required props */}
      <TodoForm 
        addTodo={handleAddTodo} 
        newTodo={newTodo} 
        setNewTodo={setNewTodo} 
      />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {/* Make the todo title clickable to toggle its completion status */}
            <div className="flex">
              <span onClick={() => toggleStatus(todo.id)} className={todo.status == "pending" ? `line-through` : `none`}>{todo.title}</span>
              &nbsp;
              <span>Status: {todo.status}</span>
              <button className="border-[1px] border-black" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;