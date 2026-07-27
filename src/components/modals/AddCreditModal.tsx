import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Check } from 'lucide-react';

interface AddCreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCredit: (amount: number) => void;
}

export const AddCreditModal: React.FC<AddCreditModalProps> = ({ isOpen, onClose, onAddCredit }) => {
  const [selectedPackage, setSelectedPackage] = useState<{ amount: number; price: string; bonus: string }>({
    amount: 500,
    price: '$25',
    bonus: '+50 Bonus'
  });

  if (!isOpen) return null;

  const packages = [
    { amount: 100, price: '$10', bonus: '' },
    { amount: 500, price: '$25', bonus: '+50 Bonus' },
    { amount: 2000, price: '$80', bonus: '+300 Bonus' },
    { amount: 5000, price: '$180', bonus: '+1000 Bonus' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Add Warmup Credit</h3>
              <p className="text-xs text-slate-500">Refill your email sending volume</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600">Select a credit package for your account. Credits do not expire.</p>
          
          <div className="grid grid-cols-2 gap-3">
            {packages.map((pkg, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedPackage(pkg)}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPackage.amount === pkg.amount 
                    ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-slate-800 text-base">{pkg.amount} Credits</span>
                  {selectedPackage.amount === pkg.amount && (
                    <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div className="text-lg font-extrabold text-blue-600">{pkg.price}</div>
                {pkg.bonus && (
                  <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {pkg.bonus}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Secure 256-bit encrypted checkout via Stripe.</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onAddCredit(selectedPackage.amount);
              onClose();
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all"
          >
            Purchase {selectedPackage.price}
          </button>
        </div>
      </div>
    </div>
  );
};
