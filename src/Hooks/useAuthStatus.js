import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useRef, useState } from "react"
export const  useAuthStatus= ()=> {
    const[loggedIn,setLoggedIn]=useState(false)
    const[checking,setChecking]=useState(true)
    const isMounted=useRef(true)
    const auth=getAuth();
    useEffect(() => {
        if(isMounted){
            onAuthStateChanged(auth,(user)=>{
                if(user){
                    setLoggedIn(true)
                }
                setChecking(false)
            })}
        return ()=>{
            isMounted.current=false
        }
    }, [isMounted])
  return {loggedIn,checking}
}

