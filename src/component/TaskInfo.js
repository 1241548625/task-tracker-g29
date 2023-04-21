import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function TaskItem({ info, deleteTask }) {
  const handleSubmit = () => {};

  // check if prop.info has data in it
  const propInfo = () => {
    if (info === "") {
      return false;
    } else {
      return true;
    }
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
                <ul key={index}>
                  <div>Tasks</div>
                  <li>
                    Title: {info[task_key].title}{" "}
                    <FaTimes
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => deleteTask(task_key)}
                    />
                  </li>
                  <li>Description: {info[task_key].des}</li>
                  <li>Due Date: {info[task_key].date}</li>
                  <li>Status: {info[task_key].status}</li>
                  <button onClick={handleSubmit}>Edit</button>
                  <br></br>
                </ul>
              );
            })}
          </ul>{" "}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TaskItem;
