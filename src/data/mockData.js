export const initialApplications = [
  {
    id: "AICTE-2026-MP-08942",
    name: "Apex Institute of Technology & Management",
    location: "Bhopal, Madhya Pradesh",
    applicantType: "Extension of Approval (EoA) & New Course (AI & DS)",
    trustName: "Apex Shiksha Prasar Samiti (Reg: MP-BPL-2004-981)",
    submissionDate: "2026-03-12",
    trustScore: 95,
    statusSummary: "Clean Compliant",
    statusBadge: "Verified",
    riskLevel: "Low",
    officerDecision: "Pending",
    officerNotes: "",
    documents: [
      {
        id: "doc-1",
        name: "Registered Land Title Deed (Khasra 412/1, 412/2)",
        type: "Land Deed",
        pages: 4,
        status: "Verified",
        confidence: "98.7%",
        issuerStatus: "Verified via MP Bhulekh Land Registry API (Ref: MPBL-99214)",
        extractedFields: [
          { label: "Total Contiguous Area", value: "5.25 Acres", confidence: "99.1%", status: "Verified", clause: "APH 2026 Cl. 1.4 (Min 5.0 Ac required)" },
          { label: "Title Ownership", value: "Apex Shiksha Prasar Samiti", confidence: "98.5%", status: "Verified", clause: "APH 2026 Cl. 1.2" },
          { label: "Land Category", value: "Institutional / Non-Agricultural", confidence: "97.8%", status: "Verified", clause: "APH 2026 Cl. 1.5" }
        ],
        highlightBbox: { page: 1, top: "28%", left: "15%", width: "70%", height: "14%", label: "Land Area: 5.25 Acres (Matches Application Form)" },
        tamperScore: "0.02 (Clean)",
        qrPayload: "MPBL-REG-2004-412: Apex Shiksha Prasar: Area 5.25 Acres",
        digitalSigner: "Sub-Registrar Huzur, Bhopal (Valid Class 3 DSC)"
      },
      {
        id: "doc-2",
        name: "Municipal Building Sanction & Completion Plan",
        type: "Building Plan",
        pages: 3,
        status: "Verified",
        confidence: "96.4%",
        issuerStatus: "Verified via Bhopal Municipal Corporation e-NagarPalika",
        extractedFields: [
          { label: "Total Built-Up Area", value: "14,850 sq. meters", confidence: "96.8%", status: "Verified", clause: "APH 2026 Cl. 2.1" },
          { label: "Carpet Area (Instructional)", value: "8,920 sq. meters", confidence: "95.9%", status: "Verified", clause: "APH 2026 Cl. 2.3" },
          { label: "Architect Reg. No.", value: "COA/2011/51294 (Active)", confidence: "98.0%", status: "Verified", clause: "Council of Architecture Verified" }
        ],
        highlightBbox: { page: 2, top: "42%", left: "12%", width: "76%", height: "16%", label: "Built-up Area: 14,850 sqm - Fully compliant with AICTE norms" },
        tamperScore: "0.01 (Clean)",
        qrPayload: "BMC-BP-2025-10492: Approved Plan",
        digitalSigner: "Chief Town Planner, BMC"
      },
      {
        id: "doc-3",
        name: "Fire & Emergency Services Safety NOC",
        type: "Fire NOC",
        pages: 2,
        status: "Verified",
        confidence: "99.2%",
        issuerStatus: "DigiLocker Authority Channel Verified",
        extractedFields: [
          { label: "Issuance Date", value: "15-Nov-2025", confidence: "99.4%", status: "Verified", clause: "APH 2026 Cl. 2.8" },
          { label: "Validity Till", value: "14-Nov-2028 (Active)", confidence: "99.1%", status: "Verified", clause: "Valid for Academic Year 2026-27" },
          { label: "Hydrant & Alarm System", value: "Functional - Class B Compliance", confidence: "97.5%", status: "Verified", clause: "National Building Code 2016" }
        ],
        highlightBbox: { page: 1, top: "60%", left: "18%", width: "65%", height: "12%", label: "Valid through Nov 2028 (Meets 3-Year EoA Rule)" },
        tamperScore: "0.00 (Clean)",
        qrPayload: "FIRE-MP-2025-99881: Apex Institute: Valid 2025-2028",
        digitalSigner: "Divisional Fire Officer, Bhopal"
      },
      {
        id: "doc-4",
        name: "Society / Trust Registration & Bylaws",
        type: "Trust Certificate",
        pages: 6,
        status: "Verified",
        confidence: "97.9%",
        issuerStatus: "Verified via Registrar of Societies MP",
        extractedFields: [
          { label: "Registration No.", value: "MP-BPL-2004-981", confidence: "99.0%", status: "Verified", clause: "APH 2026 Cl. 5.1" },
          { label: "Mandate", value: "Higher Technical Education & Research", confidence: "96.4%", status: "Verified", clause: "Eligible for Engineering degree" },
          { label: "PAN / Entity Link", value: "AAATA4910M (No active disputes)", confidence: "98.2%", status: "Verified", clause: "Income Tax Exempt 12A/80G" }
        ],
        highlightBbox: { page: 1, top: "35%", left: "20%", width: "60%", height: "15%", label: "Society Mandate Confirmed for Technical Institutes" },
        tamperScore: "0.03 (Clean)",
        qrPayload: "ROCS-MP-2004-981: Registered 14-Aug-2004",
        digitalSigner: "Registrar of Societies, MP"
      }
    ],
    crossDocChecks: [
      {
        fact: "Contiguous Land Area",
        status: "Verified",
        docA: { name: "Land Title Deed", value: "5.25 Acres (Pg 1)", score: 99 },
        docB: { name: "Architect Master Plan", value: "5.25 Acres (Pg 2)", score: 97 },
        docC: { name: "Application Portal Claim", value: "5.25 Acres", score: 100 },
        verdict: "Perfect match across all 3 declarations. Exceeds APH 2026 urban requirement of 5.00 Acres."
      },
      {
        fact: "Trust Entity Name & Registration ID",
        status: "Verified",
        docA: { name: "Society Certificate", value: "Apex Shiksha Prasar Samiti [MP-BPL-2004-981]", score: 99 },
        docB: { name: "Land Title Deed", value: "Apex Shiksha Prasar Samiti [MP-BPL-2004-981]", score: 98 },
        docC: { name: "Bank Guarantee Account", value: "Apex Shiksha Prasar Samiti", score: 99 },
        verdict: "Zero discrepancy in legal trust name and spelling across all submissions."
      },
      {
        fact: "Principal & Cadre Faculty Ratio",
        status: "Verified",
        docA: { name: "Faculty Roster Form", value: "1:18.2 Ratio (Exceeds 1:20 norm)", score: 96 },
        docB: { name: "EPF Challan Receipts", value: "94 Faculty verified via EPFO API", score: 95 },
        docC: { name: "Salary Bank Stamped Sheet", value: "100% RTGS transfers confirmed", score: 94 },
        verdict: "Complies with APH 2026 Cadre requirement: 1 Professor, 2 Associate, 6 Assistant per department."
      }
    ],
    authenticityForensics: [
      { check: "Error Level Analysis (ELA)", result: "Negative", detail: "Uniform quantization levels; zero compression divergence around seals & signatures." },
      { check: "QR Code Integrity", result: "Valid Match", detail: "Scanned QR decoded text matches printed text cryptographically." },
      { check: "PDF Metadata & Toolchain", result: "Consistent", detail: "Rendered via Government Portal PDF Engine; no post-scan editing tools detected." },
      { check: "Perceptual Hash Duplicate Check", result: "Unique", detail: "Document pHash has zero collisions in AICTE nationwide document vault." }
    ],
    flags: []
  },

  {
    id: "AICTE-2026-MH-04118",
    name: "Bharati College of Engineering & Research",
    location: "Pune, Maharashtra",
    applicantType: "New Institute Establishment",
    trustName: "Bharati Vidya Vikas Pratishthan",
    submissionDate: "2026-03-10",
    trustScore: 56,
    statusSummary: "Critical Discrepancy & Expired NOC",
    statusBadge: "Mismatch",
    riskLevel: "High",
    officerDecision: "Pending",
    officerNotes: "",
    documents: [
      {
        id: "doc-1",
        name: "Registered Sale Deed / Lease Agreement",
        type: "Land Deed",
        pages: 5,
        status: "Mismatch",
        confidence: "97.4%",
        issuerStatus: "Verified via Maharashtra IGR Portal",
        extractedFields: [
          { label: "Total Contiguous Area", value: "4.25 Acres", confidence: "98.9%", status: "Mismatch", clause: "APH 2026 Cl. 1.4 (Requires 5.00 Ac in Urban / Metro)" },
          { label: "Lease Period Remaining", value: "34 Years", confidence: "96.5%", status: "Verified", clause: "APH 2026 Cl. 1.3 (Min 30 yrs needed)" },
          { label: "Survey Number", value: "Survey No. 89/2A, Haveli, Pune", confidence: "98.1%", status: "Verified", clause: "Location verified" }
        ],
        highlightBbox: { page: 2, top: "34%", left: "14%", width: "72%", height: "15%", label: "Land Deed Page 2: 'Total Plot Area measuring 4.25 Acres only'" },
        tamperScore: "0.04 (Clean)",
        qrPayload: "MAHA-IGR-2018-091244: Bharati Pratishthan: 4.25 Acres",
        digitalSigner: "Sub-Registrar Haveli 4, Pune"
      },
      {
        id: "doc-2",
        name: "Proposed Campus Master Layout & Building Plan",
        type: "Building Plan",
        pages: 4,
        status: "Mismatch",
        confidence: "94.2%",
        issuerStatus: "Manual Review Queue (PMC Portal Timeout)",
        extractedFields: [
          { label: "Site Area Declared in Plan", value: "5.50 Acres", confidence: "96.2%", status: "Mismatch", clause: "Contradicts Land Deed (4.25 Ac)" },
          { label: "Total Proposed Built-Up Area", value: "11,200 sq. meters", confidence: "93.8%", status: "Verified", clause: "APH 2026 Norms" },
          { label: "Sanction Reference", value: "PMC/BP/TEMP/2026/049", confidence: "91.0%", status: "Manual Review", clause: "Only provisional layout, final missing" }
        ],
        highlightBbox: { page: 1, top: "25%", left: "20%", width: "65%", height: "18%", label: "Master Plan Header: Declared Site Area = 5.50 Acres (+1.25 Ac disparity!)" },
        tamperScore: "0.05 (Normal)",
        qrPayload: "PMC-LAYOUT-DRAFT-2026",
        digitalSigner: "Architect Council Reg 2008/4122"
      },
      {
        id: "doc-3",
        name: "Fire Safety Certificate / No-Objection Certificate",
        type: "Fire NOC",
        pages: 2,
        status: "Expired",
        confidence: "99.1%",
        issuerStatus: "Verified via MahaFire Portal (Expired Status)",
        extractedFields: [
          { label: "Issuance Date", value: "15-Jan-2022", confidence: "99.2%", status: "Verified", clause: "Historical record" },
          { label: "Validity Till", value: "14-Jan-2025 [EXPIRED]", confidence: "99.8%", status: "Expired", clause: "APH 2026 Cl. 2.8 (MANDATORY current NOC required)" },
          { label: "Building Height Authorized", value: "14.5 meters (G+3)", confidence: "96.4%", status: "Verified", clause: "NBC 2016 standard" }
        ],
        highlightBbox: { page: 1, top: "52%", left: "15%", width: "70%", height: "14%", label: "VALIDITY LAPSED: 14-Jan-2025. Over 14 months past expiration!" },
        tamperScore: "0.02 (Clean)",
        qrPayload: "PUNE-FIRE-NOC-2022-8182: Valid until 14-01-2025",
        digitalSigner: "Chief Fire Officer, Pune Fire Brigade"
      },
      {
        id: "doc-4",
        name: "Municipal Water Supply & Sewerage Clearance",
        type: "Water & Sewerage NOC",
        pages: 1,
        status: "Verification Pending",
        confidence: "91.3%",
        issuerStatus: "Source Unavailable (Municipal Water Portal HTTP 503)",
        extractedFields: [
          { label: "NOC Ref No.", value: "PMC-WTR-2025-9921", confidence: "92.1%", status: "Verification Pending", clause: "APH 2026 Cl. 2.11" },
          { label: "Daily Supply Quota", value: "45,000 Liters/day", confidence: "90.5%", status: "Verified", clause: "Hostel capacity requirement" }
        ],
        highlightBbox: { page: 1, top: "40%", left: "20%", width: "60%", height: "15%", label: "Issuer API did not respond. Routed to Scrutiny Officer manual queue." },
        tamperScore: "0.03 (Clean)",
        qrPayload: "N/A",
        digitalSigner: "Executive Engineer, PMC"
      }
    ],
    crossDocChecks: [
      {
        fact: "Contiguous Land Area Contradiction",
        status: "Mismatch",
        docA: { name: "Land Title Deed (Page 2)", value: "4.25 Acres", score: 98 },
        docB: { name: "Architect Building Plan (Page 1)", value: "5.50 Acres", score: 96 },
        docC: { name: "Portal Application Form", value: "5.50 Acres", score: 100 },
        verdict: "CRITICAL MISMATCH: Land Deed shows only 4.25 Acres, which falls short of the AICTE 5.00 Acre urban mandate and contradicts the 5.50 Acre architectural drawings."
      },
      {
        fact: "Fire Safety Certificate Validity",
        status: "Expired",
        docA: { name: "Uploaded Fire NOC", value: "Expired 14-Jan-2025", score: 99 },
        docB: { name: "Current Academic Year", value: "2026-27 Requirement", score: 100 },
        docC: { name: "MahaFire Online Status", value: "Renewal not found", score: 97 },
        verdict: "EXPIRED: Applicant submitted an expired certificate without providing a renewal application token or temporary extension."
      }
    ],
    authenticityForensics: [
      { check: "Error Level Analysis (ELA)", result: "Negative", detail: "No image compression manipulation observed on scans." },
      { check: "QR Code Integrity", result: "Valid Match", detail: "Fire NOC QR correctly reveals expired 2022 issuance date." },
      { check: "Document Freshness Check", result: "Failed", detail: "NOC expired >400 days prior to submission date." }
    ],
    flags: [
      {
        id: "FLG-MH-01",
        severity: "Critical",
        category: "Cross-Document Mismatch",
        clause: "APH 2026-27 Clause 1.4.2",
        title: "Land Area Discrepancy (4.25 Ac deed vs 5.50 Ac plan)",
        description: "Registered sale deed confirms ownership of 4.25 Acres, whereas the submitted site plan and portal form claim 5.50 Acres. Shortfall of 0.75 Acres below AICTE minimum urban threshold (5.00 Acres).",
        evidenceLocation: "Land Deed Pg 2 vs Building Plan Pg 1",
        officerStatus: "Pending Review"
      },
      {
        id: "FLG-MH-02",
        severity: "Critical",
        category: "Expired Regulatory Mandatory Document",
        clause: "APH 2026-27 Clause 2.8.1",
        title: "Fire Safety NOC Expired on 14-Jan-2025",
        description: "Fire safety approval expired over 14 months ago. AICTE norms strictly forbid opening new technical campuses without live active life-safety certification.",
        evidenceLocation: "Fire NOC Pg 1, Clause 3",
        officerStatus: "Pending Review"
      },
      {
        id: "FLG-MH-03",
        severity: "Medium",
        category: "Issuer API Unreachable",
        clause: "APH 2026-27 Clause 2.11",
        title: "Water & Sewerage NOC Unverified (Source Unavailable)",
        description: "Municipal server timed out. Officer must verify PMC-WTR-2025-9921 via secondary verification channel or request applicant confirmation.",
        evidenceLocation: "Water NOC Pg 1",
        officerStatus: "Pending Review"
      }
    ]
  },

  {
    id: "AICTE-2026-UP-11903",
    name: "National Polytechnic & Technical Campus",
    location: "Lucknow, Uttar Pradesh",
    applicantType: "Increase in Intake & New Diploma Programs",
    trustName: "Navjyoti Educational Foundation",
    submissionDate: "2026-03-08",
    trustScore: 38,
    statusSummary: "Forensic Alteration & Reused Entity ID",
    statusBadge: "Suspected Tamper",
    riskLevel: "Critical",
    officerDecision: "Pending",
    officerNotes: "",
    documents: [
      {
        id: "doc-1",
        name: "Town Planning Sanction Order & Approved Plan",
        type: "Building Sanction",
        pages: 3,
        status: "Suspected Tamper",
        confidence: "88.2%",
        issuerStatus: "Issuer record does not match submitted stamp",
        extractedFields: [
          { label: "Sanction Number", value: "LDA/BP/2024/7710", confidence: "89.4%", status: "Suspected Tamper", clause: "LDA Master Registry mismatch" },
          { label: "Approved Floor Area", value: "18,400 sq. meters", confidence: "87.0%", status: "Suspected Tamper", clause: "Altered digit '1' detected in OCR" },
          { label: "Sanctioning Officer", value: "Chief Town Planner, LDA", confidence: "86.1%", status: "Manual Review", clause: "Signature forensic divergence" }
        ],
        highlightBbox: { page: 3, top: "48%", left: "18%", width: "68%", height: "22%", label: "FORENSIC ALERT: High ELA error rate on seal stamp (Pixel compression anomaly detected)" },
        tamperScore: "0.89 (High Probability of Forgery)",
        qrPayload: "TAMPER-MISMATCH",
        digitalSigner: "None (Raw Scan with Post-Scan Layer Injection)"
      },
      {
        id: "doc-2",
        name: "Fire Safety Clearance Certificate",
        type: "Fire NOC",
        pages: 2,
        status: "Suspected Tamper",
        confidence: "91.0%",
        issuerStatus: "DigiLocker QR Hash Check Failed",
        extractedFields: [
          { label: "Printed Certificate No.", value: "UP-FIRE-2025-4412", confidence: "96.0%", status: "Suspected Tamper", clause: "Contradicts QR barcode content" },
          { label: "QR Encoded Value", value: "UP-FIRE-2021-0091 (Sunrise Commerce)", confidence: "99.9%", status: "Suspected Tamper", clause: "QR belongs to another educational entity!" },
          { label: "Validity Shown", value: "Valid till 2028", confidence: "89.0%", status: "Suspected Tamper", clause: "Text replaced over original 2022 date" }
        ],
        highlightBbox: { page: 1, top: "20%", left: "12%", width: "76%", height: "20%", label: "QR CODE DECODE MISMATCH: Embedded payload belongs to 'Sunrise School of Commerce'" },
        tamperScore: "0.94 (Cloned QR Barcode Detected)",
        qrPayload: "UP-FIRE-2021-0091 (Belongs to: Sunrise School of Commerce, Varanasi)",
        digitalSigner: "Invalidated / Certificate Hash Mismatch"
      },
      {
        id: "doc-3",
        name: "Society / Trust Registration Certificate",
        type: "Trust Certificate",
        pages: 4,
        status: "Mismatch",
        confidence: "95.5%",
        issuerStatus: "Reused Identity in AICTE Cross-System Entity Graph",
        extractedFields: [
          { label: "Society Registration ID", value: "SOC-88912/2012", confidence: "98.7%", status: "Mismatch", clause: "APH 2026 Cl. 5.3" },
          { label: "Entity Link Database", value: "Found 2 Active Applications with same ID", confidence: "99.0%", status: "Mismatch", clause: "Flagged under Multi-Institute Fraud Detection" },
          { label: "Trustee President", value: "R. K. Srivastava", confidence: "97.0%", status: "Verified", clause: "Identity record confirmed" }
        ],
        highlightBbox: { page: 1, top: "30%", left: "15%", width: "70%", height: "16%", label: "ENTITY GRAPH CONFLICT: Society Registration ID actively linked to de-affiliated campus" },
        tamperScore: "0.12 (Normal scan, but semantic fraud)",
        qrPayload: "UP-REG-2012-88912",
        digitalSigner: "Registrar Firms Societies & Chits Lucknow"
      }
    ],
    crossDocChecks: [
      {
        fact: "QR Code vs Printed Text Authenticity",
        status: "Suspected Tamper",
        docA: { name: "Printed Text on NOC", value: "UP-FIRE-2025-4412 (National Polytechnic)", score: 96 },
        docB: { name: "Decoded Cryptographic QR", value: "UP-FIRE-2021-0091 (Sunrise School)", score: 100 },
        docC: { name: "DigiLocker Issuer Vault", value: "Cert UP-FIRE-2025-4412 does NOT exist", score: 99 },
        verdict: "FORGERY ALERT: The QR code was copy-pasted from an unrelated 2021 certificate for 'Sunrise School of Commerce', while the printed text was edited to pretend it belongs to this applicant."
      },
      {
        fact: "Cross-Application Trust ID Duplication",
        status: "Mismatch",
        docA: { name: "Current Application ID", value: "AICTE-2026-UP-11903 (Trust: SOC-88912/2012)", score: 99 },
        docB: { name: "AICTE Nationwide Entity Graph", value: "Same Society ID registered to campus in Varanasi (Closed 2023)", score: 98 },
        docC: { name: "PAN Card Reference", value: "Same PAN used across 2 conflicting applications", score: 99 },
        verdict: "IDENTITY LINK ALERT: Entity ID SOC-88912/2012 was previously associated with an institution facing penalty proceedings in 2023."
      }
    ],
    authenticityForensics: [
      { check: "Error Level Analysis (ELA)", result: "Tampered Text Detected", detail: "ELA shows strong luminance disparity in the municipal sanction box (approx 34dB difference). Indicates composite digital pasting." },
      { check: "QR Code Cryptographic Hash", result: "Payload Identity Mismatch", detail: "Payload ID 'UP-FIRE-2021-0091' doesn't match printed text 'UP-FIRE-2025-4412'." },
      { check: "PDF Exif & Producer Metadata", result: "Suspicious", detail: "Document produced using Adobe Photoshop CC 2023 rather than government scanner firmware." },
      { check: "Font Glyph Kerning Variance", result: "Anomalous", detail: "Numerical digit '1' in '18,400 sqm' has differing font baseline and pixel blur compared to surrounding text." }
    ],
    flags: [
      {
        id: "FLG-UP-01",
        severity: "Critical",
        category: "Suspected Digital Document Forgery",
        clause: "APH 2026-27 Regulation 14 & IPC Sec 468",
        title: "Cloned QR Code on Fire Safety Clearance",
        description: "Scanned QR code decodes to certificate ID UP-FIRE-2021-0091 belonging to 'Sunrise School of Commerce, Varanasi'. The visible header has been artificially altered.",
        evidenceLocation: "Fire NOC Pg 1, QR Barcode zone",
        officerStatus: "Pending Review"
      },
      {
        id: "FLG-UP-02",
        severity: "Critical",
        category: "Image Forensics Anomaly (ELA)",
        clause: "APH 2026-27 Clause 2.1 & Digital Evidence Act",
        title: "Photoshop Modification Detected on LDA Approval Seal",
        description: "Error Level Analysis indicates municipal sanction stamp was digitally pasted into the PDF scan. Producer metadata lists Adobe Photoshop.",
        evidenceLocation: "Sanction Plan Pg 3, Official Seal block",
        officerStatus: "Pending Review"
      },
      {
        id: "FLG-UP-03",
        severity: "High",
        category: "Entity Graph Conflict",
        clause: "APH 2026-27 Clause 5.3",
        title: "Society Registration ID Reused Across Distinct Applications",
        description: "Society Registration SOC-88912/2012 is linked to an existing closed polytechnic in Varanasi with unresolved compliance penalties.",
        evidenceLocation: "Society Certificate Pg 1",
        officerStatus: "Pending Review"
      }
    ]
  }
];

