import React, { useState } from 'react';
import { ShieldCheck, Lock, Key } from 'lucide-react';
import SymmetricDemo from './components/SymmetricDemo';
import AsymmetricDemo from './components/AsymmetricDemo';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'symmetric' | 'asymmetric'>('symmetric');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-6 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">CryptoVisualizer</h1>
          </div>
          <p className="hidden md:block text-slate-400 text-sm">Interactive Encryption Educational Tool</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800 p-1 rounded-xl inline-flex shadow-inner border border-slate-700">
              <button
                onClick={() => setActiveTab('symmetric')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'symmetric'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Lock className="w-4 h-4" />
                Symmetric (AES)
              </button>
              <button
                onClick={() => setActiveTab('asymmetric')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'asymmetric'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Key className="w-4 h-4" />
                Asymmetric (Public Key)
              </button>
            </div>
          </div>

          {/* Visualization Container */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden min-h-[600px] relative">
            {activeTab === 'symmetric' ? <SymmetricDemo /> : <AsymmetricDemo />}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-center py-6 text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} CryptoVisualizer. Educational Demonstration.</p>
      </footer>
    </div>
  );
};

export default App;