export interface FAQItem {
  id: string;
  question: string;
  content?: string;
}

export interface FAQState {
  expandedItems: Set<string>;
  searchQuery: string;
}