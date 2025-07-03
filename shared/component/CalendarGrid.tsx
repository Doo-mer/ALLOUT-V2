import React from 'react';

type DayStatus = 'done' | 'today' | 'empty';

export interface CalendarGridProps {
  /** 5x4 grid of day statuses */
  days?: DayStatus[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  days = Array(20).fill('empty') as DayStatus[],
}) => {
  return (
    <div className="grid grid-cols-5 w-80 mx-auto">
      {days.map((day, idx) => {
        let baseClasses = 'w-16 h-16 rounded-full flex items-center justify-center';
        let statusClasses = '';
        let content: React.ReactNode = null;

        switch (day) {
          case 'done':
            statusClasses = 'bg-purple-600';
            break;
          case 'today':
            statusClasses = 'border-2 border-white text-white';
            content = <span className="text-sm font-normal">TODAY</span>;
            break;
          case 'empty':
          default:
            statusClasses = 'border-2 border-gray-800';
            break;
        }

        return (
          <div key={idx} className={`${baseClasses} ${statusClasses}`.trim()}>
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
