import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { verifyAdmin } from "../../../../utils/auth";

export async function GET(
  request: Request,
  context: { params: Record<string, string> }
): Promise<Response> {
  const { jobId } = context.params; // now jobId is extracted from a Record<string, string>

  // Authenticate admin from headers.
  const authHeader = request.headers.get("Authorization");
  const admin = await verifyAdmin(authHeader);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // Verify that the job exists and that the admin is the owner.
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

  // Retrieve applications for the job.
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("job_id", jobId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
}
