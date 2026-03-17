import { ContextLink } from '@/components/ui/ContextLink';
import { EmailLink } from '@/components/ui/EmailLink';
import { contact } from '@/data/contact';

interface ContactCTAProps {
  heading?: string;
  description?: string;
  slug?: string;
  hideContactLink?: boolean;
}

export function ContactCTA({
  heading = "Let's talk",
  description = "I'm currently available and based in Melbourne. Whether you've got a specific role in mind or just want to chat — I'd love to hear from you.",
  slug,
  hideContactLink = false,
}: ContactCTAProps) {
  return (
    <section className="contact-section" aria-labelledby="contact-heading">
      <h2 id="contact-heading">{heading}</h2>
      {description && <p>{description}</p>}
      <div className="link-group mobile-start mobile-col-reverse">
        {!hideContactLink && (
          <ContextLink href="/contact" className="btn-solid-accent">
            Send me a message
          </ContextLink>
        )}
        <EmailLink from={slug} />
        <a href={contact.linkedIn} className="link-mono" target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
      </div>
    </section>
  );
}
