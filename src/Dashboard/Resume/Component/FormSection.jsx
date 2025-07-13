
import React, { useState } from 'react'
import PersonalForm from './Forms/PersonalForm'
import Summery from './Forms/Summary'
import Experience from './Forms/Experience'
import Education from './Forms/Education'
import Skills from './Forms/Skills'
import { Button } from '@/components/ui/button'
import View from '@/my-Resume/[resumeId]/view'
import { ArrowRight, LayoutGrid,ArrowLeft } from 'lucide-react'
import { Toaster } from 'sonner';
import { useParams, Navigate } from 'react-router-dom';


const FormSection = () => {
  const { resumeId } = useParams();
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(true);
  return (
  <div>
    <div className='flex justify-between items-center'>
      <Button size='sm'><LayoutGrid className='flex gap-2'/>Theme</Button>
      <div className='flex gap-2'>
            {activeFormIndex>1
            &&<Button
           
            size="sm" 
            onClick={()=>setActiveFormIndex(activeFormIndex-1)}> <ArrowLeft/> </Button> }
            <Button 
            disabled={!enableNext}
            className="flex gap-2" size="sm"
            onClick={()=>setActiveFormIndex(activeFormIndex+1)}
            > Next 
            <ArrowRight/> </Button>
          </div>
     
     
    </div>
    {activeFormIndex==1? <PersonalForm  enabledNext={(v)=>setEnableNext(v)} />:activeFormIndex==2?
              <Summery  enabledNext={(v)=>setEnableNext(v)} />:activeFormIndex==3?
              <Experience />:activeFormIndex==4?
              <Education/>:activeFormIndex==5?
              <Skills/>
              :activeFormIndex==6?
              <Navigate to={'/my-resume/'+resumeId+"/view"}/>
                  
            :null
              }
    </div>
  )
}

export default FormSection