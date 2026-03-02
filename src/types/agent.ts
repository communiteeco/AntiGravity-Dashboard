// ─────────────────────────────────────────────────────────────────────────────
// AGENT ROLES & STATUS
// ─────────────────────────────────────────────────────────────────────────────

export type AgentRole =
    | 'Director General'
    | 'Investigador'
    | 'Arquitecto de Datos'
    | 'Ingeniero Backend'
    | 'Comunicador'
    | 'Copywriter'
    | 'Agente QA';

export type AgentStatus = 'Idle' | 'Working' | 'Error' | 'Offline';

/**
 * Resource level defines the authority scope of an agent.
 * - executive:    Broad read access, delegation authority. No direct build/write.
 * - technical:    Write access to code or schemas within isolated scope.
 * - operational:  Narrow task execution. No deployment or schema modification.
 */
export type ResourceLevel = 'executive' | 'technical' | 'operational';

/**
 * Model power levels for sub-agent execution.
 * - standard: Fast, efficient models (e.g., GPT-4o-mini).
 * - pro:      Balanced models (e.g., GPT-4o, Claude Sonnet).
 * - ultra:    High-reasoning/large models (e.g., o1, Claude Opus).
 */
export type ModelPower = 'standard' | 'pro' | 'ultra';


// ─────────────────────────────────────────────────────────────────────────────
// AGENT SPECIFICATION
// Describes the contract and capabilities of a given agent role.
// Full narrative descriptions live in .mcp/AGENTS.md.
// ─────────────────────────────────────────────────────────────────────────────

export interface AgentSpec {
    /** Short description of the agent's core function. */
    purpose: string;

    /**
     * Inputs the Director General MUST provide before this agent can begin.
     * If any are missing, the agent must halt and request them.
     */
    requiredInputs: string[];

    /** External tools, APIs, or platform integrations this agent may use. */
    tools: string[];

    /**
     * Subagent types this agent is allowed to spawn or delegate tasks to.
     * Subagents operate within the same role constraints as their parent.
     */
    subagents: string[];

    /**
     * Hard rules — things this agent must NEVER do regardless of instruction.
     * These are non-negotiable system constraints.
     */
    constraints: string[];

    /** Expected shape and delivery destination of this agent's output. */
    outputFormat: string;

    /** Authority scope relative to the rest of the team. See ResourceLevel. */
    resourceLevel: ResourceLevel;
}

// ─────────────────────────────────────────────────────────────────────────────
// AGENT INSTANCE
// A live agent in the roster, combining identity, status, and its spec.
// ─────────────────────────────────────────────────────────────────────────────

export interface Agent {
    id: string;
    name: string;
    role: AgentRole;
    status: AgentStatus;
    currentTaskId: string | null;
    lastActive: string; // ISO 8601 date string
    avatarUrl?: string; // Optional sprite for the Habbo-style UI
    spec?: AgentSpec;   // Full role specification — load from AGENTS.md or config

    // NocoDB Specific Fields (these come from the API payload)
    Id?: number;
    Title?: string;
    Role?: AgentRole;
    Status?: AgentStatus;
    CurrentTask?: object;
    LastActive?: string;
    Avatar?: Array<{ url: string }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// TASK
// A unit of work created by the Director General and tracked on the Task Board.
// ─────────────────────────────────────────────────────────────────────────────

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Awaiting QA' | 'Completed';
    assignedAgentId: string | null;
    createdAt: string; // ISO 8601 date string

    /**
     * Acceptance criteria — the list of conditions the Agente QA checks
     * before marking this task as Completed.
     */
    acceptanceCriteria?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// COMMUNICATION LOG
// Inter-agent or Director-to-agent messages tracked for audit and context.
// ─────────────────────────────────────────────────────────────────────────────

export interface CommunicationLog {
    id: string;
    senderId: string;
    receiverId: string | 'Global'; // 'Global' = broadcast to all agents
    message: string;
    timestamp: string; // ISO 8601 date string
    taskId?: string;   // Optionally scoped to a specific task
}
