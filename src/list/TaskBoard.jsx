import React, {useState} from "react";
import CreateTask from "./CreateTask";
import { useTask } from "./context/TaskContext";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";

const TaskBoard = () => {
    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState();
    const {taskContent, deleteTask} = useTask(); 

    const handleChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const NavigateToUpdate = (task) => {
        navigate(`/task/${task.id}`)
    }

    const handleDelete = (id) => {
        deleteTask(id);
    }

    const filteredTasks = taskContent.filter((task) => {
        if (selectedOption === "completed") {
            return task.completed; // Only show completed tasks
        }
        if (selectedOption === "active") {
            return !task.completed; // Only show active (incomplete) tasks
        }
        return true; // If "all", show all tasks
    });

    return ( 
        <div className="w-screen sm:h-screen flex items-center justify-center sm:px-2 sm:py-6 bg-red-300">
            <div className="w-full max-w-4xl border-2 border-gray-700 rounded-md h-screen sm:h-[80vh]  flex flex-col px-4 py-6 md:p-10 bg-orange-300 shadow-lg">
                <div className="flex flex-col ">
                    <CreateTask />

                    <div className="py-5">
                        <div className="sm:mt-5">
                            <div className="flex flex-row justify-between items-center mb-6">
                                <p className="font-bold sm:text-2xl text-gray-700 text-lg">To Do List:</p>
                                <select
                                    id="dropdown"
                                    value={selectedOption}
                                    onChange={handleChange}
                                    className="border border-gray-700 text-gray-700 rounded sm:p-2"
                                >
                                    <option value="all">All</option>
                                    <option value="completed">Completed Task</option>
                                    <option value="active">Active Task</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto ">
                    <div className="flex flex-col space-y-4">
                        {filteredTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                title={task.title}
                                date={task.date}
                                taskId = {task.id}
                                isTaskCompleted={task.completed}
                                onEdit={() => NavigateToUpdate(task)}
                                onDelete={()=> handleDelete(task.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div> 
    );
}
 
export default TaskBoard ;