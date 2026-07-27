import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Download, 
  ChevronDown, 
  ChevronRight, 
  Zap, 
  CreditCard, 
  Users, 
  TrendingUp, 
  DollarSign, 
  RotateCcw,
  UserCheck
} from 'lucide-react';

interface CompanySearchTabProps {
  showToast: (msg: string) => void;
  creditsLeft: number;
  setCreditsLeft: React.Dispatch<React.SetStateAction<number>>;
  onFindDecisionMakers?: (companyName: string) => void;
}

interface CompanyAccount {
  id: string;
  name: string;
  industry: string;
  location: string;
  employees: string;
  revenue: string;
  funding: string;
  tech: string[];
  logo: string;
}

const INITIAL_COMPANIES: CompanyAccount[] = [
  {
    id: 'co-1',
    name: 'FinFlow Inc.',
    industry: 'Fintech',
    location: 'Austin, TX, USA',
    employees: '120 Employees',
    revenue: '$12M/yr',
    funding: '$15M Series A',
    tech: ['React', 'AWS', 'Stripe'],
    logo: '⚡'
  },
  {
    id: 'co-2',
    name: 'CloudScale Corp',
    industry: 'DevOps & SaaS',
    location: 'London, UK',
    employees: '85 Employees',
    revenue: '$8M/yr',
    funding: 'Bootstrapped',
    tech: ['Node.js', 'HubSpot', 'Docker'],
    logo: '☁️'
  },
  {
    id: 'co-3',
    name: 'TechFlow Systems',
    industry: 'Software & AI',
    location: 'San Francisco, CA, USA',
    employees: '180 Employees',
    revenue: '$22M/yr',
    funding: '$28M Series B',
    tech: ['Python', 'AWS', 'Salesforce'],
    logo: '🌊'
  },
  {
    id: 'co-4',
    name: 'DataStream Logistics',
    industry: 'Data & Analytics',
    location: 'Chicago, IL, USA',
    employees: '95 Employees',
    revenue: '$10M/yr',
    funding: '$6M Seed',
    tech: ['React', 'Snowflake', 'GCP'],
    logo: '📊'
  },
  {
    id: 'co-5',
    name: 'HealthTech Direct',
    industry: 'Healthcare SaaS',
    location: 'San Jose, CA, USA',
    employees: '45 Employees',
    revenue: '$4M/yr',
    funding: '$3.5M Seed',
    tech: ['Next.js', 'PostgreSQL', 'AWS'],
    logo: '🏥'
  }
];

