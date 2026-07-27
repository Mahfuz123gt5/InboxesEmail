import React, { useState } from 'react';
import { 
  ChevronRight, 
  Settings, 
  CheckCircle2, 
  Play,
  Pause,
  Send,
  Mail,
  MessageSquare,
  AlertCircle,
  Users,
  Inbox,
  Clock,
  ArrowDown
} from 'lucide-react';
import { Campaign, MainTab } from '../../types';

interface CampaignDetailViewProps {
  campaign: Campaign;
  onNavigate: (tab: MainTab) => void;
  onEditCampaign: (campaign: Campaign) => void;
  onToggleStatus: (id: string) => void;
}

export const CampaignDetailView: React.FC<CampaignDetailViewProps> = ({
  campaign,
  onNavigate,
  onEditCampaign,
  onToggleStatus
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER & BREADCRUMBS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => onNavigate('campaigns')} className="hover:text-blue-600 transition-colors">
              Campaigns
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-bold">{campaign.name}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <span>{campaign.name}</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Badge */}
          <span className={`px-3 py-2 rounded-xl text-xs font-extrabold border flex items-center gap-1.5 shadow-2xs ${
            campaign.status === 'running' 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
              : 'bg-amber-50 text-amber-700 border-amber-300'
          }`}>
            <span className={`w-2 h-2 rounded-full ${campaign.status === 'running' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span>{campaign.status === 'running' ? '🟢 Running' : '🟡 Paused'}</span>
          </span>

          {/* Pause / Play Toggle */}
          <button 
            onClick={() => {
              onToggleStatus(campaign.id);
              showToast(campaign.status === 'running' ? 'Campaign paused' : 'Campaign started');
            }}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-xl text-xs border border-slate-200 flex items-center gap-1.5 transition-all shadow-2xs"
          >
            {campaign.status === 'running' ? (
              <>
                <Pause className="w-3.5 h-3.5 text-slate-700" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600" />
                <span>Resume</span>
              </>
            )}
          </button>

          {/* Edit Campaign Button */}
          <button 
            onClick={() => onEditCampaign(campaign)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Edit Campaign</span>
          </button>
        </div>
      </div>

      {/* TOP METRICS (4 CLEAN DATA CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CARD 1: TOTAL SENT */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
            <Send className="w-4 h-4 text-blue-600" />
            <span>Total Sent</span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            1,292
          </div>
        </div>

        {/* CARD 2: OPEN RATE */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>Open Rate</span>
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-600 tracking-tight">
            62%
          </div>
        </div>

        {/* CARD 3: REPLY RATE */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <span>Reply Rate</span>
            </span>
          </div>
          <div className="text-3xl font-black text-purple-600 tracking-tight">
            14%
          </div>
        </div>

        {/* CARD 4: BOUNCE RATE */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span>Bounce Rate</span>
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            1.2%
          </div>
        </div>

      </div>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: EMAIL SEQUENCE STEPS (2 COLS) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Email Sequence Steps</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Overview of messages and delivery metrics for each step
              </p>
            </div>

            <div className="space-y-4">
              
              {/* STEP 1 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                  <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">📧</span>
                  <span>Step 1: Initial Pitch</span>
                </div>

                <div className="text-xs font-semibold text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 font-mono">
                  Subject: Quick question regarding {"{{company}}"}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-1">
                  <div className="text-slate-600">
                    Sent: <span className="text-slate-900 font-extrabold">1,292</span>
                  </div>
                  <div className="text-slate-300">•</div>
                  <div className="text-emerald-700">
                    Opened: <span className="font-extrabold">62%</span>
                  </div>
                  <div className="text-slate-300">•</div>
                  <div className="text-purple-700">
                    Replied: <span className="font-extrabold">8%</span>
                  </div>
                </div>
              </div>

              {/* TIMELINE CONNECTOR */}
              <div className="flex items-center gap-2 pl-6 py-1 text-xs font-bold text-slate-500">
                <ArrowDown className="w-4 h-4 text-slate-400" />
                <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Wait 3 Days
                </span>
              </div>

              {/* STEP 2 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                  <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">📧</span>
                  <span>Step 2: Follow-up Email</span>
                </div>

                <div className="text-xs font-semibold text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 font-mono">
                  Subject: Re: Quick question regarding {"{{company}}"}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-1">
                  <div className="text-slate-600">
                    Sent: <span className="text-slate-900 font-extrabold">480</span>
                  </div>
                  <div className="text-slate-300">•</div>
                  <div className="text-emerald-700">
                    Opened: <span className="font-extrabold">48%</span>
                  </div>
                  <div className="text-slate-300">•</div>
                  <div className="text-purple-700">
                    Replied: <span className="font-extrabold">12%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LEADS & INBOX STATUS (1 COL) */}
        <div className="space-y-6">
          
          {/* LEAD SUMMARY */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Lead Summary
              </h3>
            </div>

            <div className="space-y-2.5 text-xs font-bold text-slate-700">
              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-slate-600">Total Leads</span>
                <span className="font-black text-slate-900">2,500</span>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-slate-600">In Progress</span>
                <span className="font-black text-blue-600">1,111</span>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-slate-600">Replied</span>
                <span className="font-black text-emerald-600">181</span>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-slate-600">Unsubscribed</span>
                <span className="font-black text-rose-500">32</span>
              </div>
            </div>
          </div>

          {/* ACTIVE SENDING INBOXES */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <Inbox className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Active Sending Inboxes
              </h3>
            </div>

            <div className="space-y-2.5 text-xs font-bold">
              <div className="flex justify-between items-center p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-slate-800">
                <span className="font-mono text-slate-900">siam@domain.com</span>
                <span className="text-emerald-700 font-extrabold flex items-center gap-1.5">
                  (45/50 Sent today)
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-slate-800">
                <span className="font-mono text-slate-900">sales@company.com</span>
                <span className="text-emerald-700 font-extrabold flex items-center gap-1.5">
                  (50/50 Sent today)
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
