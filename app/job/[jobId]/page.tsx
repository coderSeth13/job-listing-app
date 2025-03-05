// app/job/[jobId]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import JobDetail from "@/components/JobDetail";
import Header from "@/components/Header";

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

interface PageProps {
  params: { jobId: string };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { jobId } = params;
  const res = await fetch(`http://localhost:3000/api/jobs/${jobId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    notFound();
  }
  const job: Job = await res.json();

  return (
    <div>
      <Header headerText="Feel free to apply" />
      <JobDetail job={job} />
    </div>
  );
}
