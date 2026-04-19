import { NextResponse } from "next/server";
import { getFutureSimulation } from "@/lib/simulation";

export async function POST(req: Request) {
  try {
    const { symptom, isPet } = await req.json();

    if (!symptom) {
      return NextResponse.json({ error: "증상을 입력해주세요." }, { status: 400 });
    }

    const result = await getFutureSimulation(symptom, isPet);

    return NextResponse.json(result);
    
  } catch (error: any) {
    console.error("Simulation Route Error:", error);
    return NextResponse.json({ error: error.message || "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
