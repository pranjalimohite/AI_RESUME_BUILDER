// ResumeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const ResumeCard = ({ title,resumeID }) => (
    <Link to={`/dashboard/resume/${resumeID}/edit`}>
  <div className="p-14 flex items-center justify-center h-[280px] border rounded-lg bg-white font-bold text-center">
    <h3>{title}</h3>
  </div>
  </Link>
    
);
export default ResumeCard;