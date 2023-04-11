import { FormEvent, useEffect, useState } from "react"; //
import "./App.css";
import { ActiveTasks } from "./components/Active";
import { AllTasks } from "./components/All";
import { DoneTasks } from "./components/Done";
import { NewTask } from "./components/NewTask";
import { ToDo } from "./types/ToDo";

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

const initialTodosString = localStorage.getItem("toDoList");

const initialTodos = initialTodosString
  ? JSON.parse(initialTodosString)
  : [myToDo1, myToDo2];

export function App(): JSX.Element {
  const [toDos, setToDos] = useState<ToDo[]>(initialTodos);
  const [addingToDo, setAddingToDo] = useState(false);
  const [showingDoneTasks, setShowDoneTasks] = useState(false); // show true if not
  const [showingActiveTasks, setShowActiveTasks] = useState(false); // show true if not

  useEffect(
    function () {
      localStorage.setItem("toDoList", JSON.stringify(toDos));
    },
    [toDos]
  );

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    // event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    );
    const newDueDate = new Date(data.Date as string);
    const timeZoneCorrectedDate = new Date(
      newDueDate.getTime() + newDueDate.getTimezoneOffset() * 60 * 1000
    ); //
    debugger;
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
    return <NewTask handleFormSubmit={handleFormSubmit} />;
  }

  function showAllTasks() {
    setShowDoneTasks(false);
    setShowActiveTasks(false);
  }

  function showDone() {
    setShowDoneTasks(true);
    setShowActiveTasks(false);
  }

  function showActive() {
    setShowActiveTasks(true);
    setShowDoneTasks(false);
  }

  function newTask() {
    setAddingToDo(true);
  }

  if (showingActiveTasks) {
    return (
      <ActiveTasks
        setToDos={setToDos}
        showAllTasks={showAllTasks}
        newTask={newTask}
        toDos={toDos}
        showDone={showDone}
      />
    );
  }

  if (showingDoneTasks) {
    return (
      <DoneTasks
        newTask={newTask}
        showActive={showActive}
        toDos={toDos}
        setToDos={setToDos}
        showAllTasks={showAllTasks}
      />
    );
  }

  return (
    <AllTasks
      newTask={newTask}
      showActive={showActive}
      toDos={toDos}
      showDone={showDone}
      setToDos={setToDos}
    />
  );
}

export default App;
