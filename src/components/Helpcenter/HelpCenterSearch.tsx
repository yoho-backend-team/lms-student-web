import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { FONTS, COLORS } from '@/constants/uiConstants';
import type { HelpCenterSearchProps } from './types.ts';

const HelpCenterSearch: React.FC<HelpCenterSearchProps> = ({
  onSearch,
  placeholder = "Search"
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative mb-6">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5"
        style={{ color: COLORS.text_desc }}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full pl-9 sm:pl-10 pr-4 h-10 sm:h-12 rounded-md focus:outline-none focus:ring-2 transition-all duration-200 bg-[#ebeff3] text-sm sm:text-base"
        style={{
          boxShadow: `
            rgba(255, 255, 255, 0.7) 5px 5px 4px, 
            rgba(189, 194, 199, 0.75) 2px 2px 3px inset
          `,
          ...FONTS.heading_05,
          color: COLORS.text_title,
        }}
      />
    </div>
  );
};

export default HelpCenterSearch;