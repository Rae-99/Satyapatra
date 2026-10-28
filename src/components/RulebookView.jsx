import React, { useState } from 'react';
import { BookOpen, Search, Code, CheckCircle, Info, Sliders } from 'lucide-react';
import { mockRulebookRules } from '../data/mockData';

export default function RulebookView({ lang }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewFormat, setViewFormat] = useState('table'); // 'table' or 'yaml'

  const categories = ['All', 'Land & Site Norms', 'Safety & Compliance', 'Infrastructure', 'Academic & Human Resources', 'Legal & Entity'];

  const filteredRules = mockRulebookRules.filter(r => {
    const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.clause.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.definition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const yamlConfig = `# AICTE Approval Process Handbook (APH) 2026-27 Rulebook
# Schema: Version 2026.1-RELEASE
# Effective Cycle: 2026-2027 Academic Year

rules:
${filteredRules.map(r => `  - id: "${r.clause}"
    category: "${r.category}"
    title: "${r.title}"
    severity: "${r.severity}"
    status: "${r.status}"
    definition: "${r.definition}"
    validation_logic: "${r.validationLogic}"
`).join("\n")}`;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
              AICTE Approval Process Handbook (APH 2026-27) Rulebook
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
              Active Config
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Year-aware rulebook as configuration: rules carry clause references and effective years, updated without code modifications.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-200/80 p-0.5 rounded-lg border border-slate-300 text-xs">
          <button
            onClick={() => setViewFormat('table')}
            className={`px-3 py-1 rounded font-semibold transition-colors ${
              viewFormat === 'table' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Table View
          </button>
          <button
            onClick={() => setViewFormat('yaml')}
            className={`px-3 py-1 rounded font-semibold transition-colors ${
              viewFormat === 'yaml' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            YAML Config
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full sm:w-72 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search clause or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-100 text-blue-900 border border-blue-300'
                  : 'text-slate-600 hover:bg-slate-100 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {viewFormat === 'table' ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="py-3 px-4">Clause Reference</th>
                  <th className="py-3 px-4">Rule Title & Category</th>
                  <th className="py-3 px-4">Handbook Statutory Norm</th>
                  <th className="py-3 px-4">Validation Engine Logic</th>
                  <th className="py-3 px-4">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRules.map((rule, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-900 whitespace-nowrap">
                      {rule.clause}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{rule.title}</div>
                      <div className="text-[11px] text-slate-500">{rule.category}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 max-w-xs leading-relaxed">
                      {rule.definition}
                    </td>
                    <td className="py-3 px-4">
                      <code className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono text-[11px] block max-w-xs">
                        {rule.validationLogic}
                      </code>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {rule.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
            {yamlConfig}
          </pre>
        </div>
      )}

      {/* Note */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center space-x-2">
        <Info className="w-4 h-4 text-blue-700 shrink-0" />
        <span>
          Handbook rules are updated annually by AICTE administrators without needing to rebuild or deploy frontend code.
        </span>
      </div>

    </div>
  );
}
