'use client';

import { useState } from 'react';
import { Agent } from '@/types/agent';
import { sendAgentInstruction } from '../../lib/n8n';

interface Props {
    selectedAgent: Agent;
    onClose: () => void;
}

export function AgentInstructionPanel({ selectedAgent, onClose }: Props) {
    const [instruction, setInstruction] = useState('');
    const [modelPower, setModelPower] = useState('standard');
    const [subAgent, setSubAgent] = useState('none');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSend = async () => {
        if (!selectedAgent || !instruction.trim()) return;

        setStatusMessage(`Sending to ${selectedAgent.name}...`);
        const result = await sendAgentInstruction(
            instruction,
            selectedAgent.role,
            modelPower,
            subAgent
        );

        if (result.success) {
            setStatusMessage('Instruction sent! Check n8n logs.');
            setInstruction('');

            // Auto close after 2 seconds on success
            setTimeout(() => onClose(), 2000);
        } else {
            setStatusMessage(`Error: ${result.message}`);
            setTimeout(() => setStatusMessage(''), 5000);
        }
    };

    return (
        <>
            {/* Floating Instruction Panel (Habbo Style Menu) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#c0c0c0] border-t-[6px] border-[#707070] z-50 flex flex-col items-center justify-center animation-slideup">
                <div className="w-full max-w-4xl flex flex-col gap-2">
                    {/* Header Row */}
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex gap-2 items-center">
                            <div className="shrink-0 bg-white border-[2px] border-black p-2 text-[10px] font-bold uppercase">
                                TO: {selectedAgent.name}
                            </div>
                        </div>
                        <a
                            href="/docs/manual-subagentes.md"
                            target="_blank"
                            className="text-[9px] underline text-blue-800 hover:text-blue-600 font-bold"
                        >
                            [ MANUAL DE SUB-AGENTES ]
                        </a>
                    </div>

                    {/* Controls Row */}
                    <div className="flex gap-2 items-center">
                        {/* Model Power Selector */}
                        <div className="flex items-center gap-1 bg-gray-300 border-[2px] border-black px-2 py-1">
                            <label className="text-[9px] font-bold">POWER:</label>
                            <select
                                value={modelPower}
                                onChange={(e) => setModelPower(e.target.value)}
                                className="bg-white border-none text-[10px] font-mono outline-none"
                            >
                                <option value="standard">STANDARD (4o-mini)</option>
                                <option value="pro">PRO (4o/Sonnet)</option>
                                <option value="ultra">ULTRA (o1/Opus)</option>
                            </select>
                        </div>

                        {/* Sub-Agent Selector (if available in spec) */}
                        <div className="flex items-center gap-1 bg-gray-300 border-[2px] border-black px-2 py-1">
                            <label className="text-[9px] font-bold">DELEGATE:</label>
                            <select
                                value={subAgent}
                                onChange={(e) => setSubAgent(e.target.value)}
                                className="bg-white border-none text-[10px] font-mono outline-none"
                            >
                                <option value="none">DIRECT EXECUTION</option>
                                {selectedAgent.spec?.subagents?.map(sa => (
                                    <option key={sa} value={sa.toLowerCase()}>{sa.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Instruction Input Row */}
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            value={instruction}
                            onChange={(e) => setInstruction(e.target.value)}
                            placeholder="Enter your instruction here..."
                            className="flex-1 p-2 border-[4px] border-black bg-white text-sm font-mono focus:outline-none placeholder:text-gray-400"
                        />
                        <div className="flex gap-2">
                            <button onClick={handleSend} className="pixel-btn bg-green-600 border-green-900">Execute</button>
                            <button onClick={onClose} className="pixel-btn bg-gray-600 border-gray-900">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notifier */}
            {statusMessage && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[60] pixel-box bg-yellow-100 text-[10px] animate-bounce">
                    {statusMessage}
                </div>
            )}
        </>
    );
}

