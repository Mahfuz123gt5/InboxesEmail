import React, { useState } from 'react';
import { 
  ChevronRight, 
  Settings, 
  CheckCircle2, 
  Edit3,
  Send,
  Mail,
  MessageSquare,
  ShieldCheck,
  FolderKanban,
  Tag,
  FileText
} from 'lucide-react';
import { EmailTemplate, MainTab } from '../../types';

interface TemplateDetailViewProps {
  template: EmailTemplate;
  onNavigate: (tab: MainTab) => void;
  onEditTemplate: (template: EmailTemplate) => void;
}

export const TemplateDetailView: React.FC<TemplateDetailViewProps> = ({
  template,
  onNavigate,
  onEditTemplate
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [testEmailModal, setTestEmailModal] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('test@email.com');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendTestEmail = () => {
    if (!testEmailAddress.trim()) return;
    setTestEmailModal(false);
    showToast(`Test email sent successfully to ${testEmailAddress}!`);
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

      {/* TEST EMAIL MODAL */}
      {testEmailModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full space-y-4 animate-in zoom-in-95">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Send className="w-4 h-4 text-blue-600" />
              <span>Send Test Email</span>
            </h3>
            <p className="text-xs text-slate-500">
              Send a sample preview of this email template with rendered variables to your inbox.
            </p>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Recipient Email</label>
              <input
                type="email"
                value={testEmailAddress}
                onChange={e => setTestEmailAddress(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setTestEmailModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSendTestEmail}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20"
              >
                Send Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP HEADER & BREADCRUMBS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => onNavigate('templates')} className="hover:text-blue-600 transition-colors">
              Templates
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-bold">{template.subject || "Founders Cold Pitch v2"}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <span>{template.subject || "Founders Cold Pitch v2"}</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Type Tag */}
          <span className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs border border-slate-200 flex items-center gap-1.5 shadow-2xs">
            <Tag className="w-3.5 h-3.5 text-slate-500" />
            <span>🏷️ Cold Email</span>
          </span>

          {/* Send Test Button */}
          <button 
            onClick={() => setTestEmailModal(true)}
            className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold rounded-xl text-xs border border-blue-200 flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <Send className="w-3.5 h-3.5 text-blue-600" />
            <span>🧪 Send Test</span>
          </button>

          {/* Edit Template Button */}
          <button 
            onClick={() => onEditTemplate(template)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>✏️ Edit</span>
          </button>
        </div>
      </div>

      {/* GLOBAL PERFORMANCE (4 SIMPLE CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CARD 1: TOTAL SENT */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
            <Send className="w-4 h-4 text-blue-600" />
            <span>Total Sent</span>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            8,450 <span className="text-xs text-slate-400 font-normal">Times</span>
          </div>
        </div>

        {/* CARD 2: AVG OPEN RATE */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
            <Mail className="w-4 h-4 text-emerald-600" />
            <span>Avg Open Rate</span>
          </div>
          <div className="text-2xl font-black text-emerald-600 tracking-tight">
            68%
          </div>
        </div>

        {/* CARD 3: AVG REPLY RATE */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span>Avg Reply Rate</span>
          </div>
          <div className="text-2xl font-black text-purple-600 tracking-tight">
            18%
          </div>
        </div>

        {/* CARD 4: ACTIVE CAMPAIGNS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
            <FolderKanban className="w-4 h-4 text-indigo-600" />
            <span>Active Campaigns</span>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            3 <span className="text-xs text-slate-400 font-normal">Campaigns</span>
          </div>
        </div>

      </div>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: LIVE EMAIL PREVIEW (2 COLS) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Live Email Preview</span>
              </h3>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 font-sans text-xs">
              
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono font-bold text-slate-800 flex items-center gap-2">
                <span className="text-slate-400 text-[10px] uppercase tracking-wider font-sans shrink-0">Subject:</span>
                <span className="text-slate-900">
                  Quick question regarding <span className="bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-mono text-[11px] font-bold">{"{{company_name}}"}</span>
                </span>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 text-slate-700 font-medium leading-relaxed whitespace-pre-wrap space-y-3">
                <p>
                  Hi <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono text-[11px] font-bold">{"{{first_name}}"}</span>,
                </p>
                <p>
                  I noticed <span className="bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-mono text-[11px] font-bold">{"{{company_name}}"}</span> is expanding its team.
                </p>
                <p>
                  Are you open to automating your outreach?
                </p>
                <p className="pt-2 text-slate-600">
                  Best regards,<br />
                  <span className="bg-purple-100 text-purple-900 px-1.5 py-0.5 rounded font-mono text-[11px] font-bold">{"{{sender_name}}"}</span>
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SPAM CHECK & USAGE (1 COL) */}
        <div className="space-y-6">
          
          {/* SPAM & QUALITY CHECK */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Spam &amp; Quality Check
              </h3>
            </div>

            <div className="space-y-2.5 text-xs font-bold text-slate-700">
              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-slate-600">Spam Status</span>
                <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                  Safe 🟢
                </span>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-slate-600">Word Count</span>
                <span className="font-extrabold text-slate-900">85 Words</span>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="text-slate-600">Read Time</span>
                <span className="font-extrabold text-slate-900">~35 Seconds</span>
              </div>
            </div>
          </div>

          {/* ACTIVE IN CAMPAIGNS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Active In Campaigns
              </h3>
            </div>

            <div className="space-y-2.5 text-xs font-bold">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <span>Q3 SaaS Founders Outreach</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                <span>UK Agency Leads Batch 2</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