export const CompanySearchTab: React.FC<CompanySearchTabProps> = ({
  showToast,
  creditsLeft,
  setCreditsLeft,
  onFindDecisionMakers
}) => {
  // Firmographic Filters State
  const [industries, setIndustries] = useState<string[]>(['Software', 'Fintech']);
  const [industryInput, setIndustryInput] = useState('');
  const [headcount, setHeadcount] = useState('51 - 200');
  const [revenue, setRevenue] = useState('$5M - $20M');
  const [fundingStage, setFundingStage] = useState('Series A, Series B');
  const [techStack, setTechStack] = useState<string[]>(['HubSpot', 'AWS']);
  const [techInput, setTechInput] = useState('');

  // Search Results State
  const [companies, setCompanies] = useState<CompanyAccount[]>(INITIAL_COMPANIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('growth');
  const [isSearching, setIsSearching] = useState(false);
  const [isExtractMenuOpen, setIsExtractMenuOpen] = useState(false);

  // Add Tag Handlers
  const handleAddIndustry = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && industryInput.trim()) {
      e.preventDefault();
      if (!industries.includes(industryInput.trim())) {
        setIndustries([...industries, industryInput.trim()]);
      }
      setIndustryInput('');
    }
  };

  const handleAddTech = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!techStack.includes(techInput.trim())) {
        setTechStack([...techStack, techInput.trim()]);
      }
      setTechInput('');
    }
  };

  const handleRunSearch = () => {
    if (creditsLeft <= 0) {
      showToast('No credits left!');
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setCreditsLeft(c => Math.max(0, c - 20));
      showToast('Matched 2,400 target account companies!');
    }, 800);
  };

  const filteredCompanies = companies.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
            <span>Lead Gen</span>
            <span className="text-slate-300">&gt;</span>
            <span className="text-blue-600 font-extrabold">Company Search</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Company & Account-Based Search Engine</span>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
              Account Targeting
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Target high-intent corporate accounts based on firmographics, funding rounds, and technographics.
          </p>
        </div>

        <div className="px-3.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl font-extrabold text-xs flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-blue-600" />
          <span>Credits Remaining: <strong className="text-blue-700">{creditsLeft.toLocaleString()}</strong></span>
        </div>
      </div>

      {/* DUAL PANEL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* PANEL 1: FIRMOGRAPHIC FILTERS (LEFT 1 COL) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 h-fit">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Firmographic Filters</span>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">Criteria</span>
          </div>

          {/* Industry Tags */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Industry</label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl">
              {industries.map((ind, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1">
                  <span>{ind}</span>
                  <button onClick={() => setIndustries(industries.filter(i => i !== ind))} className="hover:text-rose-600">×</button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add industry + Enter..."
                value={industryInput}
                onChange={e => setIndustryInput(e.target.value)}
                onKeyDown={handleAddIndustry}
                className="bg-transparent text-xs font-semibold focus:outline-none flex-1 min-w-[100px]"
              />
            </div>
          </div>

          {/* Headcount */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Headcount Range</label>
            <select
              value={headcount}
              onChange={e => setHeadcount(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
            >
              <option value="11 - 50">11 - 50 Employees</option>
              <option value="51 - 200">51 - 200 Employees</option>
              <option value="201 - 500">201 - 500 Employees</option>
              <option value="500+">500+ Enterprise</option>
            </select>
          </div>

          {/* Annual Revenue */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Annual Revenue</label>
            <select
              value={revenue}
              onChange={e => setRevenue(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
            >
              <option value="< $1M">&lt; $1M Revenue</option>
              <option value="$1M - $5M">$1M - $5M Revenue</option>
              <option value="$5M - $20M">$5M - $20M Revenue</option>
              <option value="$20M+">$20M+ Growth</option>
            </select>
          </div>

          {/* Funding Stage */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Funding Stage</label>
            <select
              value={fundingStage}
              onChange={e => setFundingStage(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
            >
              <option value="Seed">Seed Stage</option>
              <option value="Series A, Series B">Series A & Series B</option>
              <option value="Growth">Growth / Late Stage</option>
              <option value="Bootstrapped">Bootstrapped</option>
            </select>
          </div>

          {/* Technographic Tags */}
          <div className="space-y-1.5 pt-1 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700">Technology Used (Technographics)</label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl">
              {techStack.map((t, idx) => (
                <span key={idx} className="bg-purple-100 text-purple-900 px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1">
                  <span>{t}</span>
                  <button onClick={() => setTechStack(techStack.filter(item => item !== t))} className="hover:text-rose-600">×</button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add tech + Enter..."
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={handleAddTech}
                className="bg-transparent text-xs font-semibold focus:outline-none flex-1 min-w-[100px]"
              />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleRunSearch}
              disabled={isSearching}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
            >
              {isSearching ? <Zap className="w-4 h-4 animate-spin text-amber-300" /> : <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />}
              <span>⚡ Search 2,400 Accounts</span>
            </button>

            <button
              onClick={() => {
                setIndustries(['Software', 'Fintech']);
                setTechStack(['HubSpot', 'AWS']);
                showToast('Reset account filters');
              }}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

        </div>

        {/* PANEL 2: TARGET ACCOUNTS FOUND GRID (RIGHT 2 COLS) */}
        <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* Search & Sort Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="🔍 Search by company name..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="growth">Headcount Growth 📈</option>
                  <option value="funding">Funding Raised</option>
                </select>
              </div>
            </div>

            {/* Company Accounts Data Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Company Name</th>
                      <th className="p-3.5">Location & Size</th>
                      <th className="p-3.5">Tech & Funding</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {filteredCompanies.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/80 transition-all">
                        
                        {/* Company Name */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-lg border border-slate-200">
                              {c.logo}
                            </div>
                            <div>
                              <div className="font-black text-slate-900 text-xs">{c.name}</div>
                              <div className="text-[11px] text-slate-500">{c.industry}</div>
                            </div>
                          </div>
                        </td>

                        {/* Location & Size */}
                        <td className="p-3.5">
                          <div className="font-extrabold text-slate-900 text-xs">{c.location}</div>
                          <div className="text-[10px] text-slate-500 font-bold">{c.employees}</div>
                        </td>

                        {/* Tech & Funding */}
                        <td className="p-3.5">
                          <div className="text-xs font-extrabold text-indigo-900">{c.funding}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {c.tech.map((t, idx) => (
                              <span key={idx} className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded text-[9px] font-bold">
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Bridge Action: Find Decision Makers */}
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              showToast(`Extracting decision makers for ${c.name}...`);
                              if (onFindDecisionMakers) onFindDecisionMakers(c.name);
                            }}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-xs transition-all shadow-2xs flex items-center gap-1.5 ml-auto"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>👤 Find Decision Makers</span>
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs text-slate-500 font-semibold">
                <span>Showing 1–{filteredCompanies.length} of 2,400 accounts</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-bold">&lt; Prev</button>
                  <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-bold">Next &gt;</button>
                </div>
              </div>
            </div>

          </div>

          {/* ACCOUNT SEARCH SUMMARY FOOTER */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 mt-2">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>ACCOUNT SEARCH SUMMARY</span>
              </h4>
              <span className="text-[11px] text-emerald-600 font-bold">🟢 High Growth Target Accounts</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Accounts Matched</span>
                <div className="text-sm font-black text-blue-950">🏢 2,400 Accounts</div>
              </div>

              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Avg Growth Rate</span>
                <div className="text-sm font-black text-emerald-950">📈 +18% Headcount Growth</div>
              </div>

              <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-indigo-700 uppercase">Venture Funded</span>
                <div className="text-sm font-black text-indigo-950">💰 65% Funded</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-2">
              <button
                onClick={() => showToast('Exported 2,400 accounts to CSV file')}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>🚀 Export Account List (CSV)</span>
              </button>

              <div className="relative w-full sm:w-auto">
                <button
                  onClick={() => setIsExtractMenuOpen(!isExtractMenuOpen)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>👥 Extract Decision Makers</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isExtractMenuOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl z-30 p-2 space-y-1 text-xs">
                    {['C-Level Executives Only', 'VPs & Directors', 'All Department Heads'].map((role, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          showToast(`Extracting ${role} for all 2,400 accounts...`);
                          setIsExtractMenuOpen(false);
                        }}
                        className="w-full text-left p-2.5 hover:bg-slate-50 font-bold text-slate-800 rounded-xl flex items-center justify-between"
                      >
                        <span>{role}</span>
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
