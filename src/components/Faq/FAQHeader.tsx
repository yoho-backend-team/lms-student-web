import React from 'react';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface FAQHeaderProps {
  title?: string;
}

const FAQHeader: React.FC<FAQHeaderProps> = ({ title = "FAQ - Frequently Asked Questions" }) => {
  return (
    <div className="mb-8 text-center">
      <h2 
        className="font-bold mb-6 text-2xl leading-none" 
        style={{ 
          color: COLORS.text_title, 
          fontFamily: FONTS.heading_01.fontFamily, 
          fontWeight: FONTS.heading_01.fontWeight,
          fontSize: FONTS.heading_01.fontSize
        }}
      >
        {title}
      </h2>
    </div>
  );
};

export default FAQHeader;