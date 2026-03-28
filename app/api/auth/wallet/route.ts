import { NextRequest, NextResponse } from "next/server";
import { users, sessions, generateToken } from "@/lib/store";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { walletAddress } = body;

  if (!walletAddress || !walletAddress.startsWith("0x")) {
    return NextResponse.json({ error: "Invalid wallet address." }, { status: 400 });
  }

  const normalised = walletAddress.toLowerCase();

  // Find existing user by wallet or create one
  let existingUser = [...users.values()].find(
    (u) => u.walletAddress?.toLowerCase() === normalised
  );

  if (!existingUser) {
    const username = `wallet_${normalised.slice(2, 10)}`;
    existingUser = {
      id: generateToken().slice(0, 16),
      username,
      passwordHash: null,
      email: "",
      walletAddress: normalised,
      createdAt: new Date().toISOString(),
    };
    users.set(username, existingUser);
  }

  const token = generateToken();
  sessions.set(token, existingUser.username);

  return NextResponse.json({
    success: true,
    token,
    user: {
      id: existingUser.id,
      username: existingUser.username,
      walletAddress: normalised,
    },
  });
}
