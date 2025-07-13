import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { Brain, LoaderCircle } from 'lucide-react';
// import { toast } from 'sonner'; // Commented out in case of issues

function Summery({resumeInfo}){
    const { setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState(resumeInfo?.summery || '');
    const [loading, setLoading] = useState(false);
    const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState([]);
    const [aiLoading, setAiLoading] = useState(false);

    // Update local state when resumeInfo changes
    useEffect(() => {
        if (resumeInfo?.summery) {
            setSummery(resumeInfo.summery);
        }
    }, [resumeInfo?.summery]);

    // Save summary to backend
    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/resume/summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resumeID: resumeInfo?.resumeID,
                    summery: summery
                }),
            });
            
            if (!response.ok) throw new Error('Failed to save summary');
            
            // Update context
            setResumeInfo(prev => ({ ...prev, summery }));
            alert('Summary saved successfully!'); // Using alert instead of toast
        } catch (err) {
            alert('Failed to save summary'); // Using alert instead of toast
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Generate AI summary suggestions
    const GenerateSummeryFromAI = async () => {
        setAiLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/resume/generate-summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobTitle: resumeInfo?.jobTitle || 'Software Developer',
                    experience: resumeInfo?.experience || 'entry-level'
                }),
            });
            
            if (!response.ok) throw new Error('Failed to generate summary');
            
            const data = await response.json();
            setAiGeneratedSummeryList(data.suggestions || []);
            alert('AI suggestions generated!'); // Using alert instead of toast
        } catch (err) {
            alert('Failed to generate AI suggestions'); // Using alert instead of toast
            console.error(err);
        } finally {
            setAiLoading(false);
        }
    };

    return (
    <div>
         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add Summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summary</label>
                <Button 
                    variant="outline" 
                    onClick={GenerateSummeryFromAI} 
                    type="button" 
                    size="sm" 
                    className="border-primary text-primary flex gap-2"
                    disabled={aiLoading}
                > 
                    {aiLoading ? <LoaderCircle className='h-4 w-4 animate-spin' /> : <Brain className='h-4 w-4' />}
                    {aiLoading ? 'Generating...' : 'Generate from AI'}
                </Button>
            </div>
            <Textarea 
                className="mt-5" 
                required
                value={summery}
                onChange={(e) => setSummery(e.target.value)}
                placeholder="Enter your professional summary..."
            />
            <div className='mt-2 flex justify-end'>
            <Button type="submit" disabled={loading}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </form>
        </div>

        
       {aiGeneratedSummeryList && aiGeneratedSummeryList.length > 0 && (
            <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummeryList.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => setSummery(item?.summery)}
                        className='p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors'
                    >
                        <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                        <p>{item?.summery}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default Summery;