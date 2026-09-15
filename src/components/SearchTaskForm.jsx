import Field from "./Field.jsx";
import {TasksContext} from "../context/tasksContext.jsx";
import {useContext} from "react";

const SearchTaskForm = () => {
    const {
        setSearchQuery,
        searchQuery,
    } = useContext(TasksContext)
    return (
        <form className="todo__form"
              onSubmit={(e) => e.preventDefault()}
        >
            <Field
                className="todo__field"
                label="Search task"
                id="search-task"
                type="search"
                value={searchQuery}
                onInput={(event) => setSearchQuery(event.target.value)}
            />
        </form>
    )
}

export default SearchTaskForm