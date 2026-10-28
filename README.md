# SatyaPatra: AI Trust Layer for AICTE Approvals
### Smart India Hackathon (SIH) 2026 — Problem Statement ID 26261
**Theme**: Smart Automation (AICTE, Ministry of Education)  
**Team**: Optimize Prime  
**Tagline**: *Pre-check · Evidence · Officer decides*

---

## 🚀 Live Prototype URL
```
http://127.0.0.1:3000/
```

To run again in future:
```bash
npm install
npm run dev
```

---

## 🌟 Prototype Features & Architecture

### 1. Pure UI/UX Prototype (No Backend, No Database)
- Built with **React 18**, **Tailwind CSS**, and **Lucide React**.
- Fast, fluid, modern governmental dashboard interface with dark-slate aesthetic.
- Zero server database or backend required; everything runs dynamically in browser memory.

### 2. In-Memory Dummy File Upload & Non-Persistent Analysis
- **Privacy Guarantee**: Any synthetic PDF, JPG, or PNG dropped into the upload area is analyzed purely in-session and is **never stored or written to disk**.
- Automatically runs a simulated 4-step AI pipeline:
  1. *Ingest & Check*
  2. *Multilingual OCR Field Extraction (PaddleOCR / Tesseract Hindi + English simulation)*
  3. *Cross-Document Entity Linker & Handbook 2026 Rules Engine*
  4. *Forensic Analysis (ELA, QR payload decode, pHash duplicate scan)*
- Generates a dynamic validation report with confidence scores, extracted key fields, and risk levels.
- A **"Load Ready-Made Sample Dossier"** button is also provided for instant testing without needing local files.

### 3. Dual-Mode Switcher
- **AICTE Scrutiny Officer Portal**:
  - Live KPI strip: Total Processed, Cross-Doc Contradictions, Forensic Tamper Flags, Avg Time Saved (<4.5 mins/app, 78% time saved).
  - Split-screen review workspace: left-hand evidence & discrepancy checklist; right-hand interactive document inspector with bounding box highlights.
  - Forensics tab with **Error Level Analysis (ELA) Heatmap simulation** to detect digitally inpainted seals and Photoshop tampering.
  - **Cryptographic QR Code Inspector** comparing encoded payload against printed visual text.
  - **Officer Action Bar**: Approve Application, Issue Auto-Drafted Deficiency Notice (with Handbook clause citations), Order Surprise Physical Inspection (EVC), Escalate to Hearing Committee, and Export Validation Report.
- **Institution Pre-Submission Portal**:
  - Allows technical institutes to run self-checks before official submission.
  - Category selector: Extension of Approval (EoA), New Campus, Course/Intake Addition.
  - Instant pre-check warnings to prevent delays and repeat queries.

### 4. Three Pre-Configured SIH Test Cases
1. **Case 1: Fully Compliant Institution** (*Apex Institute of Tech* - 95/100 Trust Score, All docs verified via DigiLocker / Land Registry).
2. **Case 2: Land Discrepancy & Expired NOC** (*Bharati College of Engg* - 56/100 Trust Score, Land Deed 4.25 Ac vs Plan 5.50 Ac, Fire NOC expired Jan 2025).
3. **Case 3: Forensic Alteration & Cloned QR** (*National Polytechnic* - 38/100 Trust Score, ELA detected Photoshop seal alteration, QR payload belongs to an unrelated school).

### 5. Year-Aware Rulebook (APH 2026-27 Config)
- Demonstrates how AICTE handbook clauses (Clause 1.4 Land Norms, Clause 2.8 Fire Safety, Clause 4.1 Cadre Ratio) are stored as decoupled YAML/JSON rules without modifying application code.

### 6. Hash-Chained Audit Trail
- Demonstrates immutable SHA-256 block ledger logging every OCR extraction, rule evaluation, and officer decision for statutory transparency (DPDP Act 2023 compliant).

### 7. Bilingual Support
- Instant toggle between **English** and **हिन्दी (Hindi)** across headers, badges, statuses, and summaries.
