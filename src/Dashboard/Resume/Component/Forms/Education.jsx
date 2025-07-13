import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';

const emptyEducation = {
  universityName: '',
  degree: '',
  major: '',
  startDate: '',
  endDate: '',
  description: '',
};

function Education() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationalList, setEducationalList] = useState(resumeInfo?.education || [{ ...emptyEducation }]);
  const [loading, setLoading] = useState(false);

  // Update local state if resumeInfo changes
  useEffect(() => {
    if (Array.isArray(resumeInfo?.education)) {
      setEducationalList(resumeInfo.education);
    }
  }, [resumeInfo?.education]);

  // Handle input changes
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setEducationalList(prev => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  };

  // Add new education
  const AddNewEducation = () => {
    setEducationalList(prev => [...prev, { ...emptyEducation }]);
  };

  // Remove last education
  const RemoveEducation = () => {
    setEducationalList(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  // Save education to backend
  const onSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/resume/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeID: resumeInfo?.resumeID,
          education: educationalList,
        }),
      });
      if (!response.ok) throw new Error('Failed to save education');
      setResumeInfo(prev => ({ ...prev, education: educationalList }));
      alert('Education saved successfully!');
    } catch (err) {
      alert('Failed to save education');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your educational details</p>
      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label>University Name</label>
                <Input name="universityName" onChange={e => handleChange(e, index)} value={item?.universityName} />
              </div>
              <div>
                <label>Degree</label>
                <Input name="degree" onChange={e => handleChange(e, index)} value={item?.degree} />
              </div>
              <div>
                <label>Major</label>
                <Input name="major" onChange={e => handleChange(e, index)} value={item?.major} />
              </div>
              <div>
                <label>Start Date</label>
                <Input type="date" name="startDate" onChange={e => handleChange(e, index)} value={item?.startDate} />
              </div>
              <div>
                <label>End Date</label>
                <Input type="date" name="endDate" onChange={e => handleChange(e, index)} value={item?.endDate} />
              </div>
              <div className='col-span-2'>
                <label>Description</label>
                <Textarea name="description" onChange={e => handleChange(e, index)} value={item?.description} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
          <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Education;