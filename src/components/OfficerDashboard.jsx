import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, FileText, CheckCircle2, Clock, 
  ExternalLink, Layers, Search, Sparkles, Building2, UserCheck, 
  ChevronRight, ArrowRight, XCircle, HelpCircle, FileCheck, Send, Printer
} from 'lucide-react';
import DocumentViewer from './DocumentViewer';
import { translations } from '../data/translations';

export default function OfficerDashboard({ 
  applications, 
  selectedAppId, 
  setSelectedAppId, 
  lang,
  onOpenDecisionModal,
  onNavigateToUpload
}) {
  const t = translations[lang] || translations.en;
  const currentApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const [activeTab, setActiveTab] = useState('checklist'); // 'checklist', 'crossdoc', 'forensics', 'issuer', 'infra'
  const [selectedDocId, setSelectedDocId] = useState(currentApp.documents[0]?.id);
  const [selectedFlagId, setSelectedFlagId] = useState(null);

  // Sync selected doc when application changes
  React.useEffect(() => {
    if (currentApp && currentApp.documents.length > 0) {
      setSelectedDocId(currentApp.documents[0].id);
    }
  }, [selectedAppId]);

  const selectedDoc = currentApp.documents.find(d => d.id === selectedDocId) || currentApp.documents[0];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>{t.statusVerified}</span>
          </span>
        );
      case 'Mismatch':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3 h-3" />
            <span>{t.statusMismatch}</span>
          </span>
        );
      case 'Expired':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-red-50 text-red-800 border border-red-200">
            <Clock className="w-3 h-3" />
            <span>{t.statusExpired}</span>
          </span>
        );
      case 'Suspected Tamper':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-bold bg-rose-50 text-rose-800 border border-rose-300">
            <AlertTriangle className="w-3 h-3" />
            <span>{t.statusTampered}</span>
          </span>
        );
      case 'Verification Pending':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            <Clock className="w-3 h-3" />
            <span>{t.statusPending}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <HelpCircle className="w-3 h-3" />
            <span>{t.statusManual}</span>
          </span>
        );
    }
  };

  const totalApps = applications.length;
  const criticalFlagsCount = applications.reduce((acc, a) => acc + (a.flags ? a.flags.length : 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            AICTE Scrutiny & Regulatory Verification Workspace
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            AI-powered pre-check assistant checking regulatory checklists, cross-document numbers, and digital forensics.
          </p>
        </div>

        <button
          onClick={onNavigateToUpload}
          className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-2xs self-start sm:self-auto"
        >
          <span>+ Upload Application Files</span>
        </button>
      </div>

      {/* KPI Stat Cards (Light Theme Plain Colors) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{t.kpiTotalChecked}</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">{totalApps}</span>
            <span className="text-[11px] text-emerald-700 font-semibold">100% Pre-checked</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{t.kpiFlaggedMismatch}</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-amber-700 font-mono">{criticalFlagsCount}</span>
            <span className="text-[11px] text-slate-500">Cited with clause</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{t.kpiForensicAlerts}</span>
            <Layers className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-rose-700 font-mono">1</span>
            <span className="text-[11px] text-slate-500">ELA / QR Alert</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{t.kpiTimeSaved}</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-xl font-bold text-emerald-700 font-mono">{t.kpiTimeSavedVal}</span>
          </div>
        </div>

      </div>

      {/* Case Selector Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Application Dossier to Inspect
            </h2>
          </div>
          <span className="text-xs text-slate-500">Click any dossier card below:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {applications.map((app) => {
            const isSelected = app.id === currentApp.id;
            return (
              <button
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`text-left p-3.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-600 shadow-2xs ring-1 ring-blue-600'
                    : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-600 block">{app.id}</span>
                  {getStatusBadge(app.statusBadge)}
                </div>
                
                <h3 className="text-xs font-bold text-slate-900 mt-1 truncate">
                  {app.name}
                </h3>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {app.location}
                </p>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                  <span className="text-slate-500 font-medium">Trust Score:</span>
                  <span className={`font-mono font-bold ${
                    app.trustScore >= 80 ? 'text-emerald-700' : app.trustScore >= 50 ? 'text-amber-700' : 'text-rose-700'
                  }`}>
                    {app.trustScore}/100
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Scrutiny Review Container */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        
        {/* Header of Active Application */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-slate-200 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                {currentApp.id}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-600">{currentApp.applicantType}</span>
            </div>
            
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">
              {currentApp.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center space-x-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentApp.trustName}</span>
              </span>
              <span>•</span>
              <span>Location: {currentApp.location}</span>
            </div>
          </div>

          {/* Explainable Trust Score Badge */}
          <div className="flex items-center bg-slate-50 p-3 rounded-lg border border-slate-200 gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                Explainable Trust Score
              </span>
              <span className={`text-xl font-black font-mono block ${
                currentApp.trustScore >= 80 ? 'text-emerald-700' : currentApp.trustScore >= 50 ? 'text-amber-700' : 'text-rose-700'
              }`}>
                {currentApp.trustScore}<span className="text-xs text-slate-400 font-sans font-normal"> / 100</span>
              </span>
              <span className="text-[10px] text-slate-500 block">
                {currentApp.statusSummary}
              </span>
            </div>

            <div className="w-10 h-10 rounded-full bg-white border border-slate-300 flex items-center justify-center">
              <ShieldCheck className={`w-5 h-5 ${
                currentApp.trustScore >= 80 ? 'text-emerald-700' : currentApp.trustScore >= 50 ? 'text-amber-600' : 'text-rose-600'
              }`} />
            </div>
          </div>
        </div>

        {/* Decision Rule Notice */}
        <div className="mt-3 p-3 bg-blue-50/80 rounded-lg border border-blue-200 flex items-start space-x-2 text-xs text-blue-900">
          <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <p className="font-medium">
            <strong>Decision Rule:</strong> AI flags $\rightarrow$ evidence shown $\rightarrow$ officer decides. Critical flags require officer acknowledgement; the algorithm never auto-rejects.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 border-b border-slate-200 mt-4 overflow-x-auto scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-2 font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'checklist'
                ? 'border-blue-700 text-blue-900 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Checklist & Documents ({currentApp.documents.length})
          </button>

          <button
            onClick={() => setActiveTab('crossdoc')}
            className={`px-3 py-2 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'crossdoc'
                ? 'border-blue-700 text-blue-900 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Cross-Doc Checks</span>
            {currentApp.flags && currentApp.flags.length > 0 && (
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-100 text-amber-800 font-bold">
                {currentApp.flags.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('forensics')}
            className={`px-3 py-2 font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'forensics'
                ? 'border-blue-700 text-blue-900 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Forensics & ELA
          </button>

          <button
            onClick={() => setActiveTab('issuer')}
            className={`px-3 py-2 font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'issuer'
                ? 'border-blue-700 text-blue-900 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Issuer & DigiLocker
          </button>

          <button
            onClick={() => setActiveTab('infra')}
            className={`px-3 py-2 font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'infra'
                ? 'border-blue-700 text-blue-900 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Phase 3: Infra Vision
          </button>
        </div>

        {/* Split Screen Workspace (Left 5 Cols, Right 7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
          
          {/* Left Panel */}
          <div className="lg:col-span-5 space-y-3">
            
            {activeTab === 'checklist' && (
              <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
                {currentApp.documents.map((doc) => {
                  const isDocSelected = doc.id === selectedDoc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isDocSelected
                          ? 'bg-blue-50 border-blue-600 shadow-2xs ring-1 ring-blue-600'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2">
                          <FileText className={`w-4 h-4 mt-0.5 ${isDocSelected ? 'text-blue-700' : 'text-slate-400'}`} />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                            <p className="text-[11px] text-slate-500">{doc.type} · {doc.pages} pages</p>
                          </div>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">OCR Extraction:</span>
                        <span className="font-mono text-emerald-800 font-bold">{doc.confidence}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'crossdoc' && (
              <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
                {currentApp.crossDocChecks.map((check, idx) => (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-lg border ${
                      check.status === 'Verified'
                        ? 'bg-white border-slate-200'
                        : 'bg-amber-50/60 border-amber-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-slate-900">{check.fact}</span>
                      {getStatusBadge(check.status)}
                    </div>

                    <div className="mt-2.5 space-y-1 text-[11px] bg-slate-50 p-2.5 rounded border border-slate-200">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{check.docA.name}:</span>
                        <span className="font-mono font-bold text-slate-900">{check.docA.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{check.docB.name}:</span>
                        <span className={`font-mono font-bold ${check.status === 'Mismatch' ? 'text-amber-800' : 'text-slate-900'}`}>
                          {check.docB.value}
                        </span>
                      </div>
                    </div>

                    <p className={`mt-2 text-[11px] leading-relaxed ${
                      check.status === 'Mismatch' ? 'text-amber-900 font-medium' : 'text-slate-600'
                    }`}>
                      {check.verdict}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'forensics' && (
              <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                {currentApp.authenticityForensics.map((f, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{f.check}</span>
                      <span className={`font-bold font-mono px-2 py-0.5 rounded text-[10px] ${
                        f.result.includes('Tampered') || f.result.includes('Mismatch')
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {f.result}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                      {f.detail}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'issuer' && (
              <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                {currentApp.documents.map((d) => (
                  <div key={d.id} className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>{d.type}</span>
                      <span className="text-[11px] text-emerald-800 font-semibold">Channel Verified</span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                      {d.issuerStatus}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'infra' && (
              <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Phase 3: Advisory Infrastructure Checks
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-600">Computer Center Workstations:</span>
                    <span className="font-bold text-emerald-800">180 Units Verified</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-600">Library Carpet Area:</span>
                    <span className="font-bold text-emerald-800">420 sqm (Meets 400 sqm min)</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Panel: Embedded Document Viewer (7 Cols) */}
          <div className="lg:col-span-7 h-[640px]">
            <DocumentViewer
              selectedDoc={selectedDoc}
              allDocs={currentApp.documents}
              lang={lang}
            />
          </div>

        </div>

        {/* Bottom Officer Action Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-xs font-bold text-slate-800 block">
              Officer Statutory Action & Final Decision:
            </span>
            <p className="text-[11px] text-slate-500">
              {currentApp.officerDecision !== 'Pending' 
                ? `Decision Recorded: ${currentApp.officerDecision}` 
                : 'Review evidence before signing the final recommendation.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onOpenDecisionModal('approve', currentApp)}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.btnApprove}</span>
            </button>

            <button
              onClick={() => onOpenDecisionModal('query', currentApp)}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{t.btnQuery}</span>
            </button>

            <button
              onClick={() => onOpenDecisionModal('inspect', currentApp)}
              className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t.btnInspect}</span>
            </button>

            <button
              onClick={() => onOpenDecisionModal('escalate', currentApp)}
              className="px-3.5 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>{t.btnEscalate}</span>
            </button>

            <button
              onClick={() => onOpenDecisionModal('export', currentApp)}
              className="p-2 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-300 transition-colors shadow-2xs"
              title="Print Validation Report"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
