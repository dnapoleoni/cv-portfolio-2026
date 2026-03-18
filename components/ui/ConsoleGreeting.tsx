'use client';

import { useEffect } from 'react';
import { contact } from '@/data/contact';

export function ConsoleGreeting() {
  useEffect(() => {
    console.log('------------------------');
    console.log(
      '%c👋 Greetings fellow developer!',
      'font-size: 14px; font-weight: bold; color: #b05a30;'
    );
    console.log(
      'This site is itself a code example, jump over to the repo to take a peek under the hood.'
    );
    console.log(contact.gitHub);
    console.log('------------------------');
  }, []);

  return null;
}
