import { ContactPageContent } from '@/components/ContactPageContent';
import { Loading } from '@/components/Loading';
import { Suspense } from 'react';

export const metadata = {
  title: 'Get in Touch — Dan Napoleoni',
  description:
    'Contact Dan Napoleoni about frontend development, digital marketing, or UX engineering roles in Melbourne.',
};

export default function ContactPage() {
  return (
    <Suspense fallback={<Loading message="Loading contact form..." />}>
      <ContactPageContent />
    </Suspense>
  );
}
