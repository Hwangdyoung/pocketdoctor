import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post = await db.communityPost.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, image: true } },
        comments: {
          include: { user: { select: { name: true, image: true } } },
          orderBy: { createdAt: "asc" }
        },
        _count: { select: { comments: true, likes: true, votes: true } }
      }
    });

    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const post = await db.communityPost.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    if (post.userId !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await db.communityPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
