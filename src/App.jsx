import Router, {useRouter} from "./Router.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";

const App = () => {
    const router = {
        '/': TasksPage,
        '/tasks': TaskPage,
        '*': () => <div>404 Page not found</div>,
    }

  return (
      <Router routes={router}/>

  )
}

export default App
