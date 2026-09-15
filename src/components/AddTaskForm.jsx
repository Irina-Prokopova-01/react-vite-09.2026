import Field from "./Field.jsx";
import Button from "./Button.jsx";
import {useContext} from "react";
import {TasksContext} from "../context/tasksContext.jsx";

const AddTaskForm = () => {
    const {
        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef
    } = useContext(TasksContext)

    const onSubmit = (e) => {
        e.preventDefault();
        addTask()
    }

    return (
        <form className="todo__form" onSubmit={onSubmit}>
            <Field
                className="todo__field"
                label="New task title"
                id='new-task'
                value={newTaskTitle}
                onInput={(event) => setNewTaskTitle(event.target.value)}
                ref={newTaskInputRef}
            />
            <Button type="submit">Add</Button>
        </form>
    )
}

export default AddTaskForm