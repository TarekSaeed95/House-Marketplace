import { Outlet,Navigate } from "react-router-dom"
import {useAuthStatus} from "../Hooks/useAuthStatus"
import LoaderComponent from "./LoaderComponent"

function PrivateRoute() {
    const {loggedIn,checking}=useAuthStatus()
    if(checking){return   <LoaderComponent/>}
    return loggedIn ? <Outlet/> : <Navigate to='/signin'/>
}

export default PrivateRoute