import { join } from "path";
import { NextResponse } from "next/server";
import { writeFile } from "fs";
import { promises as fsPromises } from "fs";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join(
    "/",
    "Users",
    "mahmo",
    "OneDrive",
    "Desktop",
    "rateroo-3",
    "seniorProject",
    "public",
    "images",
    file.name
  );
  try {
    await fsPromises.writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing file:", error);
    return NextResponse.json({ success: false, error: "File write error" });
  }
}
