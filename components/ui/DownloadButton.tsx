import { Icon } from '@/components/ui/Icon';

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
      <Icon name="download" size={16} />
    </a>
  );
}
