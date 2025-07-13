import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './index.css'
import Landingpage from './LandingPage/Landingpage'
import Signup from './LandingPage/Signup.jsx'
import Login from './LandingPage/Login.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import { ClerkProvider } from '@clerk/clerk-react';
import ResumeBuilder from './Dashboard/ResumeBuilder';
import Editresume from './Dashboard/Resume/[resumeId]/edit';
import View from './my-Resume/[resumeId]/view';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


const  router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet/>,
    children : [
      {
        path: "",
        element: <Landingpage/>
      },
      {
        path: "signup",
        element: <Signup/>

      },{
        path: "login",
        element:<Login/>
      },
      {
        path: "dashboard",
        element: <Dashboard/>
      },
      {
        path: "resumeBuilder",
        element: <ResumeBuilder/>
      },
      {
        path: "dashboard/resume/:resumeId/edit",
        element: <Editresume/>
      },
      {
        path: "my-Resume/:resumeId/view",
        element: <View/>
      }
    ]
  }])




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)