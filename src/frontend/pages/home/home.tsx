export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-12 text-slate-100">
          Welcome to BREP Stack
        </h1>

        {/* Technology Showcase Section */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16">
          {/* Bun */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full sm:w-1/2 md:w-1/4 lg:w-1/5 text-left transform transition-transform duration-300 hover:-translate-y-2">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">Bun</h3>
            <p className="text-slate-400 text-sm">
              Fast runtime & package manager
            </p>
          </div>
          {/* Elysia */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full sm:w-1/2 md:w-1/4 lg:w-1/5 text-left transform transition-transform duration-300 hover:-translate-y-2">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">
              ElysiaJS
            </h3>
            <p className="text-slate-400 text-sm">Friendly web framework</p>
          </div>
          {/* React */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full sm:w-1/2 md:w-1/4 lg:w-1/5 text-left transform transition-transform duration-300 hover:-translate-y-2">
            <div className="text-4xl mb-4">⚛️</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">React</h3>
            <p className="text-slate-400 text-sm">UI library</p>
          </div>
          {/* Prisma */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full sm:w-1/2 md:w-1/4 lg:w-1/5 text-left transform transition-transform duration-300 hover:-translate-y-2">
            <div className="text-4xl mb-4">💾</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">
              Prisma
            </h3>
            <p className="text-slate-400 text-sm">Next-gen ORM</p>
          </div>
        </div>

        {/* GitHub Link */}
        <div>
          <a
            href="https://github.com/yourusername/bun-elysia-fullstack" // TODO: Update this link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
