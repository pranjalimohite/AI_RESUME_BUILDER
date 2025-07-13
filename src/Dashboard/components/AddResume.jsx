import React, { useEffect, useState } from 'react';
import { PlusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import ResumeCard from './ResumeCard'; // Import the card component
import { useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const [resumes, setResumes] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // Fetch all resumes on mount
  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/resume');
      const data = await res.json();
      setResumes(data);
    } catch (error) {
      console.error('Failed to fetch resumes');
    }
  };

  const onCreateResume = async () => {
    const uuid = uuidv4();
    const payload = {
      title: resumeTitle,
      resumeID: uuid,
      username: user?.fullName || 'Anonymous',
      useremailId: user?.primaryEmailAddress?.emailAddress || 'noemail@example.com',
    };

    try {
      const res = await fetch('http://localhost:5000/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setOpenDialog(false);
        setResumeTitle('');
        navigate(`/dashboard/resume/${uuid}/edit`);
        fetchResumes(); // Refresh the list after creating
      } else {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
    } catch (error) {
      alert('Network error');
    }
  };

  // ...existing imports...


  return (
    <div>
      {/* Flex container for Add Resume button and Resume Cards */}
      <div className="mt-6 flex flex-row gap-4 items-center">
        {/* Add Resume Button */}
        <div
          className='p-14 h-[280px] py-24 border items-center flex justify-center bg-secondary rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer'
          onClick={() => setOpenDialog(true)}
        >
          <PlusSquare />
        </div>

        {/* Resume Cards */}
        {resumes.map(resume => (
          <ResumeCard key={resume.resumeID} title={resume.title} resumeID={resume.resumeID} />
        ))}
      </div>

      {/* Dialog for creating resume */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add Title for your new Resume</p>
              <Input
                className='my-2'
                placeholder="Ex. Full Stack Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className='flex justify-end gap-2 mt-4'>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button
                disabled={!resumeTitle}
                onClick={onCreateResume}
              >Create</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;