import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, FileText, Lock, User, CheckCircle2, ArrowLeft } from 'lucide-react';
import ControlPanel from './ControlPanel';

const AsymmetricDemo: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { title: "Initial State", description: "Alice wants to send a secure message to Bob, but they don't have a shared key yet." },
    { title: "Key Generation", description: "Bob generates a Key Pair: A Public Key (Green) that anyone can use, and a Private Key (Red) only he keeps." },
    { title: "Key Publishing", description: "Bob sends his Public Key to Alice openly. It doesn't matter if spies see this key." },
    { title: "Encryption", description: "Alice uses Bob's Public Key to encrypt the message. Only Bob's Private Key can unlock this." },
    { title: "Transmission", description: "The encrypted message travels securely. Even Alice can't decrypt it now!" },
    { title: "Decryption", description: "Bob uses his secret Private Key to decrypt the message." },
    { title: "Complete", description: "Bob reads the message. Secure communication without pre-sharing secrets!" },
  ];

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));
  const reset = () => setStep(0);

  return (
    <div className="h-full flex flex-col">
      {/* Animation Stage */}
      <div className="flex-grow relative bg-slate-900/50 p-8 min-h-[450px] overflow-hidden flex items-center justify-between px-4 md:px-20">
        
        {/* Connection Line */}
        <div className="absolute top-1/2 left-20 right-20 h-1 bg-slate-700 -z-10" />

        {/* ALICE */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-indigo-900/30 border-2 border-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <User className="w-10 h-10 text-indigo-400" />
          </div>
          <span className="font-bold text-indigo-400">Alice (Sender)</span>
          
          {/* Alice holding Bob's Public Key */}
          <AnimatePresence>
            {step >= 2 && step <= 4 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-0 right-0 -mt-2 -mr-2 bg-emerald-500 p-1.5 rounded-full shadow-lg z-20"
              >
                <Key className="w-4 h-4 text-slate-900" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Public Key Transit Animation (Bob -> Alice) */}
        <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
            <motion.div
                 initial={{ opacity: 0, x: 250 }}
                 animate={{ 
                    opacity: step === 2 ? 1 : 0,
                    x: step === 2 ? 0 : 250 // Moves from Right to Middle (illustrative) - effectively teleporting in this simple view, but let's make it travel
                 }}
            >
                {step === 2 && (
                    <motion.div 
                        initial={{ x: 250 }} 
                        animate={{ x: -250 }} 
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="bg-emerald-500 p-2 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    >
                        <Key className="w-6 h-6 text-slate-900" />
                    </motion.div>
                )}
            </motion.div>
        </div>

        {/* DATA PACKET Animation (Alice -> Bob) */}
        <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
          <motion.div
            className="flex flex-col items-center"
            initial={{ x: -250 }} 
            animate={{
              x: step < 4 ? -250 : // Alice
                 step === 4 ? 0 :  // Transit
                 250               // Bob
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
             {/* The Message / Lock Visual */}
             <div className="relative">
                {/* The Paper */}
                <motion.div
                   animate={{
                     scale: (step >= 3 && step <= 5) ? 0.8 : 1,
                     opacity: (step >= 3 && step <= 5) ? 0.5 : 1
                   }}
                   className="w-16 h-20 bg-slate-100 rounded shadow-lg flex items-center justify-center"
                >
                   <FileText className="text-slate-800 w-8 h-8" />
                </motion.div>

                {/* The Lock Overlay */}
                <AnimatePresence>
                  {(step >= 3 && step <= 5) && (
                    <motion.div
                      initial={{ scale: 2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 2, opacity: 0 }}
                      className="absolute inset-0 bg-emerald-600 rounded flex items-center justify-center shadow-xl border-2 border-emerald-400 z-20"
                    >
                      <Lock className="text-white w-8 h-8" />
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </motion.div>
        </div>

        {/* BOB */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-indigo-900/30 border-2 border-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <User className="w-10 h-10 text-indigo-400" />
          </div>
          <span className="font-bold text-indigo-400">Bob (Receiver)</span>

          {/* Bob's Keys */}
          <div className="absolute -right-8 top-0 flex flex-col gap-2">
            {/* Private Key */}
            <AnimatePresence>
                {step >= 1 && (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-rose-500 p-2 rounded-lg shadow-lg flex items-center gap-2"
                    title="Private Key"
                >
                    <Key className="w-4 h-4 text-white" />
                    <span className="text-[10px] font-bold text-white uppercase">Priv</span>
                </motion.div>
                )}
            </AnimatePresence>
            
            {/* Public Key (Only shown here if he hasn't sent it yet, or he keeps a copy) */}
            <AnimatePresence>
                {step === 1 && (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }} // Flies away
                    className="bg-emerald-500 p-2 rounded-lg shadow-lg flex items-center gap-2"
                    title="Public Key"
                >
                    <Key className="w-4 h-4 text-slate-900" />
                    <span className="text-[10px] font-bold text-slate-900 uppercase">Pub</span>
                </motion.div>
                )}
            </AnimatePresence>
          </div>

           {/* Success Indicator */}
           <AnimatePresence>
            {step === 6 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-12 bg-green-500 text-slate-900 font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap"
              >
                <CheckCircle2 className="w-4 h-4" />
                Message Read
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Control Panel */}
      <ControlPanel 
        currentStep={step} 
        totalSteps={steps.length} 
        onNext={nextStep} 
        onPrev={prevStep} 
        onReset={reset}
        title={steps[step].title}
        description={steps[step].description}
      />
    </div>
  );
};

export default AsymmetricDemo;