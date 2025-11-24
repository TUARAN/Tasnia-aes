import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, FileText, Lock, User, CheckCircle2, ArrowRight } from 'lucide-react';
import ControlPanel from './ControlPanel';

const SymmetricDemo: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { title: "Initial State", description: "Alice wants to send a secure message to Bob." },
    { title: "Key Distribution", description: "Both parties must possess the EXACT SAME secret key. This is the 'Shared Secret'." },
    { title: "Encryption", description: "Alice uses the Shared Secret Key to lock (encrypt) her message." },
    { title: "Transmission", description: "The encrypted message (ciphertext) travels securely across the internet." },
    { title: "Decryption", description: "Bob uses his copy of the Shared Secret Key to unlock (decrypt) the message." },
    { title: "Complete", description: "Bob reads the original message. Secure communication achieved!" },
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
          <div className="w-24 h-24 rounded-full bg-blue-900/30 border-2 border-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <User className="w-10 h-10 text-blue-400" />
          </div>
          <span className="font-bold text-blue-400">Alice (Sender)</span>
          
          {/* Alice's Key */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-0 right-0 -mt-2 -mr-2 bg-amber-500 p-1.5 rounded-full shadow-lg"
              >
                <Key className="w-4 h-4 text-slate-900" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DATA PACKET */}
        <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
          <motion.div
            className="flex flex-col items-center"
            initial={{ x: -250 }} // Start at Alice
            animate={{
              x: step === 0 ? -250 : // Alice
                 step === 1 ? -250 : // Alice
                 step === 2 ? -250 : // Alice (Encryption happening)
                 step === 3 ? 0 :    // Mid-transit
                 step === 4 ? 250 :  // Bob
                 250                 // Bob
            }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          >
             {/* The Message / Lock Visual */}
             <div className="relative">
                {/* The Paper */}
                <motion.div
                   animate={{
                     scale: (step === 2 || step === 3 || step === 4) ? 0.8 : 1,
                     opacity: (step === 2 || step === 3 || step === 4) ? 0.5 : 1
                   }}
                   className="w-16 h-20 bg-slate-100 rounded shadow-lg flex items-center justify-center"
                >
                   <FileText className="text-slate-800 w-8 h-8" />
                </motion.div>

                {/* The Lock Overlay */}
                <AnimatePresence>
                  {(step === 2 || step === 3 || step === 4) && (
                    <motion.div
                      initial={{ scale: 2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 2, opacity: 0 }}
                      className="absolute inset-0 bg-red-600 rounded flex items-center justify-center shadow-xl border-2 border-red-400 z-20"
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
          <div className="w-24 h-24 rounded-full bg-blue-900/30 border-2 border-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <User className="w-10 h-10 text-blue-400" />
          </div>
          <span className="font-bold text-blue-400">Bob (Receiver)</span>

          {/* Bob's Key */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-0 right-0 -mt-2 -mr-2 bg-amber-500 p-1.5 rounded-full shadow-lg"
              >
                <Key className="w-4 h-4 text-slate-900" />
              </motion.div>
            )}
          </AnimatePresence>

           {/* Success Indicator */}
           <AnimatePresence>
            {step === 5 && (
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

export default SymmetricDemo;