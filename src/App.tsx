import { useState, FormEvent, useEffect, useMemo } from "react"; //
import { stringify } from "querystring";
import { render } from "@testing-library/react";
import React from "react";
import { JsxEmit, toEditorSettings } from "typescript";
import ReactDOM from "react-dom";
import { getPriority, setPriority } from "os";
import { parse } from "path";
import { createRoot } from "react-dom/client";
import "./App.css";

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
  checked: true | false;
  duedate?: number;
}

const myToDo1: ToDo = {
  checked: true,
  description: "Take out the trash",
  duedate: new Date(2023, 1, 30).getTime(),
  priority: 2,
  title: "Chores",
};

const myToDo2: ToDo = {
  checked: false,
  description: "Throw away paper",
  duedate: new Date(2023, 1, 31).getTime(),
  priority: 1,
  title: "To Do",
};

function ToDoItem(props: {
  toDo: ToDo;
  onDeleteToDo: any;
  prioritySelect: any;
  onCheckBoxCheck: any;
}) {
  const handleOptionsChange = (event: any) => {
    const selectBox = event.target;
    const newValue = selectBox.value;
    const newPriorityNumber = parseInt(newValue);
    props.prioritySelect(newPriorityNumber);
  };
  const checkBoxCheck = (event: any) => {
    const checkBox = event.currentTarget.checked;
    const newCheckBoxValue = checkBox;
    console.log(checkBox);
    props.onCheckBoxCheck(newCheckBoxValue);
  };

  // {
  //   // const newDate=

  // }

  if (!props.toDo) {
    return <p>Missing To Do</p>;
  }

  // console.log(props.toDo)

  return (
    <div
      className="to-do-item"
      data-priority={props.toDo.priority}
      id="to-do-item"
    >
      <div className="checkbox-title-container">
        <div className="check-title-div">
          <div>
            <input
              type="checkbox"
              id="checkbox"
              onChange={checkBoxCheck}
              checked={props.toDo.checked}
            />
          </div>

          <h2 className="to-do-title">{props.toDo.title}</h2>
        </div>
        <div id="delete-div">
          <select
            name="Priority"
            className="select-field"
            value={props.toDo.priority}
            onChange={handleOptionsChange}
          >
            <option value="1">Important</option>
            <option value="2">Normal</option>
          </select>
          <button id="delete" onClick={props.onDeleteToDo}>
            Delete
          </button>
        </div>
        <span className="to-do-date">
          {props.toDo.duedate
            ? new Date(props.toDo.duedate).toLocaleDateString()
            : null}
        </span>
        <div className="description-box">
          <span className="description">{props.toDo.description}</span>
        </div>
      </div>
      {/* <div className="description-box">
        <span className="description">{props.toDo.description}</span>
      </div> */}
      <br />
    </div>
  );
}

const initialTodosString = localStorage.getItem("toDoList");

const initialTodos = initialTodosString
  ? JSON.parse(initialTodosString)
  : [myToDo1, myToDo2];

