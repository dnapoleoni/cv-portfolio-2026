'use server';

import { getStore } from '@netlify/blobs';

const LOCAL_TEST_DATA: Record<string, any> = {
  testcode: {
    name: 'Test Person',
    role: 'Developer',
    company: 'Test Co',
    email: 'test@test.com',
    phone: '',
    message: 'Hey! This is a test reference request.',
  },
};

export async function lookupReference(code: string) {
  if (!code) return { error: 'No code provided' };

  const trimmed = code.trim().toLowerCase();

  // Local dev fallback
  if (process.env.NODE_ENV === 'development') {
    const local = LOCAL_TEST_DATA[trimmed];
    if (local) return { data: local };
    return { error: 'Invalid code' };
  }

  try {
    const store = getStore('references');
    const data = await store.get(trimmed, { type: 'json' });

    if (!data) return { error: 'Invalid code' };
    return { data };
  } catch (err) {
    console.error('Blobs lookup error:', err);
    return { error: 'Something went wrong' };
  }
}
