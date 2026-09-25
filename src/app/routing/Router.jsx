import {useEffect, useState} from "react";

const matchPath = (path, route) => {
    const pathPaths = path.split("/");
    const routePaths = route.split("/");

    if (pathPaths.length !== routePaths.length) {
        return null
    }

    const params = {}

    for (let i = 0; i < routePaths.length; i++) {
        if (routePaths[i].startsWith(':')) {
            const paramName = routePaths[i].slice(1)

            params[paramName] = pathPaths[i]
        } else if (
            routePaths[i] !== pathPaths[i]
        ) {
            return null
        }
    }
    return params
}

export  const useRouter = () => {
    const [path, setPath] = useState(window.location.pathname)

    useEffect(() => {
        const onLocationChange = () => {
            setPath(window.location.pathname)
        }

        window.addEventListener('popstate', onLocationChange)

        return () => {
            window.removeEventListener('popstate', onLocationChange)
        }
    }, [])

    return path


}

const Router = (props) => {
    const { routes } = props
    const path = useRouter()

    for (const route in routes) {
        const params = matchPath(path, route)

        if (params) {
            const Page = routes[route]

            return <Page params={params} />
        }
    }
    const NotFound = routes['*']

    return <NotFound />

    // if (path.startsWith('/tasks')) {
    //     const id = path.replace('/tasks/', '')
    //     const TaskPage = routes['/tasks/:id']
    //
    //     return <TaskPage params={{ id }} />
    // }
    // const Page = routes[path] ?? routes['*']
    // return <Page />
}

export default Router