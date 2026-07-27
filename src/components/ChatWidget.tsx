import React, { useState } from 'react';
import { MessageSquare, X, Send, HelpCircle, Home, Search } from 'lucide-react';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'messages' | 'help'>('messages');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user'; text: string; time: string }[]>([]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText;
    setInputText('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: 'Just now' }]);
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { sender: 'bot', text: 'Thanks for reaching out! Our support team will get back to you shortly.', time: 'Just now' }
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none">
      {/* Floating Chat Box */}
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 flex flex-col h-[480px]">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
                IE
              </div>
              <div>
                <h3 className="font-semibold text-sm">Inboxes Support</h3>
                <p className="text-xs text-slate-400">Usually replies in a few minutes</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area based on Tab */}
          <div className="flex-1 bg-slate-50 p-4 overflow-y-auto custom-scrollbar flex flex-col justify-between">
            {activeTab === 'messages' && (
              <div className="flex-1 flex flex-col">
                {messages.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-1">No recent conversations</h4>
                    <p className="text-xs text-slate-500 mb-4">Your recent conversations with support will appear here.</p>
                    <button 
                      onClick={() => setMessages([{ sender: 'bot', text: 'Hi there! How can we help you today with your email warmup or campaigns?', time: 'Just now' }])}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                    >
                      <span>Ask a question</span>
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {messages.map((m, idx) => (
                      <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-3 text-xs ${
                          m.sender === 'user' 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none'
                        }`}>
                          {m.text}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'home' && (
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-semibold text-sm text-slate-800 mb-1">Welcome to Inboxes Email</h4>
                  <p className="text-xs text-slate-600 mb-3">Start warming up your senders and launching high-deliverability outreach.</p>
                  <button className="text-xs font-medium text-blue-600 hover:underline">View Getting Started Guide →</button>
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search articles..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer text-slate-700 font-medium">
                    How to filter warmup e-mails in Gmail
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer text-slate-700 font-medium">
                    Connecting SMTP & IMAP for custom domains
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer text-slate-700 font-medium">
                    Recommended daily sending limits
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Send a message..." 
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 text-xs px-3 py-2 bg-slate-100 rounded-lg border border-slate-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom Tabs */}
          <div className="bg-slate-100 border-t border-slate-200 grid grid-cols-3 text-center py-2 text-xs font-medium text-slate-500">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600 font-semibold' : 'hover:text-slate-800'}`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'messages' ? 'text-blue-600 font-semibold' : 'hover:text-slate-800'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </button>
            <button 
              onClick={() => setActiveTab('help')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'help' ? 'text-blue-600 font-semibold' : 'hover:text-slate-800'}`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Circle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl shadow-blue-600/30 flex items-center justify-center transition-all transform hover:scale-105 active:scale-95"
        title="Open Support Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};
