import React, { useState, useEffect } from 'react';
import { 
  MailCheck, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Upload, 
  Check, 
  ShieldCheck,
  RefreshCw,
  FileSpreadsheet,
  Download,
  Trash2,
  Play,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Filter,
  Zap,
  AlertTriangle,
  Server,
  Globe,
  X,
  PieChart,
  Info,
  Sparkles,
  FileText
} from 'lucide-react';
import { VerificationResult, VerificationEmailDetail } from '../../types';

interface EmailVerifierViewProps {
  verifications: VerificationResult[];
  onOpenImportWizard: () => void;
}

export const EmailVerifierView: React.FC<EmailVerifierViewProps> = ({
  verifications: initialVerificationsProp,
  onOpenImportWizard
}) => {
  // Local Verifications dataset state so users can upload, delete, or re-test live
  const [verifications, setVerifications] = useState<VerificationResult[]>(initialVerificationsProp);
  
  // Single Email Check State
  const [singleEmail, setSingleEmail] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [singleCheckProgress, setSingleCheckProgress] = useState(0);
  const [singleSteps, setSingleSteps] = useState([
    { id: 'syntax', name: 'Syntax Check', status: 'pending', detail: 'RFC 5322 syntax validation' },
    { id: 'mx', name: 'Domain & MX Record', status: 'pending', detail: 'DNS lookup for mail exchanger' },
    { id: 'smtp', name: 'SMTP Server Ping', status: 'pending', detail: 'Direct server handshake' },
    { id: 'disposable', name: 'Disposable Mail Check', status: 'pending', detail: 'Database lookup for temporary domains' },
    { id: 'role', name: 'Role-Based Address', status: 'pending', detail: 'Detecting group/department emails' }
  ]);
  const [singleResult, setSingleResult] = useState<{
    email: string;
    category: 'deliverable' | 'undeliverable' | 'accept_all' | 'disposable' | 'role_based';
    score: number;
    reason: string;
    mxHost: string;
    pingTime: string;
    isDisposable: boolean;
    isRole: boolean;
  } | null>(null);

  // File Upload & Drag-and-Drop state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<{
    fileName: string;
    progress: number;
    statusText: string;
  } | null>(null);

  // Table Search, Filter & Expansion State
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [openExportMenuId, setOpenExportMenuId] = useState<string | null>(null);

  // Handle Drag & Drop Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processNewFile(file.name);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processNewFile(file.name);
    }
  };

  // Process file upload with simulated live progress bar
  const processNewFile = (fileName: string) => {
    setUploadingFile({
      fileName,
      progress: 5,
      statusText: 'Parsing file contents and removing duplicate records...'
    });

    const interval = setInterval(() => {
      setUploadingFile(prev => {
        if (!prev) return null;
        if (prev.progress >= 95) {
          clearInterval(interval);
          finishFileProcessing(fileName);
          return null;
        }

        let nextText = prev.statusText;
        if (prev.progress > 20 && prev.progress < 50) {
          nextText = 'Verifying DNS & MX records across domains...';
        } else if (prev.progress >= 50 && prev.progress < 80) {
          nextText = 'Pinging SMTP mail servers & detecting spam traps...';
        } else if (prev.progress >= 80) {
          nextText = 'Categorizing addresses into Deliverable, Catch-All & Disposable...';
        }

        return {
          ...prev,
          progress: prev.progress + 15,
          statusText: nextText
        };
      });
    }, 400);
  };

  const finishFileProcessing = (fileName: string) => {
    const total = 180;
    const valid = 162;
    const invalid = 10;
    const catchAll = 5;
    const disposable = 2;
    const role = 1;

    const newVerification: VerificationResult = {
      id: `ver-${Date.now()}`,
      fileName,
      emailsCount: total,
      validCount: valid,
      invalidCount: invalid,
      catchAllCount: catchAll,
      disposableCount: disposable,
      roleCount: role,
      status: 'Completed',
      createdAt: 'Just now',
      details: [
        { id: `d-${Date.now()}-1`, email: 'founder@startup.io', category: 'deliverable', reason: 'Valid SMTP & MX Record', score: 99, domain: 'startup.io' },
        { id: `d-${Date.now()}-2`, email: 'sales@bigcorp.com', category: 'role_based', reason: 'Role-based Address (sales@)', score: 65, domain: 'bigcorp.com' },
        { id: `d-${Date.now()}-3`, email: 'temp_user992@mailinator.com', category: 'disposable', reason: 'Disposable / Temporary Email', score: 0, domain: 'mailinator.com' },
        { id: `d-${Date.now()}-4`, email: 'invalid_user_x391@nonexistent123.com', category: 'undeliverable', reason: 'No MX Record Found', score: 0, domain: 'nonexistent123.com' },
        { id: `d-${Date.now()}-5`, email: 'hello@catchallorg.co', category: 'accept_all', reason: 'Server configured as Accept-All', score: 72, domain: 'catchallorg.co' }
      ]
    };

    setVerifications(prev => [newVerification, ...prev]);
    setExpandedRowId(newVerification.id);
  };

  // Trigger Re-test (Re-verify) for an existing list
  const handleRetest = (id: string, fileName: string) => {
    processNewFile(`[Re-verify] ${fileName}`);
  };

  // Delete verification item
  const handleDelete = (id: string) => {
    setVerifications(prev => prev.filter(v => v.id !== id));
    if (expandedRowId === id) setExpandedRowId(null);
  };

  // Run Animated Single Email Validation Step-by-Step
  const handleStartSingleCheck = () => {
    if (!singleEmail) return;

    setIsDrawerOpen(true);
    setSingleCheckProgress(10);
    setSingleResult(null);

    setSingleSteps([
      { id: 'syntax', name: 'Syntax Check', status: 'running', detail: 'Checking RFC 5322 compliance...' },
      { id: 'mx', name: 'Domain & MX Record', status: 'pending', detail: 'DNS lookup for mail exchanger' },
      { id: 'smtp', name: 'SMTP Server Ping', status: 'pending', detail: 'Direct server handshake' },
      { id: 'disposable', name: 'Disposable Mail Check', status: 'pending', detail: 'Database lookup for temporary domains' },
      { id: 'role', name: 'Role-Based Address', status: 'pending', detail: 'Detecting group/department emails' }
    ]);

    // Step 1: Syntax
    setTimeout(() => {
      const isBadSyntax = singleEmail.includes('@@') || !singleEmail.includes('@');
      setSingleSteps(prev => prev.map(s => s.id === 'syntax' ? { 
        ...s, 
        status: isBadSyntax ? 'failed' : 'passed',
        detail: isBadSyntax ? 'Invalid email format' : 'Passed RFC 5322 syntax rules' 
      } : s.id === 'mx' ? { ...s, status: 'running' } : s));
      setSingleCheckProgress(35);

      if (isBadSyntax) {
        setSingleResult({
          email: singleEmail,
          category: 'undeliverable',
          score: 0,
          reason: 'Syntax error in email address',
          mxHost: 'N/A',
          pingTime: '0ms',
          isDisposable: false,
          isRole: false
        });
        return;
      }

      // Step 2: MX
      setTimeout(() => {
        const domain = singleEmail.split('@')[1] || '';
        const isBadDomain = domain.includes('invalid') || domain.includes('fake');
        setSingleSteps(prev => prev.map(s => s.id === 'mx' ? { 
          ...s, 
          status: isBadDomain ? 'failed' : 'passed',
          detail: isBadDomain ? 'No active MX records found' : `Found MX: mx1.${domain}` 
        } : s.id === 'smtp' ? { ...s, status: 'running' } : s));
        setSingleCheckProgress(60);

        if (isBadDomain) {
          setSingleResult({
            email: singleEmail,
            category: 'undeliverable',
            score: 0,
            reason: 'Domain has no valid MX records',
            mxHost: 'Unreachable',
            pingTime: 'Timeout',
            isDisposable: false,
            isRole: false
          });
          return;
        }

        // Step 3: SMTP
        setTimeout(() => {
          setSingleSteps(prev => prev.map(s => s.id === 'smtp' ? { 
            ...s, 
            status: 'passed',
            detail: 'Server responded 250 OK (Mailbox exists)' 
          } : s.id === 'disposable' ? { ...s, status: 'running' } : s));
          setSingleCheckProgress(85);

          // Step 4 & 5: Disposable & Role
          setTimeout(() => {
            const isTemp = domain.includes('temp') || domain.includes('mailinator') || domain.includes('trash');
            const isRoleEmail = singleEmail.startsWith('admin@') || singleEmail.startsWith('sales@') || singleEmail.startsWith('info@');

            setSingleSteps(prev => prev.map(s => {
              if (s.id === 'disposable') {
                return { 
                  ...s, 
                  status: isTemp ? 'failed' : 'passed', 
                  detail: isTemp ? 'Detected disposable email domain' : 'Clean (Not disposable)' 
                };
              }
              if (s.id === 'role') {
                return { 
                  ...s, 
                  status: isRoleEmail ? 'failed' : 'passed', 
                  detail: isRoleEmail ? 'Role-based mailbox (e.g. admin@, info@)' : 'Personal individual mailbox' 
                };
              }
              return s;
            }));

            setSingleCheckProgress(100);

            let cat: 'deliverable' | 'undeliverable' | 'accept_all' | 'disposable' | 'role_based' = 'deliverable';
            let scr = 98;
            let rsn = 'Passed all verification checks (Safe to send)';

            if (isTemp) {
              cat = 'disposable';
              scr = 5;
              rsn = 'Disposable / Temporary email address detected';
            } else if (isRoleEmail) {
              cat = 'role_based';
              scr = 65;
              rsn = 'Role-based email address (may have lower response rate)';
            } else if (domain.includes('unknown') || domain.includes('catch')) {
              cat = 'accept_all';
              scr = 70;
              rsn = 'Mail server configured as Accept-All (Risk of bounce)';
            }

            setSingleResult({
              email: singleEmail,
              category: cat,
              score: scr,
              reason: rsn,
              mxHost: `mx1.${domain || 'googlemail.com'}`,
              pingTime: '124ms',
              isDisposable: isTemp,
              isRole: isRoleEmail
            });
          }, 500);

        }, 600);

      }, 500);

    }, 400);
  };

  // Simulated CSV Export logic
  const handleExport = (v: VerificationResult, exportType: 'valid' | 'invalid' | 'catchall' | 'full') => {
    setOpenExportMenuId(null);
    let countText = v.emailsCount;
    if (exportType === 'valid') countText = v.validCount;
    if (exportType === 'invalid') countText = v.invalidCount;
    if (exportType === 'catchall') countText = v.catchAllCount || 0;

    alert(`Downloading ${exportType.toUpperCase()} export CSV for ${v.fileName} (${countText} records)...`);
  };

  // Filtered Verifications List
  const filtered = verifications.filter(v => v.fileName.toLowerCase().includes(searchTerm.toLowerCase()));

  // Overall Aggregate Stats for Analytics Donut Chart
  const totalEmailsVerified = verifications.reduce((acc, curr) => acc + curr.emailsCount, 0);
  const totalValid = verifications.reduce((acc, curr) => acc + curr.validCount, 0);
  const totalInvalid = verifications.reduce((acc, curr) => acc + curr.invalidCount, 0);
  const totalCatchAll = verifications.reduce((acc, curr) => acc + (curr.catchAllCount || 0), 0);

  const validPercent = totalEmailsVerified > 0 ? Math.round((totalValid / totalEmailsVerified) * 100) : 92;
  const invalidPercent = totalEmailsVerified > 0 ? Math.round((totalInvalid / totalEmailsVerified) * 100) : 5;
  const catchAllPercent = 100 - validPercent - invalidPercent;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <MailCheck className="w-7 h-7 text-blue-600" />
            <span>Email Verifier</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time SMTP validation, disposable email detection, and spam trap protection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              const input = document.getElementById('bulk-file-input');
              if (input) input.click();
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Upload List (.CSV, .XLSX, .TXT)</span>
          </button>
          <input 
            id="bulk-file-input" 
            type="file" 
            accept=".csv,.xlsx,.txt" 
            onChange={handleFileInputChange} 
            className="hidden" 
          />
        </div>
      </div>

      {/* Live File Uploading Progress Banner (Requirement 4) */}
      {uploadingFile && (
        <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl space-y-3 animate-in slide-in-from-top-4">
          <div className="flex justify-between items-center text-xs font-bold">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
              <span>Processing File: {uploadingFile.fileName}</span>
            </div>
            <span className="text-blue-400 font-mono">{uploadingFile.progress}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${uploadingFile.progress}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{uploadingFile.statusText}</span>
          </p>
        </div>
      )}

      {/* TOP GRID: Drag & Drop Zone + Visual Analytics Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: Dedicated Drag & Drop Zone + Single Email Check (2 Cols - Requirement 1) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 flex flex-col justify-between">
          
          {/* Drag & Drop Box */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                <span>Bulk File Upload & Drag-and-Drop</span>
              </h3>
              <span className="text-[11px] font-semibold text-slate-400">Supports .CSV, .XLSX, .TXT</span>
            </div>

            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => {
                const input = document.getElementById('bulk-file-input');
                if (input) input.click();
              }}
              className={`border-2 border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-blue-600 bg-blue-50 shadow-md scale-[1.01]' 
                  : 'border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-slate-800">
                Drag and drop your contact list here, or <span className="text-blue-600 hover:underline">Browse files</span>
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Verify thousands of leads at once. Automatic duplicate removal and MX check.
              </p>
            </div>
          </div>

          {/* Single Email Quick Check Bar (Requirement 7 trigger) */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <label className="block text-xs font-bold text-slate-700">Single Email Real-time Verification</label>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email e.g. alex@company.com"
                value={singleEmail}
                onChange={e => setSingleEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleStartSingleCheck()}
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleStartSingleCheck}
                disabled={!singleEmail}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>Go</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* CARD 2: Visual Analytics Donut Chart & Progress Ring (Requirement 2) */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-400" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300">Deliverability Visual Analytics</h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold border border-blue-500/30">
              Pro Engine
            </span>
          </div>

          {/* Donut Chart Visual SVG */}
          <div className="flex items-center justify-between gap-4 my-2">
            
            {/* SVG Donut */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background Track */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1e293b" strokeWidth="3.8" />
                {/* Valid Segment (Green) */}
                <circle 
                  cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3.8"
                  strokeDasharray={`${validPercent} ${100 - validPercent}`}
                  strokeDashoffset="0"
                />
                {/* Catch-All Segment (Amber) */}
                <circle 
                  cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3.8"
                  strokeDasharray={`${catchAllPercent} ${100 - catchAllPercent}`}
                  strokeDashoffset={`-${validPercent}`}
                />
                {/* Invalid Segment (Red) */}
                <circle 
                  cx="18" cy="18" r="15.915" fill="none" stroke="#f43f5e" strokeWidth="3.8"
                  strokeDasharray={`${invalidPercent} ${100 - invalidPercent}`}
                  strokeDashoffset={`-${validPercent + catchAllPercent}`}
                />
              </svg>

              <div className="absolute text-center">
                <span className="text-xl font-black text-white block leading-none">{validPercent}%</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Deliverable</span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="space-y-2 text-xs flex-1">
              <div className="flex justify-between items-center bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-700/50">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>Valid</span>
                </span>
                <span className="font-bold text-emerald-400 font-mono text-xs">{totalValid}</span>
              </div>

              <div className="flex justify-between items-center bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-700/50">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  <span>Catch-All</span>
                </span>
                <span className="font-bold text-amber-400 font-mono text-xs">{totalCatchAll}</span>
              </div>

              <div className="flex justify-between items-center bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-700/50">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                  <span>Invalid</span>
                </span>
                <span className="font-bold text-rose-400 font-mono text-xs">{totalInvalid}</span>
              </div>
            </div>

          </div>

          {/* Usage Meter */}
          <div className="pt-2 border-t border-slate-800 text-[11px]">
            <div className="flex justify-between text-slate-400 font-medium mb-1">
              <span>Account Verification Quota</span>
              <span className="text-white font-mono font-bold">{totalEmailsVerified} / 10,000</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (totalEmailsVerified / 10000) * 100)}%` }} />
            </div>
          </div>

        </div>

      </div>

      {/* BULK RESULTS TABLE CARD (Requirements 3, 5, 6, 8) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-50/60">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Bulk Validation History</h3>
            <p className="text-[11px] text-slate-500">Click any file row to view detailed email categorization report.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search history files..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none shadow-2xs"
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px]">
                <tr>
                  <th className="p-3.5 w-8"></th>
                  <th className="p-3.5 text-slate-800">File Name</th>
                  <th className="p-3.5">Total Emails</th>
                  <th className="p-3.5">Valid (🟢)</th>
                  <th className="p-3.5">Catch-All (🟡)</th>
                  <th className="p-3.5">Invalid (🔴)</th>
                  <th className="p-3.5">Created</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(v => {
                  const isExpanded = expandedRowId === v.id;
                  const cAll = v.catchAllCount || 0;

                  return (
                    <React.Fragment key={v.id}>
                      <tr 
                        onClick={() => setExpandedRowId(isExpanded ? null : v.id)}
                        className={`cursor-pointer transition-colors ${isExpanded ? 'bg-blue-50/30' : 'hover:bg-slate-50'}`}
                      >
                        <td className="p-3.5 text-center text-slate-400">
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4" />}
                        </td>

                        <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span>{v.fileName}</span>
                        </td>

                        <td className="p-3.5 font-mono font-semibold text-slate-700">{v.emailsCount}</td>

                        {/* Pill Badges - Requirement 3 */}
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>{v.validCount}</span>
                          </span>
                        </td>

                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200 text-[11px]">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            <span>{cAll}</span>
                          </span>
                        </td>

                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200 text-[11px]">
                            <X className="w-3 h-3 text-rose-600" />
                            <span>{v.invalidCount}</span>
                          </span>
                        </td>

                        <td className="p-3.5 text-slate-400 font-medium">{v.createdAt}</td>

                        {/* Actions Column - Requirement 6 */}
                        <td className="p-3.5 text-right relative" onClick={e => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            
                            {/* Export Control Menu */}
                            <div className="relative">
                              <button 
                                onClick={() => setOpenExportMenuId(openExportMenuId === v.id ? null : v.id)}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
                              >
                                <Download className="w-3.5 h-3.5 text-blue-600" />
                                <span>Export</span>
                                <ChevronDown className="w-3 h-3 text-slate-400" />
                              </button>

                              {openExportMenuId === v.id && (
                                <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1.5 animate-in fade-in text-left">
                                  <button 
                                    onClick={() => handleExport(v, 'valid')}
                                    className="w-full px-3 py-1.5 text-xs text-emerald-700 font-semibold hover:bg-emerald-50 flex items-center gap-2"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Download Valid Only ({v.validCount})</span>
                                  </button>
                                  <button 
                                    onClick={() => handleExport(v, 'catchall')}
                                    className="w-full px-3 py-1.5 text-xs text-amber-700 font-semibold hover:bg-amber-50 flex items-center gap-2"
                                  >
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                    <span>Download Catch-All ({cAll})</span>
                                  </button>
                                  <button 
                                    onClick={() => handleExport(v, 'invalid')}
                                    className="w-full px-3 py-1.5 text-xs text-rose-700 font-semibold hover:bg-rose-50 flex items-center gap-2"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                    <span>Download Invalid Only ({v.invalidCount})</span>
                                  </button>
                                  <div className="my-1 border-t border-slate-100" />
                                  <button 
                                    onClick={() => handleExport(v, 'full')}
                                    className="w-full px-3 py-1.5 text-xs text-slate-700 font-bold hover:bg-slate-100 flex items-center gap-2"
                                  >
                                    <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                                    <span>Full Report ({v.emailsCount})</span>
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Re-test button */}
                            <button 
                              onClick={() => handleRetest(v.id, v.fileName)}
                              title="Re-verify List"
                              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete button */}
                            <button 
                              onClick={() => handleDelete(v.id)}
                              title="Delete Item"
                              className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                          </div>
                        </td>
                      </tr>

                      {/* ROW EXPANSION: Detailed Email Breakdown (Requirement 5 & 8) */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} className="p-0 bg-slate-50/80 border-b border-slate-200">
                            <div className="p-5 space-y-4 animate-in fade-in">
                              
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div className="flex items-center gap-2">
                                  <Info className="w-4 h-4 text-blue-600" />
                                  <h4 className="font-bold text-xs text-slate-900">Detailed Categorization Breakdown: {v.fileName}</h4>
                                </div>

                                {/* Category Filter Tabs */}
                                <div className="flex flex-wrap gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                                  {[
                                    { id: 'all', label: 'All' },
                                    { id: 'deliverable', label: 'Deliverable (Valid)' },
                                    { id: 'accept_all', label: 'Accept-All' },
                                    { id: 'undeliverable', label: 'Undeliverable' },
                                    { id: 'disposable', label: 'Disposable' },
                                    { id: 'role_based', label: 'Role-based' }
                                  ].map(f => (
                                    <button 
                                      key={f.id}
                                      onClick={() => setActiveCategoryFilter(f.id)}
                                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                                        activeCategoryFilter === f.id 
                                          ? 'bg-slate-900 text-white shadow-2xs' 
                                          : 'text-slate-600 hover:bg-slate-100'
                                      }`}
                                    >
                                      {f.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Detailed Emails Sub-Table */}
                              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                                {v.details && v.details.length > 0 ? (
                                  <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-100 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px]">
                                      <tr>
                                        <th className="p-2.5">Email Address</th>
                                        <th className="p-2.5">Category</th>
                                        <th className="p-2.5">Reason & Diagnostic</th>
                                        <th className="p-2.5 text-right">Quality Score</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                      {v.details
                                        .filter(d => activeCategoryFilter === 'all' || d.category === activeCategoryFilter)
                                        .map(d => (
                                          <tr key={d.id} className="hover:bg-slate-50/60">
                                            <td className="p-2.5 font-mono font-semibold text-slate-900">{d.email}</td>
                                            
                                            <td className="p-2.5">
                                              {d.category === 'deliverable' && (
                                                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                                                  🟢 Deliverable
                                                </span>
                                              )}
                                              {d.category === 'undeliverable' && (
                                                <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                                                  🔴 Undeliverable
                                                </span>
                                              )}
                                              {d.category === 'accept_all' && (
                                                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                                                  🟡 Accept-All
                                                </span>
                                              )}
                                              {d.category === 'disposable' && (
                                                <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">
                                                  🟣 Disposable
                                                </span>
                                              )}
                                              {d.category === 'role_based' && (
                                                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                                                  🔵 Role-based
                                                </span>
                                              )}
                                            </td>

                                            <td className="p-2.5 text-slate-600 font-medium">{d.reason}</td>

                                            <td className="p-2.5 text-right">
                                              <span className={`font-mono font-bold ${
                                                d.score >= 80 ? 'text-emerald-600' : d.score >= 50 ? 'text-amber-600' : 'text-rose-600'
                                              }`}>
                                                {d.score}%
                                              </span>
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                ) : (
                                  <div className="p-6 text-center text-slate-400 text-xs font-semibold">
                                    No records matching category "{activeCategoryFilter}".
                                  </div>
                                )}
                              </div>

                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <MailCheck className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-xs font-semibold text-slate-600">No bulk verification tasks yet.</p>
            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
              Drag and drop your contact CSV above to run complete email deliverability analysis.
            </p>
          </div>
        )}

      </div>

      {/* SINGLE EMAIL CHECK SLIDE-OVER DRAWER (Requirement 7) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">Live Validation Drawer</h3>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Target Email Box */}
              <div className="bg-slate-900 text-white p-4 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Target Email</span>
                <p className="font-mono text-sm font-bold text-blue-300 truncate">{singleEmail}</p>
              </div>

              {/* Progress Bar for Step-by-Step Diagnostic */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Diagnostic Steps</span>
                  <span className="font-mono text-blue-600">{singleCheckProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-300" 
                    style={{ width: `${singleCheckProgress}%` }}
                  />
                </div>
              </div>

              {/* Step-by-Step Checks List */}
              <div className="space-y-3">
                {singleSteps.map((stepItem, idx) => (
                  <div key={stepItem.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-slate-900">{idx + 1}. {stepItem.name}</span>
                      
                      {stepItem.status === 'passed' && (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" /> Passed
                        </span>
                      )}
                      {stepItem.status === 'failed' && (
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold flex items-center gap-1">
                          <X className="w-3 h-3 text-rose-600" /> Flagged
                        </span>
                      )}
                      {stepItem.status === 'running' && (
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center gap-1 animate-pulse">
                          <RefreshCw className="w-3 h-3 text-blue-600 animate-spin" /> Checking
                        </span>
                      )}
                      {stepItem.status === 'pending' && (
                        <span className="text-[10px] text-slate-400 font-semibold">Pending</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">{stepItem.detail}</p>
                  </div>
                ))}
              </div>

              {/* Final Inspection Card */}
              {singleResult && (
                <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl space-y-3 animate-in fade-in">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700">Overall Deliverability</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-black ${
                      singleResult.category === 'deliverable' 
                        ? 'bg-emerald-600 text-white' 
                        : singleResult.category === 'undeliverable' 
                          ? 'bg-rose-600 text-white' 
                          : 'bg-amber-500 text-white'
                    }`}>
                      {singleResult.category.toUpperCase()} ({singleResult.score}%)
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium">{singleResult.reason}</p>

                  <div className="pt-2 border-t border-blue-200/60 grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-mono">
                    <div>
                      <span className="text-slate-400 block text-[9px]">MX HOST</span>
                      <span className="font-bold text-slate-800">{singleResult.mxHost}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">PING LATENCY</span>
                      <span className="font-bold text-slate-800">{singleResult.pingTime}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Close Validation Drawer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
