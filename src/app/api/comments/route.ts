import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET: Retrieve all comments from the database
export async function GET() {
  try {
    const dbConnect = (await import('@/lib/dbConnect')).default;
    const Comment = (await import('@/lib/models/Comment')).default;

    await dbConnect();
    // Retrieve comments, sorted by newest first
    const comments = await Comment.find({}).sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (error: any) {
    console.error('API GET comments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments', details: error.message },
      { status: 500 }
    );
  }
}

// POST: Save a new comment to the database
export async function POST(request: Request) {
  try {
    const dbConnect = (await import('@/lib/dbConnect')).default;
    const Comment = (await import('@/lib/models/Comment')).default;

    await dbConnect();
    const body = await request.json();
    const { username, comment } = body;

    if (!username || !comment) {
      return NextResponse.json(
        { error: 'Username and comment are required' },
        { status: 400 }
      );
    }

    const newComment = new Comment({
      username,
      comment,
    });

    const savedComment = await newComment.save();
    return NextResponse.json(savedComment, { status: 201 });
  } catch (error: any) {
    console.error('API POST comments error:', error);
    return NextResponse.json(
      { error: 'Failed to create comment', details: error.message },
      { status: 500 }
    );
  }
}
