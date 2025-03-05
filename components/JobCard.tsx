// components/JobCard.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

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

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 flex-shrink-0">
          <Image
            src={job.logo}
            alt={`${job.company} logo`}
            fill
            className="object-contain rounded-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[hsl(180,14%,20%)]">
            {job.position}
          </h2>
          <p className="text-sm text-[hsl(180,8%,52%)]">
            {job.company} &bull; {job.location}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-[hsl(180,29%,50%)] text-white text-xs font-semibold rounded-full">
          {job.contract}
        </span>
        <span className="px-3 py-1 border border-[hsl(180,8%,52%)] text-[hsl(180,8%,52%)] text-xs font-semibold rounded-full">
          {job.level}
        </span>
        <span className="px-3 py-1 border border-[hsl(180,8%,52%)] text-[hsl(180,8%,52%)] text-xs font-semibold rounded-full">
          {job.role}
        </span>
      </div>
      {job.languages && job.languages.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-[hsl(180,8%,52%)]">
            Languages:
          </h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {job.languages.map((lang, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[hsl(180,31%,95%)] text-xs rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
      {job.tools && job.tools.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-[hsl(180,8%,52%)]">Tools:</h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {job.tools.map((tool, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[hsl(180,31%,95%)] text-xs rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="mt-6">
        <Link href={`/job/${job.id}`}>
          <span className="block text-center bg-[hsl(180,29%,50%)] text-white py-2 rounded hover:bg-[hsl(180,29%,45%)] transition-colors">
            View Details
          </span>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
