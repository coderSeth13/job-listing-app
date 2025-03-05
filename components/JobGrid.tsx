import React from "react";
import JobCard from "./JobCard";

interface Job {
  id: number;
  company: string;
  logo: string;
  position: string;
  role: string;
  level: string;
  contract: string;
  location: string;
  languages?: string[];
  tools?: string[];
}

interface JobGridProps {
  jobs: Job[];
}

const JobGrid: React.FC<JobGridProps> = ({ jobs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobGrid;
