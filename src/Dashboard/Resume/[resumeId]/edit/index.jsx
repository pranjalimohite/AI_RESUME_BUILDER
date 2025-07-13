import { Edit } from 'lucide-react'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../Component/FormSection';
import PreviewSection from '../../Component/PreviewSection';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';


const Editresume = () => {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    // Fetch resume data from backend
    async function fetchResume() {
      const res = await fetch(`http://localhost:5000/api/resume/${resumeId}`);
      if (res.ok) {
        const data = await res.json();
        setResumeInfo(data);
        // Optionally set selectedTemplate if you save it in the backend
        // setSelectedTemplate(data.selectedTemplate);
      }
    }
    if (resumeId) fetchResume();
  }, [resumeId]);
  
              
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4'>
        <FormSection />
        <PreviewSection />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default Editresume;