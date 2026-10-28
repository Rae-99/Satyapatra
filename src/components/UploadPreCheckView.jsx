import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  FileText, 
  ArrowRight, 
  RefreshCw,
  Eye,
  Info
} from 'lucide-react';
import DocumentViewer from './DocumentViewer';
import { generateMockAnalysis } from '../data/mockData';

export default function UploadPreCheckView({ 
  lang, 
  onSendToOfficerQueue 
}) {
  const [appType, setAppType] = useState('eoa');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentApp, setCurrentApp] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const loadSampleDossier = () => {
    // Generate synthetic mock blob or simulated files
    const dummyFiles = [
      { name: "Apex_Land_Registry_Deed_Khasra412.pdf", size: 2450000, type: "application/pdf" },
      { name: "Bhopal_Municipal_Sanction_Plan_2025.pdf", size: 5120000, type: "application/pdf" },
      { name: "Fire_Safety_NOC_Valid_2028.pdf", size: 1200000, type: "application/pdf" }
    ];
    processFiles(dummyFiles);
  };

  const processFiles = (files) => {
    const fileList = Array.from(files);
    setUploadedFiles(fileList);
    setIsProcessing(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 400);
    setTimeout(() => setScanStep(3), 900);
    setTimeout(() => {
      setIsProcessing(false);
      setScanStep(4);
      
      const analyzedApp = generateMockAnalysis(fileList);
      setCurrentApp(analyzedApp);
      if (analyzedApp.documents && analyzedApp.documents.length > 0) {
        setSelectedDocId(analyzedApp.documents[0].id);
      }
    }, 1400);
  };

  const selectedDoc = currentApp?.documents.find(d => d.id === selectedDocId) || currentApp?.documents[0];

  return (
    <div className="space-y-6">
      
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            Upload & Pre-Submission Document Verification
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Upload dummy or real application dossiers (PDFs / images) to instantly preview documents and evaluate AICTE Handbook compliance.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Zero-Storage Client RAM</span>
          </span>
        </div>
      </div>

      {/* Main Upload Area (Only if no file is uploaded yet, or collapsible) */}
      {!currentApp ? (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          
          {/* Category Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Select AICTE Application Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setAppType('eoa')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  appType === 'eoa'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 font-medium'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold block">Extension of Approval (EoA)</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Annual renewal for existing technical institutes</span>
              </button>

              <button
                onClick={() => setAppType('new')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  appType === 'new'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 font-medium'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold block">New Technical Institution</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">First-time establishment approval</span>
              </button>

              <button
                onClick={() => setAppType('intake')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  appType === 'intake'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 font-medium'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold block">New Courses / Intake Increase</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Emerging areas (AI/ML, Data Science, etc.)</span>
              </button>
            </div>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-slate-300 hover:border-blue-600 rounded-xl p-8 text-center transition-colors bg-slate-50/60 hover:bg-blue-50/30 relative cursor-pointer"
          >
            <input
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              onChange={handleFileInput}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                <UploadCloud className="w-6 h-6" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Drag and drop dummy files here, or <span className="text-blue-700 underline">browse files</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Drop any PDF or image. The document will be displayed directly in the viewer without saving to any server.
                </p>
              </div>

              <div className="flex items-center space-x-3 text-[11px] text-slate-500 pt-2">
                <span>✓ PDF & Image preview</span>
                <span>•</span>
                <span>✓ Client-side In-Memory Object URL</span>
                <span>•</span>
                <span>✓ Zero Database</span>
              </div>
            </div>
          </div>

          {/* Quick preset trigger */}
          <div className="text-center pt-1">
            <span className="text-xs text-slate-500">Don't have a file ready right now? </span>
            <button
              onClick={loadSampleDossier}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 underline ml-1"
            >
              Load Ready-Made Sample Dossier
            </button>
          </div>

          {/* Loading Animation */}
          {isProcessing && (
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-700" />
                <span className="font-semibold">Processing files in client memory...</span>
              </div>
              <span className="font-bold">Step {scanStep} of 4</span>
            </div>
          )}

        </div>
      ) : (
        /* Document Display & AI Findings Workspace */
        <div className="space-y-4">
          
          {/* Top Banner with Action Buttons */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                  {currentApp.id}
                </span>
                <span className="text-xs font-bold text-slate-900">{currentApp.name}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentApp.documents.length} document(s) uploaded · Trust Score: <strong className="text-slate-900 font-mono">{currentApp.trustScore}/100</strong>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  onSendToOfficerQueue(currentApp);
                }}
                className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-xs"
              >
                <span>Send to Officer Scrutiny Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setCurrentApp(null)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors border border-slate-300"
              >
                Upload Different File
              </button>
            </div>
          </div>

          {/* Split Screen Workspace: Left (Checklist & Values); Right (Embedded Document Preview) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left: Document list & extracted fields (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Uploaded Documents ({currentApp.documents.length})
                </h3>

                <div className="space-y-2">
                  {currentApp.documents.map((doc) => {
                    const isSelected = doc.id === selectedDoc.id;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDocId(doc.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 shadow-2xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-2">
                            <FileText className={`w-4 h-4 mt-0.5 ${isSelected ? 'text-blue-700' : 'text-slate-500'}`} />
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                              <p className="text-[11px] text-slate-500">{doc.type}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {doc.status}
                          </span>
                        </div>

                        {/* OCR Confidence */}
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">OCR Extraction:</span>
                          <span className="text-emerald-800 font-bold">{doc.confidence}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Extracted Fields Card */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  AI Extracted Key Fields ({selectedDoc?.name})
                </h3>

                <div className="space-y-2">
                  {selectedDoc?.extractedFields.map((field, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[11px] text-slate-500 block">{field.label}</span>
                        <span className="font-bold text-slate-900">{field.value}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded">
                          {field.confidence}
                        </span>
                        <span className="text-[9px] text-slate-500 block mt-0.5">{field.clause}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy Notice Card */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start space-x-2">
                <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <p>
                  <strong>No Database Storage:</strong> The file preview is rendered through a secure in-memory browser URL and will be cleared once the session ends.
                </p>
              </div>

            </div>

            {/* Right: Embedded Document Viewer (7 cols) */}
            <div className="lg:col-span-7 h-[620px]">
              <DocumentViewer
                selectedDoc={selectedDoc}
                allDocs={currentApp.documents}
                lang={lang}
              />
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
