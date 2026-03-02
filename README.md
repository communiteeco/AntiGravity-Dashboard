# AntiGravity — AI Agent Management Dashboard
### Boilerplate v1.0 | System Prompt & Technical Reference

---

## 🧠 What Is This System?

**AntiGravity** is a visual command center for orchestrating a team of autonomous AI agents. It is not a traditional web app — it is an **operating environment for AI-powered workflows**.

The dashboard is a **boilerplate**: a reusable foundation designed to be cloned and configured for any project that requires a structured team of AI workers. It serves as the "headquarters" from which a human Director assigns objectives, monitors agent activity, and reviews outcomes — without writing individual lines of code for each task.

The aesthetic is inspired by retro management simulation games (Habbo Hotel, RPG-style interfaces), deliberately chosen to make the mental model of "managing a team" feel intuitive and concrete. Each agent is a character with a name, a role, and a status — not an abstract API call.

---

## 🎯 System Objectives

1. **Centralize AI Operations** — Manage all AI workers from a single interface, eliminating the need to manually switch between tools, terminals, or vendor dashboards.

2. **Modular Agent Roster** — Maintain a typed, configurable list of AI agents, each with a distinct role and responsibility within the project.

3. **Human-to-Machine Instruction Pipeline** — Provide a structured channel for the human Director to send natural language instructions to specific agents, routed via n8n.

4. **Task Visibility** — Display active plans and their current state (Pending → In Progress → QA → Completed), giving the Director full situational awareness at a glance.

5. **Boilerplate Portability** — Act as the repeatable scaffold for any future AI-powered project, reducing setup time from weeks to hours.

---

## 👤 User Role: The Director General

The user of this dashboard is the **Director General** — the highest-level human in the system. The Director does **not** write code or run terminal commands directly. Instead, they:

- **Review the Agent Roster** and assess team status.
- **Draft and assign objectives** by selecting an agent and sending a natural language instruction.
- **Monitor task progress** from the Tasks view.
- **Interpret outputs** delivered back by agents through NocoDB logs or n8n callbacks.

The Director is akin to a project manager in a software company, but their entire team is composed of AI models orchestrated through webhooks and automation workflows. The Director's primary interface with the system is **this dashboard**.

---

## 🤖 The Agent Roster (AI Workforce)

Each AI agent has a predefined role within the organization, defined in `src/types/agent.ts`:

| Agent Name        | Role                 | Responsibility                                                            |
|-------------------|----------------------|---------------------------------------------------------------------------|
| Director General  | Director General     | High-level decision-making; not assigned tasks, issues them.              |
| Investigador      | Investigador         | Research, data gathering, and knowledge retrieval.                        |
| Arquitecto        | Arquitecto de Datos  | Database schema design, data modeling, and NocoDB structure.              |
| Ingeniero         | Ingeniero Backend    | API design, server logic, n8n workflows (via n8n-skills), and deployment. |
| Comunicador       | Comunicador          | Publishes posts, manages social channels, and visual brand execution.     |
| Copywriter        | Copywriter           | Writes all human-readable text: UI copy, web pages, emails, and briefs.   |
| Agente QA         | Agente QA            | Testing, validation, and quality assurance of all agent outputs.          |

Agent statuses are:
- 🟡 **Working** — Agent is currently executing a task.
- 🟢 **Idle** — Agent is available and awaiting instruction.
- 🔴 **Error** — Agent encountered a failure.
- ⬛ **Offline** — Agent is not connected.

---

## 🖥️ How the GUI Facilitates AI Programming

The graphical interface is not decorative — it is **functional infrastructure** for programming AI behavior.

### 1. Visual State Management
Instead of reading a JSON file or a terminal log to know what agents are doing, the Director sees live status indicators on every agent card. This provides **human-readable context at zero cognitive cost**.

### 2. Structured Instruction Dispatch
When the Director clicks "Send Instruction" on an agent card, a panel slides up from the bottom of the screen. The Director types in natural language. The instruction is then:
1. Captured by the frontend (Next.js).
2. Sent to an **n8n webhook** with the agent's role as metadata.
3. Picked up by the corresponding n8n workflow, which routes it to the correct AI model (GPT-4, Claude, Gemini, etc.).
4. Results are written back to **NocoDB**, and optionally surfaced in the Tasks view.

This pipeline means the Director is effectively **programming** — but through intent and natural language, not syntax.

### 3. Task Pipeline as a Kanban Proxy
The Tasks view represents the organizational backlog. Each task card shows:
- The objective title and description.
- Current status (color-coded).
- The assigned agent ID.

This prevents task duplication, lost context, and the "who is doing what?" confusion that plagues large AI workflow setups.

