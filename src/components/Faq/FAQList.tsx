import React from 'react';
import FAQItem from './FAQItem';
import { COLORS, FONTS } from '@/constants/uiConstants';

export interface FAQItemData {
  id: string;
  question: string;
  content?: string;
}

interface FAQListProps {
  items: FAQItemData[];
  expandedItems: Set<string>;
  onToggleItem: (id: string) => void;
}

const FAQList: React.FC<FAQListProps> = ({ items, expandedItems, onToggleItem }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p style={{ 
          color: COLORS.text_desc, 
          fontFamily: FONTS.para_01.fontFamily,
          fontSize: FONTS.para_01.fontSize 
        }}>
          No FAQ items found matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <FAQItem
          key={item.id}
          id={item.id}
          question={item.question}
          content={item.content}
          isExpanded={expandedItems.has(item.id)}
          onToggle={onToggleItem}
        />
      ))}
    </div>
  );
};

export default FAQList;