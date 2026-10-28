import React from 'react';
import { 
  FileText, 
  AlertTriangle, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  UploadCloud,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function DashboardOverview({ 
  applications, 
  onSelectApplication, 
  onNavigateToUpload, 
  lang 
}) {
  const totalApps = applications.length;
  const criticalFlagsCount = applications.reduce((acc, a) => acc + (a.flags ? a.flags.length : 0), 0);
  const compliantCount = applications.filter(a => a.trustScore >= 80).length;

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            AICTE Regulatory Approval Scrutiny Dashboard
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            SatyaPatra AI Trust Layer: Pre-checking application dossiers against AICTE APH 2026-27 norms.
          </p>
        </div>

        <button
          onClick={onNavigateToUpload}
          className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-2xs self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Application Dossier</span>
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Total Dossiers</span>
            <FileText className="w-4 h-4 text-blue-700" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">{totalApps}</span>
            <span className="text-[11px] text-emerald-700 font-semibold">100% Pre-checked</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Contradictions Flagged</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-amber-700 font-mono">{criticalFlagsCount}</span>
            <span className="text-[11px] text-slate-500">Cross-Doc mismatches</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Forensic Alerts</span>
            <Layers className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-rose-700 font-mono">1</span>
            <span className="text-[11px] text-slate-500">ELA / Cloned QR</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Average Time Saved</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-xl font-bold text-emerald-700 font-mono">78%</span>
            <span className="text-[11px] text-slate-500">&lt;4.5 mins / app</span>
          </div>
        </div>

      </div>

      {/* Applications Scrutiny Queue Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Active Applications Scrutiny Queue
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click "Inspect Dossier" to open the split-screen document viewer and review extracted evidence.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            {applications.length} Applications Total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Institution Name & Location</th>
                <th className="py-3 px-4">Approval Category</th>
                <th className="py-3 px-4">Trust Score</th>
                <th className="py-3 px-4">AI Finding Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-900 whitespace-nowrap">
                    {app.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{app.name}</div>
                    <div className="text-[11px] text-slate-500">{app.location}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {app.applicantType}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">
                    <span className={app.trustScore >= 80 ? 'text-emerald-700' : app.trustScore >= 50 ? 'text-amber-700' : 'text-rose-700'}>
                      {app.trustScore}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-semibold ${
                      app.statusBadge === 'Verified' 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : app.statusBadge === 'Mismatch'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>
                      <span>{app.statusBadge}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => onSelectApplication(app.id)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg font-bold border border-blue-200 transition-colors inline-flex items-center space-x-1"
                    >
                      <span>Inspect Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
