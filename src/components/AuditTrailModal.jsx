import React from 'react';
import { History, X, ShieldCheck, Link2, CheckCircle2, Lock } from 'lucide-react';
import { mockAuditTrail } from '../data/mockData';

export default function AuditTrailModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-850 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white">Cryptographic Hash-Chained Audit Ledger</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono border border-blue-500/30">
                  DPDP Act 2023 Compliant
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Immutable SHA-256 chained log recording every OCR extraction, rule evaluation, and officer decision.
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

        {/* Trail Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="relative border-l-2 border-slate-800 ml-4 space-y-6">
            {mockAuditTrail.map((entry, idx) => (
              <div key={entry.id} className="relative pl-6">
                
                {/* Node icon */}
                <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                </div>

                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                    <span className="font-bold text-white flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{entry.action}</span>
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">{entry.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-300">
                    {entry.details}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
                    <div className="flex items-center space-x-1">
                      <span className="text-slate-500">Actor:</span>
                      <span className="text-slate-300">{entry.actor}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500">Block: <code className="text-blue-400">{entry.blockHash.slice(0, 10)}...</code></span>
                      <Link2 className="w-3 h-3 text-slate-600" />
                      <span className="text-slate-500">Prev: <code className="text-slate-400">{entry.prevHash.slice(0, 10)}...</code></span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Audit Chain Status: <strong className="text-emerald-400">All Blocks Verified Intact</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
