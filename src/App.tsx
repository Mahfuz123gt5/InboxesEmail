import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWidget } from './components/ChatWidget';
import { AddCreditModal } from './components/modals/AddCreditModal';
import { CreateContactListModal } from './components/modals/CreateContactListModal';

import { InboxesDashboardView } from './components/views/InboxesDashboardView';
import { InboxDetailView } from './components/views/InboxDetailView';
import { InboxSettingsView } from './components/views/InboxSettingsView';
import { InboxesTesterView } from './components/views/InboxesTesterView';
import { CampaignsListView } from './components/views/CampaignsListView';
import { CampaignDetailView } from './components/views/CampaignDetailView';
import { CampaignWizardView } from './components/views/CampaignWizardView';
import { TemplatesView } from './components/views/TemplatesView';
import { TemplateDetailView } from './components/views/TemplateDetailView';
import { TemplateEditorView } from './components/views/TemplateEditorView';
import { LeadSearchView } from './components/views/LeadSearchView';
import { ExtensionsView } from './components/views/ExtensionsView';
import { ContactsView } from './components/views/ContactsView';
import { ContactImportWizardView } from './components/views/ContactImportWizardView';
import { EmailVerifierView } from './components/views/EmailVerifierView';
import { AccountSettingsView } from './components/views/AccountSettingsView';

