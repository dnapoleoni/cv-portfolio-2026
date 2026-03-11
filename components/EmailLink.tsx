'use client';

interface EmailLinkProps {
  subject?: string;
}

export function EmailLink({ subject }: EmailLinkProps) {
  const parts = ['hello', 'dannapoleoni.com.au'];
  const email = parts.join('@');
  const href = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
  return (
    <a href={href} className="link-mono">
      {email}
    </a>
  );
}
