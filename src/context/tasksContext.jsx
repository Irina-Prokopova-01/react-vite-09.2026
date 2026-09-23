import {
    createContext,
} from 'react'
import useTasks from "../hooks/useTasks.js";
import useIncompleteTaskScroll from "../hooks/useIncompleteTask.Scroll.js";

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const {
        children
    } = props

    const {
        tasks,
        deleteAllTasks,
        deleteTask,
        toggleTaskComplete,
        filteredTasks,

        addTask,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        newTaskInputRef,
        setSearchQuery,
        disappearingTaskId,

    } = useTasks()

    const {
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    } = useIncompleteTaskScroll(tasks)


    return (
        <TasksContext.Provider
            value={{
                tasks,
                firstIncompleteTaskRef,
                firstIncompleteTaskId,
                deleteAllTasks,
                deleteTask,
                toggleTaskComplete,
                filteredTasks,

                addTask,
                newTaskTitle,
                setNewTaskTitle,
                searchQuery,
                newTaskInputRef,
                setSearchQuery,
                disappearingTaskId
            }}
        >
            {children}
        </TasksContext.Provider>
    )
}