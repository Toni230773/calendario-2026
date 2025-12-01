import React from 'react';
import { MonthData } from '../types';
import { getWeekDays } from '../utils/dateUtils';
import { Sparkles } from 'lucide-react';

interface MonthGridProps {
  data: MonthData;
  onInsightRequest: (monthName: string) => void;
}

const MonthGrid: React.FC<MonthGridProps> = ({ data, onInsightRequest }) => {
  const weekDays = getWeekDays();
  const emptySlots = Array.from({ length: data.startDayOfWeek });

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-baseline mb-4 border-b border-gray-100 pb-2 group">
        <h3 className="text-xl font-serif font-semibold text-gray-800 tracking-wide uppercase">
          {data.name}
        </h3>
        <button 
          onClick={() => onInsightRequest(data.name)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-500"
          title="Get AI Insights for this month"
        >
          <Sparkles size={14} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-3 text-center mb-2">
        {weekDays.map((day) => (
          <span key={day} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center flex-grow content-start">
        {/* Empty slots for days before start of month */}
        {emptySlots.map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        
        {/* Actual Days */}
        {data.days.map((day) => (
          <div 
            key={day.date} 
            className={`
              text-sm font-light text-gray-700
              hover:text-indigo-600 cursor-default transition-colors
              flex items-center justify-center
            `}
          >
            {day.date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthGrid;