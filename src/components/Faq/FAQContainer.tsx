import React from 'react';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface FAQContainerProps {
  children: React.ReactNode;
}

const FAQContainer: React.FC<FAQContainerProps> = ({ children }) => {
  return (
    <div
      className="
        w-full overflow-x-hidden  
        min-h-fit
        py-3 xs:py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14
        px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16
      "
      style={{ fontFamily: FONTS.para_01.fontFamily }}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto gap-3 xs:gap-4 sm:gap-5 md:gap-6 p-2 xs:p-3 sm:p-4 md:p-6">
        <div
          className="
            flex-1 w-full rounded-lg
            p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 2xl:p-12
          "
          style={{
            backgroundColor: COLORS.bg_Colour,
            boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px, 
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default FAQContainer;
