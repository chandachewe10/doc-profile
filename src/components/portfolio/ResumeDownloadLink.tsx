import { FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteContent } from "@/lib/content";

type ResumeDownloadLinkProps = {
  resume: NonNullable<SiteContent["resume"]>;
  /** primary = copper fill; hero = outline on dark panel; outline = outline on beige sections */
  variant?: "primary" | "hero" | "outline";
  className?: string;
  showIcon?: boolean;
};

const variantStyles = {
  primary: "btn-navy",
  hero: "btn-outline-light",
  outline: "btn-outline-navy",
} as const;

export function ResumeDownloadLink({
  resume,
  variant = "outline",
  className,
  showIcon = true,
}: ResumeDownloadLinkProps) {
  return (
    <a href="/api/resume/download" className={cn(variantStyles[variant], className)}>
      {showIcon && <FileDown className="h-3.5 w-3.5" />}
      {resume.label}
    </a>
  );
}
