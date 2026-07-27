import React, { useState } from 'react';
import { 
  Linkedin, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Plus, 
  RefreshCw, 
  Filter, 
  Globe, 
  Phone, 
  Users, 
  Building2, 
  ExternalLink, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  Trash2, 
  FileSpreadsheet, 
  RotateCcw,
  UserCheck
} from 'lucide-react';

interface LinkedInSearchTabProps {
  showToast: (msg: string) => void;
  creditsLeft: number;
  setCreditsLeft: React.Dispatch<React.SetStateAction<number>>;
}

interface LinkedInProfile {
  id: string;
  name: string;
  title: string;
  seniority: 'C-Level' | 'VP' | 'Director' | 'Head';
  company: string;
  companySize: string;
  funding: string;
  location: string;
  countryFlag: string;
  email: string;
  emailStatus: 'Verified' | 'Catch-All';
  phoneAvailable: boolean;
  linkedInUrl: string;
  avatar: string;
  added?: boolean;
}

const INITIAL_PROFILES: LinkedInProfile[] = [
  {
    id: 'li-1',
    name: 'Marcus Vance',
    title: 'VP of Sales & Growth',
    seniority: 'VP',
    company: 'CloudSync Inc.',
    companySize: '201-500',
    funding: 'Series B',
    location: 'New York, NY, USA',
    countryFlag: '🇺🇸',
    email: 'marcus.vance@cloudsync.com',
    emailStatus: 'Verified',
    phoneAvailable: true,
    linkedInUrl: 'https://linkedin.com/in/marcusvance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'li-2',
    name: 'Elena Rostova',
    title: 'Head of Growth Marketing',
    seniority: 'Head',
    company: 'DevScale Corp.',
    companySize: '51-200',
    funding: 'Series A',
    location: 'London, UK',
    countryFlag: '🇬🇧',
    email: 'e.rostova@devscale.co',
    emailStatus: 'Catch-All',
    phoneAvailable: true,
    linkedInUrl: 'https://linkedin.com/in/elenarostova',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'li-3',
    name: 'Sarah Chen',
    title: 'Chief Executive Officer',
    seniority: 'C-Level',
    company: 'TechFlow Systems',
    companySize: '50-200',
    funding: 'Series B',
    location: 'San Francisco, CA, USA',
    countryFlag: '🇺🇸',
    email: 'sarah@techflow.io',
    emailStatus: 'Verified',
    phoneAvailable: true,
    linkedInUrl: 'https://linkedin.com/in/sarahchen',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'li-4',
    name: 'Alex Rivera',
    title: 'Founder & CTO',
    seniority: 'C-Level',
    company: 'SaaSify.io',
    companySize: '11-50',
    funding: 'Seed',
    location: 'Austin, TX, USA',
    countryFlag: '🇺🇸',
    email: 'alex.r@saasify.io',
    emailStatus: 'Catch-All',
    phoneAvailable: false,
    linkedInUrl: 'https://linkedin.com/in/alexrivera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'li-5',
    name: 'David Zhang',
    title: 'Head of Business Development',
    seniority: 'Head',
    company: 'NextGen AI',
    companySize: '51-200',
    funding: 'Series A',
    location: 'Seattle, WA, USA',
    countryFlag: '🇺🇸',
    email: 'david.zhang@nextgenai.tech',
    emailStatus: 'Verified',
    phoneAvailable: true,
    linkedInUrl: 'https://linkedin.com/in/davidzhang',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'li-6',
    name: 'Chloe Bennett',
    title: 'Chief Revenue Officer',
    seniority: 'C-Level',
    company: 'Fintech Nexus',
    companySize: '201-500',
    funding: 'Public',
    location: 'Boston, MA, USA',
    countryFlag: '🇺🇸',
    email: 'chloe.b@fintechnexus.com',
    emailStatus: 'Verified',
    phoneAvailable: true,
    linkedInUrl: 'https://linkedin.com/in/chloebennett',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'li-7',
    name: 'James Sterling',
    title: 'VP of Product Strategy',
    seniority: 'VP',
    company: 'DataStream Logistics',
    companySize: '51-200',
    funding: 'Bootstrapped',
    location: 'Chicago, IL, USA',
    countryFlag: '🇺🇸',
    email: 'jsterling@datastream.com',
    emailStatus: 'Catch-All',
    phoneAvailable: true,
    linkedInUrl: 'https://linkedin.com/in/jamessterling',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'li-8',
    name: 'Priya Patel',
    title: 'Director of Growth',
    seniority: 'Director',
    company: 'HealthTech Direct',
    companySize: '11-50',
    funding: 'Seed',
    location: 'San Jose, CA, USA',
    countryFlag: '🇺🇸',
    email: 'p.patel@healthtechdirect.com',
    emailStatus: 'Verified',
    phoneAvailable: false,
    linkedInUrl: 'https://linkedin.com/in/priyapatel',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80'
  }
];

