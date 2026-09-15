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

    const clearNewTaskTitle = newTaskTitle.trim()
    const isNewTitleEmpty = clearNewTaskTitle.length === 0

    const onSubmit = (e) => {
        e.preventDefault();

        if(!isNewTitleEmpty) {
            addTask(clearNewTaskTitle)
        }
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
            <Button
                type="submit"
                isDisabled={isNewTitleEmpty}
            >
                Add
            </Button>
        </form>
    )
}

export default AddTaskForm