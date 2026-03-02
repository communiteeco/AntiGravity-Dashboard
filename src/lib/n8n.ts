// n8n Webhook Endpoint Trigger
// This sends instructions from the Dashboard to your n8n workflows.

export async function sendAgentInstruction(
    instruction: string,
    agentRole: string,
    modelPower: string = 'standard',
    subAgent: string = 'none'
) {
    const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_INSTRUCT_URL || '';

    if (!WEBHOOK_URL) {
        console.error('n8n Webhook URL is not configured in .env.local');
        return { success: false, message: 'Webhook URL missing' };
    }

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                agentRole,
                instruction,
                modelPower,
                subAgent,
                sender: 'Director General',
                timestamp: new Date().toISOString()
            }),
        });


        if (!response.ok) {
            throw new Error(`n8n webhook failed with status ${response.status}`);
        }

        return { success: true, data: await response.json() };
    } catch (error: any) {
        console.error('Error sending instruction to n8n:', error);
        return { success: false, message: error.message };
    }
}
