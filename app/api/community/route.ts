import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get("limit") || "10");

    const posts = await db.communityPost.findMany({
      take,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, image: true } },
        _count: { select: { comments: true, likes: true, votes: true } }
      }
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, imageUrl } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "내용을 입력해주세요." }, { status: 400 });
    }

    const post = await db.communityPost.create({
      data: {
        userId: session.user.id,
        content,
        imageUrl
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
