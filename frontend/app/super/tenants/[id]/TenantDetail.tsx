'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { BarChart2, Users, Mail, TrendingUp, ChevronRight, Edit, Globe, Download } from 'lucide-react';

const TABS = ['Overview', 'Branding', 'Features', 'Users', 'Billing', 'Compliance'];

export default function TenantDetail() {
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [statusOn, setStatusOn] = useState(true);
  const router = useRouter();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (!params?.id) return;
    // Mock data — backend not yet connected
    setTenant({
      id: params.id,
      name: 'Jamaica Labour Party',
      plan: 'Enterprise',
      status: 'active',
      subdomain: 'jlp',
      primary_color: '#2563EB',
      campaigns_count: 12,
      users_count: 156,
      custom_domain: 'jlp.campaign365.app',
    });
    setStatusOn(true);
    setLoading(false);
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex-1 min-h-screen p-6 space-y-4" style={{ backgroundColor: '#F8FAFC' }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="h-28 bg-white rounded-2xl border border-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!tenant) {
    return (
      <div
        className="flex-1 flex items-center justify-center text-slate-500 min-h-screen"
        style={{ backgroundColor: '#F8FAFC' }}
      >
        Tenant not found
      </div>
    );
  }

  const initials = tenant.name
    ?.split(' ')
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('') || 'T';

  return (
    <div className="flex-1 flex flex-col min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-100">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
          <button
            onClick={() => router.push('/super/dashboard')}
            className="hover:text-slate-600 transition-colors"
          >
            Dashboard
          </button>
          <ChevronRight size={12} />
          <button
            onClick={() => router.push('/super/tenants')}
            className="hover:text-slate-600 transition-colors"
          >
            Clients
          </button>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">{tenant.name}</span>
        </div>

        <div className="flex items-center gap-4">
          <p className="font-semibold text-slate-500 text-sm mr-2">4i › Client Details</p>
          {/* Avatar + name */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ backgroundColor: tenant.primary_color || '#2563EB' }}
          >
            {initials}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-800">{tenant.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: '#2563EB' }}
              >
                Subscription {tenant.plan}
              </span>
            </div>
          </div>
          {/* Status toggle */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-slate-500">Status</span>
            <button
              onClick={() => setStatusOn(!statusOn)}
              className="relative w-11 h-6 rounded-full transition-all duration-200 focus:outline-none"
              style={{ backgroundColor: statusOn ? '#2563EB' : '#CBD5E1' }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                style={{ transform: statusOn ? 'translateX(1.375rem)' : 'translateX(0.125rem)' }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-6 py-3 bg-white border-b border-slate-100">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={
              activeTab === tab
                ? { backgroundColor: '#2563EB', color: 'white' }
                : { color: '#64748B' }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 lg:p-6 space-y-5">
        {/* Dark stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Campaigns', value: tenant.campaigns_count ?? 12, icon: BarChart2 },
            { label: 'Total Users', value: tenant.users_count ?? 124, icon: Users },
            { label: 'API Requests', value: '2,450', icon: Mail },
            { label: 'Storage Used', value: '78%', icon: TrendingUp },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{ backgroundColor: '#0F172A' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#1E293B' }}
              >
                <Icon size={18} style={{ color: '#2563EB' }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detail row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Left 2 cols */}
          <div className="col-span-2 space-y-4">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-700 text-sm mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  'Branding updated by admin',
                  'New user added — campaigns@jlp.org',
                  'Campaign "GOTV Drive" launched',
                  'API key rotated',
                ].map((act, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: '#2563EB' }}
                    />
                    <span className="text-slate-600 flex-1">{act}</span>
                    <span className="text-slate-400 text-xs">{i + 1}h ago</span>
                  </div>
                ))}
              </div>
            </div>

            {/* White-label domain */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-700 text-sm mb-3">White-label Domain</h3>
              <div className="flex items-center gap-3">
                <Globe size={15} className="text-slate-400 shrink-0" />
                <div className="flex-1 bg-slate-50 rounded-xl px-3 py-2 text-sm text-slate-600">
                  {tenant.custom_domain || `${tenant.subdomain}.campaign365.app`}
                </div>
                <button
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#2563EB' }}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>

          {/* Right col */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-700 text-sm mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: 'Edit Branding', icon: Edit },
                  { label: 'Reset Client Password', icon: Mail },
                  { label: 'Export Data', icon: Download },
                ].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#2563EB' }}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subscription */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-700 text-sm mb-3">Subscription</h3>
              <p className="text-sm text-slate-600 mb-3 capitalize">{tenant.plan} plan</p>
              <button
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#2563EB' }}
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
