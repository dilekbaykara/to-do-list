import { ToDo } from "../types/ToDo";
import { Greeting } from "./Greeting";
import { ToDoItem } from "./ToDoItem";

  export const ActiveTasks = (props:{
    newTask: () => void
    showActive: () => void
    toDos: ToDo[]
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
          {toDos.length} {toDos.length === 1 ? "Active Task" : "Active Tasks"}
        </div>
        <div className="status-container">
          <button className="activeButton" onClick={props.showActive}>
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
          // prioritySelect={function (updatedPriority: any) {
          //   const updatedToDos = toDos.map((x) =>
          //     x === toDoItem ? ({ ...x, priority: updatedPriority } as any) : x
          //   );

          //   setToDos(updatedToDos);
          // }}
          // onCheckBoxCheck={function (checked: true | false) {
          //   const updatedToDos = toDos.map((x) =>
          //     x === toDoItem ? ({ ...x, checked } as any) : x
          //   );
          //   setToDos(updatedToDos);
          // }}
          // handleDateChange={function(newDate: any){
          //   const updatedToDos = toDos.map((x) => 
          //   x === toDoItem ? ({...x, date: newDate } as any) : x);

          //   setToDos(updatedToDos)
          // }}
          onUpdateTodo={function (updates: any) {
            const updatedToDos = toDos.map((x) => 
            x === toDoItem ? ({...x, ...updates } as any) : x);
          console.log(...updates)
          setToDos(updatedToDos)
            // todo
          }}
        />
      ))}
      <div></div>
      <div></div>
    </div>
  );
