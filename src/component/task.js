import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
  apiKey: "AIzaSyAFgojbu75bfJf2wYEnvJjjFa4N1jdIAtI",
  authDomain: "project2-707d2.firebaseapp.com",
  databaseURL: "https://project2-707d2-default-rtdb.firebaseio.com",
  projectId: "project2-707d2",
  storageBucket: "project2-707d2.appspot.com",
  messagingSenderId: "588410843051",
  appId: "1:588410843051:web:4ff9e5ccaa4b67aef52cee",
  measurementId: "G-EW7FDTH4D1",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

function Task() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [info, setInfo] = useState([]);
  const [sortedData, setSortedData] = useState({});
  const [editInfo, setEdit] = useState({});
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const status_weight = {
    "To-do": 1,
    "In-Progress": 2,
    Done: 3,
  };

  const compare = (a, b) => {
    if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) {
      return -1;
    }
    if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) {
      return 1;
    }
    return 0;
  };

  const compareStatus = (a, b) => {
    if (status_weight[a[sortBy]] < status_weight[b[sortBy]]) {
      return -1;
    }
    if (status_weight[a[sortBy]] > status_weight[b[sortBy]]) {
      return 1;
    }
    return 0;
  };

  //running one time when page loading
  useEffect(() => {
    setName(localStorage.getItem("name"));
    setSortBy(localStorage.getItem("sortBy"));
  }, []);

  //get data from database
  useEffect(() => {
    if (info === null) {
      return;
    }
    console.log(sortBy);
    console.log(info);
    //converts data obj into sorted array
    let dataArray = Object.entries(info).map(([key, value]) => ({
      ...value,
      key,
    }));

    if (sortBy === "status") {
      dataArray.sort(compareStatus);
    } else {
      dataArray.sort(compare);
    }
    //coverts sorted array to back to obj with original keys
    let sortedData = dataArray.reduce((acc, curr) => {
      acc[curr.key] = curr;
      return acc;
    }, {});
    setSortedData(sortedData);
  }, [info, sortBy]);

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
        setInfo(data);
      }
    });
  }, [name]);

  const deleteTask = (task_key) => {
    // eslint-disable-next-line no-restricted-globals
    const deleteConfirm = confirm("Are you sure to delete the task?");
    if (deleteConfirm) {
      console.log("task key: " + task_key);
      const db = getDatabase();
      const taskRef = ref(db, "user/" + name + "/" + task_key);
      remove(taskRef);
    }
    //window.location.reload(false); //refresh page
  };

  const editTask = (task_key, data) => {
    console.log(task_key);
    console.log(data);
    const db = getDatabase();
    const taskRef = ref(db, "user/" + name + "/" + task_key);
    set(taskRef, data);
    // window.location.reload(false); //refresh page
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("name");
    navigate("/");
  };

  const handleModalClose = () => {
    setShowNewTaskForm(false);
  };

  // useEffect(() => {
  //   console.log(info);
  // }, [info]);

  return (
    <Container>
      <div style={{ width: "70%", margin: "auto", textAlign: "center" }}>
        <h1>Task Tracker</h1>
        <Button variant="link" onClick={logout} style={{ float: "right" }}>
          logout
        </Button>
        <br></br>
        <div style={{ textAlign: "left" }}>
          <div style={{ width: "80%", margin: "auto" }}>
            <Button
              variant="link"
              onClick={() => {
                setShowNewTaskForm(!showNewTaskForm);
              }}
            >
              Create Task
            </Button>
            <br></br>
            <br></br>
            <Modal show={showNewTaskForm} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create New Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <NewTask
                  setShowNewTaskForm={setShowNewTaskForm}
                  handleModalClose={handleModalClose}
                ></NewTask>
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <br></br>
        {info === null || JSON.stringify(info) === "{}" ? (
          <></>
        ) : (
          <TaskInfo
            info={sortedData}
            deleteTask={deleteTask}
            editTask={editTask}
            setSortBy={setSortBy}
          ></TaskInfo>
        )}
      </div>
    </Container>
  );
}

export default Task;
