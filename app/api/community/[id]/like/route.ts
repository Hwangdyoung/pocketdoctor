import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existingLike = await db.like.findUnique({
      where: {
        postId_userId: {
          postId: id,
          userId: session.user.id
        }
      }
    });

    if (existingLike) {
      await db.like.delete({ where: { id: existingLike.id } });
      return NextResponse.json({ liked: false });
    } else {
      await db.like.create({
        data: {
          postId: id,
          userId: session.user.id
        }
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}
