import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const Login = () => {
  return (
    <>
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <SignIn afterSignInUrl="/dashboard" />
      </div>
    </>
  )
}

export default Login;