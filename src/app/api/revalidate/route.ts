import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Accept secret from query parameter (?secret=...) or header (x-revalidate-secret)
  const secret =
    request.nextUrl.searchParams.get('secret') ||
    request.headers.get('x-revalidate-secret');

  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Revalidate the entire site layout (all pages)
    revalidatePath('/', 'layout');

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}
