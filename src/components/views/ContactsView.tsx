import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Upload, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronRight,
  FileSpreadsheet,
  MoreVertical,
  Edit2,
  Trash2,
  Download,
  Settings,
  Send,
  Check,
  X,
  Filter,
  Layers,
  Sparkles,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { ContactList, MainTab, Contact } from '../../types';
import { initialContacts, ContactItem } from '../../mockData';

interface ContactsViewProps {
  contactLists: ContactList[];
  onNavigate: (tab: MainTab) => void;
  onOpenImportWizard: () => void;
  onCreateContactListModal: () => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({
  contactLists: initialListsProp,
  onNavigate,
  onOpenImportWizard,
  onCreateContactListModal
}) => {
  // Local Contact Lists state so user can create, rename, delete
  const [lists, setLists] = useState<ContactList[]>(initialListsProp);
  const [selectedListId, setSelectedListId] = useState<string>(initialListsProp[0]?.id || 'list-1');
  const [listSearchQuery, setListSearchQuery] = useState('');
  
  // Contacts data state
  const [contacts, setContacts] = useState<ContactItem[]>(initialContacts);
  const [tableSearchQuery, setTableSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'valid' | 'invalid' | 'catch_all'>('all');

  // Selected row IDs for batch actions
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);

  // Three-dot list action menu ID
  const [activeListMenuId, setActiveListMenuId] = useState<string | null>(null);

  // Inline Editing State
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    role: string;
  }>({ firstName: '', lastName: '', email: '', company: '', role: '' });

