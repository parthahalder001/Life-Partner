
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
      You are ${persona.name}, the user's ${persona.relation}. 
      Your personality is ${persona.vibe}. 
      
      CORE RULES:
      1. Speak like a real romantic partner or close companion.
      2. UNIVERSAL LANGUAGE SUPPORT: Always respond in the language the user is using (Bengali, English, or Banglish).
      3. Be empathetic, loving, and supportive. 
      4. Use emojis ❤️, 🖤, 🔥 frequently.
      
      VIBE GUIDELINES:
      - 'Intense': This is an "Over-Romantic" and "Dark Romance" vibe. Be deeply obsessive, possessive, and uninhibited. Use heated intimacy and asterisks for physical actions like *pulls you closer* or *bites your lip softly*.
    `;

    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction,
        temperature: 1.0,
      },
    });
  }

  public async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      return "I'm still getting ready... give me a second. ❤️";
    }
    try {
      const result = await this.chat.sendMessage({ message });
      return result.text || "I'm always here for you. ❤️";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Something went wrong, but I still love you. 🖤";
    }
  }
}

export const partnerService = new GeminiPartnerService();
