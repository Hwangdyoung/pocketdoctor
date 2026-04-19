import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy", // fallback for build/lint
});

export const SYSTEM_PROMPT = `
You are a health assistant AI. Provide safe, general guidance in Korean. Do not provide a definitive diagnosis. Always include a disclaimer.
이 정보는 참고용이며 정확한 진단은 의료 전문가와 상담하세요.
`;

export async function getHealthAnalysis(symptom: string, isPet: boolean = false) {
  if (!process.env.OPENAI_API_KEY) {
    // Mock response if no API key is provided
    return {
      possibleDisease: "단순 통증 (API 키 없음)",
      riskLevel: "낮음",
      foodsToAvoid: "맵고 짠 음식",
      actionsToAvoid: "격렬한 운동",
      recommendedActions: "충분한 휴식과 수분 섭취",
      visitHospital: false,
    };
  }

  const prompt = isPet ? 
    `반려동물의 다음 증상을 분석해주세요: "${symptom}"` :
    `사람의 다음 증상을 분석해주세요: "${symptom}"`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { 
          role: "user", 
          content: `${prompt}\n\nPlease respond strictly in JSON format with the following keys:\n- possibleDisease: string\n- riskLevel: string ("낮음", "중간", "높음")\n- foodsToAvoid: string\n- actionsToAvoid: string\n- recommendedActions: string\n- visitHospital: boolean` 
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw new Error("AI 분석 중 오류가 발생했습니다.");
  }
}
