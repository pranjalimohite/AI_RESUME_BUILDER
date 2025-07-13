import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import PreviewSection from "@/Dashboard/Resume/Component/PreviewSection";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import { useParams } from "react-router-dom";

function View (){
    const [resumeInfo, setResumeInfo] = useState();
    const previewRef = useRef();
    const { resumeId } = useParams();

    useEffect(() => {
        fetch(`/api/resume/${resumeId}`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched resume data:", data);
                setResumeInfo(data);
            })
            .catch(err => console.error("Failed to fetch resume info", err));
    }, [resumeId]);

    const handleDownload = () => {
        window.print()
    }

    if (!resumeInfo) {
        return <div>Loading...</div>;
    }

    return(
        <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
            <div id="no-print">
            <div className="my-10 mx-10 md:mx-20 lg:mx-40">
                <h2 className="text-center text-2xl font-medium">Congrats! Your Ultimate AI generate Resume is Ready</h2>
                <p className="text-center text-gray-400">Now are ready to download your Resume and you can share unique resume url with your friends and fellow</p>
                <div className="flex justify-between px-44 my-10">
                    <Button onClick={handleDownload} type="button">Download</Button>
                    <Button>Share</Button>
                </div>
                </div>
            </div>
                <div id="print-area" ref={previewRef}>
                    <PreviewSection />
                </div>
            
        </ResumeInfoContext.Provider>
    );
}
export default View;

