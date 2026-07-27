import React, { useState } from 'react';
import { 
  Megaphone, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Plus, 
  RefreshCw, 
  Filter, 
  Globe, 
  Users, 
  ChevronDown, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  FileSpreadsheet, 
  RotateCcw,
  Instagram,
  Video,
  Twitter,
  Youtube,
  Send,
  Flame
} from 'lucide-react';

interface InfluencerSearchTabProps {
  showToast: (msg: string) => void;
  creditsLeft: number;
  setCreditsLeft: React.Dispatch<React.SetStateAction<number>>;
}

interface Creator {
  id: string;
  handle: string;
  name: string;
  platform: 'Instagram' | 'TikTok' | 'YouTube' | 'X (Twitter)';
  niche: string;
  followers: string;
  er: string;
  topAudience: string;
  genderBias: string;
  email: string;
  emailStatus: 'Verified' | 'Catch-All';
  avatar: string;
  added?: boolean;
}

const INITIAL_CREATORS: Creator[] = [
  {
    id: 'cr-1',
    handle: '@tech_review',
    name: 'Tech & Gadgets Daily',
    platform: 'Instagram',
    niche: 'Tech & AI',
    followers: '85K',
    er: '4.8%',
    topAudience: '65% US',
    genderBias: 'Male',
    email: 'tech.review@creators.io',
    emailStatus: 'Verified',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'cr-2',
    handle: '@dev_vibes',
    name: 'Coding & SaaS Hub',
    platform: 'TikTok',
    niche: 'SaaS & Coding',
    followers: '240K',
    er: '7.2%',
    topAudience: '80% US',
    genderBias: 'Mixed',
    email: 'devvibes@gmail.com',
    emailStatus: 'Catch-All',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'cr-3',
    handle: '@ai_explorers',
    name: 'AI & Automation Hub',
    platform: 'YouTube',
    niche: 'AI Tools',
    followers: '520K',
    er: '6.1%',
    topAudience: '72% US',
    genderBias: 'Male',
    email: 'contact@aiexplorers.tv',
    emailStatus: 'Verified',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'cr-4',
    handle: '@startup_hacks',
    name: 'Growth Hacks 101',
    platform: 'X (Twitter)',
    niche: 'B2B Growth',
    followers: '115K',
    er: '5.4%',
    topAudience: '58% US',
    genderBias: 'Mixed',
    email: 'hello@startuphacks.co',
    emailStatus: 'Verified',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'cr-5',
    handle: '@product_drops',
    name: 'Tech Unboxing',
    platform: 'Instagram',
    niche: 'Consumer Tech',
    followers: '310K',
    er: '3.9%',
    topAudience: '60% US',
    genderBias: 'Male',
    email: 'drops@productmedia.com',
    emailStatus: 'Verified',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  }
];

