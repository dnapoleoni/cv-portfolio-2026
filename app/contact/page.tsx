import { ContactPageContent } from '@/components/ContactPageContent';
import { Loading } from '@/components/Loading';
import { Suspense } from 'react';

export default function ContactPage() {
  return (
    <Suspense fallback={<Loading message="Loading contact form..." />}>
      <ContactPageContent />
    </Suspense>
  );
}
