import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Code from "@/lib/CodeModel";

export async function GET() {
  try {
    await connectDB();

    // Fetch all codes
    const codes = await Code.find({})
      .sort({ createdAt: -1 }) // latest first
      .select("code createdAt lastVerifiedAt verifyCount"); // select only needed fields

    return NextResponse.json({
      success: true,
      codes,
    });
  } catch (err) {
    console.error("Fetch codes error:", err);
    return NextResponse.json({
      success: false,
      msg: "❌ Failed to fetch codes",
    }, { status: 500 });
  }
}
