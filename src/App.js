import './App.css';
import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [showGif, setShowGif] = useState(false);
  function addTodo() {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, isComplete: false }])
      setNewTodo('');
      setShowGif(true);
      setTimeout(() => {
        setShowGif(false);
      }, 500);
    }
  }

  function completeTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isComplete: true } : todo
    ));
  }

  function editTodo(id) {
    setEditingTodoId(id);
    const todoToEdit = todos.find(todo => todo.id === id);
    setEditingText(todoToEdit.text);
  }

  function saveTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editingText } : todo
    ));
    setEditingTodoId(null);
    setEditingText('');
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="App">
      <p className="p-jumbo">to-do list</p>
      <div className="div-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="ENTER A NEW TODO"
        />
        <button onClick={addTodo}>ADD TODO</button>
      </div>

      {showGif && (
        <div className="gif-overlay">
          <img src="add-gif.gif" className="gif-animation" />
        </div>
      )}

      {todos.length === 0 ? ( // This checks if there's nothing in the todos by getting the length of the array using .length
        <p>add a new to-do list to get started.</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li className={todo.isComplete ? 'li-todo complete' : 'li-todo'} key={todo.id}>
              {editingTodoId === todo.id ? (  // the thing checks if it's complete, if it is then it do line-through otherwise it doesn't, then it checks if editing id is equal to the current todo id 
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <h3>{todo.text}</h3>
              )}
              
              {editingTodoId === todo.id ? (
                <button onClick={() => saveTodo(todo.id)}>Save</button>
              ) : (
                <>
                  <button className={todo.isComplete ? 'button' : 'button complete'} onClick={() => completeTodo(todo.id)} disabled={todo.isComplete || editingTodoId !== null}>
                    COMPLETE
                  </button>
                  <button className={todo.isComplete ? 'button' : 'button edit'} onClick={() => editTodo(todo.id) }disabled={todo.isComplete || editingTodoId !== null}>
                    EDIT
                  </button>
                  <button className={todo.isComplete ? 'button' : 'button remove'} onClick={() => removeTodo(todo.id)} disabled={todo.isComplete || editingTodoId !== null} >
                    REMOVE
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
