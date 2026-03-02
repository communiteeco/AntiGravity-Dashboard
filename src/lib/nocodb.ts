// NocoDB Data Fetching Utility
// Use this to read the status of your AI workforce. This now calls our internal
// Next.js API route to avoid exposing the NocoDB token to the client browser.

export async function getNocoData(tableName: string) {
    try {
        // Call the internal Next.js API route
        const response = await fetch(`/api/nocodb/${tableName}`);

        if (!response.ok) {
            console.error(`Error fetching from internal API for table ${tableName}:`, response.statusText);
            return [];
        }

        const data = await response.json();
        return data.list || [];
    } catch (err) {
        console.error(`Error fetching from table ${tableName}:`, err);
        return [];
    }
}

