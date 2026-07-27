import React, { useState } from 'react';
import { 
  ChevronRight, 
  ExternalLink, 
  Plus, 
  Check, 
  Trash2, 
  ShieldAlert, 
  Save, 
  Clock, 
  Sparkles,
  Lock,
  Mail,
  Server
} from 'lucide-react';
import { Inbox, InboxSettingsSubTab, MainTab } from '../../types';

interface InboxSettingsViewProps {
  inbox: Inbox;
  onNavigate: (tab: MainTab) => void;
  onOpenAddCredit: () => void;
  onUpdateInbox: (updated: Inbox) => void;
  onDeleteInbox: (id: string) => void;
}

export const InboxSettingsView: React.FC<InboxSettingsViewProps> = ({
  inbox,
  onNavigate,
  onOpenAddCredit,
  onUpdateInbox,
  onDeleteInbox
}) => {
  const [activeTab, setActiveTab] = useState<InboxSettingsSubTab>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState(inbox.senderName.firstName);
  const [lastName, setLastName] = useState(inbox.senderName.lastName);
  const [plan, setPlan] = useState<'Basic' | 'Pro' | 'Max'>(inbox.plan);
  const [strategy, setStrategy] = useState<'Progressive' | 'Flat' | 'Randomize'>(inbox.strategy);
  const [baseline, setBaseline] = useState(inbox.baseline);
  const [increasePerDay, setIncreasePerDay] = useState(inbox.increasePerDay);
  const [maxPerDay, setMaxPerDay] = useState(inbox.maxPerDay);
  const [replyRatePercent, setReplyRatePercent] = useState(inbox.replyRatePercent);
  const [timeZone, setTimeZone] = useState(inbox.timeZone);
  const [deliveryDays, setDeliveryDays] = useState<string[]>(inbox.deliveryDays);

  // Connection states
  const [smtpHost, setSmtpHost] = useState(inbox.smtp.host);
  const [smtpPort, setSmtpPort] = useState(inbox.smtp.port);
  const [smtpUser, setSmtpUser] = useState(inbox.smtp.username);
  const [smtpSsl, setSmtpSsl] = useState(inbox.smtp.ssl);

  const [imapHost, setImapHost] = useState(inbox.imap.host);
  const [imapPort, setImapPort] = useState(inbox.imap.port);
  const [imapUser, setImapUser] = useState(inbox.imap.username);
  const [imapSsl, setImapSsl] = useState(inbox.imap.ssl);

  // Warmup Content states
  const [espFilter, setEspFilter] = useState({ google: true, outlook: true, other: true });
  const [extendedReplyFormat, setExtendedReplyFormat] = useState(true);

  const handleSave = () => {
    onUpdateInbox({
      ...inbox,
      plan,
      senderName: { firstName, lastName },
      strategy,
      baseline,
      increasePerDay,
      maxPerDay,
      replyRatePercent,
      timeZone,
      deliveryDays,
      smtp: { username: smtpUser, host: smtpHost, port: smtpPort, ssl: smtpSsl },
      imap: { username: imapUser, host: imapHost, port: imapPort, ssl: imapSsl }
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const toggleDay = (day: string) => {
    if (deliveryDays.includes(day)) {
      setDeliveryDays(deliveryDays.filter(d => d !== day));
    } else {
      setDeliveryDays([...deliveryDays, day]);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Sub-header Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
          <button onClick={() => onNavigate('inboxes')} className="hover:text-blue-600">Inboxes</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => onNavigate('inbox-detail')} className="hover:text-blue-600">{inbox.email}</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800">Settings</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Inbox Settings</h1>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-slate-200 gap-8">
        {[
          { id: 'general', label: 'General Settings' },
          { id: 'content', label: 'Warmup Content' },
          { id: 'connection', label: 'Connection' },
          { id: 'delete', label: 'Delete' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as InboxSettingsSubTab)}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === t.id 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* SUB-TAB 1: GENERAL SETTINGS */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          
          {/* Identifier Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-xs font-semibold text-slate-500">Network Inbox Identifier</p>
              <p className="text-lg font-mono font-bold text-slate-800">ID: 35111254</p>
            </div>
            <a href="#" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              <span>How to filter warmup e-mails?</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Plan Type Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Plan Type</h3>
                <p className="text-xs text-slate-500">Choose your daily email capacity limit</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600">Credit Balance: <strong className="text-blue-600 text-sm">1,250</strong></span>
                <button 
                  onClick={onOpenAddCredit}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Credit</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { name: 'Basic', limit: '75 emails / day', price: 'Included' },
                { name: 'Pro', limit: '250 emails / day', price: 'Active' },
                { name: 'Max', limit: '1,000 emails / day', price: 'Upgrade' }
              ].map((p) => (
                <div 
                  key={p.name}
                  onClick={() => setPlan(p.name as any)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    plan === p.name 
                      ? 'border-blue-600 bg-blue-50/40 shadow-xs' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                    {plan === p.name && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="text-xs font-semibold text-blue-600">{p.limit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sender Name Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Sender Name</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">First Name</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Last Name</label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5">
                <Save className="w-3.5 h-3.5" />
                <span>Save Name</span>
              </button>
            </div>
          </div>

          {/* Sending Frequency Strategy */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Sending Frequency Strategy</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['Progressive', 'Flat', 'Randomize'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStrategy(s)}
                  className={`p-3.5 rounded-xl border-2 text-left font-bold text-xs transition-all ${
                    strategy === s ? 'border-blue-600 bg-blue-50/40 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Starting baseline</label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setBaseline(Math.max(1, baseline - 5))} className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs">-</button>
                  <input type="number" value={baseline} onChange={e => setBaseline(Number(e.target.value))} className="w-full text-center text-xs font-bold text-slate-800 focus:outline-none" />
                  <button onClick={() => setBaseline(baseline + 5)} className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs">+</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Increase per day</label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setIncreasePerDay(Math.max(1, increasePerDay - 1))} className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs">-</button>
                  <input type="number" value={increasePerDay} onChange={e => setIncreasePerDay(Number(e.target.value))} className="w-full text-center text-xs font-bold text-slate-800 focus:outline-none" />
                  <button onClick={() => setIncreasePerDay(increasePerDay + 1)} className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs">+</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Max emails per day</label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setMaxPerDay(Math.max(10, maxPerDay - 10))} className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs">-</button>
                  <input type="number" value={maxPerDay} onChange={e => setMaxPerDay(Number(e.target.value))} className="w-full text-center text-xs font-bold text-slate-800 focus:outline-none" />
                  <button onClick={() => setMaxPerDay(maxPerDay + 10)} className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs">+</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Reply rate percentage</label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button onClick={() => setReplyRatePercent(Math.max(5, replyRatePercent - 5))} className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs">-</button>
                  <input type="number" value={replyRatePercent} onChange={e => setReplyRatePercent(Number(e.target.value))} className="w-full text-center text-xs font-bold text-slate-800 focus:outline-none" />
                  <button onClick={() => setReplyRatePercent(Math.min(95, replyRatePercent + 5))} className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs">+</button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5">
                <Save className="w-3.5 h-3.5" />
                <span>Save Strategy</span>
              </button>
            </div>
          </div>

          {/* Scheduled Warmup Card (PRO Badge) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Scheduled Warmup</h3>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wide">
                  PRO
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Time Zone</label>
                <select 
                  value={timeZone} 
                  onChange={e => setTimeZone(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
                >
                  <option>(GMT-11:00) Midway Island</option>
                  <option>(GMT+00:00) London</option>
                  <option>(GMT+06:00) Dhaka</option>
                  <option>(GMT-05:00) Eastern Time (US)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Send on</label>
                <div className="flex flex-wrap gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        deliveryDays.includes(day)
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Daily Email Delivery Period</label>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">From</span>
                  <input type="text" value="12:00 AM" readOnly className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold w-28 text-center bg-slate-50" />
                  <span className="text-xs text-slate-500">To</span>
                  <input type="text" value="12:00 AM" readOnly className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold w-28 text-center bg-slate-50" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5">
                <Save className="w-3.5 h-3.5" />
                <span>Save Schedule</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: WARMUP CONTENT */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Specific ESP Warm-up</h3>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase">PRO</span>
            </div>
            <p className="text-xs text-slate-500">Focus warmup emails toward target email service providers.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setEspFilter(prev => ({ ...prev, google: !prev.google }))}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  espFilter.google ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Google
              </button>
              <button 
                onClick={() => setEspFilter(prev => ({ ...prev, outlook: !prev.outlook }))}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  espFilter.outlook ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Outlook
              </button>
              <button 
                onClick={() => setEspFilter(prev => ({ ...prev, other: !prev.other }))}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  espFilter.other ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Other
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Specific Warm-up Topics</h3>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase">PRO</span>
            </div>
            <select className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none">
              <option>Select topics...</option>
              <option>Technology & SaaS</option>
              <option>Business & Finance</option>
              <option>Marketing & Sales</option>
            </select>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Warming-up template</h3>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase">PRO</span>
            </div>
            <select className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none">
              <option>Select templates...</option>
              <option>ugfft</option>
              <option>Feedback on recent product update</option>
            </select>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Select Warm-up Content Language</h3>
            <select className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none">
              <option>GB English</option>
              <option>US English</option>
              <option>Spanish</option>
              <option>German</option>
            </select>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Extended Email Reply Format</h3>
              <p className="text-xs text-slate-500">Enable realistic contextual thread replies</p>
            </div>
            <button 
              onClick={() => setExtendedReplyFormat(!extendedReplyFormat)}
              className={`w-12 h-6 rounded-full transition-colors relative ${extendedReplyFormat ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${extendedReplyFormat ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CONNECTION */}
      {activeTab === 'connection' && (
        <div className="space-y-6">
          {/* SMTP Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">SMTP Configuration</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">SMTP Username</label>
                <input type="text" value={smtpUser} onChange={e => setSmtpUser(e.target.value)} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">SMTP Password</label>
                <input type="password" value="••••••••••••" readOnly className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium bg-slate-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">SMTP Host</label>
                <input type="text" value={smtpHost} onChange={e => setSmtpHost(e.target.value)} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">SMTP Port</label>
                <input type="number" value={smtpPort} onChange={e => setSmtpPort(Number(e.target.value))} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={smtpSsl} onChange={e => setSmtpSsl(e.target.checked)} className="rounded text-blue-600" />
                <span className="text-xs font-semibold text-slate-700">SSL/TLS Security</span>
              </div>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold">Save SMTP</button>
            </div>
          </div>

          {/* IMAP Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">IMAP Configuration</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">IMAP Username</label>
                <input type="text" value={imapUser} onChange={e => setImapUser(e.target.value)} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">IMAP Password</label>
                <input type="password" value="••••••••••••" readOnly className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium bg-slate-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">IMAP Host</label>
                <input type="text" value={imapHost} onChange={e => setImapHost(e.target.value)} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">IMAP Port</label>
                <input type="number" value={imapPort} onChange={e => setImapPort(Number(e.target.value))} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={imapSsl} onChange={e => setImapSsl(e.target.checked)} className="rounded text-blue-600" />
                <span className="text-xs font-semibold text-slate-700">SSL/TLS Security</span>
              </div>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold">Save IMAP</button>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-medium text-center">Connected to the network since: {inbox.connectedSince}</p>
        </div>
      )}

      {/* SUB-TAB 4: DELETE */}
      {activeTab === 'delete' && (
        <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-3 text-red-600">
            <ShieldAlert className="w-6 h-6" />
            <h3 className="text-lg font-bold">Delete Inbox Connection</h3>
          </div>
          <p className="text-xs text-slate-600">
            Permanently remove this email address from the warmup network. All sending statistics and historical warmup metrics associated with this inbox will be deleted.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => {
                if (confirm(`Are you sure you want to permanently delete ${inbox.email}?`)) {
                  onDeleteInbox(inbox.id);
                  onNavigate('inboxes');
                }
              }}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-500/20 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Permanently Delete Inbox Connection</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