export const InfluencerSearchTab: React.FC<InfluencerSearchTabProps> = ({
  showToast,
  creditsLeft,
  setCreditsLeft
}) => {
  // Filters State
  const [platform, setPlatform] = useState<'All' | 'Instagram' | 'TikTok' | 'YouTube' | 'X'>('Instagram');
  const [followerRange, setFollowerRange] = useState('10K - 100K');
  const [minER, setMinER] = useState('3.0');
  const [locations, setLocations] = useState<string[]>(['United States']);
  const [niches, setNiches] = useState<string[]>(['Tech & AI']);
  const [locationInput, setLocationInput] = useState('');
  const [nicheInput, setNicheInput] = useState('');

  // Results State
  const [creators, setCreators] = useState<Creator[]>(INITIAL_CREATORS);
  const [searchBioQuery, setSearchBioQuery] = useState('');
  const [sortBy, setSortBy] = useState<'er' | 'followers'>('er');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [isSearching, setIsSearching] = useState(false);

  // Pitch Dropdown
  const [isPitchMenuOpen, setIsPitchMenuOpen] = useState(false);

  // Add Location Tag
  const handleAddLocation = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && locationInput.trim()) {
      e.preventDefault();
      if (!locations.includes(locationInput.trim())) {
        setLocations([...locations, locationInput.trim()]);
      }
      setLocationInput('');
    }
  };

  // Add Niche Tag
  const handleAddNiche = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && nicheInput.trim()) {
      e.preventDefault();
      if (!niches.includes(nicheInput.trim())) {
        setNiches([...niches, nicheInput.trim()]);
      }
      nicheInput && setNicheInput('');
    }
  };

  // Search Action
  const handleRunSearch = () => {
    if (creditsLeft <= 0) {
      showToast('No credits left!');
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setCreditsLeft(c => Math.max(0, c - 15));
      showToast('Found 950 target creators matching filters!');
    }, 800);
  };

  // Add Creator Single Action
  const handleAddCreator = (id: string, name: string) => {
    setAddedIds(prev => ({ ...prev, [id]: true }));
    setCreditsLeft(prev => Math.max(0, prev - 1));
    showToast(`Added ${name} to campaign outreach list!`);
  };

  // Filtered Creators
  const filteredCreators = creators.filter(c => {
    if (searchBioQuery.trim()) {
      const q = searchBioQuery.toLowerCase();
      return (
        c.handle.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.niche.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
            <span>Lead Gen</span>
            <span className="text-slate-300">&gt;</span>
            <span className="text-blue-600 font-extrabold">Influencers Search</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Influencer & Creator Search Engine</span>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
              Creator Database
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover vetted social creators with verified business email contacts.
          </p>
        </div>

        <div className="px-3.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl font-extrabold text-xs flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-blue-600" />
          <span>Search Credits Remaining: <strong className="text-blue-700">{creditsLeft.toLocaleString()}</strong></span>
        </div>
      </div>

      {/* DUAL PANEL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* PANEL 1: CREATOR FILTERS (LEFT 1 COL) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 h-fit">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Creator Filters</span>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">Parameters</span>
          </div>

          {/* Platform Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Platform</label>
            <select
              value={platform}
              onChange={e => setPlatform(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
            >
              <option value="Instagram">📸 Instagram</option>
              <option value="TikTok">🎵 TikTok</option>
              <option value="YouTube">▶️ YouTube</option>
              <option value="X">𝕏 X (Twitter)</option>
            </select>
          </div>

          {/* Follower Range */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Follower Range</label>
            <select
              value={followerRange}
              onChange={e => setFollowerRange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
            >
              <option value="1K - 10K">Nano (1K - 10K)</option>
              <option value="10K - 100K">Micro (10K - 100K)</option>
              <option value="100K - 500K">Mid-Tier (100K - 500K)</option>
              <option value="500K+">Macro (500K+)</option>
            </select>
          </div>

          {/* Minimum ER % */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Min Engagement Rate (ER %)</label>
            <select
              value={minER}
              onChange={e => setMinER(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
            >
              <option value="1.5">Min 1.5% ER</option>
              <option value="3.0">Min 3.0% ER 🔥</option>
              <option value="5.0">Min 5.0% High ER 🔥🔥</option>
            </select>
          </div>

          {/* Location & Niche Tag Chips */}
          <div className="space-y-3 pt-1 border-t border-slate-100">
            {/* Location Tags */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Location</label>
              <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                {locations.map((loc, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1">
                    <span>{loc}</span>
                    <button onClick={() => setLocations(locations.filter(l => l !== loc))} className="hover:text-rose-600">×</button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Type location + Enter..."
                  value={locationInput}
                  onChange={e => setLocationInput(e.target.value)}
                  onKeyDown={handleAddLocation}
                  className="bg-transparent text-xs font-semibold focus:outline-none flex-1 min-w-[100px]"
                />
              </div>
            </div>

            {/* Niche Tags */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Niche & Bio Keywords</label>
              <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                {niches.map((n, idx) => (
                  <span key={idx} className="bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1">
                    <span>{n}</span>
                    <button onClick={() => setNiches(niches.filter(item => item !== n))} className="hover:text-rose-600">×</button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Type niche + Enter..."
                  value={nicheInput}
                  onChange={e => setNicheInput(e.target.value)}
                  onKeyDown={handleAddNiche}
                  className="bg-transparent text-xs font-semibold focus:outline-none flex-1 min-w-[100px]"
                />
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleRunSearch}
              disabled={isSearching}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
            >
              {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />}
              <span>⚡ Search 950 Creators</span>
            </button>

            <button
              onClick={() => {
                setLocations(['United States']);
                setNiches(['Tech & AI']);
                showToast('Reset creator search filters');
              }}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

        </div>

        {/* PANEL 2: INFLUENCER DISCOVERY GRID (RIGHT 2 COLS) */}
        <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* Search & Sort Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="🔍 Search bio keywords or handle..."
                  value={searchBioQuery}
                  onChange={e => setSearchBioQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="er">Engagement Rate 🔥</option>
                  <option value="followers">Follower Count</option>
                </select>
              </div>
            </div>

            {/* Creator Data Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Creator</th>
                      <th className="p-3.5">Platform & ER%</th>
                      <th className="p-3.5">Audience</th>
                      <th className="p-3.5">Contact Email</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {filteredCreators.map((c) => {
                      const isAdded = addedIds[c.id];
                      return (
                        <tr key={c.id} className="hover:bg-slate-50/80 transition-all">
                          
                          {/* Creator Info */}
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <img src={c.avatar} alt={c.handle} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                              <div>
                                <div className="font-extrabold text-slate-900">{c.handle}</div>
                                <div className="text-[11px] text-slate-500 font-medium">{c.niche}</div>
                              </div>
                            </div>
                          </td>

                          {/* Platform & ER% */}
                          <td className="p-3.5">
                            <div className="font-extrabold text-slate-900 flex items-center gap-1">
                              <span>{c.platform}</span>
                            </div>
                            <div className="text-[10px] text-amber-600 font-extrabold flex items-center gap-0.5 mt-0.5">
                              <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span>ER: {c.er}</span>
                            </div>
                          </td>

                          {/* Audience */}
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900">{c.followers} Followers</div>
                            <div className="text-[10px] text-slate-500">{c.topAudience} / {c.genderBias}</div>
                          </td>

                          {/* Email */}
                          <td className="p-3.5 font-mono text-xs font-bold text-slate-800">
                            <div>{c.email}</div>
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                              🟢 Verified
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleAddCreator(c.id, c.handle)}
                              disabled={isAdded}
                              className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all shadow-2xs flex items-center justify-center gap-1 ml-auto ${
                                isAdded ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                            >
                              {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                              <span>{isAdded ? 'Added ✓' : '+ Add'}</span>
                            </button>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs text-slate-500 font-semibold">
                <span>Showing 1–{filteredCreators.length} of 950 creators</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-bold">&lt; Prev</button>
                  <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-bold">Next &gt;</button>
                </div>
              </div>
            </div>

          </div>

          {/* AUDIENCE DEMOGRAPHICS SUMMARY FOOTER */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 mt-2">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>AUDIENCE DEMOGRAPHICS SUMMARY</span>
              </h4>
              <span className="text-[11px] text-emerald-600 font-bold">🟢 High ER Target List</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Top Audience</span>
                <div className="text-sm font-black text-emerald-950">📍 USA (68%)</div>
              </div>

              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-amber-700 uppercase">Avg ER Rate</span>
                <div className="text-sm font-black text-amber-950">👥 5.6% Average</div>
              </div>

              <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-indigo-700 uppercase">Direct Email Rate</span>
                <div className="text-sm font-black text-indigo-950">✉️ 88% Direct Email</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-2">
              <button
                onClick={() => showToast('Exported creator list to CSV')}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>🚀 Export Creator List</span>
              </button>

              <div className="relative w-full sm:w-auto">
                <button
                  onClick={() => setIsPitchMenuOpen(!isPitchMenuOpen)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span>📥 Send Collaboration Pitch</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isPitchMenuOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl z-30 p-2 space-y-1 text-xs">
                    {['Product Sponsorship Template', 'Affiliate Commission Pitch', 'Custom Outreach'].map((tmpl, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          showToast(`Selected "${tmpl}" pitch template!`);
                          setIsPitchMenuOpen(false);
                        }}
                        className="w-full text-left p-2.5 hover:bg-slate-50 font-bold text-slate-800 rounded-xl flex items-center justify-between"
                      >
                        <span>{tmpl}</span>
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
