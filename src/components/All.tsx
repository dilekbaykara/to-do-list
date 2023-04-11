import { ToDo } from "../types/ToDo";
import { Greeting } from "./Greeting";
import { ToDoItem } from "./ToDoItem";

export const AllTasks = (props: {
  newTask: () => void;
  showActive: () => void;
  toDos: ToDo[];
  showDone: () => void;
  setToDos: (value: React.SetStateAction<ToDo[]>) => void;
}) => (
  <div className="App">
    <div className="greeting-container">
      <div className="greeting">
        <Greeting />
      </div>
      <button className="task-button" onClick={props.newTask}>
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
        {props.toDos.length} {props.toDos.length === 1 ? "Task" : "Tasks"}
      </div>
      <div className="status-container">
        <button id="allButton">All</button>
        <button id="activeButton" onClick={props.showActive}>
          Active
        </button>
        <button id="doneButton" onClick={props.showDone}>
          Done
        </button>
      </div>
    </div>
    <hr />

    {props.toDos.map((toDoItem: ToDo) => (
      <ToDoItem
        onDeleteToDo={function () {
          const updatedToDos = props.toDos.filter((x) => x !== toDoItem);
          props.setToDos(updatedToDos);
        }}
        onUpdateTodo={function (updates: any) {
          const updatedToDos = props.toDos.map((x) =>
            x === toDoItem ? ({ ...x, ...updates } as any) : x
          );
          console.log(updates);
          props.setToDos(updatedToDos);
        }}
        toDo={toDoItem}
      />
    ))}
  </div>
);
