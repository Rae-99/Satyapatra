import React, { useState } from 'react';
import { BookOpen, X, Code, CheckCircle, Sliders, Save, Info } from 'lucide-react';
import { mockRulebookRules } from '../data/mockData';

export default function RulebookModal({ isOpen, onClose }) {
  const [viewFormat, setViewFormat] = useState('card'); // 'card' or 'yaml'
  const [rules, setRules] = useState(mockRulebookRules);
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'Land & Site Norms', 'Safety & Compliance', 'Infrastructure', 'Academic & Human Resources', 'Legal & Entity'];

  const filteredRules = selectedCategory === 'All' 
    ? rules 
    : rules.filter(r => r.category === selectedCategory);

  const yamlRepresentation = `# SatyaPatra Year-Aware Rulebook Configuration
# Version: 2026.1-RELEASE
# Effective Academic Year: 2026-2027
# Source: AICTE Approval Process Handbook (APH 2026-27)

rules:
${rules.map(r => `  - id: "${r.clause}"
    title: "${r.title}"
    category: "${r.category}"
    effective_year: "${r.effectiveYear}"
    severity: "${r.severity}"
    status: "${r.status}"
    definition: "${r.definition}"
    validation_logic: "${r.validationLogic}"
`).join("\n")}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-850 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white">Year-Aware Rulebook Configuration</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/30">
                  AICTE APH 2026-27 Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Rules carry clause references and effective years; admins update them via YAML/JSON without code redeployment.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setViewFormat('card')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  viewFormat === 'card' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Cards View
              </button>
              <button
                onClick={() => setViewFormat('yaml')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  viewFormat === 'yaml' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                YAML View
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filters (in Card View) */}
        {viewFormat === 'card' && (
          <div className="px-6 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center space-x-2 overflow-x-auto scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {viewFormat === 'card' ? (
            <div className="grid grid-cols-1 gap-3.5">
              {filteredRules.map((rule, idx) => (
                <div key={idx} className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-400 block">{rule.clause}</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{rule.title}</h4>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium">
                      {rule.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                    {rule.definition}
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Validation Logic: <code className="text-emerald-400">{rule.validationLogic}</code></span>
                    <span className="text-slate-400 font-mono">Severity: <strong className="text-slate-200">{rule.severity}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative font-mono text-xs">
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 overflow-x-auto leading-relaxed">
                {yamlRepresentation}
              </pre>
            </div>
          )}

        </div>

        {/* Footer Note */}
        <div className="px-6 py-3 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-blue-400" />
            <span>AICTE Approval Process Handbook changes each year are updated here without recompiling the codebase.</span>
          </div>

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
