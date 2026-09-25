import {
    createContext, useMemo,
} from 'react'
import useTasks from "./useTasks.js";
import useIncompleteTaskScroll from "./useIncompleteTask.Scroll.js";

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
        appearingTaskId,

    } = useTasks()

    const {
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    } = useIncompleteTaskScroll(tasks)

    const value = useMemo(() => ({
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
        appearingTaskId,

        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    }), [       tasks,
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
        appearingTaskId,

        firstIncompleteTaskRef,
        firstIncompleteTaskId,])

    return (
        <TasksContext.Provider
            value={value}
        >
            {children}
        </TasksContext.Provider>
    )
}