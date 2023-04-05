import { ToDo } from "../types/ToDo";

export function ToDoItem(props: {
  toDo: ToDo;
  onDeleteToDo: any;
  // prioritySelect: any; // todo: remove this
  // onCheckBoxCheck: any; // todo: remove this
  // handleDateChange: any; // todo: remove this
  onUpdateTodo: any; // condense to this
}) {
  const handleOptionsChange = (event: any) => {
    const selectBox = event.target;
    const newValue = selectBox.value;
    const newPriority = parseInt(newValue);
    // props.prioritySelect(newPriorityNumber); // todo: remove
    // Homework
    props.onUpdateTodo({ priority: newPriority })
  };
  const checkBoxCheck = (event: any) => {
    const checkBox = event.currentTarget.checked;
    const newCheckBoxValue = checkBox;
    // console.log(checkBox);
    // props.onCheckBoxCheck(newCheckBoxValue);// todo: remove
    // Homework
    props.onUpdateTodo({ checked: newCheckBoxValue })
  };
  const handleDateChange =(event: any) => {
    const newDate = event.target.value;
    // props.handleDateChange(newDate); // todo: remove
    props.onUpdateTodo({ duedate: newDate })

    console.log(newDate)
  }

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
        <span className="to-do-date-container">
        <input name="Date" type="date" className="to-do-date-input" value={props.toDo.duedate
            ? new Date(props.toDo.duedate).toISOString().split('T')[0]
            : undefined} onChange={handleDateChange}/>
         
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
