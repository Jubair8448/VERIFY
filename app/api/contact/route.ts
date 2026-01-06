import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Message =
  mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);

export async function POST(req: Request) {
  const { message } = await req.json();
  await connectDB();

  await Message.create({ message });
  return NextResponse.json({ success: true });
}
