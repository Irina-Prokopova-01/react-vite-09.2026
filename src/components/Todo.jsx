import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";
import Button from "./Button.jsx";
import {useEffect, useState, useRef} from "react";

const Todo = () => {
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

    const deleteAllTasks = () => {
        console.log("Удаляем все задачи!");
        const isConfirmed = confirm('Are you sure you want to delete all task?')

        if (isConfirmed) {
            setTasks([])
        }
    }

    const deleteTask = (taskId) => {
        // console.log(`Удаляем задачу с id: ${taskId}!`);
        setTasks(
            tasks.filter((task) => task.id !== taskId)
        )
    }

    const toggleTaskComplete = (taskId, isDone) => {
        // console.log(`Задача ${taskId} ${isDone ? 'выполнена' : 'не выполнена'}`);
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    return {...task, isDone}
                }
                return task
            })
        )
    }

    // const filterTask = (query) => {
    //     console.log(`Поиск: ${query}`);
    // }

    const addTask = () => {
        // const newTaskTitle = newTaskInputRef.current.value
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            }

            setTasks( [...tasks, newTask]);
            setNewTaskTitle('')
            // newTaskInputRef.current.value = ''
            setSearchQuery('')
            newTaskInputRef.current.focus()
        }
        // console.log('Задача добавлена!')
        // console.log('newTask', newTaskInputRef);
    }

    useEffect(() => {
        console.log('Сохраняем данные в хранилище, т.к. изменился tasks:', tasks)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const clearSearchQuery = searchQuery.trim().toLowerCase()
    const filteredTasks = clearSearchQuery.length > 0
    ? tasks.filter(({title}) => title.toLowerCase().includes(searchQuery))
        : null

    useEffect(() => {
        newTaskInputRef.current.focus()

    }, [])

    // const renderCount = useRef(0)
    //
    // useEffect(() => {
    //     renderCount.current ++
    //     console.log(`Компонент Todo отрендерился ${renderCount.current} раз(а)`)
    // })


    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskInputRef={newTaskInputRef}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm
                // onSearchInput={filterTask}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(({ isDone }) => isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <Button onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}>
                Show first incomplete task
            </Button>
            <TodoList
                tasks={tasks}
                firstIncompleteTaskRef={firstIncompleteTaskRef}
                firstIncompleteTaskId={firstIncompleteTaskId}
                filteredTasks={filteredTasks}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange ={toggleTaskComplete}
            />
        </div>
    )
}

export default Todo