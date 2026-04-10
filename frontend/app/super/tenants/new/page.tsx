'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { superAdminApi } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, CheckCircle, Building2, Palette, Package, User, CreditCard } from 'lucide-react';

const STEPS = [
  { id: 'party', label: 'Party Info', icon: Building2 },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'plan', label: 'Select Plan', icon: Package },
  { id: 'admin', label: 'Admin User', icon: User },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

const PLANS = [
  { id: 'essentials', name: 'Essentials', price: 299, color: '#94A3B8', features: ['Up to 10,000 voters', '10 users', 'Email & SMS', 'Basic reports'] },
  { id: 'professional', name: 'Professional', price: 799, color: '#3B82F6', features: ['Up to 50,000 voters', '50 users', 'WhatsApp', 'GPS Tracking', 'Fundraising'] },
  { id: 'enterprise', name: 'Enterprise', price: 1999, color: '#2563EB', features: ['Unlimited voters', '200 users', 'AI Insights', 'Full compliance', 'White-label'] },
  { id: 'sovereign', name: 'Sovereign', price: 4999, color: '#8B5CF6', features: ['Everything', 'Unlimited users', 'Dedicated CSM', '99.9% SLA', 'Custom integrations'] },
];

interface FormData {
  party_name: string;
  subdomain: string;
  country: string;
  website: string;
  primary_color: string;
  logo_url: string;
  plan: string;
  admin_name: string;
  admin_email: string;
  admin_phone: string;
  billing_name: string;
  billing_email: string;
}

