import {
    createContext,
} from 'react'
import useTasks from "../hooks/useTasks.js";

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const {
        children
    } = props

    const {
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
        setSearchQuery

    } = useTasks()


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
                setSearchQuery
            }}
        >
            {children}
        </TasksContext.Provider>
    )
}