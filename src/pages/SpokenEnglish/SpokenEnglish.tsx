import { useState, useEffect } from 'react';
import SpokenEnglishLearning from '@/components/SpokenEnglish/SpokenEnglishLearning';
import { COLORS, FONTS } from '@/constants/uiConstants';

const BookLoader = () => {
	return (
		<>
			<style>{`
				@keyframes pageTurn {
					0% { transform: rotateY(0deg); }
					20% { background: #6b7280; }
					40% { background: #374151; transform: rotateY(-180deg); }
					100% { background: #374151; transform: rotateY(-180deg); }
				}
				@keyframes dots {
					0% { content: ''; }
					33% { content: '.'; }
					66% { content: '..'; }
					100% { content: '...'; }
				}
				.page1 { animation: pageTurn 1.2s cubic-bezier(0,.39,1,.68) 0.6s infinite; }
				.page2 { animation: pageTurn 1.2s cubic-bezier(0,.39,1,.68) 0.45s infinite; }
				.page3 { animation: pageTurn 1.2s cubic-bezier(0,.39,1,.68) 0.2s infinite; }
				.dots::after { animation: dots 2s cubic-bezier(0,.39,1,.68) infinite; position: absolute; content: ''; }
			`}</style>
			<div className='flex flex-col items-center justify-center' style={{
				background: 'rgba(255, 255, 255, 0.1)',
				backdropFilter: 'blur(8px)',
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				zIndex: 1000
			}}>
				<div className='relative mb-8 mx-auto' style={{
					border: `4px solid #374151`,
					width: '80px',
					height: '55px',
					perspective: '150px'
				}}>
					<figure className='page1 block absolute overflow-hidden' style={{
						width: '40px',
						height: '55px',
						border: `4px solid #374151`,
						borderLeft: `1px solid #6b7280`,
						margin: '0',
						right: '-4px',
						top: '-4px',
						background: '#6b7280',
						transformStyle: 'preserve-3d',
						transformOrigin: 'left center'
					}} />
					<figure className='page2 block absolute overflow-hidden' style={{
						width: '40px',
						height: '55px',
						border: `4px solid #374151`,
						borderLeft: `1px solid #6b7280`,
						margin: '0',
						right: '-4px',
						top: '-4px',
						background: '#6b7280',
						transformStyle: 'preserve-3d',
						transformOrigin: 'left center'
					}} />
					<figure className='page3 block absolute overflow-hidden' style={{
						width: '40px',
						height: '55px',
						border: `4px solid #374151`,
						borderLeft: `1px solid #6b7280`,
						margin: '0',
						right: '-4px',
						top: '-4px',
						background: '#6b7280',
						transformStyle: 'preserve-3d',
						transformOrigin: 'left center'
					}} />
				</div>
				<h1 className='dots relative' style={{
					...FONTS.heading_01,
					color: '#374151',
					textAlign: 'center',
					textTransform: 'uppercase',
					fontSize: '15px'
				}}>
					CLASSIE
				</h1>
			</div>
		</>
	);
};

const SpokenEnglish = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='w-full h-full relative'>
			<SpokenEnglishLearning />
			{loading && <BookLoader />}
		</div>
	);
};

export default SpokenEnglish;