export const mockRulebookRules = [
  {
    clause: "APH 2026-27 Clause 1.4",
    title: "Minimum Contiguous Land Area for Engineering & Technology",
    category: "Land & Site Norms",
    effectiveYear: "2026-2027",
    definition: "Mega / Metro cities: 2.5 Acres; Urban areas: 5.0 Acres; Rural areas: 7.5 Acres contiguous. Land must be free from encumbrances.",
    validationLogic: "Check Khasra / Survey records; compare with architectural site boundary.",
    severity: "Strict Mandatory",
    status: "Active"
  },
  {
    clause: "APH 2026-27 Clause 2.8",
    title: "Fire & Life Safety Clearance Certificate",
    category: "Safety & Compliance",
    effectiveYear: "2026-2027",
    definition: "Mandatory valid NOC issued by Chief Fire Officer / competent state disaster management authority. Must be valid for current academic cycle.",
    validationLogic: "OCR expiration date extraction + DigiLocker / State Fire Portal API verification.",
    severity: "Strict Mandatory",
    status: "Active"
  },
  {
    clause: "APH 2026-27 Clause 2.1",
    title: "Approved Building Sanction & Completion Certificate",
    category: "Infrastructure",
    effectiveYear: "2026-2027",
    definition: "Building plan approved by competent municipal / town planning authority. Minimum 33% instructional built-up area.",
    validationLogic: "Cross-check built-up area claims against floor plans; verify COA registration of architect.",
    severity: "Strict Mandatory",
    status: "Active"
  },
  {
    clause: "APH 2026-27 Clause 4.1",
    title: "Faculty to Student Cadre Ratio & Qualification",
    category: "Academic & Human Resources",
    effectiveYear: "2026-2027",
    definition: "Faculty to student ratio 1:20 for UG Engineering. Cadre ratio 1:2:6 (Professor : Associate Professor : Assistant Professor).",
    validationLogic: "Cross-validate roster with EPFO UAN contributions and bank salary slips.",
    severity: "Advisory / Scrutiny Guideline",
    status: "Active"
  },
  {
    clause: "APH 2026-27 Clause 5.3",
    title: "Society / Trust Digital Provenance & Integrity",
    category: "Legal & Entity",
    effectiveYear: "2026-2027",
    definition: "Trust or Society registered under Societies Act 1860 or Indian Trusts Act. Must not be blacklisted or share identity credentials unlawfully.",
    validationLogic: "Entity graph link analysis across pan-India AICTE database; PAN / DARPAN portal matching.",
    severity: "Strict Mandatory",
    status: "Active"
  }
];

