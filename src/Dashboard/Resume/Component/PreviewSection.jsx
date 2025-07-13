import React from 'react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import PersonalDetails from './Preview/PersonalDetailPreview';
import SummaryPreview from'./Preview/SummaryPreview';
import ProfessionalExper from'./Preview/ExperiencePreview';
import SkillsPreview from './Preview/SkillsPreview';
import EducationalPreview from './Preview/EducationalPreview';


const PreviewSection = () => {
  const { resumeInfo,setResumeInfo } = React.useContext(ResumeInfoContext);
  return (
    <div className='shadow-lg h-full rounded-lg p-4 bg-white'>
      <PersonalDetails resumeInfo={resumeInfo}/>
      <SummaryPreview resumeInfo={resumeInfo}/>
      <ProfessionalExper resumeInfo={resumeInfo}/>
      <EducationalPreview resumeInfo={resumeInfo}/>
      <SkillsPreview resumeInfo={resumeInfo}/>

    </div>
  )
}

export default PreviewSection;