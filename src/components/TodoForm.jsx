import React from "react";

const TodoForm = ({ addTodo, newTodo, setNewTodo }) => {
  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter todo title"
      />
      <button
        onClick={addTodo} // Call the addTodo function directly
      >
        Add Todo
      </button>
    </div>
  );
};

export default TodoForm;