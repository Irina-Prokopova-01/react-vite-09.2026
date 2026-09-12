import TodoItem from "./TodoItem.jsx";

const TodoList = (props) => {
    const {
        tasks = [],
        onDeleteTaskButtonClick,
    } = props


    const hasTasks = true
    if (!hasTasks) {
        return (
            <div className="todo__empty-message"></div>
        )
    }
    return (
        <ul className="todo__list">
            {tasks.map((task) => (
                <TodoItem
                    onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                    key={task.id}
                    {...task}
                />
            ))}
        </ul>
    )
}

export default TodoList;