import React, { useState } from 'react';
import { X, Users, Plus, Save } from 'lucide-react';
import { ContactList } from '../../types';

interface CreateContactListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateList: (list: ContactList) => void;
}

export const CreateContactListModal: React.FC<CreateContactListModalProps> = ({ isOpen, onClose, onCreateList }) => {
  const [listName, setListName] = useState('');
  const [contactEmails, setContactEmails] = useState('lead1@company.com\nlead2@company.com\nlead3@company.com');

  if (!isOpen) return null;

  const handleSubmit = () => {
    const emailsList = contactEmails.split('\n').filter(e => e.trim().length > 0);
    const newList: ContactList = {
      id: `list-${Date.now()}`,
      name: listName || 'New Contact List',
      contactCount: emailsList.length || 3,
      verified: true,
      createdAt: 'Just now'
    };
    onCreateList(newList);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Create Contact List</h3>
              <p className="text-xs text-slate-500">Add prospects manually</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">List Name</label>
            <input 
              type="text" 
              placeholder="e.g. Q3 Founders Target"
              value={listName}
              onChange={e => setListName(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Contact Emails (One per line)</label>
            <textarea 
              rows={5}
              value={contactEmails}
              onChange={e => setContactEmails(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl">
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20"
          >
            Create List
          </button>
        </div>
      </div>
    </div>
  );
};
