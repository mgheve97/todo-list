import { useTask } from "./context/TaskContext";

const TaskItem = ({ title, onEdit, onDelete, isTaskCompleted, taskId, date}) => {
    const { updateTask } = useTask();

    const handleCheckBoxChange =() => {
        updateTask(taskId, { completed: !isTaskCompleted });
    }

    return(
    <div className="">
        <div className={`${isTaskCompleted ? "bg-green-200" : "bg-sky-100"} sm:px-8 sm:py-4 px-2 py-2 rounded-md border-b border-gray-700 sm:mb-2 mb-1 shadow-lg`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-5">
                    <input
                        type="checkbox"
                        checked={isTaskCompleted}
                        onChange={handleCheckBoxChange}
                        className="w-5 h-5"
                        />
                    <div className="flex flex-col space-y-1">
                        <p className={`text-lg md:text-2xl font-bold ${isTaskCompleted ? "line-through text-gray-500" : "text-gray-700"} break-words`}>{title}</p>
                        <p className="text-[10px] sm:text-sm font-bold text-gray-500">{date}</p>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <button
                        className="text-[16px] font-bold rounded-md p-[3px] bg-blue-200 text-gray-700 border-black border-2 ml-2"
                        onClick={onEdit}
                    >
                        edit
                    </button>
                    <button
                        className="text-[16px] font-bold rounded-md p-[3px] bg-red-200 text-gray-700 border-black border-2 ml-2"
                        onClick={onDelete}
                    >
                        delete
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}
 
export default TaskItem;