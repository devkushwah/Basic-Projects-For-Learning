import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  

  function addTodo(e) {
    e.preventDefault();

    if (inputValue.trim() === "") return; //? Empty todo add na ho

    setTodos([...todos, inputValue]);
    setInputValue(""); // Input field clear ho jaye
  }

  return (
    <>
      <h1 className="bg-black text-amber-100 text-5xl text-center py-7">My Todos</h1>

      <form className="flex justify-center" onSubmit={addTodo}>
        <input
          type="text"
          className="border-2 border-black rounded-lg p-2 m-2"
          placeholder="Add a todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <button type="submit" className="bg-black text-amber-100 rounded-lg p-2 m-2">
          Add Todo
        </button>
        <button className="bg-black text-amber-100 rounded-lg p-2 m-2" onClick={() => setTodos([])}>
          Delete
        </button>
        
      </form>

      {/* ✅ Todos List Show Karna */}
      <ul className="text-center mt-4">

        {todos.map((todo, index) => (
          <li key={index} className="text-lg">{todo}
          <button className="bg-black text-amber-100 rounded-lg p-2 m-2" onClick={() => {
            const newTodos = todos.filter((_, i) => i !== index); //! Delete karne wala todo filter karke naya array banaya
            setTodos(newTodos); // Todos update kar diye
          }}>
            <MdDelete />
          </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
