import Todo from "./components/Todo.jsx";
import {TasksProvider} from "./context/tasksContext.jsx";

const App = () => {
    // console.log('App')
  return (
      <TasksProvider>
        <Todo />
      </TasksProvider>
  )
}

export default App
