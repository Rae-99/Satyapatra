import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import OfficerDashboard from './components/OfficerDashboard';
import UploadPreCheckView from './components/UploadPreCheckView';
import RulebookView from './components/RulebookView';
import AuditTrailView from './components/AuditTrailView';
import DecisionModal from './components/DecisionModal';
import { initialApplications, mockAuditTrail } from './data/mockData';
import { Sparkles, CheckCircle2, ChevronRight, Bell } from 'lucide-react';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('scrutiny'); // 'dashboard', 'scrutiny', 'upload', 'rulebook', 'audit'
  const [userRole, setUserRole] = useState('officer'); // 'officer' or 'institute'
  const [lang, setLang] = useState('en'); // 'en' or 'hi'
  const [applications, setApplications] = useState(initialApplications);
  const [selectedAppId, setSelectedAppId] = useState(initialApplications[0].id);

  // Modals state
  const [decisionModal, setDecisionModal] = useState({ isOpen: false, type: 'approve', app: null });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // When a user uploads a new dossier in UploadPreCheckView and clicks "Send to Officer Queue"
  const handleSendToOfficerQueue = (newApp) => {
    setApplications(prev => {
      const exists = prev.some(a => a.id === newApp.id);
      return exists ? prev : [newApp, ...prev];
    });
    setSelectedAppId(newApp.id);
    setActiveMenu('scrutiny');
    showToast(`Dossier ${newApp.id} transferred to Scrutiny Officer queue`);

    mockAuditTrail.unshift({
      id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toLocaleTimeString('en-IN') + ' IST',
      actor: "In-Memory Upload Pipeline",
      action: "New Application Queued",
      target: newApp.id,
      details: `Live document(s) uploaded. Zero server storage. Trust Score: ${newApp.trustScore}/100.`,
      prevHash: mockAuditTrail[0]?.blockHash || "00000000000000000000000000000000",
      blockHash: Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
    });
  };

  const handleConfirmDecision = (actionType, notes) => {
    const decisionLabels = {
      approve: 'Approved by Scrutiny Officer',
      query: 'Clarification Notice Issued',
      inspect: 'Referred to EVC Physical Inspection',
      escalate: 'Escalated to Standing Hearing Committee'
    };

    const label = decisionLabels[actionType] || 'Reviewed';

    setApplications(prev => prev.map(app => {
      if (app.id === selectedAppId) {
        return {
          ...app,
          officerDecision: label,
          officerNotes: notes
        };
      }
      return app;
    }));

    mockAuditTrail.unshift({
      id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toLocaleTimeString('en-IN') + ' IST',
      actor: "AICTE Scrutiny Officer (ID: SC-704)",
      action: `Statutory Decision: ${label}`,
      target: selectedAppId,
      details: notes ? `Decision recorded: "${notes}"` : `Decision recorded: ${label}`,
      prevHash: mockAuditTrail[0]?.blockHash || "00000000000000000000000000000000",
      blockHash: Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
    });

    showToast(`Decision recorded: ${label}`);
  };

  // If user switches role in sidebar to "institute", auto-navigate to upload pre-check
  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
    if (newRole === 'institute') {
      setActiveMenu('upload');
    } else {
      setActiveMenu('scrutiny');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Clean Left Sidebar Navigation Menu */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        lang={lang}
        setLang={setLang}
        userRole={userRole}
        setUserRole={handleRoleChange}
        pendingCount={applications.length}
      />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          
          {/* Breadcrumb / Current Location */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="font-semibold text-slate-500">SatyaPatra</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900 capitalize">
              {activeMenu === 'dashboard' && 'Executive Overview'}
              {activeMenu === 'scrutiny' && 'Application Scrutiny & Review'}
              {activeMenu === 'upload' && 'Upload & Pre-Check'}
              {activeMenu === 'rulebook' && 'AICTE Handbook Rulebook (2026-27)'}
              {activeMenu === 'audit' && 'Hash-Chained Audit Ledger'}
            </span>
          </div>

          {/* Quick Demo Case Selector in Top Bar */}
          <div className="hidden md:flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-medium">Quick Cases:</span>
            <button
              onClick={() => { setSelectedAppId('AICTE-2026-MP-08942'); setActiveMenu('scrutiny'); }}
              className={`px-2.5 py-1 rounded text-xs font-semibold border transition-colors ${
                selectedAppId === 'AICTE-2026-MP-08942' && activeMenu === 'scrutiny'
                  ? 'bg-blue-100 text-blue-900 border-blue-300'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              1. Compliant (95%)
            </button>

            <button
              onClick={() => { setSelectedAppId('AICTE-2026-MH-04118'); setActiveMenu('scrutiny'); }}
              className={`px-2.5 py-1 rounded text-xs font-semibold border transition-colors ${
                selectedAppId === 'AICTE-2026-MH-04118' && activeMenu === 'scrutiny'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              2. Land Mismatch & Expired NOC
            </button>

            <button
              onClick={() => { setSelectedAppId('AICTE-2026-UP-11903'); setActiveMenu('scrutiny'); }}
              className={`px-2.5 py-1 rounded text-xs font-semibold border transition-colors ${
                selectedAppId === 'AICTE-2026-UP-11903' && activeMenu === 'scrutiny'
                  ? 'bg-rose-100 text-rose-900 border-rose-300'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              3. Forged Seal & Cloned QR
            </button>
          </div>

        </header>

        {/* View Content Body */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeMenu === 'dashboard' && (
            <DashboardOverview
              applications={applications}
              onSelectApplication={(id) => { setSelectedAppId(id); setActiveMenu('scrutiny'); }}
              onNavigateToUpload={() => setActiveMenu('upload')}
              lang={lang}
            />
          )}

          {activeMenu === 'scrutiny' && (
            <OfficerDashboard
              applications={applications}
              selectedAppId={selectedAppId}
              setSelectedAppId={setSelectedAppId}
              lang={lang}
              onOpenDecisionModal={(type, app) => setDecisionModal({ isOpen: true, type, app })}
              onNavigateToUpload={() => setActiveMenu('upload')}
            />
          )}

          {activeMenu === 'upload' && (
            <UploadPreCheckView
              lang={lang}
              onSendToOfficerQueue={handleSendToOfficerQueue}
            />
          )}

          {activeMenu === 'rulebook' && (
            <RulebookView lang={lang} />
          )}

          {activeMenu === 'audit' && (
            <AuditTrailView lang={lang} />
          )}
        </main>

      </div>

      {/* Decision Modal */}
      <DecisionModal
        isOpen={decisionModal.isOpen}
        onClose={() => setDecisionModal({ isOpen: false, type: 'approve', app: null })}
        actionType={decisionModal.type}
        app={decisionModal.app}
        onConfirmDecision={handleConfirmDecision}
      />

    </div>
  );
}
