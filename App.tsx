import React, { useState, useMemo } from 'react';
import { generateCalendarData } from './utils/dateUtils';
import MonthGrid from './components/MonthGrid';
import InsightModal from './components/InsightModal';

const App: React.FC = () => {
  const year = 2026;
  const calendarData = useMemo(() => generateCalendarData(year), [year]);
  
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInsightRequest = (month: string) => {
    setSelectedMonth(month);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8 flex justify-center overflow-y-auto">
      {/* 
        Poster Container 
        Designed to look like a physical poster on a wall.
        Aspect ratio roughly A-series paper.
      */}
      <div className="bg-paper w-full max-w-[1000px] aspect-[1/1.414] shadow-xl text-ink p-8 md:p-16 lg:p-20 relative flex flex-col">
        
        {/* Header */}
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight text-gray-900 mb-2">
            {year}
          </h1>
          <p className="text-sm md:text-base font-sans font-light tracking-[0.2em] uppercase text-gray-500">
            Calendar & Planner
          </p>
        </header>

        {/* Grid: 3 cols x 4 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-16 flex-grow">
          {calendarData.map((month) => (
            <MonthGrid 
              key={month.name} 
              data={month} 
              onInsightRequest={handleInsightRequest}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center border-t border-gray-100 pt-8">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Designed for clarity • Twenty Twenty-Six
          </p>
        </footer>
      </div>

      <InsightModal 
        month={selectedMonth || ''} 
        year={year} 
        isOpen={isModalOpen} 
        onClose={closeModal}
      />
    </div>
  );
};

export default App;