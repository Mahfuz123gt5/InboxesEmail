export type MainTab = 
  | 'inboxes'
  | 'inbox-detail'
  | 'inbox-settings'
  | 'inboxes-tester'
  | 'campaigns'
  | 'campaign-detail'
  | 'campaign-new'
  | 'templates'
  | 'template-detail'
  | 'template-new'
  | 'lead-search'
  | 'extensions'
  | 'contacts'
  | 'contact-import'
  | 'email-verifier'
  | 'account-settings';

export type InboxSettingsSubTab = 'general' | 'content' | 'connection' | 'delete';

export type LeadSearchSubTab = 'prospect' | 'linkedin' | 'influencers' | 'email' | 'domain' | 'company';

export type AccountSettingsSubTab = 'profile' | 'billing' | 'alerts' | 'referral' | 'api-key';

export type ExtensionSubTab = 'email-finder' | 'linkedin-finder' | 'google-map' | 'google-search';

export type TemplateType = 'plain' | 'html';

export interface Inbox {
  id: string;
  email: string;
  tags: string[];
  status: 'running' | 'paused' | 'error';
  rotation: boolean;
  plan: 'Basic' | 'Pro' | 'Max';
  reputationScore: number;
  emailsSent: number;
  inboxRate: number;
  spamRate: number;
  spamCount: number;
  categoryRate: number;
  categoryCount: number;
  connectedSince: string;
  senderName: {
    firstName: string;
    lastName: string;
  };
  strategy: 'Progressive' | 'Flat' | 'Randomize';
  baseline: number;
  increasePerDay: number;
  maxPerDay: number;
  replyRatePercent: number;
  timeZone: string;
  deliveryDays: string[];
  deliveryPeriod: { from: string; to: string };
  smtp: {
    username: string;
    host: string;
    port: number;
    ssl: boolean;
  };
  imap: {
    username: string;
    host: string;
    port: number;
    ssl: boolean;
  };
  healthChecks: {
    spf: boolean;
    domainBlacklists: boolean;
    dmarc: boolean;
    mxRecords: boolean;
    warmupAgeDays: number;
  };
}

export interface Campaign {
  id: string;
  name: string;
  status: 'running' | 'paused' | 'draft' | 'completed';
  sentPercent: number;
  sentCount: number;
  sentTotal: number;
  repliedPercent: number;
  repliedCount: number;
  repliedTotal: number;
  contactListId?: string;
  senderEmail?: string;
  sequenceSteps: SequenceStep[];
  schedule: {
    timeZone: string;
    days: string[];
    fromTime: string;
    toTime: string;
    maxPerDay: number;
  };
}

export interface SequenceStep {
  id: string;
  type: 'email' | 'wait';
  subject?: string;
  bodyFormat?: 'visual' | 'html' | 'text';
  bodyContent?: string;
  waitDays?: number;
}

export interface ContactList {
  id: string;
  name: string;
  contactCount: number;
  verified: boolean;
  createdAt: string;
}

export interface Contact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  role?: string;
  url?: string;
  customVars?: Record<string, string>;
  status: 'valid' | 'invalid' | 'catch_all';
}

export interface EmailTemplate {
  id: string;
  subject: string;
  type: TemplateType;
  inboxes: string;
  priority: 'Low' | 'Medium' | 'High';
  sentCount: number;
  inboxPlacement: number;
  warmupEnabled: boolean;
  content: string;
}

export interface VerificationEmailDetail {
  id: string;
  email: string;
  category: 'deliverable' | 'undeliverable' | 'accept_all' | 'disposable' | 'role_based';
  reason: string;
  score: number;
  domain?: string;
}

export interface VerificationResult {
  id: string;
  fileName: string;
  emailsCount: number;
  validCount: number;
  invalidCount: number;
  catchAllCount?: number;
  disposableCount?: number;
  roleCount?: number;
  status: 'Completed' | 'In Progress' | 'Failed';
  createdAt: string;
  details?: VerificationEmailDetail[];
}
