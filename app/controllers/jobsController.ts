import supabase from "@/lib/supabase";

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

export async function createJob(jobData: any) {
  return await supabase.from("jobs").insert(jobData).single();
}

export async function updateJob(jobId: string, jobData: any) {
  return await supabase.from("jobs").update(jobData).eq("id", jobId).single();
}

export async function deleteJob(jobId: string) {
  return await supabase.from("jobs").delete().eq("id", jobId).single();
}
