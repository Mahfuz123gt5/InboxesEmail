import React, { useState } from 'react';
import { 
  UploadCloud, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  FileSpreadsheet, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { ContactList, MainTab } from '../../types';

interface ContactImportWizardViewProps {
  onNavigate: (tab: MainTab) => void;
  onImportComplete: (newList: ContactList) => void;
}

export const ContactImportWizardView: React.FC<ContactImportWizardViewProps> = ({
  onNavigate,
  onImportComplete
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [fileName, setFileName] = useState<string | null>('Fast_Leads_Upload.csv');
  const [listName, setListName] = useState('Fast Contacts');
  const [verifyContacts, setVerifyContacts] = useState(true);

  // Column Mappings for Step 2
  const [mappings, setMappings] = useState([
    { csvHeader: 'URL', varType: 'Custom Variable', tag: 'URL', example: 'https://www.zilbert.com/real_estate/broker/mark-zilbert' },
    { csvHeader: 'Email', varType: 'Email', tag: 'email', example: 'mark.zilbert@zilbert.com' },
    { csvHeader: 'First Name', varType: 'First Name', tag: 'first_name', example: 'Mark' },
    { csvHeader: 'Last Name', varType: 'Last Name', tag: 'last_name', example: 'Zilbert' },
    { csvHeader: 'Company', varType: 'Company', tag: 'company', example: 'Zilbert Realty' }
  ]);

  const handleFinishImport = () => {
    const newList: ContactList = {
      id: `list-${Date.now()}`,
      name: listName || 'Imported List',
      contactCount: 9,
      verified: verifyContacts,
      createdAt: 'Just now'
    };
    onImportComplete(newList);
    onNavigate('contacts');
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Stepper Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          {[
            { s: 1, label: 'Upload File' },
            { s: 2, label: 'Custom Variables' },
            { s: 3, label: 'Settings' }
          ].map((item, idx) => (
            <React.Fragment key={item.s}>
              <div 
                onClick={() => setStep(item.s as any)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  step === item.s 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' 
                    : step > item.s 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-slate-100 text-slate-400'
                }`}>
                  {step > item.s ? <Check className="w-4 h-4" /> : item.s}
                </div>
                <span className={`text-xs font-bold ${step === item.s ? 'text-blue-600' : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </div>
              {idx < 2 && <div className="flex-1 h-0.5 bg-slate-200 mx-3" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STEP 1: UPLOAD FILE */}
      {step === 1 && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6 animate-in fade-in text-center">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Upload Prospect List CSV</h2>
            <p className="text-xs text-slate-500 mt-1">Upload your spreadsheet containing emails and contact variables up to 10MB.</p>
          </div>

          <div className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/30 p-10 rounded-2xl cursor-pointer transition-colors space-y-3">
            <UploadCloud className="w-12 h-12 text-blue-600 mx-auto" />
            <div>
              <p className="text-xs font-bold text-slate-800">Click to Upload or drag and drop your prospect list CSV</p>
              <p className="text-[11px] text-slate-400">CSV files supported up to 10MB</p>
            </div>
            {fileName && (
              <span className="inline-block px-3 py-1 bg-white border border-blue-200 text-blue-700 text-xs font-bold rounded-lg shadow-2xs">
                📄 {fileName}
              </span>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: CUSTOM VARIABLES */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Map CSV Columns to Custom Variables</h2>
            <p className="text-xs text-slate-500">Ensure each column maps correctly to campaign replacement tags.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5 w-10"><input type="checkbox" checked readOnly className="rounded text-blue-600" /></th>
                  <th className="p-3.5">CSV Column Name</th>
                  <th className="p-3.5">Mapped Variable Type</th>
                  <th className="p-3.5">Variable Tag</th>
                  <th className="p-3.5">Sample Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mappings.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3.5 text-center"><input type="checkbox" checked readOnly className="rounded text-blue-600" /></td>
                    <td className="p-3.5 font-bold text-slate-900">{m.csvHeader}</td>
                    <td className="p-3.5">
                      <select 
                        value={m.varType} 
                        onChange={e => {
                          const val = e.target.value;
                          setMappings(prev => prev.map((item, i) => i === idx ? { ...item, varType: val } : item));
                        }}
                        className="px-2.5 py-1 border border-slate-200 rounded-lg text-xs font-semibold"
                      >
                        <option value={m.varType}>{m.varType}</option>
                        <option value="Custom Variable">Custom Variable</option>
                        <option value="Email">Email</option>
                        <option value="First Name">First Name</option>
                        <option value="Last Name">Last Name</option>
                      </select>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold text-[10px] border border-blue-200">
                        {`{{${m.tag}}}`}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600 truncate max-w-xs">{m.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STEP 3: SETTINGS */}
      {step === 3 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 animate-in fade-in max-w-lg mx-auto">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">List Settings</h2>
            <p className="text-xs text-slate-500">Name your new contact list and verify emails.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact List Name</label>
              <input 
                type="text" 
                value={listName}
                onChange={e => setListName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-slate-900">Verify Imported Contacts</h4>
                <p className="text-[11px] text-slate-500">Automatically filter out bounce risks and invalid domains.</p>
              </div>
              <button 
                onClick={() => setVerifyContacts(!verifyContacts)}
                className={`w-11 h-6 rounded-full transition-colors relative ${verifyContacts ? 'bg-blue-600' : 'bg-slate-300'}`}
              >
                <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${verifyContacts ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        <button 
          onClick={() => {
            if (step === 1) onNavigate('contacts');
            else setStep((step - 1) as any);
          }}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{step === 1 ? 'Cancel' : 'Back'}</span>
        </button>

        {step < 3 ? (
          <button 
            onClick={() => setStep((step + 1) as any)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <span>Continue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={handleFinishImport}
            className="px-7 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-blue-500/20"
          >
            Import 9 Contacts
          </button>
        )}
      </div>

    </div>
  );
};
