import { GoogleGenAI, Type } from "@google/genai";
import { Book, Category } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchBookRecommendations = async (
  category: Category,
  existingTitles: string[] = []
): Promise<Book[]> => {
  try {
    const modelId = "gemini-2.5-flash";

    const prompt = `
      당신은 경북 함창고등학교의 상징인 '천마(Pegasus)'의 지혜를 가진 AI 사서입니다.
      전 세계의 도서 데이터베이스와 주요 서점(교보문고, 알라딘, 예스24 등) 및 국립중앙도서관의 데이터를 통합 분석하여,
      고등학생의 생활기록부 '교과 세부능력 및 특기사항(세특)'에 기재하기 가장 좋은 책을 추천해야 합니다.

      선택된 교과목: ${category}
      
      [지시사항]
      1. 기존에 추천된 책 목록(${existingTitles.join(", ")})은 절대 중복 추천하지 마세요.
      2. 베스트셀러뿐만 아니라 숨겨진 명작, 최신 학술 트렌드가 반영된 교양 과학/인문 서적 등 다양한 데이터를 소싱하여 추천 목록을 구성하세요.
      3. 각 책에 대해 함창고등학교 학생들이 생기부에 활용할 수 있는 구체적이고 실질적인 '세특 기재 팁'을 작성하세요.
      4. 총 5권의 새로운 책을 추천하세요.
      5. 반드시 정확한 한국어 도서명과 저자명을 사용하세요.

      출력 형식은 반드시 JSON 배열이어야 합니다.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "책 제목 (정확한 출판명)",
              },
              author: {
                type: Type.STRING,
                description: "저자",
              },
              description: {
                type: Type.STRING,
                description: "책의 핵심 내용과 해당 교과목과의 연관성 설명 (150자 내외)",
              },
              saenggibuTip: {
                type: Type.STRING,
                description: "생활기록부 교과 세특 기재 시 활용할 수 있는 심화 탐구 주제나 활동 가이드",
              },
            },
            required: ["title", "author", "description", "saenggibuTip"],
          },
        },
      },
    });

    const jsonStr = response.text;
    if (!jsonStr) {
      throw new Error("AI로부터 데이터가 반환되지 않았습니다.");
    }

    const books: Book[] = JSON.parse(jsonStr);
    return books;

  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};