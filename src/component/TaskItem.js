import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

function TaskItem({ task, task_key, deleteTask, editTask }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [newDes, setNewDes] = useState(task.des);
  const [newDueDate, setNewDueDate] = useState(task.date);
  const [newStatus, setNewStatus] = useState(task.status);
  const [newTitle, setNewTitle] = useState(task.title);
  const [buttonText, setButtonText] = useState(false);
  const handleEdit = (event) => {
    event.preventDefault();
    if (showEditForm) {
      const newData = {
        title: newTitle,
        des: newDes,
        status: newStatus,
        date: newDueDate,
      };
      editTask(task_key, newData);
    }
    setButtonText(!buttonText);
    setShowEditForm(!showEditForm);
  };
  return (
    <div style={{ width: "100%" }}>
      <div>
        {showEditForm ? (
          <input
            type="text"
            value={newTitle}
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
          />
        ) : (
          <div>
            {task.title}
            <FaTimes
              style={{ color: "red", cursor: "pointer", float: "right" }}
              onClick={() => deleteTask(task_key)}
            />
          </div>
        )}
      </div>
      <div>
        Description:{" "}
        {showEditForm ? (
          <input
            type="text"
            value={newDes}
            onChange={(event) => {
              setNewDes(event.target.value);
            }}
          />
        ) : (
          task.des
        )}
      </div>
      <div>
        Due Date:{" "}
        {showEditForm ? (
          <input
            type="text"
            value={newDueDate}
            onChange={(event) => {
              setNewDueDate(event.target.value);
            }}
          />
        ) : (
          task.date
        )}
      </div>
      <div>
        Status:{" "}
        {showEditForm ? (
          <select
            onChange={(event) => {
              setNewStatus(event.target.value);
            }}
            value={newStatus}
          >
            <option value="To-do">To-do</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Done">Done</option>
          </select>
        ) : (
          task.status
        )}
      </div>
      <button onClick={handleEdit}>{buttonText ? "Save" : "Edit"}</button>
      <br></br>
      <hr></hr>
    </div>
  );
}

export default TaskItem;
