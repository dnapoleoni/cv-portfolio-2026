import { NextResponse } from 'next/server';

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code')?.trim().toLowerCase();

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  // Local dev fallback
  if (process.env.NODE_ENV === 'development' && LOCAL_TEST_DATA[code]) {
    return NextResponse.json(LOCAL_TEST_DATA[code]);
  }

  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore('references');
    const data = await store.get(code, { type: 'json' });

    if (!data) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
