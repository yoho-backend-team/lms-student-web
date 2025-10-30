import React, { useRef, useEffect } from 'react';
import { FONTS, COLORS } from '@/constants/uiConstants';
import type { HelpCenterTabsProps } from './types.ts';

const HelpCenterTabs: React.FC<HelpCenterTabsProps> = ({
	tabs,
	activeTab,
	onTabChange,
}) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

	const filteredTabs = tabs.filter(
		(item, index, self) =>
			index === self.findIndex((t) => t.category === item.category)
	);

	// Auto-scroll to active tab
	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		const activeTabElement = tabRefs.current.get(activeTab);

		if (scrollContainer && activeTabElement) {
			const containerRect = scrollContainer.getBoundingClientRect();
			const tabRect = activeTabElement.getBoundingClientRect();

			// Calculate scroll position to center the active tab
			const scrollLeft =
				activeTabElement.offsetLeft - (containerRect.width - tabRect.width) / 2;

			scrollContainer.scrollTo({
				left: scrollLeft,
				behavior: 'smooth',
			});
		}
	}, [activeTab]);

	const setTabRef = (element: HTMLButtonElement | null, category: string) => {
		if (element) {
			tabRefs.current.set(category, element);
		} else {
			tabRefs.current.delete(category);
		}
	};

	const handleTabClick = (category: string) => {
		onTabChange(category);
	};

	// Combined tabs array with "All" tab first
	const allTabs = [{ category: 'All' }, ...filteredTabs];

	return (
		<div className='mb-4'>
			{/* Scrollable Tabs Container */}
			<div
				ref={scrollContainerRef}
				className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'
				style={{
					scrollBehavior: 'smooth',
					WebkitOverflowScrolling: 'touch',
				}}
			>
				{allTabs?.map((tab: any, index) => (
					<button
						key={index || 'all'}
						ref={(el) => setTabRef(el, tab.category)}
						onClick={() => handleTabClick(tab.category)}
						className={`px-4 py-1.5 rounded-md flex-shrink-0 flex items-center justify-center space-x-1 transition-all duration-200 cursor-pointer whitespace-nowrap ${
							activeTab === tab.category
								? 'bg-[#7b00ff] text-white'
								: 'bg-[#ebeff3] text-white'
						}`}
						style={{
							boxShadow: `
								rgba(255, 255, 255, 0.7) 2px 2px 4px, 
								rgba(189, 194, 199, 0.75) 1px 1px 2px inset
							`,
							...FONTS.para_02,
							fontSize: '0.875rem',
							color: activeTab === tab.category ? '#ffffff' : COLORS.text_desc,
							minWidth: 'fit-content',
						}}
					>
						<span
							className='text-sm'
							style={{
								color:
									activeTab === tab.category ? '#ffffff' : COLORS.text_desc,
							}}
						>
							{tab.category}
						</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default HelpCenterTabs;
