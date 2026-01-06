import { connectDB } from "@/lib/db";
import Code from "@/lib/CodeModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ saved: 0, duplicates: 0 });
  }

  const text = await file.text();
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  let saved = 0;
  let duplicates = 0;

  for (const code of lines) {
    try {
      await Code.create({ code });
      saved++;
    } catch {
      duplicates++;
    }
  }

  return NextResponse.json({ saved, duplicates });
}
