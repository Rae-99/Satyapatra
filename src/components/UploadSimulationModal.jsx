import React, { useState } from 'react';
import { UploadCloud, X, Sparkles, RefreshCw, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';

export default function UploadSimulationModal({ 
  isOpen, 
  onClose, 
  onSimulateUpload 
}) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    setIsAnalyzing(true);
    setStep(1);

    setTimeout(() => setStep(2), 500);
    setTimeout(() => setStep(3), 1100);
    setTimeout(() => setStep(4), 1800);
    setTimeout(() => {
      setIsAnalyzing(false);
      onSimulateUpload(files);
      onClose();
    }, 2400);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleQuickLoad = () => {
    const dummyFiles = [
      { name: "APEX_SURVEY_DEED_2026.pdf", size: 1024000 },
      { name: "MUNICIPAL_SANCTION_DRAWING.pdf", size: 4096000 },
      { name: "STATE_FIRE_NOC_CERTIFICATE.pdf", size: 512000 }
    ];
    handleFiles(dummyFiles);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-850 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Upload Dummy Dossier Files</h2>
              <p className="text-xs text-slate-400">
                In-memory simulation · Files are never stored · Random appropriate output generated
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          
          {/* Privacy Alert */}
          <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-800/40 flex items-start space-x-2.5 text-xs text-blue-200">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p>
              <strong>Zero-Retention Guarantee:</strong> No backend database is attached. Uploaded dummy files exist only in your browser session memory and generate synthetic OCR, cross-checks, and trust scores.
            </p>
          </div>

          {/* Drag & Drop Area */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-7 text-center transition-all bg-slate-950/50 hover:bg-blue-950/10 relative cursor-pointer"
          >
            <input
              type="file"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            <UploadCloud className="w-10 h-10 text-blue-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-200">
              Drag and drop any dummy PDF, JPG, or PNG files here
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              or click anywhere to open file selector
            </p>
          </div>

          {/* Quick preset trigger */}
          <div className="text-center pt-2">
            <span className="text-[11px] text-slate-500">Don't have dummy PDFs handy?</span>
            <button
              onClick={handleQuickLoad}
              className="mt-1 flex items-center justify-center space-x-1.5 mx-auto text-xs font-semibold text-blue-400 hover:text-blue-300 underline"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate 3 Dummy Synthetic Documents Instantly</span>
            </button>
          </div>

          {/* Processing Animation */}
          {isAnalyzing && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center space-x-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                  <span>Synthesizing OCR & Forensic Evidence Report...</span>
                </span>
                <span className="font-mono text-blue-400 font-bold">{step}/4</span>
              </div>

              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full transition-all duration-300 rounded-full" 
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
