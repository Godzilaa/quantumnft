import { NextRequest, NextResponse } from "next/server";
import { users, sessions, generateToken } from "@/lib/store";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { walletAddress } = body;

  if (!walletAddress || typeof walletAddress !== "string") {
    return NextResponse.json({ error: "Invalid wallet address." }, { status: 400 });
  }

  const normalised = walletAddress.toLowerCase();

  // Find existing user by wallet or create one
  let existingUser = [...users.values()].find(
    (u) => u.walletAddress?.toLowerCase() === normalised
  );

  if (!existingUser) {
    const isEth = normalised.startsWith("0x");
    const addressFragment = isEth ? normalised.slice(2, 10) : normalised.slice(0, 8);
    const username = `wallet_${addressFragment}`;
    
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
