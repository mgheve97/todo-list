import { useState } from "react";
import { useTask } from "./context/TaskContext";



const CreateTask = () => {

    const [taskContent, setTaskContent] = useState({
      title: ""
    });
    // const [error, seterror] = useState("")

    const {postTask} = useTask();

    const handleChange = (event) => {
      const {name, value} = event.target;

      setTaskContent((prevTask) => ({
        ...prevTask,
        [name]: value
      }))
    }

    const formatDate = (date) => {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(date)
    }

    const handlePostTask = () => {
      const currentDate = formatDate(new Date());

      const newTask = {
        id: "",
        title: taskContent.title,
        datepost: currentDate,
      };

      postTask(newTask);
      setTaskContent({ title: "" });

      // if(taskContent.title.length === 0){
      //   alert("Task name is required! Please Try Again")
      //   return
      // }
      // else{
      //   postTask(newTask);
      //   setTaskContent({ title: "" });
      // }
    }


    return ( 
    <div className="py-5">
      <div className="flex flex-col justify-between md:flex-row items-stretch gap-4">
        <input
          className="border-2 border-gray-700 w-full sm:text-lg text-sm p-3 rounded-md font-bold shadow-lg"
          placeholder="Type here..."
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          value={taskContent.title}
        />
     
        <button
          className="sm:text-lg text-sm p-3 border-2 border-gray-700 rounded-md shadow-lg text-gray-700 bg-blue-200 font-bold"
          onClick={handlePostTask}
        >
          Create Task
        </button>
      </div>
      {/* <p className="text-red-600 font-bold mt-1">{error}</p> */}
    </div>
     );
}
 
export default CreateTask;