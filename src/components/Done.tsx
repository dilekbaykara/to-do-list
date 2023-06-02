import { ToDo } from "../types/ToDo";
import { Greeting } from "./Greeting";
import { ToDoItem } from "./ToDoItem";
import { Button } from "./Button";
import Footer from "./Footer";

export const DoneTasks = (props: {
  newTask: () => void;
  showActive: () => void;
  toDos: ToDo[];
  setToDos: (value: React.SetStateAction<ToDo[]>) => void;
  showAllTasks: () => void;
}) => {
  const doneToDos = props.toDos.filter((x) => x.checked === true);

  return (
    <div className="App">
      <div className="greeting-container">
        <div className="greeting">
          <Greeting />
        </div>
        <button id="task-button" onClick={props.newTask}>
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
          {doneToDos.length}{" "}
          {doneToDos.length === 1 ? "Completed Task" : "Completed Tasks"}
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
            onClick={props.showActive}
            active={false}
            color={"#6889f7"}
            textColor={"#131b2d"}
          >
            Active
          </Button>
          <Button
            id="doneButton"
            className="statusButton"
            active={true}
            color={"#6889f7"}
            textColor={"#131b2d"}
          >
            Done
          </Button>
        </div>
      </div>
      <hr />

      {props.toDos
        .filter((x) => x.checked === true)
        .map((toDoItem: ToDo) => (
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
      <Footer />
    </div>
  );
};
