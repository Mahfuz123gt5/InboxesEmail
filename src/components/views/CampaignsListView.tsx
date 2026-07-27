import React, { useState } from 'react';
import { 
  Send, 
  Plus, 
  Search, 
  Play, 
  Pause, 
  Edit3, 
  Trash2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Campaign, MainTab } from '../../types';

interface CampaignsListViewProps {
  campaigns: Campaign[];
  onNavigate: (tab: MainTab) => void;
  onEditCampaign: (campaign: Campaign) => void;
  onToggleStatus: (id: string) => void;
  onDeleteCampaign: (id: string) => void;
  onSelectCampaign?: (campaign: Campaign) => void;
}

export const CampaignsListView: React.FC<CampaignsListViewProps> = ({
  campaigns,
  onNavigate,
  onEditCampaign,
  onToggleStatus,
  onDeleteCampaign,
  onSelectCampaign
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredCampaigns = campaigns.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCampaigns.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCampaigns.map(c => c.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  if (campaigns.length === 0) {
    return (
      <div className="p-12 max-w-2xl mx-auto text-center space-y-4 my-12 bg-white rounded-3xl border border-slate-200 shadow-2xs">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
          <Send className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Launch your first campaign</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Reach prospects with personalized sequences and automated follow-ups that drive real replies.
        </p>
        <div className="pt-2">
          <button 
            onClick={() => onNavigate('campaign-new')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 inline-flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Campaigns</h1>
          <p className="text-sm text-slate-500">Manage cold outreach sequences and follow-up schedules.</p>
        </div>

        <button 
          onClick={() => onNavigate('campaign-new')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Campaign</span>
        </button>
      </div>

      {/* Filter and Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Bulk Action and Search Row */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <button className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 flex items-center gap-1.5">
              <Pause className="w-3.5 h-3.5 text-amber-600" />
              <span>Pause</span>
            </button>
            <button className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-emerald-600" />
              <span>Start</span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="p-3.5 w-10 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === filteredCampaigns.length && filteredCampaigns.length > 0} 
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                  />
                </th>
                <th className="p-3.5 text-slate-800">Name ↑↓</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Sent</th>
                <th className="p-3.5">Replied</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCampaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(camp.id)}
                      onChange={() => toggleSelectOne(camp.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                    />
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">
                    <button 
                      onClick={() => onSelectCampaign && onSelectCampaign(camp)}
                      className="flex items-center gap-1.5 hover:text-blue-600 text-left transition-colors group"
                    >
                      <span className="group-hover:underline">{camp.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                    </button>
                  </td>
                  <td className="p-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      camp.status === 'running'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${camp.status === 'running' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {camp.status}
                    </span>
                  </td>
                  <td className="p-3.5 w-44">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700">
                        <span>{camp.sentPercent}%</span>
                        <span className="text-slate-400">({camp.sentCount}/{camp.sentTotal})</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${camp.sentPercent}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 w-44">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700">
                        <span>{camp.repliedPercent}%</span>
                        <span className="text-slate-400">({camp.repliedCount}/{camp.repliedTotal})</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${camp.repliedPercent}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => onToggleStatus(camp.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition-colors"
                        title={camp.status === 'running' ? 'Pause' : 'Start'}
                      >
                        {camp.status === 'running' ? <Pause className="w-4 h-4 text-amber-600" /> : <Play className="w-4 h-4 text-emerald-600" />}
                      </button>
                      <button 
                        onClick={() => onEditCampaign(camp)}
                        className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition-colors"
                        title="Edit Campaign"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDeleteCampaign(camp.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                        title="Delete Campaign"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Showing 1 to {filteredCampaigns.length} of {filteredCampaigns.length} results</span>
          <div className="flex items-center gap-2 font-semibold">
            <button className="p-1 rounded bg-white border border-slate-200 text-slate-400 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold">1</span>
            <button className="p-1 rounded bg-white border border-slate-200 text-slate-400 cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
