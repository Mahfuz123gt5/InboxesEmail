import React, { useState } from 'react';
import { 
  FlaskConical, 
  Send, 
  CheckCircle2, 
  RefreshCw, 
  Mail, 
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  Download,
  Search,
  Filter,
  X,
  FileText,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Zap,
  CreditCard,
  HelpCircle,
  Eye,
  Trash2,
  ShieldAlert,
  Server,
  Key,
  Globe,
  Gauge
} from 'lucide-react';
import { Inbox } from '../../types';

interface InboxesTesterViewProps {
  inboxes: Inbox[];
}

// Mock Audit History Interface
interface AuditLog {
  id: string;
  timestamp: string;
  senderInbox: string;
  score: number;
  placementSummary: string;
  primaryRatio: number;
  spamRatio: number;
  lostRatio: number;
  authStatus: 'All Pass' | 'DMARC Warning' | 'SPF Fail';
  spf: 'Pass' | 'Fail';
  dkim: 'Pass' | 'Fail';
  dmarc: 'Pass' | 'Quarantine' | 'Fail';
  spamScore: string;
  googleStatus: string;
  outlookStatus: string;
  yahooStatus: string;
  icloudStatus: string;
  subject: string;
}

// Initial Mock History Data
const INITIAL_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: 'Jul 28, 2026 03:15',
    senderInbox: 'siamqwer436+warm007@gmail.com',
    score: 92,
    placementSummary: '85% Primary Inbox',
    primaryRatio: 85,
    spamRatio: 15,
    lostRatio: 0,
    authStatus: 'DMARC Warning',
    spf: 'Pass',
    dkim: 'Pass',
    dmarc: 'Quarantine',
    spamScore: '0.8 / 10 (Low Risk)',
    googleStatus: 'Primary Inbox',
    outlookStatus: 'Primary Inbox',
    yahooStatus: 'Spam Folder',
    icloudStatus: 'Primary Inbox',
    subject: 'Deliverability Audit Test - Q3 Campaign'
  },
  {
    id: 'log-2',
    timestamp: 'Jul 25, 2026 14:20',
    senderInbox: 'warm007@gmail.com',
    score: 64,
    placementSummary: '50% Spam Folder',
    primaryRatio: 50,
    spamRatio: 50,
    lostRatio: 0,
    authStatus: 'SPF Fail',
    spf: 'Fail',
    dkim: 'Pass',
    dmarc: 'Fail',
    spamScore: '4.2 / 10 (Moderate Risk)',
    googleStatus: 'Spam Folder',
    outlookStatus: 'Primary Inbox',
    yahooStatus: 'Spam Folder',
    icloudStatus: 'Bounced / Blocked',
    subject: 'Quick question regarding your growth strategy'
  },
  {
    id: 'log-3',
    timestamp: 'Jul 22, 2026 09:45',
    senderInbox: 'alex@growthagency.io',
    score: 98,
    placementSummary: '100% Primary Inbox',
    primaryRatio: 100,
    spamRatio: 0,
    lostRatio: 0,
    authStatus: 'All Pass',
    spf: 'Pass',
    dkim: 'Pass',
    dmarc: 'Pass',
    spamScore: '0.1 / 10 (Optimal)',
    googleStatus: 'Primary Inbox',
    outlookStatus: 'Primary Inbox',
    yahooStatus: 'Primary Inbox',
    icloudStatus: 'Primary Inbox',
    subject: 'Partnership opportunity for Q4'
  }
];

