import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { option } = await req.json();
    if (!option) return NextResponse.json({ error: "Option required" }, { status: 400 });

    const { id } = await params;
    const existingVote = await db.vote.findUnique({
      where: {
        postId_userId: {
          postId: id,
          userId: session.user.id
        }
      }
    });

    if (existingVote) {
      return NextResponse.json({ error: "Already voted" }, { status: 400 });
    }

    const vote = await db.vote.create({
      data: {
        postId: id,
        userId: session.user.id,
        option
      }
    });

    return NextResponse.json(vote);
  } catch (error) {
    return NextResponse.json({ error: "Failed to vote" }, { status: 500 });
  }
}
