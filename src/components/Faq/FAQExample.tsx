import React from 'react';
import {
  FAQContainer,
  FAQHeader,
  FAQSearch,
  FAQActions,
  FAQList,
  FAQSupport,
  useFAQ
} from './index';
import type { FAQItemType } from './index';

// Example 1: Full-featured FAQ with all components
export const FullFeaturedFAQExample: React.FC = () => {
  const customFAQItems: FAQItemType[] = [
    {
      id: 'getting-started-1',
      question: 'What is Payil?',
      content: 'Payil is a comprehensive learning management system designed to help educators manage their courses effectively. It provides tools for course creation, student management, and progress tracking.'
    },
    {
      id: 'getting-started-2',
      question: 'How do I get started?',
      content: 'Simply sign up for an account and follow our onboarding process to set up your first course. Our step-by-step guide will help you get up and running quickly.'
    },
    {
      id: 'technical-1',
      question: 'What are the system requirements?',
      content: 'Payil works on any modern web browser including Chrome, Firefox, Safari, and Edge. You need a stable internet connection and JavaScript enabled.'
    },
    {
      id: 'billing-1',
      question: 'How does billing work?',
      content: 'We offer flexible billing options including monthly and annual subscriptions. You can upgrade or downgrade your plan at any time.'
    }
  ];

  const {
    expandedItems,
    searchQuery,
    filteredItems,
    toggleExpand,
    setSearchQuery,
    expandAll,
    collapseAll
  } = useFAQ(customFAQItems);

  return (
    <FAQContainer>
      <FAQHeader title="Comprehensive FAQ Guide" />
      <FAQSearch 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      <FAQActions
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
        totalItems={filteredItems.length}
        expandedCount={expandedItems.size}
      />
      <FAQList 
        items={filteredItems}
        expandedItems={expandedItems}
        onToggleItem={toggleExpand}
      />
      <FAQSupport onContactSupport={() => window.open('mailto:support@payil.com', '_blank')} />
    </FAQContainer>
  );
};

// Example 2: Simple FAQ without actions
export const SimpleFAQExample: React.FC = () => {
  const simpleFAQItems: FAQItemType[] = [
    {
      id: 'simple-1',
      question: 'Quick Question 1',
      content: 'This is a simple answer to the first question with all the styling from your profile page.'
    },
    {
      id: 'simple-2',
      question: 'Quick Question 2',
      content: 'This is a simple answer to the second question using your exact color scheme and fonts.'
    }
  ];

  const { expandedItems, filteredItems, toggleExpand } = useFAQ(simpleFAQItems);

  return (
    <FAQContainer>
      <FAQHeader title="Quick Help" />
      <FAQList 
        items={filteredItems}
        expandedItems={expandedItems}
        onToggleItem={toggleExpand}
      />
    </FAQContainer>
  );
};

// Example 3: FAQ with search only
export const SearchOnlyFAQExample: React.FC = () => {
  const faqItems: FAQItemType[] = [
    {
      id: 'search-1',
      question: 'How to search effectively?',
      content: 'Use keywords related to your question. The search function will filter FAQ items in real-time as you type.'
    },
    {
      id: 'search-2',
      question: 'Can I search by category?',
      content: 'Yes, you can search by category or use specific terms to find relevant FAQ items quickly.'
    }
  ];

  const {
    expandedItems,
    searchQuery,
    filteredItems,
    toggleExpand,
    setSearchQuery
  } = useFAQ(faqItems);

  return (
    <FAQContainer>
      <FAQHeader title="Searchable FAQ" />
      <FAQSearch 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      <FAQList 
        items={filteredItems}
        expandedItems={expandedItems}
        onToggleItem={toggleExpand}
      />
      <FAQSupport onContactSupport={() => window.open('mailto:yoho@gmail.com', '_blank')} />
    </FAQContainer>
  );
};

// Default export - the full-featured example
export default FullFeaturedFAQExample;