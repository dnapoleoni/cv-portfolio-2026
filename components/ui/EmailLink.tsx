'use client';

import { getRoleBySlug } from '@/lib/roles';
import { emailSubjects } from '@/data/contact';

interface EmailLinkProps {
  from?: string;
}

export function EmailLink({ from }: EmailLinkProps) {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || '';
  const role = from ? getRoleBySlug(from) : null;
  const subject = role ? emailSubjects.role(role.title) : emailSubjects.default;
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  return (
    <a href={href} className="link-mono">
      Email me
    </a>
  );
}
