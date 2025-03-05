// components/JobDetail.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

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
  description?: string;
}

interface JobDetailProps {
  job: Job;
}

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header: Logo & Basic Info */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
          <Image
            src={job.logo}
            alt={`${job.company} logo`}
            fill
            className="object-contain rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[hsl(180,14%,20%)]">
            {job.position}
          </h1>
          <p className="mt-2 text-lg text-[hsl(180,8%,52%)]">
            {job.company} • {job.location}
          </p>
          <div className="mt-4 flex gap-4">
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
        </div>
      </div>

      {/* Optional Description */}
      {job.description && (
        <div className="mt-6">
          <p className="text-base text-[hsl(180,8%,52%)]">{job.description}</p>
        </div>
      )}

      {/* Languages & Tools */}
      <div className="mt-6">
        {job.languages && job.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-[hsl(180,8%,52%)]">
              Languages
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[hsl(180,31%,95%)] text-xs rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
        {job.tools && job.tools.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-[hsl(180,8%,52%)]">
              Tools
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[hsl(180,31%,95%)] text-xs rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Apply Button */}
      <div className="mt-8">
        <Link href="/apply">
          <span className="block text-center bg-[hsl(180,29%,50%)] text-white py-3 rounded hover:bg-[hsl(180,29%,45%)] transition-colors">
            Apply for this Job
          </span>
        </Link>
      </div>
    </div>
  );
};

export default JobDetail;
