import React, { useState } from 'react';
import { 
  User, 
  CreditCard, 
  Bell, 
  Gift, 
  Key, 
  Shield, 
  Users, 
  Settings as SettingsIcon, 
  Check, 
  Copy, 
  Download, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Zap, 
  Globe, 
  Smartphone, 
  Laptop, 
  AlertTriangle, 
  Lock, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  DollarSign, 
  Share2, 
  Send,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { AccountSettingsSubTab, MainTab } from '../../types';

interface AccountSettingsViewProps {
  initialSubTab?: AccountSettingsSubTab;
  onNavigate?: (tab: MainTab) => void;
}

export const AccountSettingsView: React.FC<AccountSettingsViewProps> = ({
  initialSubTab = 'profile',
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<AccountSettingsSubTab>(initialSubTab);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // -------------------------------------------------------------
  // TAB 1: YOUR ACCOUNT (PROFILE, SECURITY, TEAM, PREFERENCES)
  // -------------------------------------------------------------
  const [profileSubTab, setProfileSubTab] = useState<'info' | 'security' | 'team' | 'preferences'>('info');
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Rivera');
  const [email, setEmail] = useState('test@email.com');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [timezone, setTimezone] = useState('(UTC+06:00) Dhaka / Asia');
  const [language, setLanguage] = useState('English (US)');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Connected OAuth Accounts
  const [googleConnected, setGoogleConnected] = useState(true);
  const [linkedInConnected, setLinkedInConnected] = useState(true);

  // Active Sessions
  const [sessions, setSessions] = useState([
    { id: 's-1', device: 'Chrome on Windows', location: 'Jashore, BD', current: true, lastActive: 'Active Now' },
    { id: 's-2', device: 'Firefox on macOS', location: 'Dhaka, BD', current: false, lastActive: '2 days ago' },
    { id: 's-3', device: 'Mobile App on iOS', location: 'Austin, TX, USA', current: false, lastActive: '4 hours ago' }
  ]);

  // Team Seats State
  const [teamMembers, setTeamMembers] = useState([
    { id: 'm-1', name: 'Alex Rivera', email: 'test@email.com', role: 'Owner', status: 'Active' },
    { id: 'm-2', name: 'Sarah Jenkins', email: 's.jenkins@company.com', role: 'Admin', status: 'Active' },
    { id: 'm-3', name: 'David Miller', email: 'd.miller@company.com', role: 'Member', status: 'Active' }
  ]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Member'>('Member');

  // -------------------------------------------------------------
  // TAB 2: BILLING & SUBSCRIPTION
  // -------------------------------------------------------------
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [activePlan, setActivePlan] = useState<'Starter' | 'Pro' | 'Agency'>('Pro');
  const [invoices] = useState([
    { id: '#INV-2026-007', date: 'Jul 28, 2026', amount: '$99.00', plan: 'Pro Plan', status: 'Paid' },
    { id: '#INV-2026-006', date: 'Jun 28, 2026', amount: '$99.00', plan: 'Pro Plan', status: 'Paid' },
    { id: '#INV-2026-005', date: 'May 28, 2026', amount: '$99.00', plan: 'Pro Plan', status: 'Paid' },
    { id: '#INV-2026-004', date: 'Apr 28, 2026', amount: '$99.00', plan: 'Pro Plan', status: 'Paid' }
  ]);

  // -------------------------------------------------------------
  // TAB 3: ALERTS & REPORTS
  // -------------------------------------------------------------
  const [alertTriggers, setAlertTriggers] = useState({
    lowCredit: true,
    highBounce: true,
    bulkTask: true,
    security: true
  });
  const [notifChannels, setNotifChannels] = useState({
    email: true,
    webhook: true,
    slack: false
  });
  const [scheduledReports, setScheduledReports] = useState([
    { id: 'rep-1', type: 'Deliverability Audit', frequency: 'Weekly (Mondays)', format: 'PDF', recipients: 'test@email.com', status: 'Active' },
    { id: 'rep-2', type: 'Monthly Lead Summary', frequency: 'Monthly (1st)', format: 'CSV', recipients: 'team@company.com', status: 'Active' }
  ]);
  const [isAddReportModalOpen, setIsAddReportModalOpen] = useState(false);
  const [newReportType, setNewReportType] = useState('Campaign Performance Digest');
  const [newReportFreq, setNewReportFreq] = useState('Weekly (Fridays)');
  const [newReportFormat, setNewReportFormat] = useState('PDF');
  const [newReportEmail, setNewReportEmail] = useState('test@email.com');

  // -------------------------------------------------------------
  // TAB 4: REFERRAL PROGRAM
  // -------------------------------------------------------------
  const referralLink = 'https://app.lendgen.com/ref/test-email-2026';
  const [referredUsers] = useState([
    { id: 'u-1', code: 'User_8f92a', date: 'Jul 20, 2026', plan: 'Pro ($99/mo)', commission: '$29.70/mo', status: 'Paid' },
    { id: 'u-2', code: 'User_3a11b', date: 'Jul 15, 2026', plan: 'Agency ($249/mo)', commission: '$74.70/mo', status: 'Pending' },
    { id: 'u-3', code: 'User_9c21x', date: 'Jun 28, 2026', plan: 'Starter ($49/mo)', commission: '$14.70/mo', status: 'Paid' },
    { id: 'u-4', code: 'User_7b44k', date: 'Jun 10, 2026', plan: 'Pro ($99/mo)', commission: '$29.70/mo', status: 'Paid' }
  ]);

  // -------------------------------------------------------------
  // TAB 5: API KEY
  // -------------------------------------------------------------
  const [apiKeys, setApiKeys] = useState([
    { id: 'k-1', name: 'n8n Production', token: 'lg_live_98f4a21b8c9d0e1f2a3b4c5d6e', masked: 'lg_live_98f4••••••••••••', created: 'Jul 01, 2026', lastUsed: '2 mins ago', permission: 'Read/Write' },
    { id: 'k-2', name: 'Web Scraping Extension', token: 'lg_live_12a3b4c5d6e7f8a9b0c1d2e3f4', masked: 'lg_live_12a3••••••••••••', created: 'May 14, 2026', lastUsed: 'Jul 27, 2026', permission: 'Read Only' }
  ]);
  const [isGenerateKeyModalOpen, setIsGenerateKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermission, setNewKeyPermission] = useState<'Read Only' | 'Read/Write' | 'Admin'>('Read/Write');

  const [webhookUrl, setWebhookUrl] = useState('https://n8n.yourdomain.com/webhook/lead-sync');
  const [webhookEvents, setWebhookEvents] = useState({
    leadScraped: true,
    emailVerified: true,
    deliverabilityComplete: true,
    campaignReply: false
  });
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);

  // Handlers
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatarUrl(url);
      showToast('Profile photo updated successfully!');
    }
  };

  const handleRevokeSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
    showToast('Session revoked successfully.');
  };

  const handleInviteMember = () => {
    if (!inviteEmail.trim()) return;
    setTeamMembers([
      ...teamMembers,
      {
        id: `m-${Date.now()}`,
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        status: 'Invited'
      }
    ]);
    setIsInviteModalOpen(false);
    setInviteEmail('');
    showToast(`Invitation sent to ${inviteEmail}!`);
  };

  const handleCreateReport = () => {
    setScheduledReports([
      ...scheduledReports,
      {
        id: `rep-${Date.now()}`,
        type: newReportType,
        frequency: newReportFreq,
        format: newReportFormat,
        recipients: newReportEmail,
        status: 'Active'
      }
    ]);
    setIsAddReportModalOpen(false);
    showToast('Scheduled report created!');
  };

  const handleGenerateApiKey = () => {
    if (!newKeyName.trim()) return;
    const rand = Math.random().toString(36).substring(2, 12);
    const newKey = {
      id: `k-${Date.now()}`,
      name: newKeyName,
      token: `lg_live_${rand}001122334455`,
      masked: `lg_live_${rand.substring(0, 4)}••••••••••••`,
      created: 'Just now',
      lastUsed: 'Never',
      permission: newKeyPermission
    };
    setApiKeys([...apiKeys, newKey]);
    setIsGenerateKeyModalOpen(false);
    setNewKeyName('');
    showToast(`Generated API Key: "${newKeyName}"`);
  };

  const handleTestWebhook = () => {
    setIsTestingWebhook(true);
    setTimeout(() => {
      setIsTestingWebhook(false);
      showToast('Webhook payload delivered successfully! (HTTP 200 OK)');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* TOAST NOTIFICATION POPUP */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER & MAIN SUB-NAV TABS */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
              <span>Account Settings</span>
              <span className="text-slate-300">&gt;</span>
              <span className="text-blue-600 font-extrabold capitalize">{activeTab.replace('-', ' ')}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span>Account Settings</span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Status: Active
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                  💳 Pro Tier
                </span>
              </div>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your personal profile, team seats, billing plans, alerts, referrals, and API developer integrations.
            </p>
          </div>
        </div>

        {/* 5 MAIN TOP TABS */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-1">
          {[
            { id: 'profile', label: '👤 Your Account', icon: User },
            { id: 'billing', label: '💳 Billing & Subscription', icon: CreditCard },
            { id: 'alerts', label: '🔔 Alerts & Reports', icon: Bell },
            { id: 'referral', label: '🎁 Referral Program', icon: Gift },
            { id: 'api-key', label: '🔑 API Key', icon: Key }
          ].map((t) => {
            const Icon = t.icon;
            const isCurrent = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as AccountSettingsSubTab)}
                className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-slate-500'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* TAB 1: YOUR ACCOUNT */}
      {/* ========================================================================= */}
      {activeTab === 'profile' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Sub-Navigation for Profile Sub-tabs */}
          <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs text-xs font-bold">
            {[
              { id: 'info', label: '👤 Profile & Info' },
              { id: 'security', label: '🔒 Security & 2FA' },
              { id: 'team', label: '👥 Team & Seats' },
              { id: 'preferences', label: '⚙️ Preferences' }
            ].map(st => (
              <button
                key={st.id}
                onClick={() => setProfileSubTab(st.id as any)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  profileSubTab === st.id
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {profileSubTab === 'info' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* LEFT PANEL: PROFILE & GENERAL INFO */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Profile Details</span>
                </h3>

                {/* Avatar Uploader */}
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-black text-xl flex items-center justify-center overflow-hidden shrink-0 border-2 border-white shadow-md">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{firstName[0]}{lastName[0]}</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-800">Profile Photo</label>
                    <p className="text-[11px] text-slate-500">JPG, PNG or GIF. Max size 2MB.</p>
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer transition-all shadow-2xs">
                      <span>🖼️ Change Avatar</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    </label>
                  </div>
                </div>

                {/* General Information Form */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-bold text-slate-700">Email Address</label>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                        🟢 Verified
                      </span>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Phone Number (SMS Alerts)</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex gap-3">
                  <button
                    onClick={() => showToast('Profile details saved successfully!')}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-blue-500/20"
                  >
                    💾 Save Changes
                  </button>
                </div>

              </div>

              {/* RIGHT PANEL: PREFERENCES, OAUTH & ACTIVE SESSIONS */}
              <div className="space-y-6">
                
                {/* Localization & Timezone */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>Timezone & Localization</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Timezone</label>
                      <select
                        value={timezone}
                        onChange={e => setTimezone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                      >
                        <option value="(UTC+06:00) Dhaka / Asia">(UTC+06:00) Dhaka / Asia</option>
                        <option value="(UTC-05:00) Eastern Time (US)">(UTC-05:00) Eastern Time (US)</option>
                        <option value="(UTC+00:00) London / GMT">(UTC+00:00) London / GMT</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Language</label>
                      <select
                        value={language}
                        onChange={e => setLanguage(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                      >
                        <option value="English (US)">English (US)</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Connected OAuth Accounts */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Connected OAuth Accounts</span>
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">🌐</span>
                        <div>
                          <div className="font-extrabold text-slate-900 text-xs">Google Account</div>
                          <div className="text-[11px] text-slate-500 font-semibold">{email}</div>
                        </div>
                      </div>
                      {googleConnected ? (
                        <button
                          onClick={() => {
                            setGoogleConnected(false);
                            showToast('Disconnected Google Account.');
                          }}
                          className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold"
                        >
                          Disconnect
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setGoogleConnected(true);
                            showToast('Connected Google Account!');
                          }}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold"
                        >
                          Connect
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">💼</span>
                        <div>
                          <div className="font-extrabold text-slate-900 text-xs">LinkedIn Sales Navigator</div>
                          <div className="text-[11px] text-emerald-600 font-bold">Connected & Synced</div>
                        </div>
                      </div>
                      <button
                        onClick={() => showToast('Re-synced LinkedIn cookie session!')}
                        className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold"
                      >
                        Re-sync
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Login Sessions */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-indigo-600" />
                    <span>Active Login Sessions</span>
                  </h3>

                  <div className="space-y-2">
                    {sessions.map(s => (
                      <div key={s.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                        <div>
                          <div className="font-extrabold text-slate-900 flex items-center gap-2">
                            <span>{s.device}</span>
                            {s.current && (
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-semibold">{s.location} • {s.lastActive}</div>
                        </div>

                        {!s.current && (
                          <button
                            onClick={() => handleRevokeSession(s.id)}
                            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg border border-rose-200 text-[11px]"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                    <button
                      onClick={() => showToast('All account changes saved.')}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs"
                    >
                      💾 Save Changes
                    </button>

                    <button
                      onClick={() => showToast('Initiating account deletion warning modal...')}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl border border-rose-200 text-xs"
                    >
                      🔴 Delete Account
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* SECURITY & 2FA SUB-TAB */}
          {profileSubTab === 'security' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 max-w-2xl">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Security & Two-Factor Authentication</span>
              </h3>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800" />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-xs text-blue-950">Two-Factor Authentication (2FA)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Enabled</span>
                  </div>
                  <p className="text-xs text-blue-800">
                    Use Google Authenticator or Authy app for secure login verification codes.
                  </p>
                </div>

                <button
                  onClick={() => showToast('Password updated successfully!')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs"
                >
                  🔒 Update Security Settings
                </button>
              </div>
            </div>
          )}

          {/* TEAM & SEATS SUB-TAB */}
          {profileSubTab === 'team' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Team Members & Seat Management</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">3 / 5 Seats Used in Pro Plan.</p>
                </div>

                <button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Invite Team Member</span>
                </button>
              </div>

              {/* Members Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase">
                    <tr>
                      <th className="p-3.5">Name</th>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Role</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {teamMembers.map(m => (
                      <tr key={m.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-extrabold text-slate-900">{m.name}</td>
                        <td className="p-3.5 text-slate-600 font-mono">{m.email}</td>
                        <td className="p-3.5">
                          <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold">
                            {m.role}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                            🟢 {m.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          {m.role !== 'Owner' && (
                            <button
                              onClick={() => {
                                setTeamMembers(teamMembers.filter(item => item.id !== m.id));
                                showToast(`Removed ${m.name} from team.`);
                              }}
                              className="text-rose-600 hover:text-rose-800 font-bold"
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* PREFERENCES SUB-TAB */}
          {profileSubTab === 'preferences' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 max-w-2xl">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <SettingsIcon className="w-4 h-4 text-blue-600" />
                <span>Account Preferences</span>
              </h3>

              <div className="space-y-3 text-xs font-semibold text-slate-700">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span>Receive weekly marketing digest and cold email strategy tips</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span>Show desktop notifications for new campaign replies</span>
                </label>
              </div>

              <button
                onClick={() => showToast('Saved account preferences!')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs mt-2"
              >
                💾 Save Preferences
              </button>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: BILLING & SUBSCRIPTION */}
      {/* ========================================================================= */}
      {activeTab === 'billing' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* CURRENT PLAN OVERVIEW CARD */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-800 pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                  <Sparkles className="w-4 h-4 fill-amber-400" />
                  <span>CURRENT ACTIVE SUBSCRIPTION</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
                  <span>⚡ Pro Plan ($99/mo)</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold px-2.5 py-0.5 rounded-full">
                    Auto-Renew: ON
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Renews on Aug 28, 2026 • Billed to Visa ending in •••• 4242
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => showToast('Upgrading to Agency tier...')}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>🚀 Upgrade Plan</span>
                </button>

                <button
                  onClick={() => showToast('Subscription cancellation requested.')}
                  className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-bold rounded-xl text-xs border border-slate-700"
                >
                  🛑 Cancel
                </button>
              </div>
            </div>

            {/* Usage Metrics Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">Lead Searches</span>
                  <span className="font-mono font-extrabold text-blue-400">8,450 / 10,000</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '84.5%' }} />
                </div>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">Email Verifications</span>
                  <span className="font-mono font-extrabold text-emerald-400">1,200 / 10,000</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '12%' }} />
                </div>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">Team Seats</span>
                  <span className="font-mono font-extrabold text-purple-400">3 / 5 Seats</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

            </div>

          </div>

          {/* AVAILABLE PLAN TIERS (GRID) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">Available Plan Tiers</h3>
                <p className="text-xs text-slate-500">Choose the right tier to scale your cold email prospecting.</p>
              </div>

              {/* Monthly/Annual Toggle */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3 py-1 rounded-lg ${billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-3 py-1 rounded-lg ${billingCycle === 'annual' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                >
                  Annual (Save 20%)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* STARTER */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <h4 className="font-black text-lg text-slate-900">Starter</h4>
                  <div className="text-2xl font-black text-slate-900">
                    {billingCycle === 'monthly' ? '$49' : '$39'}<span className="text-xs text-slate-500 font-bold">/mo</span>
                  </div>
                  <ul className="space-y-2 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-100">
                    <li>• 2,500 Search Credits / mo</li>
                    <li>• 2,500 Email Verifications</li>
                    <li>• 1 Team Member Seat</li>
                    <li>• Standard Support</li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setActivePlan('Starter');
                    showToast('Switched to Starter tier.');
                  }}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black rounded-xl text-xs"
                >
                  Switch to Starter
                </button>
              </div>

              {/* PRO (ACTIVE) */}
              <div className="p-6 rounded-2xl border-2 border-blue-600 bg-blue-50/30 space-y-4 relative shadow-lg shadow-blue-500/10 flex flex-col justify-between">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full">
                  ⭐ Current Active Plan
                </span>
                
                <div className="space-y-3">
                  <h4 className="font-black text-lg text-slate-900">Pro</h4>
                  <div className="text-2xl font-black text-slate-900">
                    {billingCycle === 'monthly' ? '$99' : '$79'}<span className="text-xs text-slate-500 font-bold">/mo</span>
                  </div>
                  <ul className="space-y-2 text-xs font-semibold text-slate-700 pt-2 border-t border-blue-200/60">
                    <li>• 10,000 Search Credits / mo</li>
                    <li>• 10,000 Email Verifications</li>
                    <li>• 5 Team Member Seats</li>
                    <li>• Priority Campaign Support</li>
                    <li>• Tech Stack Finder</li>
                  </ul>
                </div>

                <button
                  disabled
                  className="w-full py-2.5 bg-blue-600 text-white font-black rounded-xl text-xs cursor-default shadow-md shadow-blue-500/20"
                >
                  Current Active Plan ✓
                </button>
              </div>

              {/* AGENCY */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <h4 className="font-black text-lg text-slate-900">Agency</h4>
                  <div className="text-2xl font-black text-slate-900">
                    {billingCycle === 'monthly' ? '$249' : '$199'}<span className="text-xs text-slate-500 font-bold">/mo</span>
                  </div>
                  <ul className="space-y-2 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-100">
                    <li>• 50,000 Search Credits / mo</li>
                    <li>• Unlimited Email Verifications</li>
                    <li>• Unlimited Team Seats</li>
                    <li>• Dedicated Account Manager</li>
                    <li>• API & Webhook Webhooks</li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setActivePlan('Agency');
                    showToast('Upgraded to Agency tier!');
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs shadow-md shadow-blue-500/20"
                >
                  ⚡ Upgrade to Agency
                </button>
              </div>

            </div>

          </div>

          {/* INVOICE HISTORY & PAYMENT METHODS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">Invoice History & Payment Methods</h3>
                <p className="text-xs text-slate-500">Payment Method: 💳 Visa ending in 4242 (Exp 09/28)</p>
              </div>

              <button
                onClick={() => showToast('Opening payment method dialog...')}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Payment Method</span>
              </button>
            </div>

            {/* Invoice Log Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase">
                  <tr>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Invoice ID</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Plan</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">{inv.date}</td>
                      <td className="p-3.5 font-mono text-slate-600">{inv.id}</td>
                      <td className="p-3.5 font-extrabold text-slate-900">{inv.amount}</td>
                      <td className="p-3.5">{inv.plan}</td>
                      <td className="p-3.5">
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                          🟢 {inv.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => showToast(`Downloaded invoice ${inv.id}`)}
                          className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg font-bold text-xs flex items-center gap-1 ml-auto"
                        >
                          <Download className="w-3.5 h-3.5 text-blue-600" />
                          <span>Download PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ALERTS & REPORTS */}
      {/* ========================================================================= */}
      {activeTab === 'alerts' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* REAL-TIME ALERT TRIGGERS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <span>Real-Time System Alert Triggers</span>
            </h3>

            <div className="space-y-3">
              
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <div className="font-extrabold text-slate-900">🔔 Low Credit Warning</div>
                  <div className="text-[11px] text-slate-500">Notify when search credits drop below 500</div>
                </div>
                <input
                  type="checkbox"
                  checked={alertTriggers.lowCredit}
                  onChange={e => setAlertTriggers({ ...alertTriggers, lowCredit: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <div className="font-extrabold text-slate-900">🚫 High Bounce Alert</div>
                  <div className="text-[11px] text-slate-500">Alert if list email bounce rate exceeds 5% threshold</div>
                </div>
                <input
                  type="checkbox"
                  checked={alertTriggers.highBounce}
                  onChange={e => setAlertTriggers({ ...alertTriggers, highBounce: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <div className="font-extrabold text-slate-900">📦 Bulk Task Complete</div>
                  <div className="text-[11px] text-slate-500">Send email notification when large CSV scraping finishes</div>
                </div>
                <input
                  type="checkbox"
                  checked={alertTriggers.bulkTask}
                  onChange={e => setAlertTriggers({ ...alertTriggers, bulkTask: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <div className="font-extrabold text-slate-900">🛡️ Security Alerts</div>
                  <div className="text-[11px] text-slate-500">Alert on new IP logins or API key creation</div>
                </div>
                <input
                  type="checkbox"
                  checked={alertTriggers.security}
                  onChange={e => setAlertTriggers({ ...alertTriggers, security: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300"
                />
              </div>

            </div>
          </div>

          {/* NOTIFICATION CHANNELS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Notification Channels
            </h3>

            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-800">
              <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifChannels.email}
                  onChange={e => setNotifChannels({ ...notifChannels, email: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300"
                />
                <span>Primary Email ({email})</span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifChannels.webhook}
                  onChange={e => setNotifChannels({ ...notifChannels, webhook: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300"
                />
                <span>Webhook Push</span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifChannels.slack}
                  onChange={e => setNotifChannels({ ...notifChannels, slack: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300"
                />
                <span>Slack Channel Integration</span>
              </label>
            </div>
          </div>

          {/* SCHEDULED AUTOMATED REPORTS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">Scheduled Automated Reports</h3>
                <p className="text-xs text-slate-500">Receive automated summary reports straight to your inbox.</p>
              </div>

              <button
                onClick={() => setIsAddReportModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create Scheduled Report</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase">
                  <tr>
                    <th className="p-3.5">Report Type</th>
                    <th className="p-3.5">Frequency</th>
                    <th className="p-3.5">Format</th>
                    <th className="p-3.5">Recipients</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {scheduledReports.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-extrabold text-slate-900">{r.type}</td>
                      <td className="p-3.5">{r.frequency}</td>
                      <td className="p-3.5 font-bold font-mono text-indigo-600">{r.format}</td>
                      <td className="p-3.5 font-mono text-slate-600">{r.recipients}</td>
                      <td className="p-3.5">
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                          🟢 {r.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            setScheduledReports(scheduledReports.filter(item => item.id !== r.id));
                            showToast('Deleted scheduled report');
                          }}
                          className="text-rose-600 hover:text-rose-800 font-bold"
                        >
                          <Trash2 className="w-4 h-4 ml-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: REFERRAL PROGRAM */}
      {/* ========================================================================= */}
      {activeTab === 'referral' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* SHARE LINK & EARN HERO CARD */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
                <Gift className="w-4 h-4" />
                <span>EARN 30% RECURRING COMMISSION</span>
              </div>
              <h2 className="text-xl font-black text-white">Share Your Referral Link</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Earn cash every time someone subscribes using your unique link.
              </p>
            </div>

            {/* Link Copy Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="flex-1 px-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-xs font-mono font-bold text-blue-300 select-all"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(referralLink);
                  showToast('Copied referral link to clipboard!');
                }}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-400/20 flex items-center justify-center gap-1.5"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </button>
            </div>

            {/* Social Share buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/80 text-xs font-bold">
              <span className="text-slate-400">Social Sharing:</span>
              <button onClick={() => showToast('Shared on Twitter/X!')} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200">
                Share on Twitter/X
              </button>
              <button onClick={() => showToast('Shared on LinkedIn!')} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200">
                Share on LinkedIn
              </button>
              <button onClick={() => showToast('Opened email client to share link')} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200">
                Share via Email
              </button>
            </div>
          </div>

          {/* REFERRAL STATS OVERVIEW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Clicks</span>
              <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>🔗 1,240</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Signups</span>
              <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>👥 48</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Active Subscriptions</span>
              <div className="text-2xl font-black text-emerald-600 flex items-center gap-2">
                <span>💳 12</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Earnings</span>
              <div className="text-2xl font-black text-blue-600 flex items-center gap-2">
                <span>💵 $1,440.00</span>
              </div>
            </div>
          </div>

          {/* PAYOUT BALANCE & HISTORY */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <div className="text-xs font-bold text-slate-500">Unpaid Available Balance</div>
                <div className="text-2xl font-black text-slate-900">$288.00</div>
                <div className="text-[11px] text-slate-500">Min Payout: $100.00 • Method: PayPal ({email})</div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => showToast('Payout request of $288.00 submitted to PayPal!')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow-md shadow-emerald-600/20"
                >
                  🚀 Request Payout Now
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Referred Users Log</h4>
              
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase">
                    <tr>
                      <th className="p-3.5">Referred User</th>
                      <th className="p-3.5">Date Joined</th>
                      <th className="p-3.5">Plan</th>
                      <th className="p-3.5">Commission Rate</th>
                      <th className="p-3.5">Your Earnings</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {referredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-mono font-bold text-slate-900">{u.code}</td>
                        <td className="p-3.5 text-slate-600">{u.date}</td>
                        <td className="p-3.5 font-bold">{u.plan}</td>
                        <td className="p-3.5 text-blue-600 font-bold">{u.commission}</td>
                        <td className="p-3.5 font-extrabold text-slate-900">{u.commission}</td>
                        <td className="p-3.5">
                          {u.status === 'Paid' ? (
                            <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                              🟢 Paid
                            </span>
                          ) : (
                            <span className="bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded text-[10px] border border-amber-200">
                              🟡 Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: API KEY */}
      {/* ========================================================================= */}
      {activeTab === 'api-key' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* HEADER & API DOCS CTA */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">Active Developer API Keys</h3>
              <p className="text-xs text-slate-500">Authenticate requests from custom software, n8n, Make, or webhooks.</p>
            </div>

            <button
              onClick={() => showToast('Opening API Documentation...')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-extrabold flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              <span>View API Documentation</span>
            </button>
          </div>

          {/* ACTIVE KEYS TABLE */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500">API Tokens ({apiKeys.length})</span>
              <button
                onClick={() => setIsGenerateKeyModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5"
              >
                <Key className="w-4 h-4" />
                <span>Generate New API Key</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase">
                  <tr>
                    <th className="p-3.5">Key Name</th>
                    <th className="p-3.5">Secret Token</th>
                    <th className="p-3.5">Created</th>
                    <th className="p-3.5">Last Used</th>
                    <th className="p-3.5">Permissions</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {apiKeys.map(k => (
                    <tr key={k.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-extrabold text-slate-900">{k.name}</td>
                      <td className="p-3.5 font-mono text-slate-600 font-bold">{k.masked}</td>
                      <td className="p-3.5 text-slate-500">{k.created}</td>
                      <td className="p-3.5 text-emerald-600 font-bold">{k.lastUsed}</td>
                      <td className="p-3.5">
                        <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold">
                          {k.permission}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(k.token);
                              showToast(`Copied token for ${k.name}`);
                            }}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
                            title="Copy Token"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setApiKeys(apiKeys.filter(item => item.id !== k.id));
                              showToast(`Revoked key "${k.name}"`);
                            }}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 rounded-lg text-rose-700"
                            title="Revoke Key"
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

          {/* RATE LIMITS & USAGE METRICS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Rate Limits & Daily Usage Metrics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-500">API Rate Limit</span>
                <div className="text-lg font-black text-slate-900">120 Requests / Minute</div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-500">Today's Requests</span>
                  <span className="text-blue-600 font-mono">3,420 / 10,000 Daily</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '34.2%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* WEBHOOK ENDPOINTS CONFIGURATION */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Webhook Endpoints Configuration
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Target Webhook URL</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={webhookUrl}
                    onChange={e => setWebhookUrl(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800"
                  />
                  <button
                    onClick={handleTestWebhook}
                    disabled={isTestingWebhook}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>🧪 Test Webhook</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Events Triggered</label>
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-800">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={webhookEvents.leadScraped}
                      onChange={e => setWebhookEvents({ ...webhookEvents, leadScraped: e.target.checked })}
                      className="rounded border-slate-300 text-blue-600"
                    />
                    <span>Lead Scraped</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={webhookEvents.emailVerified}
                      onChange={e => setWebhookEvents({ ...webhookEvents, emailVerified: e.target.checked })}
                      className="rounded border-slate-300 text-blue-600"
                    />
                    <span>Email Verified</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={webhookEvents.deliverabilityComplete}
                      onChange={e => setWebhookEvents({ ...webhookEvents, deliverabilityComplete: e.target.checked })}
                      className="rounded border-slate-300 text-blue-600"
                    />
                    <span>Deliverability Test Complete</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={webhookEvents.campaignReply}
                      onChange={e => setWebhookEvents({ ...webhookEvents, campaignReply: e.target.checked })}
                      className="rounded border-slate-300 text-blue-600"
                    />
                    <span>Campaign Reply Received</span>
                  </label>
                </div>
              </div>

              <button
                onClick={() => showToast('Saved webhook settings!')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs"
              >
                💾 Save Webhook Settings
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}
      
      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 max-w-md w-full space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-black text-slate-900">Invite Team Member</h3>
            <div className="space-y-3 text-xs font-semibold">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Role</label>
                <select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                >
                  <option value="Admin">Admin (Full Access)</option>
                  <option value="Member">Member (Campaign Access)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteMember}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Report Modal */}
      {isAddReportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 max-w-md w-full space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-black text-slate-900">Create Scheduled Automated Report</h3>
            <div className="space-y-3 text-xs font-semibold">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Report Type</label>
                <select
                  value={newReportType}
                  onChange={e => setNewReportType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                >
                  <option value="Deliverability Audit">Deliverability Audit</option>
                  <option value="Monthly Lead Summary">Monthly Lead Summary</option>
                  <option value="Campaign Performance Digest">Campaign Performance Digest</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Frequency</label>
                <select
                  value={newReportFreq}
                  onChange={e => setNewReportFreq(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                >
                  <option value="Daily (Morning)">Daily (Morning)</option>
                  <option value="Weekly (Mondays)">Weekly (Mondays)</option>
                  <option value="Monthly (1st)">Monthly (1st)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Format</label>
                <select
                  value={newReportFormat}
                  onChange={e => setNewReportFormat(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                >
                  <option value="PDF">PDF Document</option>
                  <option value="CSV">CSV Data Export</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Recipients</label>
                <input
                  type="email"
                  value={newReportEmail}
                  onChange={e => setNewReportEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddReportModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateReport}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs"
              >
                Save Scheduled Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate API Key Modal */}
      {isGenerateKeyModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 max-w-md w-full space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-black text-slate-900">Generate New API Key</h3>
            <div className="space-y-3 text-xs font-semibold">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Key Name</label>
                <input
                  type="text"
                  placeholder="e.g. Zapier Production, Custom Script"
                  value={newKeyName}
                  onChange={e => setNewKeyName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Scope Permissions</label>
                <select
                  value={newKeyPermission}
                  onChange={e => setNewKeyPermission(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                >
                  <option value="Read Only">Read Only (Query Data)</option>
                  <option value="Read/Write">Read/Write (Manage Leads & Campaigns)</option>
                  <option value="Admin">Admin (Full Control)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsGenerateKeyModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateApiKey}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs"
              >
                Generate Key
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
