import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const Signup = () => {
  return (
    <>
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <SignUp afterSignUpUrl="/dashboard" />
      </div>
    </>
  )
}

export default Signup