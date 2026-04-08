'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/lib/store';
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
  const { branding } = useAuthStore();
  const primaryColor = branding?.primary_color || '#E30613';

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
      <div className="flex items-center justify-center h-full fade-in">
        <Card className="p-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
            <CheckCircle size={36} style={{ color: primaryColor }} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Import Complete!</h2>
          <p className="text-sm text-slate-500 mb-1">Successfully imported <strong>3 voters</strong></p>
          <p className="text-sm text-slate-500 mb-6"><span className="text-amber-600 font-medium">0 skipped</span> · <span className="text-red-500 font-medium">0 errors</span></p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => { setDone(false); setStep(0); setFile(null); }}>Import Another</Button>
            <Button onClick={() => router.push('/voters')} style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
              View Voters
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-5 fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Import Voter Roll</h1>
          <p className="text-sm text-slate-500">Upload a CSV file to bulk-import voters</p>
        </div>
        <div className="ml-auto">
          <Button variant="outline" size="sm" icon={<Download size={13} />}>Download Template</Button>
        </div>
      </div>

      {/* Step indicator */}
      <Card className="p-4">
        <div className="flex items-center">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-slate-800' : 'text-slate-400'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? 'text-white' : i === step ? 'text-white' : 'bg-slate-100'}`}
                  style={i <= step ? { backgroundColor: primaryColor } : {}}>
                  {i < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span className="text-sm font-medium">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-3 ${i < step ? '' : 'bg-slate-200'}`} style={i < step ? { backgroundColor: primaryColor } : {}} />}
            </div>
          ))}
        </div>
      </Card>

      {/* Step content */}
      {step === 0 && (
        <Card className="p-8">
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${dragging ? 'scale-105' : 'hover:bg-slate-50'}`}
            style={{ borderColor: dragging ? primaryColor : '#CBD5E1' }}
          >
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
              <Upload size={26} style={{ color: primaryColor }} />
            </div>
            <p className="text-lg font-semibold text-slate-700 mb-1">Drop your CSV file here</p>
            <p className="text-sm text-slate-400">or click to browse · CSV files only · Max 10MB</p>
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
          </div>
          <div className="mt-5 flex items-start gap-3 bg-blue-50 rounded-xl p-4">
            <AlertCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-700">
              <p className="font-semibold mb-1">Required columns:</p>
              <p>first_name, last_name — all other fields are optional. Download the template above for the correct format.</p>
            </div>
          </div>
        </Card>
      )}

      {step === 1 && file && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5 p-3 bg-slate-50 rounded-xl">
            <FileText size={18} className="text-slate-500" />
            <span className="text-sm font-medium text-slate-700">{file.name}</span>
            <span className="text-xs text-slate-400 ml-auto">{(file.size / 1024).toFixed(1)} KB</span>
          </div>
          <h3 className="font-semibold text-slate-700 mb-4 text-sm">Map CSV Columns to System Fields</h3>
          <div className="space-y-3">
            {csvHeaders.map((header, i) => (
              <div key={header} className="grid grid-cols-2 gap-4 items-center">
                <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg text-sm text-slate-700 font-medium">
                  <FileText size={13} className="text-slate-400" />
                  {header}
                </div>
                <select defaultValue={systemFields[i]} className="border border-slate-200 rounded-lg px-3 py-2 text-sm">
                  <option value="">— Skip this column —</option>
                  {systemFields.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-5">
            <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
            <Button icon={<ArrowRight size={14} />} onClick={() => setStep(2)} style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>Next: Preview</Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700 text-sm">Data Preview (first 3 rows)</h3>
            <span className="text-xs text-slate-400">3 valid rows · 0 errors detected</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50">
                  {csvHeaders.map(h => <th key={h} className="text-left py-2 px-3 font-medium text-slate-500">{h}</th>)}
                  <th className="py-2 px-3 font-medium text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {previewRows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => <td key={j} className="py-2 px-3 text-slate-700">{cell}</td>)}
                    <td className="py-2 px-3"><span className="text-emerald-600 font-medium flex items-center gap-1"><CheckCircle size={11} />Valid</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-2 mt-5">
            <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
            <Button icon={<ArrowRight size={14} />} onClick={() => setStep(3)} style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>Next: Import</Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="p-8 text-center">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
            <Users size={26} style={{ color: primaryColor }} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Ready to Import</h3>
          <p className="text-sm text-slate-500 mb-1"><strong>3 voters</strong> will be added to your voter roll</p>
          <p className="text-sm text-slate-400 mb-6">Duplicates will be detected and skipped automatically</p>
          <div className="flex justify-center gap-3">
            <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
            <Button loading={importing} onClick={handleImport} style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
              {importing ? 'Importing...' : 'Start Import'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
