interface DownloadButtonProps {
  href: string;
  label: string;
  className?: string;
}

export function DownloadButton({ href, label, className = 'btn-outline' }: DownloadButtonProps) {
  return (
    <a href={href} download className={className}>
      <span>{label}</span>
      <span className="sr-only">(PDF)</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
