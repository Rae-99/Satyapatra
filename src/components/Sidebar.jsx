import React from 'react';
import { 
  LayoutDashboard, 
  FileCheck2, 
  UploadCloud, 
  BookOpen, 
  History, 
  ShieldCheck, 
  Globe, 
  Building2, 
  UserCheck, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { translations } from '../data/translations';

export default function Sidebar({ 
  activeMenu, 
  setActiveMenu, 
  lang, 
  setLang, 
  userRole, 
  setUserRole,
  pendingCount = 3
}) {
  const t = translations[lang] || translations.en;

  const menuItems = [
    { 
      id: 'dashboard', 
      label: lang === 'hi' ? 'डैशबोर्ड (Overview)' : 'Overview Dashboard', 
      icon: LayoutDashboard 
    },
    { 
      id: 'scrutiny', 
      label: lang === 'hi' ? 'दस्तावेज़ जाँच (Scrutiny)' : 'Application Scrutiny', 
      icon: FileCheck2,
      badge: pendingCount
    },
    { 
      id: 'upload', 
      label: lang === 'hi' ? 'दस्तावेज़ अपलोड (Upload)' : 'Upload & Pre-Check', 
      icon: UploadCloud,
      highlight: true
    },
    { 
      id: 'rulebook', 
      label: lang === 'hi' ? 'नियम पुस्तिका (Rulebook)' : 'AICTE Rulebook (2026)', 
      icon: BookOpen 
    },
    { 
      id: 'audit', 
      label: lang === 'hi' ? 'ऑडिट ट्रेल (Audit Trail)' : 'Hash-Chained Audit', 
      icon: History 
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-screen select-none">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-lg font-bold text-slate-900 tracking-tight font-sans">
                {t.appTitle}
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                AICTE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* SIH Hackathon Tag */}
        <div className="mt-3 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200/80 text-[10px] font-semibold text-amber-800 flex items-center justify-between">
          <span>SIH 2026 · PS 26261</span>
          <span className="text-amber-700 font-normal">Team Optimize Prime</span>
        </div>
      </div>

      {/* Role Switcher Chip */}
      <div className="px-4 pt-4 pb-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
          {lang === 'hi' ? 'सक्रिय पोर्टल मोड' : 'Active Portal Role'}
        </label>
        <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setUserRole('officer')}
            className={`py-1.5 px-2 rounded-md font-semibold transition-all text-center flex items-center justify-center space-x-1 ${
              userRole === 'officer'
                ? 'bg-white text-blue-900 shadow-sm border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-700" />
            <span className="truncate">Officer</span>
          </button>

          <button
            onClick={() => setUserRole('institute')}
            className={`py-1.5 px-2 rounded-md font-semibold transition-all text-center flex items-center justify-center space-x-1 ${
              userRole === 'institute'
                ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <span className="truncate">College</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 px-3 py-3 space-y-1">
        <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
          {lang === 'hi' ? 'मुख्य मेनू' : 'Main Menu'}
        </div>

        {menuItems.map((item) => {
          const isActive = activeMenu === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200/60'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Preferences: Language & Privacy Note */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/70 space-y-3">
        {/* Language Switch */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600 flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>Language</span>
          </span>
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
          >
            {lang === 'en' ? 'हिन्दी (Hindi)' : 'English'}
          </button>
        </div>

        {/* In-Memory Privacy Notice */}
        <div className="text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200 leading-snug">
          <span className="font-semibold text-slate-700 block mb-0.5">🔒 Zero-Storage Prototype</span>
          Uploaded documents are rendered in browser RAM only and never stored in any database.
        </div>
      </div>

    </aside>
  );
}
