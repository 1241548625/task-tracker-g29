function TaskItem(prop) {
  const handleSubmit = () => {};

  // check if prop.info has data in it
  const propInfo = () => {
    if (prop.info === "") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      {propInfo() ? (
        <div>
          <h1>My Tasks</h1>
          <ul>
            {Object.keys(prop.info).map((key) => {
              return (
                <ul key={key}>
                  <div>Tasks</div>
                  <li>Title: {prop.info[key].title}</li>
                  <li>Description: {prop.info[key].des}</li>
                  <li>Due Date: {prop.info[key].date}</li>
                  <li>Status: {prop.info[key].status}</li>
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
