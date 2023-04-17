import { ToDo } from "../types/ToDo";
import { Button } from "./Button";
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
        <Button
          id="allButton"
          className="statusButton"
          active={true}
          color={"#6889f7"}
          textColor={"#131b2d"}
        >
          All
        </Button>
        <Button
          id="activeButton"
          onClick={props.showActive}
          className="statusButton"
          active={false}
          color={"#6889f7"}
          textColor={"#131b2d"}
        >
          Active
        </Button>
        <Button
          id="doneButton"
          onClick={props.showDone}
          className="statusButton"
          active={false}
          color={"#6889f7"}
          textColor={"#131b2d"}
        >
          Done
        </Button>
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
