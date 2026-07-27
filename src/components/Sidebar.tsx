import React, { useState } from 'react';
import { 
  Inbox, 
  FlaskConical, 
  Send, 
  FileText, 
  Magnet, 
  Puzzle, 
  Users, 
  MailCheck, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  CreditCard, 
  Bell, 
  Gift, 
  Key, 
  LogOut,
  Mail
} from 'lucide-react';
import { AccountSettingsSubTab, MainTab } from '../types';

interface SidebarProps {
  currentTab: MainTab;
  onNavigate: (tab: MainTab, accountSubTab?: AccountSettingsSubTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [warmupOpen, setWarmupOpen] = useState(true);
  const [outreachOpen, setOutreachOpen] = useState(true);
  const [leadGenOpen, setLeadGenOpen] = useState(true);
  const [contactsOpen, setContactsOpen] = useState(true);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const isActive = (tabs: MainTab[]) => tabs.includes(currentTab);

  return (
    <div 
      className={`bg-[#0f172a] text-slate-300 flex flex-col justify-between h-screen transition-all duration-300 relative border-r border-slate-800 ${
        collapsed ? 'w-18' : 'w-64'
      } shrink-0 select-none z-30`}
    >
      {/* Top Header Logo & Collapse Toggle */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3 cursor-pointer overflow-hidden" onClick={() => onNavigate('inboxes')}>
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-500/20">
              <Mail className="w-5 h-5" />
            </div>
            {!collapsed && (
              <span className="font-bold text-white text-lg tracking-tight whitespace-nowrap">
                Inboxes Email
              </span>
            )}
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar">
          
          {/* WARMUP SECTION */}
          <div>
            {!collapsed ? (
              <button 
                onClick={() => setWarmupOpen(!warmupOpen)}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5 hover:text-slate-200"
              >
                <span>Warmup</span>
                {warmupOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <div className="h-px bg-slate-800 my-2" />
            )}

            {(warmupOpen || collapsed) && (
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => onNavigate('inboxes')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(['inboxes', 'inbox-detail', 'inbox-settings'])
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                  title="Inboxes"
                >
                  <Inbox className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>Inboxes</span>}
                </button>

                <button
                  onClick={() => onNavigate('inboxes-tester')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(['inboxes-tester'])
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                  title="Inboxes tester"
                >
                  <FlaskConical className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>Inboxes tester</span>}
                </button>
              </div>
            )}
          </div>

          {/* OUTREACH SECTION */}
          <div>
            {!collapsed ? (
              <button 
                onClick={() => setOutreachOpen(!outreachOpen)}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5 hover:text-slate-200"
              >
                <span>Outreach</span>
                {outreachOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <div className="h-px bg-slate-800 my-2" />
            )}

            {(outreachOpen || collapsed) && (
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => onNavigate('campaigns')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(['campaigns', 'campaign-new', 'campaign-detail'])
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                  title="Campaigns"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>Campaigns</span>}
                </button>

                <button
                  onClick={() => onNavigate('templates')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(['templates', 'template-new', 'template-detail'])
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                  title="Template"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>Template</span>}
                </button>
              </div>
            )}
          </div>

          {/* LEAD GEN SECTION */}
          <div>
            {!collapsed ? (
              <button 
                onClick={() => setLeadGenOpen(!leadGenOpen)}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5 hover:text-slate-200"
              >
                <span>Lead Gen</span>
                {leadGenOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <div className="h-px bg-slate-800 my-2" />
            )}

            {(leadGenOpen || collapsed) && (
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => onNavigate('lead-search')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(['lead-search'])
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                  title="Lead Search"
                >
                  <Magnet className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>Lead Search</span>}
                </button>

                <button
                  onClick={() => onNavigate('extensions')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(['extensions'])
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                  title="Extensions"
                >
                  <Puzzle className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>Extensions</span>}
                </button>
              </div>
            )}
          </div>

          {/* CONTACTS SECTION */}
          <div>
            {!collapsed ? (
              <button 
                onClick={() => setContactsOpen(!contactsOpen)}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5 hover:text-slate-200"
              >
                <span>Contacts</span>
                {contactsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <div className="h-px bg-slate-800 my-2" />
            )}

            {(contactsOpen || collapsed) && (
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => onNavigate('contacts')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(['contacts', 'contact-import'])
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                  title="Contacts"
                >
                  <Users className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>Contacts</span>}
                </button>

                <button
                  onClick={() => onNavigate('email-verifier')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(['email-verifier'])
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                  title="Email Verifier"
                >
                  <MailCheck className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>Email Verifier</span>}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Account Profile Bottom Button & Popover */}
      <div className="p-3 border-t border-slate-800 relative">
        {accountMenuOpen && (
          <div className="absolute bottom-16 left-3 right-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="px-3 py-2 border-b border-slate-800 mb-1">
              <p className="text-xs text-slate-400">Signed in as</p>
              <p className="text-sm font-semibold truncate text-white">test@email.com</p>
            </div>
            <button 
              onClick={() => { onNavigate('account-settings', 'profile'); setAccountMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Your Account</span>
            </button>
            <button 
              onClick={() => { onNavigate('account-settings', 'billing'); setAccountMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
            >
              <CreditCard className="w-4 h-4 text-slate-400" />
              <span>Billing</span>
            </button>
            <button 
              onClick={() => { onNavigate('account-settings', 'alerts'); setAccountMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
            >
              <Bell className="w-4 h-4 text-slate-400" />
              <span>Alerts & Reports</span>
            </button>
            <button 
              onClick={() => { onNavigate('account-settings', 'referral'); setAccountMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
            >
              <Gift className="w-4 h-4 text-slate-400" />
              <span>Referral Program</span>
            </button>
            <button 
              onClick={() => { onNavigate('account-settings', 'api-key'); setAccountMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
            >
              <Key className="w-4 h-4 text-slate-400" />
              <span>API key</span>
            </button>
            <div className="h-px bg-slate-800 my-1" />
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-red-500/10 text-red-400 flex items-center gap-2.5 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setAccountMenuOpen(!accountMenuOpen)}
          className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/50 transition-colors"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              TE
            </div>
            {!collapsed && (
              <span className="text-sm font-medium truncate">test@email.com</span>
            )}
          </div>
          {!collapsed && <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`} />}
        </button>
      </div>
    </div>
  );
};
