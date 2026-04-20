// agent.js
import { ChatGroq } from "@langchain/groq"; 
import { createAgent } from "langchain";
import { listFilesTool, readFileTool, writeReportTool } from "./tools.js";
import dotenv from "dotenv";

dotenv.config();

const model = new ChatGroq({
  model: "openai/gpt-oss-120b", 
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0,
});

const tools = [listFilesTool, readFileTool, writeReportTool];

const systemPrompt = `You are a Senior Security Researcher.
You have access to EXACTLY THREE tools: 'list_directory', 'read_file', and 'write_security_report'.

STRICT RULES:
1. If 'test-codebase' is not found, DO NOT invent new tools.
2. Use 'list_directory' on the current path '.' first to verify the folder exists.
3. Once you find 'db.js', read it and then IMMEDIATELY write the report.
4. DO NOT attempt to use 'search_file' or any other tool not listed above.`;

export const agent = createAgent({
  model,
  tools,
  systemPrompt,
});