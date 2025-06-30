import React from 'react';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface FAQCategoryProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FAQCategory: React.FC<FAQCategoryProps> = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
  if (categories.length <= 1) return null;

  return (
    <div className="mb-6">
      <label className="block font-medium mb-2 text-sm leading-relaxed" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>
        Category
      </label>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]'
                : 'shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]'
            }`}
            style={{
              backgroundColor: COLORS.bg_Colour,
              color: selectedCategory === category ? COLORS.blue_01 : COLORS.text_desc,
              fontFamily: FONTS.para_02.fontFamily,
              fontSize: FONTS.para_02.fontSize
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FAQCategory;