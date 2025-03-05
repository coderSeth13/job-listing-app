// app/page.tsx
import React from "react";
import Header from "@/components/Header";
import JobGrid from "@/components/JobGrid";

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

export default async function HomePage() {
  // Fetch live job data from the API (disable caching for dynamic content)
  const res = await fetch("http://localhost:3000/api/jobs", {
    cache: "no-store",
  });

  const jobs: Job[] = await res.json();

  return (
    <div>
      <Header headerText="Welcome to JobLista" />
      <div className="p-6">
        {jobs && jobs.length > 0 ? (
          <JobGrid jobs={jobs} />
        ) : (
          <p className="text-center text-lg">No job listings found.</p>
        )}
      </div>
    </div>
  );
}
