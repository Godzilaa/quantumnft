import { NextRequest, NextResponse } from "next/server";
import { users, sessions, hashPassword, generateToken } from "@/lib/store";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  const user = users.get(username);
  if (!user || user.passwordHash !== hashPassword(password)) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const token = generateToken();
  sessions.set(token, username);

  return NextResponse.json({
    success: true,
    token,
    user: { id: user.id, username, email: user.email },
  });
}
