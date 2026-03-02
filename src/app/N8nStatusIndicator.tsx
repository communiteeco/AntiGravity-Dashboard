'use client';

import { useState, useEffect } from 'react';

export function N8nStatusIndicator() {
    const [isOnline, setIsOnline] = useState<boolean | null>(null);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await fetch('/api/n8n-status');
                const data = await res.json();
                setIsOnline(data.online);
            } catch (err) {
                setIsOnline(false);
            }
        };

        // Check immediately, then every 30 seconds
        checkStatus();
        const interval = setInterval(checkStatus, 30000);

        return () => clearInterval(interval);
    }, []);

    if (isOnline === null) {
        return (
            <div className="text-[10px] bg-black text-gray-400 p-2 border-[2px] border-gray-600 uppercase flex items-center gap-2">
                <span className="block w-2 h-2 bg-gray-500 rounded-full"></span>
                n8n Checking...
            </div>
        );
    }

    return (
        <div className={`text-[10px] bg-black p-2 border-[2px] border-gray-600 uppercase flex items-center gap-2 ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
            <span className={`${isOnline ? 'animate-pulse bg-green-500' : 'bg-red-500'} block w-2 h-2 rounded-full`}></span>
            n8n {isOnline ? 'Online' : 'Offline'}
        </div>
    );
}
