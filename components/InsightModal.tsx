import React, { useEffect, useState } from 'react';
import { AIInsight } from '../types';
import { getMonthInsights } from '../services/geminiService';
import { X, Sparkles, Loader2 } from 'lucide-react';

interface InsightModalProps {
  month: string;
  year: number;
  isOpen: boolean;
  onClose: () => void;
}

const InsightModal: React.FC<InsightModalProps> = ({ month, year, isOpen, onClose }) => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen && month) {
      setLoading(true);
      setError(false);
      setInsight(null);
      
      getMonthInsights(month, year)
        .then((data) => {
          if (data) {
            setInsight(data);
          } else {
            setError(true);
          }
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [isOpen, month, year]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-6 relative animate-fade-in-up border border-gray-100">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mb-6 flex items-center gap-2 text-indigo-600">
          <Sparkles size={18} />
          <span className="text-xs font-bold uppercase tracking-widest">AI Planner 2026</span>
        </div>

        <h2 className="text-3xl font-serif text-gray-900 mb-1">{month}</h2>
        <p className="text-sm text-gray-400 mb-6">{year}</p>

        {loading ? (
          <div className="py-8 flex flex-col items-center text-gray-400 gap-3">
            <Loader2 className="animate-spin" size={24} />
            <p className="text-xs tracking-wide">Consulting the stars...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-400 text-sm">
            Unable to generate insights at this time.
          </div>
        ) : insight ? (
          <div className="space-y-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Theme</p>
              <p className="text-lg font-medium text-slate-800 font-serif italic">"{insight.theme}"</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Focus Areas</p>
              <ul className="space-y-2">
                {insight.focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="block w-1.5 h-1.5 rounded-full bg-indigo-300 mt-1.5 shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InsightModal;