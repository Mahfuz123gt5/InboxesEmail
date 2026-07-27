import React, { useState } from 'react';
import { 
  ChevronRight, 
  ExternalLink, 
  Settings, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  ChevronDown
} from 'lucide-react';
import { Inbox, MainTab } from '../../types';

interface InboxDetailViewProps {
  inbox: Inbox;
  onNavigate: (tab: MainTab) => void;
  onNavigateSettings: () => void;
  onToggleStatus: (id: string) => void;
}

export const InboxDetailView: React.FC<InboxDetailViewProps> = ({
  inbox,
  onNavigate,
  onNavigateSettings,
  onToggleStatus
}) => {
  const [providerFilter, setProviderFilter] = useState<'All' | 'Google' | 'Outlook' | 'Other'>('All');
  const [dateRange, setDateRange] = useState('20. - 26. July 2026');

  // Daily Chart Data for Jul 20 - Jul 25
  const chartDays = [
    { day: 'Jul 20', inbox: 180, category: 2, spam: 5, queued: 10, replies: 24 },
    { day: 'Jul 21', inbox: 210, category: 3, spam: 4, queued: 8, replies: 31 },
    { day: 'Jul 22', inbox: 225, category: 1, spam: 6, queued: 12, replies: 42 },
    { day: 'Jul 23', inbox: 240, category: 2, spam: 5, queued: 5, replies: 38 },
    { day: 'Jul 24', inbox: 218, category: 3, spam: 4, queued: 15, replies: 45 },
    { day: 'Jul 25', inbox: 180, category: 1, spam: 3, queued: 20, replies: 30 }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Sub Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => onNavigate('inboxes')} className="hover:text-blue-600">Inboxes</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800">{inbox.email}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{inbox.email}</h1>
        </div>

        <div className="flex items-center gap-3">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); alert('Redirecting to Gmail inbox filter tutorial guide...'); }}
            className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200/60"
          >
            <span>How to Filter E-mails with Gmail</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="relative">
            <select 
              value={inbox.status}
              onChange={() => onToggleStatus(inbox.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                inbox.status === 'running' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                  : 'bg-amber-50 text-amber-700 border-amber-300'
              }`}
            >
              <option value="running">● Running</option>
              <option value="paused">● Paused</option>
            </select>
          </div>

          <button 
            onClick={onNavigateSettings}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Date Range & Provider Filters Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span>{dateRange}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 mr-2">Provider:</span>
          {(['All', 'Google', 'Outlook', 'Other'] as const).map(provider => (
            <button
              key={provider}
              onClick={() => setProviderFilter(provider)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                providerFilter === provider
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {provider}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Emails Sent */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Emails Sent</span>
            <span className="text-slate-800 font-bold">1292 / 1292</span>
          </div>
          <div className="text-2xl font-black text-slate-900">1,292</div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full w-full" />
          </div>
        </div>

        {/* Inbox */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Inbox</span>
            <span className="text-blue-600 font-bold">1253 / 1292</span>
          </div>
          <div className="text-2xl font-black text-blue-600">96%</div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '96%' }} />
          </div>
        </div>

        {/* Spam */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Spam</span>
            <span className="text-red-500 font-bold">27 / 1292</span>
          </div>
          <div className="text-2xl font-black text-red-500">2%</div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full" style={{ width: '2%' }} />
          </div>
        </div>

        {/* Category */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Category</span>
            <span className="text-amber-500 font-bold">12 / 1292</span>
          </div>
          <div className="text-2xl font-black text-amber-500">0.93%</div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '0.93%' }} />
          </div>
        </div>
      </div>

      {/* Main Analytics Grid (Left Chart + Right Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Progress Stacked Bar Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Progress Chart</h3>
              <p className="text-xs text-slate-500">Daily breakdown of email placements & replies</p>
            </div>
            
            {/* Chart Legend */}
            <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-600" /> Inbox</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-sky-300" /> Category</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500" /> Spam</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-400" /> Replies</span>
            </div>
          </div>

          {/* SVG Custom Stacked Bar Chart */}
          <div className="h-72 w-full pt-4">
            <div className="h-full flex items-end justify-between gap-4 border-b border-slate-200 pb-2 px-4">
              {chartDays.map((d, idx) => {
                const total = d.inbox + d.category + d.spam + d.queued;
                const maxVal = 260;
                const inboxH = (d.inbox / maxVal) * 100;
                const catH = (d.category / maxVal) * 100;
                const spamH = (d.spam / maxVal) * 100;
                const replyPos = (d.replies / maxVal) * 100;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Hover Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-900 text-white text-[10px] p-2 rounded-lg shadow-xl z-20 whitespace-nowrap pointer-events-none">
                      <p className="font-bold">{d.day}</p>
                      <p>Inbox: {d.inbox} | Spam: {d.spam} | Replies: {d.replies}</p>
                    </div>

                    {/* Stacked Bar */}
                    <div className="w-10 rounded-t-lg overflow-hidden flex flex-col justify-end bg-slate-100" style={{ height: `${(total/maxVal)*100}%` }}>
                      <div className="bg-red-500 w-full" style={{ height: `${spamH}%` }} />
                      <div className="bg-sky-300 w-full" style={{ height: `${catH}%` }} />
                      <div className="bg-blue-600 w-full" style={{ height: `${inboxH}%` }} />
                    </div>

                    {/* Replies Line Marker Dot */}
                    <div 
                      className="w-3 h-3 rounded-full bg-amber-400 border-2 border-white shadow-md absolute z-10"
                      style={{ bottom: `${replyPos}%` }}
                    />

                    <span className="text-[11px] font-semibold text-slate-500 mt-3">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Reputation Score & Health Check */}
        <div className="space-y-6">
          
          {/* Card 1: Reputation Score Donut & Breakdown */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Reputation Score</h3>

            <div className="flex items-center gap-6">
              {/* Donut Chart */}
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-600"
                    strokeDasharray="91, 100"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-black text-slate-900">{inbox.reputationScore}</span>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase">Score</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 flex-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-600">Google:</span>
                  <span className="text-emerald-600 font-bold">92%</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-600">Outlook:</span>
                  <span className="text-amber-600 font-bold">15%</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-600">Other:</span>
                  <span className="text-emerald-600 font-bold">96%</span>
                </div>
              </div>
            </div>

            {/* Alert Banner */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Outlook ESP placement is low</p>
                <p className="text-[11px] text-amber-700">Warm up specific Outlook accounts to improve reputation.</p>
              </div>
            </div>

            <button 
              onClick={onNavigateSettings}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
            >
              Warm-up specific ESP
            </button>
          </div>

          {/* Card 2: Inbox Health Check */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900">Inbox Health Check</h3>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                Healthy
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>SPF Record Configured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Domain Blacklists (Clean)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>DMARC Record Configured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>MX Records Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Warm-up age: <strong>{inbox.healthChecks.warmupAgeDays} days</strong></span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
