import {useEffect, useState} from "react";

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
    const Page = routes[path] ?? routes['*']
    return <Page />
}

export default Router