  // Column Mapping Modal State
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);
  const [columnMappings, setColumnMappings] = useState([
    { csvHeader: 'Column A (full_name)', mappedField: 'First Name' },
    { csvHeader: 'Column B (work_email)', mappedField: 'Email' },
    { csvHeader: 'Column C (organization)', mappedField: 'Company' },
    { csvHeader: 'Column D (designation)', mappedField: 'Role' },
    { csvHeader: 'Column E (social_profile)', mappedField: 'URL' },
  ]);

  // Import Leads Header Dropdown Menu State
  const [isImportMenuOpen, setIsImportMenuOpen] = useState(false);

  // Rename List Modal / Prompt
  const [renamingListId, setRenamingListId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // Get current active list
  const currentList = lists.find(l => l.id === selectedListId) || lists[0];

  // Get contacts for the selected list
  const currentListContacts = contacts.filter(c => c.listId === selectedListId || (!c.listId && selectedListId === 'list-1'));

  // Health summary metrics
  const validCount = currentListContacts.filter(c => c.status === 'valid').length;
  const invalidCount = currentListContacts.filter(c => c.status === 'invalid').length;
  const catchAllCount = currentListContacts.filter(c => c.status === 'catch_all').length;

  // Filtered contacts based on search and health status pill filter
  const filteredContacts = currentListContacts.filter(c => {
    const matchesSearch = 
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(tableSearchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filtered contact lists for sidebar search
  const filteredLists = lists.filter(l => l.name.toLowerCase().includes(listSearchQuery.toLowerCase()));

  // Handlers
  const handleSelectAllRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedContactIds(filteredContacts.map(c => c.id));
    } else {
      setSelectedContactIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedContactIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    setSelectedContactIds(prev => prev.filter(i => i !== id));
  };

  const handleDeleteSelected = () => {
    setContacts(prev => prev.filter(c => !selectedContactIds.includes(c.id)));
    setSelectedContactIds([]);
  };

  const handleStartInlineEdit = (c: ContactItem) => {
    setEditingContactId(c.id);
    setEditForm({
      firstName: c.firstName || '',
      lastName: c.lastName || '',
      email: c.email || '',
      company: c.company || '',
      role: c.role || ''
    });
  };

  const handleSaveInlineEdit = (id: string) => {
    setContacts(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          firstName: editForm.firstName,
          lastName: editForm.lastName,
          email: editForm.email,
          company: editForm.company,
          role: editForm.role
        };
      }
      return c;
    }));
    setEditingContactId(null);
  };

  const handleRenameList = (listId: string) => {
    const l = lists.find(item => item.id === listId);
    if (l) {
      setRenamingListId(listId);
      setRenameValue(l.name);
    }
    setActiveListMenuId(null);
  };

  const handleSaveRename = () => {
    if (renamingListId && renameValue.trim()) {
      setLists(prev => prev.map(l => l.id === renamingListId ? { ...l, name: renameValue.trim() } : l));
      setRenamingListId(null);
    }
  };

  const handleDeleteList = (listId: string) => {
    if (lists.length <= 1) {
      alert("You must keep at least one contact list.");
      return;
    }
    setLists(prev => prev.filter(l => l.id !== listId));
    setContacts(prev => prev.filter(c => c.listId !== listId));
    if (selectedListId === listId) {
      const remaining = lists.filter(l => l.id !== listId);
      setSelectedListId(remaining[0]?.id || '');
    }
    setActiveListMenuId(null);
  };

  const handleLaunchCampaign = () => {
    alert(`Connecting list "${currentList?.name}" (${currentListContacts.length} contacts) to new campaign outreach...`);
    onNavigate('campaign-new');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" />
            <span>Contacts</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage prospect lead lists and custom variable column mappings.
          </p>
        </div>

        {/* Search & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          
          {/* Header Global Search Input */}
          <div className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search contacts..."
              value={tableSearchQuery}
              onChange={e => setTableSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>

          {/* Secondary Action Button: Export List */}
          <button 
            onClick={() => alert(`Exporting ${currentList?.name} contacts to CSV...`)}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition-all"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export List</span>
          </button>

          {/* Primary Action Button: + Import Leads Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsImportMenuOpen(!isImportMenuOpen)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Import Leads</span>
            </button>

            {isImportMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 animate-in fade-in">
                <button 
                  onClick={() => { setIsImportMenuOpen(false); onOpenImportWizard(); }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 font-bold flex items-center gap-2 text-left"
                >
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span>Upload CSV File</span>
                </button>
                <button 
                  onClick={() => { setIsImportMenuOpen(false); onCreateContactListModal(); }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 font-bold flex items-center gap-2 text-left"
                >
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>Create List Manually</span>
                </button>
                <button 
                  onClick={() => { setIsImportMenuOpen(false); onNavigate('lead-search'); }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 font-bold flex items-center gap-2 text-left"
                >
                  <Search className="w-4 h-4 text-purple-600" />
                  <span>Lead Search Integration</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT: Sidebar (Lists) + Contact Data Table */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR: CONTACT LISTS (Requirement 2) */}
        <div className="lg:col-span-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between h-fit">
          
          <div className="space-y-3">
            {/* Sidebar Header & + New List */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                CONTACT LISTS ({lists.length})
              </span>
              <button 
                onClick={onCreateContactListModal}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New List</span>
              </button>
            </div>

            {/* List Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search lists..."
                value={listSearchQuery}
                onChange={e => setListSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Contact Lists Items */}
            <div className="space-y-1.5 pt-1">
              {filteredLists.map(list => {
                const isSelected = selectedListId === list.id;
                const count = contacts.filter(c => c.listId === list.id || (!c.listId && list.id === 'list-1')).length;

                return (
                  <div 
                    key={list.id}
                    onClick={() => setSelectedListId(list.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all relative group flex items-center justify-between ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-50/70 shadow-2xs font-bold text-slate-900' 
                        : 'border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <h4 className="text-xs font-bold truncate flex items-center gap-1.5">
                        <Layers className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span>{list.name}</span>
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium">{list.createdAt}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {count}
                      </span>

                      {/* Three-dot List Menu Button */}
                      <div className="relative" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => setActiveListMenuId(activeListMenuId === list.id ? null : list.id)}
                          className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>

                        {activeListMenuId === list.id && (
                          <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1 text-left">
                            <button 
                              onClick={() => handleRenameList(list.id)}
                              className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                              <span>Rename</span>
                            </button>
                            <button 
                              onClick={() => {
                                alert(`Exporting ${list.name}...`);
                                setActiveListMenuId(null);
                              }}
                              className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                            >
                              <Download className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Export</span>
                            </button>
                            <button 
                              onClick={() => handleDeleteList(list.id)}
                              className="w-full px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* MAIN DATA TABLE AREA (3 Columns) - No big blue banner (Requirement 1) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* List Toolbar & Header Summary Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            
            {/* Selected List Name & Health Summary */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900">{currentList?.name}</h2>
                <span className="text-xs font-bold text-slate-400">({currentListContacts.length} prospects)</span>
              </div>

              {/* Health Badges Pill Header */}
              <div className="flex items-center gap-2 text-[11px] font-bold">
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  🟢 Valid: {validCount}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                  🔴 Invalid: {invalidCount}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                  🟡 Risky: {catchAllCount}
                </span>
              </div>
            </div>

            {/* Column Mappings & Direct Campaign Connect Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMappingModalOpen(true)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
              >
                <Settings className="w-3.5 h-3.5 text-blue-600" />
                <span>⚙️ Map Columns</span>
              </button>

              <button 
                onClick={handleLaunchCampaign}
                className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to Campaign</span>
              </button>
            </div>

          </div>

          {/* Verification Health Breakdown Filter Bar (Requirement 2) */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/70 p-2 rounded-xl border border-slate-200 text-xs">
            
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-500 ml-1" />
              <span className="font-bold text-slate-600 mr-2">Filter Health:</span>
              
              <button 
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  statusFilter === 'all' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({currentListContacts.length})
              </button>

              <button 
                onClick={() => setStatusFilter('valid')}
                className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  statusFilter === 'valid' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <span>🟢 Valid ({validCount})</span>
              </button>

              <button 
                onClick={() => setStatusFilter('invalid')}
                className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  statusFilter === 'invalid' ? 'bg-rose-600 text-white shadow-2xs' : 'text-rose-700 hover:bg-rose-100'
                }`}
              >
                <span>🔴 Invalid ({invalidCount})</span>
              </button>

              <button 
                onClick={() => setStatusFilter('catch_all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  statusFilter === 'catch_all' ? 'bg-amber-600 text-white shadow-2xs' : 'text-amber-700 hover:bg-amber-100'
                }`}
              >
                <span>🟡 Risky ({catchAllCount})</span>
              </button>
            </div>

            {selectedContactIds.length > 0 && (
              <div className="flex items-center gap-2 animate-in fade-in">
                <span className="font-bold text-slate-700">{selectedContactIds.length} selected</span>
                <button 
                  onClick={handleDeleteSelected}
                  className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete Selected</span>
                </button>
              </div>
            )}

          </div>

          {/* REAL CONTACT DATA TABLE (Requirement 1 & 4) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            {filteredContacts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5 w-10 text-center">
                        <input 
                          type="checkbox" 
                          checked={selectedContactIds.length === filteredContacts.length && filteredContacts.length > 0}
                          onChange={handleSelectAllRows}
                          className="rounded text-blue-600 focus:ring-blue-500" 
                        />
                      </th>
                      <th className="p-3.5 text-slate-900">Name</th>
                      <th className="p-3.5 text-slate-900">Email</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Company & Role</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredContacts.map(c => {
                      const isEditing = editingContactId === c.id;
                      const isSelected = selectedContactIds.includes(c.id);

                      return (
                        <tr 
                          key={c.id} 
                          className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-blue-50/20' : ''}`}
                        >
                          <td className="p-3.5 text-center">
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={() => handleToggleRow(c.id)}
                              className="rounded text-blue-600 focus:ring-blue-500" 
                            />
                          </td>

                          {/* Name Field (Inline Editable) */}
                          <td className="p-3.5 font-bold text-slate-900">
                            {isEditing ? (
                              <div className="flex gap-1">
                                <input 
                                  type="text" 
                                  value={editForm.firstName}
                                  onChange={e => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                                  placeholder="First"
                                  className="w-20 px-1.5 py-0.5 border border-slate-300 rounded text-xs font-medium"
                                />
                                <input 
                                  type="text" 
                                  value={editForm.lastName}
                                  onChange={e => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                                  placeholder="Last"
                                  className="w-20 px-1.5 py-0.5 border border-slate-300 rounded text-xs font-medium"
                                />
                              </div>
                            ) : (
                              <span>{c.firstName || ''} {c.lastName || ''}</span>
                            )}
                          </td>

                          {/* Email Field (Inline Editable) */}
                          <td className="p-3.5 font-mono text-slate-800 font-semibold">
                            {isEditing ? (
                              <input 
                                type="email" 
                                value={editForm.email}
                                onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                                className="w-48 px-2 py-0.5 border border-blue-500 rounded text-xs font-mono font-bold bg-blue-50/50"
                              />
                            ) : (
                              <span>{c.email}</span>
                            )}
                          </td>

                          {/* Status Badge */}
                          <td className="p-3.5">
                            {c.status === 'valid' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Valid</span>
                              </span>
                            )}
                            {c.status === 'invalid' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200 text-[11px]">
                                <XCircle className="w-3 h-3 text-rose-600" />
                                <span>Bounce / Invalid</span>
                              </span>
                            )}
                            {c.status === 'catch_all' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200 text-[11px]">
                                <AlertTriangle className="w-3 h-3 text-amber-600" />
                                <span>Catch-All</span>
                              </span>
                            )}
                          </td>

                          {/* Custom Vars (Company & Role) */}
                          <td className="p-3.5 text-slate-600">
                            {isEditing ? (
                              <div className="flex gap-1">
                                <input 
                                  type="text" 
                                  value={editForm.company}
                                  onChange={e => setEditForm(prev => ({ ...prev, company: e.target.value }))}
                                  placeholder="Company"
                                  className="w-24 px-1.5 py-0.5 border border-slate-300 rounded text-xs"
                                />
                                <input 
                                  type="text" 
                                  value={editForm.role}
                                  onChange={e => setEditForm(prev => ({ ...prev, role: e.target.value }))}
                                  placeholder="Role"
                                  className="w-24 px-1.5 py-0.5 border border-slate-300 rounded text-xs"
                                />
                              </div>
                            ) : (
                              <div>
                                <span className="font-bold text-slate-800">{c.company || '—'}</span>
                                {c.role && <span className="text-[11px] text-slate-400 block">{c.role}</span>}
                              </div>
                            )}
                          </td>

                          {/* Quick Actions Column */}
                          <td className="p-3.5 text-right">
                            {isEditing ? (
                              <div className="flex items-center justify-end gap-1">
                                <button 
                                  onClick={() => handleSaveInlineEdit(c.id)}
                                  className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                                  title="Save Changes"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => setEditingContactId(null)}
                                  className="p-1 bg-slate-200 text-slate-600 rounded hover:bg-slate-300"
                                  title="Cancel"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-1">
                                <button 
                                  onClick={() => handleStartInlineEdit(c)}
                                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600 transition-colors"
                                  title="Inline Edit"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteContact(c.id)}
                                  className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <Users className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-semibold text-slate-700">No contacts match the current filter.</p>
                <p className="text-[11px] text-slate-400">Try selecting "All" or adding new contacts to this list.</p>
              </div>
            )}

            {/* Pagination Footer */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 font-semibold">
              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <select className="px-2 py-0.5 border border-slate-200 rounded-lg bg-white text-xs font-bold">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span>Page 1 of 1</span>
                <div className="flex gap-1">
                  <button disabled className="p-1 border border-slate-200 rounded bg-white text-slate-300 cursor-not-allowed">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button disabled className="p-1 border border-slate-200 rounded bg-white text-slate-300 cursor-not-allowed">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* RENAME LIST MODAL */}
      {renamingListId && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <h3 className="font-bold text-slate-900 text-sm">Rename Contact List</h3>
            <input 
              type="text" 
              value={renameValue}
              onChange={e => setRenameValue(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setRenamingListId(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveRename}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC COLUMN MAPPING MODAL (Requirement 1) */}
      {isMappingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Dynamic Column Mapping</h3>
                  <p className="text-[11px] text-slate-400">Map CSV headers to system personalization variables</p>
                </div>
              </div>
              <button onClick={() => setIsMappingModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {columnMappings.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <span className="font-bold text-slate-800 font-mono">{m.csvHeader}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <select 
                    value={m.mappedField}
                    onChange={e => {
                      const val = e.target.value;
                      setColumnMappings(prev => prev.map((item, i) => i === idx ? { ...item, mappedField: val } : item));
                    }}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="First Name">First Name ({"{{first_name}}"})</option>
                    <option value="Email">Email ({"{{email}}"})</option>
                    <option value="Company">Company ({"{{company}}"})</option>
                    <option value="Role">Job Title / Role ({"{{role}}"})</option>
                    <option value="URL">LinkedIn URL ({"{{url}}"})</option>
                    <option value="Custom Variable">Custom Variable ({"{{custom_var}}"})</option>
                  </select>
                </div>
              ))}
            </div>

            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-blue-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Mapped variables are automatically rendered inside cold email sequences and AI liquid templates.</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button 
                onClick={() => setIsMappingModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert("Column mappings updated successfully!");
                  setIsMappingModalOpen(false);
                }}
                className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20"
              >
                Save Column Mappings
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
