import TodoItem from "./TodoItem.jsx";

const TodoList = (props) => {
    const {
        tasks = [],
    } = props


    const hasTasks = true
    if (!hasTasks) {
        return (
            <div className="todo__empty-message"></div>
        )
    }
    return (
        <ul className="todo__list">
            {tasks.map(({id, title, isDone}) => (
                <TodoItem
                    className="todo__item"
                    id={id}
                    title={title}
                    isDone={isDone}
                />
            ))}
        </ul>
    )
}

export default TodoList;