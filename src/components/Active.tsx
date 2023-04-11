import { ToDo } from "../types/ToDo";
import { Greeting } from "./Greeting";
import { ToDoItem } from "./ToDoItem";

export const ActiveTasks = (props: {
  newTask: () => void;
  toDos: ToDo[];
  showAllTasks: () => void;
  showDone: () => void;
  setToDos: (value: React.SetStateAction<ToDo[]>) => void;
}) => {
  const activeToDos = props.toDos.filter((x) => x.checked === false);

  return (
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
        <div id="completed-task-counter">
          {activeToDos.length}{" "}
          {activeToDos.length === 1 ? "Active Task" : "Active Tasks"}
        </div>
        <div className="status-container">
          <button id="allButton" onClick={props.showAllTasks}>
            All
          </button>
          <button id="activeButton">Active</button>
          <button id="doneButton" onClick={props.showDone}>
            Done
          </button>
        </div>
      </div>
      <hr />

      {props.toDos
        .filter((x) => x.checked === false)
        .map((toDoItem: ToDo) => (
          <ToDoItem
            toDo={toDoItem}
            onDeleteToDo={function () {
              const updatedToDos = props.toDos.filter(
                (x: ToDo) => x !== toDoItem
              );
              props.setToDos(updatedToDos);
            }}
            onUpdateTodo={function (updates: any) {
              const updatedToDos = props.toDos.map((x: ToDo) =>
                x === toDoItem ? ({ ...x, ...updates } as any) : x
              );
              console.log(...updates);
              props.setToDos(updatedToDos);
            }}
          />
        ))}
      <div></div>
      <div></div>
    </div>
  );
};
