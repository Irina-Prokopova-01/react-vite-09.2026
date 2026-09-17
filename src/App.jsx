import Router from "./Router.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";

const App = () => {
    const router = {
        '/': TasksPage,
        '/tasks/123': TaskPage,
        '*': () => <div>404 Page not found</div>,
    }

  return (
      <Router routes={router}/>

  )
}

export default App
