import { ToDo } from "../types/ToDo";
import { Greeting } from "./Greeting";
import { ToDoItem } from "./ToDoItem";

  export const ActiveTasks = (props:{
    newTask: () => void
    showActive: () => void
    toDos: ToDo[];
    showDone: () => void
    visibleTodos: ToDo[];
    
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
        <div id="completed-task-counter">
          {props.toDos.length} {props.toDos.length === 1 ? "Active Task" : "Active Tasks"}
        </div>
        <div className="status-container">
          <button className="activeButton" onClick={props.showActive}>
            Active
          </button>
          <button className="doneButton" onClick={props.showDone}>
            Done
          </button>
        </div>
      </div>
      <hr />

      {props.visibleTodos.map((toDoItem: ToDo) => (
        <ToDoItem
          toDo={toDoItem}
          onDeleteToDo={function () {
            const updatedToDos = toDos.filter((x: ToDo) => x !== toDoItem);
            setToDos(updatedToDos);
          }}
          onUpdateTodo={function (updates: any) {
            const updatedToDos = toDos.map((x: ToDo) => 
            x === toDoItem ? ({...x, ...updates } as any) : x);
          console.log(...updates)
          setToDos(updatedToDos)
           
          }}
        />
      ))}
      <div></div>
      <div></div>
    </div>
  );
function setToDos(updatedToDos: any) {
  throw new Error("Function not implemented.");
}
