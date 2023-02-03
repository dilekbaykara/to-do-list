import "./App.css";
import { useState, FormEvent, useEffect } from "react"; //
import { stringify } from "querystring";
// Time of day Greeting for User at top of page


function Greeting() {
  let timeOfDay;
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    timeOfDay = "Morning";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "Afternoon";
  } else {
    timeOfDay = "Evening";
  }

  return <h1>Good {timeOfDay}</h1>;
}

interface ToDo {
  title: string;
  priority: "normal" | "important";
  description: string;
  checked: boolean;
  duedate?: Date;
}

const myToDo1: ToDo = {
  checked: true,
  description: "Take out the trash",
  duedate: new Date(2023, 1, 30),
  priority: "important",
  title: "Chores",
};

const myToDo2: ToDo = {
  checked: false,
  description: "Throw away paper",
  duedate: new Date(2023, 1, 31),
  priority: "normal",
  title: "To Do",
};

function Checkbox() {
  const [checked, setChecked] = useState(false);
  const handleCheck =() => {
    setChecked(!checked)
  }
  return (
    <div>
      <input type="checkbox" id="checkbox" checked={checked} onClick={handleCheck} />
       
    </div>
  );
}

function ToDoItem(props: { toDo: ToDo, handleChange: any})

{
  return (
    <div className="to-do-item">
      <div className="checkbox-title-container">
      {Checkbox()
      
      /* <input
        type="checkbox"
        className="checkbox"
        checked={checked}
        onClick={handleCheck}
        // onChange={()=>{props.handleChange(props.toDo.checked)}}
     */}
      <h2 className="to-do-title">{props.toDo.title}</h2>
      </div>
      <div className="description-box">
      <span className="description">{props.toDo.description}</span>
      </div>
      <br />
      <span className="to-do-date">
        {/* {props.toDo.duedate.toLocaleDateString()} */}
      </span>
    </div>
  );
}






//Set Counter example below//
/**function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}**/

const initialTodosString = localStorage.getItem('toDoList')

const initialTodos = initialTodosString
 ? JSON.parse(initialTodosString)
 : [myToDo1, myToDo2]

function App(): JSX.Element {
  const [toDos, setToDos] = useState(initialTodos);
  const [addingToDo, setAddingToDo] = useState(false);

  useEffect(function () {
    localStorage.setItem('toDoList', JSON.stringify(toDos))
  }, [ toDos ])

  function newTask() {
    setAddingToDo(true);
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    );
    setToDos([
      ...toDos,
      {
        title: data.Title as string,
        priority: data.Priority as "normal" | "important",
        description: data.Description as string,
        checked: false,
      },
    ]);
    setAddingToDo(false)
  }

  if (addingToDo) {
    return (
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <h1>To Do Form </h1>
          <p>
            <label>Title</label>
          </p>
          <p>
            <input name="Title" className="input-field" id="title"/>
          </p>
          <p>
            <label>Due Date</label>
          </p>
          <p>
            <input name="Date" type="date" className="input-field" />
          </p>
          <p>
            <label>Priority</label>
          </p>
          <p>
            <select name="Priority" className="input-field">
              <option>Important</option>
              <option selected>Normal</option>
            </select>
          </p>
          <p>
            <label>Description</label>
          </p>
          <p>
            <input name="Description" className="input-field" />
          </p>
          <p>
            <input type="submit" value="Add" className="submit" />
          </p>
        </form>
      </div>
    );
  }
  return (
    <div className="App">
      <div className="greeting-container">
        <div className="greeting">
          <Greeting />
        </div>
        <button className="task-button" onClick={newTask}>
          New Task
        </button>
        <div className="date-container">
          Today is {new Date().toLocaleString("en-US", { weekday: "long" })}
          <br />
          <div className="current-date">
            {new Date().toLocaleString("en-US", {
              month: "long",
              day: "2-digit",
            })}
            , {new Date().getFullYear()}
          </div>
        </div>
      </div>
      <div className="task-container">
        <div className="task-counter">{toDos.length} {toDos.length === 1 ? "Task" : "Tasks"}</div>
        <div className="status-container">
          <button>Active</button>
          <button>Done</button>
        </div>
      </div>
      <hr />
      {/* <ToDoItem toDo={myToDo1} /> */}
      {/* <ToDoItem toDo={myToDo2} /> */}
      {toDos.map((toDoItem: ToDo) => (
        <ToDoItem handleChange toDo={toDoItem} />
      ))}
    </div>
  );
}

export default App;
