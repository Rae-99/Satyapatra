import React, { useState } from 'react';
import { 
  CheckCircle2, AlertTriangle, Search, XCircle, 
  Printer, X, Send, FileText, Download, ShieldCheck, Copy, Check 
} from 'lucide-react';

export default function DecisionModal({ 
  isOpen, 
  onClose, 
  actionType, 
  app, 
  onConfirmDecision 
}) {
  const [officerNotes, setOfficerNotes] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !app) return null;

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleConfirm = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      onConfirmDecision(actionType, officerNotes);
      setIsSubmitted(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-300 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden text-slate-800">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            {actionType === 'approve' && (
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
            {actionType === 'query' && (
              <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
              </div>
            )}
            {actionType === 'inspect' && (
              <div className="p-2 bg-indigo-100 text-indigo-800 rounded-lg">
                <Search className="w-5 h-5" />
              </div>
            )}
            {actionType === 'escalate' && (
              <div className="p-2 bg-rose-100 text-rose-800 rounded-lg">
                <XCircle className="w-5 h-5" />
              </div>
            )}
            {actionType === 'export' && (
              <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
                <Printer className="w-5 h-5" />
              </div>
            )}

            <div>
              <h2 className="text-base font-bold text-slate-900 capitalize">
                {actionType === 'approve' && 'Grant AICTE Approval Order'}
                {actionType === 'query' && 'Issue Deficiency / Query Notice'}
                {actionType === 'inspect' && 'Order Surprise Physical Inspection'}
                {actionType === 'escalate' && 'Escalate to Scrutiny Committee'}
                {actionType === 'export' && 'Official Validation Report'}
              </h2>
              <p className="text-xs text-slate-500">
                Application: <span className="font-mono text-slate-800 font-bold">{app.id}</span> · {app.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {actionType === 'approve' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900">
                <p className="font-bold mb-0.5">Approval Criteria Met</p>
                <p>
                  All mandatory regulatory documents verified without unresolved discrepancy flags. Trust score of <strong>{app.trustScore}/100</strong> meets AICTE norms.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs font-serif leading-relaxed text-slate-800 space-y-2">
                <div className="text-center border-b border-slate-200 pb-2">
                  <p className="font-sans font-bold text-slate-900 uppercase">ALL INDIA COUNCIL FOR TECHNICAL EDUCATION</p>
                  <p className="font-sans text-[11px] text-slate-500">Nelson Mandela Marg, Vasant Kunj, New Delhi-110070</p>
                  <p className="font-sans font-bold text-emerald-800 text-sm mt-1">APPROVAL ORDER (ACADEMIC YEAR 2026-2027)</p>
                </div>
                <p>
                  Approval is hereby granted to <strong>{app.name}</strong> for the courses specified in their submission for Academic Year 2026-2027.
                </p>
                <p className="text-[11px] text-slate-500 font-sans">
                  Digital Reference Hash: <code className="text-slate-800 font-bold">0x992b8d41...771e</code>
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Officer Remarks (Optional):
                </label>
                <textarea
                  rows={2}
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  placeholder="e.g., Subject to regular submission of faculty EPFO contributions..."
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600"
                />
              </div>
            </div>
          )}

          {actionType === 'query' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                <p className="font-bold mb-0.5">Auto-Drafted Deficiency Notice</p>
                <p>
                  Handbook clause citations and evidence references pre-populated to save officer typing.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 space-y-2 relative">
                <button
                  onClick={() => handleCopyText(`MEMORANDUM OF DEFICIENCIES\nApplication: ${app.id}\nInstitute: ${app.name}`)}
                  className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 text-[11px] border border-slate-300"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>

                <p className="text-slate-900 font-sans font-bold">MEMORANDUM OF DEFICIENCIES</p>
                <p>To: Chairman / Secretary, {app.trustName}</p>
                <p>Institute: {app.name} ({app.id})</p>
                <div className="border-t border-slate-200 pt-2 text-slate-800 font-sans space-y-1 text-xs">
                  <p className="font-bold text-amber-800">Flagged Non-Compliances:</p>
                  {app.flags && app.flags.length > 0 ? (
                    app.flags.map((f, i) => (
                      <p key={i}>
                        {i + 1}. <strong>[{f.clause}]</strong> {f.title}: {f.description}
                      </p>
                    ))
                  ) : (
                    <p>1. <strong>[APH 2026 Cl. 2.8]</strong> Please furnish certified updated fire safety compliance verification certificate.</p>
                  )}
                  <p className="pt-2 text-slate-600">
                    Submit clarifications within <strong>7 working days</strong> through the applicant portal.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Additional Officer Instructions:
                </label>
                <textarea
                  rows={2}
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  placeholder="Specify any additional documents..."
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-amber-600"
                />
              </div>
            </div>
          )}

          {actionType === 'inspect' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-900">
                <p className="font-bold mb-0.5">Surprise Physical Inspection Order (EVC)</p>
                <p>
                  Orders an Expert Visiting Committee to conduct on-ground inspection targeting the specific discrepancy.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
                <h4 className="font-bold text-slate-900">Targeted Inspection Checklist:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>Verify actual physical boundaries and contiguous plot measurements on site.</li>
                  <li>Physical inspection of fire extinguisher pressure gauges and hydrants.</li>
                  <li>Verification of original stamped registered sale deed.</li>
                </ul>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Designated EVC Regional Officer Remarks:
                </label>
                <textarea
                  rows={2}
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  placeholder="e.g., Depute two senior civil professors from regional office..."
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          )}

          {actionType === 'escalate' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900">
                <p className="font-bold mb-0.5">Standing Hearing Committee (SHC) Escalation</p>
                <p>
                  Escalates severe forensic tampering flags, cloned QR barcodes, or duplicate entity IDs.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2 text-slate-800">
                <p><strong>Reason for Escalation:</strong> Document authenticity failure under AICTE Regulation 14.</p>
                <p className="text-rose-800 font-semibold">
                  Evidence package and tamper heatmaps forwarded to AICTE Vigilance Cell.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Escalation Note:
                </label>
                <textarea
                  rows={2}
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  placeholder="e.g., ELA heatmap shows altered municipal seal..."
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-rose-600"
                />
              </div>
            </div>
          )}

          {actionType === 'export' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900">AICTE SatyaPatra Validation Dossier</span>
                  <span className="font-mono text-emerald-800 font-bold">{app.trustScore}/100 Trust Score</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div>Application ID: <span className="text-slate-900 font-mono font-bold">{app.id}</span></div>
                  <div>Applicant: <span className="text-slate-900 font-medium">{app.name}</span></div>
                  <div>Documents: <span className="text-slate-900 font-medium">{app.documents.length}</span></div>
                  <div>Flagged Items: <span className="text-slate-900 font-medium">{app.flags?.length || 0}</span></div>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Click "Print / Save PDF" below to print or download a clean report.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors"
          >
            Cancel
          </button>

          {actionType === 'export' ? (
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center space-x-1.5 shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={isSubmitted}
              className={`px-5 py-2 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs flex items-center space-x-1.5 ${
                actionType === 'approve'
                  ? 'bg-emerald-700 hover:bg-emerald-800'
                  : actionType === 'query'
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : actionType === 'inspect'
                      ? 'bg-indigo-700 hover:bg-indigo-800'
                      : 'bg-rose-700 hover:bg-rose-800'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitted ? 'Recording in Ledger...' : 'Confirm Statutory Decision'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
