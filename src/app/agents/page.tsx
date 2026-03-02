import { Agent } from '@/types/agent';
import { getNocoData } from '@/lib/nocodb';
import { AgentInstructionPanel } from './AgentInstructionPanel';

export default async function AgentsPage() {
    // Attempt to fetch real agents from NocoDB API Route
    let agents: Agent[] = await getNocoData('Agents');

    // Fallback to Mock Data if NocoDB is not configured or empty
    if (!agents || agents.length === 0) {
        agents = [
            {
                id: '1', name: 'Director General', role: 'Director General', status: 'Working', currentTaskId: null, lastActive: new Date().toISOString(),
                spec: { purpose: 'Strategic Oversight', requiredInputs: [], tools: [], subagents: ['Reviewer'], constraints: [], outputFormat: 'Tasks', resourceLevel: 'executive' }
            },
            {
                id: '2', name: 'Investigador', role: 'Investigador', status: 'Idle', currentTaskId: null, lastActive: new Date().toISOString(),
                spec: { purpose: 'Knowledge Acquisition', requiredInputs: [], tools: [], subagents: ['Scraper', 'Translator'], constraints: [], outputFormat: 'Report', resourceLevel: 'operational' }
            },
            {
                id: '3', name: 'Arquitecto', role: 'Arquitecto de Datos', status: 'Offline', currentTaskId: null, lastActive: new Date().toISOString(),
                spec: { purpose: 'Structural Design', requiredInputs: [], tools: [], subagents: ['Validator', 'Migration'], constraints: [], outputFormat: 'Schema', resourceLevel: 'technical' }
            },
            {
                id: '4', name: 'Ingeniero', role: 'Ingeniero Backend', status: 'Idle', currentTaskId: null, lastActive: new Date().toISOString(),
                spec: { purpose: 'Build Implementation', requiredInputs: [], tools: [], subagents: ['Tester', 'Documentation', 'Linter'], constraints: [], outputFormat: 'Code', resourceLevel: 'technical' }
            },
            {
                id: '5', name: 'Comunicador', role: 'Comunicador', status: 'Idle', currentTaskId: null, lastActive: new Date().toISOString(),
                spec: { purpose: 'Brand Voice', requiredInputs: [], tools: [], subagents: ['Proofreader', 'ImageGen'], constraints: [], outputFormat: 'Posts', resourceLevel: 'operational' }
            },
            {
                id: '6', name: 'Copywriter', role: 'Copywriter', status: 'Idle', currentTaskId: null, lastActive: new Date().toISOString(),
                spec: { purpose: 'Text Architect', requiredInputs: [], tools: [], subagents: ['A/B Tester', 'Translator'], constraints: [], outputFormat: 'Copy', resourceLevel: 'operational' }
            },
            {
                id: '7', name: 'Agente QA', role: 'Agente QA', status: 'Idle', currentTaskId: null, lastActive: new Date().toISOString(),
                spec: { purpose: 'Quality Control', requiredInputs: [], tools: [], subagents: ['Regression', 'A11y'], constraints: [], outputFormat: 'Report', resourceLevel: 'operational' }
            },
        ];

    }

    return (
        <div className="flex flex-col h-full space-y-4 relative">
            <h2 className="text-xl font-bold bg-[#c0c0c0] p-2 inline-block border-[4px] border-[#909090]">AGENT ROSTER</h2>

            {/* 2D Grid/Isometric Array wrapper */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 overflow-auto bg-[#b0b0b0] p-6 border-[6px] border-[#808080] shadow-inner mb-24">
                {agents.map(agent => (
                    <div key={agent.id} className="pixel-box bg-white flex flex-col justify-between">
                        <div className="flex justify-between items-start border-b-[2px] border-dashed border-gray-400 pb-2 mb-2">
                            <div>
                                <h3 className="text-sm font-bold text-blue-900">{agent.name || agent.Title}</h3>
                                <span className="text-[9px] text-gray-500">{agent.role || agent.Role}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className={`block w-3 h-3 border-[2px] border-black ${agent.status === 'Working' || agent.Status === 'Working' ? 'bg-yellow-400 animate-pulse' :
                                    agent.status === 'Idle' || agent.Status === 'Idle' ? 'bg-green-500' :
                                        agent.status === 'Error' || agent.Status === 'Error' ? 'bg-red-500' : 'bg-gray-500'
                                    }`}></span>
                                <span className="text-[8px] uppercase">{agent.status || agent.Status || 'Offline'}</span>
                            </div>
                        </div>

                        <div className="flex gap-4 my-4 items-center h-24 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] border-[2px] border-black p-2 relative">
                            <div className="w-12 h-12 bg-pink-300 border-[2px] border-black flex items-center justify-center relative overflow-hidden">
                                {agent.Avatar ? (
                                    <img src={agent.Avatar[0]?.url} alt="avatar" className="object-cover w-full h-full" />
                                ) : (
                                    <span className="text-[8px]">Sprite</span>
                                )}
                            </div>
                            <div className="flex-1 text-[8px] text-green-400 font-mono leading-tight bg-black p-2 h-full overflow-hidden">
                                {(agent.status === 'Working' || agent.Status === 'Working') ? '> Searching knowledgebase...' : '> Awaiting instruction.'}
                            </div>
                        </div>

                        {/* Interactive Client Component for the instruction logic */}
                        <div className="pt-2 border-t-[2px] border-gray-300 flex justify-end">
                            <AgentInstructionPanel selectedAgent={agent} onClose={() => { }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

