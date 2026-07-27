import React, { useState, useMemo } from 'react';
import { 
  Magnet, 
  Search, 
  Building2, 
  Mail, 
  Linkedin, 
  UserCheck, 
  Filter, 
  Plus, 
  ExternalLink,
  Download,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Check,
  X,
  CreditCard,
  FolderOpen,
  Zap,
  SlidersHorizontal,
  Eye,
  EyeOff,
  Phone,
  ShieldCheck,
  Globe,
  Users,
  CheckCircle2,
  FileSpreadsheet,
  Send,
  ChevronRight
} from 'lucide-react';
import { LeadSearchSubTab } from '../../types';
import { LinkedInSearchTab } from './LinkedInSearchTab';
import { InfluencerSearchTab } from './InfluencerSearchTab';
import { EmailSearchTab } from './EmailSearchTab';
import { DomainSearchTab } from './DomainSearchTab';
import { CompanySearchTab } from './CompanySearchTab';

// Mock Prospect Interface
interface ProspectLead {
  id: string;
  name: string;
  title: string;
  seniority: 'C-Level' | 'VP' | 'Director' | 'Manager';
  company: string;
  companySize: string;
  revenue: string;
  funding: string;
  industry: string;
  location: string;
  countryFlag: string;
  email: string;
  emailStatus: 'Verified' | 'Catch-All' | 'Unverified';
  phoneAvailable: boolean;
  linkedInUrl: string;
  avatar: string;
}

// Initial Mock Lead Dataset (12 comprehensive leads for rich interaction)
const INITIAL_LEADS: ProspectLead[] = [
  {
    id: 'lead-1',
    name: 'Sarah Chen',
    title: 'CEO & Co-Founder',
    seniority: 'C-Level',
    company: 'TechFlow Inc.',
    companySize: '50-200',
    revenue: '$10M-$50M',
    funding: 'Series B',
    industry: 'Software',
    location: 'San Francisco, CA, USA',
    countryFlag: '🇺🇸',
    email: 'sarah@techflow.io',
    emailStatus: 'Verified',
    phoneAvailable: true,
    linkedInUrl: 'https://linkedin.com/in/sarahchen',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'lead-2',
    name: 'Alex Rivera',
    title: 'Founder & CTO',
    seniority: 'C-Level',
    company: 'SaaSify.io',
    companySize: '11-50',
    revenue: '$1M-$10M',
    funding: 'Series A',
    industry: 'SaaS',
    location: 'Austin, TX, USA',
    countryFlag: '🇺🇸',
    email: 'alex.r@saasify.io',
    emailStatus: 'Catch-All',
    phoneAvailable: false,
    linkedInUrl: 'https://linkedin.com/in/alexrivera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'lead-3',
    name: 'Marcus Vance',
    title: 'VP of Global Marketing',
    seniority: 'VP',
    company: 'CloudPulse Systems',
    companySize: '201-500',
    revenue: '$50M+',
    funding: 'Public',
    industry: 'Software',
    location: 'New York, NY, USA',
    countryFlag: '🇺🇸',
    email: 'marcus.vance@cloudpulse.com',
    emailStatus: 'Verified',
    phoneAvailable: true,
    linkedInUrl: 'https://linkedin.com/in/marcusvance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'lead-4',
    name: 'Elena Rostova',
    title: 'Managing Director',
    seniority: 'C-Level',
    company: 'Nordic Growth Labs',
    companySize: '11-50',
    revenue: '$1M-$10M',
    funding: 'Bootstrapped',
    industry: 'E-Commerce',
    location: 'London, UK',
    countryFlag: '🇬🇧',
    email: 'e.rostova@nordicgrowth.co.uk',
    emailStatus: 'Verified',
    phoneAvailable: true,
    linkedInUrl: 'https://linkedin.com/in/elenarostova',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'lead-5',
    name: 'David Zhang',
    title: 'Head of Sales & BD',
    seniority: 'Director',
    company: 'NextGen AI Solutions',
    companySize: '51-200',
    revenue: '$10M-$50M',
    funding: 'Series A',
    industry: 'Software',
    location: 'Seattle, WA, USA',
    countryFlag: '🇺🇸',
    email: 'david.zhang@nextgenai.tech',
    emailStatus: 'Verified',
    phoneAvailable: false,
    linkedInUrl: 'https://linkedin.com/in/davidzhang',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'lead-6',
    name: 'Chloe Bennett',
    title: 'Chief Revenue Officer',
    seniority: 'C-Level',
    company: 'Fintech Nexus',
    companySize: '201-500',
    revenue: '$50M+',
    funding: 'Series B',
    industry: 'Fintech',
    location: 'Boston, MA, USA',
    countryFlag: '🇺🇸',
    email: 'chloe.b@fintechnexus.com',
    emailStatus: 'Verified',
    phoneAvailable: true,
    linkedInUrl: 'https://linkedin.com/in/chloebennett',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'lead-7',
    name: 'James Sterling',
    title: 'VP of Product',
    seniority: 'VP',
    company: 'DataStream Logistics',
    companySize: '51-200',
    revenue: '$10M-$50M',
    funding: 'Bootstrapped',
    industry: 'Logistics',
    location: 'Chicago, IL, USA',
    countryFlag: '🇺🇸',
    email: 'jsterling@datastream.com',
    emailStatus: 'Catch-All',
    phoneAvailable: true,
    linkedInUrl: 'https://linkedin.com/in/jamessterling',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'lead-8',
    name: 'Priya Patel',
    title: 'Director of Growth',
    seniority: 'Director',
    company: 'HealthTech Direct',
    companySize: '11-50',
    revenue: '$1M-$10M',
    funding: 'Seed',
    industry: 'Healthcare',
    location: 'San Jose, CA, USA',
    countryFlag: '🇺🇸',
    email: 'p.patel@healthtechdirect.com',
    emailStatus: 'Verified',
    phoneAvailable: false,
    linkedInUrl: 'https://linkedin.com/in/priyapatel',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80'
  }
];

