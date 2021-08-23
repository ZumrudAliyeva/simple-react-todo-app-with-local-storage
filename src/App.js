import './App.css';
import {useState, useEffect} from 'react';

const getLocalStorage = () => {
  let list = localStorage.getItem("lists");

if (list) {
  return JSON.parse(localStorage.getItem("lists"));
}else{
  return [];
}
}


function App() {
const [todos, setTodos] = useState(getLocalStorage());
const [input, setInput] = useState("");


useEffect(() => {
  localStorage.setItem('lists', JSON.stringify(todos))
}, [todos]);

  function addTodo(e) {
    e.preventDefault();
    const newTodo = {id: new Date().getTime().toString(), text: input}
    setTodos([...todos, newTodo]);
    setInput("");
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));

}


  return (
    <div className="App">
      <h1>My Todo List <i class="far fa-smile-beam"></i></h1>
<form>
      <input type="text" placeholder="Let's do something 🙃" value={input} onChange={e => setInput(e.target.value)} />
      <button className="btn__add" type="submit" onClick={addTodo}><i class="fas fa-plus"></i></button>
      </form>
      <ul className="todo__box">
      {todos.map((todo) => {
        const {id, text} = todo;
        return(
        <li  key={id}>
        <p>{text}</p>
        <button className="btn__dlt" onClick={() => deleteTodo(id)}><i class="fas fa-trash"></i></button>
        </li>
          )
        })}
        </ul>
    </div>
  );
}

export default App;
