import { useState } from 'react';

function Task() {
  //var tasks = getTasks(name);
  const [tasks, setTasks] = useState([
    new singleTask("Sample task", "In progress", "04/21/22")
  ]);

  const handleNewTask = () => {
    const title = document.getElementById("newTitle").value;
    const status = document.getElementById("newStatus").value;
    const dueDate = document.getElementById("newDueDate").value;

    const newTask = new singleTask(title, status, dueDate);
    setTasks([...tasks, newTask]);
  };

  return (
    <html>
      <header>Welcome {localStorage.getItem("name")}</header>
      <p>
        <form id="newTaskForm">
          <label htmlFor="newTitle">Title: </label>
          <input type="text" id="newTitle" name="newTitle" /><br />
          <label htmlFor="newStatus">Status: </label>
          <input type="text" id="newStatus" name="newStatus" /><br />
          <label htmlFor="newDueDate">Due date: </label>
          <input type="text" id="newDueDate" name="newDueDate" /><br />
        </form>
        <button id="newTaskButton" onClick={handleNewTask}>Add new task</button>
      </p>
      <body>
        Your tasks: {makeList(tasks)}
      </body>
    </html>
  );
}

function makeList(tasks) {
  const listItems = tasks.map(task => (
    <li key={task.title}>
      <p>
        {task.title}<br />
        {task.status}<br />
        {task.dueDate}<br />
      </p>
    </li>
  ));

  return <ul>{listItems}</ul>;
}

class singleTask {
  constructor(title, status, dueDate) {
    this.title = title;
    this.status = status;
    this.dueDate = dueDate;
  }
}

/*
function getTasks(name){
  let [tasks, setTask] = useState([]);

  db.transaction((tx) => {
    tx.executeSql(
      'select * from Task where name = ? ORDER BY ? ASC;',
      [name,title],
      (tx, results) => {
        var temp = [];
        for (var i = 0; i < results.rows.length; i++) {
          temp.push(results.rows.item(i));
        }
        setTask(temp);
      }
    )
  });

  return tasks;
}
*/

export default Task;
