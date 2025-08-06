import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { Lock } from 'lucide-react';
import GrammarComponent from './GrammarComponent';
import SpeakingComponent from './SpeakingComponent';

const SpokenEnglishLearning = () => {
	const [currentTopic, setCurrentTopic] = useState('Self Introduction');
	const [currentLevel, setCurrentLevel] = useState('Beginner');
	const [currentMode, setCurrentMode] = useState<'grammar' | 'speaking'>('grammar');
	const [grammarCompleted, setGrammarCompleted] = useState(() => {
		const saved = localStorage.getItem('grammarCompleted');
		return saved ? JSON.parse(saved) : false;
	});
	const [grammarTestScore, setGrammarTestScore] = useState(() => {
		const saved = localStorage.getItem('grammarTestScore');
		return saved ? JSON.parse(saved) : 0;
	});
	const [unlockedLevels, setUnlockedLevels] = useState(() => {
		const saved = localStorage.getItem('unlockedLevels');
		return saved ? JSON.parse(saved) : ['Beginner'];
	});
	const [unlockedTopics, setUnlockedTopics] = useState(() => {
		const saved = localStorage.getItem('unlockedTopics');
		return saved ? JSON.parse(saved) : { Beginner: ['Self Introduction'], Intermediate: [], Advanced: [], Professional: [] };
	});
	const [score, setScore] = useState(0);
	const [sessionTime, setSessionTime] = useState(0);
	const [wordsPerMinute, setWordsPerMinute] = useState(0);
	const [pronunciationScore, setPronunciationScore] = useState(0);
	const [levelScores, setLevelScores] = useState(() => {
		const saved = localStorage.getItem('levelScores');
		return saved ? JSON.parse(saved) : {};
	});



	const levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

	const topics = {
		Beginner: ['Self Introduction', 'Family & Friends', 'Daily Routine', 'Food & Drinks'],
		Intermediate: ['Travel & Tourism', 'Work & Career', 'Hobbies & Interests', 'Health & Fitness'],
		Advanced: ['Business Meetings', 'Presentations', 'Negotiations', 'Academic Discussions'],
		Professional: ['Leadership', 'Strategic Planning', 'Client Relations', 'Public Speaking']
	};





	return (
		<div className='relative w-full max-w-7xl mx-auto p-6'>

			{/* Sidebar */}
			<div className='w-90 flex-shrink-0 fixed left-20 top-16 h-screen overflow-y-auto z-10 p-6'>
				<Card className='p-4 h-fit' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px` }}>
					<h2 style={{ ...FONTS.heading_03 }} className='mb-4'>Learning Path</h2>
					
					{/* Levels Stepper */}
					<div className='space-y-4'>
						{levels.map((level, levelIndex) => {
							const isUnlocked = unlockedLevels.includes(level);
							const isActive = currentLevel === level;
							return (
								<div key={level} className='relative'>
									{/* Level */}
									<div 
										className='flex items-center gap-3 p-2 rounded-lg cursor-pointer'
										onClick={() => isUnlocked && setCurrentLevel(level)}
										style={{
											background: isActive ? COLORS.blue_01 : 'transparent',
											color: isActive ? COLORS.white : isUnlocked ? COLORS.text_desc : COLORS.text_desc,
											opacity: isUnlocked ? 1 : 0.5
										}}
									>
										<div 
											className='w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold'
											style={{
												background: isActive ? COLORS.white : isUnlocked ? COLORS.light_green : COLORS.text_desc,
												color: isActive ? COLORS.blue_01 : COLORS.white
											}}
										>
											{levelIndex + 1}
										</div>
										<span style={{ ...FONTS.para_02, fontWeight: isActive ? 'bold' : 'normal' }}>
											<span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{level} {!isUnlocked && <Lock size={12} />}</span>
										</span>
									</div>
									
									{/* Topics for current level */}
									{isActive && (
										<div className='ml-9 mt-2 space-y-2'>
											{topics[currentLevel as keyof typeof topics].map((topic) => {
												const isTopicUnlocked = (unlockedTopics[currentLevel as keyof typeof unlockedTopics] as string[]).includes(topic);
												const isTopicActive = currentTopic === topic;
												return (
													<div 
														key={topic}
														className='flex items-center gap-2 p-2 rounded cursor-pointer'
														onClick={() => isTopicUnlocked && setCurrentTopic(topic)}
														style={{
															background: isTopicActive ? COLORS.light_blue : 'transparent',
															color: isTopicActive ? COLORS.white : isTopicUnlocked ? COLORS.text_desc : COLORS.text_desc,
															opacity: isTopicUnlocked ? 1 : 0.5
														}}
													>
														<div 
															className='w-4 h-4 rounded-full'
															style={{
																background: isTopicActive ? COLORS.white : isTopicUnlocked ? COLORS.light_green : COLORS.text_desc
															}}
														></div>
														<div className='flex items-center justify-between w-full'>
															<span style={{ ...FONTS.para_03, fontSize: '13px' }}>
																<span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{topic} {!isTopicUnlocked && <Lock size={10} />}</span>
															</span>
															{levelScores[`${currentLevel}-${topic}`] && levelScores[`${currentLevel}-${topic}`] >= 90 && (
																<span style={{ ...FONTS.para_03, fontSize: '11px', color: COLORS.light_green, fontWeight: 'bold' }}>
																	{levelScores[`${currentLevel}-${topic}`]}
																</span>
															)}
														</div>
													</div>
												);
											})}
										</div>
									)}
									
									{/* Connector line */}
									{levelIndex < levels.length - 1 && (
										<div 
											className='w-0.5 h-6 ml-3 mt-2'
											style={{ background: COLORS.text_desc, opacity: 0.3 }}
										></div>
									)}
								</div>
							);
						})}
					</div>
				</Card>
			</div>
			
			{/* Main Content */}
			<div className='ml-80 space-y-6'>
			<Card className='p-6' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px` }}>
				<h1 style={{ ...FONTS.heading_01 }} className='text-center mb-2'>
					Professional English Speaking Coach
				</h1>
				<p style={{ ...FONTS.para_01 }} className='text-center'>
					AI-powered speaking assessment with real-time feedback
				</p>
				
				{(score > 0 || sessionTime > 0) && (
					<div className='grid grid-cols-4 gap-4 mt-4'>
						<div className='text-center'>
							<p style={{ ...FONTS.heading_02, color: COLORS.blue_01 }}>{score}</p>
							<p style={{ ...FONTS.para_02 }}>Overall Score</p>
						</div>
						<div className='text-center'>
							<p style={{ ...FONTS.heading_02, color: COLORS.light_green }}>{wordsPerMinute}</p>
							<p style={{ ...FONTS.para_02 }}>Words/Min</p>
						</div>
						<div className='text-center'>
							<p style={{ ...FONTS.heading_02, color: COLORS.purple_01 }}>{pronunciationScore}%</p>
							<p style={{ ...FONTS.para_02 }}>Pronunciation</p>
						</div>
						<div className='text-center'>
							<p style={{ ...FONTS.heading_02, color: COLORS.light_orange }}>{Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}</p>
							<p style={{ ...FONTS.para_02 }}>Duration</p>
						</div>
					</div>
				)}
			</Card>

			<Card className='p-6' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px` }}>
				<div className='flex items-center justify-between mb-6'>
					<h2 style={{ ...FONTS.heading_02 }}>English Learning Practice</h2>
					<div className='flex gap-2'>
						<Button
							onClick={() => setCurrentMode('grammar')}
							className='px-4 py-2 rounded-lg'
							style={{
								background: currentMode === 'grammar' 
									? `linear-gradient(to right, ${COLORS.blue_01}, ${COLORS.light_blue})` 
									: COLORS.bg_Colour,
								color: currentMode === 'grammar' ? COLORS.white : COLORS.text_desc,
								border: `2px solid ${currentMode === 'grammar' ? COLORS.blue_01 : COLORS.text_desc}`,
								...FONTS.para_02
							}}
						>
							Grammar
						</Button>
						<Button
							onClick={() => grammarCompleted && setCurrentMode('speaking')}
							disabled={!grammarCompleted}
							className='px-4 py-2 rounded-lg'
							style={{
								background: currentMode === 'speaking' 
									? `linear-gradient(to right, ${COLORS.light_green}, ${COLORS.green_text})` 
									: COLORS.bg_Colour,
								color: currentMode === 'speaking' ? COLORS.white : COLORS.text_desc,
								border: `2px solid ${currentMode === 'speaking' ? COLORS.light_green : COLORS.text_desc}`,
								opacity: grammarCompleted ? 1 : 0.5,
								...FONTS.para_02
							}}
						>
							Speaking {!grammarCompleted && '🔒'}
						</Button>
					</div>
				</div>

				{currentMode === 'grammar' ? (
					<GrammarComponent 
						grammarCompleted={grammarCompleted}
						setGrammarCompleted={setGrammarCompleted}
						grammarTestScore={grammarTestScore}
						setGrammarTestScore={setGrammarTestScore}
					/>
				) : (
					<SpeakingComponent 
						currentTopic={currentTopic}
						currentLevel={currentLevel}
						levelScores={levelScores}
						setLevelScores={setLevelScores}
						unlockedLevels={unlockedLevels}
						setUnlockedLevels={setUnlockedLevels}
						unlockedTopics={unlockedTopics}
						setUnlockedTopics={setUnlockedTopics}
					/>
				)}




			</Card>

			{/* <Card className='p-6' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px` }}>
				<h2 style={{ ...FONTS.heading_02 }} className='mb-4'>Professional Speaking Guidelines</h2>
				<div className='grid md:grid-cols-3 gap-6'>
					<div className='space-y-3'>
						<h3 style={{ ...FONTS.heading_04, color: COLORS.blue_01 }}>Pronunciation</h3>
						<ul className='space-y-2'>
							<li style={{ ...FONTS.para_02 }}>• Clear articulation</li>
							<li style={{ ...FONTS.para_02 }}>• Proper word stress</li>
							<li style={{ ...FONTS.para_02 }}>• Consistent pace</li>
						</ul>
					</div>
					<div className='space-y-3'>
						<h3 style={{ ...FONTS.heading_04, color: COLORS.light_green }}>Fluency</h3>
						<ul className='space-y-2'>
							<li style={{ ...FONTS.para_02 }}>• Natural flow</li>
							<li style={{ ...FONTS.para_02 }}>• Smooth transitions</li>
							<li style={{ ...FONTS.para_02 }}>• Confident delivery</li>
						</ul>
					</div>
					<div className='space-y-3'>
						<h3 style={{ ...FONTS.heading_04, color: COLORS.purple_01 }}>Professional</h3>
						<ul className='space-y-2'>
							<li style={{ ...FONTS.para_02 }}>• Formal vocabulary</li>
							<li style={{ ...FONTS.para_02 }}>• Structured responses</li>
							<li style={{ ...FONTS.para_02 }}>• Engaging tone</li>
						</ul>
					</div>
				</div>
			</Card> */}
			</div>
		</div>
	);
};

export default SpokenEnglishLearning;