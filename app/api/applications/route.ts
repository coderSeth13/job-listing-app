import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Expected fields: job_id, applicant_name, email, resume (or cover letter)
    const { job_id, applicant_name, email, resume } = body;
    if (!job_id || !applicant_name || !email || !resume) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("applications")
      .insert([{ job_id, applicant_name, email, resume }])
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Application POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
