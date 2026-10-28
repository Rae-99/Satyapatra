import React from 'react';
import { ShieldCheck, BookOpen, History, Globe, UploadCloud, UserCheck, Sparkles, Building2 } from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({ 
  currentMode, 
  setCurrentMode, 
  lang, 
  setLang, 
  onOpenRulebook, 
  onOpenAudit,
  onOpenUpload
}) {
  const t = translations[lang];

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Branding */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-400 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-sky-400" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  {t.appTitle}
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  SIH 2026 #26261
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="hidden md:flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shadow-inner">
            <button
              onClick={() => setCurrentMode('officer')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentMode === 'officer'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t.navOfficer}</span>
            </button>

            <button
              onClick={() => setCurrentMode('institute')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentMode === 'institute'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t.navInstitute}</span>
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Upload Button */}
            <button
              onClick={onOpenUpload}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500 transition-all shadow-md shadow-sky-500/20 active:scale-95"
              title="Test in-memory dummy files without storage"
            >
              <UploadCloud className="w-4 h-4" />
              <span className="hidden sm:inline">Dummy Upload</span>
            </button>

            {/* Rulebook Modal Trigger */}
            <button
              onClick={onOpenRulebook}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/50 transition-colors"
              title="View Year-Aware Rulebook (AICTE Handbook 2026-27)"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
            </button>

            {/* Audit Trail Modal Trigger */}
            <button
              onClick={onOpenAudit}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/50 transition-colors"
              title="View Hash-Chained Audit Log"
            >
              <History className="w-4 h-4 text-emerald-400" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-all"
              title="Toggle English / हिन्दी"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.langToggle}</span>
            </button>
          </div>

        </div>
        
        {/* Mobile View Mode Switcher */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800/80">
          <button
            onClick={() => setCurrentMode('officer')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium ${
              currentMode === 'officer' ? 'bg-blue-600 text-white' : 'text-slate-400'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Officer Portal</span>
          </button>
          <button
            onClick={() => setCurrentMode('institute')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium ${
              currentMode === 'institute' ? 'bg-emerald-600 text-white' : 'text-slate-400'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Institute Portal</span>
          </button>
        </div>
      </div>
    </header>
  );
}
