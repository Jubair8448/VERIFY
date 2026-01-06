import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Code from "@/lib/CodeModel";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) return NextResponse.json({ msg: "❌ ID is required" }, { status: 400 });

    await connectDB();

    const code = await Code.findById(id);
    if (!code) return NextResponse.json({ msg: "❌ Code not found" }, { status: 404 });

    await code.deleteOne();

    return NextResponse.json({ msg: "🗑 Code deleted successfully", success: true }, { status: 200 });
  } catch (err) {
    console.error("Delete Code Error:", err);
    return NextResponse.json({ msg: "❌ Server error" }, { status: 500 });
  }
}
