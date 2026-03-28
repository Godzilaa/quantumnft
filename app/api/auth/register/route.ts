import { NextRequest, NextResponse } from "next/server";
import { users, emailCodes, sessions, hashPassword, generateToken } from "@/lib/store";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password, confirmPassword, email, mobile, referralCode, verificationCode } = body;

  if (!username || !password || !email) {
    return NextResponse.json({ error: "Username, password and email are required." }, { status: 400 });
  }
  if (password !== confirmPassword) {
    return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }
  if (users.has(username)) {
    return NextResponse.json({ error: "Username is already taken." }, { status: 409 });
  }

  // Verify email code if provided
  if (verificationCode) {
    const record = emailCodes.get(email);
    if (!record || record.code !== verificationCode || Date.now() > record.expires) {
      return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 400 });
    }
    emailCodes.delete(email);
  }

  const user = {
    id: generateToken().slice(0, 16),
    username,
    passwordHash: hashPassword(password),
    email,
    mobile: mobile || "",
    referralCode: referralCode || "",
    walletAddress: undefined,
    createdAt: new Date().toISOString(),
  };

  users.set(username, user);

  const token = generateToken();
  sessions.set(token, username);

  return NextResponse.json({
    success: true,
    token,
    user: { id: user.id, username, email },
  });
}
