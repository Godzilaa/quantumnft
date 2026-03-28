import { NextResponse } from 'next/server';
import { pageContent, updatePageContent } from '@/lib/store';

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(pageContent);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    updatePageContent(data);
    return NextResponse.json({ success: true, pageContent });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
  }
}
