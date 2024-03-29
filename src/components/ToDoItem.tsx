import { ToDo } from "../types/ToDo";

export function ToDoItem(props: {
  toDo: ToDo;
  onDeleteToDo: any;
  onUpdateTodo: any;
}) {
  const handleOptionsChange = (event: any) => {
    const selectBox = event.target;
    const newValue = selectBox.value;
    const newPriority = parseInt(newValue);

    props.onUpdateTodo({ priority: newPriority });
  };
  const checkBoxCheck = (event: any) => {
    const checkBox = event.currentTarget.checked;
    const newCheckBoxValue = checkBox;

    props.onUpdateTodo({ checked: newCheckBoxValue });
    console.log(newCheckBoxValue);
  };
  const handleDateChange = (event: any) => {
    const newDate = event.target.value;

    props.onUpdateTodo({ duedate: newDate });

    console.log(newDate);
  };

  const handleTitleChange = (event: any) => {
    const newTitle = event.target.value;
    props.onUpdateTodo({ title: newTitle });
  };

  const handleDescriptionChange = (event: any) => {
    const newDescription = event.target.value;
    props.onUpdateTodo({ description: newDescription });
  };

  if (!props.toDo) {
    return <p>Missing To Do</p>;
  }

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
          <input
            name="Title"
            className="to-do-title-input"
            value={props.toDo.title}
            onChange={handleTitleChange}
          />
          <span className="to-do-date-container">
            <input
              name="Date"
              type="date"
              className="to-do-date-input"
              value={
                props.toDo.duedate
                  ? new Date(props.toDo.duedate).toISOString().split("T")[0]
                  : undefined
              }
              onChange={handleDateChange}
            />
          </span>
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
        </div>
        <div className="description-box">
          <textarea
            className="description"
            value={props.toDo.description}
            onChange={handleDescriptionChange}
          />
        </div>
      </div>
      <br />
    </div>
  );
}
