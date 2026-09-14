import Field from "./Field.jsx";

const SearchTaskForm = (props) => {
    const {
        // onSearchInput,
        setSearchQuery,
        searchQuery,
    } = props
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