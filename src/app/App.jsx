import Router from "./routing/Router.jsx";
import TaskPage from "@/pages/TaskPage";
import TasksPage from "@/pages/TasksPage";
import './styles'

const App = () => {
    const router = {
        '/': TasksPage,
        '/tasks/:id': TaskPage,
        '*': () => <div>404 Page not found</div>,
    }

  return (
      <Router routes={router}/>

  )
}

export default App
