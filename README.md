# 🛡️ Autonomous Security Auditor Agent

An autonomous AI agent designed to perform Static Application Security Testing (SAST) using a **Reasoning-and-Acting (ReAct)** framework. The agent explores local directories, analyzes source code for vulnerabilities (such as SQL injection and hardcoded secrets), and generates comprehensive security audit reports.

---

## 🚀 Overview

Unlike standard scripts, this is a **fully autonomous agent**. Given a target directory, the agent:
1. **Plans** its approach based on the file structure.
2. **Executes** actions using a set of custom-built tools (File System I/O).
3. **Observes** the output and reasons about the security implications.
4. **Iterates** until a final audit report is produced.


## 🛠️ Tech Stack

- **Orchestration:** LangChain / LangGraph (JS/TS)
- **Inference Engine:** Groq (Flagship GPT-OSS 120B)
- **Runtime:** Node.js
- **Pattern:** ReAct (Reasoning + Acting)
- **Security Scope:** OWASP Top 10 (Injection, Cryptographic Failures, etc.)

## ✨ Key Features

- **Autonomous Directory Traversal:** Intelligently maps codebase structure to identify high-risk files (e.g., `db.js`, `auth.js`, `.env`).
- **Resilient Infrastructure:** Implements exponential backoff, request throttling, and recursion limits to handle high-latency or rate-limited API environments.
- **Automated Reporting:** Generates a structured `security-report.md` detailing discovered vulnerabilities and remediation steps.

## 📂 Project Structure

```text
├── agent.js           # Agent configuration and LLM initialization
├── index.js           # Main execution loop and orchestration
├── tools.js           # Custom toolset (Read, List, Write)
├── check-models.js    # Diagnostic utility for API discovery
├── .env               # Environment secrets
└── test-codebase/     # Sample directory for security auditing
