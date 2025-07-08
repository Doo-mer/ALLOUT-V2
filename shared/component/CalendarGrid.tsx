import React from 'react';

type DayStatus = 'done' | 'today' | 'empty';

export interface CalendarGridProps {
  /** 5x4 grid of day statuses */
  days?: DayStatus[];
  onDayClick?: (index: number) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  days = Array(20).fill('empty') as DayStatus[],
  onDayClick,
}) => {
  return (
    <div className="grid grid-cols-5 mx-auto w-[90%]">
      {days.map((day, idx) => {
        let baseClasses = 'w-full aspect-square rounded-full flex items-center justify-center transition cursor-pointer';
        let statusClasses = '';
        let content: React.ReactNode = null;
        let clickable = false;

        switch (day) {
          case 'done':
            statusClasses = 'bg-purple-600 hover:ring-2 hover:ring-purple-300 hover:scale-105 hover:brightness-110 transition-all shadow-lg';
            clickable = true;
            content = (
              <span className="flex flex-col items-center">
                <span className="text-[0.75rem] phone:text-[0.875rem] tablet:text-[1rem] mt-1">확인</span>
              </span>
            );
            break;
          case 'today':
            statusClasses = 'border-2 border-white text-white';
            content = <span className="text-[0.75rem] phone:text-[0.875rem] tablet:text-[1rem] font-normal">TODAY</span>;
            break;
          case 'empty':
          default:
            statusClasses = 'border-2 border-neutral-800 bg-opacity-30 cursor-default';
            content = <span className="text-[0.75rem] phone:text-[0.875rem] tablet:text-[1rem] font-normal text-neutral-500">-</span>;
            break;
        }

        return (
          <div
            key={idx}
            className={`${baseClasses} ${statusClasses}`.trim()}
            onClick={clickable && onDayClick ? () => onDayClick(idx) : undefined}
            style={{ pointerEvents: clickable ? 'auto' : 'none' }}
            title={clickable ? '작성한 일기 보기' : undefined}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