import { 
  initialInboxes, 
  initialCampaigns, 
  initialContactLists, 
  initialTemplates, 
  initialVerifications 
} from './mockData';
import { MainTab, Inbox, Campaign, ContactList, EmailTemplate, VerificationResult, TemplateType, AccountSettingsSubTab } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<MainTab>('inboxes');
  const [accountSubTab, setAccountSubTab] = useState<AccountSettingsSubTab>('profile');

  // Main Datasets
  const [inboxes, setInboxes] = useState<Inbox[]>(initialInboxes);
  const [selectedInboxId, setSelectedInboxId] = useState<string>(initialInboxes[0].id);

  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(initialCampaigns[0]?.id || 'c1');
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const [contactLists, setContactLists] = useState<ContactList[]>(initialContactLists);
  const [templates, setTemplates] = useState<EmailTemplate[]>(initialTemplates);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(initialTemplates[0]?.id || 't1');
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [defaultTemplateType, setDefaultTemplateType] = useState<TemplateType>('plain');

  const [verifications, setVerifications] = useState<VerificationResult[]>(initialVerifications);

  // Modals
  const [isAddCreditModalOpen, setIsAddCreditModalOpen] = useState(false);
  const [isCreateContactListModalOpen, setIsCreateContactListModalOpen] = useState(false);

  const selectedInbox = inboxes.find(i => i.id === selectedInboxId) || inboxes[0];

  // Inbox Status Toggles & Updates
  const handleToggleInboxStatus = (id: string) => {
    setInboxes(inboxes.map(i => i.id === id ? { ...i, status: i.status === 'running' ? 'paused' : 'running' } : i));
  };

  const handleUpdateInbox = (updated: Inbox) => {
    setInboxes(inboxes.map(i => i.id === updated.id ? updated : i));
  };

  const handleDeleteInbox = (id: string) => {
    setInboxes(inboxes.filter(i => i.id !== id));
  };

  // Campaign Actions
  const handleToggleCampaignStatus = (id: string) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: c.status === 'running' ? 'paused' : 'running' } : c));
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  const handleSaveCampaign = (campaignPartial: Partial<Campaign>) => {
    if (editingCampaign) {
      setCampaigns(campaigns.map(c => c.id === editingCampaign.id ? { ...c, ...campaignPartial } as Campaign : c));
      setEditingCampaign(null);
    } else {
      const newCamp: Campaign = {
        id: `camp-${Date.now()}`,
        name: campaignPartial.name || 'Untitled campaign',
        status: 'running',
        sentPercent: 0,
        sentCount: 0,
        sentTotal: 14,
        repliedPercent: 0,
        repliedCount: 0,
        repliedTotal: 14,
        contactListId: campaignPartial.contactListId,
        senderEmail: campaignPartial.senderEmail,
        sequenceSteps: campaignPartial.sequenceSteps || [],
        schedule: campaignPartial.schedule || {
          timeZone: '(GMT+06:00) Dhaka',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          fromTime: '09:00 AM',
          toTime: '05:00 PM',
          maxPerDay: 10
        }
      };
      setCampaigns([newCamp, ...campaigns]);
    }
  };

  // Template Actions
  const handleToggleTemplateWarmup = (id: string) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, warmupEnabled: !t.warmupEnabled } : t));
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const handleSaveTemplate = (tplPartial: Partial<EmailTemplate>) => {
    if (tplPartial.id) {
      setTemplates(templates.map(t => t.id === tplPartial.id ? { ...t, ...tplPartial } as EmailTemplate : t));
    } else {
      const newTpl: EmailTemplate = {
        id: `tpl-${Date.now()}`,
        subject: tplPartial.subject || 'New Template',
        type: tplPartial.type || 'plain',
        inboxes: tplPartial.inboxes || 'All Inboxes',
        priority: tplPartial.priority || 'Medium',
        sentCount: 0,
        inboxPlacement: 0,
        warmupEnabled: true,
        content: tplPartial.content || ''
      };
      setTemplates([newTpl, ...templates]);
    }
    setEditingTemplate(null);
  };

  // Contact List Actions
  const handleCreateContactList = (newList: ContactList) => {
    setContactLists([newList, ...contactLists]);
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-800 antialiased overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        onNavigate={(tab, subTab) => {
          if (subTab) setAccountSubTab(subTab);
          if (tab === 'campaign-new') setEditingCampaign(null);
          if (tab === 'template-new') setEditingTemplate(null);
          setCurrentTab(tab);
        }} 
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {currentTab === 'inboxes' && (
          <InboxesDashboardView 
            inboxes={inboxes}
            onSelectInbox={(inbox) => setSelectedInboxId(inbox.id)}
            onNavigate={setCurrentTab}
            onToggleStatus={handleToggleInboxStatus}
          />
        )}

        {currentTab === 'inbox-detail' && (
          <InboxDetailView 
            inbox={selectedInbox}
            onNavigate={setCurrentTab}
            onNavigateSettings={() => setCurrentTab('inbox-settings')}
            onToggleStatus={handleToggleInboxStatus}
          />
        )}

        {currentTab === 'inbox-settings' && (
          <InboxSettingsView 
            inbox={selectedInbox}
            onNavigate={setCurrentTab}
            onOpenAddCredit={() => setIsAddCreditModalOpen(true)}
            onUpdateInbox={handleUpdateInbox}
            onDeleteInbox={handleDeleteInbox}
          />
        )}

        {currentTab === 'inboxes-tester' && (
          <InboxesTesterView inboxes={inboxes} />
        )}

        {currentTab === 'campaigns' && (
          <CampaignsListView 
            campaigns={campaigns}
            onNavigate={setCurrentTab}
            onEditCampaign={(camp) => {
              setEditingCampaign(camp);
              setCurrentTab('campaign-new');
            }}
            onToggleStatus={handleToggleCampaignStatus}
            onDeleteCampaign={handleDeleteCampaign}
            onSelectCampaign={(camp) => {
              setSelectedCampaignId(camp.id);
              setCurrentTab('campaign-detail');
            }}
          />
        )}

        {currentTab === 'campaign-detail' && (
          <CampaignDetailView 
            campaign={campaigns.find(c => c.id === selectedCampaignId) || campaigns[0] || {
              id: 'c1',
              name: 'Q3 SaaS Founders Outreach',
              status: 'running',
              sentPercent: 52,
              sentCount: 1292,
              sentTotal: 2500,
              repliedPercent: 14,
              repliedCount: 181,
              repliedTotal: 1292,
              sequenceSteps: [],
              schedule: { timeZone: 'UTC', days: [], fromTime: '09:00', toTime: '17:00', maxPerDay: 150 }
            }}
            onNavigate={setCurrentTab}
            onEditCampaign={(camp) => {
              setEditingCampaign(camp);
              setCurrentTab('campaign-new');
            }}
            onToggleStatus={handleToggleCampaignStatus}
          />
        )}

        {currentTab === 'campaign-new' && (
          <CampaignWizardView 
            contactLists={contactLists}
            inboxes={inboxes}
            onNavigate={setCurrentTab}
            onSaveCampaign={handleSaveCampaign}
            onCreateContactListModal={() => setIsCreateContactListModalOpen(true)}
          />
        )}

        {currentTab === 'templates' && (
          <TemplatesView 
            templates={templates}
            onNavigate={setCurrentTab}
            onCreateTemplate={(type) => {
              setDefaultTemplateType(type);
              setEditingTemplate(null);
              setCurrentTab('template-new');
            }}
            onEditTemplate={(tpl) => {
              setEditingTemplate(tpl);
              setCurrentTab('template-new');
            }}
            onToggleWarmup={handleToggleTemplateWarmup}
            onDeleteTemplate={handleDeleteTemplate}
            onSelectTemplate={(tpl) => {
              setSelectedTemplateId(tpl.id);
              setCurrentTab('template-detail');
            }}
          />
        )}

        {currentTab === 'template-detail' && (
          <TemplateDetailView 
            template={templates.find(t => t.id === selectedTemplateId) || templates[0] || {
              id: 't1',
              subject: 'Feedback on recent product update',
              type: 'plain',
              inboxes: 'All active inboxes',
              priority: 'High',
              sentCount: 3420,
              inboxPlacement: 98,
              warmupEnabled: true,
              content: 'Hi {{first_name}},\n\nI hope you\'re having a great week! I noticed your team recently launched a major update to {{product_name}}...'
            }}
            onNavigate={setCurrentTab}
            onEditTemplate={(tpl) => {
              setEditingTemplate(tpl);
              setCurrentTab('template-new');
            }}
          />
        )}

        {currentTab === 'template-new' && (
          <TemplateEditorView 
            initialTemplate={editingTemplate}
            defaultType={defaultTemplateType}
            inboxes={inboxes}
            onNavigate={setCurrentTab}
            onSaveTemplate={handleSaveTemplate}
          />
        )}

        {currentTab === 'lead-search' && (
          <LeadSearchView />
        )}

        {currentTab === 'extensions' && (
          <ExtensionsView />
        )}

        {currentTab === 'contacts' && (
          <ContactsView 
            contactLists={contactLists}
            onNavigate={setCurrentTab}
            onOpenImportWizard={() => setCurrentTab('contact-import')}
            onCreateContactListModal={() => setIsCreateContactListModalOpen(true)}
          />
        )}

        {currentTab === 'contact-import' && (
          <ContactImportWizardView 
            onNavigate={setCurrentTab}
            onImportComplete={handleCreateContactList}
          />
        )}

        {currentTab === 'email-verifier' && (
          <EmailVerifierView 
            verifications={verifications}
            onOpenImportWizard={() => setCurrentTab('contact-import')}
          />
        )}

        {currentTab === 'account-settings' && (
          <AccountSettingsView 
            initialSubTab={accountSubTab}
            onNavigate={setCurrentTab}
          />
        )}
      </div>

      {/* Floating Chat Widget */}
      <ChatWidget />

      {/* Modals */}
      <AddCreditModal 
        isOpen={isAddCreditModalOpen}
        onClose={() => setIsAddCreditModalOpen(false)}
        onAddCredit={(amount) => {
          alert(`Successfully added ${amount} warmup credits to your balance!`);
        }}
      />

      <CreateContactListModal 
        isOpen={isCreateContactListModalOpen}
        onClose={() => setIsCreateContactListModalOpen(false)}
        onCreateList={handleCreateContactList}
      />
    </div>
  );
}
