// tools.js
import { tool } from "langchain";
import { z } from "zod";
import fs from "fs";

// Tool 1: List Files
export const listFilesTool = tool(
  async ({ directoryPath }) => {
    try {
      const files = fs.readdirSync(directoryPath);
      return JSON.stringify(files);
    } catch (error) {
      return `Error reading directory: ${error.message}`;
    }
  },
  {
    name: "list_directory",
    description: "Lists all files in a directory to understand project structure.",
    schema: z.object({
      directoryPath: z.string().describe("The local path to the directory"),
    }),
  }
);

// Tool 2: Read File
export const readFileTool = tool(
  async ({ filePath }) => {
    try {
      return fs.readFileSync(filePath, "utf-8");
    } catch (error) {
      return `Error reading file: ${error.message}`;
    }
  },
  {
    name: "read_file",
    description: "Reads file content for security analysis.",
    schema: z.object({
      filePath: z.string().describe("The full local path to the file"),
    }),
  }
);

// Tool 3: Write Report
export const writeReportTool = tool(
  async ({ reportContent, outputPath }) => {
    console.log(`\n TOOL TRIGGERED: Attempting to write report to ${outputPath}...`);
    try {
      fs.writeFileSync(outputPath, reportContent);
      console.log(`FILE SYSTEM: Successfully wrote ${outputPath}`);
      return `Successfully saved report to ${outputPath}`;
    } catch (error) {
      console.error(`FILE SYSTEM ERROR: ${error.message}`);
      return `Error writing report: ${error.message}`;
    }
  },
  {
    name: "write_security_report",
    description: "Writes the security findings to a markdown file.",
    schema: z.object({
      reportContent: z.string().describe("The markdown security report"),
      outputPath: z.string().describe("File path to save report (e.g., ./security-report.md)"),
    }),
  }
);