function App(): JSX.Element {
  const [toDos, setToDos] = useState<ToDo[]>(initialTodos);
  const [addingToDo, setAddingToDo] = useState(false);
  const [showingDoneTasks, setShowDoneTasks] = useState(false); // show true if not
  const [showingActiveTasks, setShowActiveTasks] = useState(false); // show true if not
  const [filterTodosCompleted, setFilterTodosCompleted] = useState<any | null>(
    null
  );
  //  const [filterState, setFilterState] = useState<FilterState>(0);

  const visibleTodos = useMemo(
    () =>
      toDos.filter((toDo) => {
        if (filterTodosCompleted === null) {
          return true; // if null show all
        }
        return filterTodosCompleted === toDo.checked; // show only if completed state matches filter
      }),
    [filterTodosCompleted, toDos]
    // dependencies, when to recalculate
  );

  // function showCompletedTasks(){
  // // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  // setFilterTodosCompleted(null)
  //  }

  // const []
  //added 3-12

  // function TodoList({toDos, }) {
  //   const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

  useEffect(
    function () {
      localStorage.setItem("toDoList", JSON.stringify(toDos));
    },
    [toDos]
  );

  // function assignDoneToDo() {

  // }

  function showActive() {
    setShowActiveTasks(true);
    setFilterTodosCompleted(false);
    setShowDoneTasks(false)
  }

  const ActiveTasks = () => (
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
        <div id="completed-task-counter">
          {toDos.length} {toDos.length === 1 ? "Active Task" : "Active Tasks"}
        </div>
        <div className="status-container">
          <button className="activeButton" onClick={showActive}>
            Active
          </button>
          <button className="doneButton" onClick={showDone}>
            Done
          </button>
        </div>
      </div>
      <hr />

      {visibleTodos.map((toDoItem) => (
        <ToDoItem
          toDo={toDoItem}
          onDeleteToDo={function () {
            const updatedToDos = toDos.filter((x) => x !== toDoItem);
            setToDos(updatedToDos);
          }}
          prioritySelect={function (updatedPriority: any) {
            const updatedToDos = toDos.map((x) =>
              x === toDoItem ? ({ ...x, priority: updatedPriority } as any) : x
            );

            setToDos(updatedToDos);
          }}
          onCheckBoxCheck={function (checked: true | false) {
            const updatedToDos = toDos.map((x) =>
              x === toDoItem ? ({ ...x, checked } as any) : x
            );
            setToDos(updatedToDos);
          }}
        />
      ))}
      <div></div>
      <div></div>
    </div>
  );

  if (showingActiveTasks) {
    return <ActiveTasks />;
  }

  function showDone() {
    setShowDoneTasks(true);
    setFilterTodosCompleted(true);
    setShowActiveTasks(false)
  }

  const DoneTasks = () => (
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
        <div id="completed-task-counter">
          {toDos.length}{" "}
          {toDos.length === 1 ? "Completed Task" : "Completed Tasks"}
        </div>
        <div className="status-container">
          <button className="activeButton" onClick={showActive}>
            Active
          </button>
          <button className="doneButton" onClick={showDone}>
            Done
          </button>
        </div>
      </div>
      <hr />

      {visibleTodos.map((toDoItem) => (
        <ToDoItem
          toDo={toDoItem}
          onDeleteToDo={function () {
            const updatedToDos = toDos.filter((x) => x !== toDoItem);
            setToDos(updatedToDos);
            ////
          }}
          prioritySelect={function (updatedPriority: any) {
            const updatedToDos = toDos.map((x) =>
              x === toDoItem ? ({ ...x, priority: updatedPriority } as any) : x
            );

            setToDos(updatedToDos);
          }}
          onCheckBoxCheck={function (checked: true | false) {
            const updatedToDos = toDos.map((x) =>
              x === toDoItem ? ({ ...x, checked } as any) : x
            );
            setToDos(updatedToDos);
          }}
        />
      ))}
      <div></div>
      <div></div>
    </div>
  );

  if (showingDoneTasks) {
    return <DoneTasks />;
  }

  function newTask() {
    setAddingToDo(true);
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    // event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    ); 
    const newDueDate = new Date(data.Date as string)
    const timeZoneCorrectedDate = new Date(newDueDate.getTime()+newDueDate.getTimezoneOffset()*60*1000)//
    debugger
    setToDos([
      ...toDos,
      {
        title: data.Title as string,
        priority: parseInt(data.Priority as string) as 2 | 1,
        description: data.Description as string,
        checked: false,
        duedate: data.Date ? timeZoneCorrectedDate.getTime() : undefined,

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
          <button className="activeButton" onClick={showActive}>
            Active
          </button>
          <button className="doneButton" onClick={showDone}>
            Done
          </button>
        </div>
      </div>
      <hr />
      {showingDoneTasks ? <DoneTasks /> : null}
      {/* <ToDoItem toDo={myToDo1} /> */}
      {/* <ToDoItem toDo={myToDo2} /> */}
      {/* toDos is the source array, map is creating a new array by calling the 
      given function in each item in the source array, it is then passed to the ToDo(interface) item component
      ToDoItem component has props(toDo=toDoItem,onDeleteToDo) */}
      {/* toDoItem=name of each object in the toDos array, ToDo is an interface that is the typeof the function argument*/}

      {visibleTodos.map((toDoItem: ToDo) => (
        <ToDoItem
          onDeleteToDo={function () {
            const updatedToDos = toDos.filter((x) => x !== toDoItem);
            setToDos(updatedToDos);
            ////
          }}
          onCheckBoxCheck={function (checked: true | false) {
            const updatedToDos = toDos.map((x) =>
              x === toDoItem ? ({ ...x, checked } as any) : x
            );
            // if (checked === true) return
            // <DoneTasks/>
            // showDone()
            // console.log(updatedToDos);
            setToDos(updatedToDos);

            // const doneToDos = toDos.filter((x) => x !== toDoItem);
            // doneToDos.map((toDoItem: ToDo) => (
            // <DoneTasks/>
            // ))
            //     // if (checked === true)
            //     // return toDos.filter((x) => x !== toDoItem);
            //     // return toDos.map((toDoItem: ToDo) => (
            //     //   <DoneTasks/>
            //     // ))

            //   // console.log(doneToDos)
          }}
          //Priority function to call to return a different colored div

          prioritySelect={function (updatedPriority: any) {
            const updatedToDos = toDos.map((x) =>
              x === toDoItem ? ({ ...x, priority: updatedPriority } as any) : x
            );

            setToDos(updatedToDos);
          }}
          toDo={toDoItem}
        />
      ))}
    </div>
  );
}

export default App;
