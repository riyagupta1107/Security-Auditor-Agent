// index.js
import { agent } from "./agent.js";
import path from "path";

// Function to force a delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runAuditor() {
    console.log("--- 🛡️ Starting Security Auditor Agent ---");
    const targetDirectory = path.resolve("./test-codebase");
  
    try {
      const stream = await agent.stream({
        messages: [{ role: "user", content: `Audit the code in ${targetDirectory} and SAVE the report to security-report.md.` }]
      }, { recursionLimit: 50 });
  
      for await (const chunk of stream) {
        // This will print the agent's internal "Thought" or "Tool Call"
        const entry = Object.entries(chunk)[0];
        const [nodeName, value] = entry;
  
        if (nodeName === "agent") {
          const msg = value.messages[0];
          if (msg.tool_calls?.length > 0) {
            console.log(`🛠️ AGENT ACTION: Calling tool [${msg.tool_calls[0].name}]...`);
          } else {
            console.log(`🤔 AGENT THOUGHT: ${msg.content.substring(0, 100)}...`);
          }
        } else if (nodeName === "tools") {
          console.log(`✅ TOOL RESPONSE: ${value.messages[0].content}`);
        }
      }
  
      console.log("\n--- 🏁 Process Finished ---");
  
    } catch (error) {
      console.error("Critical Failure:", error.message);
    }
}

runAuditor();