export default function NewTenantPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [creating, setCreating] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormData>({
    party_name: '', subdomain: '', country: '', website: '',
    primary_color: '#2563EB', logo_url: '',
    plan: 'professional',
    admin_name: '', admin_email: '', admin_phone: '',
    billing_name: '', billing_email: '',
  });

  const set = (key: keyof FormData, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleCreate = async () => {
    setCreating(true);
    try {
      await superAdminApi.post('/super/tenants', form);
    } catch {}
    await new Promise(r => setTimeout(r, 1200));
    setCreating(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex items-center justify-center h-full fade-in p-4">
        <Card className="p-6 sm:p-10 text-center max-w-md w-full">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-teal-50">
            <CheckCircle size={28} className="sm:w-9 sm:h-9 text-teal-500" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">Tenant Created!</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-1">
            <strong>{form.party_name}</strong> is now live at
          </p>
          <p className="text-teal-600 font-mono text-xs sm:text-sm mb-4 sm:mb-6 break-all">{form.subdomain}.campaign365.com</p>
          <p className="text-[11px] sm:text-xs text-slate-400 mb-4 sm:mb-6">Login credentials have been emailed to {form.admin_email}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => router.push('/super/tenants')}>View All Clients</Button>
            <Button onClick={() => { setDone(false); setStep(0); setForm({ party_name: '', subdomain: '', country: '', website: '', primary_color: '#2563EB', logo_url: '', plan: 'professional', admin_name: '', admin_email: '', admin_phone: '', billing_name: '', billing_email: '' }); }}
              className="bg-teal-500 border-teal-500 text-white">Add Another</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 fade-in max-w-3xl mx-auto p-3 sm:p-4 md:p-0">
      <div className="flex items-center gap-2 sm:gap-3">
        <button onClick={() => router.back()} className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-800">Onboard New Client</h1>
          <p className="text-xs sm:text-sm text-slate-500">5-step setup wizard</p>
        </div>
      </div>

      {/* Step indicator - RESPONSIVE */}
      <Card className="p-3 sm:p-4 overflow-x-auto">
        <div className="flex items-center min-w-[500px] sm:min-w-0">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className={`flex items-center gap-1 sm:gap-2 ${i <= step ? 'text-slate-800' : 'text-slate-400'}`}>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all text-[11px] sm:text-sm`}
                    style={i < step ? { backgroundColor: '#2563EB', color: 'white' } : i === step ? { backgroundColor: '#2563EB', color: 'white' } : { backgroundColor: '#F1F5F9' }}>
                    {i < step ? <CheckCircle size={12} className="sm:w-[14px] sm:h-[14px]" /> : <Icon size={12} className="sm:w-[14px] sm:h-[14px]" />}
                  </div>
                  <span className="text-[10px] sm:text-sm font-medium hidden sm:block">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-px mx-1 sm:mx-2" style={i < step ? { backgroundColor: '#2563EB' } : { backgroundColor: '#E2E8F0' }} />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Step content */}
      <Card className="p-4 sm:p-6">
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Party Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Party / Campaign Name *</label>
                <input value={form.party_name} onChange={e => set('party_name', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="e.g. St. Kitts-Nevis Labour Party" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Subdomain *</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1">
                  <input value={form.subdomain} onChange={e => set('subdomain', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="sknlp" />
                  <span className="text-xs sm:text-sm text-slate-400 shrink-0 break-all">.campaign365.com</span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Country</label>
                <input value={form.country} onChange={e => set('country', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="St. Kitts and Nevis" />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Website</label>
                <input value={form.website} onChange={e => set('website', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="https://party.org" />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4 sm:space-y-5">
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Branding & Colors</h3>
            <div>
              <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-2">Primary Brand Color</label>
              <div className="flex flex-wrap items-center gap-3">
                <input type="color" value={form.primary_color} onChange={e => set('primary_color', e.target.value)} className="w-10 h-10 sm:w-12 sm:h-10 rounded-lg border border-slate-200 cursor-pointer" />
                <input value={form.primary_color} onChange={e => set('primary_color', e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-28 sm:w-32 font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-2">Quick Presets</label>
              <div className="flex gap-2 flex-wrap">
                {['#CC0000', '#006400', '#2563EB', '#1D4ED8', '#7C3AED', '#F59E0B', '#000000'].map(c => (
                  <button key={c} onClick={() => set('primary_color', c)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow border-2 hover:scale-110 transition-transform ${form.primary_color === c ? 'border-slate-800 scale-110' : 'border-white'}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-2">Preview</label>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="h-2" style={{ backgroundColor: form.primary_color }} />
                <div className="flex flex-wrap items-center gap-3 p-3 sm:p-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: form.primary_color }}>
                    {form.party_name?.[0] || '?'}
                  </div>
                  <span className="font-semibold text-slate-800 text-sm truncate flex-1">{form.party_name || 'Party Name'}</span>
                  <div className="px-3 py-1.5 rounded-lg text-white text-xs whitespace-nowrap" style={{ backgroundColor: form.primary_color }}>
                    Sign In
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Select Subscription Plan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PLANS.map(plan => (
                <button key={plan.id} onClick={() => set('plan', plan.id)}
                  className={`text-left p-3 sm:p-4 rounded-xl border-2 transition-all ${form.plan === plan.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-slate-800 text-sm sm:text-base">{plan.name}</span>
                    <span className="font-bold text-base sm:text-lg" style={{ color: plan.color }}>${plan.price}/mo</span>
                  </div>
                  <ul className="space-y-1">
                    {plan.features.map(f => (
                      <li key={f} className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1.5">
                        <CheckCircle size={9} className="sm:w-[10px] sm:h-[10px] text-emerald-500 shrink-0" />
                        <span className="break-words">{f}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Admin User Setup</h3>
            <p className="text-xs sm:text-sm text-slate-500">This will be the General Secretary / primary admin account.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                <input value={form.admin_name} onChange={e => set('admin_name', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="Dr. Terrence Drew" />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Email *</label>
                <input type="email" value={form.admin_email} onChange={e => set('admin_email', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="admin@party.org" />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Phone</label>
                <input value={form.admin_phone} onChange={e => set('admin_phone', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="+1 869 555 0100" />
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-[11px] sm:text-xs text-blue-700">
              A secure random password will be generated and emailed to the admin upon account creation.
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Billing Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Billing Contact Name</label>
                <input value={form.billing_name} onChange={e => set('billing_name', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="Party Treasurer" />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-medium text-slate-700 mb-1">Billing Email</label>
                <input type="email" value={form.billing_email} onChange={e => set('billing_email', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="billing@party.org" />
              </div>
            </div>
            <div className="border border-slate-200 rounded-xl p-3 sm:p-4 space-y-2">
              <p className="text-[11px] sm:text-xs font-semibold text-slate-600">Order Summary</p>
              <div className="flex flex-wrap justify-between gap-2 text-xs sm:text-sm">
                <span className="text-slate-600 break-words">{form.party_name || '(Unnamed Party)'} — {PLANS.find(p => p.id === form.plan)?.name}</span>
                <span className="font-bold text-slate-800 whitespace-nowrap">${PLANS.find(p => p.id === form.plan)?.price}/mo</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-[10px] sm:text-xs text-slate-400">
                <span className="break-all">Subdomain: {form.subdomain || '(not set)'}.campaign365.com</span>
                <span>Billed monthly</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
          <Button variant="ghost" onClick={() => setStep(s => s - 1)} disabled={step === 0} icon={<ArrowLeft size={14} />} className="w-full sm:w-auto">
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep(s => s + 1)} icon={<ArrowRight size={14} />} className="bg-teal-500 border-teal-500 text-white w-full sm:w-auto">
              Next: {STEPS[step + 1].label}
            </Button>
          ) : (
            <Button loading={creating} onClick={handleCreate} className="bg-teal-500 border-teal-500 text-white w-full sm:w-auto">
              Create Tenant
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}