import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import tasksAPI from "@/shared/api/tasks";

const useTasks = () => {
    const [tasks, setTasks] = useState([])

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [disappearingTaskId, setDisappearingTaskId] = useState(null)
    const [appearingTaskId, setAppearingTaskId] = useState(null)

    const newTaskInputRef = useRef(null);
    // console.log(newTaskInputRef)

    const deleteAllTasks = useCallback(() => {
        console.log("Удаляем все задачи!");
        const isConfirmed = confirm('Are you sure you want to delete all task?')

        if (isConfirmed) {
            tasksAPI.deleteAll(tasks)
            .then(() => setTasks([]))
        }
    }, [tasks])

    const deleteTask = useCallback(
        (taskId) => {
            // console.log(`Удаляем задачу с id: ${taskId}!`);

            tasksAPI.delete(taskId)
                .then(() => {
                    setDisappearingTaskId(taskId)
                    setTimeout(()=> {
                        setTasks(
                            tasks.filter((task) => task.id !== taskId)
                        )
                        setDisappearingTaskId(null)
                    }, 400)

                })

        }, [tasks])

    const toggleTaskComplete = useCallback(
        (taskId, isDone) => {
            // console.log(`Задача ${taskId} ${isDone ? 'выполнена' : 'не выполнена'}`);
            tasksAPI.toggleComplete(taskId, isDone)
                .then(() => {
                    setTasks(
                        tasks.map((task) => {
                            if (task.id === taskId) {
                                return {...task, isDone}
                            }
                            return task
                        }))
                })

        }, [tasks])

    const addTask = useCallback((title) => {
        // const newTaskTitle = newTaskInputRef.current.value
            const newTask = {
                title,
                isDone: false,
            }

            tasksAPI.add(newTask)
                .then(addedTask => {
                    setTasks((prevTasks) => [...prevTasks, addedTask]);
                    setNewTaskTitle('')
                    setSearchQuery('')
                    newTaskInputRef.current.focus()
                    setAppearingTaskId(addedTask.id)
                    setTimeout(()=> {
                        setAppearingTaskId(null)

                    }, 400)
                })

    }, [])

    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase()
        return clearSearchQuery.length > 0
            ? tasks.filter(({title}) => title.toLowerCase().includes(searchQuery))
            : null
    }, [searchQuery, tasks])

    useEffect(() => {
        newTaskInputRef.current.focus()

        tasksAPI.getAll()
        .then(setTasks)

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
            setSearchQuery,
            disappearingTaskId,
            appearingTaskId
}

}

export default useTasks;