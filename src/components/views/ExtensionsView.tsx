import React, { useState } from 'react';
import { 
  Puzzle, 
  Download, 
  CheckCircle2, 
  Chrome, 
  Copy, 
  Check, 
  Zap, 
  RefreshCw, 
  Search, 
  FileSpreadsheet, 
  Trash2, 
  Send, 
  Linkedin, 
  MapPin, 
  Globe, 
  MailCheck, 
  AlertCircle, 
  Play, 
  Pause, 
  X, 
  Info, 
  Settings, 
  Activity,
  Clock,
  ShieldCheck,
  CheckCircle,
  Layers
} from 'lucide-react';
import { ExtensionSubTab } from '../../types';

interface ScrapedTask {
  id: string;
  source: 'linkedin' | 'google-map' | 'google-search' | 'email-finder';
  taskName: string;
  url: string;
  extractedCount: number;
  validCount: number;
  status: 'Completed' | 'Processing' | 'Failed';
  timestamp: string;
  leadsSample: Array<{ name: string; email: string; company?: string; role?: string }>;
}

export const ExtensionsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExtensionSubTab>('email-finder');
  
  // Extension Connection State
  const [extensionStatus, setExtensionStatus] = useState<Record<ExtensionSubTab, boolean>>({
    'email-finder': false, // Inactive by default so user sees State A first
    'linkedin-finder': true, // Active by default
    'google-map': false,
    'google-search': false,
  });

  // Task execution pause state for connected extension
  const [isTaskPaused, setIsTaskPaused] = useState(false);

  // Copy Feedback State
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Refresh Connection Animation State
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scraped Tasks Data State
  const [scrapedTasks, setScrapedTasks] = useState<ScrapedTask[]>([
    {
      id: 'task-1',
      source: 'linkedin',
      taskName: 'Sales Executive Search - Tech Companies',
      url: 'https://linkedin.com/sales/search/people?...',
      extractedCount: 42,
      validCount: 38,
      status: 'Completed',
      timestamp: 'Jul 27, 2026 13:40',
      leadsSample: [
        { name: 'David Miller', email: 'david.m@growthtech.io', company: 'GrowthTech', role: 'Sales Director' },
        { name: 'Jessica Taylor', email: 'jessica@cloudscale.net', company: 'CloudScale', role: 'VP Sales' }
      ]
    },
    {
      id: 'task-2',
      source: 'google-map',
      taskName: 'Austin Local Restaurants & Cafes',
      url: 'https://google.com/maps/search/restaurants+austin',
      extractedCount: 120,
      validCount: 104,
      status: 'Processing',
      timestamp: 'Jul 27, 2026 11:15',
      leadsSample: [
        { name: 'Austin BBQ Co', email: 'info@austinbbq.com', company: 'Austin BBQ Co' },
        { name: 'Lone Star Coffee', email: 'hello@lonestarcoffee.com', company: 'Lone Star Coffee' }
      ]
    },
    {
      id: 'task-3',
      source: 'google-search',
      taskName: 'SaaS Founders in San Francisco',
      url: 'https://google.com/search?q=saas+founder+san+francisco',
      extractedCount: 28,
      validCount: 25,
      status: 'Completed',
      timestamp: 'Jul 25, 2026 16:30',
      leadsSample: [
        { name: 'Alex Vance', email: 'alex@vanceai.com', company: 'Vance AI' }
      ]
    }
  ]);

  // Tasks Filter & Search State
  const [taskSearch, setTaskSearch] = useState('');
  const [taskSourceFilter, setTaskSourceFilter] = useState<string>('all');
  const [selectedTaskDetail, setSelectedTaskDetail] = useState<ScrapedTask | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handlers
  const handleCopyApiKey = () => {
    navigator.clipboard?.writeText('inb_live_key_993810238129381');
    setCopiedToken(true);
    showToast('API Key copied to clipboard!');
    setTimeout(() => setCopiedToken(false), 2500);
  };

  const handleCopyChromeUrl = () => {
    navigator.clipboard?.writeText('chrome://extensions');
    setCopiedUrl(true);
    showToast('Copied chrome://extensions to clipboard!');
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const toggleConnection = () => {
    const nextState = !extensionStatus[activeTab];
    setExtensionStatus(prev => ({ ...prev, [activeTab]: nextState }));
    showToast(nextState ? 'Extension connected successfully!' : 'Extension disconnected');
  };

  const handleRefreshConnection = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Connection refreshed (Ping: 12ms)');
    }, 1000);
  };

  const handleRunSampleTask = () => {
    const newTask: ScrapedTask = {
      id: `task-${Date.now()}`,
      source: activeTab,
      taskName: `Sample Scrape - ${getTabDetails(activeTab).title}`,
      url: `https://example.com/scraped-data`,
      extractedCount: 35,
      validCount: 32,
      status: 'Completed',
      timestamp: 'Just now',
      leadsSample: [
        { name: 'Samantha Reed', email: 'samantha@samplelead.io', company: 'SampleLead', role: 'Head of Growth' },
        { name: 'Brandon Cole', email: 'brandon@innovate.co', company: 'Innovate Co', role: 'Founder' }
      ]
    };

    setScrapedTasks(prev => [newTask, ...prev]);
    showToast(`Sample scraped task added! 35 leads extracted.`);
  };

  const handleDeleteTask = (id: string) => {
    setScrapedTasks(prev => prev.filter(t => t.id !== id));
    if (selectedTaskDetail?.id === id) setSelectedTaskDetail(null);
  };

  const handleExportTaskCsv = (task: ScrapedTask) => {
    showToast(`Exporting ${task.extractedCount} leads to CSV...`);
  };

  const handlePushToContacts = (task: ScrapedTask) => {
    showToast(`Pushed ${task.validCount} verified leads to Contacts!`);
  };

  // Helper info for selected tab
  function getTabDetails(tab: ExtensionSubTab) {
    switch (tab) {
      case 'email-finder':
        return {
          title: 'Email Verifier & Finder',
          version: 'v2.4.1',
          desc: 'Verify emails found on web pages in 1-click & sync directly to CRM contacts.',
          icon: <MailCheck className="w-6 h-6 text-blue-400" />,
          stats: 235
        };
      case 'linkedin-finder':
        return {
          title: 'LinkedIn Profile Extractor',
          version: 'v1.8.0',
          desc: 'Extract validated work emails, job titles, and company data directly from LinkedIn profiles & Sales Navigator.',
          icon: <Linkedin className="w-6 h-6 text-blue-400" />,
          stats: 142
        };
      case 'google-map':
        return {
          title: 'Google Maps Scraper',
          version: 'v1.2.0',
          desc: 'Scrape local business emails, phone numbers, domain names & Google ratings directly from Maps search results.',
          icon: <MapPin className="w-6 h-6 text-blue-400" />,
          stats: 120
        };
      case 'google-search':
        return {
          title: 'Google Search Scraper',
          version: 'v1.1.0',
          desc: 'Extract leads and emails directly from Google Search SERP results for targeted niche queries.',
          icon: <Globe className="w-6 h-6 text-blue-400" />,
          stats: 45
        };
    }
  }

  const currentTabInfo = getTabDetails(activeTab);
  const isConnected = extensionStatus[activeTab];

  // Filtered Tasks
  const filteredTasks = scrapedTasks.filter(t => {
    const matchesSearch = t.taskName.toLowerCase().includes(taskSearch.toLowerCase()) ||
                          t.url.toLowerCase().includes(taskSearch.toLowerCase());
    const matchesSource = taskSourceFilter === 'all' || t.source === taskSourceFilter;
    return matchesSearch && matchesSource;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
          <span>Lead Gen</span>
          <span>&gt;</span>
          <span className="text-slate-800 font-bold">Extensions</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Puzzle className="w-7 h-7 text-blue-600" />
          <span>Browser Extensions Center</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Capture, verify, and auto-sync prospect leads directly from your web browser.
        </p>
      </div>

      {/* SUB-NAVIGATION CATEGORY TABS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'email-finder', label: 'Email Verifier & Finder', icon: <MailCheck className="w-3.5 h-3.5" /> },
          { id: 'linkedin-finder', label: 'LinkedIn Profile Extractor', icon: <Linkedin className="w-3.5 h-3.5" /> },
          { id: 'google-map', label: 'Google Maps Scraper', icon: <MapPin className="w-3.5 h-3.5" /> },
          { id: 'google-search', label: 'Google Search Scraper', icon: <Globe className="w-3.5 h-3.5" /> }
        ].map(t => {
          const tabId = t.id as ExtensionSubTab;
          const details = getTabDetails(tabId);
          const tabIsConnected = extensionStatus[tabId];
          const isActive = activeTab === tabId;

          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(tabId)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.01]'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-blue-600'}>{t.icon}</span>
              <span>{t.label}</span>
              
              {/* Status Badge */}
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : tabIsConnected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
              }`}>
                {tabIsConnected ? '🟢 Active' : '🔴 Install'}
              </span>

              {/* Quick Stats Counter */}
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black ${
                isActive ? 'bg-blue-800/80 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                ({details.stats})
              </span>
            </button>
          );
        })}
      </div>

      {/* DYNAMIC STATE SWITCHING CONTAINER */}

      {!isConnected ? (
        /* 🔴 1. STATE A: EXTENSION NOT INSTALLED / INACTIVE */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-0 animate-in fade-in">
          
          {/* STATE A HEADER */}
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400 shrink-0">
                <Chrome className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold tracking-tight">Browser Extension Integration</h2>
                <p className="text-xs text-slate-400">Install and link extension to scrape &amp; verify leads automatically</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-extrabold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>🔴 Not Connected</span>
              </span>

              {/* SIMULATE CONNECT BUTTON */}
              <button 
                onClick={toggleConnection}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1"
                title="Click to simulate extension connection"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Simulate Connect</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            
            {/* 📥 DOWNLOAD EXTENSION SECTION */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Download className="w-4 h-4 text-blue-600" />
                <span>📥 DOWNLOAD EXTENSION</span>
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                <button 
                  onClick={() => showToast(`Downloading Chrome Extension (${currentTabInfo.title} v2.4.1.zip)...`)}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>⬇️ Download Chrome Extension (.zip)</span>
                </button>

                <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
                  <span className="bg-slate-200/80 px-2.5 py-1 rounded-lg text-slate-800 font-mono">Version 2.4.1</span>
                  <span>|</span>
                  <span className="text-slate-500">Updated: July 2026</span>
                </div>
              </div>
            </div>

            {/* 📖 INSTALLATION GUIDE (3 EASY STEPS) */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-600" />
                <span>📖 INSTALLATION GUIDE (৩টি সহজ ধাপ)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* STEP 1 */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 hover:border-slate-300 transition-all shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-slate-900 text-white rounded-lg font-black text-xs">[ Step 1: Unzip ]</span>
                  </div>
                  <p className="text-xs text-slate-700 font-bold leading-relaxed pt-1">
                    👉 .zip ফাইলটি ডাউনলোড করে আপনার পিসিতে Extract / Unzip করুন।
                  </p>
                </div>

                {/* STEP 2 */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 hover:border-slate-300 transition-all shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-slate-900 text-white rounded-lg font-black text-xs">[ Step 2: Developer Mode ]</span>
                    <button 
                      onClick={handleCopyChromeUrl}
                      className="text-[10px] font-extrabold text-blue-600 hover:underline"
                    >
                      {copiedUrl ? 'Copied URL!' : 'Copy URL'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 font-bold leading-relaxed pt-1">
                    👉 Chrome ব্রাউজারে <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 font-mono">chrome://extensions</code> ওপেন করে ডান কোণায় 'Developer mode' অপশনটি On করুন।
                  </p>
                </div>

                {/* STEP 3 */}
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-2 hover:border-blue-300 transition-all shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-blue-600 text-white rounded-lg font-black text-xs">[ Step 3: Load Unpacked ]</span>
                    <button 
                      onClick={handleCopyApiKey}
                      className="text-[10px] font-extrabold text-blue-700 hover:underline"
                    >
                      {copiedToken ? 'API Key Copied!' : 'Copy Key'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 font-bold leading-relaxed pt-1">
                    👉 উপরে 'Load unpacked' বাটনে ক্লিক করে Extract করা ফোল্ডারটি নির্বাচন করুন।
                  </p>
                </div>

              </div>
            </div>

            {/* ⏱️ WAITING FOOTER BANNER */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
                <span>⏱️ Waiting for extension connection... (Connects automatically when installed and pinned)</span>
              </div>

              <button 
                onClick={toggleConnection}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all shrink-0"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Connect Extension</span>
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* 🟢 2. STATE B: EXTENSION ACTIVE & CONNECTED */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-0 animate-in fade-in">
          
          {/* STATE B HEADER */}
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold tracking-tight">Browser Extension Control Panel</h2>
                <p className="text-xs text-slate-400">Live controls, background scraping, and execution status</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>🟢 Active v2.4.1</span>
              </span>

              {/* SIMULATE DISCONNECT BUTTON */}
              <button 
                onClick={toggleConnection}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all border border-slate-700"
                title="Click to simulate disconnect"
              >
                Disconnect
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            
            {/* QUICK CONTROLS & ACTIONS */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  QUICK CONTROLS &amp; ACTIONS
                </h3>
                <div className="text-xs font-extrabold text-emerald-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Status: 🟢 Running (Scraping &amp; Verification Active)</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                
                {/* Pause / Resume Execution */}
                <button 
                  onClick={() => {
                    setIsTaskPaused(!isTaskPaused);
                    showToast(isTaskPaused ? 'Scraping task resumed' : 'Scraping task paused');
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all border shadow-2xs ${
                    isTaskPaused
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
                  }`}
                >
                  {isTaskPaused ? (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>▶️ Resume Execution</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-700" />
                      <span>⏸️ Pause Execution</span>
                    </>
                  )}
                </button>

                {/* Refresh Connection */}
                <button 
                  onClick={handleRefreshConnection}
                  disabled={isRefreshing}
                  className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-extrabold rounded-xl text-xs border border-slate-200 flex items-center gap-2 transition-all shadow-2xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>🔄 Refresh Connection</span>
                </button>

                {/* Extension Settings */}
                <button 
                  onClick={() => showToast('Opening Extension Settings...')}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-2xs transition-all"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>⚙️ Extension Settings</span>
                </button>

              </div>
            </div>

            {/* LIVE EXECUTION SUMMARY (4 CARDS) */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span>LIVE EXECUTION SUMMARY</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* CARD 1: CURRENT TASK */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5 hover:border-slate-300 transition-all">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Current Task</div>
                  <div className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Social Scraping</span>
                  </div>
                </div>

                {/* CARD 2: LEADS EXTRACTED */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5 hover:border-slate-300 transition-all">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Leads Extracted</div>
                  <div className="text-xl font-black text-slate-900 tracking-tight">
                    420 <span className="text-xs font-bold text-slate-400">Leads</span>
                  </div>
                </div>

                {/* CARD 3: VERIFIED EMAILS */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5 hover:border-slate-300 transition-all">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Verified Emails</div>
                  <div className="text-xl font-black text-emerald-600 tracking-tight">
                    388 <span className="text-xs font-bold text-emerald-700/80">Valid</span>
                  </div>
                </div>

                {/* CARD 4: SAFETY THROTTLE */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5 hover:border-slate-300 transition-all">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Safety Throttle</div>
                  <div className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                    <span>Safe (15/min)</span>
                    <span className="text-emerald-500">🟢</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      )}

      {/* EXTENSION SCRAPED TASKS & LIVE ACTIVITY CENTER */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        
        {/* Activity Center Toolbar */}
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/60">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              <span>Extension Scraped Tasks &amp; Live Activity</span>
            </h3>
            <p className="text-[11px] text-slate-500">Review, export, and auto-sync contacts captured by your browser extension.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            
            {/* Search Input */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tasks..."
                value={taskSearch}
                onChange={e => setTaskSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Source Filter */}
            <select 
              value={taskSourceFilter}
              onChange={e => setTaskSourceFilter(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="all">All Sources</option>
              <option value="linkedin">LinkedIn</option>
              <option value="google-map">Google Maps</option>
              <option value="google-search">Google Search</option>
              <option value="email-finder">Email Verifier</option>
            </select>

            {/* Run Sample Task Button */}
            <button 
              onClick={handleRunSampleTask}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-2xs flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Run Sample Task</span>
            </button>

          </div>
        </div>

        {/* Task Table */}
        {filteredTasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Source</th>
                  <th className="p-3.5 text-slate-900">Task Name / URL</th>
                  <th className="p-3.5">Extracted Leads</th>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    
                    {/* Source Icon & Name */}
                    <td className="p-3.5">
                      {t.source === 'linkedin' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-200 text-[11px]">
                          <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                          <span>LinkedIn</span>
                        </span>
                      )}
                      {t.source === 'google-map' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Google Maps</span>
                        </span>
                      )}
                      {t.source === 'google-search' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-bold border border-purple-200 text-[11px]">
                          <Globe className="w-3.5 h-3.5 text-purple-600" />
                          <span>Google Search</span>
                        </span>
                      )}
                      {t.source === 'email-finder' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-bold border border-amber-200 text-[11px]">
                          <MailCheck className="w-3.5 h-3.5 text-amber-600" />
                          <span>Email Verifier</span>
                        </span>
                      )}
                    </td>

                    {/* Task Name & URL */}
                    <td className="p-3.5">
                      <h4 className="font-bold text-slate-900 text-xs">{t.taskName}</h4>
                      <p className="text-[10px] text-slate-400 font-mono truncate max-w-xs">{t.url}</p>
                    </td>

                    {/* Extracted Leads */}
                    <td className="p-3.5">
                      <span className="font-mono font-bold text-slate-900">{t.extractedCount} Leads</span>
                      <span className="text-[10px] text-emerald-600 font-semibold block">({t.validCount} verified)</span>
                    </td>

                    {/* Timestamp */}
                    <td className="p-3.5 text-slate-400 font-medium">{t.timestamp}</td>

                    {/* Status */}
                    <td className="p-3.5">
                      {t.status === 'Completed' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
                          🟢 Completed
                        </span>
                      )}
                      {t.status === 'Processing' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200 text-[11px]">
                          🟡 Processing
                        </span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleExportTaskCsv(t)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs flex items-center gap-1"
                        >
                          <Download className="w-3 h-3 text-blue-600" />
                          <span>Export CSV</span>
                        </button>

                        <button 
                          onClick={() => handlePushToContacts(t)}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-2xs"
                        >
                          <Send className="w-3 h-3" />
                          <span>Push Contacts</span>
                        </button>

                        <button 
                          onClick={() => setSelectedTaskDetail(t)}
                          className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg"
                          title="View Lead Details"
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>

                        <button 
                          onClick={() => handleDeleteTask(t.id)}
                          className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg"
                          title="Delete Task"
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
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <Puzzle className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-xs font-semibold text-slate-600">No scraped task history found.</p>
            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
              Start scraping profiles or websites using the browser extension or click "Run Sample Task" above to test the view.
            </p>
            <button 
              onClick={handleRunSampleTask}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20"
            >
              Run Sample Task
            </button>
          </div>
        )}

      </div>

      {/* TASK LEADS DETAIL MODAL */}
      {selectedTaskDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">{selectedTaskDetail.taskName}</h3>
                <p className="text-[11px] text-slate-400">{selectedTaskDetail.extractedCount} extracted prospects</p>
              </div>
              <button onClick={() => setSelectedTaskDetail(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Sample Extracted Leads</h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                {selectedTaskDetail.leadsSample.map((l, i) => (
                  <div key={i} className="p-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{l.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{l.email}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-700 block">{l.company || '—'}</span>
                      <span className="text-[10px] text-slate-400">{l.role || ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button 
                onClick={() => setSelectedTaskDetail(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  handlePushToContacts(selectedTaskDetail);
                  setSelectedTaskDetail(null);
                }}
                className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20"
              >
                Sync All to Contacts
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
