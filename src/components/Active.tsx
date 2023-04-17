import { ToDo } from "../types/ToDo";
import { Greeting } from "./Greeting";
import { ToDoItem } from "./ToDoItem";
import { Button } from "./Button";

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
          <Button
            id="allButton"
            className="statusButton"
            onClick={props.showAllTasks}
            active={false}
            color={"#6889f7"}
            textColor={"#131b2d"}
          >
            All
          </Button>

          <Button
            id="activeButton"
            className="statusButton"
            active={true}
            color={"#6889f7"}
            textColor={"#131b2d"}
          >
            Active
          </Button>
          <Button
            id="doneButton"
            className="statusButton"
            onClick={props.showDone}
            active={false}
            color={"#6889f7"}
            textColor={"#131b2d"}
          >
            Done
          </Button>
        </div>
      </div>
      <hr />

      {props.toDos
        .filter((x) => !x.checked)
        .map((toDoItem: ToDo) => (
          <ToDoItem
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
              props.setToDos(updatedToDos);
            }}
            toDo={toDoItem}
          />
        ))}
      <div></div>
      <div></div>
    </div>
  );
};
