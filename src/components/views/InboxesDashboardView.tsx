import React, { useState } from 'react';
import { 
  Inbox as InboxIcon, 
  Search, 
  Tag, 
  MoreVertical, 
  Play, 
  Pause, 
  Settings, 
  BarChart3, 
  Trash2, 
  HelpCircle,
  Plus
} from 'lucide-react';
import { Inbox, MainTab } from '../../types';

interface InboxesDashboardViewProps {
  inboxes: Inbox[];
  onSelectInbox: (inbox: Inbox) => void;
  onNavigate: (tab: MainTab) => void;
  onToggleStatus: (id: string) => void;
}

export const InboxesDashboardView: React.FC<InboxesDashboardViewProps> = ({
  inboxes,
  onSelectInbox,
  onNavigate,
  onToggleStatus
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const filteredInboxes = inboxes.filter(i => {
    const matchesSearch = i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.plan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || i.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const totalSent = inboxes.reduce((acc, curr) => acc + curr.emailsSent, 0);
  const avgInbox = Math.round(inboxes.reduce((acc, curr) => acc + curr.inboxRate, 0) / (inboxes.length || 1));
  const avgSpam = (inboxes.reduce((acc, curr) => acc + curr.spamRate, 0) / (inboxes.length || 1)).toFixed(2);
  const avgCategory = (inboxes.reduce((acc, curr) => acc + curr.categoryRate, 0) / (inboxes.length || 1)).toFixed(2);
  const highestScore = Math.max(...inboxes.map(i => i.reputationScore), 0);
  const lowestScore = Math.min(...inboxes.map(i => i.reputationScore), 100);
  const runningCount = inboxes.filter(i => i.status === 'running').length;
  const pausedCount = inboxes.filter(i => i.status === 'paused').length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Inboxes Overview</h1>
          <p className="text-sm text-slate-500">Monitor and manage your email warmup network and deliverability scores.</p>
        </div>
        <button 
          onClick={() => onNavigate('inbox-settings')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Connect New Inbox</span>
        </button>
      </div>

      {/* 8 Top Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Emails Sent</p>
          <p className="text-lg font-bold text-slate-900 mt-1">{totalSent.toLocaleString()}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Inbox</p>
          <p className="text-lg font-bold text-blue-600 mt-1">{avgInbox}%</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Spam</p>
          <p className="text-lg font-bold text-amber-600 mt-1">{avgSpam}%</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Category</p>
          <p className="text-lg font-bold text-purple-600 mt-1">{avgCategory}%</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Highest score</p>
          <p className="text-lg font-bold text-emerald-600 mt-1">{highestScore}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Lowest score</p>
          <p className="text-lg font-bold text-red-500 mt-1">{lowestScore}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Running</p>
          <p className="text-lg font-bold text-emerald-600 mt-1">{runningCount}</p>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Paused</p>
          <p className="text-lg font-bold text-amber-500 mt-1">{pausedCount}</p>
        </div>
      </div>

      {/* Filter and Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Action Row Filters */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Bulk Actions</option>
              <option>Start Warmup</option>
              <option>Pause Warmup</option>
              <option>Delete Inbox</option>
            </select>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text"
                placeholder="Search by email, status, plan type..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              />
            </div>

            <div className="relative">
              <select 
                value={selectedTag}
                onChange={e => setSelectedTag(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tags: All</option>
                <option value="Primary">Primary</option>
                <option value="Outreach">Outreach</option>
                <option value="Sales">Sales</option>
                <option value="Growth">Growth</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="p-3.5 w-10 text-center">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="p-3.5 font-bold text-slate-700">Email ↑↓</th>
                <th className="p-3.5">Tags</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 flex items-center gap-1">Rotation <HelpCircle className="w-3 h-3 text-slate-400" /></th>
                <th className="p-3.5">Plan</th>
                <th className="p-3.5">Rep ⓘ</th>
                <th className="p-3.5">Sent ⓘ</th>
                <th className="p-3.5">Placement ⓘ</th>
                <th className="p-3.5">Spam ⓘ</th>
                <th className="p-3.5">Category ⓘ</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInboxes.map((inbox) => (
                <tr key={inbox.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="p-3.5 text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3.5">
                    <button 
                      onClick={() => {
                        onSelectInbox(inbox);
                        onNavigate('inbox-detail');
                      }}
                      className="font-semibold text-blue-600 hover:text-blue-800 hover:underline text-left text-xs"
                    >
                      {inbox.email}
                    </button>
                  </td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {inbox.tags.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      inbox.status === 'running' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${inbox.status === 'running' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {inbox.status === 'running' ? 'Running' : 'Paused'}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${inbox.rotation ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500 bg-slate-100'}`}>
                      {inbox.rotation ? '• Yes' : '• No'}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60 font-bold text-[11px]">
                      {inbox.plan}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-800">
                    <span className={inbox.reputationScore >= 90 ? 'text-emerald-600' : 'text-amber-600'}>
                      {inbox.reputationScore}%
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">
                    {inbox.emailsSent.toLocaleString()}
                  </td>
                  <td className="p-3.5 w-32">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-semibold">
                        <span className="text-blue-600">{inbox.inboxRate}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${inbox.inboxRate}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 text-amber-600 font-medium">
                    {inbox.spamRate}% ({inbox.spamCount})
                  </td>
                  <td className="p-3.5 text-purple-600 font-medium">
                    {inbox.categoryRate}% ({inbox.categoryCount})
                  </td>
                  <td className="p-3.5 text-right relative">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => onToggleStatus(inbox.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition-colors"
                        title={inbox.status === 'running' ? 'Pause' : 'Start'}
                      >
                        {inbox.status === 'running' ? <Pause className="w-4 h-4 text-amber-600" /> : <Play className="w-4 h-4 text-emerald-600" />}
                      </button>
                      <button 
                        onClick={() => {
                          onSelectInbox(inbox);
                          onNavigate('inbox-detail');
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition-colors"
                        title="Analytics"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          onSelectInbox(inbox);
                          onNavigate('inbox-settings');
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition-colors"
                        title="Settings"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Showing 1 to {filteredInboxes.length} of {filteredInboxes.length} results</span>
          <div className="flex items-center gap-2 font-medium">
            <button className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-400 cursor-not-allowed">Previous</button>
            <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold">1</span>
            <button className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-400 cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
