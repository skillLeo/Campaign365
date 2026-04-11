'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Upload, CheckCircle, AlertCircle, FileText, Download, ArrowRight, Users } from 'lucide-react';
import type {} from 'react'; // satisfy lint

const STEPS = ['Upload File', 'Map Columns', 'Preview', 'Import'];

export default function VoterImportPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [importing, setImporting] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const primaryColor = 'var(--tenant-primary)';

  const csvHeaders = ['First Name', 'Last Name', 'Email', 'Phone', 'Address', 'Constituency', 'DOB', 'Gender'];
  const systemFields = ['first_name', 'last_name', 'email', 'phone', 'address', 'constituency', 'date_of_birth', 'gender'];
  const previewRows = [
    ['Marcus', 'Williams', 'marcus@email.com', '+1869-555-0142', '14 Bay Rd', 'St. Chris 1', '1985-07-22', 'Male'],
    ['Sandra', 'Clarke', 'sandra@email.com', '+1869-555-0198', '7 Main St', 'Nevis 1', '1990-03-14', 'Female'],
    ['Devon', 'Baptiste', 'devon@email.com', '+1869-555-0331', '3 Park Ave', 'St. Chris 2', '1978-11-05', 'Male'],
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.name.endsWith('.csv')) { setFile(f); setStep(1); }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setStep(1); }
  };

  const handleImport = async () => {
    setImporting(true);
    await new Promise(r => setTimeout(r, 2200));
    setImporting(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex items-center justify-center h-full fade-in p-3 sm:p-4">
        <Card className="p-6 sm:p-10 text-center max-w-md w-full">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
            <CheckCircle size={28} className="sm:w-9 sm:h-9" style={{ color: primaryColor }} />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">Import Complete!</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-1">Successfully imported <strong>3 voters</strong></p>
          <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6"><span className="text-amber-600 font-medium">0 skipped</span> · <span className="text-red-500 font-medium">0 errors</span></p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => { setDone(false); setStep(0); setFile(null); }} className="w-full sm:w-auto">Import Another</Button>
            <Button onClick={() => router.push('/voters')} style={{ backgroundColor: primaryColor, borderColor: primaryColor }} className="w-full sm:w-auto">
              View Voters
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-5 fade-in">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={() => router.back()} className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft size={14} className="sm:w-[16px] sm:h-[16px]" />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 truncate">Import Voter Roll</h1>
            <p className="text-xs sm:text-sm text-slate-500">Upload a CSV file to bulk-import voters</p>
          </div>
        </div>
        <div className="sm:ml-auto">
          <Button variant="outline" size="sm" icon={<Download size={12} className="sm:w-[13px] sm:h-[13px]" />} className="w-full sm:w-auto">
            Download Template
          </Button>
        </div>
      </div>

      {/* Step indicator - Responsive */}
      <Card className="p-3 sm:p-4 overflow-x-auto">
        <div className="flex items-center min-w-[400px] sm:min-w-0">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`flex items-center gap-1 sm:gap-2 ${i <= step ? 'text-slate-800' : 'text-slate-400'}`}>
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-bold transition-all ${i < step ? 'text-white' : i === step ? 'text-white' : 'bg-slate-100'}`}
                  style={i <= step ? { backgroundColor: primaryColor } : {}}>
                  {i < step ? <CheckCircle size={12} className="sm:w-[14px] sm:h-[14px]" /> : i + 1}
                </div>
                <span className="text-[11px] sm:text-sm font-medium whitespace-nowrap">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-2 sm:mx-3 ${i < step ? '' : 'bg-slate-200'}`} style={i < step ? { backgroundColor: primaryColor } : {}} />}
            </div>
          ))}
        </div>
      </Card>

      {/* Step content */}
      {step === 0 && (
        <Card className="p-4 sm:p-6 md:p-8">
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center cursor-pointer transition-all ${dragging ? 'scale-105' : 'hover:bg-slate-50'}`}
            style={{ borderColor: dragging ? primaryColor : '#CBD5E1' }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
              <Upload size={22} className="sm:w-[26px] sm:h-[26px]" style={{ color: primaryColor }} />
            </div>
            <p className="text-base sm:text-lg font-semibold text-slate-700 mb-1">Drop your CSV file here</p>
            <p className="text-xs sm:text-sm text-slate-400">or click to browse · CSV files only · Max 10MB</p>
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
          </div>
          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-start gap-2 sm:gap-3 bg-blue-50 rounded-xl p-3 sm:p-4">
            <AlertCircle size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-[11px] sm:text-xs text-blue-700">
              <p className="font-semibold mb-1">Required columns:</p>
              <p>first_name, last_name — all other fields are optional. Download the template above for the correct format.</p>
            </div>
          </div>
        </Card>
      )}

      {step === 1 && file && (
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-5 p-3 bg-slate-50 rounded-xl">
            <FileText size={16} className="text-slate-500 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">{file.name}</span>
            <span className="text-[10px] sm:text-xs text-slate-400 sm:ml-auto">{(file.size / 1024).toFixed(1)} KB</span>
          </div>
          <h3 className="font-semibold text-slate-700 mb-3 sm:mb-4 text-xs sm:text-sm">Map CSV Columns to System Fields</h3>
          <div className="space-y-2 sm:space-y-3">
            {csvHeaders.map((header, i) => (
              <div key={header} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 p-2 sm:p-2.5 bg-slate-50 rounded-lg text-xs sm:text-sm text-slate-700 font-medium sm:w-40 md:w-48">
                  <FileText size={12} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">{header}</span>
                </div>
                <select defaultValue={systemFields[i]} className="flex-1 border border-slate-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm">
                  <option value="">— Skip this column —</option>
                  {systemFields.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4 sm:mt-5">
            <Button variant="ghost" onClick={() => setStep(0)} className="w-full sm:w-auto">Back</Button>
            <Button icon={<ArrowRight size={13} className="sm:w-[14px] sm:h-[14px]" />} onClick={() => setStep(2)} style={{ backgroundColor: primaryColor, borderColor: primaryColor }} className="w-full sm:w-auto">
              Next: Preview
            </Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 sm:mb-4">
            <h3 className="font-semibold text-slate-700 text-xs sm:text-sm">Data Preview (first 3 rows)</h3>
            <span className="text-[10px] sm:text-xs text-slate-400">3 valid rows · 0 errors detected</span>
          </div>
          <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full text-xs" style={{ minWidth: '700px' }}>
              <thead>
                <tr className="bg-slate-50">
                  {csvHeaders.map(h => <th key={h} className="text-left py-2 px-2 sm:px-3 font-medium text-slate-500 text-[10px] sm:text-xs whitespace-nowrap">{h}</th>)}
                  <th className="py-2 px-2 sm:px-3 font-medium text-slate-500 text-[10px] sm:text-xs whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {previewRows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => <td key={j} className="py-2 px-2 sm:px-3 text-slate-700 text-[10px] sm:text-xs whitespace-nowrap">{cell}</td>)}
                    <td className="py-2 px-2 sm:px-3 whitespace-nowrap">
                      <span className="text-emerald-600 font-medium flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs">
                        <CheckCircle size={10} className="sm:w-[11px] sm:h-[11px]" />Valid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4 sm:mt-5">
            <Button variant="ghost" onClick={() => setStep(1)} className="w-full sm:w-auto">Back</Button>
            <Button icon={<ArrowRight size={13} className="sm:w-[14px] sm:h-[14px]" />} onClick={() => setStep(3)} style={{ backgroundColor: primaryColor, borderColor: primaryColor }} className="w-full sm:w-auto">
              Next: Import
            </Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6 sm:p-8 text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
            <Users size={22} className="sm:w-[26px] sm:h-[26px]" style={{ color: primaryColor }} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">Ready to Import</h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-1"><strong>3 voters</strong> will be added to your voter roll</p>
          <p className="text-[11px] sm:text-sm text-slate-400 mb-4 sm:mb-6">Duplicates will be detected and skipped automatically</p>
          <div className="flex flex-col-reverse sm:flex-row justify-center gap-2 sm:gap-3">
            <Button variant="ghost" onClick={() => setStep(2)} className="w-full sm:w-auto">Back</Button>
            <Button loading={importing} onClick={handleImport} style={{ backgroundColor: primaryColor, borderColor: primaryColor }} className="w-full sm:w-auto">
              {importing ? 'Importing...' : 'Start Import'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}