// Preset Searches Data
const PRESET_SEARCHES = [
  {
    name: 'US SaaS Founders',
    description: 'CEO, Founder | Software & SaaS | US | 11-50',
    jobTitles: ['CEO', 'Founder'],
    locations: ['United States'],
    industries: ['Software', 'SaaS'],
    companySize: '11-50',
    matchCount: '4,200'
  },
  {
    name: 'UK E-Commerce Marketing Directors',
    description: 'Marketing Director | Retail & E-Commerce | UK | 51-200',
    jobTitles: ['Marketing Director', 'Head of Growth'],
    locations: ['United Kingdom'],
    industries: ['E-Commerce'],
    companySize: '51-200',
    matchCount: '1,850'
  },
  {
    name: 'European Fintech CTOs',
    description: 'CTO, VP Engineering | Fintech | Europe | 51-200',
    jobTitles: ['CTO', 'VP Engineering'],
    locations: ['Germany', 'United Kingdom', 'France'],
    industries: ['Fintech'],
    companySize: '51-200',
    matchCount: '2,110'
  },
  {
    name: 'Healthcare VPs US',
    description: 'VP Sales, VP Operations | Healthcare | US | 201-500',
    jobTitles: ['VP Sales', 'VP Operations'],
    locations: ['United States'],
    industries: ['Healthcare'],
    companySize: '201-500',
    matchCount: '980'
  }
];

