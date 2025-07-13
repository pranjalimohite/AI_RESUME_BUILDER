import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'

const emptySkill = {
  name: '',
  rating: 0,
};

function Skills() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [skillsList, setSkillsList] = useState(resumeInfo?.skills || [{ ...emptySkill }]);
  const [loading, setLoading] = useState(false);

  // Update local state if resumeInfo changes
  useEffect(() => {
    if (Array.isArray(resumeInfo?.skills)) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo?.skills]);

  // Handle input changes
  const handleChange = (index, field, value) => {
    setSkillsList(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  // Add new skill
  const AddNewSkills = () => {
    setSkillsList(prev => [...prev, { ...emptySkill }]);
  };

  // Remove last skill
  const RemoveSkills = () => {
    setSkillsList(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  // Save skills to backend
  const onSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/resume/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeID: resumeInfo?.resumeID,
          skills: skillsList,
        }),
      });
      if (!response.ok) throw new Error('Failed to save skills');
      setResumeInfo(prev => ({ ...prev, skills: skillsList }));
      alert('Skills saved successfully!');
    } catch (err) {
      alert('Failed to save skills');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add Your top professional key skills</p>
      <div>
        {skillsList.map((item, index) => (
          <div key={index} className='flex justify-between mb-2 border rounded-lg p-3 '>
            <div>
              <label className='text-xs'>Name</label>
              <Input
                className="w-full"
                value={item.name}
                onChange={e => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={v => handleChange(index, 'rating', v)}
            />
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
          <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Skills;