export const InboxesTesterView: React.FC<InboxesTesterViewProps> = ({ inboxes }) => {
  // Test Remaining State
  const [testsRemaining, setTestsRemaining] = useState(42);

  // Test Config State
  const defaultEmail = inboxes[0]?.email || 'siamqwer436+warm007@gmail.com';
  const [selectedInbox, setSelectedInbox] = useState(defaultEmail);
  const [testMode, setTestMode] = useState<'auto' | 'manual'>('auto');
  const [seedAddress] = useState('test-8f92a@checkinbox.org');
  const [copiedSeed, setCopiedSeed] = useState(false);
  const [subject, setSubject] = useState('Deliverability Audit Test - Quick Check');
  const [emailBody, setEmailBody] = useState('Hi John,\n\nI noticed your recent article on cold outreach deliverability. Would love to connect and share some insights on SPF/DKIM optimization.\n\nBest,\nAlex');
  const [showBodyEditor, setShowBodyEditor] = useState(false);

  // Running Test State
  const [isTesting, setIsTesting] = useState(false);
  
  // Current Active Audit Report (Default populated with rich data)
  const [activeReport, setActiveReport] = useState<AuditLog>(INITIAL_LOGS[0]);

  // History Log List
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_LOGS);
  const [logSearchQuery, setLogSearchQuery] = useState('');
  const [logFilterInbox, setLogFilterInbox] = useState<string>('All');

  // Fix Recommendation Drawer Modal
  const [isFixDrawerOpen, setIsFixDrawerOpen] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Copy Seed Handler
  const handleCopySeed = () => {
    navigator.clipboard.writeText(seedAddress);
    setCopiedSeed(true);
    showToast('Copied seed address: test-8f92a@checkinbox.org');
    setTimeout(() => setCopiedSeed(false), 2000);
  };

  // Run Test Handler
  const handleRunTest = () => {
    if (testsRemaining <= 0) {
      showToast('No tests remaining! Please refill your test credits.');
      return;
    }

    setIsTesting(true);

    setTimeout(() => {
      setIsTesting(false);
      setTestsRemaining(prev => Math.max(0, prev - 1));

      const newLog: AuditLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }),
        senderInbox: selectedInbox,
        score: Math.floor(Math.random() * 15) + 85, // 85 - 99
        placementSummary: '88% Primary Inbox',
        primaryRatio: 88,
        spamRatio: 12,
        lostRatio: 0,
        authStatus: 'All Pass',
        spf: 'Pass',
        dkim: 'Pass',
        dmarc: 'Pass',
        spamScore: '0.4 / 10 (Low Risk)',
        googleStatus: 'Primary Inbox',
        outlookStatus: 'Primary Inbox',
        yahooStatus: 'Primary Inbox',
        icloudStatus: 'Primary Inbox',
        subject: subject || 'Untitled Audit Test'
      };

      setActiveReport(newLog);
      setAuditLogs([newLog, ...auditLogs]);
      showToast('Deliverability audit completed! Score: ' + newLog.score + '/100');
    }, 1500);
  };

  // Filtered Logs
  const filteredLogs = auditLogs.filter(log => {
    if (logFilterInbox !== 'All' && log.senderInbox !== logFilterInbox) return false;
    if (logSearchQuery.trim()) {
      const q = logSearchQuery.toLowerCase();
      return (
        log.senderInbox.toLowerCase().includes(q) ||
        log.subject.toLowerCase().includes(q) ||
        log.placementSummary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* DMARC FIX INSTRUCTIONS DRAWER MODAL */}
      {isFixDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full p-6 shadow-2xl border-l border-slate-200 overflow-y-auto space-y-5 animate-in slide-in-from-right-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-slate-900 text-base">How to Fix DMARC Policy</h3>
              </div>
              <button onClick={() => setIsFixDrawerOpen(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <p className="leading-relaxed">
                Your DMARC record is currently set to <code className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">p=none</code>. Major email providers like Google and Yahoo require a strict policy (<code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">p=quarantine</code> or <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">p=reject</code>) for high inbox placement.
              </p>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-2 font-mono text-[11px]">
                <div className="text-slate-400 font-sans font-bold text-[10px] uppercase">Recommended DNS TXT Record:</div>
                <div className="text-amber-400 font-bold">Host / Name:</div>
                <div className="bg-slate-800 p-2 rounded text-emerald-400">_dmarc.yourdomain.com</div>
                <div className="text-amber-400 font-bold mt-2">TXT Value:</div>
                <div className="bg-slate-800 p-2 rounded text-emerald-400 select-all font-bold">
                  v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@yourdomain.com; pct=100;
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-2 text-blue-900">
                <h4 className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Step-by-Step Fix Instructions</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-blue-800">
                  <li>Log in to your DNS provider (Cloudflare, GoDaddy, Namecheap).</li>
                  <li>Navigate to DNS Management and click <strong>Add TXT Record</strong>.</li>
                  <li>Enter <code className="font-bold">_dmarc</code> as Host and copy the TXT Value above.</li>
                  <li>Save and wait 10-15 minutes for DNS propagation, then click <strong>Re-Test</strong> below.</li>
                </ol>
              </div>

              <button
                onClick={() => {
                  setIsFixDrawerOpen(false);
                  handleRunTest();
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md text-xs flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Save & Re-Test Deliverability</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER & TOP BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
            <span>Lead Gen</span>
            <span className="text-slate-300">&gt;</span>
            <span className="text-blue-600 font-extrabold">Inboxes Tester</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Inboxes Tester & Deliverability Audit</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Live Inspector
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Test immediate deliverability and authentication headers across major email providers.
          </p>
        </div>

        {/* Top-Right Badges */}
        <div className="flex items-center gap-3">
          
          {/* Tests Remaining Badge */}
          <div className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xl">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <div className="text-xs font-extrabold text-slate-900">
              <span>Tests Remaining: </span>
              <span className="text-blue-600 font-black">{testsRemaining}</span>
            </div>
            <button
              onClick={() => {
                setTestsRemaining(prev => prev + 25);
                showToast('Added 25 Test Credits!');
              }}
              className="ml-1 text-[10px] font-black bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg transition-all"
            >
              + Add
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => showToast('Refreshed deliverability engine status')}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all border border-slate-200"
            title="Refresh Engine"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

        </div>
      </div>

      {/* MAIN DUAL-PANEL GRID (1. TEST CONFIGURATION & 2. DELIVERABILITY AUDIT REPORT) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* PANEL 1: TEST CONFIGURATION (LEFT 1 COL) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 h-fit">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              <FlaskConical className="w-4 h-4 text-blue-600" />
              <span>1. Test Configuration</span>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">Step 1 of 2</span>
          </div>

          {/* Select Sender Inbox Dropdown with Health Badges */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Select Sender Inbox</label>
            <select
              value={selectedInbox}
              onChange={e => setSelectedInbox(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {inboxes.length > 0 ? (
                inboxes.map(i => (
                  <option key={i.id} value={i.email}>
                    {i.email} ({i.warmupStatus === 'active' ? '🟢 Warmup Active - 98% Health' : '🟡 Warmup Paused'})
                  </option>
                ))
              ) : (
                <option value="siamqwer436+warm007@gmail.com">
                  siamqwer436+warm007@gmail.com (🟢 Warmup Active - 98% Health)
                </option>
              )}
              <option value="warm007@gmail.com">warm007@gmail.com (🟡 Need Attention - 64% Health)</option>
              <option value="alex@growthagency.io">alex@growthagency.io (🟢 Optimal - 99% Health)</option>
            </select>
          </div>

          {/* Test Mode Selector */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-slate-700">Test Mode</label>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => setTestMode('auto')}
                className={`p-2.5 rounded-xl border transition-all text-left flex flex-col gap-1 ${
                  testMode === 'auto'
                    ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold">
                  <span className={`w-2.5 h-2.5 rounded-full ${testMode === 'auto' ? 'bg-blue-600' : 'bg-slate-300'}`} />
                  <span>Auto-Send via API</span>
                </span>
                <span className="text-[10px] text-slate-500 font-normal">1-Click instant test</span>
              </button>

              <button
                onClick={() => setTestMode('manual')}
                className={`p-2.5 rounded-xl border transition-all text-left flex flex-col gap-1 ${
                  testMode === 'manual'
                    ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold">
                  <span className={`w-2.5 h-2.5 rounded-full ${testMode === 'manual' ? 'bg-blue-600' : 'bg-slate-300'}`} />
                  <span>Manual Seed Send</span>
                </span>
                <span className="text-[10px] text-slate-500 font-normal">For external CRMs</span>
              </button>
            </div>
          </div>

          {/* Unique Seed Address Field */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-bold text-slate-700 flex justify-between">
              <span>Unique Seed Address</span>
              <span className="text-[10px] text-blue-600 font-bold">Single-Use Seed</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={seedAddress}
                className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800"
              />
              <button
                onClick={handleCopySeed}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-2xs"
              >
                {copiedSeed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSeed ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Subject Line */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Subject Line</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="e.g. Deliverability Audit Test"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Expandable Text Content Editor */}
          <div className="space-y-1.5 pt-1">
            <button
              onClick={() => setShowBodyEditor(!showBodyEditor)}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>{showBodyEditor ? '▼ Hide Email Body Editor' : '▶ Test Email Body Copy (Spam Trigger Check)'}</span>
            </button>

            {showBodyEditor && (
              <div className="space-y-1.5 animate-in fade-in">
                <textarea
                  rows={4}
                  value={emailBody}
                  onChange={e => setEmailBody(e.target.value)}
                  placeholder="Paste cold email template body here..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-normal text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Spam keywords scanned automatically</span>
                  <span>{emailBody.length} chars</span>
                </div>
              </div>
            )}
          </div>

          {/* RUN TEST CTA BUTTON */}
          <button
            onClick={handleRunTest}
            disabled={isTesting}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:bg-slate-300 text-white rounded-xl font-black text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-98"
          >
            {isTesting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
                <span>Testing Deliverability Across ESPs...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>🚀 Run Deliverability Test</span>
              </>
            )}
          </button>

        </div>

        {/* PANEL 2: DELIVERABILITY AUDIT REPORT (RIGHT 2 COLS) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* A. Overall Health Gauge & Quick Summary Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
              
              <div className="flex items-center gap-3">
                {/* Dynamic Gauge Badge */}
                <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black shadow-inner border ${
                  activeReport.score >= 90
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : activeReport.score >= 70
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  <span className="text-xl leading-none">{activeReport.score}</span>
                  <span className="text-[9px] font-bold opacity-75">/ 100</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">Deliverability Audit Report</h3>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      activeReport.score >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {activeReport.score >= 90 ? '🟢 Optimal Health' : '🟡 Attention Required'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tested inbox: <span className="font-bold text-slate-700">{activeReport.senderInbox}</span> • {activeReport.timestamp}
                  </p>
                </div>
              </div>

              {/* Download PDF Button */}
              <button
                onClick={() => showToast('Generated shareable PDF audit report for ' + activeReport.senderInbox)}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-2xs transition-all shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>📥 Download PDF Report</span>
              </button>

            </div>

            {/* B. Inbox Placement Breakdown (Visual Progress Bar) */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>INBOX PLACEMENT BREAKDOWN</span>
                </span>
                <span className="text-emerald-700 font-extrabold">{activeReport.placementSummary}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${activeReport.primaryRatio}%` }}
                  title={`${activeReport.primaryRatio}% Primary`}
                />
                <div 
                  className="bg-amber-500 h-full transition-all duration-500" 
                  style={{ width: `${activeReport.spamRatio}%` }}
                  title={`${activeReport.spamRatio}% Spam`}
                />
                <div 
                  className="bg-rose-500 h-full transition-all duration-500" 
                  style={{ width: `${activeReport.lostRatio}%` }}
                  title={`${activeReport.lostRatio}% Bounced`}
                />
              </div>

              {/* ESP Breakdown Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 text-xs font-bold">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-600 text-[11px]">Google / Gmail</span>
                  <span className="text-emerald-700 font-black text-[11px] flex items-center gap-1">
                    <span>📥</span>
                    <span>{activeReport.googleStatus}</span>
                  </span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-600 text-[11px]">Outlook / O365</span>
                  <span className="text-emerald-700 font-black text-[11px] flex items-center gap-1">
                    <span>📥</span>
                    <span>{activeReport.outlookStatus}</span>
                  </span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-600 text-[11px]">Yahoo / AOL</span>
                  <span className={`font-black text-[11px] flex items-center gap-1 ${
                    activeReport.yahooStatus.includes('Spam') ? 'text-amber-600' : 'text-emerald-700'
                  }`}>
                    <span>{activeReport.yahooStatus.includes('Spam') ? '🚫' : '📥'}</span>
                    <span>{activeReport.yahooStatus}</span>
                  </span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-600 text-[11px]">iCloud / Custom</span>
                  <span className="text-emerald-700 font-black text-[11px] flex items-center gap-1">
                    <span>📥</span>
                    <span>{activeReport.icloudStatus}</span>
                  </span>
                </div>
              </div>

            </div>

            {/* C. Authentication & Security Diagnostics Grid */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Authentication & Security Checks</span>
                </h4>
                <button
                  onClick={() => setIsFixDrawerOpen(true)}
                  className="text-[11px] font-extrabold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>💡 How to fix DMARC</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                
                {/* SPF Badge */}
                <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                  activeReport.spf === 'Pass' ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-normal">SPF Record</span>
                    <span>{activeReport.spf === 'Pass' ? '🟢 SPF: Pass' : '🔴 SPF: Fail'}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-70">v=spf1</span>
                </div>

                {/* DKIM Badge */}
                <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                  activeReport.dkim === 'Pass' ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-normal">DKIM Signature</span>
                    <span>{activeReport.dkim === 'Pass' ? '🟢 DKIM: Pass' : '🔴 DKIM: Fail'}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-70">2048-bit</span>
                </div>

                {/* DMARC Badge */}
                <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                  activeReport.dmarc === 'Pass' 
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
                    : activeReport.dmarc === 'Quarantine'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-normal">DMARC Policy</span>
                    <span>
                      {activeReport.dmarc === 'Pass' ? '🟢 DMARC: Pass' : activeReport.dmarc === 'Quarantine' ? '🟡 DMARC: Quarantine' : '🔴 DMARC: Missing'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono opacity-70">{activeReport.dmarc}</span>
                </div>

                {/* MX Record */}
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between text-xs font-bold text-emerald-900">
                  <div>
                    <span className="block text-[10px] text-slate-500 font-normal">MX Record</span>
                    <span>🟢 MX: Valid</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-70">Google MX</span>
                </div>

                {/* Reverse DNS */}
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between text-xs font-bold text-emerald-900">
                  <div>
                    <span className="block text-[10px] text-slate-500 font-normal">Reverse DNS (PTR)</span>
                    <span>🟢 PTR: Valid</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-70">Match</span>
                </div>

                {/* IP Reputation */}
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between text-xs font-bold text-emerald-900">
                  <div>
                    <span className="block text-[10px] text-slate-500 font-normal">IP Reputation</span>
                    <span>🟢 IP: Clean</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-70">0/50 BL</span>
                </div>

              </div>
            </div>

            {/* D. Spam Content & Blacklist Checker */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">SpamAssassin Content Analysis</span>
                <div className="flex justify-between items-center font-bold text-xs">
                  <span>Score: <span className="text-amber-400 font-mono">{activeReport.spamScore}</span></span>
                  <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded">Safe Copy</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">DNSBL Blacklist Monitor</span>
                <div className="flex justify-between items-center font-bold text-xs">
                  <span>Clean across <span className="text-emerald-400 font-mono">50+ DNSBLs</span></span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Spamhaus OK</span>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Tests are processed in seed mailboxes across Google, Microsoft & Yahoo.</span>
            </div>
            <button
              onClick={() => setIsFixDrawerOpen(true)}
              className="text-blue-600 hover:underline font-bold"
            >
              Configure DNS Records →
            </button>
          </div>

        </div>

      </div>

      {/* SECTION 3: RECENT TEST HISTORY & AUDIT LOGS (BOTTOM TABLE) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        
        {/* Table Header & Search Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">3. Recent Test History & Audit Logs</h3>
            <p className="text-xs text-slate-500 mt-0.5">Track deliverability changes over time across all connected inboxes.</p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search Input */}
            <div className="relative w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="🔍 Search logs..."
                value={logSearchQuery}
                onChange={e => setLogSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter by Inbox Dropdown */}
            <select
              value={logFilterInbox}
              onChange={e => setLogFilterInbox(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
            >
              <option value="All">Filter by Inbox (All)</option>
              {Array.from(new Set(auditLogs.map(l => l.senderInbox))).map((inbox, idx) => (
                <option key={idx} value={inbox}>{inbox}</option>
              ))}
            </select>

          </div>
        </div>

        {/* History Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-extrabold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Sender Inbox</th>
                <th className="py-3 px-3">Deliverability Score</th>
                <th className="py-3 px-3">Placement Ratio</th>
                <th className="py-3 px-3">Auth Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-all">
                  
                  {/* Timestamp */}
                  <td className="py-3.5 px-3 font-mono text-[11px] text-slate-500">
                    {log.timestamp}
                  </td>

                  {/* Sender Inbox */}
                  <td className="py-3.5 px-3">
                    <div className="font-extrabold text-slate-900">{log.senderInbox}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">{log.subject}</div>
                  </td>

                  {/* Score */}
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-1 rounded-lg font-black text-xs ${
                      log.score >= 90
                        ? 'bg-emerald-100 text-emerald-800'
                        : log.score >= 70
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {log.score}/100
                    </span>
                  </td>

                  {/* Placement Ratio */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className={log.primaryRatio >= 80 ? 'text-emerald-600' : 'text-amber-600'}>
                        🟢 {log.placementSummary}
                      </span>
                    </div>
                  </td>

                  {/* Auth Status */}
                  <td className="py-3.5 px-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      log.authStatus === 'All Pass'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {log.authStatus === 'All Pass' ? '🟢 All Pass' : '🔴 ' + log.authStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setActiveReport(log);
                          showToast(`Loaded audit report for ${log.senderInbox}`);
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs transition-all flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-600" />
                        <span>View</span>
                      </button>

                      <button
                        onClick={() => handleRunTest()}
                        className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-xs transition-all flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Re-Test</span>
                      </button>

                      <button
                        onClick={() => {
                          setAuditLogs(auditLogs.filter(item => item.id !== log.id));
                          showToast('Deleted audit log');
                        }}
                        className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                        title="Delete Log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
