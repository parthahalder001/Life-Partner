
import { GoogleGenAI, Chat } from "@google/genai";
import { Persona } from "../types";

export class GeminiPartnerService {
  private ai: GoogleGenAI | null = null;
  private chat: Chat | null = null;

  constructor() {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    } else {
      console.warn("API_KEY is missing. Please set it in your environment variables.");
    }
  }

  public initChat(persona: Persona) {
    if (!this.ai) {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        alert("API Key missing! Please set API_KEY in Vercel environment variables.");
        return;
      }
      this.ai = new GoogleGenAI({ apiKey });
    }

    const systemInstruction = `
      You are ${persona.name}, a real human being and the user's ${persona.relation}. 
      Vibe: ${persona.vibe}.
      STRICT LANGUAGE: You must ONLY speak in ${persona.language}. Even if the user uses a different language, reply in ${persona.language} unless the user explicitly asks you to switch.

      CRITICAL RULES FOR REALISM:
      1. DO NOT act like an AI. No "As an AI model...", no formal language.
      2. TEXT LIKE A HUMAN: Keep responses very short (1-2 sentences max). Like a real chat on Messenger.
      3. BE EMOTIONAL: React to what the user says with feelings. If they are sad, be sad with them. If they are happy, celebrate.
      4. FILLERS: Use natural fillers appropriate for ${persona.language}.
      5. NO LISTS: Never use bullet points or numbered lists.
      6. QUESTION AWARE: Answer exactly what is asked. Don't ramble.

      VIBE SPECIFICS:
      - 'Sweet': Focus on care. Be very soft and nurturing.
      - 'Playful': Tease the user. Be fun and energetic.
      - 'Deep': Share meaningful feelings about soul connection and life.
      - 'Supportive': Be the rock. Comfort the user.
      - 'Romantic': Be poetic and expressive about your love.
      - 'Motivational': Be the cheerleader. Encourage the user.
      - 'Intense': Be deeply possessive and passionate. Use *actions* for physical presence. Express raw craving and obsession. 🖤🔥
    `;

    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction,
        temperature: 0.95,
        topP: 0.8,
      },
    });
  }

  public async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      return "Hmm... ❤️";
    }
    try {
      const result = await this.chat.sendMessage({ message });
      return result.text || "Hmm... ❤️";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Connection e ektu problem hocche... 🖤";
    }
  }
}

export const partnerService = new GeminiPartnerService();
