import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";
import {useEffect, useState} from "react";

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

    const filterTask = (query) => {
        console.log(`Поиск: ${query}`);
    }

    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            }

            setTasks( [...tasks, newTask]);

            setNewTaskTitle('')
        }
        // console.log('Задача добавлена!')
    }

    useEffect(() => {
        console.log('Сохраняем данные в хранилище, т.к. изменился tasks:', tasks)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])


    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm
                onSearchInput={filterTask}
            />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(({ isDone }) => isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <TodoList
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange ={toggleTaskComplete}
            />
        </div>
    )
}

export default Todo