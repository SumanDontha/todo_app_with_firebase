import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TodoListItem from './Todo/Todo'

import { useState, useEffect } from 'react'
import { db } from './firebase_config';
import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = () => {
    db.collection('todos').onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress
        }))
      )
    })
  }

  const addTodo = (e) => {
    e.preventDefault();
    //console.log(`You have typed...`)

    db.collection('todos').add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todo
    })
    setTodo('')
  }

  return (
    <div>
      <div className="App" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
        <h1> Suman Dontha Todos App 🙂 </h1>
        <form>
        <TextField
          id="standard-basic"
          label="Write a Todo"
          style={{ width: '90vw', maxWidth: '500px'}}  
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value)
            // console.log(`This is the todo input value ${e.target.value}`)
          }
          }
          />
          <Button type="submit" variant="contained" color="primary" onClick={addTodo} style={{ display: 'none' }}>
            Primary
          </Button>
        </form>

        <div style={{ width: '90vw', maxWidth: '500px', marginTop: '24px'}} >
        {todos.map((todo) => (
          <TodoListItem todo={todo.todo} inprogress={todo.inprogress} id={todo.id}/>
        ))}
       </div>

      </div>
    </div>
  );
}

export default App;
