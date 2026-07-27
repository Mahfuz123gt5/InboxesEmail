import React, { useState } from 'react';
import { 
  Users, 
  Settings as SettingsIcon, 
  Send, 
  Clock, 
  CheckCircle, 
  Plus, 
  Trash2, 
  Mail, 
  Clock3, 
  ChevronRight, 
  ChevronLeft,
  Check,
  Code,
  Eye,
  Type
} from 'lucide-react';
import { Campaign, ContactList, Inbox, MainTab, SequenceStep } from '../../types';

interface CampaignWizardViewProps {
  contactLists: ContactList[];
  inboxes: Inbox[];
  onNavigate: (tab: MainTab) => void;
  onSaveCampaign: (campaign: Partial<Campaign>) => void;
  onCreateContactListModal: () => void;
}

export const CampaignWizardView: React.FC<CampaignWizardViewProps> = ({
  contactLists,
  inboxes,
  onNavigate,
  onSaveCampaign,
  onCreateContactListModal
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [campaignName, setCampaignName] = useState('Untitled campaign');
  const [selectedListId, setSelectedListId] = useState<string>(contactLists[0]?.id || '');
  const [selectedSenderEmail, setSelectedSenderEmail] = useState<string>(inboxes[0]?.email || '');

  // Sequence state
  const [sequenceSteps, setSequenceSteps] = useState<SequenceStep[]>([
    { id: 'step-1', type: 'email', subject: 'Email Subject', bodyFormat: 'html', bodyContent: '<p>Hi {{first_name}},</p><p>Interested in scaling your outbound?</p>' },
    { id: 'step-2', type: 'wait', waitDays: 1 },
    { id: 'step-3', type: 'email', subject: 'Re: Email Subject', bodyFormat: 'html', bodyContent: '<p>Following up on my previous message {{first_name}}.</p>' }
  ]);
  const [activeStepId, setActiveStepId] = useState<string>('step-1');
  const [editorFormat, setEditorFormat] = useState<'visual' | 'html' | 'preview'>('html');
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [testSentMsg, setTestSentMsg] = useState(false);

  // Schedule state
  const [timeZone, setTimeZone] = useState('(GMT+06:00) Dhaka');
  const [scheduleDays, setScheduleDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [fromTime, setFromTime] = useState('09:00 AM');
  const [toTime, setToTime] = useState('05:00 PM');
  const [maxEmailsPerDay, setMaxEmailsPerDay] = useState(10);

  const selectedStep = sequenceSteps.find(s => s.id === activeStepId) || sequenceSteps[0];
  const selectedList = contactLists.find(l => l.id === selectedListId);

  const updateActiveStep = (fields: Partial<SequenceStep>) => {
    setSequenceSteps(sequenceSteps.map(s => s.id === activeStepId ? { ...s, ...fields } : s));
  };

  const addSequenceStep = (type: 'email' | 'wait') => {
    const newId = `step-${Date.now()}`;
    const newStep: SequenceStep = type === 'email' 
      ? { id: newId, type: 'email', subject: 'Follow up email', bodyFormat: 'html', bodyContent: '<p>Hi {{first_name}},</p>' }
      : { id: newId, type: 'wait', waitDays: 1 };
    
    setSequenceSteps([...sequenceSteps, newStep]);
    setActiveStepId(newId);
  };

  const removeSequenceStep = (id: string) => {
    if (sequenceSteps.length <= 1) return;
    const remaining = sequenceSteps.filter(s => s.id !== id);
    setSequenceSteps(remaining);
    setActiveStepId(remaining[0].id);
  };

  const insertVariable = (varName: string) => {
    if (!selectedStep) return;
    const current = selectedStep.bodyContent || '';
    updateActiveStep({ bodyContent: current + ` {{${varName}}}` });
  };

  const handleLaunch = () => {
    onSaveCampaign({
      name: campaignName,
      status: 'running',
      contactListId: selectedListId,
      senderEmail: selectedSenderEmail,
      sequenceSteps,
      schedule: {
        timeZone,
        days: scheduleDays,
        fromTime,
        toTime,
        maxPerDay: maxEmailsPerDay
      }
    });
    onNavigate('campaigns');
  };

  const toggleScheduleDay = (day: string) => {
    if (scheduleDays.includes(day)) {
      setScheduleDays(scheduleDays.filter(d => d !== day));
    } else {
      setScheduleDays([...scheduleDays, day]);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Wizard Header Stepper */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {[
            { step: 1, label: 'Leads', icon: Users },
            { step: 2, label: 'Settings', icon: SettingsIcon },
            { step: 3, label: 'Sequence', icon: Send },
            { step: 4, label: 'Schedule', icon: Clock },
            { step: 5, label: 'Review', icon: CheckCircle }
          ].map((item, idx) => {
            const IconComponent = item.icon;
            const isCompleted = currentStep > item.step;
            const isCurrent = currentStep === item.step;

            return (
              <React.Fragment key={item.step}>
                <div 
                  onClick={() => setCurrentStep(item.step as any)}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCurrent 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' 
                      : isCompleted 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : item.step}
                  </div>
                  <span className={`text-xs font-bold ${isCurrent ? 'text-blue-600' : 'text-slate-500'}`}>
                    {item.label}
                  </span>
                </div>
                {idx < 4 && <div className="flex-1 h-0.5 bg-slate-200 mx-2" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* STEP 1: LEADS */}
      {currentStep === 1 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Select a Contact List</h2>
              <p className="text-xs text-slate-500">Choose the leads you want to send this campaign to.</p>
            </div>
            <button 
              onClick={onCreateContactListModal}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl text-xs border border-blue-200 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Contact List</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5 w-10"></th>
                  <th className="p-3.5 text-slate-800">List Name</th>
                  <th className="p-3.5">Verification</th>
                  <th className="p-3.5 text-right">Number of Contacts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contactLists.map((list) => (
                  <tr 
                    key={list.id} 
                    onClick={() => setSelectedListId(list.id)}
                    className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${selectedListId === list.id ? 'bg-blue-50/60 font-semibold' : ''}`}
                  >
                    <td className="p-3.5 text-center">
                      <input 
                        type="radio" 
                        name="contactList" 
                        checked={selectedListId === list.id} 
                        onChange={() => setSelectedListId(list.id)} 
                        className="text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">{list.name}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        ✓ Verified
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-bold text-slate-800">{list.contactCount} prospects</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STEP 2: SETTINGS */}
      {currentStep === 2 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 animate-in fade-in max-w-2xl mx-auto">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Campaign Settings</h2>
            <p className="text-xs text-slate-500">Configure campaign title and sender mailbox.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Campaign Name</label>
              <input 
                type="text" 
                value={campaignName}
                onChange={e => setCampaignName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sender Account</label>
              <select 
                value={selectedSenderEmail}
                onChange={e => setSelectedSenderEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {inboxes.map(inbox => (
                  <option key={inbox.id} value={inbox.email}>{inbox.email} ({inbox.plan} Plan)</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: SEQUENCE BUILDER */}
      {currentStep === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
          
          {/* Timeline Block List (1 col) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Sequence Blocks</h3>

            <div className="space-y-3">
              {sequenceSteps.map((step, idx) => (
                <div 
                  key={step.id} 
                  onClick={() => setActiveStepId(step.id)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all relative ${
                    activeStepId === step.id 
                      ? 'border-blue-600 bg-blue-50/40 shadow-xs' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {step.type === 'email' ? <Mail className="w-4 h-4 text-blue-600" /> : <Clock3 className="w-4 h-4 text-amber-600" />}
                      <span className="font-bold text-xs text-slate-800">
                        {step.type === 'email' ? `Email #${idx + 1}` : `Wait ${step.waitDays} day(s)`}
                      </span>
                    </div>

                    {sequenceSteps.length > 1 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeSequenceStep(step.id); }}
                        className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <button 
                onClick={() => addSequenceStep('email')}
                className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl text-xs border border-blue-200 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Email</span>
              </button>
              <button 
                onClick={() => addSequenceStep('wait')}
                className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Delay</span>
              </button>
            </div>
          </div>

          {/* Right Content Editor (2 cols) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            {selectedStep.type === 'email' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Subject</label>
                  <input 
                    type="text" 
                    value={selectedStep.subject || ''}
                    onChange={e => updateActiveStep({ subject: e.target.value })}
                    placeholder="Enter email subject line..."
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Editor Mode Tabs */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditorFormat('visual')} 
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${editorFormat === 'visual' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      <Type className="w-3.5 h-3.5" /> Visual
                    </button>
                    <button 
                      onClick={() => setEditorFormat('html')} 
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${editorFormat === 'html' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      <Code className="w-3.5 h-3.5" /> HTML
                    </button>
                    <button 
                      onClick={() => setEditorFormat('preview')} 
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${editorFormat === 'preview' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                  </div>

                  {/* Variables */}
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="font-bold text-slate-500 mr-1">Variables:</span>
                    {['first_name', 'company', 'email'].map(v => (
                      <button 
                        key={v}
                        onClick={() => insertVariable(v)}
                        className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-mono font-bold"
                      >
                        {`{{${v}}}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editor Input Area */}
                {editorFormat !== 'preview' ? (
                  <textarea 
                    rows={8}
                    value={selectedStep.bodyContent || ''}
                    onChange={e => updateActiveStep({ bodyContent: e.target.value })}
                    placeholder="Write email content or HTML template here..."
                    className="w-full p-4 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                  />
                ) : (
                  <div 
                    className="p-4 border border-slate-200 rounded-xl bg-white min-h-[200px] text-xs text-slate-800 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedStep.bodyContent || '<p>Empty message body</p>' }}
                  />
                )}

                {/* Send Test Email Row */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter email to test" 
                    value={testEmailAddress}
                    onChange={e => setTestEmailAddress(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none"
                  />
                  <button 
                    onClick={() => {
                      if (!testEmailAddress) return;
                      setTestSentMsg(true);
                      setTimeout(() => setTestSentMsg(false), 2500);
                    }}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold"
                  >
                    Send Test Email
                  </button>
                </div>
                {testSentMsg && <p className="text-xs text-emerald-600 font-semibold">Test email dispatched successfully!</p>}
              </>
            ) : (
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-slate-900">Wait Delay Block</h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Delay Duration (Days)</label>
                  <input 
                    type="number" 
                    value={selectedStep.waitDays || 1}
                    onChange={e => updateActiveStep({ waitDays: Number(e.target.value) })}
                    className="w-32 px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* STEP 4: SCHEDULE */}
      {currentStep === 4 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 animate-in fade-in max-w-2xl mx-auto">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Schedule & Daily Limits</h2>
            <p className="text-xs text-slate-500">Define sending window and max daily quota.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Time Zone</label>
              <select 
                value={timeZone}
                onChange={e => setTimeZone(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
              >
                <option>(GMT+06:00) Dhaka</option>
                <option>(GMT-05:00) Eastern Time (US)</option>
                <option>(GMT+00:00) London</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Send on</label>
              <div className="flex flex-wrap gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleScheduleDay(day)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      scheduleDays.includes(day) ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">From Time</label>
                <input type="text" value={fromTime} onChange={e => setFromTime(e.target.value)} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">To Time</label>
                <input type="text" value={toTime} onChange={e => setToTime(e.target.value)} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Max Emails Sent per Day</label>
              <div className="flex items-center w-36 border border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => setMaxEmailsPerDay(Math.max(1, maxEmailsPerDay - 5))} className="px-3 py-2 bg-slate-100 font-bold text-xs">-</button>
                <input type="number" value={maxEmailsPerDay} onChange={e => setMaxEmailsPerDay(Number(e.target.value))} className="w-full text-center text-xs font-bold" />
                <button onClick={() => setMaxEmailsPerDay(maxEmailsPerDay + 5)} className="px-3 py-2 bg-slate-100 font-bold text-xs">+</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: REVIEW */}
      {currentStep === 5 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 animate-in fade-in max-w-2xl mx-auto">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Campaign Summary Review</h2>
            <p className="text-xs text-slate-500">Review campaign setup before launching.</p>
          </div>

          <div className="space-y-4 text-xs font-medium text-slate-700">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Leads List</p>
                <p className="text-slate-600">Sending to <strong>{selectedList?.name || 'Selected List'}</strong> ({selectedList?.contactCount || 7} prospects)</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Settings</p>
                <p className="text-slate-600">Campaign name: <strong>{campaignName}</strong></p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Sequence & Sender</p>
                <p className="text-slate-600">Sender Account: <strong>{selectedSenderEmail}</strong> | {sequenceSteps.length} sequence steps configured</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Schedule</p>
                <p className="text-slate-600">Sending on {scheduleDays.join(', ')}; {fromTime} - {toTime}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        <button 
          onClick={() => {
            if (currentStep === 1) onNavigate('campaigns');
            else setCurrentStep((currentStep - 1) as any);
          }}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{currentStep === 1 ? 'Cancel' : 'Back'}</span>
        </button>

        {currentStep < 5 ? (
          <button 
            onClick={() => setCurrentStep((currentStep + 1) as any)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all"
          >
            <span>Continue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={handleLaunch}
            className="px-7 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Launch Campaign Now</span>
          </button>
        )}
      </div>

    </div>
  );
};
