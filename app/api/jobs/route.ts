import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import supabase from "@/lib/supabase";
import { verifyAdmin } from "../../utils/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let query = supabase.from("jobs").select("*");

    // Optional filtering.
    const location = searchParams.get("location");
    const role = searchParams.get("role");

    if (location) {
      query = query.eq("location", location);
    }
    if (role) {
      query = query.eq("role", role);
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Jobs GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate admin (using the Authorization header).
    const authHeader = request.headers.get("Authorization");
    const admin = await verifyAdmin(authHeader);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const {
      company,
      logo,
      position,
      role,
      level,
      contract,
      location,
      languages,
      tools,
    } = body;

    const admin_id = admin.id;
    const { data, error } = await supabase
      .from("jobs")
      .insert([
        {
          company,
          logo,
          position,
          role,
          level,
          contract,
          location,
          languages,
          tools,
          admin_id,
        },
      ])
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Jobs POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
