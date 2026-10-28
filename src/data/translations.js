export const translations = {
  en: {
    appTitle: "SatyaPatra",
    appSubtitle: "AI Trust Layer for AICTE Approvals",
    tagline: "Pre-check · Evidence · Officer decides",
    sihBadge: "SIH 2026 | PS ID: 26261 | MoE & AICTE",
    teamName: "Team Optimize Prime",
    
    // Navigation
    navOfficer: "Scrutiny Officer Portal",
    navInstitute: "Institute Pre-Submission Portal",
    navRulebook: "Year-Aware Rulebook (2026-27)",
    navAudit: "Hash-Chained Audit Trail",
    langToggle: "हिन्दी",
    
    // Statuses
    statusVerified: "Verified",
    statusMismatch: "Mismatch",
    statusExpired: "Expired",
    statusPending: "Verification Pending",
    statusUnavailable: "Source Unavailable",
    statusManual: "Manual Review",
    statusTampered: "Suspected Tamper",
    
    // Dashboard Stats
    kpiTotalChecked: "Applications Processed",
    kpiFlaggedMismatch: "Cross-Doc Contradictions",
    kpiForensicAlerts: "Forensic / Tamper Flags",
    kpiTimeSaved: "Average Scrutiny Time Saved",
    kpiTimeSavedVal: "78% (<4.5 mins / app)",
    
    // Case Selection
    presetCases: "Select Demo Scenario",
    case1Title: "Case 1: Fully Compliant Institution",
    case1Desc: "Apex Institute of Tech - All documents valid, 100% cross-verified, DigiLocker verified.",
    case2Title: "Case 2: Land Area Mismatch & Expired NOC",
    case2Desc: "Bharati College of Engg - Land Deed (4.25 Ac) vs Master Plan (5.50 Ac), Fire NOC expired Jan 2025.",
    case3Title: "Case 3: Forensic Tamper & Reused Entity ID",
    case3Desc: "National Polytechnic - ELA compression anomaly on seal, QR mismatch, Society ID reused.",
    customCaseTitle: "Dynamic Dummy File Analysis",
    customCaseDesc: "Simulated real-time analysis of in-memory files without backend storage.",
    
    // Report & Tabs
    tabChecklist: "Auto-Checklist & Rules",
    tabCrossDoc: "Cross-Document Comparison",
    tabForensics: "Forensic & Authenticity Proof",
    tabIssuer: "Issuer & DigiLocker Verifications",
    tabInfra: "Phase 3: Infra & Floor Plan Vision",
    
    // Viewer
    docViewerTitle: "Evidence-Linked Document Inspector",
    highlightText: "AI Detected Anomaly & Bounding Box",
    compareDocs: "Compare with Source Document",
    elaHeatmapToggle: "Forensic ELA Heatmap View",
    originalScanToggle: "Original Clean Scan",
    
    // Actions
    btnApprove: "Approve Application",
    btnQuery: "Issue Query / Clarification",
    btnInspect: "Refer to Surprise Physical Inspection",
    btnEscalate: "Escalate to Scrutiny Committee",
    btnExport: "Export Validation Report (PDF)",
    btnUploadNew: "Upload New Dummy Application",
    
    // Officer notice
    decisionRuleText: "Decision Rule: AI flags → Evidence shown → Officer decides. Critical flags require officer acknowledgement; the algorithm never auto-rejects.",
    trustScoreLabel: "Explainable Trust Score",
    trustScoreExplain: "Calculated based on 28 Handbook rules, cross-field integrity, and digital provenance.",
  },
  
  hi: {
    appTitle: "सत्यपात्र",
    appSubtitle: "एआईसीटीई अनुमोदन हेतु एआई विश्वास प्रणाली",
    tagline: "पूर्व-जाँच · साक्ष्य · अधिकारी निर्णय",
    sihBadge: "एसआईएच 2026 | समस्या आईडी: 26261 | शिक्षा मंत्रालय एवं एआईसीटीई",
    teamName: "टीम ऑप्टिमाइज़ प्राइम",
    
    // Navigation
    navOfficer: "जाँच अधिकारी पोर्टल (Officer)",
    navInstitute: "संस्थान पूर्व-जमा पोर्टल (Self-Check)",
    navRulebook: "हैंडबुक नियम पुस्तिका (2026-27)",
    navAudit: "हैश-चेन्ड ऑडिट ट्रेल",
    langToggle: "English",
    
    // Statuses
    statusVerified: "सत्यापित (Verified)",
    statusMismatch: "विसंगति / बेमेल (Mismatch)",
    statusExpired: "समाप्त (Expired)",
    statusPending: "सत्यापन लंबित (Pending)",
    statusUnavailable: "स्रोत अनुपलब्ध (Unavailable)",
    statusManual: "मैनुअल समीक्षा (Manual Review)",
    statusTampered: "संदिग्ध छेड़छाड़ (Tampered)",
    
    // Dashboard Stats
    kpiTotalChecked: "कुल जांचे गए आवेदन",
    kpiFlaggedMismatch: "दस्तावेज़ों में विसंगतियां",
    kpiForensicAlerts: "फॉरेंसिक छेड़छाड़ अलर्ट",
    kpiTimeSaved: "औसत समय बचत",
    kpiTimeSavedVal: "78% (<4.5 मिनट / आवेदन)",
    
    // Case Selection
    presetCases: "डेमो परिदृश्य चुनें",
    case1Title: "केस 1: पूर्णतः अनुपालित संस्थान",
    case1Desc: "शीर्ष प्रौद्योगिकी संस्थान - सभी दस्तावेज़ वैध, 100% मिलान, डिजीलॉकर सत्यापित।",
    case2Title: "केस 2: भूमि क्षेत्रफल विसंगति व समाप्त एनओसी",
    case2Desc: "भारती कॉलेज - भूमि विलेख (4.25 एकड़) बनाम मास्टर प्लान (5.50 एकड़), अग्नि एनओसी समाप्त।",
    case3Title: "केस 3: संदिग्ध डिजिटल छेड़छाड़ व पुनः प्रयुक्त आईडी",
    case3Desc: "नेशनल पॉलिटेक्निक - ईएलए संपीड़न विसंगति, क्यूआर कोड बेमेल, संस्था आईडी डुप्लीकेट।",
    customCaseTitle: "गतिशील डमी फ़ाइल विश्लेषण",
    customCaseDesc: "बिना बैकएंड स्टोरेज के रीयल-टाइम इन-मेमोरी फ़ाइल विश्लेषण।",
    
    // Report & Tabs
    tabChecklist: "ऑटो-चेकलिस्ट व नियम",
    tabCrossDoc: "अंतर-दस्तावेज़ तुलना (Cross-Doc)",
    tabForensics: "फॉरेंसिक व प्रमाणिकता साक्ष्य",
    tabIssuer: "निर्गमक व डिजीलॉकर सत्यापन",
    tabInfra: "चरण 3: अधोसंरचना व फ्लोर प्लान",
    
    // Viewer
    docViewerTitle: "साक्ष्य-संबद्ध दस्तावेज़ निरीक्षक",
    highlightText: "एआई द्वारा खोजी गई विसंगति",
    compareDocs: "मूल संदर्भ दस्तावेज़ से तुलना करें",
    elaHeatmapToggle: "फॉरेंसिक ईएलए हीटमैप दृश्य",
    originalScanToggle: "मूल स्कैन दृश्य",
    
    // Actions
    btnApprove: "आवेदन स्वीकृत करें (Approve)",
    btnQuery: "स्पष्टीकरण सूचना जारी करें (Query)",
    btnInspect: "भौतिक निरीक्षण हेतु भेजें (Inspection)",
    btnEscalate: "समिति को अग्रेषित करें (Escalate)",
    btnExport: "सत्यापन रिपोर्ट डाउनलोड करें",
    btnUploadNew: "नया डमी आवेदन अपलोड करें",
    
    // Officer notice
    decisionRuleText: "निर्णय नियम: एआई साक्ष्य प्रस्तुत करता है → अधिकारी निर्णय लेता है। गंभीर विसंगतियां केवल समीक्षा हेतु हैं; एआई कभी स्वतः अस्वीकृत नहीं करता।",
    trustScoreLabel: "स्पष्ट व्याख्यायित विश्वास स्कोर (Trust Score)",
    trustScoreExplain: "28 हैंडबुक नियमों, दस्तावेज़ अखंडता और डिजिटल उत्पत्ति पर आधारित।",
  }
};
