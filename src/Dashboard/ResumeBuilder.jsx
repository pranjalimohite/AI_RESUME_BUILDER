import React from 'react'
import AddResume from './components/AddResume'

const ResumeBuilder = () => {
  return (
    <div className='p-10 md:px-20 lg:px-40'>
        <h2 className='font-bold text-3xl'>MY RESUME</h2>
        <p>Start Creating AI Resume to your next Job role</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10'>
            <AddResume/>
        </div>
    </div>
  )
}

export default ResumeBuilder