export const mockAuditTrail = [
  {
    id: "AUD-88201",
    timestamp: "2026-03-12 11:42:09 IST",
    actor: "SatyaPatra AI Engine v2.4",
    action: "Application Ingestion & Multi-Format OCR",
    target: "AICTE-2026-MP-08942 (Apex Institute)",
    details: "Processed 4 documents, 15 pages. PaddleOCR extracted 48 key fields with 98.4% mean confidence.",
    prevHash: "00000000000000000000000000000000",
    blockHash: "c4f2a91e70d4b8e2194a08fc1192da3b"
  },
  {
    id: "AUD-88202",
    timestamp: "2026-03-12 11:42:15 IST",
    actor: "SatyaPatra Rule Engine",
    action: "Handbook 2026 Rule Evaluation",
    target: "AICTE-2026-MP-08942 (Apex Institute)",
    details: "Evaluated 28 handbook clauses. 0 critical violations detected. Trust Score calculated: 95/100.",
    prevHash: "c4f2a91e70d4b8e2194a08fc1192da3b",
    blockHash: "7b091e4a3cf8810e9271fa9d1c028ea9"
  },
  {
    id: "AUD-88203",
    timestamp: "2026-03-12 14:10:44 IST",
    actor: "SatyaPatra AI Engine v2.4",
    action: "Forensic Tamper Detection (ELA + QR)",
    target: "AICTE-2026-MH-04118 (Bharati College)",
    details: "Detected expired Fire NOC (expired 14-Jan-2025). Land area discrepancy flagged: 4.25 Ac deed vs 5.50 Ac plan.",
    prevHash: "7b091e4a3cf8810e9271fa9d1c028ea9",
    blockHash: "92ec5102ff9341aa892e48dc821b01fa"
  },
  {
    id: "AUD-88204",
    timestamp: "2026-03-12 15:33:12 IST",
    actor: "SatyaPatra Forensics Module",
    action: "Digital Signature & QR Decryption Failure",
    target: "AICTE-2026-UP-11903 (National Polytechnic)",
    details: "CRITICAL: Scanned QR decoded to unrelated entity 'Sunrise School of Commerce'. ELA compression anomaly on municipal seal.",
    prevHash: "92ec5102ff9341aa892e48dc821b01fa",
    blockHash: "e102f4a81bc920e897df489bc83109a1"
  }
];

