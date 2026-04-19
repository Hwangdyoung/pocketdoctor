import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { content } = await req.json();
    if (!content) return NextResponse.json({ error: "Content required" }, { status: 400 });

    const { id } = await params;
    const comment = await db.comment.create({
      data: {
        postId: id,
        userId: session.user.id,
        content
      },
      include: {
        user: { select: { name: true, image: true } }
      }
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
