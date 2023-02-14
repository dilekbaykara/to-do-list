import "./App.css";
import { useState, FormEvent, useEffect } from "react"; //
import { stringify } from "querystring";
import { render } from "@testing-library/react";
import React from "react";
import { toEditorSettings } from "typescript";
import ReactDOM from "react-dom";
import { getPriority, setPriority } from "os";
import { parse } from "path";
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
  priority: 1 | 2;
  description: string;
  checked: boolean;
  duedate?: Date;
}

const myToDo1: ToDo = {
  checked: true,
  description: "Take out the trash",
  duedate: new Date(2023, 1, 30),
  priority: 2,
  title: "Chores",
};

const myToDo2: ToDo = {
  checked: false,
  description: "Throw away paper",
  duedate: new Date(2023, 1, 31),
  priority: 1,
  title: "To Do",
};

// PROBLEM AREA FOR SHOWING FUNCTION FOR DONE BOARD

//CHECKBOX PROBLEM AREA
function Checkbox(): JSX.Element {
  const [checked, setChecked] = useState(false);
  // function showDone(){
  //   const toDoList = initialTodos.filter(Checkbox(), checked === true)
  //   return toDoList
  // }
  // const doneToDos = toDoList.map()
  const handleCheck = () => {
    setChecked(!checked);
    if (checked === false) return {};
    else return function showActive() {};
  };
  return (
    <div>
      <input
        type="checkbox"
        id="checkbox"
        checked={checked}
        onClick={handleCheck}
      />
    </div>
  );
}

// function deleteToDo(isDeleted: true)
// { if (isDeleted === true){
//   return null;
// }
// return {ToDoItem}
// }

function ToDoItem(props: {
  toDo: ToDo;
  onDeleteToDo: any;
  prioritySelect: any;
}) {
  const handleOptionsChange = (event: any) => {
    const selectBox = event.target
    const newValue = selectBox.value
    const newPriorityNumber = parseInt(newValue)
    props.prioritySelect(newPriorityNumber)
    // props.prioritySelect(parseInt(event.target.value));
  };
  return (
    <div className="to-do-item" data-priority={props.toDo.priority} id="to-do-item">
      <div className="checkbox-title-container">
        <div className="check-title-div">
          {Checkbox()}
          <h2 className="to-do-title">{props.toDo.title}</h2>
        </div>
        <div id="delete-div">
          <select
            name="Priority"
            className="select-field"
            value={props.toDo.priority}
            onChange={handleOptionsChange}
          >
            <option value="1">
              Important
            </option>
            <option value="2">
              Normal
            </option>
          </select>
          <button id="delete" onClick={props.onDeleteToDo}>
            Delete
          </button>
        </div>
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

const initialTodosString = localStorage.getItem("toDoList");

const initialTodos = initialTodosString
  ? JSON.parse(initialTodosString)
  : [myToDo1, myToDo2];

function App(): JSX.Element {
  const [toDos, setToDos] = useState<ToDo[]>(initialTodos);
  const [addingToDo, setAddingToDo] = useState(false);

  useEffect(
    function () {
      localStorage.setItem("toDoList", JSON.stringify(toDos));
    },
    [toDos]
  );

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
        priority: parseInt(data.Priority as string) as 2 | 1,
        description: data.Description as string,
        checked: false,
      },
    ]);
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
            <input name="Title" className="input-field" id="title" />
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
              <option className="important" value="1">
                Important
              </option>
              <option selected value="2">
                Normal
              </option>

              {/* <option>Urgent</option> */}
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
        <div className="task-counter">
          {toDos.length} {toDos.length === 1 ? "Task" : "Tasks"}
        </div>
        <div className="status-container">
          <button className="activeButton">Active</button>
          <button className="doneButton">Done</button>
        </div>
      </div>
      <hr />
      {/* <ToDoItem toDo={myToDo1} /> */}
      {/* <ToDoItem toDo={myToDo2} /> */}
      {/* toDos is the source array, map is creating a new array by calling the 
      given function in each item in the source array, it is then passed to the ToDo(interface) item component
      ToDoItem component has props(toDo=toDoItem,onDeleteToDo) */}
      {/* toDoItem=name of each object in the toDos array, ToDo is an interface that is the typeof the function argument*/}
      {toDos.map((toDoItem: ToDo) => (
        <ToDoItem
          onDeleteToDo={function () {
            const filterToDos = toDos.filter((x) => x !== toDoItem);
            setToDos(filterToDos);
          }}
          //Priority function to call to return a different colored div

          prioritySelect={function (updatedPriority: any) {
            const updatedToDos = toDos.map((x) =>
              x === toDoItem ? ({ ...x, priority: updatedPriority } as any) : x
            );
            console.log(updatedToDos);
            setToDos(updatedToDos);
          }}
          toDo={toDoItem}
          // onCheckBoxClick={function () {
          //   const filterDoneTasks = toDos.filter(x=> !== handleCheck)
          // }}
        />
      ))}
    </div>
  );
}

export default App;
