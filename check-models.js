import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function listModels() {
  try {
    // We check the v1beta list specifically since we need tool-calling
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GOOGLE_API_KEY}`);
    const data = await response.json();
    
    console.log("--- 🔍 Available Models for your API Key ---");
    data.models.forEach(m => {
      if (m.supportedGenerationMethods.includes("generateContent")) {
        console.log(`- ${m.name.replace('models/', '')} (Supports Tools: ${m.supportedGenerationMethods.includes("generateContent")})`);
      }
    });
  } catch (e) {
    console.error("Discovery failed:", e);
  }
}

listModels();