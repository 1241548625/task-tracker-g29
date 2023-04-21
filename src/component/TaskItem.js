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
    <div style={{ width: "300px" }}>
      <ul>
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
        <li>
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
        </li>
        <li>
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
        </li>
        <li>
          Status:{" "}
          {showEditForm ? (
            <input
              type="text"
              value={newStatus}
              onChange={(event) => {
                setNewStatus(event.target.value);
              }}
            />
          ) : (
            task.status
          )}
        </li>
        {/* <li>Due Date: {task.date}</li> */}
        {/* <li>Status: {task.status}</li> */}
        <button onClick={handleEdit}>{buttonText ? "Save" : "Edit"}</button>
        <br></br>
        <hr></hr>
      </ul>
    </div>
  );
}

export default TaskItem;
