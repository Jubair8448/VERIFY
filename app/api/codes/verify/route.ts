import { connectDB } from "@/lib/db";
import Code from "@/lib/CodeModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code || !code.trim()) {
      return NextResponse.json(
        { msg: "❌ Code is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const data = await Code.findOne({ code: code.trim() });

    if (!data) {
      return NextResponse.json(
        { msg: "❌ Invalid Code" },
        { status: 404 }
      );
    }

    // Optional: log the verification date
    data.lastVerifiedAt = new Date();
    await data.save();

    // Always allow reuse
    return NextResponse.json(
      { msg: "✅ Product is 100% Genuine" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Verify Code Error:", error);
    return NextResponse.json(
      { msg: "❌ Server Error" },
      { status: 500 }
    );
  }
}
