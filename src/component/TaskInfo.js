import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

function TaskInfo({ info, deleteTask, editTask }) {
  const [showEditForm, setShowEditForm] = useState(false);

  // check if prop.info has data in it
  const propInfo = () => {
    if (info === "") {
      return false;
    } else {
      return true;
    }
  };

  function setSort(sortBy){
    localStorage.setItem("sortBy",sortBy);
    console.log("Now sorting by: "+localStorage.getItem("sortBy"));
    window.location.reload(false); //refresh page
  };

  useEffect(() => {
    console.log(info, "----------bahaer---------------");
    Object.keys(info).map((item, index) => {
      console.log(index, "-------------------------------");
      console.log(item, "-------------------------------");
    });
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      {propInfo() ? (
        <div>
          <h3>Sort by:&nbsp;
          <button onClick={() => setSort("title")}>
            Title
          </button>
          <button onClick={() => setSort("status")}>
            Status
          </button>
          <button onClick={() => setSort("date")}>
            Due date
          </button>
          </h3>
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
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TaskInfo;
