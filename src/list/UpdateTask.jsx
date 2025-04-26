import { useNavigate, useParams } from "react-router-dom";
import { useTask } from "./context/TaskContext";
import { useState, useEffect } from "react";

const UpdateTask = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { taskContent, updateTask, deleteTask} = useTask();

    const [task, setTask] = useState(null);
    const [title, setTitle] = useState("");

    useEffect(()=>{
        const foundTask = taskContent.find((t) => t.id === id);
        if(foundTask){
            setTask(foundTask);
            setTitle(foundTask.title)
        }
    }, [id, taskContent])

    const handleUpdate = () => {
        if(title.length === 0){
            deleteTask(task.id)
        }
        if(task){
            updateTask(task.id, {title});
            navigate("/");
        }
    };

    const handleCancel = () => {
        navigate("/")
    }

    if(!task){
        return <p className="text-center mt-10 text-xl">Task Not Found</p>
    }
    
    return ( 
        <div className="w-full min-h-screen flex items-center justify-center px-4 sm:px-16 py-10 bg-red-300">
            <div className="w-full max-w-2xl border-2 border-gray-700 bg-orange-300 shadow-lg p-4 sm:p-6 rounded-md">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl text-gray-700">Edit a Task</p>
                    <button
                        className="font-bold bg-red-300 text-gray-700 shadow-lg border border-gray-700 rounded-md sm:py-2 sm:px-4 p-1"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>

                <div className="mt-12 flex flex-col sm:p-5 ">
                    <textarea
                        className="font-bold border-2 bg-sky-100 border-gray-700 w-full text-gray-700 text-lg p-3 rounded-md sm:min-h-[200px] min-h-[300px] "
                        placeholder="Insert title here"
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                    />
                    <div className="">
                        <button
                            className="font-bold text-lg bg-blue-200 text-gray-700 px-4 py-2 border-2 border-gray-700 rounded-md shadow-lg mt-6"
                            onClick={handleUpdate}
                        >
                            Update Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default UpdateTask;