export default function DirectorPage() {
  return (
    <div className="flex flex-col h-full items-center justify-center space-y-8">

      {/* "Office" Isometric Simulation container */}
      <div className="relative w-[600px] h-[400px] bg-[#d3d3d3] border-[6px] border-[#909090] pixel-box flex items-center justify-center overflow-hidden">

        {/* Placeholder for Isometric Floor grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30 pointer-events-none"></div>

        {/* The Director Desk Sprite */}
        <div className="relative z-10 text-center">
          <div className="w-64 h-32 bg-[#8B4513] border-[4px] border-[#5C2E0B] flex items-center justify-center shadow-lg relative mx-auto mb-4">
            <span className="text-white text-[10px] tracking-widest drop-shadow-md">DIRECTOR DESK</span>
            {/* Monitor */}
            <div className="absolute top-[-40px] right-4 w-16 h-12 bg-gray-800 border-2 border-gray-400"></div>
          </div>

          <div className="pixel-box bg-white inline-block p-4 mx-auto !shadow-none !border-[2px]">
            <h2 className="text-sm font-bold text-blue-900 mb-2">Company Overview</h2>
            <p className="text-[10px] text-gray-700 max-w-xs leading-relaxed">
              Welcome back, Director. The AI workforce is currently idle.
              Assign plans or check the agents roster to begin operations.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="pixel-btn px-6 py-3 text-sm">Review Reports</button>
        <button className="pixel-btn px-6 py-3 text-sm bg-green-600 border-green-900 hover:bg-green-500">New Objective</button>
      </div>

    </div>
  );
}
