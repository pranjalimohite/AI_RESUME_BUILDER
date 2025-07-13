import React from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';


const Landingpage = () => {

  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
    <div class="bg-black min-h-screen flex flex-col">

  
  <nav class="flex justify-between items-center px-8 py-4">
    <div class="text-2xl font-bold">
      <img src="https://dummyimage.com/100x40/fff/000&text=LOGO!+IPSUM" alt="Logo" class="h-10" />
    </div>
    <div class="space-x-4">
        <NavLink to="/login">
            <button class="px-4 py-2 text-amber-50 rounded-lg border border-gray-300 hover:bg-gray-500 text-sm font-medium">Login</button>
        </NavLink>
        <NavLink to="/signup">
            <button class="px-4 py-2 text-amber-50 rounded-lg border border-gray-300 hover:bg-gray-500 text-sm font-medium">Signup</button>
        </NavLink>
      
      
    </div>
  </nav>

  <section class="text-center mt-20 px-4">
    <h1 class="text-5xl text-gray-400 md:text-6xl font-bold leading-tight">
      Start <span class="text-gray-200">building</span> a <span class="text-gray-200">Resume</span> for<br />
      your next <span class="text-gray-400">Job</span>
    </h1>
    <p class="mt-4 text-gray-600 text-xl">Build. Refine. Shine. With AI-Driven Resumes</p>


    <div class="mt-8 flex justify-center space-x-4">
        <button
              class="bg-gray-100 px-6 py-3 rounded-lg hover:bg-gray-200 text-base font-medium flex items-center gap-2"
              onClick={handleGetStarted}>
      
        Get Started →
      </button>
      <button class="bg-gray-100 px-6 py-3 rounded-lg hover:bg-gray-200 text-base font-medium flex items-center gap-2">
        Learn More ✧
      </button>
    </div>
  </section>
  <div class="flex justify-center mt-8 mix-blend-lighten opacity-100">
    <img
      src="/banner2.jpeg"
      alt="Resume Preview"
      class="rounded-2xl shadow-lg w-900px "
    />
  </div>
  <hr className='text-white mt-10' />
  <section class="bg-black py-16 px-4">
  <div class="max-w-7xl mx-auto text-center">
    
    <h2 class="text-3xl md:text-4xl font-bold mb-2">How it Works?</h2>
    <p class="text-gray-500 mb-12 text-base md:text-lg">Generate resume in just 3 steps</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
   
      <div class="bg-amber-50 rounded-2xl shadow-md p-6">
        <div class="text-3xl mb-4 text-white">
      
          <span>⚙️</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">Create Your Template</h3>
        <p class="text-gray-600 text-sm">
          Start by selecting the color scheme for your resume template. Our single, professionally designed template ensures a clean and consistent look for all users.
        </p>
      </div>

  
      <div class="bg-amber-50 rounded-2xl shadow-md p-6">
        <div class="text-3xl mb-4 text-white">
        
          <span>📝</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">Update Your Information</h3>
        <p class="text-gray-600 text-sm">
          Enter your personal details, work experience, education, and skills into the provided form. Our AI assists you in filling out each section accurately and effectively.
        </p>
      </div>

      <div class="bg-amber-50 rounded-2xl shadow-md p-6">
        <div class="text-3xl mb-4 text-white">
        
          <span>🔗</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">Share Your Resume</h3>
        <p class="text-gray-600 text-sm">
          After completing your resume, save it securely and generate a shareable link. Easily update your information anytime and share the link with potential employers or download it in a preferred format.
        </p>
      </div>

    </div>
  </div>
</section>

    </div>
    </>


  )
}

export default Landingpage;

