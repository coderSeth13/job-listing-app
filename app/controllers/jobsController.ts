// app/controllers/jobsController.ts
import supabase from "@/lib/supabase";

// Define our Job interface representing a record in the jobs table.
export interface Job {
  id: number;
  company: string;
  logo: string;
  position: string;
  role: string;
  level: string;
  posted_at?: string;
  contract: string;
  location: string;
  languages?: string[];
  tools?: string[];
  admin_id: number;
}

// For creating a new job, we expect all fields except id and posted_at.
export type NewJobInput = Omit<Job, "id" | "posted_at">;

// For updating a job, we'll allow a partial set of fields.
// Typically, you wouldn't want to update `id`, `admin_id`, or `posted_at`.
export type UpdateJobInput = Partial<
  Omit<Job, "id" | "admin_id" | "posted_at">
>;

export async function getJobs(
  filters: { location?: string; role?: string } = {}
) {
  let query = supabase.from("jobs").select("*");

  if (filters.location) {
    query = query.eq("location", filters.location);
  }
  if (filters.role) {
    query = query.eq("role", filters.role);
  }

  return await query;
}

export async function createJob(jobData: NewJobInput) {
  // Wrap jobData in an array for the insert operation.
  return await supabase.from("jobs").insert([jobData]).single();
}

export async function updateJob(jobId: number, jobData: UpdateJobInput) {
  return await supabase.from("jobs").update(jobData).eq("id", jobId).single();
}

export async function deleteJob(jobId: number) {
  return await supabase.from("jobs").delete().eq("id", jobId).single();
}
