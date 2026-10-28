import React, { useState } from 'react';
import { 
  UploadCloud, FileCheck, AlertTriangle, CheckCircle2, 
  Clock, ShieldAlert, Sparkles, Building2, HelpCircle, FileText, ArrowRight, RefreshCw 
} from 'lucide-react';
import { translations } from '../data/translations';

export default function InstituteSelfCheck({ 
  lang, 
  onSimulateUpload 
}) {
  const t = translations[lang];
  const [appType, setAppType] = useState('eoa');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [preCheckResults, setPreCheckResults] = useState(null);

  const checklistItems = [
    { id: 'land', name: 'Registered Land Title Deed / Lease Document', required: true, clause: 'APH 2026 Cl. 1.4' },
    { id: 'plan', name: 'Approved Building Master Plan & Completion Certificate', required: true, clause: 'APH 2026 Cl. 2.1' },
    { id: 'fire', name: 'Valid Fire Safety NOC (Active for 2026-27)', required: true, clause: 'APH 2026 Cl. 2.8' },
    { id: 'water', name: 'Water & Sewerage Disposal Clearance', required: true, clause: 'APH 2026 Cl. 2.11' },
    { id: 'society', name: 'Society / Trust Registration & Bye-Laws', required: true, clause: 'APH 2026 Cl. 5.1' },
    { id: 'faculty', name: 'Cadre Faculty Roster & EPFO Validation', required: appType === 'eoa', clause: 'APH 2026 Cl. 4.1' }
  ];

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processDummyFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processDummyFiles(e.target.files);
    }
  };

  const loadSampleDossier = () => {
    const fakeFiles = [
      { name: "Apex_Land_Registry_Deed_Khasra412.pdf", size: 2450000 },
      { name: "Bhopal_Municipal_Sanction_Plan_2025.pdf", size: 5120000 },
      { name: "Fire_Safety_NOC_Valid_2028.pdf", size: 1200000 },
      { name: "Society_Trust_Registration_Certificate.pdf", size: 890000 }
    ];
    processDummyFiles(fakeFiles);
  };

  const processDummyFiles = (files) => {
    setUploadedFiles(Array.from(files));
    setIsProcessing(true);
    setScanStep(1);

    // Realistic multi-stage pipeline simulation
    setTimeout(() => setScanStep(2), 600);
    setTimeout(() => setScanStep(3), 1300);
    setTimeout(() => setScanStep(4), 2000);
    setTimeout(() => {
      setIsProcessing(false);
      setScanStep(5);
      
      const isMixed = files.length % 2 === 0;
      setPreCheckResults({
        totalFiles: files.length,
        readyForSubmission: isMixed,
        score: isMixed ? 94 : 68,
        findings: [
          {
            type: 'success',
            title: 'Land Area Requirement Met',
            desc: 'Extracted 5.25 contiguous acres (satisfies AICTE minimum 5.00 acres for urban zone).'
          },
          {
            type: isMixed ? 'success' : 'warning',
            title: isMixed ? 'Fire NOC Status: Valid' : 'Fire NOC Near Expiration / Review Date',
            desc: isMixed 
              ? 'Valid till 14-Nov-2028 via State Fire Service verification.' 
              : 'NOC expires in less than 90 days. We recommend applying for renewal now.'
          },
          {
            type: 'info',
            title: 'Cross-Document Name Verification: 100% Match',
            desc: 'Society name spelling strictly matches across all uploaded certificates.'
          }
        ]
      });

      // Also trigger top-level simulation generator
      onSimulateUpload(files);
    }, 2600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Self-Check Portal
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-300">Technical Institute Pre-Submission Validation</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Instant AICTE Dossier Self-Check
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Verify your documents against AICTE Approval Process Handbook (APH 2026-27) checklists before official submission. 
              Catch expired certificates, cross-document number mismatches, and layout disparities instantly.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-right shrink-0">
            <span className="text-[10px] text-slate-400 block uppercase">Privacy Guarantee</span>
            <span className="text-xs font-bold text-emerald-400 block mt-0.5">🔒 In-Memory Only</span>
            <span className="text-[10px] text-slate-500 block">No files stored / No database</span>
          </div>
        </div>
      </div>

      {/* Configuration & Application Type Picker */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Step 1: Select Application Approval Category
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setAppType('eoa')}
            className={`p-3 rounded-xl border text-left transition-all ${
              appType === 'eoa'
                ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500 text-white'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <span className="text-xs font-bold block text-slate-200">Extension of Approval (EoA)</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Existing college annual renewal</span>
          </button>

          <button
            onClick={() => setAppType('new')}
            className={`p-3 rounded-xl border text-left transition-all ${
              appType === 'new'
                ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500 text-white'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <span className="text-xs font-bold block text-slate-200">New Technical Campus</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">First-time establishment approval</span>
          </button>

          <button
            onClick={() => setAppType('intake')}
            className={`p-3 rounded-xl border text-left transition-all ${
              appType === 'intake'
                ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500 text-white'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <span className="text-xs font-bold block text-slate-200">Course / Intake Addition</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Emerging areas (AI/ML, Data Science)</span>
          </button>
        </div>
      </div>

      {/* Upload Zone & Pre-Check Trigger */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Step 2: Upload Dummy Application Files (PDF or Images)
          </label>
          <button
            onClick={loadSampleDossier}
            className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Ready-Made Sample Dossier</span>
          </button>
        </div>

        {/* Drag and Drop Box */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-slate-700 hover:border-emerald-500/80 rounded-2xl p-8 text-center transition-all bg-slate-950/40 hover:bg-emerald-950/10 cursor-pointer relative"
        >
          <input
            type="file"
            multiple
            onChange={handleFileInput}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <UploadCloud className="w-7 h-7 text-emerald-400" />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                Drag and drop your dummy dossier files here, or <span className="text-emerald-400 underline">browse files</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports PDF scans, PNG, JPG (Files are analyzed dynamically in browser memory only)
              </p>
            </div>

            <div className="flex items-center space-x-3 text-[11px] text-slate-500 pt-2">
              <span>✓ Auto-rotated scans</span>
              <span>•</span>
              <span>✓ Bilingual Hindi/English OCR</span>
              <span>•</span>
              <span>✓ Zero Server Retention</span>
            </div>
          </div>
        </div>

        {/* Live Processing Pipeline Status */}
        {isProcessing && (
          <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center space-x-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>Running SatyaPatra In-Memory Validation Engine...</span>
              </span>
              <span className="text-emerald-400 font-mono font-bold">Step {scanStep} of 4</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-[10px] font-semibold text-center">
              <div className={`p-2 rounded ${scanStep >= 1 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-600'}`}>
                1. Ingest & Check
              </div>
              <div className={`p-2 rounded ${scanStep >= 2 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-600'}`}>
                2. OCR Field Read
              </div>
              <div className={`p-2 rounded ${scanStep >= 3 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-600'}`}>
                3. Cross-Doc Link
              </div>
              <div className={`p-2 rounded ${scanStep >= 4 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-600'}`}>
                4. Pre-Check Report
              </div>
            </div>
          </div>
        )}

        {/* Pre-Check Results View */}
        {preCheckResults && (
          <div className="mt-6 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Pre-Check Self-Scoring</span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {preCheckResults.readyForSubmission ? 'Dossier Looks Ready for Formal Submission' : '2 Recommended Fixes Before AICTE Submission'}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold font-mono text-emerald-400">{preCheckResults.score}/100</span>
                <span className="text-xs text-slate-500">Estimated Trust Score</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {preCheckResults.findings.map((f, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-lg border flex items-start space-x-3 text-xs ${
                    f.type === 'success' 
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' 
                      : f.type === 'warning'
                        ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                        : 'bg-blue-950/20 border-blue-500/30 text-blue-200'
                  }`}
                >
                  {f.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : f.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <FileText className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-bold">{f.title}</h4>
                    <p className="text-[11px] opacity-90 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">
                You can now view this simulated application inside the <strong>AICTE Scrutiny Officer Portal</strong> view!
              </span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
              >
                <span>Back to Top & Switch Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Handbook Checklist Matrix */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Required Handbook Checklist for Academic Year 2026-27:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {checklistItems.map((item) => (
            <div key={item.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <span className="font-medium text-slate-200 block">{item.name}</span>
                <span className="text-[10px] text-blue-400 font-mono">{item.clause}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                Mandatory
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