export const LeadSearchView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<LeadSearchSubTab>('prospect');

  // Search Credits State
  const [creditsLeft, setCreditsLeft] = useState(8450);
  const totalCredits = 10000;

  // Saved Searches Dropdown Toggle
  const [isSavedSearchesOpen, setIsSavedSearchesOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('US SaaS Founders');

  // Filter Chips State (Multi-Select Tag Inputs)
  const [jobTitleTags, setJobTitleTags] = useState<string[]>(['CEO', 'Founder']);
  const [newTitleInput, setNewTitleInput] = useState('');

  const [locationTags, setLocationTags] = useState<string[]>(['United States']);
  const [newLocationInput, setNewLocationInput] = useState('');

  const [industryTags, setIndustryTags] = useState<string[]>(['Software', 'SaaS']);
  const [newIndustryInput, setNewIndustryInput] = useState('');

  const [companySize, setCompanySize] = useState<string>('11-50');

  // Advanced Accordion Toggles
  const [accordionState, setAccordionState] = useState({
    persona: true,
    firmographics: false,
    deliverability: true
  });

  // Advanced Filter Options State
  const [titleMatchingMode, setTitleMatchingMode] = useState<'include' | 'exclude'>('include');
  const [selectedSeniorities, setSelectedSeniorities] = useState<string[]>(['C-Level', 'VP', 'Director']);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(['Executive', 'Engineering', 'Sales']);
  const [selectedRevenue, setSelectedRevenue] = useState<string>('$1M-$10M');
  const [selectedFunding, setSelectedFunding] = useState<string[]>(['Series A', 'Series B', 'Bootstrapped']);
  
  // Deliverability Toggles
  const [onlyVerifiedEmails, setOnlyVerifiedEmails] = useState(true);
  const [hasDirectPhone, setHasDirectPhone] = useState(false);
  const [hasLinkedIn, setHasLinkedIn] = useState(true);

  // Table Search Within Results
  const [searchInResults, setSearchInResults] = useState('');
  
  // Selection & Columns State
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [addedLeadIds, setAddedLeadIds] = useState<Record<string, boolean>>({});
  const [columnVisibility, setColumnVisibility] = useState({
    title: true,
    company: true,
    location: true,
    email: true,
    actions: true
  });
  const [isColumnsMenuOpen, setIsColumnsMenuOpen] = useState(false);
  const [isBulkMenuOpen, setIsBulkMenuOpen] = useState(false);
  const [isPushListMenuOpen, setIsPushListMenuOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add Tag Handlers
  const handleAddTitle = () => {
    if (newTitleInput.trim() && !jobTitleTags.includes(newTitleInput.trim())) {
      setJobTitleTags([...jobTitleTags, newTitleInput.trim()]);
      setNewTitleInput('');
    }
  };

  const handleAddLocation = () => {
    if (newLocationInput.trim() && !locationTags.includes(newLocationInput.trim())) {
      setLocationTags([...locationTags, newLocationInput.trim()]);
      setNewLocationInput('');
    }
  };

  const handleAddIndustry = () => {
    if (newIndustryInput.trim() && !industryTags.includes(newIndustryInput.trim())) {
      setIndustryTags([...industryTags, newIndustryInput.trim()]);
      setNewIndustryInput('');
    }
  };

  // Apply Preset Search
  const applyPresetSearch = (preset: typeof PRESET_SEARCHES[0]) => {
    setSelectedPreset(preset.name);
    setJobTitleTags(preset.jobTitles);
    setLocationTags(preset.locations);
    setIndustryTags(preset.industries);
    setCompanySize(preset.companySize);
    setIsSavedSearchesOpen(false);
    showToast(`Loaded preset search: "${preset.name}" (${preset.matchCount} leads match)`);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setJobTitleTags(['CEO', 'Founder']);
    setLocationTags(['United States']);
    setIndustryTags(['Software', 'SaaS']);
    setCompanySize('11-50');
    setOnlyVerifiedEmails(true);
    setHasDirectPhone(false);
    setSelectedSeniorities(['C-Level', 'VP', 'Director']);
    showToast('Reset all search filters to default');
  };

  // Dynamic Matching Count Calculation
  const estimatedMatches = useMemo(() => {
    let count = 4200;
    if (jobTitleTags.length > 2) count += 800;
    if (locationTags.length > 1) count += 1200;
    if (onlyVerifiedEmails) count = Math.round(count * 0.85);
    if (hasDirectPhone) count = Math.round(count * 0.42);
    return count.toLocaleString();
  }, [jobTitleTags, locationTags, onlyVerifiedEmails, hasDirectPhone]);

  // Filtered Leads in Table
  const filteredLeads = useMemo(() => {
    return INITIAL_LEADS.filter(lead => {
      // Search within results
      if (searchInResults.trim()) {
        const query = searchInResults.toLowerCase();
        const matchesQuery = 
          lead.name.toLowerCase().includes(query) ||
          lead.title.toLowerCase().includes(query) ||
          lead.company.toLowerCase().includes(query) ||
          lead.location.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Deliverability check
      if (onlyVerifiedEmails && lead.emailStatus !== 'Verified') return false;
      if (hasDirectPhone && !lead.phoneAvailable) return false;

      return true;
    });
  }, [searchInResults, onlyVerifiedEmails, hasDirectPhone]);

  // Bulk Selection Toggles
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLeadIds(filteredLeads.map(l => l.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const handleToggleLeadSelection = (id: string) => {
    if (selectedLeadIds.includes(id)) {
      setSelectedLeadIds(selectedLeadIds.filter(item => item !== id));
    } else {
      setSelectedLeadIds([...selectedLeadIds, id]);
    }
  };

  // Obfuscated Email Helper
  const formatObfuscatedEmail = (email: string, isRevealed: boolean) => {
    if (isRevealed) return email;
    const [name, domain] = email.split('@');
    if (!name || !domain) return email;
    const maskedName = name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : `${name[0]}***`;
    return `${maskedName}@${domain}`;
  };

  // One-Click Add Lead Action
  const handleAddLead = (id: string, name: string) => {
    setAddedLeadIds(prev => ({ ...prev, [id]: true }));
    setCreditsLeft(prev => Math.max(0, prev - 1));
    showToast(`Added ${name} to your contact list! (1 Credit Used)`);
  };

  // Domain search tab state
  const [domainQuery, setDomainQuery] = useState('stripe.com');
  const [domainResults, setDomainResults] = useState<any[] | null>(null);

  const handleDomainSearch = () => {
    setDomainResults([
      { name: 'John Collison', title: 'Co-Founder & President', email: 'john@stripe.com', confidence: '99% Verified', status: 'Verified' },
      { name: 'Patrick Collison', title: 'CEO & Co-Founder', email: 'patrick@stripe.com', confidence: '99% Verified', status: 'Verified' },
      { name: 'David Singleton', title: 'CTO', email: 'david.s@stripe.com', confidence: '95% Verified', status: 'Verified' },
      { name: 'Claire Hughes', title: 'Head of Business Ops', email: 'claire@stripe.com', confidence: '91% Verified', status: 'Verified' }
    ]);
    showToast('Domain search completed: 4 verified patterns found for stripe.com');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto relative">
      
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* HEADER & TOP NAVIGATION AREA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        
        {/* Title & Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
            <span>Lead Gen</span>
            <span className="text-slate-300">&gt;</span>
            <span className="text-blue-600 font-extrabold">Lead Search</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Lead Search & Finder</span>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
              v2.5 Live
            </span>
          </h1>
        </div>

        {/* Top-Right Badges & Saved Searches */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Credits Remaining Badge */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xl">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <div className="text-xs">
              <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>Credits Left:</span>
                <span className="text-blue-600 font-black">{creditsLeft.toLocaleString()}</span>
                <span className="text-slate-400 font-normal">/ {totalCredits.toLocaleString()}</span>
              </div>
              {/* Progress bar */}
              <div className="w-28 h-1.5 bg-blue-200/60 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                  style={{ width: `${(creditsLeft / totalCredits) * 100}%` }}
                />
              </div>
            </div>
            <button 
              onClick={() => {
                setCreditsLeft(prev => Math.min(totalCredits, prev + 1000));
                showToast('Refilled 1,000 Search Credits!');
              }}
              className="ml-1 text-[10px] font-extrabold bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg transition-all shadow-2xs"
            >
              + Refill
            </button>
          </div>

          {/* Saved Searches Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setIsSavedSearchesOpen(!isSavedSearchesOpen)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <FolderOpen className="w-4 h-4 text-amber-400" />
              <span>📁 Saved Searches</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isSavedSearchesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isSavedSearchesOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 p-2 space-y-1 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-100 flex justify-between items-center">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Saved Filter Presets</span>
                  <span className="text-[10px] text-slate-400 font-bold">{PRESET_SEARCHES.length} Available</span>
                </div>
                {PRESET_SEARCHES.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyPresetSearch(preset)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex flex-col gap-0.5 ${
                      selectedPreset === preset.name 
                        ? 'bg-blue-50/80 border border-blue-200' 
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-xs text-slate-900">{preset.name}</span>
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                        {preset.matchCount}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 line-clamp-1">{preset.description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* NAVIGATION SUB-TABS WITH BADGES */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'prospect', label: 'Prospect Search', badge: '4.2k matches', icon: UserCheck },
          { id: 'linkedin', label: 'LinkedIn Search', badge: '1.8k profiles', icon: Linkedin },
          { id: 'influencers', label: 'Influencers', badge: '950 creators', icon: Magnet },
          { id: 'email', label: 'Email Search', badge: '3.1k emails', icon: Mail },
          { id: 'domain', label: 'Domain Search', badge: 'Multi-domain', icon: Building2 },
          { id: 'company', label: 'Company Search', badge: '2.4k accounts', icon: Search }
        ].map(t => {
          const IconComp = t.icon;
          const isActive = activeSubTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveSubTab(t.id as LeadSearchSubTab)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{t.label}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isActive ? 'bg-blue-700/80 text-blue-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {t.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: PROSPECT SEARCH (THE MAIN UPGRADED SECTION) */}
      {activeSubTab === 'prospect' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in">
          
          {/* LEFT SEARCH FILTERS SIDEBAR (1 COL) */}
          <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800 space-y-5 shadow-2xl h-fit">
            
            {/* Header with Load/Save */}
            <div className="flex justify-between items-center pb-3.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-400" />
                <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">Search Filters</h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold">
                <button 
                  onClick={() => showToast('Loaded default filters')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1"
                >
                  <span>📥 Load</span>
                </button>
                <button 
                  onClick={() => showToast('Saved filter configuration to "Custom Filter 1"')}
                  className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center gap-1"
                >
                  <span>💾 Save</span>
                </button>
              </div>
            </div>

            {/* MULTI-SELECT CHIP TAG INPUTS */}
            <div className="space-y-4 text-xs">
              
              {/* 1. Job Title Tags */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-extrabold flex justify-between">
                  <span>Job Title</span>
                  <span className="text-[10px] text-slate-500 font-normal">Multi-select</span>
                </label>
                
                {/* Chip Container */}
                <div className="flex flex-wrap gap-1.5 p-2 bg-slate-800/90 border border-slate-700 rounded-xl min-h-[42px]">
                  {jobTitleTags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-600/90 text-white font-bold rounded-lg text-[11px] border border-blue-500/50 shadow-2xs"
                    >
                      <span>{tag}</span>
                      <button 
                        onClick={() => setJobTitleTags(jobTitleTags.filter((_, i) => i !== idx))}
                        className="hover:text-amber-300 text-blue-200 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  
                  {/* Inline Tag Input */}
                  <div className="flex-1 flex items-center gap-1 min-w-[100px]">
                    <input 
                      type="text" 
                      placeholder="+ Add title (Enter)"
                      value={newTitleInput}
                      onChange={e => setNewTitleInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddTitle()}
                      className="w-full bg-transparent text-white text-[11px] focus:outline-none placeholder:text-slate-500 px-1"
                    />
                    {newTitleInput && (
                      <button onClick={handleAddTitle} className="text-blue-400 hover:text-white text-xs font-bold px-1">
                        +
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. Location Tags */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-extrabold flex justify-between">
                  <span>Location</span>
                  <span className="text-[10px] text-slate-500 font-normal">Country / State</span>
                </label>
                <div className="flex flex-wrap gap-1.5 p-2 bg-slate-800/90 border border-slate-700 rounded-xl min-h-[42px]">
                  {locationTags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-700 text-slate-100 font-bold rounded-lg text-[11px] border border-slate-600"
                    >
                      <span>📍 {tag}</span>
                      <button 
                        onClick={() => setLocationTags(locationTags.filter((_, i) => i !== idx))}
                        className="hover:text-rose-400 text-slate-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <div className="flex-1 flex items-center min-w-[100px]">
                    <input 
                      type="text" 
                      placeholder="+ Add location"
                      value={newLocationInput}
                      onChange={e => setNewLocationInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddLocation()}
                      className="w-full bg-transparent text-white text-[11px] focus:outline-none placeholder:text-slate-500 px-1"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Industry Tags */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-extrabold">Industry</label>
                <div className="flex flex-wrap gap-1.5 p-2 bg-slate-800/90 border border-slate-700 rounded-xl min-h-[42px]">
                  {industryTags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-900/80 text-indigo-200 font-bold rounded-lg text-[11px] border border-indigo-700/60"
                    >
                      <span>🏢 {tag}</span>
                      <button 
                        onClick={() => setIndustryTags(industryTags.filter((_, i) => i !== idx))}
                        className="hover:text-rose-400 text-indigo-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <div className="flex-1 flex items-center min-w-[100px]">
                    <input 
                      type="text" 
                      placeholder="+ Add industry"
                      value={newIndustryInput}
                      onChange={e => setNewIndustryInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddIndustry()}
                      className="w-full bg-transparent text-white text-[11px] focus:outline-none placeholder:text-slate-500 px-1"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Company Size Select */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-extrabold">Company Size (Headcount)</label>
                <select 
                  value={companySize} 
                  onChange={e => setCompanySize(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1-10">1 - 10 employees</option>
                  <option value="11-50">11 - 50 employees</option>
                  <option value="51-200">51 - 200 employees</option>
                  <option value="201-500">201 - 500 employees</option>
                  <option value="500+">500+ Enterprise</option>
                </select>
              </div>

            </div>

            {/* EXPANDED ACCORDIONS FOR ADVANCED FILTERS */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              
              {/* Accordion 1: Target Persona */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/50">
                <button
                  onClick={() => setAccordionState({ ...accordionState, persona: !accordionState.persona })}
                  className="w-full px-3 py-2.5 flex justify-between items-center text-xs font-black text-slate-200 hover:bg-slate-800/60 transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    <span>👤</span>
                    <span>Target Persona</span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${accordionState.persona ? 'rotate-180' : ''}`} />
                </button>

                {accordionState.persona && (
                  <div className="p-3 space-y-3 border-t border-slate-800/80 text-[11px] text-slate-300">
                    
                    {/* Include / Exclude Mode Toggle */}
                    <div className="flex items-center justify-between bg-slate-900 p-1 rounded-lg border border-slate-800 text-[10px] font-bold">
                      <button
                        onClick={() => setTitleMatchingMode('include')}
                        className={`flex-1 py-1 rounded transition-all ${titleMatchingMode === 'include' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                      >
                        Include Titles
                      </button>
                      <button
                        onClick={() => setTitleMatchingMode('exclude')}
                        className={`flex-1 py-1 rounded transition-all ${titleMatchingMode === 'exclude' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}
                      >
                        Exclude Titles
                      </button>
                    </div>

                    {/* Seniority Level Checkboxes */}
                    <div className="space-y-1.5">
                      <span className="font-extrabold text-slate-400 block">Seniority Level:</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['C-Level', 'VP', 'Director', 'Manager', 'Owner'].map(lvl => (
                          <label key={lvl} className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                            <input 
                              type="checkbox" 
                              checked={selectedSeniorities.includes(lvl)}
                              onChange={e => {
                                if (e.target.checked) setSelectedSeniorities([...selectedSeniorities, lvl]);
                                else setSelectedSeniorities(selectedSeniorities.filter(s => s !== lvl));
                              }}
                              className="rounded text-blue-600 bg-slate-800 border-slate-700"
                            />
                            <span>{lvl}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Department Checkboxes */}
                    <div className="space-y-1.5">
                      <span className="font-extrabold text-slate-400 block">Department:</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['Executive', 'Engineering', 'Sales', 'Marketing', 'HR'].map(dept => (
                          <label key={dept} className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                            <input 
                              type="checkbox" 
                              checked={selectedDepartments.includes(dept)}
                              onChange={e => {
                                if (e.target.checked) setSelectedDepartments([...selectedDepartments, dept]);
                                else setSelectedDepartments(selectedDepartments.filter(d => d !== dept));
                              }}
                              className="rounded text-blue-600 bg-slate-800 border-slate-700"
                            />
                            <span>{dept}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Accordion 2: Company Firmographics */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/50">
                <button
                  onClick={() => setAccordionState({ ...accordionState, firmographics: !accordionState.firmographics })}
                  className="w-full px-3 py-2.5 flex justify-between items-center text-xs font-black text-slate-200 hover:bg-slate-800/60 transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    <span>🏢</span>
                    <span>Company Firmographics</span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${accordionState.firmographics ? 'rotate-180' : ''}`} />
                </button>

                {accordionState.firmographics && (
                  <div className="p-3 space-y-3 border-t border-slate-800/80 text-[11px] text-slate-300">
                    
                    <div>
                      <span className="font-extrabold text-slate-400 block mb-1">Estimated Annual Revenue:</span>
                      <select 
                        value={selectedRevenue}
                        onChange={e => setSelectedRevenue(e.target.value)}
                        className="w-full px-2 py-1.5 bg-slate-900 border border-slate-800 rounded text-white text-xs"
                      >
                        <option value="All">Any Revenue Range</option>
                        <option value="<$1M">&lt; $1M / year</option>
                        <option value="$1M-$10M">$1M - $10M / year</option>
                        <option value="$10M-$50M">$10M - $50M / year</option>
                        <option value="$50M+">$50M+ Enterprise</option>
                      </select>
                    </div>

                    <div>
                      <span className="font-extrabold text-slate-400 block mb-1">Funding Status:</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['Seed', 'Series A', 'Series B', 'Bootstrapped', 'Public'].map(f => (
                          <label key={f} className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                            <input 
                              type="checkbox" 
                              checked={selectedFunding.includes(f)}
                              onChange={e => {
                                if (e.target.checked) setSelectedFunding([...selectedFunding, f]);
                                else setSelectedFunding(selectedFunding.filter(item => item !== f));
                              }}
                              className="rounded text-blue-600 bg-slate-800 border-slate-700"
                            />
                            <span>{f}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Accordion 3: Contact Deliverability */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/50">
                <button
                  onClick={() => setAccordionState({ ...accordionState, deliverability: !accordionState.deliverability })}
                  className="w-full px-3 py-2.5 flex justify-between items-center text-xs font-black text-slate-200 hover:bg-slate-800/60 transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    <span>🟢</span>
                    <span>Contact Deliverability</span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${accordionState.deliverability ? 'rotate-180' : ''}`} />
                </button>

                {accordionState.deliverability && (
                  <div className="p-3 space-y-2 border-t border-slate-800/80 text-[11px] text-slate-300">
                    
                    <label className="flex items-center justify-between cursor-pointer p-1.5 rounded hover:bg-slate-900">
                      <span className="flex items-center gap-1.5 font-bold">
                        <span>🟢</span>
                        <span>Only Verified Emails</span>
                      </span>
                      <input 
                        type="checkbox" 
                        checked={onlyVerifiedEmails} 
                        onChange={e => setOnlyVerifiedEmails(e.target.checked)}
                        className="rounded text-blue-600 bg-slate-800 border-slate-700"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer p-1.5 rounded hover:bg-slate-900">
                      <span className="flex items-center gap-1.5 font-bold">
                        <span>📱</span>
                        <span>Has Direct Dial / Mobile</span>
                      </span>
                      <input 
                        type="checkbox" 
                        checked={hasDirectPhone} 
                        onChange={e => setHasDirectPhone(e.target.checked)}
                        className="rounded text-blue-600 bg-slate-800 border-slate-700"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer p-1.5 rounded hover:bg-slate-900">
                      <span className="flex items-center gap-1.5 font-bold">
                        <span>💼</span>
                        <span>Has Active LinkedIn</span>
                      </span>
                      <input 
                        type="checkbox" 
                        checked={hasLinkedIn} 
                        onChange={e => setHasLinkedIn(e.target.checked)}
                        className="rounded text-blue-600 bg-slate-800 border-slate-700"
                      />
                    </label>

                  </div>
                )}
              </div>

            </div>

            {/* DYNAMIC CTA BUTTON & RESET */}
            <div className="pt-2 space-y-2">
              <button 
                onClick={() => showToast(`Executing search across ${estimatedMatches} matching prospects...`)}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-black text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-98"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>⚡ Search {estimatedMatches} Prospects</span>
              </button>

              <button 
                onClick={handleResetFilters}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>↺ Reset All Filters</span>
              </button>
            </div>

          </div>

          {/* RIGHT PROSPECT SEARCH RESULTS AREA (3 COLS) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* RESULTS TOOLBAR BAR */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
              
              {/* Search Within Results Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="🔍 Search within loaded results (name, company, email)..."
                  value={searchInResults}
                  onChange={e => setSearchInResults(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchInResults && (
                  <button onClick={() => setSearchInResults('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Toolbar Dropdowns */}
              <div className="flex items-center gap-2">
                
                {/* Bulk Actions Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsBulkMenuOpen(!isBulkMenuOpen)}
                    className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-2xs"
                  >
                    <span>Bulk Actions</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {isBulkMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl z-20 p-1.5 space-y-1 text-xs">
                      <button 
                        onClick={() => {
                          showToast(`Exported ${selectedLeadIds.length || filteredLeads.length} leads to CSV!`);
                          setIsBulkMenuOpen(false);
                        }}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded-xl font-bold text-slate-700 flex items-center gap-2"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        <span>Export CSV</span>
                      </button>
                      <button 
                        onClick={() => {
                          showToast('Ran email verifier on selected contacts');
                          setIsBulkMenuOpen(false);
                        }}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded-xl font-bold text-slate-700 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span>Verify Emails</span>
                      </button>
                      <button 
                        onClick={() => {
                          showToast(`Pushed ${selectedLeadIds.length || filteredLeads.length} contacts to Primary Outreach List`);
                          setIsBulkMenuOpen(false);
                        }}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded-xl font-bold text-slate-700 flex items-center gap-2"
                      >
                        <Users className="w-4 h-4 text-indigo-600" />
                        <span>Push to Contact List</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Columns Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsColumnsMenuOpen(!isColumnsMenuOpen)}
                    className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-2xs"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                    <span>⚙️ Columns</span>
                  </button>

                  {isColumnsMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl z-20 p-2 space-y-2 text-xs font-bold text-slate-700">
                      <span className="block text-[10px] uppercase text-slate-400 tracking-wider">Toggle Columns</span>
                      {Object.keys(columnVisibility).map(col => (
                        <label key={col} className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1 rounded">
                          <span className="capitalize">{col}</span>
                          <input 
                            type="checkbox" 
                            checked={(columnVisibility as any)[col]}
                            onChange={e => setColumnVisibility({ ...columnVisibility, [col]: e.target.checked })}
                            className="rounded text-blue-600"
                          />
                        </label>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* FLOATING BULK SELECTION ACTION BAR */}
            {selectedLeadIds.length > 0 && (
              <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-[11px]">
                    {selectedLeadIds.length}
                  </span>
                  <span>Leads Selected</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                  <button 
                    onClick={() => showToast(`Exported ${selectedLeadIds.length} leads to CSV!`)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>

                  <button 
                    onClick={() => showToast(`Pushed ${selectedLeadIds.length} contacts to active list`)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center gap-1.5 transition-all"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Push to List</span>
                  </button>

                  <button 
                    onClick={() => setSelectedLeadIds([])}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}

            {/* INTERACTIVE PROSPECT RESULTS TABLE */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-3.5 w-10 text-center">
                        <input 
                          type="checkbox" 
                          checked={selectedLeadIds.length === filteredLeads.length && filteredLeads.length > 0}
                          onChange={handleSelectAll}
                          className="rounded text-blue-600 focus:ring-0" 
                        />
                      </th>
                      <th className="p-3.5">Name / Title</th>
                      {columnVisibility.company && <th className="p-3.5">Company</th>}
                      {columnVisibility.location && <th className="p-3.5">Location</th>}
                      {columnVisibility.email && <th className="p-3.5">Email / Status</th>}
                      {columnVisibility.actions && <th className="p-3.5 text-right">Actions</th>}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map(lead => {
                      const isSelected = selectedLeadIds.includes(lead.id);
                      const isRevealed = !!revealedEmails[lead.id];
                      const isAdded = !!addedLeadIds[lead.id];

                      return (
                        <tr 
                          key={lead.id} 
                          className={`transition-colors ${isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50/80'}`}
                        >
                          {/* Checkbox */}
                          <td className="p-3.5 text-center">
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={() => handleToggleLeadSelection(lead.id)}
                              className="rounded text-blue-600 focus:ring-0 cursor-pointer" 
                            />
                          </td>

                          {/* Name / Title */}
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <img 
                                src={lead.avatar} 
                                alt={lead.name} 
                                className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0" 
                              />
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-extrabold text-slate-900 text-xs">{lead.name}</span>
                                  <a 
                                    href={lead.linkedInUrl} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="text-blue-600 hover:text-blue-800"
                                    title="View LinkedIn Profile"
                                  >
                                    <Linkedin className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                                <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5 mt-0.5">
                                  <span>{lead.title}</span>
                                  <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded text-[9px] font-bold">
                                    {lead.seniority}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Company */}
                          {columnVisibility.company && (
                            <td className="p-3.5">
                              <div className="font-bold text-slate-800 text-xs">{lead.company}</div>
                              <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                                <span className="bg-slate-100 px-1.5 py-0.5 rounded font-semibold">
                                  👥 {lead.companySize}
                                </span>
                                <span className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold border border-indigo-100">
                                  {lead.funding}
                                </span>
                              </div>
                            </td>
                          )}

                          {/* Location */}
                          {columnVisibility.location && (
                            <td className="p-3.5">
                              <div className="text-slate-700 font-semibold text-xs flex items-center gap-1">
                                <span>{lead.countryFlag}</span>
                                <span>{lead.location}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 font-medium">{lead.industry}</span>
                            </td>
                          )}

                          {/* Email / Status */}
                          {columnVisibility.email && (
                            <td className="p-3.5">
                              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-800">
                                <span>{formatObfuscatedEmail(lead.email, isRevealed)}</span>
                                <button 
                                  onClick={() => setRevealedEmails({ ...revealedEmails, [lead.id]: !isRevealed })}
                                  className="text-slate-400 hover:text-slate-700 transition-colors p-0.5"
                                  title={isRevealed ? "Hide Email" : "Reveal Email"}
                                >
                                  {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-blue-500" />}
                                </button>
                              </div>

                              <div className="flex items-center gap-1.5 mt-1">
                                {lead.emailStatus === 'Verified' ? (
                                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <span>Verified</span>
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                    <span>Catch-All</span>
                                  </span>
                                )}

                                {lead.phoneAvailable && (
                                  <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded flex items-center gap-0.5" title="Direct Dial Available">
                                    <Phone className="w-2.5 h-2.5" />
                                    <span>Direct</span>
                                  </span>
                                )}
                              </div>
                            </td>
                          )}

                          {/* Actions */}
                          {columnVisibility.actions && (
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => handleAddLead(lead.id, lead.name)}
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
                                    <span>Add</span>
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

              {/* Pagination Bar */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 font-semibold">
                <div>
                  Showing <span className="font-extrabold text-slate-800">1–{filteredLeads.length}</span> of <span className="font-extrabold text-slate-800">{estimatedMatches}</span> leads
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-bold disabled:opacity-50" disabled>
                    &lt; Prev
                  </button>
                  <span className="font-bold text-slate-800">Page 1 of 168</span>
                  <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-bold text-slate-800">
                    Next &gt;
                  </button>
                </div>
              </div>

            </div>

            {/* QUICK DATA PREVIEW / DATA INSIGHTS SUMMARY FOOTER */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Quick Data Preview & Search Insights</span>
                </h4>
                <span className="text-[11px] text-slate-400 font-medium">Real-time enrichment metrics</span>
              </div>

              {/* Insights Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Deliverability</span>
                  <div className="text-base font-black text-emerald-950 flex items-center gap-1.5">
                    <span>🟢 85% Verified</span>
                  </div>
                  <p className="text-[10px] text-emerald-600">Strict SPF / MX check passed</p>
                </div>

                <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-blue-700 uppercase">Top Geography</span>
                  <div className="text-base font-black text-blue-950 flex items-center gap-1.5">
                    <span>📍 60% US-Based</span>
                  </div>
                  <p className="text-[10px] text-blue-600">SF, Austin, NY hubs</p>
                </div>

                <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase">Top Industry</span>
                  <div className="text-base font-black text-indigo-950 flex items-center gap-1.5">
                    <span>🏢 Software & SaaS</span>
                  </div>
                  <p className="text-[10px] text-indigo-600">Avg size 11-50 employees</p>
                </div>

                <div className="p-3 bg-purple-50/80 border border-purple-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-purple-700 uppercase">Phone Reach</span>
                  <div className="text-base font-black text-purple-950 flex items-center gap-1.5">
                    <span>📱 42% Direct Dial</span>
                  </div>
                  <p className="text-[10px] text-purple-600">Mobile numbers attached</p>
                </div>

              </div>

              {/* Bottom Main Actions */}
              <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-2">
                
                {/* Export All Button */}
                <button 
                  onClick={() => showToast(`Exporting all ${estimatedMatches} leads into CSV bundle...`)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
                >
                  <Rocket className="w-4 h-4 text-amber-300" />
                  <span>🚀 Export All {estimatedMatches} Leads</span>
                </button>

                {/* Push to Contact List Dropdown */}
                <div className="relative w-full sm:w-auto">
                  <button 
                    onClick={() => setIsPushListMenuOpen(!isPushListMenuOpen)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-2xs"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>📥 Push to Contact List</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {isPushListMenuOpen && (
                    <div className="absolute right-0 bottom-full mb-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl z-30 p-2 space-y-1 text-xs">
                      <span className="block px-2 py-1 text-[10px] font-black text-slate-400 uppercase">Select Target List</span>
                      {['Primary Outreach', 'SaaS Founders US', 'VIP Decision Makers', '+ Create New List'].map((listName, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            showToast(`Pushed ${estimatedMatches} leads to "${listName}"!`);
                            setIsPushListMenuOpen(false);
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
      )}

      {/* SUB-TAB: LINKEDIN SEARCH */}
      {activeSubTab === 'linkedin' && (
        <LinkedInSearchTab 
          showToast={showToast} 
          creditsLeft={creditsLeft} 
          setCreditsLeft={setCreditsLeft} 
        />
      )}

      {/* SUB-TAB: INFLUENCERS SEARCH */}
      {activeSubTab === 'influencers' && (
        <InfluencerSearchTab
          showToast={showToast}
          creditsLeft={creditsLeft}
          setCreditsLeft={setCreditsLeft}
        />
      )}

      {/* SUB-TAB: EMAIL SEARCH */}
      {activeSubTab === 'email' && (
        <EmailSearchTab
          showToast={showToast}
          creditsLeft={creditsLeft}
          setCreditsLeft={setCreditsLeft}
        />
      )}

      {/* SUB-TAB: DOMAIN SEARCH */}
      {activeSubTab === 'domain' && (
        <DomainSearchTab
          showToast={showToast}
          creditsLeft={creditsLeft}
          setCreditsLeft={setCreditsLeft}
        />
      )}

      {/* SUB-TAB: COMPANY SEARCH */}
      {activeSubTab === 'company' && (
        <CompanySearchTab
          showToast={showToast}
          creditsLeft={creditsLeft}
          setCreditsLeft={setCreditsLeft}
          onFindDecisionMakers={(companyName) => {
            setActiveSubTab('prospect');
            setSearchInResults(companyName);
            showToast(`Filtering Prospect Search for "${companyName}"...`);
          }}
        />
      )}

    </div>
  );
};

// Rocket Icon helper component
function Rocket(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.2-2.55L4.5 16.5z"/>
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z"/>
      <path d="M9 18l3 3"/>
    </svg>
  );
}