### 4. Aesthetic as Mental Model
The retro, pixel-art UI is a deliberate metaphor. AI agents are workers in a "digital office." The Director can mentally separate concerns (Research → Architecture → Engineering → QA) because each concern has a visual representation. This makes the complex feel manageable.

---

## 🏗️ Core Architecture

```
┌─────────────────────────────────────────────────────┐
│               AntiGravity Dashboard                 │
│  (Next.js — hosted on EasyPanel or Vercel)          │
│                                                     │
│  [ Agent Roster ]  [ Task Board ]  [ Director HQ ] │
└────────────────────────┬────────────────────────────┘
                         │ Instruction (via Webhook)
                         ▼
┌────────────────────────────────────────────────────┐
│                    n8n (Workflows)                  │
│  Routes instruction to the correct AI model        │
│  based on agent role metadata.                     │
└──────────────┬─────────────────────────────────────┘
               │
   ┌───────────┴──────────┐
   │                      │
   ▼                      ▼
[AI Model]          [NocoDB Database]
(GPT/Claude/etc.)   (Stores tasks, logs, agent context)
   │                      │
   └──────────────────────┘
           │ Results / Logs
           ▼
┌─────────────────────────────────────────────────────┐
│               AntiGravity Dashboard                 │
│  Director reviews outputs in Tasks / Agent view.   │
└─────────────────────────────────────────────────────┘
```

**Stack:**
- **Frontend:** Next.js 14 (App Router), Tailwind CSS
- **Automation / AI Routing:** n8n (self-hosted on EasyPanel)
- **Database / Storage:** NocoDB (self-hosted on EasyPanel)
- **Language:** TypeScript

---

## ⚙️ Getting Started (Configuration Guide)

### 1. Configure Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your values:
```bash
cp .env.local.example .env.local
```
Key variables:
```env
NEXT_PUBLIC_N8N_INSTRUCT_URL=https://your-n8n-instance.com/webhook/instruct
N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com/webhook/ping
NOCODB_URL=https://your-nocodb-instance.com
NOCODB_API_TOKEN=your_token_here
NOCODB_PROJECT_ID=p1
```

### 2. NocoDB Setup
Follow the schema guide at `.mcp/nocodb-schema-guide.md` to create the required tables (`Agents`, `Tasks`, `Communication Logs`) in your NocoDB instance.

### 3. n8n Workflow Configuration
Configure your n8n workflows as described in `.mcp/n8n-webhook-spec.md`. The key workflow accepts a `POST` with `{ instruction, agentRole }` and routes to the correct AI.

### 4. Run Locally
```bash
npm install
npm run dev
```
The dashboard will be available at `http://localhost:3000`.

### 5. Deploy
Deploy to EasyPanel, Vercel, or any Node.js-compatible host. Set the same environment variables in your hosting provider's dashboard.

---

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Director HQ (Home screen — company overview)
│   │   ├── agents/
│   │   │   └── page.tsx      # Agent Roster (view & instruct agents)
│   │   ├── tasks/
│   │   │   └── page.tsx      # Task Board (active plans & statuses)
│   │   ├── layout.tsx        # Shell layout (sidebar navigation)
│   │   └── globals.css       # Global styles (retro pixel theme)
│   ├── lib/
│   │   ├── n8n.ts            # sendAgentInstruction() — n8n webhook client
│   │   └── nocodb.ts         # NocoDB API client (read/write tasks & logs)
│   └── types/
│       └── agent.ts          # TypeScript interfaces: Agent, Task, CommunicationLog
├── .mcp/
│   ├── AGENTS.md             # The Agent Bible — per-agent specs, tools, constraints, resource levels
│   ├── n8n-webhook-spec.md   # Webhook contract for n8n workflows
│   └── nocodb-schema-guide.md # NocoDB table schemas
├── .env.local.example        # Environment variable template
└── README.md                 # This file — System Prompt & Reference
```

---

## 🔄 How to Extend This Boilerplate

To adapt this for a new project:

1. **Update `src/types/agent.ts`** — Modify `AgentRole` to match your new team structure.
2. **Update mock data in `agents/page.tsx`** — Swap out the hardcoded roster for API calls to NocoDB.
3. **Configure new n8n workflows** — Map each new role to its corresponding AI model and prompt chain.
4. **Update NocoDB tables** — Follow the schema guide to reflect any new data structures.
5. **Restyle `globals.css`** *(optional)* — Replace the retro pixel theme with your project's visual identity.

---

> **AntiGravity** was built on the premise that the future of software development is human oversight of autonomous AI teams — not manual line-by-line coding. This dashboard is the control surface for that future.