// In-memory simulation generator for user-uploaded dummy files
export function generateMockAnalysis(fileList) {
  const filesArray = Array.from(fileList);
  const fileNames = filesArray.map(f => f.name);
  const primaryName = fileNames[0] || "Sample_Dossier.pdf";
  const idSuffix = Math.floor(1000 + Math.random() * 9000);
  const seed = (fileNames.join("").length + filesArray.length) % 3;

  const mockTypes = [
    {
      inst: "Sardar Vallabhbhai Patel Institute of Technology",
      city: "Ahmedabad, Gujarat",
      score: 91,
      badge: "Verified",
      summary: "Clean Application (All Criteria Met)",
      risk: "Low",
      mismatch: false,
      flg: []
    },
    {
      inst: "Ramanujan Engineering Academy",
      city: "Coimbatore, Tamil Nadu",
      score: 64,
      badge: "Mismatch",
      summary: "Minor Carpet Area Discrepancy & Building Plan Query",
      risk: "Medium",
      mismatch: true,
      flg: [
        {
          id: `FLG-DYN-01`,
          severity: "Medium",
          category: "Cross-Document Discrepancy",
          clause: "APH 2026-27 Clause 2.3",
          title: "Instructional Carpet Area Variance (5.8% divergence)",
          description: "Architect drawing reports 4,200 sqm instructional area while uploaded room list sums to 3,960 sqm.",
          evidenceLocation: "Architect Drawing Pg 2 vs Annexure IV Pg 1",
          officerStatus: "Pending Review"
        }
      ]
    },
    {
      inst: "Himalayan Institute of Applied Science",
      city: "Dehradun, Uttarakhand",
      score: 48,
      badge: "Manual Review",
      summary: "Low OCR Confidence on Stamp & Municipality API Unreachable",
      risk: "High",
      mismatch: false,
      flg: [
        {
          id: `FLG-DYN-02`,
          severity: "Critical",
          category: "Verification Pending",
          clause: "APH 2026-27 Clause 1.6",
          title: "Land Conversion Order Requires Manual Verification",
          description: "Sub-division stamp has faint ink (<72% OCR confidence). Source state land revenue portal is currently in maintenance.",
          evidenceLocation: "Land Conversion Order Pg 1",
          officerStatus: "Pending Review"
        }
      ]
    }
  ];

  const template = mockTypes[seed];

  // Map each uploaded file directly to a document entry with browser object URL
  const documents = filesArray.map((file, idx) => {
    const isRealFile = (typeof window !== 'undefined' && (file instanceof File || file instanceof Blob));
    const previewUrl = isRealFile ? URL.createObjectURL(file) : null;
    const fileType = isRealFile 
      ? (file.type || (file.name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg'))
      : (file.name?.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg');

    return {
      id: `dyn-doc-${idx + 1}`,
      name: file.name || `Document_${idx + 1}.pdf`,
      type: idx === 0 ? "Land Title & Ownership" : idx === 1 ? "Fire Safety NOC" : "Municipal Layout Plan",
      pages: isRealFile && fileType.includes('image') ? 1 : 3,
      status: idx === 0 && template.mismatch ? "Mismatch" : "Verified",
      confidence: "96.4%",
      previewUrl: previewUrl,
      fileType: fileType,
      fileSize: file.size ? `${(file.size / 1024).toFixed(1)} KB` : '1.2 MB',
      issuerStatus: "Direct In-Memory Inspection (Zero Server Storage)",
      extractedFields: [
        { label: "Declared Campus Area", value: template.mismatch ? "4.10 Acres" : "5.45 Acres", confidence: "97.8%", status: template.mismatch ? "Mismatch" : "Verified", clause: "APH 2026 Cl. 1.4" },
        { label: "Document Title Integrity", value: file.name, confidence: "99.0%", status: "Verified", clause: "Verified File" },
        { label: "Statutory Validity", value: "Valid for Academic Year 2026-27", confidence: "95.5%", status: "Verified", clause: "APH 2026 Cl. 2.8" }
      ],
      highlightBbox: { page: 1, top: "25%", left: "15%", width: "70%", height: "20%", label: `Live In-Memory Analysis: ${file.name}` },
      tamperScore: "0.02 (Normal)",
      qrPayload: `IN-MEMORY-SESSION-${idSuffix}: ${file.name}`,
      digitalSigner: "Client-side Secure Sandbox"
    };
  });

  return {
    id: `AICTE-2026-UPLOAD-${idSuffix}`,
    name: template.inst,
    location: template.city,
    applicantType: "Extension of Approval (EoA) - Live Client Dossier",
    trustName: "Shree Vidya Trust Foundation",
    submissionDate: "2026-03-12 (Just Now)",
    trustScore: template.score,
    statusSummary: template.summary,
    statusBadge: template.badge,
    riskLevel: template.risk,
    officerDecision: "Pending",
    officerNotes: "",
    uploadedFileCount: filesArray.length,
    uploadedFileNames: fileNames,
    documents: documents.length > 0 ? documents : [
      {
        id: "dyn-doc-1",
        name: primaryName,
        type: "Land & Site Ownership",
        pages: 3,
        status: template.badge,
        confidence: "95.2%",
        previewUrl: null,
        fileType: "application/pdf",
        issuerStatus: "Simulated Verification Completed (In-Memory)",
        extractedFields: [
          { label: "Declared Site Area", value: "5.45 Acres", confidence: "96.2%", status: "Verified", clause: "APH 2026 Cl. 1.4" }
        ],
        highlightBbox: { page: 1, top: "30%", left: "15%", width: "70%", height: "18%", label: `Simulated OCR on ${primaryName}` },
        tamperScore: "0.02 (Clean)",
        qrPayload: `TOKEN-${idSuffix}`,
        digitalSigner: "Client-side Secure Sandbox"
      }
    ],
    crossDocChecks: [
      {
        fact: "Campus Area Cross-Reference",
        status: template.mismatch ? "Mismatch" : "Verified",
        docA: { name: primaryName, value: "6.10 Acres", score: 96 },
        docB: { name: "Application Schedule", value: template.mismatch ? "5.40 Acres" : "6.10 Acres", score: 98 },
        docC: { name: "Cadastral Map", value: "6.10 Acres", score: 94 },
        verdict: template.mismatch 
          ? "MISMATCH: Uploaded drawing shows 5.40 Acres, while application metadata claimed 6.10 Acres." 
          : "VERIFIED: Land measurements agree across all simulated files."
      }
    ],
    authenticityForensics: [
      { check: "In-Memory Temporary Buffer Check", result: "Zero Storage", detail: "File processed purely in browser memory; no backend database write performed." },
      { check: "Synthetic Forensics Scan", result: template.risk === "High" ? "Warning" : "Clean", detail: "Evaluated pixel variance and PDF structure headers." },
      { check: "Handbook Clause Matcher", result: "Passed 26/28", detail: "Checked against AICTE APH 2026-27 criteria." }
    ],
    flags: template.flg
  };
}