export const LinkedInSearchTab: React.FC<LinkedInSearchTabProps> = ({
  showToast,
  creditsLeft,
  setCreditsLeft
}) => {
  // LinkedIn Search Mode
  const [searchMode, setSearchMode] = useState<'url' | 'boolean' | 'list'>('url');
  
  // Search Inputs
  const [searchUrl, setSearchUrl] = useState('https://www.linkedin.com/sales/search/people?query=(filters:(value:%27VP%20of%20Sales%27))');
  const [booleanQuery, setBooleanQuery] = useState('"VP of Sales" AND "SaaS" NOT "Intern"');
  const [profileList, setProfileList] = useState('https://linkedin.com/in/marcusvance\nhttps://linkedin.com/in/elenarostova');

  // Limits & Speed
  const [leadLimit, setLeadLimit] = useState(1800);
  const [speedMode, setSpeedMode] = useState<'safe' | 'fast'>('safe');

  // Enrichment Options
  const [findWorkEmails, setFindWorkEmails] = useState(true);
  const [directPhones, setDirectPhones] = useState(true);
  const [skipExisting, setSkipExisting] = useState(true);

  // Extraction State
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);

  // Profiles State
  const [profiles, setProfiles] = useState<LinkedInProfile[]>(INITIAL_PROFILES);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Dropdown Menus State
  const [isBulkMenuOpen, setIsBulkMenuOpen] = useState(false);
  const [isSyncListMenuOpen, setIsSyncListMenuOpen] = useState(false);
  const [isColumnsMenuOpen, setIsColumnsMenuOpen] = useState(false);

  // Column Visibility
  const [columns, setColumns] = useState({
    profile: true,
    company: true,
    location: true,
    email: true,
    actions: true
  });

  // Obfuscated Email Helper
  const formatObfuscatedEmail = (email: string, isRevealed: boolean) => {
    if (isRevealed) return email;
    const [name, domain] = email.split('@');
    if (!name || !domain) return email;
    const maskedName = name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : `${name[0]}***`;
    return `${maskedName}@${domain}`;
  };

  // Run Extraction Handler
  const handleRunExtraction = () => {
    if (creditsLeft <= 0) {
      showToast('No credits left! Please refill your search credits.');
      return;
    }

    setIsExtracting(true);
    setExtractionProgress(15);

    const interval = setInterval(() => {
      setExtractionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExtracting(false);
          setCreditsLeft(c => Math.max(0, c - 25));
          showToast(`Successfully extracted ${leadLimit.toLocaleString()} profiles from LinkedIn!`);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  // Reset Parameters Handler
  const handleResetParameters = () => {
    setSearchMode('url');
    setSearchUrl('https://www.linkedin.com/sales/search/people?query=(filters:(value:%27VP%20of%20Sales%27))');
    setBooleanQuery('"VP of Sales" AND "SaaS" NOT "Intern"');
    setLeadLimit(1800);
    setSpeedMode('safe');
    setFindWorkEmails(true);
    setDirectPhones(true);
    setSkipExisting(true);
    showToast('Reset LinkedIn search parameters to default');
  };

  // Single Add Lead Handler
  const handleAddProfile = (id: string, name: string) => {
    setAddedIds(prev => ({ ...prev, [id]: true }));
    setCreditsLeft(prev => Math.max(0, prev - 1));
    showToast(`Added ${name} to campaign list! (1 Credit used)`);
  };

  // Filtered Profiles
  const filteredProfiles = profiles.filter(p => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.company.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q)
    );
  });

  // Select All Toggles
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredProfiles.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">

      {/* TOP CONNECTION & ACCOUNT BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-4 rounded-2xl text-white shadow-md border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/30 border border-blue-400/40 rounded-xl text-blue-400">
            <Linkedin className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white">LinkedIn Search & Profile Extractor</span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Account Connected: Alex R. (Active)</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Syncing Sales Navigator & LinkedIn search results directly into campaign lists.
            </p>
          </div>
        </div>

        {/* Extension & Credit Indicator */}
        <div className="flex items-center gap-3 text-xs font-extrabold">
          <div className="px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-xl flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Extension v3.2 Synced</span>
          </div>
          <div className="px-3.5 py-1.5 bg-blue-600/30 border border-blue-500/40 text-blue-300 rounded-xl flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-400" />
            <span>Credits: <strong className="text-white">{creditsLeft.toLocaleString()}</strong></span>
          </div>
        </div>
      </div>

      {/* MAIN DUAL PANEL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* PANEL 1: LINKEDIN SEARCH PARAMETERS (LEFT 1 COL) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 h-fit">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>LinkedIn Search Parameters</span>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">Query Builder</span>
          </div>

          {/* Search Mode Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Search Mode</label>
            <div className="space-y-1.5 text-xs font-semibold">
              <label className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                searchMode === 'url' ? 'bg-blue-50/80 border-blue-300 text-blue-950 font-extrabold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <input 
                  type="radio" 
                  name="searchMode" 
                  checked={searchMode === 'url'} 
                  onChange={() => setSearchMode('url')}
                  className="accent-blue-600"
                />
                <span>Sales Nav / Search URL</span>
              </label>

              <label className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                searchMode === 'boolean' ? 'bg-blue-50/80 border-blue-300 text-blue-950 font-extrabold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <input 
                  type="radio" 
                  name="searchMode" 
                  checked={searchMode === 'boolean'} 
                  onChange={() => setSearchMode('boolean')}
                  className="accent-blue-600"
                />
                <span>Keyword / Boolean Query</span>
              </label>

              <label className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                searchMode === 'list' ? 'bg-blue-50/80 border-blue-300 text-blue-950 font-extrabold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <input 
                  type="radio" 
                  name="searchMode" 
                  checked={searchMode === 'list'} 
                  onChange={() => setSearchMode('list')}
                  className="accent-blue-600"
                />
                <span>Profile List Import</span>
              </label>
            </div>
          </div>

          {/* Dynamic Search Parameter Input */}
          <div className="space-y-1.5">
            {searchMode === 'url' && (
              <>
                <label className="block text-xs font-bold text-slate-700 flex justify-between">
                  <span>LinkedIn Search URL</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.readText().then(text => text && setSearchUrl(text));
                      showToast('Pasted URL from clipboard');
                    }}
                    className="text-[10px] text-blue-600 font-bold hover:underline"
                  >
                    Paste URL
                  </button>
                </label>
                <input
                  type="text"
                  value={searchUrl}
                  onChange={e => setSearchUrl(e.target.value)}
                  placeholder="https://linkedin.com/sales/search/people?query=..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-[10px] text-slate-400 block">Paste Sales Navigator or basic search results URL</span>
              </>
            )}

            {searchMode === 'boolean' && (
              <>
                <label className="block text-xs font-bold text-slate-700">Keyword / Boolean Query</label>
                <textarea
                  rows={3}
                  value={booleanQuery}
                  onChange={e => setBooleanQuery(e.target.value)}
                  placeholder='"VP of Sales" AND "SaaS" NOT "Intern"'
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-[10px] text-slate-400 block">Use AND, OR, NOT logic for targeted persona queries</span>
              </>
            )}

            {searchMode === 'list' && (
              <>
                <label className="block text-xs font-bold text-slate-700">Profile URLs (Line separated)</label>
                <textarea
                  rows={3}
                  value={profileList}
                  onChange={e => setProfileList(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-[10px] text-slate-400 block">Paste up to 500 LinkedIn profile URLs</span>
              </>
            )}
          </div>

          {/* Limits & Speed Controls */}
          <div className="space-y-3 pt-1 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700">Limits & Extraction Speed</span>
              <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-black">
                {leadLimit.toLocaleString()} Leads
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={100}
              max={2500}
              step={100}
              value={leadLimit}
              onChange={e => setLeadLimit(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />

            {/* Speed / Safety Switch */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setSpeedMode('safe')}
                className={`p-2 rounded-xl border text-left flex flex-col gap-0.5 transition-all ${
                  speedMode === 'safe'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Safe (20/min)</span>
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Account safety priority</span>
              </button>

              <button
                type="button"
                onClick={() => setSpeedMode('fast')}
                className={`p-2 rounded-xl border text-left flex flex-col gap-0.5 transition-all ${
                  speedMode === 'fast'
                    ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Fast (50/min)</span>
                </span>
                <span className="text-[10px] text-slate-500 font-normal">High volume speed</span>
              </button>
            </div>
          </div>

          {/* Enrichment Options */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700">Enrichment Options</label>
            <div className="space-y-1.5 text-xs text-slate-700 font-semibold">
              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={findWorkEmails}
                  onChange={e => setFindWorkEmails(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Find Work Emails (SMTP Verified)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={directPhones}
                  onChange={e => setDirectPhones(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Direct Mobile Phone Numbers</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={skipExisting}
                  onChange={e => setSkipExisting(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Skip Existing CRM Contacts</span>
              </label>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleRunExtraction}
              disabled={isExtracting}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:bg-slate-300 text-white rounded-xl font-black text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all transform active:scale-98"
            >
              {isExtracting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
                  <span>Scraping LinkedIn ({extractionProgress}%)...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>⚡ Extract {leadLimit.toLocaleString()} Profiles</span>
                </>
              )}
            </button>

            <button
              onClick={handleResetParameters}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Parameters</span>
            </button>
          </div>

        </div>

        {/* PANEL 2: LINKEDIN EXTRACTED PROFILES (RIGHT 2 COLS) */}
        <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">

          <div className="space-y-4">
            
            {/* Header & Filter Controls */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="🔍 Filter profiles..."
                    value={searchFilter}
                    onChange={e => setSearchFilter(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Toolbar Dropdowns */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                
                {/* Bulk Actions Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsBulkMenuOpen(!isBulkMenuOpen)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
                  >
                    <span>Bulk Actions</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {isBulkMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-2xl z-30 p-2 space-y-1 text-xs">
                      <button
                        onClick={() => {
                          setSelectedIds(filteredProfiles.map(p => p.id));
                          setIsBulkMenuOpen(false);
                          showToast(`Selected all ${filteredProfiles.length} profiles`);
                        }}
                        className="w-full text-left p-2 hover:bg-slate-50 font-bold text-slate-700 rounded-lg"
                      >
                        Select All Profiles
                      </button>
                      <button
                        onClick={() => {
                          showToast(`Exported ${selectedIds.length || filteredProfiles.length} profiles to CSV`);
                          setIsBulkMenuOpen(false);
                        }}
                        className="w-full text-left p-2 hover:bg-slate-50 font-bold text-slate-700 rounded-lg flex items-center gap-1.5"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Export to CSV</span>
                      </button>
                      <button
                        onClick={() => {
                          showToast(`Re-verifying deliverability for selected profiles...`);
                          setIsBulkMenuOpen(false);
                        }}
                        className="w-full text-left p-2 hover:bg-slate-50 font-bold text-slate-700 rounded-lg flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span>Re-Verify Emails</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Columns Visibility Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsColumnsMenuOpen(!isColumnsMenuOpen)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
                  >
                    <span>⚙️ Columns</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {isColumnsMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-200 shadow-2xl z-30 p-3 space-y-2 text-xs">
                      <span className="block font-black text-slate-400 uppercase text-[10px]">Toggle Table Columns</span>
                      {Object.keys(columns).map((colKey) => (
                        <label key={colKey} className="flex items-center gap-2 font-bold text-slate-700 capitalize cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(columns as any)[colKey]}
                            onChange={e => setColumns({ ...columns, [colKey]: e.target.checked })}
                            className="rounded text-blue-600"
                          />
                          <span>{colKey}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Live Progress Bar (During or Mock Extraction) */}
            {isExtracting && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-2xl space-y-1.5 animate-in fade-in">
                <div className="flex justify-between items-center text-xs font-extrabold text-blue-900">
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                    <span>Scraping Page {Math.ceil(extractionProgress / 6)} of 18...</span>
                  </span>
                  <span>{Math.round((extractionProgress / 100) * leadLimit)} / {leadLimit} Extracted</span>
                </div>
                <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${extractionProgress}%` }} />
                </div>
              </div>
            )}

            {/* Profiles Data Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 w-10">
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectedIds.length === filteredProfiles.length && filteredProfiles.length > 0}
                          className="rounded text-blue-600"
                        />
                      </th>
                      {columns.profile && <th className="p-3.5">Profile & Title</th>}
                      {columns.company && <th className="p-3.5">Company</th>}
                      {columns.location && <th className="p-3.5">Location</th>}
                      {columns.email && <th className="p-3.5">Email / Status</th>}
                      {columns.actions && <th className="p-3.5 text-right">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {filteredProfiles.map((p) => {
                      const isSelected = selectedIds.includes(p.id);
                      const isRevealed = revealedEmails[p.id];
                      const isAdded = addedIds[p.id];

                      return (
                        <tr key={p.id} className={`hover:bg-slate-50/80 transition-all ${isSelected ? 'bg-blue-50/40' : ''}`}>
                          
                          {/* Checkbox */}
                          <td className="p-3.5">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelect(p.id)}
                              className="rounded text-blue-600"
                            />
                          </td>

                          {/* Profile & Title */}
                          {columns.profile && (
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.avatar}
                                  alt={p.name}
                                  className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                                />
                                <div>
                                  <div className="flex items-center gap-1.5 font-extrabold text-slate-900 text-xs">
                                    <span>{p.name}</span>
                                    <a
                                      href={p.linkedInUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="p-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                                      title="Open LinkedIn Profile"
                                    >
                                      <Linkedin className="w-3 h-3 fill-current" />
                                    </a>
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                                    <span>{p.title}</span>
                                    <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded text-[9px] font-bold">
                                      {p.seniority}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          )}

                          {/* Company */}
                          {columns.company && (
                            <td className="p-3.5">
                              <div className="font-extrabold text-slate-900 text-xs">{p.company}</div>
                              <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                                <span className="bg-slate-100 px-1.5 py-0.5 rounded font-bold">👥 {p.companySize}</span>
                                <span className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold border border-indigo-100">
                                  {p.funding}
                                </span>
                              </div>
                            </td>
                          )}

                          {/* Location */}
                          {columns.location && (
                            <td className="p-3.5">
                              <div className="text-slate-800 font-bold text-xs flex items-center gap-1">
                                <span>{p.countryFlag}</span>
                                <span>{p.location}</span>
                              </div>
                            </td>
                          )}

                          {/* Email / Status */}
                          {columns.email && (
                            <td className="p-3.5">
                              <div className="flex items-center gap-1.5 font-mono text-xs font-extrabold text-slate-800">
                                <span>{formatObfuscatedEmail(p.email, isRevealed)}</span>
                                <button
                                  onClick={() => setRevealedEmails({ ...revealedEmails, [p.id]: !isRevealed })}
                                  className="text-slate-400 hover:text-slate-700 transition-colors p-0.5"
                                  title={isRevealed ? "Hide Email" : "Reveal Email"}
                                >
                                  {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-blue-500" />}
                                </button>
                              </div>

                              <div className="flex items-center gap-1.5 mt-1">
                                {p.emailStatus === 'Verified' ? (
                                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span>Verified</span>
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    <span>Catch-All</span>
                                  </span>
                                )}

                                {p.phoneAvailable && (
                                  <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded flex items-center gap-0.5" title="Direct Phone Attached">
                                    <Phone className="w-2.5 h-2.5" />
                                    <span>Direct</span>
                                  </span>
                                )}
                              </div>
                            </td>
                          )}

                          {/* Actions */}
                          {columns.actions && (
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => handleAddProfile(p.id, p.name)}
                                disabled={isAdded}
                                className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all shadow-2xs flex items-center justify-center gap-1.5 ml-auto ${
                                  isAdded
                                    ? 'bg-emerald-100 text-emerald-800 cursor-default'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Added ✓</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>+ Add</span>
                                  </>
                                )}
                              </button>
                            </td>
                          )}

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination Bar */}
              <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 font-semibold">
                <div>
                  Showing <span className="font-extrabold text-slate-800">1–{filteredProfiles.length}</span> of <span className="font-extrabold text-slate-800">{leadLimit.toLocaleString()}</span> extracted profiles
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-bold disabled:opacity-50" disabled>
                    &lt; Prev
                  </button>
                  <span className="font-bold text-slate-800">Page 1 of {Math.ceil(leadLimit / 25)}</span>
                  <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-bold text-slate-800">
                    Next &gt;
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* EXTRACTION HEALTH SUMMARY FOOTER */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 mt-2">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>EXTRACTION HEALTH SUMMARY</span>
              </h4>
              <span className="text-[11px] text-emerald-600 font-bold">🟢 High Quality Target Set</span>
            </div>

            {/* Health Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Email Match Rate</span>
                <div className="text-base font-black text-emerald-950 flex items-center gap-1.5">
                  <span>🟢 92% Email Match Rate</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Mobile Phones</span>
                <div className="text-base font-black text-blue-950 flex items-center gap-1.5">
                  <span>📱 45% Mobile Phones</span>
                </div>
              </div>

              <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-indigo-700 uppercase">Decision Makers</span>
                <div className="text-base font-black text-indigo-950 flex items-center gap-1.5">
                  <span>🏢 100% Decision Makers</span>
                </div>
              </div>
            </div>

            {/* Bottom Push Action CTAs */}
            <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-2">
              
              <button
                onClick={() => showToast(`Exported ${leadLimit.toLocaleString()} LinkedIn profiles to CSV file`)}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>🚀 Export {leadLimit.toLocaleString()} Profiles (CSV)</span>
              </button>

              {/* Sync to Campaign List Dropdown */}
              <div className="relative w-full sm:w-auto">
                <button
                  onClick={() => setIsSyncListMenuOpen(!isSyncListMenuOpen)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-2xs"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>📥 Sync to Campaign List</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isSyncListMenuOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl z-30 p-2 space-y-1 text-xs">
                    <span className="block px-2 py-1 text-[10px] font-black text-slate-400 uppercase">Select Target Campaign</span>
                    {['Q3 LinkedIn Outreach', 'SaaS Founders US', 'VIP Decision Makers', '+ Create New List'].map((listName, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          showToast(`Synced ${leadLimit.toLocaleString()} profiles to "${listName}"!`);
                          setIsSyncListMenuOpen(false);
                        }}
                        className="w-full text-left p-2.5 hover:bg-slate-50 font-bold text-slate-800 rounded-xl transition-all flex items-center justify-between"
                      >
                        <span>{listName}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
