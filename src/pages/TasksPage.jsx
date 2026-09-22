import {TasksProvider} from "../context/tasksContext.jsx";
import Todo from "../components/Todo/Todo.jsx";

const TasksPage = () => {
    return (
        <TasksProvider>
            <Todo/>
        </TasksProvider>
    )
}

export default TasksPage