import Field from "@/shared/ui/Field";
import {TasksContext} from "@/entities/todo";
import {useContext} from "react";

const SearchTaskForm = (props) => {
    const { styles } = props;
    const {
        setSearchQuery,
        searchQuery,
    } = useContext(TasksContext)
    return (
        <form className={styles.form}
              onSubmit={(e) => e.preventDefault()}
        >
            <Field
                className={styles.field}
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