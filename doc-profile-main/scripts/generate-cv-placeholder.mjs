import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

/** Build a minimal valid single-page PDF with correct xref offsets. */
function buildMinimalPdf(lines) {
  const escapePdfText = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

  const streamLines = lines.map((line, i) => {
    const y = 720 - i * 22;
    return `72 ${y} Td (${escapePdfText(line)}) Tj`;
  });
  const stream = `BT /F1 12 Tf ${streamLines.join("\n")}\nET`;
  const streamLength = Buffer.byteLength(stream, "utf8");

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n",
    `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${stream}\nendstream\nendobj\n`,
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
  ];

  let body = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  const offsets = [0];

  for (const obj of objects) {
    offsets.push(Buffer.byteLength(body, "utf8"));
    body += obj;
  }

  const xrefStart = Buffer.byteLength(body, "utf8");
  let xref = `xref\n0 ${objects.length + 1}\n`;
  xref += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }

  body += xref;
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  body += `startxref\n${xrefStart}\n`;
  body += "%%EOF\n";

  return Buffer.from(body, "utf8");
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "uploads");
const outFile = path.join(outDir, "cv-placeholder.pdf");

const pdf = buildMinimalPdf([
  "Dr. Mwenya Mubanga",
  "Curriculum Vitae (placeholder)",
  "",
  "Replace this file via Admin > CV Upload",
]);

await mkdir(outDir, { recursive: true });
await writeFile(outFile, pdf);

const text = pdf.toString("utf8");
const xrefLine = text.match(/startxref\n(\d+)/);
console.log(`Wrote ${outFile} (${pdf.length} bytes), startxref=${xrefLine?.[1]}`);
