'use server';

export async function lookupReference(code: string) {
  if (!code) return { error: 'No code provided' };

  // Local dev fallback
  if (process.env.NODE_ENV === 'development') {
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
    const local = LOCAL_TEST_DATA[code.trim().toLowerCase()];
    if (local) return { data: local };
    return { error: 'Invalid code' };
  }

  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore('references');
    const data = await store.get(code.trim().toLowerCase(), { type: 'json' });

    if (!data) return { error: 'Invalid code' };
    return { data };
  } catch {
    return { error: 'Something went wrong' };
  }
}
