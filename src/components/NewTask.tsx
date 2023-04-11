import { FormEvent } from "react";



export const NewTask = (props:{
  handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void
  
}) => ( 
<div className="form-container">
<form onSubmit={props.handleFormSubmit}>
  <h1>To Do Form </h1>
  <p>
    <label>Title</label>
  </p>
  <p>
    <input name="Title" className="input-field" id="title" />
  </p>
  <p>
    <label>Due Date</label>
  </p>
  <p>
    <input name="Date" type="date" className="input-field" />
  </p>
  <p>
    <label>Priority</label>
  </p>
  <p>
    <select name="Priority" className="input-field">
      <option className="important" value="1">
        Important
      </option>
      <option selected value="2">
        Normal
      </option>
      {/* <option>Urgent</option> */}
    </select>
  </p>
  <p>
    <label>Description</label>
  </p>
  <p>
    <input name="Description" className="input-field" />
  </p>
  <p>
    <input type="submit" value="Add" className="submit" />
  </p>
</form>
</div>
);
