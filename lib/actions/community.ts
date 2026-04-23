"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("로그인이 필요합니다.");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const imageUrl = formData.get("imageUrl") as string || null;

  if (!content) {
    throw new Error("내용을 입력해주세요.");
  }

  const post = await db.communityPost.create({
    data: {
      userId: session.user.id,
      title,
      content,
      category: category || "전체",
      imageUrl,
    },
  });

  revalidatePath("/community");
  return post;
}

export async function toggleLike(postId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("로그인이 필요합니다.");
  }

  const userId = session.user.id;

  const existingLike = await db.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });

  if (existingLike) {
    await db.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await db.like.create({
      data: {
        postId,
        userId,
      },
    });
  }

  revalidatePath("/community");
  revalidatePath(`/community/post/${postId}`);

  const likeCount = await db.like.count({
    where: { postId },
  });

  return { likeCount, liked: !existingLike };
}

export async function createComment(postId: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("로그인이 필요합니다.");
  }

  if (!content.trim()) {
    throw new Error("댓글 내용을 입력해주세요.");
  }

  const comment = await db.comment.create({
    data: {
      postId,
      userId: session.user.id,
      content,
    },
    include: {
      user: true,
    },
  });

  revalidatePath(`/community/post/${postId}`);
  return comment;
}
