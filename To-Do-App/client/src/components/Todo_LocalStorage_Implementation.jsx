import React from 'react'
import { useState, useEffect } from 'react'

const Todo3 = () => {
    
    // localStorage se todo load ho raha hai
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });
    const [inputValue, setInputValue] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    const [editValue, setEditValue] = useState("");
    
    // Jab bhi todo badlega to localstorage me save hoga
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const HandlerSubmit = (e) => {
        e.preventDefault();
        if(inputValue.trim() === "") return;
        setTodos([...todos, { text: inputValue, completed: false }]);
        setInputValue("");
    }

    const deleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    const toggleComplete = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    const startEdit = (index) => {
        setEditIndex(index);
        setEditValue(todos[index].text);
    }

    const saveEdit = (index) => {
        const newTodos = [...todos];
        newTodos[index].text = editValue;
        setTodos(newTodos);
        setEditIndex(-1);
    }

  return (
    
    <>
    <h1 className='bg-red-600 text-amber-100 text-5xl text-center py-7'>
        My Todos
    </h1>

    <form onSubmit={HandlerSubmit}
    className='flex justify-center mt-6 mb-8'
    >
        <p className='mt-5 mx-2'>Title:</p>
        <input 
        type="text"
        placeholder='Add a todo'
        className='border-2 border-black rounded-lg p-2 m-2'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
         />

         <button type='submit'
         className='bg-amber-400 rounded-lg p-2 m-2 hover:bg-amber-500'>Add Todo</button>

        <button 
          type="button"
          className="bg-black text-amber-100 rounded-lg p-2 m-2 hover:bg-gray-800" 
          onClick={() => setTodos([])}
        >
          Clear All
        </button>
    </form>

    <div className="max-w-2xl mx-auto px-4">
        {todos.length === 0 ? (
            <p className="text-center text-gray-500 my-4">No todos yet. Add one above!</p>
        ) : (
            <ul className="divide-y divide-gray-200 border rounded-lg overflow-hidden">
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        className='p-4 flex items-center justify-between bg-white hover:bg-gray-50'
                    >
                        {editIndex === index ? (
                            <div className="flex items-center flex-1">
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="border rounded px-2 py-1 flex-1 mr-2"
                                    autoFocus
                                />
                                <button 
                                    onClick={() => saveEdit(index)}
                                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center flex-1">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleComplete(index)}
                                    className="mr-3 h-5 w-5"
                                />
                                <span className={`text-lg ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                                    {todo.text}
                                </span>
                            </div>
                        )}
                        
                        <div className="flex gap-2">
                            {editIndex !== index && (
                                <button
                                    onClick={() => startEdit(index)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                onClick={() => deleteTodo(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
    </>
  )
}

export default Todo3