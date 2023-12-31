/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  const updatedTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) => 
       todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      setInput("");
    } else {
      updatedTodo(input, editTodo.id, editTodo.completed);
    }
    setEditTodo("")
  };
  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Enter your task..."
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button
        className="button-add"
        type="submit" 
      >
        {editTodo ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default Form;
