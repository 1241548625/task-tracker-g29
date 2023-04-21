import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [info, setInfo] = useState([]);
  const [editInfo, setEdit] = useState({});
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

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
      if (data === null) {
        setInfo({});
      } else {
        //converts data obj into sorted array
        var sortBy = localStorage.getItem("sortBy");
        var dataArray = Object.entries(data).map(([key, value]) => ({ ...value, key }));
        dataArray.sort((a, b) => {
          if (a[sortBy] < b[sortBy]) {
            return -1;
          }
          if (a[sortBy] > b[sortBy]) {
            return 1;
          }
          return 0;
        });
        //coverts sorted array to back to obj with original keys
        var sortedData = dataArray.reduce((acc, curr) => {
          acc[curr.key] = curr;
          return acc;
        }, {});     
        setInfo(sortedData); 
        //setInfo(data);
        console.log(data);
      }
    });
  }, [name]);

  const deleteTask = (task_key) => {
    console.log("task key: "+task_key);
    const db = getDatabase();
    const taskRef = ref(db, "user/" + name + "/" + task_key);
    remove(taskRef);
    //window.location.reload(false); //refresh page
  };

  const editTask = (task_key, data) => {
    console.log(task_key);
    console.log(data);
    const db = getDatabase();
    const taskRef = ref(db, "user/" + name + "/" + task_key);
    set(taskRef, data);
    window.location.reload(false); //refresh page
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("name");
    navigate("/");
  };

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <h1>Task Tracker</h1>
      <a href="#" onClick={logout} style={{ float: "right" }}>
        logout
      </a>
      <br></br>
      <div style={{ width: "80%", margin: "auto" }}>
        <button
          onClick={() => {
            setShowNewTaskForm(!showNewTaskForm);
          }}
        >
          {showNewTaskForm ? "Cancel" : "Create Task"}
        </button>
        {showNewTaskForm ? (
          <NewTask setShowNewTaskForm={setShowNewTaskForm}></NewTask>
        ) : (
          <></>
        )}
      </div>
      <br></br>
      {info === null || JSON.stringify(info) === "{}" ? (
        <></>
      ) : (
        <TaskInfo
          info={info}
          deleteTask={deleteTask}
          editTask={editTask}
        ></TaskInfo>
      )}
    </div>
  );
}

export default Task;
