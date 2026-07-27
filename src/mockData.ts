import { Inbox, Campaign, ContactList, Contact, EmailTemplate, VerificationResult } from './types';

export const initialInboxes: Inbox[] = [
  {
    id: 'inbox-1',
    email: 'siamqwer436+warm007@gmail.com',
    tags: ['Primary', 'Outreach'],
    status: 'paused',
    rotation: false,
    plan: 'Pro',
    reputationScore: 91,
    emailsSent: 1542,
    inboxRate: 97,
    spamRate: 2.27,
    spamCount: 35,
    categoryRate: 0.78,
    categoryCount: 12,
    connectedSince: 'Jul 18, 2026',
    senderName: {
      firstName: 'Ruhom',
      lastName: 'CN219'
    },
    strategy: 'Progressive',
    baseline: 246,
    increasePerDay: 8,
    maxPerDay: 250,
    replyRatePercent: 45,
    timeZone: '(GMT-11:00) Midway Island',
    deliveryDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    deliveryPeriod: { from: '12:00 AM', to: '12:00 AM' },
    smtp: {
      username: 'siamqwer436+warm007@gmail.com',
      host: 'smtp.gmail.com',
      port: 465,
      ssl: true
    },
    imap: {
      username: 'siamqwer436+warm007@gmail.com',
      host: 'imap.gmail.com',
      port: 993,
      ssl: true
    },
    healthChecks: {
      spf: true,
      domainBlacklists: true,
      dmarc: true,
      mxRecords: true,
      warmupAgeDays: 6
    }
  },
  {
    id: 'inbox-2',
    email: 'sales.outreach@company.com',
    tags: ['Sales'],
    status: 'paused',
    rotation: true,
    plan: 'Pro',
    reputationScore: 88,
    emailsSent: 920,
    inboxRate: 94,
    spamRate: 3.5,
    spamCount: 32,
    categoryRate: 2.5,
    categoryCount: 23,
    connectedSince: 'Jun 10, 2026',
    senderName: {
      firstName: 'Alex',
      lastName: 'Morgan'
    },
    strategy: 'Progressive',
    baseline: 100,
    increasePerDay: 10,
    maxPerDay: 200,
    replyRatePercent: 40,
    timeZone: '(GMT+00:00) London',
    deliveryDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    deliveryPeriod: { from: '09:00 AM', to: '05:00 PM' },
    smtp: {
      username: 'sales.outreach@company.com',
      host: 'smtp.office365.com',
      port: 587,
      ssl: true
    },
    imap: {
      username: 'sales.outreach@company.com',
      host: 'outlook.office365.com',
      port: 993,
      ssl: true
    },
    healthChecks: {
      spf: true,
      domainBlacklists: true,
      dmarc: true,
      mxRecords: true,
      warmupAgeDays: 24
    }
  },
  {
    id: 'inbox-3',
    email: 'growth@startupnet.io',
    tags: ['Growth'],
    status: 'paused',
    rotation: false,
    plan: 'Basic',
    reputationScore: 95,
    emailsSent: 430,
    inboxRate: 98,
    spamRate: 1.2,
    spamCount: 5,
    categoryRate: 0.8,
    categoryCount: 3,
    connectedSince: 'Aug 01, 2026',
    senderName: {
      firstName: 'Sarah',
      lastName: 'Dev'
    },
    strategy: 'Flat',
    baseline: 50,
    increasePerDay: 0,
    maxPerDay: 75,
    replyRatePercent: 35,
    timeZone: '(GMT-05:00) Eastern Time',
    deliveryDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    deliveryPeriod: { from: '08:00 AM', to: '06:00 PM' },
    smtp: {
      username: 'growth@startupnet.io',
      host: 'smtp.googlemail.com',
      port: 465,
      ssl: true
    },
    imap: {
      username: 'growth@startupnet.io',
      host: 'imap.gmail.com',
      port: 993,
      ssl: true
    },
    healthChecks: {
      spf: true,
      domainBlacklists: true,
      dmarc: true,
      mxRecords: true,
      warmupAgeDays: 14
    }
  },
  {
    id: 'inbox-4',
    email: 'contact@digitallead.org',
    tags: ['Marketing'],
    status: 'paused',
    rotation: false,
    plan: 'Max',
    reputationScore: 92,
    emailsSent: 3100,
    inboxRate: 96.5,
    spamRate: 2.1,
    spamCount: 65,
    categoryRate: 1.4,
    categoryCount: 43,
    connectedSince: 'May 15, 2026',
    senderName: {
      firstName: 'David',
      lastName: 'Miller'
    },
    strategy: 'Randomize',
    baseline: 300,
    increasePerDay: 15,
    maxPerDay: 1000,
    replyRatePercent: 50,
    timeZone: '(GMT+06:00) Dhaka',
    deliveryDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    deliveryPeriod: { from: '09:00 AM', to: '05:00 PM' },
    smtp: {
      username: 'contact@digitallead.org',
      host: 'smtp.gmail.com',
      port: 465,
      ssl: true
    },
    imap: {
      username: 'contact@digitallead.org',
      host: 'imap.gmail.com',
      port: 993,
      ssl: true
    },
    healthChecks: {
      spf: true,
      domainBlacklists: true,
      dmarc: true,
      mxRecords: true,
      warmupAgeDays: 45
    }
  }
];

