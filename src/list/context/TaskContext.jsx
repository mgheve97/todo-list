import { createContext, useState, useEffect, useContext} from "react";

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
    const [task, setTask] = useState(null);
    const [taskContent, setTaskContent] = useState([]);

    useEffect(()=>{
        const storedTask = localStorage.getItem("tasks");

        if(storedTask){
            const parsedTasks = JSON.parse(storedTask);
            setTaskContent(parsedTasks)
        }
    },[])

    useEffect(()=>{
        if(taskContent.length > 0){
            localStorage.setItem("tasks", JSON.stringify(taskContent))
        }
    }, [taskContent])

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: "2-digit",
        })
    }

    const postTask = (content) => {
        const newUpdatedTask = {
            ...content,
            id: Date.now().toString(),
            completed: false,
            date: formatDate(new Date()),
        };
        setTaskContent((prev) => [...prev, newUpdatedTask])
        setTask(content);
        console.log("Article posted Succesfully", content);
    };

    const updateTask = (id, updatedContent) => {
        const updatedDateContent = {
            ...updatedContent,
            datepost: formatDate(new Date()),
        };

        setTaskContent((prevTask) => 
            prevTask.map((task) =>
            task.id === id ?
            {
                ...task,
                ...updatedDateContent,
            } 
            : task
            )
        )
    }

    const deleteTask = (id) => {
        setTaskContent((prevTask) => 
            prevTask.filter((task) => task.id !== id)
        );
        console.log(`Task with the id ${id} deleted successfully`);
    };

    return(
        <TaskContext.Provider
            value={{task, taskContent, postTask, deleteTask, updateTask}}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => {
    const context = useContext(TaskContext);
    if(!context){
        throw new Error ("useTask must be used within an TaskProvider");
    }
    return context;
}