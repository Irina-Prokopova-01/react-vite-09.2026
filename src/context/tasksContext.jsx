import {createContext, useCallback, useEffect, useMemo, useRef, useState} from 'react'

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const {
        children
    } = props

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks")

        if (savedTasks) {
            return JSON.parse(savedTasks)
        }

        return [
            {id: 'task-1', title: 'Купить молоко', isDone: false},
            {id: 'task-2', title: 'Купить хлеб', isDone: true},
        ]
    })

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const newTaskInputRef = useRef(null);
    // console.log(newTaskInputRef)

    const firstIncompleteTaskRef = useRef(null);
    const firstIncompleteTaskId = tasks.find(({isDone}) => !isDone)?.id

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
        },[tasks])

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

        },[tasks])

    const addTask = useCallback(() => {
        // const newTaskTitle = newTaskInputRef.current.value
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            }

            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTaskTitle('')
            setSearchQuery('')
            newTaskInputRef.current.focus()
        }
    }, [newTaskTitle])

    useEffect(() => {
        console.log('Сохраняем данные в хранилище, т.к. изменился tasks:', tasks)
        localStorage.setItem('tasks', JSON.stringify(tasks))
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