export const initialCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Untitled campaign',
    status: 'running',
    sentPercent: 0,
    sentCount: 0,
    sentTotal: 14,
    repliedPercent: 0,
    repliedCount: 0,
    repliedTotal: 14,
    contactListId: 'list-1',
    senderEmail: 'siamqwer436+warm007@gmail.com',
    sequenceSteps: [
      { id: 'seq-1', type: 'email', subject: 'Quick question regarding your outbound', bodyFormat: 'html', bodyContent: '<p>Hi {{first_name}},</p><p>I noticed your company is scaling outreach. Are you open to discussing automated warmup?</p>' },
      { id: 'seq-2', type: 'wait', waitDays: 1 },
      { id: 'seq-3', type: 'email', subject: 'Re: Quick question regarding your outbound', bodyFormat: 'html', bodyContent: '<p>Following up on my previous note {{first_name}}. Let me know if you have 5 mins.</p>' }
    ],
    schedule: {
      timeZone: '(GMT+06:00) Dhaka',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      fromTime: '09:00 AM',
      toTime: '05:00 PM',
      maxPerDay: 10
    }
  },
  {
    id: 'camp-2',
    name: 'Q3 SaaS Founders Outreach',
    status: 'paused',
    sentPercent: 42,
    sentCount: 150,
    sentTotal: 357,
    repliedPercent: 12,
    repliedCount: 18,
    repliedTotal: 150,
    contactListId: 'list-2',
    senderEmail: 'siamqwer436+warm007@gmail.com',
    sequenceSteps: [
      { id: 'seq-10', type: 'email', subject: 'Synergy with {{company}}', bodyFormat: 'visual', bodyContent: 'Hey {{first_name}}, love what you are building at {{company}}.' }
    ],
    schedule: {
      timeZone: '(GMT+06:00) Dhaka',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      fromTime: '09:00 AM',
      toTime: '05:00 PM',
      maxPerDay: 25
    }
  }
];

export const initialContactLists: ContactList[] = [
  { id: 'list-1', name: 'New Contacts', contactCount: 7, verified: true, createdAt: 'Jul 24, 2026' },
  { id: 'list-2', name: 'Fast Contacts', contactCount: 9, verified: true, createdAt: 'Jul 25, 2026' },
  { id: 'list-3', name: 'Tech Executives US', contactCount: 142, verified: true, createdAt: 'Jul 20, 2026' }
];

export interface ContactItem extends Contact {
  listId: string;
}

export const initialContacts: ContactItem[] = [
  { id: 'c-1', listId: 'list-1', email: 'alex@company.com', firstName: 'Alex', lastName: 'Rivera', company: 'Company Inc.', role: 'Head of Growth', url: 'linkedin.com/in/arivera', status: 'valid' },
  { id: 'c-2', listId: 'list-1', email: 'sarah@startup.io', firstName: 'Sarah', lastName: 'Chen', company: 'Startup.io', role: 'CTO', url: 'linkedin.com/in/schen', status: 'invalid' },
  { id: 'c-3', listId: 'list-1', email: 'marcus@fintech.co', firstName: 'Marcus', lastName: 'Vance', company: 'Fintech Co', role: 'VP Engineering', url: 'linkedin.com/in/mvance', status: 'valid' },
  { id: 'c-4', listId: 'list-1', email: 'elena@catchallserver.org', firstName: 'Elena', lastName: 'Rostova', company: 'CatchAll Global', role: 'Marketing Director', url: 'linkedin.com/in/erostova', status: 'catch_all' },
  { id: 'c-5', listId: 'list-1', email: 'david@enterprise.com', firstName: 'David', lastName: 'Kim', company: 'Enterprise Corp', role: 'Chief Architect', url: 'linkedin.com/in/dkim', status: 'valid' },
  { id: 'c-6', listId: 'list-1', email: 'lisa@designstudio.io', firstName: 'Lisa', lastName: 'Patel', company: 'DesignStudio', role: 'Design Lead', url: 'linkedin.com/in/lpatel', status: 'valid' },
  { id: 'c-7', listId: 'list-1', email: 'robert@nonexistentdomain99.org', firstName: 'Robert', lastName: 'Fox', company: 'Fox Analytics', role: 'Founder', url: 'linkedin.com/in/rfox', status: 'invalid' },
  
  // Fast Contacts list
  { id: 'c-8', listId: 'list-2', email: 'jason@quickoutreach.io', firstName: 'Jason', lastName: 'Bourne', company: 'Quick Outreach', role: 'Growth Lead', status: 'valid' },
  { id: 'c-9', listId: 'list-2', email: 'amanda@cloudscale.net', firstName: 'Amanda', lastName: 'Waller', company: 'CloudScale', role: 'Operations VP', status: 'valid' },
  { id: 'c-10', listId: 'list-2', email: 'bruce@wayneenterprises.com', firstName: 'Bruce', lastName: 'Wayne', company: 'Wayne Ent', role: 'CEO', status: 'valid' }
];

