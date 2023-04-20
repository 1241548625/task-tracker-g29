import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, push } from "firebase/database";

function NewTask() {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterDes, setDes] = useState("");
  const [enterDate, setEnterDate] = useState("");
  const [enterStatus, setStatus] = useState("");
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
  }

  return (
    <div>
      <form onSubmit={submitTask}>
        <div>
          <label>Title</label>
          <input type="text" value={enterTitle} onChange={titleChange}></input>
        </div>
        <div>
          <label>Description</label>
          <input type="text" value={enterDes} onChange={desChange}></input>
        </div>
        <div>
          <label>Status</label>
          <input
            type="text"
            value={enterStatus}
            onChange={statusChange}
          ></input>
        </div>
        <div>
          <label>Due Date</label>
          <input type="date" value={enterDate} onChange={dateChange}></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewTask;
