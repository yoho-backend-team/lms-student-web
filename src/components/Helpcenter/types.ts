export interface Tab {
  id: string;
  label: string;
  count: number;
  active?: boolean;
}

export interface HelpTopic {
  title: string;
  category?: string;
  description?: string;
}

export interface HelpCenterTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export interface HelpCenterSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export interface HelpTopicCardProps {
  topic: HelpTopic;
  onViewDetails?: () => void;
  showViewButton?: boolean;
}

export interface LearningResourcesProps {
  onBack: () => void;
}