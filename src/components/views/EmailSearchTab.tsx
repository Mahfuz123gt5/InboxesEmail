import React, { useState } from 'react';
import { 
  Mail, 
  Search, 
  CheckCircle2, 
  Copy, 
  Check, 
  Plus, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  Upload, 
  RefreshCw, 
  Server, 
  Key, 
  Globe, 
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';

interface EmailSearchTabProps {
  showToast: (msg: string) => void;
  creditsLeft: number;
  setCreditsLeft: React.Dispatch<React.SetStateAction<number>>;
}

export const EmailSearchTab: React.FC<EmailSearchTabProps> = ({
  showToast,
  creditsLeft,
  setCreditsLeft
}) => {
  // Search Mode State
  const [searchMode, setSearchMode] = useState<'single' | 'bulk' | 'reverse'>('single');

  // Single Lookup Form Inputs
  const [firstName, setFirstName] = useState('Satya');
  const [lastName, setLastName] = useState('Nadella');
  const [domain, setDomain] = useState('microsoft.com');

  // Reverse Email Input
  const [reverseEmailInput, setReverseEmailInput] = useState('s.nadella@microsoft.com');

  // Results State
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<{
    foundEmail: string;
    confidence: number;
    status: 'Deliverable' | 'Catch-All' | 'Undeliverable';
    syntax: boolean;
    mxRecord: boolean;
    smtpPing: boolean;
    disposableClean: boolean;
  } | null>({
    foundEmail: 's.nadella@microsoft.com',
    confidence: 98,
    status: 'Deliverable',
    syntax: true,
    mxRecord: true,
    smtpPing: true,
    disposableClean: true
  });

  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Run Find & Verify Email
  const handleFindEmail = () => {
    if (creditsLeft <= 0) {
      showToast('No verification credits left!');
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setCreditsLeft(c => Math.max(0, c - 1));
      
      const email = `${firstName.toLowerCase().charAt(0)}.${lastName.toLowerCase()}@${domain.toLowerCase().replace(/https?:\/\//, '').trim()}`;
      setResult({
        foundEmail: email,
        confidence: 98,
        status: 'Deliverable',
        syntax: true,
        mxRecord: true,
        smtpPing: true,
        disposableClean: true
      });
      showToast(`Found and verified email: ${email}`);
    }, 900);
  };

  const handleCopyEmail = () => {
    if (result) {
      navigator.clipboard.writeText(result.foundEmail);
      setCopied(true);
      showToast(`Copied ${result.foundEmail} to clipboard`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveContact = () => {
    setSaved(true);
    showToast(`Saved contact ${firstName} ${lastName} to contacts!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-5xl mx-auto">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
            <span>Lead Gen</span>
            <span className="text-slate-300">&gt;</span>
            <span className="text-blue-600 font-extrabold">Email Search</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Email Finder & Reverse Lookup</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              SMTP Verifier
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Locate and verify individual decision maker work email addresses with direct MX & SMTP pings.
          </p>
        </div>

        <div className="px-3.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl font-extrabold text-xs flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-blue-600" />
          <span>Verification Credits: <strong className="text-blue-700">{creditsLeft.toLocaleString()}</strong></span>
        </div>
      </div>

      {/* SEARCH MODE SELECTION HEADER CARD */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider">Search Mode Selection</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
          
          <button
            onClick={() => setSearchMode('single')}
            className={`p-3 rounded-xl border transition-all text-left flex items-center gap-2.5 ${
              searchMode === 'single'
                ? 'bg-blue-50 border-blue-300 text-blue-950 shadow-2xs font-black'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <input type="radio" checked={searchMode === 'single'} readOnly className="accent-blue-600" />
            <span>Single Email Lookup</span>
          </button>

          <button
            onClick={() => setSearchMode('bulk')}
            className={`p-3 rounded-xl border transition-all text-left flex items-center gap-2.5 ${
              searchMode === 'bulk'
                ? 'bg-blue-50 border-blue-300 text-blue-950 shadow-2xs font-black'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <input type="radio" checked={searchMode === 'bulk'} readOnly className="accent-blue-600" />
            <span>Bulk CSV Finder</span>
          </button>

          <button
            onClick={() => setSearchMode('reverse')}
            className={`p-3 rounded-xl border transition-all text-left flex items-center gap-2.5 ${
              searchMode === 'reverse'
                ? 'bg-blue-50 border-blue-300 text-blue-950 shadow-2xs font-black'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <input type="radio" checked={searchMode === 'reverse'} readOnly className="accent-blue-600" />
            <span>Reverse Email Search</span>
          </button>

        </div>
      </div>

      {/* INPUT PARAMETERS CARD */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>Input Parameters</span>
          </h3>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">1 Credit per Lookup</span>
        </div>

        {searchMode === 'single' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="e.g. Satya"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="e.g. Nadella"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Company Domain / Website</label>
                <input
                  type="text"
                  value={domain}
                  onChange={e => setDomain(e.target.value)}
                  placeholder="e.g. microsoft.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleFindEmail}
              disabled={isSearching}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
            >
              {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />}
              <span>⚡ Find & Verify Email</span>
            </button>
          </div>
        )}

        {searchMode === 'bulk' && (
          <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-3 bg-slate-50/50">
            <Upload className="w-10 h-10 text-blue-600 mx-auto" />
            <div>
              <h4 className="font-extrabold text-sm text-slate-800">Upload CSV file with Names & Domains</h4>
              <p className="text-xs text-slate-500 mt-0.5">Supports CSV files up to 10,000 rows. Auto-matches first name, last name & domain columns.</p>
            </div>
            <button
              onClick={() => showToast('Selected CSV file for bulk email verification!')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20"
            >
              Choose CSV File
            </button>
          </div>
        )}

        {searchMode === 'reverse' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Enter Email Address for Reverse Lookup</label>
              <input
                type="email"
                value={reverseEmailInput}
                onChange={e => setReverseEmailInput(e.target.value)}
                placeholder="e.g. s.nadella@microsoft.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800"
              />
            </div>
            <button
              onClick={handleFindEmail}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-blue-500/20"
            >
              🔍 Reverse Lookup Owner Details
            </button>
          </div>
        )}

      </div>

      {/* SEARCH RESULT & VERIFICATION BREAKDOWN */}
      {result && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Search Result & Verification Breakdown</span>
            </h3>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
              🟢 Deliverable Email
            </span>
          </div>

          {/* Email Match Row */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FOUND EMAIL</span>
              <div className="text-lg font-black font-mono text-slate-900 flex items-center gap-2">
                <span>{result.foundEmail}</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-sans font-bold">
                  {result.confidence}% Match
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-2xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied ✓' : '📋 Copy Email'}</span>
              </button>

              <button
                onClick={handleSaveContact}
                disabled={saved}
                className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all shadow-2xs flex items-center gap-1.5 ${
                  saved ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {saved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{saved ? 'Saved ✓' : '+ Save Contact'}</span>
              </button>
            </div>

          </div>

          {/* Technical Verification Checks */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Technical Verification Checks</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-950 flex items-center justify-between">
                <span>Syntax Format</span>
                <span>🟢 Valid</span>
              </div>

              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-950 flex items-center justify-between">
                <span>MX Record</span>
                <span>🟢 Found</span>
              </div>

              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-950 flex items-center justify-between">
                <span>SMTP Ping</span>
                <span>🟢 Success</span>
              </div>

              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-950 flex items-center justify-between">
                <span>Disposable</span>
                <span>🟢 Clean</span>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
