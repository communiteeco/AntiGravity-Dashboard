import { NextResponse } from 'next/server';

export async function GET() {
    const WEBHOOK_BASE_URL = process.env.N8N_WEBHOOK_BASE_URL;

    if (!WEBHOOK_BASE_URL) {
        return NextResponse.json({ online: false, reason: 'URL not configured' });
    }

    try {
        // Attempting a simple GET request to check if the instance is responding.
        // Replace with a specific health check endpoint if your n8n workflow provides one.
        const response = await fetch(WEBHOOK_BASE_URL, {
            method: 'HEAD',
            // Very short timeout for health check
            signal: AbortSignal.timeout(3000)
        });

        // We consider it online if it responds at all (even 404 means the server is there)
        return NextResponse.json({ online: true, status: response.status });
    } catch (error) {
        return NextResponse.json({ online: false, reason: 'unreachable' });
    }
}
