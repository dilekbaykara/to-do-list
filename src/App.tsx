import './App.css';
import { useState } from 'react';

interface ToDo {
  title: string
  priority: "normal" | "important"
  description: string
  checked: boolean
  duedate: Date
}

const myToDo1: ToDo = {
  checked: true,
  description: "Take out the trash",
  duedate: new Date(2023,1,30),
  priority: 'important',
  title: "Chores"
  }

  const myToDo2: ToDo = {
    checked: false,
    description: "Throw away paper",
    duedate: new Date(2023,1,31),
    priority: 'normal',
    title: "Chores"
    }

function ToDoItem(props:{toDo:ToDo}){
return <div>
  <input type="checkbox" checked = {props.toDo.checked}/>
  <span>{props.toDo.description}</span>
  <br/>
  <span>{props.toDo.duedate.toLocaleDateString()}</span>
</div>
}


function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

function App(): JSX.Element {
  return (
    <div className="App">
      <h1>To-Do-List</h1>
      <Example/>
      <ToDoItem toDo={myToDo1}/>
      <ToDoItem toDo={myToDo2}/>
    </div>
  );
}

export default App;
