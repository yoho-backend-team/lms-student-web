import React, { useState } from 'react';
import { FONTS, COLORS } from '@/constants/uiConstants';
import HelpCenterTabs from './HelpCenterTabs.tsx';
import HelpCenterSearch from './HelpCenterSearch.tsx';
import HelpTopicCard from './HelpTopicCard.tsx';
import LearningResources from './LearningResources.tsx';
import HelpCenterEmptyState from './HelpCenterEmptyState.tsx';
import type { Tab, HelpTopic } from './types.ts';

const HelpCenterMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Mail');
  const [currentView, setCurrentView] = useState('main'); // 'main', 'learning'
  const [searchQuery, setSearchQuery] = useState('');

  const tabs: Tab[] = [
    { id: 'Mail', label: 'Mail', count: 5 },
    { id: 'Profile', label: 'Profile', count: 5 },
    { id: 'Classes', label: 'Classes', count: 5 },
    { id: 'Password', label: 'Password', count: 5 },
    { id: 'Attendance', label: 'Attendance', count: 0 },
    { id: 'Payment', label: 'Payment', count: 5 },
    { id: 'Login & Sign Up', label: 'Login & Sign Up', count: 0 },
  ];

  // Common help topics for all tabs - ready for API integration
  const getHelpTopics = (category: string): HelpTopic[] => {
    // Return empty array for certain categories to demonstrate empty state
    if (category === 'Attendance' || category === 'Login & Sign Up') {
      return [];
    }
    
    return [
      {
        title: 'How to Reset password',
        category: category,
        description: 'Learn how to reset your password securely and regain access to your account.'
      },
      {
        title: 'Close Enrollment Issue',
        category: category,
        description: 'Resolve issues related to course enrollment and registration problems.'
      },
      {
        title: 'Payment Methods',
        category: category,
        description: 'Understand available payment options and how to manage your billing information.'
      },
      {
        title: 'Attendance Tracking',
        category: category,
        description: 'Learn how attendance is tracked and how to view your attendance records.'
      },
      {
        title: 'Email Notifications',
        category: category,
        description: 'Manage your email notification preferences and troubleshoot delivery issues.'
      },
    ];
  };

  const getCurrentTopics = (): HelpTopic[] => {
    // Get topics for current active tab - all tabs now have the same topics with different categories
    const topics = getHelpTopics(activeTab);

    // Filter topics based on search query
    if (searchQuery.trim()) {
      return topics.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (topic.category && topic.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (topic.description && topic.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return topics;
  };

  const currentTopics = getCurrentTopics();
  const topicCount = currentTopics.length;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchQuery(''); // Reset search when changing tabs
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleViewDetails = () => {
    setCurrentView('learning');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  if (currentView === 'learning') {
    return <LearningResources onBack={handleBackToMain} />;
  }

  return (
    <div className="min-h-screen  py-4 sm:py-8">
      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        <h1
          className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl"
          style={{
            ...FONTS.heading_01,
            color: COLORS.text_title,
          }}
        >
          Help Centre
        </h1>

        {/* Main Content Card */}
        <div
          className="relative bg-[#ebeff3] p-4 sm:p-6 rounded-lg mb-4 sm:mb-6"
          style={{
            boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px, 
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
          }}
        >
          {/* Tabs */}
          <HelpCenterTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          {/* Search */}
          <HelpCenterSearch
            onSearch={handleSearch}
            placeholder="Search help topics..."
          />

          {/* Help Topics Count */}
          <p
            className="mb-4 text-sm sm:text-base"
            style={{
              ...FONTS.heading_06,
              color: COLORS.text_desc,
            }}
          >
            {topicCount} Help Topics Available in {activeTab}
          </p>
        </div>

        {/* Help Centre Content */}
        <div
          className="relative bg-[#ebeff3] p-4 sm:p-6 rounded-lg"
          style={{
            boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px, 
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
          }}
        >
          <h2
            className="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl"
            style={{
              ...FONTS.heading_02,
              color: COLORS.text_title,
            }}
          >
            Help Centre
          </h2>

          {currentTopics.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {currentTopics.map((topic, index) => (
                <HelpTopicCard
                  key={index}
                  topic={topic}
                  onViewDetails={handleViewDetails}
                  showViewButton={true}
                />
              ))}
            </div>
          ) : (
            <HelpCenterEmptyState 
              searchQuery={searchQuery}
              activeTab={activeTab}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpCenterMain;