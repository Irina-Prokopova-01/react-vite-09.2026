import {useCallback, useEffect, useMemo, useRef, useState} from "react";

const useTasks = () => {
    const [tasks, setTasks] = useState([])

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const newTaskInputRef = useRef(null);
    // console.log(newTaskInputRef)

    const deleteAllTasks = useCallback(() => {
        console.log("Удаляем все задачи!");
        const isConfirmed = confirm('Are you sure you want to delete all task?')

        if (isConfirmed) {
            Promise.all(
                tasks.map(({id}) => {
                    return fetch(`http://localhost:3001/tasks/${id}`, {
                        method: "DELETE",
                    })
                })
            ).then(() => setTasks([]))
        }
    }, [tasks])

    const deleteTask = useCallback(
        (taskId) => {
            // console.log(`Удаляем задачу с id: ${taskId}!`);

            fetch(`http://localhost:3001/tasks/${taskId}`, {
                method: 'DELETE',
            })
                .then(() => {
                    setTasks(
                        tasks.filter((task) => task.id !== taskId)
                    )
                })

        }, [tasks])

    const toggleTaskComplete = useCallback(
        (taskId, isDone) => {
            // console.log(`Задача ${taskId} ${isDone ? 'выполнена' : 'не выполнена'}`);
            fetch(`http://localhost:3001/tasks/${taskId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({isDone})
            })
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

            fetch(`http://localhost:3001/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            })
                .then(response => response.json())
                .then(addedTask => {
                    setTasks((prevTasks) => [...prevTasks, addedTask]);
                    setNewTaskTitle('')
                    setSearchQuery('')
                    newTaskInputRef.current.focus()
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

        fetch('http://localhost:3001/tasks')
        .then(response => response.json())
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
            setSearchQuery
}

}

export default useTasks;