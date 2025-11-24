import React from 'react';
import { Play, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';

interface ControlPanelProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  title: string;
  description: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onReset,
  title,
  description
}) => {
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-slate-800 p-6 border-t border-slate-700">
      
      {/* Progress Bar */}
      <div className="w-full bg-slate-700 h-2 rounded-full mb-6 overflow-hidden">
        <div 
            className="bg-blue-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl font-bold text-white mb-1">
            Step {currentStep + 1}: {title}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onPrev}
            disabled={currentStep === 0}
            className="p-3 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Previous Step"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={onReset}
            className="p-3 rounded-full bg-slate-700 text-slate-300 hover:bg-red-900/50 hover:text-red-400 transition-colors"
            title="Reset Animation"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={onNext}
            disabled={currentStep === totalSteps - 1}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-500/25"
          >
            {currentStep === totalSteps - 1 ? 'Finished' : 'Next Step'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;