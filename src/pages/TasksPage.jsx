import {TasksProvider} from "../context/tasksContext.jsx";
import Todo from "../components/Todo.jsx";

const TasksPage = () => {
    return (
        <TasksProvider>
            <Todo/>
        </TasksProvider>
    )
}

export default TasksPage