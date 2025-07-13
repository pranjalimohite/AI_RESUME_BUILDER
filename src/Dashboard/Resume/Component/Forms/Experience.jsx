
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from './RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'

const emptyExperience = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
};

function Experience() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experinceList, setExperienceList] = useState(resumeInfo?.experience || [ { ...emptyExperience } ]);
  const [loading, setLoading] = useState(false);

  // Update local state if resumeInfo changes
  useEffect(() => {
    if (Array.isArray(resumeInfo?.experience)) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo?.experience]);

  // Handle input changes
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setExperienceList(prev => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  };

  // Handle rich text editor changes
  const handleRichTextEditor = (value, name, index) => {
    setExperienceList(prev => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  };

  // Add new experience
  const AddNewExperience = () => {
    setExperienceList(prev => [ ...prev, { ...emptyExperience } ]);
  };

  // Remove last experience
  const RemoveExperience = () => {
    setExperienceList(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  // Save experience to backend
  const onSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/resume/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeID: resumeInfo?.resumeID,
          experience: experinceList,
        }),
      });
      if (!response.ok) throw new Error('Failed to save experience');
      setResumeInfo(prev => ({ ...prev, experience: experinceList }));
      alert('Experience saved successfully!');
    } catch (err) {
      alert('Failed to save experience');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experinceList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input name="title" onChange={event => handleChange(index, event)} value={item?.title} />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input name="companyName" onChange={event => handleChange(index, event)} value={item?.companyName} />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input name="city" onChange={event => handleChange(index, event)} value={item?.city} />
                </div>
                <div>
                  <label className='text-xs'>State</label>
                  <Input name="state" onChange={event => handleChange(index, event)} value={item?.state} />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input type="date" name="startDate" onChange={event => handleChange(index, event)} value={item?.startDate} />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input type="date" name="endDate" onChange={event => handleChange(index, event)} value={item?.endDate} />
                </div>
                <div className='col-span-2'>
                  {/* Work Summery  */}
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummery}
                    onRichTextEditorChange={value => handleRichTextEditor(value, 'workSummery', index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
