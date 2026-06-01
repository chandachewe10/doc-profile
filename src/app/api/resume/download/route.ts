import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/content";
import { generateResumePdf, resumeDownloadFilename } from "@/lib/resume-pdf/generate";

export const runtime = "nodejs";

export async function GET() {
  try {
    const content = await getSiteContent();
    const buffer = await generateResumePdf(content);
    const filename = content.resume?.filename?.endsWith(".pdf")
      ? content.resume.filename
      : resumeDownloadFilename(content);

    if (buffer.length < 5 || buffer.subarray(0, 5).toString("utf8") !== "%PDF-") {
      return NextResponse.json({ error: "Failed to generate CV" }, { status: 500 });
    }

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
        "Content-Length": String(buffer.length),
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (err) {
    console.error("CV generation error:", err);
    return NextResponse.json({ error: "Failed to generate CV" }, { status: 500 });
  }
}
