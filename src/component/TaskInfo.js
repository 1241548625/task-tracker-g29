import { useEffect } from 'react';
import { FaTimes} from 'react-icons/fa';

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

  useEffect(() => {
    console.log(prop.info, '----------bahaer---------------')
    prop.info.map((item, index) => {
      console.log(index, '-------------------------------')
      console.log(item, '-------------------------------')
    })
  }, []);

  return (
    <div>
      {propInfo() ? (
        <div>
          <h1>My Tasks</h1>
          <ul>
            {prop.info.map((item, index) => {
              return (
                <ul key={index}>
                  <div>Tasks</div>
                  <li>Title: {item.title} <FaTimes style={{color : 'red', cursor : 'pointer'}} onClick={()=>prop.deleteTask(item.title)}/></li>
                  <li>Description: {item.des}</li>
                  <li>Due Date: {item.date}</li>
                  <li>Status: {item.status}</li>
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
