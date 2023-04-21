import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import TaskItem from "./TaskItem";

function TaskInfo({ info, deleteTask, editTask }) {
  const handleSubmit = () => {};
  const [showEditForm, setShowEditForm] = useState(false);

  // check if prop.info has data in it
  const propInfo = () => {
    if (info === "") {
      return false;
    } else {
      return true;
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setShowEditForm(!showEditForm);
  };

  useEffect(() => {
    console.log(info, "----------bahaer---------------");
    Object.keys(info).map((item, index) => {
      console.log(index, "-------------------------------");
      console.log(item, "-------------------------------");
    });
  }, []);

  return (
    <div>
      {propInfo() ? (
        <div>
          <h1>My Tasks</h1>
          <ul>
            {Object.keys(info).map((task_key, index) => {
              return (
                <TaskItem
                  key={index}
                  task={info[task_key]}
                  task_key={task_key}
                  deleteTask={deleteTask}
                  editTask={editTask}
                ></TaskItem>
              );
            })}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TaskInfo;
