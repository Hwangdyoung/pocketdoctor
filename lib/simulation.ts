import OpenAI from "openai";
import { SYSTEM_PROMPT } from "./openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy", 
});

export async function getFutureSimulation(symptom: string, isPet: boolean = false) {
  if (!process.env.OPENAI_API_KEY) {
    // Mock response if no API key
    return {
      ifIgnored: {
        timeline: "1~2일 내로 통증 심화 가능성",
        worseningProbability: "높음",
        recoveryTime: "자연 회복 불투명 (병원 방문 요망)"
      },
      ifManaged: {
        timeline: "안정 직후 서서히 완화",
        worseningProbability: "낮음",
        recoveryTime: "1~3일"
      }
    };
  }

  const prompt = isPet ? 
    `반려동물의 다음 증상에 대한 미래 시뮬레이션을 생성해주세요: "${symptom}"` :
    `사람의 다음 증상에 대한 미래 시뮬레이션을 생성해주세요: "${symptom}"`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { 
          role: "user", 
          content: `${prompt}\n\nPlease respond strictly in JSON format with the following structure: 
{
  "ifIgnored": {
    "timeline": string (예상 경과),
    "worseningProbability": string ("낮음", "중간", "높음"),
    "recoveryTime": string (회복 예상 시간)
  },
  "ifManaged": {
    "timeline": string (예상 경과),
    "worseningProbability": string ("낮음", "중간", "높음"),
    "recoveryTime": string (회복 예상 시간)
  }
}` 
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("OpenAI Simulation Error:", error);
    throw new Error("시뮬레이션 생성 중 오류가 발생했습니다.");
  }
}
