import React from 'react';
import { History, ShieldCheck, Lock, Link2, CheckCircle2 } from 'lucide-react';
import { mockAuditTrail } from '../data/mockData';

export default function AuditTrailView({ lang }) {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
              Cryptographic Hash-Chained Audit Ledger
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              DPDP Act 2023 Compliant
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Immutable SHA-256 block ledger recording every OCR extraction, cross-document evaluation, and officer decision for statutory transparency.
          </p>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>All 4 Blocks Verified Intact</span>
        </div>
      </div>

      {/* Audit Blocks Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3 px-4">Block Ref</th>
                <th className="py-3 px-4">Timestamp (IST)</th>
                <th className="py-3 px-4">Action & Verified Target</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">SHA-256 Current & Previous Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockAuditTrail.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-900 whitespace-nowrap">
                    {entry.id}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {entry.timestamp}
                  </td>
                  <td className="py-3 px-4 max-w-sm">
                    <div className="font-bold text-slate-900">{entry.action}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{entry.target}</div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{entry.details}</p>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-700">
                    {entry.actor}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px]">
                    <div className="text-blue-900 font-semibold">
                      Block: {entry.blockHash.slice(0, 14)}...
                    </div>
                    <div className="text-slate-400 flex items-center space-x-1 mt-0.5">
                      <Link2 className="w-3 h-3 text-slate-400" />
                      <span>Prev: {entry.prevHash.slice(0, 14)}...</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
