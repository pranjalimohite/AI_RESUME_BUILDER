import { useState } from 'react'
import './App.css'
import Landingpage from './LandingPage/Landingpage'
import { Navigate, Outlet } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)
  const {user,isLoaded,isSignedIn} = useClerk();
  if(!isLoaded && isSignedIn){
    return <Navigate to={'/login'}/>
  }

  return (
    <>
    
    
      
    <Outlet/>
    </>
  )
}

export default App
