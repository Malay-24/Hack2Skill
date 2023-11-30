import {useState,createContext} from 'react'

export const AuthContext=createContext();

function AuthContextProvider({children}){
    const initState={
        isAuth:false,
        name:""
    }

const [authState,setAuthState]=useState(initState)


  return (
    <AuthContext.Provider value={{authState}}>{children}</AuthContext.Provider>
  )
}


export default AuthContextProvider