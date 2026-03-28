import { NextRequest, NextResponse } from "next/server";
import { hashPassword, generateToken, sessions } from "@/lib/store";

const ADMIN_USERNAME = "admin";

function getAdminHash() {
  return hashPassword(process.env.ADMIN_PASSWORD ?? "admin123");
}

// POST /api/admin/auth — login
export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (username !== ADMIN_USERNAME || hashPassword(password) !== getAdminHash()) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = generateToken();
  sessions.set(token, "__admin__");
  return NextResponse.json({ token });
}

// GET /api/admin/auth — verify session token
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token || sessions.get(token) !== "__admin__") {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
  return NextResponse.json({ valid: true });
}

// DELETE /api/admin/auth — logout
export async function DELETE(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (token) sessions.delete(token);
  return NextResponse.json({ ok: true });
}
