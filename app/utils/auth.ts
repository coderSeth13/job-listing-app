import bcrypt from "bcryptjs";
import supabase from "@/lib/supabase";

export async function verifyAdmin(authHeader: string | null) {
  // Expect header format: "Bearer token"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];

  // For demonstration: expect token format "dummy-token-for-{adminId}"
  if (!token.startsWith("dummy-token-for-")) {
    return null;
  }
  const adminId = parseInt(token.replace("dummy-token-for-", ""), 10);
  if (isNaN(adminId)) {
    return null;
  }

  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("id", adminId)
    .single();
  if (error || !data) {
    return null;
  }
  return data;
}

export function verifyPassword(
  inputPassword: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(inputPassword, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
