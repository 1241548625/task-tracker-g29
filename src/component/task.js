import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  set,
  remove,
  update,
} from "firebase/database";
import NewTask from "./newTask";
import TaskInfo from "./TaskInfo";

const firebaseConfig = {
  apiKey: "AIzaSyB20_H4K9kWZMd3vH1xSp4GaWA2WSQOE0Y",
  authDomain: "test-project2-dffb4.firebaseapp.com",
  databaseURL: "https://project2-707d2-default-rtdb.firebaseio.com",
  projectId: "test-project2-dffb4",
  storageBucket: "test-project2-dffb4.appspot.com",
  messagingSenderId: "960634107139",
  appId: "1:960634107139:web:15f92b170133c4862ce536",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

function Task() {
  const [name, setName] = useState("");
  const [info, setInfo] = useState([]);
  const [editInfo, setEdit] = useState({});

  //running one time when page loading
  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);

  //get data from database
  useEffect(() => {
    if (name === "") {
      return;
    }
    const db = getDatabase(app);
    const starCountRef = ref(db, "user/" + name);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data !== null) {
        setInfo(data);
        console.log(data);
        console.log(data.date);
      }
      //   updateStarCount(postElement, data);
    });
  }, [name]);

  //   const handleSubmit = (key) => {
  //     const temp = { ...info };
  //     temp.key = key;
  //     setEdit(temp);
  //     // <NewTask info={editInfo}></NewTask>;
  //     console.log("dsdsk,");
  //   };

  const deleteTask = (task_key) => {
    console.log(task_key);
    const db = getDatabase();
    const taskRef = ref(db, "user/" + name + "/" + task_key);
    remove(taskRef);
  };

  const editTask = (task_key, data) => {
    console.log(task_key);
    console.log(data);
    const db = getDatabase();
    const taskRef = ref(db, "user/" + name + "/" + task_key);
    set(taskRef, data);
  };

  return (
    <div>
      <TaskInfo
        info={info}
        deleteTask={deleteTask}
        editTask={editTask}
      ></TaskInfo>
      <NewTask></NewTask>
    </div>
  );
}

export default Task;
