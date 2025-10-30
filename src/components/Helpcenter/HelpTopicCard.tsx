import React from 'react';
import { FONTS, COLORS } from '@/constants/uiConstants';
import type { HelpTopicCardProps } from './types.ts';

const HelpTopicCard: React.FC<HelpTopicCardProps> = ({
	topic,
	onViewDetails,
	showViewButton = false,
}) => {
	return (
		<div
			className='relative bg-[#ebeff3] p-4 sm:p-6 rounded-lg cursor-pointer transition-shadow duration-200 hover:shadow-md h-full flex flex-col'
			style={{
				boxShadow: `
          rgba(255, 255, 255, 0.7) -4px -4px 4px, 
          rgba(189, 194, 199, 0.75) 5px 5px 4px
        `,
			}}
		>
			{topic.category && (
				<div className='mb-3 sm:mb-4'>
					<span
						className='text-xs sm:text-sm'
						style={{
							...FONTS.para_02,
							color: COLORS.text_desc,
						}}
					>
						{topic.category}
					</span>
				</div>
			)}

			<h3
				className='mt-1 text-lg sm:text-xl lg:text-2xl flex-grow'
				style={{
					...FONTS.heading_02,
					color: COLORS.text_title,
				}}
			>
				{topic.title}
			</h3>

			{topic.description && (
				<p
					className='mt-3 text-sm sm:text-base leading-relaxed'
					style={{
						...FONTS.para_02,
						color: COLORS.text_desc,
					}}
				>
					{topic.description}
				</p>
			)}

			{showViewButton && onViewDetails && (
				<button
					onClick={() => onViewDetails(topic)}
					className='mt-4 px-3 sm:px-4 py-2 bg-[#ebeff3] transition-colors duration-200 hover:opacity-90 self-start text-sm sm:text-base cursor-pointer btnshadow text-white btnfocusshadow  h-[42px] rounded-xl'
					style={{
						...FONTS.heading_07,
						color: COLORS.white,
					}}
				>
					View Details
				</button>
			)}
		</div>
	);
};

export default HelpTopicCard;
