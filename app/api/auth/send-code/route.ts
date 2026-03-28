import { NextRequest, NextResponse } from "next/server";
import { emailCodes, generateCode } from "@/lib/store";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  const code = generateCode();
  emailCodes.set(email, { code, expires: Date.now() + 10 * 60 * 1000 }); // 10 min

  // In production, send a real email here. For demo we return the code.
  console.log(`[DEV] Email code for ${email}: ${code}`);

  return NextResponse.json({
    success: true,
    message: "Verification code sent.",
    // Remove this in production:
    _devCode: code,
  });
}
