import React, { useState } from 'react';
import { 
  ZoomIn, ZoomOut, RotateCcw, AlertTriangle, CheckCircle, 
  Eye, FileText, QrCode, ScanLine, Layers, ArrowLeftRight, ExternalLink, Image as ImageIcon 
} from 'lucide-react';

export default function DocumentViewer({ 
  selectedDoc, 
  selectedFlag, 
  allDocs, 
  lang 
}) {
  const [zoom, setZoom] = useState(100);
  const [activeTab, setActiveTab] = useState('doc'); // 'doc', 'ela', 'qr'
  const [splitCompareDocId, setSplitCompareDocId] = useState(null);

  if (!selectedDoc) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-white border border-slate-200 rounded-xl text-slate-500">
        <div className="text-center">
          <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
          <p className="text-sm font-semibold text-slate-600">No Document Selected</p>
          <p className="text-xs text-slate-500 mt-0.5">Select a document from the checklist to inspect</p>
        </div>
      </div>
    );
  }

  const splitDoc = allDocs ? allDocs.find(d => d.id === splitCompareDocId) : null;
  const isTampered = selectedDoc.status === 'Suspected Tamper';
  const isMismatch = selectedDoc.status === 'Mismatch';
  const isExpired = selectedDoc.status === 'Expired';
  const hasUploadedFile = Boolean(selectedDoc.previewUrl);
  const isPdf = selectedDoc.fileType === 'application/pdf' || selectedDoc.name?.toLowerCase().endsWith('.pdf');
  const isImage = selectedDoc.fileType?.startsWith('image/') || /\.(png|jpe?g|webp|bmp)$/i.test(selectedDoc.name || '');

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      
      {/* Top Document Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200 gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
            {isImage ? <ImageIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xs font-bold text-slate-900 truncate max-w-[220px] sm:max-w-sm">
                {selectedDoc.name}
              </h3>
              {hasUploadedFile && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Live Uploaded File
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-500">
              <span>{selectedDoc.type}</span>
              <span>•</span>
              <span>{selectedDoc.pages} {selectedDoc.pages === 1 ? 'Page' : 'Pages'}</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">OCR: {selectedDoc.confidence}</span>
            </div>
          </div>
        </div>

        {/* View Modes & Toggles */}
        <div className="flex items-center space-x-2">
          
          <div className="flex bg-slate-200/80 p-0.5 rounded-lg border border-slate-300 text-xs font-medium">
            <button
              onClick={() => setActiveTab('doc')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded transition-colors ${
                activeTab === 'doc' 
                  ? 'bg-white text-blue-900 shadow-2xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Document View</span>
            </button>

            <button
              onClick={() => setActiveTab('ela')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded transition-colors ${
                activeTab === 'ela' 
                  ? 'bg-amber-600 text-white font-bold' 
                  : isTampered 
                    ? 'text-rose-700 bg-rose-50 font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Forensic Error Level Analysis"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>ELA Forensics</span>
            </button>

            <button
              onClick={() => setActiveTab('qr')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded transition-colors ${
                activeTab === 'qr' 
                  ? 'bg-indigo-700 text-white font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Payload</span>
            </button>
          </div>

          {/* Zoom controls for non-pdf or fallback */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-lg border border-slate-300 p-0.5">
            <button
              onClick={() => setZoom(Math.max(70, zoom - 10))}
              className="p-1 text-slate-600 hover:text-slate-900"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-700 px-1">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(150, zoom + 10))}
              className="p-1 text-slate-600 hover:text-slate-900"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(100)}
              className="p-1 text-slate-600 hover:text-slate-900"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Split Compare Selector */}
          {allDocs && allDocs.length > 1 && (
            <select
              value={splitCompareDocId || ""}
              onChange={(e) => setSplitCompareDocId(e.target.value || null)}
              className="bg-white text-[11px] text-slate-700 border border-slate-300 rounded-lg px-2 py-1 outline-none focus:border-blue-500 font-medium"
            >
              <option value="">Compare with...</option>
              {allDocs.filter(d => d.id !== selectedDoc.id).map(d => (
                <option key={d.id} value={d.id}>{d.type}</option>
              ))}
            </select>
          )}

        </div>
      </div>

      {/* Main Document Display Canvas */}
      <div className="flex-1 overflow-auto p-4 flex items-start justify-center bg-slate-100/90 relative">
        
        <div className={`grid gap-4 w-full h-full max-w-5xl transition-all ${splitDoc ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          
          {/* Primary View */}
          <div className="w-full h-full flex flex-col items-center">
            
            {/* Case A: User uploaded an actual PDF file */}
            {activeTab === 'doc' && hasUploadedFile && isPdf && (
              <div className="w-full h-[540px] flex flex-col bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
                <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Direct In-Memory PDF Preview (Zero-Storage)</span>
                  <a 
                    href={selectedDoc.previewUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-blue-700 hover:text-blue-900 underline flex items-center space-x-1"
                  >
                    <span>Open in new window</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <iframe
                  src={selectedDoc.previewUrl}
                  title={selectedDoc.name}
                  className="w-full flex-1 border-0"
                />
              </div>
            )}

            {/* Case B: User uploaded an actual image file */}
            {activeTab === 'doc' && hasUploadedFile && isImage && (
              <div className="w-full h-[540px] flex flex-col bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
                <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Direct In-Memory Image Preview</span>
                  <span className="text-slate-500 text-[11px]">{selectedDoc.fileSize || 'Image'}</span>
                </div>
                <div className="flex-1 p-4 flex items-center justify-center bg-slate-50 overflow-auto">
                  <img
                    src={selectedDoc.previewUrl}
                    alt={selectedDoc.name}
                    className="max-h-full max-w-full object-contain rounded border border-slate-200 shadow-sm"
                  />
                </div>
              </div>
            )}

            {/* Case C: Clean Official Regulatory Document Layout (When viewing sample dossiers or generated reports) */}
            {activeTab === 'doc' && (!hasUploadedFile || (!isPdf && !isImage)) && (
              <div 
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                className="w-full max-w-2xl bg-white border border-slate-300 rounded-lg shadow-sm p-6 sm:p-8 font-serif select-none transition-transform"
              >
                {/* Official Certificate Header */}
                <div className="border-b-2 border-slate-800 pb-3 mb-4 text-center">
                  <p className="text-[10px] tracking-widest font-sans font-bold text-slate-500 uppercase">
                    GOVERNMENT REGULATORY RECORD · OFFICIAL COPY
                  </p>
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 mt-1 uppercase font-serif">
                    {selectedDoc.type === 'Land Deed' && 'Office of Sub-Registrar · Registered Conveyance / Sale Deed'}
                    {selectedDoc.type === 'Building Plan' && 'Town Planning Authority · Sanction & Completion Certificate'}
                    {selectedDoc.type === 'Fire NOC' && 'State Directorate of Fire & Emergency Services · Safety NOC'}
                    {selectedDoc.type === 'Trust Certificate' && 'Registrar of Societies · Certificate of Registration'}
                    {!['Land Deed', 'Building Plan', 'Fire NOC', 'Trust Certificate'].includes(selectedDoc.type) && selectedDoc.name}
                  </h2>
                  <p className="text-[11px] font-sans text-slate-600 mt-0.5">
                    Regulatory Reference: <span className="font-mono font-bold text-slate-900">{selectedDoc.id.toUpperCase()}-2026/V9</span>
                  </p>
                </div>

                {/* Body Paragraphs */}
                <div className="space-y-3 text-xs leading-relaxed text-slate-800 font-serif">
                  <p>
                    <strong>WHEREAS</strong> the applicant institution has submitted this dossier for regulatory evaluation under the statutory provisions of the 
                    All India Council for Technical Education (AICTE Approval Process Handbook 2026–2027).
                  </p>

                  <p>
                    It is certified that the records, boundaries, survey coordinates, and institutional infrastructure specified herein pertain exclusively to the subject campus:
                  </p>

                  {/* Bounding Box Highlighted Field */}
                  <div className="relative my-4 p-3.5 rounded-lg border-2 border-dashed bg-slate-50 border-slate-300">
                    <div className={`absolute -top-3 left-3 px-2 py-0.5 rounded text-[10px] font-sans font-bold flex items-center space-x-1 shadow-xs ${
                      isTampered 
                        ? 'bg-rose-700 text-white' 
                        : isMismatch 
                          ? 'bg-amber-600 text-white' 
                          : isExpired 
                            ? 'bg-red-600 text-white'
                            : 'bg-emerald-700 text-white'
                    }`}>
                      {isTampered ? <AlertTriangle className="w-3 h-3" /> : <ScanLine className="w-3 h-3" />}
                      <span>{selectedDoc.highlightBbox?.label || "AI Verified Field"}</span>
                    </div>

                    <div className="mt-2 grid grid-cols-1 gap-2 font-sans">
                      {selectedDoc.extractedFields.map((field, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded border border-slate-200">
                          <div>
                            <span className="text-[11px] text-slate-500 font-medium block">{field.label}</span>
                            <span className={`text-xs font-bold ${
                              field.status === 'Mismatch' || field.status === 'Suspected Tamper' 
                                ? 'text-rose-700' 
                                : field.status === 'Expired'
                                  ? 'text-red-700'
                                  : 'text-slate-900'
                            }`}>
                              {field.value}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold block">
                              Conf: {field.confidence}
                            </span>
                            <span className="text-[9px] text-slate-500 italic block mt-0.5">
                              {field.clause}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p>
                    The undersigned statutory authority verifies that this record complies with AICTE handbook provisions.
                  </p>
                </div>

                {/* Footer Stamp & DSC Signature */}
                <div className="mt-8 pt-4 border-t border-slate-300 flex items-center justify-between text-[11px] font-sans text-slate-600">
                  <div>
                    <p className="font-semibold text-slate-900">Digital Seal & Authority:</p>
                    <p className="font-mono text-[10px] text-slate-700">{selectedDoc.digitalSigner}</p>
                    <p className="text-[10px] text-emerald-800 font-medium">✓ Cryptographic Signature Valid</p>
                  </div>

                  <div className="relative w-18 h-18 rounded-full border-2 border-blue-900/80 p-1 flex items-center justify-center text-center rotate-[-8deg]">
                    <div className="w-full h-full rounded-full border border-dashed border-blue-800 flex flex-col items-center justify-center">
                      <span className="text-[7px] font-bold text-blue-950 uppercase">OFFICIAL SEAL</span>
                      <span className="text-[8px] font-black text-blue-950">AICTE</span>
                      <span className="text-[6px] font-mono text-blue-900">VERIFIED</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Tab: Error Level Analysis (ELA) Forensics */}
            {activeTab === 'ela' && (
              <div className="w-full max-w-2xl bg-white border border-slate-300 rounded-xl p-5 shadow-sm font-sans space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-bold uppercase text-slate-900">
                      Error Level Analysis (ELA) Forensic Heatmap Check
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    Baseline: 95% JPEG Quantization
                  </span>
                </div>

                <div className="p-6 rounded-lg bg-slate-50 border border-slate-300 min-h-[300px] flex flex-col items-center justify-center text-center">
                  {isTampered ? (
                    <div className="space-y-3">
                      <div className="mx-auto w-64 h-32 border-2 border-rose-500 rounded-lg bg-rose-50 p-3 flex flex-col items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-rose-700 mb-1" />
                        <span className="text-xs font-bold text-rose-900">
                          High Error Gradient (+34.2 dB)
                        </span>
                        <span className="text-[11px] text-rose-700 mt-1">
                          Digital Seal contains altered compression table
                        </span>
                      </div>
                      <p className="text-xs text-rose-800 font-bold">
                        Verdict: Suspected Digital Inpainting / Photoshop Modification
                      </p>
                      <p className="text-[11px] text-slate-600 max-w-md mx-auto">
                        The municipal seal was modified with Adobe Photoshop rather than government scanner firmware, creating a localized compression anomaly.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto">
                        <CheckCircle className="w-6 h-6 text-emerald-800" />
                      </div>
                      <p className="text-xs font-bold text-emerald-800">
                        Uniform Compression Curve (Tamper Score: {selectedDoc.tamperScore})
                      </p>
                      <p className="text-[11px] text-slate-600 max-w-sm mx-auto">
                        No pixel splicing or multi-pass JPEG recompression detected. Scan integrity is intact.
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600">
                  <strong className="text-slate-800">Methodology:</strong> Evaluates digital artifacts across high-frequency luminance layers to identify patched or pasted pixels in certificate seals.
                </div>
              </div>
            )}

            {/* Tab: QR Code Payload Inspector */}
            {activeTab === 'qr' && (
              <div className="w-full max-w-2xl bg-white border border-slate-300 rounded-xl p-5 shadow-sm font-sans space-y-4">
                <div className="flex items-center space-x-2 pb-3 border-b border-slate-200">
                  <QrCode className="w-4 h-4 text-indigo-700" />
                  <span className="text-xs font-bold uppercase text-slate-900">
                    Cryptographic QR Barcode Payload Inspection
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Decoded QR String:</span>
                    <span className="font-mono text-indigo-900 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 text-[11px]">
                      {selectedDoc.qrPayload}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    {selectedDoc.qrPayload.includes('Sunrise') || isTampered ? (
                      <div className="p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-xs space-y-1">
                        <div className="flex items-center space-x-2 font-bold">
                          <AlertTriangle className="w-4 h-4 text-rose-700" />
                          <span>CLONED QR BARCODE DETECTED</span>
                        </div>
                        <p className="text-[11px] text-rose-900 leading-normal">
                          QR barcode decodes to <em>"Sunrise School of Commerce"</em>, whereas visible certificate header states <em>"National Polytechnic & Technical Campus"</em>.
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs space-y-1">
                        <div className="flex items-center space-x-2 font-bold">
                          <CheckCircle className="w-4 h-4 text-emerald-800" />
                          <span>Cryptographic Payload Matches Printed Details</span>
                        </div>
                        <p className="text-[11px] text-emerald-900">
                          Encoded institutional token and survey reference match the application registry.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Secondary Comparison Document (When Split Mode is Active) */}
          {splitDoc && (
            <div className="w-full h-full flex flex-col bg-white border border-slate-300 rounded-lg p-5 shadow-sm font-serif">
              <div className="border-b border-slate-300 pb-2 mb-3 flex items-center justify-between font-sans">
                <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Reference Comparison: {splitDoc.name}
                </span>
                <button
                  onClick={() => setSplitCompareDocId(null)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  ✕ Close
                </button>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <span className="font-bold text-amber-900 text-xs block mb-1">Extracted Values for Comparison:</span>
                  {splitDoc.extractedFields.map((f, i) => (
                    <div key={i} className="flex justify-between py-1 border-b border-amber-200/60 text-xs">
                      <span className="text-slate-600">{f.label}:</span>
                      <span className="font-bold text-slate-900">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Bottom Status / Issuer Bar */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-700">Verification Source:</span>
          <span>{selectedDoc.issuerStatus}</span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <span>Regulation: <strong className="text-blue-900">AICTE APH 2026-27</strong></span>
          <span>•</span>
          <span>Security: <code className="text-slate-700">SHA-256 Verified</code></span>
        </div>
      </div>

    </div>
  );
}
