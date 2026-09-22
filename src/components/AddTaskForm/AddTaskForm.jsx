import Field from "../Field/Field.jsx";
import Button from "../Button/Button.jsx";
import {useContext, useState} from "react";
import {TasksContext} from "../../context/tasksContext.jsx";

const AddTaskForm = (props) => {
    const{ styles } = props;
    const {
        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef
    } = useContext(TasksContext)

    const [error, setError] = useState('');

    const clearNewTaskTitle = newTaskTitle.trim()
    const isNewTitleEmpty = clearNewTaskTitle.length === 0

    const onSubmit = (e) => {
        e.preventDefault();

        if(!isNewTitleEmpty) {
            addTask(clearNewTaskTitle)
        }
    }

    const onInput = (event) => {
        const { value } = event.target
        const clearValue = value.trim()
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0;

        setNewTaskTitle(value)

        setError(hasOnlySpaces ? 'The task cannot be empty' : '')
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Field
                className={styles.field}
                label="New task title"
                id='new-task'
                error={error}
                value={newTaskTitle}
                onInput={onInput}
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