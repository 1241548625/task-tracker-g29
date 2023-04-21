import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, push } from "firebase/database";

function NewTask({ setShowNewTaskForm }) {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterDes, setDes] = useState("");
  const [enterDate, setEnterDate] = useState("");
  const [enterStatus, setStatus] = useState("To-do");
  const [name, setName] = useState("");

  //   useEffect(() => {
  //     console.log("bbbbbbb");
  //     if (info === {}) return;
  //     else {
  //       setEnterTitle(info.title);
  //       setDes(info.des);
  //       setEnterDate(info.date);
  //       setStatus(info.status);
  //       console.log("aaaaaa");
  //     }
  //   }, [info]);

  useEffect(() => {
    setName(localStorage.getItem("name"));
  });

  const titleChange = (event) => {
    setEnterTitle(event.target.value);
  };

  const desChange = (event) => {
    setDes(event.target.value);
  };

  const statusChange = (event) => {
    setStatus(event.target.value);
  };

  const dateChange = (event) => {
    setEnterDate(event.target.value);
  };

  //   const taskData = {
  //     title: enterTitle,
  //     des: enterDes,
  //     status: enterStatus,
  //     date: new Date(enterDate),
  //   };

  function submitTask() {
    const db = getDatabase();
    const postListRef = ref(db, "user/" + name);
    const newPostRef = push(postListRef);
    set(newPostRef, {
      title: enterTitle,
      des: enterDes,
      status: enterStatus,
      date: enterDate,
    });
    setShowNewTaskForm(false);
  }

  return (
    <div>
      <form onSubmit={submitTask}>
        <div>
          <input
            type="text"
            value={enterTitle}
            onChange={titleChange}
            placeholder="Title"
            style={{ width: "100%" }}
          ></input>
        </div>
        <div>
          <input
            type="text"
            value={enterDes}
            onChange={desChange}
            placeholder="Description"
            style={{ width: "100%" }}
          ></input>
        </div>
        <div>
          <select onChange={statusChange}>
            <option value="To-do">To-do</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div>
          <input type="date" value={enterDate} onChange={dateChange}></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewTask;