export const initialTemplates: EmailTemplate[] = [
  {
    id: 'tpl-1',
    subject: 'ugfft',
    type: 'plain',
    inboxes: 'All Inboxes',
    priority: 'Medium',
    sentCount: 0,
    inboxPlacement: 0,
    warmupEnabled: true,
    content: 'Hey {{first_name}}, hope you are having a productive week. Let me know if you want to connect.'
  },
  {
    id: 'tpl-2',
    subject: 'Feedback on recent product update',
    type: 'html',
    inboxes: 'siamqwer436+warm007@gmail.com',
    priority: 'High',
    sentCount: 142,
    inboxPlacement: 98,
    warmupEnabled: true,
    content: '<h2>Hello {{first_name}}</h2><p>We recently rolled out brand new features for {{company}}.</p>'
  }
];

export const initialVerifications: VerificationResult[] = [
  {
    id: 'ver-1',
    fileName: 'SaaS_Leads_Batch1.csv',
    emailsCount: 260,
    validCount: 235,
    invalidCount: 15,
    catchAllCount: 7,
    disposableCount: 2,
    roleCount: 1,
    status: 'Completed',
    createdAt: 'Jul 22, 2026',
    details: [
      { id: 'd-1', email: 'john.collison@stripe.com', category: 'deliverable', reason: 'Valid SMTP & MX Record', score: 99, domain: 'stripe.com' },
      { id: 'd-2', email: 'patrick@stripe.com', category: 'deliverable', reason: 'Valid SMTP & MX Record', score: 99, domain: 'stripe.com' },
      { id: 'd-3', email: 'info@unknownstarters.io', category: 'accept_all', reason: 'Accept-All Server Configuration', score: 70, domain: 'unknownstarters.io' },
      { id: 'd-4', email: 'test_fake99123@invalidmail.xyz', category: 'undeliverable', reason: 'No MX Record Found', score: 0, domain: 'invalidmail.xyz' },
      { id: 'd-5', email: 'user84391@tempmail.org', category: 'disposable', reason: 'Disposable / Temporary Mail Service', score: 5, domain: 'tempmail.org' },
      { id: 'd-6', email: 'admin@techcorp.com', category: 'role_based', reason: 'Role-based Mailbox (admin@)', score: 65, domain: 'techcorp.com' },
      { id: 'd-7', email: 'bad.syntax@@domain..com', category: 'undeliverable', reason: 'Syntax Error', score: 0, domain: 'domain.com' },
      { id: 'd-8', email: 'sales@b2bgrowth.co', category: 'role_based', reason: 'Role-based Mailbox (sales@)', score: 60, domain: 'b2bgrowth.co' }
    ]
  },
  {
    id: 'ver-2',
    fileName: 'Tech_Founders_Q3.xlsx',
    emailsCount: 120,
    validCount: 110,
    invalidCount: 6,
    catchAllCount: 3,
    disposableCount: 1,
    roleCount: 0,
    status: 'Completed',
    createdAt: 'Jul 26, 2026',
    details: [
      { id: 'd-20', email: 'ceo@innovate.ai', category: 'deliverable', reason: 'Valid SMTP & Active Inbox', score: 98, domain: 'innovate.ai' },
      { id: 'd-21', email: 'fakeuser@ghostdomain.net', category: 'undeliverable', reason: 'Domain Expired / No MX', score: 0, domain: 'ghostdomain.net' }
    ]
  }
];
