import { renderToBuffer } from "@react-pdf/renderer";
import type { SiteContent } from "@/lib/content";
import { ResumeDocument } from "@/lib/resume-pdf/ResumeDocument";

export async function generateResumePdf(content: SiteContent): Promise<Buffer> {
  const buffer = await renderToBuffer(<ResumeDocument content={content} />);
  return Buffer.from(buffer);
}

export function resumeDownloadFilename(content: SiteContent): string {
  const hero = content.hero;
  const base =
    hero?.name && hero?.nameEmphasis
      ? `${hero.name}-${hero.nameEmphasis}`.replace(/\s+/g, "-")
      : "Mwenya-Mubanga";
  return `${base}-CV.pdf`.replace(/[^a-zA-Z0-9._-]/g, "");
}
