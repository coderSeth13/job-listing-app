import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { verifyAdmin } from "../../../../utils/auth";

// Use the second parameter as context rather than destructuring directly
export async function GET(
  request: Request,
  context: { params: { jobId: string } }
) {
  const { jobId } = context.params;

  // Authenticate admin
  const authHeader = request.headers.get("Authorization");
  const admin = await verifyAdmin(authHeader);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // Verify the job exists and that the admin is allowed
  const { data: job, error: jobError } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", jobId)
    .single();

  if (jobError || !job) {
    return NextResponse.json({ error: "Job not found." }, { status: 404 });
  }
  if (job.admin_id !== admin.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // Retrieve applications for the job
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("job_id", jobId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
}
