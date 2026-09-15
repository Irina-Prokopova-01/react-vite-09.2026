import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import useTasksLocalStorage from "./useTasksLocalStorage.js";

const useTasks = () => {
    const {
        savedTasks,
        saveTasks,
    } = useTasksLocalStorage(

    )
    const [tasks, setTasks] = useState(savedTasks ?? [
        {id: 'task-1', title: 'Купить молоко', isDone: false},
        {id: 'task-2', title: 'Купить хлеб', isDone: true},
    ])

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const newTaskInputRef = useRef(null);
    // console.log(newTaskInputRef)

    const deleteAllTasks = useCallback(() => {
        console.log("Удаляем все задачи!");
        const isConfirmed = confirm('Are you sure you want to delete all task?')

        if (isConfirmed) {
            setTasks([])
        }
    }, [])

    const deleteTask = useCallback(
        (taskId) => {
            // console.log(`Удаляем задачу с id: ${taskId}!`);
            setTasks(
                tasks.filter((task) => task.id !== taskId)
            )
        }, [tasks])

    const toggleTaskComplete = useCallback(
        (taskId, isDone) => {
            // console.log(`Задача ${taskId} ${isDone ? 'выполнена' : 'не выполнена'}`);
            setTasks(
                tasks.map((task) => {
                    if (task.id === taskId) {
                        return {...task, isDone}
                    }
                    return task
                })
            )

        }, [tasks])

    const addTask = useCallback((title) => {
        // const newTaskTitle = newTaskInputRef.current.value
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title,
                isDone: false,
            }

            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTaskTitle('')
            setSearchQuery('')
            newTaskInputRef.current.focus()

    }, [])

    useEffect(() => {
        saveTasks(tasks)
    }, [tasks])

    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase()
        return clearSearchQuery.length > 0
            ? tasks.filter(({title}) => title.toLowerCase().includes(searchQuery))
            : null
    }, [searchQuery, tasks])

    useEffect(() => {
        newTaskInputRef.current.focus()

    }, [])

    return {
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
            setSearchQuery
}

}

export default useTasks;