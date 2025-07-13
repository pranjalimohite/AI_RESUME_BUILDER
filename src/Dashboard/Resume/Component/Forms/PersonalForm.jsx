import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// If you have a LoaderCircle component, import it. Otherwise, use a spinner or text.
// import { LoaderCircle } from "lucide-react";

function PersonalForm() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  // Handle input changes and update context
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Save personal details to backend
  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace with your backend endpoint and method (POST/PUT)
      // Example: await fetch('http://localhost:5000/api/resume/personal', ...)
      const response = await fetch('http://localhost:5000/api/resume/personal', {
        method: 'POST', // or 'PUT' if updating
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeInfo),
      });
      if (!response.ok) throw new Error('Failed to save');
      // Optionally show a success message
    } catch (err) {
      alert('Failed to save personal details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-purple border-t-4">
      <h2 className="font-bold text-lg ">Personal Details</h2>
      <p>Get Started with the basic information</p>
      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label className='text-sm'>First Name</label>
            <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>Last Name</label>
            <Input name="lastName" required onChange={handleInputChange} defaultValue={resumeInfo?.lastName} />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Job Title</label>
            <Input name="jobTitle" required defaultValue={resumeInfo?.jobTitle} onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Address</label>
            <Input name="address" required defaultValue={resumeInfo?.address} onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>Phone</label>
            <Input name="phone" required defaultValue={resumeInfo?.phone} onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>Email</label>
            <Input name="email" required defaultValue={resumeInfo?.email} onChange={handleInputChange} />
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Button type="submit" disabled={loading}>
            {/* Replace LoaderCircle with your spinner if available */}
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}
export default PersonalForm;