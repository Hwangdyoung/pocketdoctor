import { NextResponse } from "next/server";
import { getHealthAnalysis } from "@/lib/openai";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { symptom, isPet } = await req.json();

    if (!symptom) {
      return NextResponse.json({ error: "증상을 입력해주세요." }, { status: 400 });
    }

    const result = await getHealthAnalysis(symptom, isPet);

    // If user is logged in, save to history
    if (session?.user?.id) {
      try {
        await db.symptomHistory.create({
          data: {
            userId: session.user.id,
            symptom,
            result: result as any,
          }
        });
      } catch (dbError) {
        console.error("Failed to save symptom history:", dbError);
        // Continue and return AI result anyway
      }
    }

    return NextResponse.json(result);
    
  } catch (error: any) {
    console.error("Symptom Route Error:", error);
    return NextResponse.json({ error: error.message || "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
