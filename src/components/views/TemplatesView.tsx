import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Check,
  Code
} from 'lucide-react';
import { EmailTemplate, MainTab } from '../../types';

interface TemplatesViewProps {
  templates: EmailTemplate[];
  onNavigate: (tab: MainTab) => void;
  onCreateTemplate: (type: 'plain' | 'html') => void;
  onEditTemplate: (template: EmailTemplate) => void;
  onToggleWarmup: (id: string) => void;
  onDeleteTemplate: (id: string) => void;
  onSelectTemplate?: (template: EmailTemplate) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  templates,
  onNavigate,
  onCreateTemplate,
  onEditTemplate,
  onToggleWarmup,
  onDeleteTemplate,
  onSelectTemplate
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = templates.filter(t => t.subject.toLowerCase().includes(searchTerm.toLowerCase()));

  if (templates.length === 0) {
    return (
      <div className="p-12 max-w-2xl mx-auto text-center space-y-4 my-12 bg-white rounded-3xl border border-slate-200 shadow-2xs">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Craft your first template</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Shape warmup emails that sound like you. Start with a plain text note or design something richer in HTML.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button 
            onClick={() => onCreateTemplate('plain')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all"
          >
            Create Plain Text
          </button>
          <button 
            onClick={() => onCreateTemplate('html')}
            className="px-5 py-2.5 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold rounded-xl text-xs transition-all"
          >
            Create HTML
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Template</h1>
          <p className="text-sm text-slate-500">Manage warmup email content templates.</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => onCreateTemplate('plain')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Plain Text</span>
          </button>
          <button 
            onClick={() => onCreateTemplate('html')}
            className="px-4 py-2 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
          >
            <Code className="w-4 h-4" />
            <span>Create HTML</span>
          </button>
        </div>
      </div>

      {/* Filter and Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by subject..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="p-3.5 w-10 text-center">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="p-3.5">Warm Up</th>
                <th className="p-3.5 text-slate-800">Subject</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Inboxes</th>
                <th className="p-3.5">Warmup Priority</th>
                <th className="p-3.5">Sent</th>
                <th className="p-3.5">Inbox Placement</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((tpl) => (
                <tr key={tpl.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-3.5">
                    <button 
                      onClick={() => onToggleWarmup(tpl.id)}
                      className={`w-9 h-5 rounded-full transition-colors relative ${tpl.warmupEnabled ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <span className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${tpl.warmupEnabled ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">
                    <button 
                      onClick={() => onSelectTemplate && onSelectTemplate(tpl)}
                      className="flex items-center gap-1.5 hover:text-blue-600 text-left transition-colors group"
                    >
                      <span className="group-hover:underline">{tpl.subject}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                    </button>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px] border border-slate-200">
                      {tpl.type === 'plain' ? 'Plain Text' : 'HTML'}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium text-slate-700">{tpl.inboxes}</td>
                  <td className="p-3.5 font-semibold text-amber-700">{tpl.priority}</td>
                  <td className="p-3.5 font-bold text-slate-800">{tpl.sentCount}</td>
                  <td className="p-3.5 font-bold text-blue-600">{tpl.inboxPlacement}%</td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onEditTemplate(tpl)} className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDeleteTemplate(tpl.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
