import { connectDB } from "@/lib/db";
import Code from "@/lib/CodeModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code } = await req.json();
  await connectDB();

  try {
    await Code.create({ code });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
