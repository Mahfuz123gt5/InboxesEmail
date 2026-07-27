import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  Building2, 
  Download, 
  Plus, 
  Check, 
  ChevronDown, 
  ChevronRight, 
  Zap, 
  CreditCard, 
  Code2, 
  ShieldCheck, 
  Layers,
  Sparkles
} from 'lucide-react';

interface DomainSearchTabProps {
  showToast: (msg: string) => void;
  creditsLeft: number;
  setCreditsLeft: React.Dispatch<React.SetStateAction<number>>;
}

interface DomainContact {
  id: string;
  name: string;
  title: string;
  department: 'Executive' | 'Engineering' | 'Sales' | 'Marketing';
  email: string;
  status: 'Verified' | 'Catch-All';
  added?: boolean;
}

const INITIAL_DOMAIN_CONTACTS: DomainContact[] = [
  {
    id: 'dc-1',
    name: 'Patrick Collison',
    title: 'Chief Executive Officer & Co-Founder',
    department: 'Executive',
    email: 'p.collison@stripe.com',
    status: 'Verified'
  },
  {
    id: 'dc-2',
    name: 'Claire Hughes Johnson',
    title: 'Chief Marketing Officer',
    department: 'Marketing',
    email: 'c.hughes@stripe.com',
    status: 'Verified'
  },
  {
    id: 'dc-3',
    name: 'John Doe',
    title: 'Engineering Lead - Infrastructure',
    department: 'Engineering',
    email: 'j.doe@stripe.com',
    status: 'Catch-All'
  },
  {
    id: 'dc-4',
    name: 'Sarah Jenkins',
    title: 'VP of Enterprise Sales',
    department: 'Sales',
    email: 's.jenkins@stripe.com',
    status: 'Verified'
  },
  {
    id: 'dc-5',
    name: 'David Miller',
    title: 'Head of Developer Relations',
    department: 'Engineering',
    email: 'd.miller@stripe.com',
    status: 'Verified'
  }
];

export const DomainSearchTab: React.FC<DomainSearchTabProps> = ({
  showToast,
  creditsLeft,
  setCreditsLeft
}) => {
  const [domainQuery, setDomainQuery] = useState('stripe.com');
  const [activeDept, setActiveDept] = useState<'All' | 'Executive' | 'Engineering' | 'Sales' | 'Marketing'>('All');
  const [contacts, setContacts] = useState<DomainContact[]>(INITIAL_DOMAIN_CONTACTS);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [isSearching, setIsSearching] = useState(false);
  const [isPushListMenuOpen, setIsPushListMenuOpen] = useState(false);

  const handleSearchDomain = () => {
    if (creditsLeft <= 0) {
      showToast('No credits left!');
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setCreditsLeft(c => Math.max(0, c - 5));
      showToast(`Scraped domain pattern & 342 contacts for ${domainQuery}`);
    }, 800);
  };

  const handleAddContact = (id: string, name: string) => {
    setAddedIds(prev => ({ ...prev, [id]: true }));
    setCreditsLeft(prev => Math.max(0, prev - 1));
    showToast(`Added ${name} to contact list!`);
  };

  const filteredContacts = contacts.filter(c => {
    if (activeDept === 'All') return true;
    return c.department === activeDept;
  });

  return (
    <div className="space-y-6 animate-in fade-in max-w-6xl mx-auto">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
            <span>Lead Gen</span>
            <span className="text-slate-300">&gt;</span>
            <span className="text-blue-600 font-extrabold">Domain Search</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Domain Search & Email Pattern Finder</span>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
              Tech Stack Finder
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify corporate email patterns, department trees, and technographic signatures for target domains.
          </p>
        </div>

        <div className="px-3.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl font-extrabold text-xs flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-blue-600" />
          <span>Credits Remaining: <strong className="text-blue-700">{creditsLeft.toLocaleString()}</strong></span>
        </div>
      </div>

      {/* DOMAIN INPUT BAR */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <label className="block text-xs font-bold text-slate-700">Target Corporate Domain</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={domainQuery}
              onChange={e => setDomainQuery(e.target.value)}
              placeholder="e.g. stripe.com"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSearchDomain}
            disabled={isSearching}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all shrink-0"
          >
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>⚡ Search Domain Emails</span>
          </button>
        </div>
      </div>

      {/* DOMAIN OVERVIEW & TECH STACK CARD */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        
        {/* Company Header Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 text-white font-black text-lg rounded-xl">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">Stripe, Inc.</h2>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-200">
                  Verified Domain
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold mt-1">
                <span>📍 San Francisco, CA, USA</span>
                <span>•</span>
                <span>👥 5,000+ Employees</span>
                <span>•</span>
                <span className="font-mono text-blue-600 font-extrabold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  ✉️ Pattern: &#123;first&#125;.&#123;last&#125;@stripe.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Detected */}
        <div className="space-y-2">
          <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider">Tech Stack Detected on Domain</label>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <span>🟨 React</span>
            </span>
            <span className="px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <span>🟦 AWS Cloud</span>
            </span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <span>🟩 Node.js</span>
            </span>
            <span className="px-3 py-1 bg-purple-50 text-purple-900 border border-purple-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <span>🟪 HubSpot CRM</span>
            </span>
            <span className="px-3 py-1 bg-sky-50 text-sky-900 border border-sky-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <span>🟦 Cloudflare CDN</span>
            </span>
          </div>
        </div>

      </div>

      {/* DEPARTMENTAL CONTACTS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4 p-5">
        
        {/* Header & Department Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">Departmental Contacts (342 Found)</h3>
            <p className="text-xs text-slate-500">Filter verified contacts by organizational department.</p>
          </div>

          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {(['All', 'Executive', 'Engineering', 'Sales', 'Marketing'] as const).map(dept => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeDept === dept
                    ? 'bg-white text-blue-950 font-black shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {dept} {dept === 'All' ? '(342)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Contacts Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Name / Title</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Email Address</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {filteredContacts.map(c => {
                const isAdded = addedIds[c.id];
                return (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-all">
                    <td className="p-3.5">
                      <div className="font-extrabold text-slate-900 text-xs">{c.name}</div>
                      <div className="text-[11px] text-slate-500">{c.title}</div>
                    </td>

                    <td className="p-3.5">
                      <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold">
                        {c.department}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono text-xs font-bold text-blue-600">
                      {c.email}
                    </td>

                    <td className="p-3.5">
                      {c.status === 'Verified' ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          🟢 Verified
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                          🟡 Catch-All
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleAddContact(c.id, c.name)}
                        disabled={isAdded}
                        className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all shadow-2xs flex items-center gap-1 ml-auto ${
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

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={() => showToast(`Exported all 342 domain contacts for ${domainQuery} to CSV`)}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
          >
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>🚀 Export All Domain Emails (342)</span>
          </button>

          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setIsPushListMenuOpen(!isPushListMenuOpen)}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>📥 Push Selected to Contact List</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isPushListMenuOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl z-30 p-2 space-y-1 text-xs">
                {['Stripe Account Outreach', 'Executive Target List', 'SaaS Founders'].map((listName, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      showToast(`Pushed domain contacts to "${listName}"!`);
                      setIsPushListMenuOpen(false);
                    }}
                    className="w-full text-left p-2.5 hover:bg-slate-50 font-bold text-slate-800 rounded-xl flex items-center justify-between"
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
  );
};
