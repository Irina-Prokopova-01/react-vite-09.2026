import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";
import {useState} from "react";

const Todo = () => {
    const [tasks, setTasks] = useState([
        {id: 'task-1', title: 'Купить молоко', isDone: false},
        {id: 'task-2', title: 'Купить хлеб', isDone: true},
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const deleteAllTasks = () => {
        console.log("Удаляем все задачи!");
    }

    const deleteTask = (taskId) => {
        console.log(`Удаляем задачу с id: ${taskId}!`);
    }

    const toggleTaskComplete = (taskId, isDone) => {
        console.log(`Задача ${taskId} ${isDone ? 'выполнена' : 'не выполнена'}`);
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
        console.log('Задача добавлена!')
    }


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