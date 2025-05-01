import { useParams } from 'react-router-dom';

export default function ChatPage() {
  const params = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white relative overflow-hidden flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-slate-800 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-slate-700 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-40 w-80 h-80 bg-slate-600 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-100">
            Chat Page
          </h1>
          
          {Object.keys(params).length > 0 && (
            <div className="mb-8 p-6 bg-slate-800/50 rounded-lg backdrop-blur-sm mx-auto max-w-2xl">
              <h2 className="text-2xl font-semibold mb-4 text-slate-200">Route Parameters</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(params).map(([key, value]) => (
                  <div key={key} className="bg-slate-700/50 p-4 rounded-md">
                    <span className="font-mono text-emerald-400">{key}: </span>
                    <span className="font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            This is your new Chat page. Start building your content here.
          </p>
        </div>
      </div>
    </div>
  );
}