/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FAQContainer from './FAQContainer';
import FAQHeader from './FAQHeader';
import FAQSearch from './FAQSearch';
import FAQActions from './FAQActions';
import FAQList from './FAQList';
import FAQSupport from './FAQSupport';
import { useFAQ } from './useFAQ';
import type { FAQItem } from './types';
import { useSelector } from 'react-redux';

const FAQInterface: React.FC = () => {
	const navigate = useNavigate();

	const FaqData = useSelector((state: any) => state.FaqSlice);

	const faqItems: FAQItem[] = FaqData?.data?.map((items: any) => ({
		id: items?.title || '-',
		question: items?.title || '-',
		content: items?.description || '-',
	}));

	const {
		expandedItems,
		searchQuery,
		filteredItems,
		toggleExpand,
		setSearchQuery,
		expandAll,
		collapseAll,
	} = useFAQ(faqItems);

	const handleContactSupport = () => {
		// Navigate to tickets page
		navigate('/tickets');
	};

	return (
		<FAQContainer>
			<FAQHeader />
			<FAQSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
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
			<FAQSupport onContactSupport={handleContactSupport} />
		</FAQContainer>
	);
};

export default FAQInterface;
