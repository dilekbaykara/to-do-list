import "./App.css";
//import { useState } from "react";//
// Time of day Greeting for User at top of page
function Greeting() {
  let timeOfDay;
  const date = new Date();
  const hours = date.getHours();


  if (hours < 12) {
    timeOfDay = 'Morning';
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = 'Afternoon';
  } else {
    timeOfDay = 'Evening';
  }

  return (
    <h1>Good {timeOfDay}</h1>
  )
};

interface ToDo {
  title: string;
  priority: "normal" | "important";
  description: string;
  checked: boolean;
  duedate: Date;
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
  title: "Chores",
};

function ToDoItem(props: { toDo: ToDo }) {
  return (
    <div className ="to-do-item">
      <input type="checkbox" className="checkbox" checked={props.toDo.checked} />
      <span>{props.toDo.description}</span>
      <br />
      <span>{props.toDo.duedate.toLocaleDateString()}</span>
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

function App(): JSX.Element {
  return (
    <div className="App">
      <div className="greeting-container">
      <div className="greeting"><Greeting/></div>
      <button className="task-button">New Task</button>
      <div className="date-container">
      Today is {new Date().toLocaleString("en-US", { weekday: 'long'})}
      <br/>
      <div className="current-date">
      {new Date().toLocaleString("en-US", { month: "long", day: '2-digit'})}, {new Date().getFullYear()}
      </div>
      </div>
      </div>
      <div className="task-container">
      <div className="task-counter">2 Tasks</div>
      <div className="status-container">
        <button>Active</button>
        <button>Done</button>
      </div>
      </div>
      <hr/>
      <ToDoItem toDo={myToDo1} />
      <ToDoItem toDo={myToDo2} />
    </div>
  );
}

export default App;
