import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import { Button } from '../components/ui/button'
import { NavLink } from 'react-router-dom' // Add this import

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-4 font-sans">
      <div className="flex items-center">
        {/* Left: User Button */}
        <UserButton />

        {/* Right: Navigation Buttons */}
        <div className="flex gap-3 ml-auto">
          <Button className="text-sm font-medium rounded-md shadow-sm px-4 py-2">Dashboard</Button>
          <Button className="text-sm font-medium rounded-md shadow-sm px-4 py-2">Industry Insights</Button>
          <NavLink to="/resumeBuilder">
            <Button className="text-sm font-medium rounded-md shadow-sm px-4 py-2">Resume Builder</Button>
          </NavLink>
          <Button className="text-sm font-medium rounded-md shadow-sm px-4 py-2">Logout</Button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;