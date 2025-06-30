import React from 'react';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface FAQContainerProps {
  children: React.ReactNode;
}

const FAQContainer: React.FC<FAQContainerProps> = ({ children }) => {
  return (
    <div className="min-h-fit py-8" style={{ fontFamily: FONTS.para_01.fontFamily }}>
      <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
        <div 
          className="flex-1 rounded-lg p-6"
          style={{
            backgroundColor: COLORS.bg_Colour,
            boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px, 
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default FAQContainer;