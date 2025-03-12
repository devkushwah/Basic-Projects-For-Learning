 import React from 'react'
import  { useState, useEffect } from 'react';
import axios from 'axios';


function Todo2() {
  // API endpoints ke URLs
  const API_URL = "http://localhost:4000/api/v1/getTodo";    
  const API_URL_CREATE = "http://localhost:4000/api/v1/create";


  // State variables ko initialize karna
  const [todos, setTodos] = useState([]); // Saare todos store karne ke liye
  const [title, setTitle] = useState(""); // Naye todo ka title
  const [description, setDescription] = useState(""); // Naye todo ka description
  const [editingId, setEditingId] = useState(null); // Edit mode me konsa todo hai
  const [editTitle, setEditTitle] = useState(""); // Edit karte time title
  const [editDescription, setEditDescription] = useState(""); // Edit karte time description

  // Component load hone par todos fetch karna
  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        console.log("Fetched Todos:", res.data);
        setTodos(res.data.data);  // Sirf data array ko set karna
      })
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);
  
  // Date ko sundar format me dikhane ke liye helper function
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Naya Todo add karne ka function
  const addTodo = () => {
    if (title.trim() === "" || description.trim() === "") return; // Agar fields khali hain to kuch nahi karna
    
    axios.post(API_URL_CREATE, { title, description })
      .then((res) => {
        console.log("Added todo response:", res.data);
        // Response data ka structure check karna
        const newTodo = res.data.data || res.data;
        setTodos(prevTodos => [...prevTodos, newTodo]); // Naya todo list me add karna
        setTitle(""); // Fields ko reset karna
        setDescription("");
      })
      .catch((err) => console.error("Error adding todo:", err));
  };

  // Todo delete karne ka function
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/delete/${id}`);
      setTodos(todos.filter(todo => todo._id !== id)); // Deleted todo ko list se hatana
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Todo update karne ka function
  const updateTodo = async (id, newTitle, newDescription) => {
    try {
        const res = await axios.put(`http://localhost:4000/api/v1/update/${id}`, {
            title: newTitle,
            description: newDescription
        });

        console.log("Updated Todo:", res.data.data);
        
        // Updated todo ke saath list ko refresh karna
        setTodos(todos.map(todo => 
          todo._id === id ? res.data.data : todo
        ));
        
        // Edit mode se bahar aana
        setEditingId(null);
    } catch (error) {
        console.error("Error updating todo:", error);
    }
};
  
  // Todo ko edit karna shuru karne ka function
  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };
  
  // Editing cancel karne ka function
  const cancelEditing = () => {
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 pb-16">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Todo Manager</h2>
      
      {/* Naya Task create karne ka form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Create New Task</h3>
        
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            id="title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter task title" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            id="description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Enter task details"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
          ></textarea>
        </div>
        
        {/* Add Task button */}
        <button 
          onClick={addTodo} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Task
        </button>
      </div>
      
      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Your Tasks</h3>
      
      {/* Tasks ki list */}
      <div className="space-y-5">
        {todos.length === 0 ? (
          // Agar koi task nahi hai to empty state dikhana
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 text-lg">No tasks yet. Add one above!</p>
          </div>
        ) : (
          // Har ek task ko render karna
          todos.map((todo) => (
            <div key={todo._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              {editingId === todo._id ? (
                // Edit mode ke liye form
                <div className="space-y-4">
                  <div>
                    <label htmlFor="editTitle" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      id="editTitle"
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Edit title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="editDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      id="editDescription"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Edit description"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                  </div>
                  
                  {/* Save aur Cancel buttons */}
                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={() => updateTodo(todo._id, editTitle, editDescription)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Save Changes
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Normal view mode
                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
                    <p className="text-gray-600 mt-2 whitespace-pre-line">{todo.description}</p>
                  </div>
                  
                  {/* Task ki creation date aur action buttons */}
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-3 sm:mb-0">
                      <span className="font-medium">Created:</span> {formatDate(todo.createdAt)}
                    </p>
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <button 
                        onClick={() => startEditing(todo)} 
                        className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteTodo(todo._id)} 
                        className="flex-1 sm:flex-initial bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Todo2