import React from 'react';
import { FONTS, COLORS } from '@/constants/uiConstants';
import type { HelpCenterTabsProps } from './types.ts';

const HelpCenterTabs: React.FC<HelpCenterTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  const filteredTabs = tabs.filter(
    (item, index, self) => index === self.findIndex((t) => t.category === item.category)
  );

  return (
    <div className="mb-4">
      <div className="hidden md:flex xl:hidden overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {filteredTabs?.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabChange(tab?.category ?? 'All')}
            className={`px-4 py-1.5 rounded-md flex-shrink-0 flex items-center justify-center space-x-1 transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === tab.category ? 'bg-[#7b00ff] text-white' : 'bg-[#ebeff3] text-white'
            }`}
            style={{
              boxShadow: `
                rgba(255, 255, 255, 0.7) 2px 2px 4px, 
                rgba(189, 194, 199, 0.75) 1px 1px 2px inset
              `,
              ...FONTS.para_02,
              fontSize: '0.875rem',
              color: activeTab === tab.category ? '#ffffff' : COLORS.text_desc,
              minWidth: 'fit-content', 
            }}
          >
            <span
              className="text-sm"
              style={{ color: activeTab === tab.category ? '#ffffff' : COLORS.text_desc }}
            >
              {tab?.category}
            </span>
          </button>
        ))}
      </div>

      <div className="hidden xl:flex flex-wrap gap-3">
        {filteredTabs?.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabChange(tab?.category ?? 'All')}
            className={`px-3 py-1.5 rounded-md flex items-center justify-center space-x-1 transition-all duration-200 cursor-pointer flex-1 min-w-0 whitespace-nowrap ${
              activeTab === tab.category ? 'bg-[#7b00ff] text-white' : 'bg-[#ebeff3] text-white'
            }`}
            style={{
              boxShadow: `
                rgba(255, 255, 255, 0.7) 2px 2px 4px, 
                rgba(189, 194, 199, 0.75) 1px 1px 2px inset
              `,
              ...FONTS.para_02,
              fontSize: '0.875rem',
              color: activeTab === tab.category ? '#ffffff' : COLORS.text_desc,
            }}
          >
            <span
              className="text-sm truncate"
              style={{ color: activeTab === tab.category ? '#ffffff' : COLORS.text_desc }}
            >
              {tab?.category}
            </span>
          </button>
        ))}
      </div>

      <div className="md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab: any, index: number) => (
            <button
              key={tab?.id || index}
              onClick={() => onTabChange(tab?.category || 'All')}
              className={`px-3 py-1.5 rounded-md flex items-center justify-center space-x-1.5 transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.category ? 'bg-[#7b00ff] text-white' : 'bg-[#ebeff3] text-white'
              }`}
              style={{
                boxShadow: `
                  rgba(255, 255, 255, 0.7) 2px 2px 4px, 
                  rgba(189, 194, 199, 0.75) 1px 1px 2px inset
                `,
                ...FONTS.para_02,
                fontSize: '0.875rem',
                color: activeTab === tab.category ? '#ffffff' : COLORS.text_desc,
                minWidth: 'fit-content',
              }}
            >
              <span
                className="text-sm"
                style={{ color: activeTab === tab.category ? '#ffffff' : COLORS.text_desc }}
              >
                {tab?.category || tab?.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenterTabs;
