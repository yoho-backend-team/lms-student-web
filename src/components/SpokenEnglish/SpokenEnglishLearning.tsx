import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { Lock, Trophy, Flame, Target, Award, BookOpen, Mic, Star } from 'lucide-react';
import GrammarComponent from './GrammarComponent';
import SpeakingComponent from './SpeakingComponent';



const SpokenEnglishLearning = () => {

	const [currentTopic, setCurrentTopic] = useState('Professional Introduction');
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
		return saved ? JSON.parse(saved) : { Beginner: ['Professional Introduction'], Intermediate: [], Advanced: [], Professional: [] };
	});

	const [levelScores, setLevelScores] = useState(() => {
		const saved = localStorage.getItem('levelScores');
		return saved ? JSON.parse(saved) : {};
	});
	const [dailyStreak, setDailyStreak] = useState(() => {
		const saved = localStorage.getItem('dailyStreak');
		return saved ? JSON.parse(saved) : 0;
	});
	const [totalXP, setTotalXP] = useState(() => {
		const saved = localStorage.getItem('totalXP');
		return saved ? JSON.parse(saved) : 0;
	});
	const [achievements, setAchievements] = useState(() => {
		const saved = localStorage.getItem('achievements');
		return saved ? JSON.parse(saved) : [];
	});
	const [lastPracticeDate, setLastPracticeDate] = useState(() => {
		const saved = localStorage.getItem('lastPracticeDate');
		return saved ? new Date(saved) : null;
	});



	useEffect(() => {
		// Check and update daily streak
		const today = new Date();
		
		if (lastPracticeDate) {
			const daysDiff = Math.floor((today.getTime() - lastPracticeDate.getTime()) / (1000 * 60 * 60 * 24));
			
			if (daysDiff === 1) {
				// Consecutive day
				setDailyStreak((prev: number) => {
					const newStreak = prev + 1;
					localStorage.setItem('dailyStreak', JSON.stringify(newStreak));
					return newStreak;
				});
			} else if (daysDiff > 1) {
				// Streak broken
				setDailyStreak(1);
				localStorage.setItem('dailyStreak', '1');
			}
			// If daysDiff === 0, it's the same day, don't change streak
		} else {
			// First time practicing
			setDailyStreak(1);
			localStorage.setItem('dailyStreak', '1');
		}
		
		setLastPracticeDate(today);
		localStorage.setItem('lastPracticeDate', today.toISOString());
	}, []);

	const addXP = (points: number) => {
		const newXP = totalXP + points;
		setTotalXP(newXP);
		localStorage.setItem('totalXP', JSON.stringify(newXP));
		
		// Check for achievements
		checkAchievements(newXP);
	};

	const checkAchievements = (xp: number) => {
		const newAchievements = [...achievements];
		
		if (xp >= 100 && !achievements.includes('first-100')) {
			newAchievements.push('first-100');
		}
		if (xp >= 500 && !achievements.includes('xp-master')) {
			newAchievements.push('xp-master');
		}
		if (dailyStreak >= 7 && !achievements.includes('week-warrior')) {
			newAchievements.push('week-warrior');
		}
		if (grammarCompleted && !achievements.includes('grammar-guru')) {
			newAchievements.push('grammar-guru');
		}
		
		if (newAchievements.length > achievements.length) {
			setAchievements(newAchievements);
			localStorage.setItem('achievements', JSON.stringify(newAchievements));
		}
	};

	const getAchievementInfo = (id: string) => {
		const achievementMap: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
			'first-100': { title: 'First Steps', description: 'Earned 100 XP', icon: <Target size={16} /> },
			'xp-master': { title: 'XP Master', description: 'Earned 500 XP', icon: <Star size={16} /> },
			'week-warrior': { title: 'Week Warrior', description: '7-day streak', icon: <Flame size={16} /> },
			'grammar-guru': { title: 'Grammar Guru', description: 'Completed grammar test', icon: <BookOpen size={16} /> }
		};
		return achievementMap[id] || { title: 'Achievement', description: '', icon: <Award size={16} /> };
	};



	const levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

	const topics = {
		Beginner: ['Professional Introduction', 'Career Goals', 'Skills & Strengths', 'Work Experience'],
		Intermediate: ['Job Interview', 'Team Collaboration', 'Problem Solving', 'Project Management'],
		Advanced: ['Business Presentations', 'Client Communication', 'Performance Review', 'Industry Analysis'],
		Professional: ['Executive Leadership', 'Strategic Planning', 'Stakeholder Management', 'Innovation & Growth']
	};







	return (
		<div className='relative w-full max-w-7xl mx-auto p-4 md:p-6'>
			<div className='flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]'>
				{/* Fixed Sidebar */}
				<div className='w-full lg:w-80 flex-shrink-0 lg:h-full'>
					<div className='lg:sticky lg:top-0 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto'>
						<Card className='p-4 h-fit' style={{ backgroundColor: COLORS.bg_Colour  }}>
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
				</div>
				
				{/* Scrollable Main Content */}
				<div className='flex-1 lg:h-full lg:overflow-y-auto'>
					<div className='space-y-6'>
						<Card className='p-4 md:p-6' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px` }}>
							<h1 style={{ ...FONTS.heading_01 }} className='text-center mb-2'>
								English Mastery Challenge
							</h1>
							<p style={{ ...FONTS.para_01 }} className='text-center mb-4'>
								Classie-style grammar and speaking practice
							</p>
							
							{/* Stats Dashboard */}
							<div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4'>
								<div className='text-center p-2 md:p-3 rounded-lg' style={{ backgroundColor: COLORS.white, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75)` }}>
									<div className='flex items-center justify-center mb-1'>
										<Flame size={16} color={COLORS.light_orange} className='md:w-5 md:h-5' />
									</div>
									<p style={{ ...FONTS.heading_03, color: COLORS.light_orange, fontSize: '14px' }} className='md:text-base'>{dailyStreak}</p>
									<p style={{ ...FONTS.para_03, fontSize: '11px' }} className='md:text-sm'>Day Streak</p>
								</div>
								<div className='text-center p-2 md:p-3 rounded-lg' style={{ backgroundColor: COLORS.white, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75)` }}>
									<div className='flex items-center justify-center mb-1'>
										<Target size={16} color={COLORS.blue_01} className='md:w-5 md:h-5' />
									</div>
									<p style={{ ...FONTS.heading_03, color: COLORS.blue_01, fontSize: '14px' }} className='md:text-base'>{totalXP}</p>
									<p style={{ ...FONTS.para_03, fontSize: '11px' }} className='md:text-sm'>Total XP</p>
								</div>
								<div className='text-center p-2 md:p-3 rounded-lg' style={{ backgroundColor: COLORS.white, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75)` }}>
									<div className='flex items-center justify-center mb-1'>
										<Trophy size={16} color={COLORS.light_green} className='md:w-5 md:h-5' />
									</div>
									<p style={{ ...FONTS.heading_03, color: COLORS.light_green, fontSize: '14px' }} className='md:text-base'>{Object.keys(levelScores).length}</p>
									<p style={{ ...FONTS.para_03, fontSize: '11px' }} className='md:text-sm'>Completed</p>
								</div>
								<div className='text-center p-2 md:p-3 rounded-lg' style={{ backgroundColor: COLORS.white, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75)` }}>
									<div className='flex items-center justify-center mb-1'>
										<Award size={16} color={COLORS.purple_01} className='md:w-5 md:h-5' />
									</div>
									<p style={{ ...FONTS.heading_03, color: COLORS.purple_01, fontSize: '14px' }} className='md:text-base'>{achievements.length}</p>
									<p style={{ ...FONTS.para_03, fontSize: '11px' }} className='md:text-sm'>Achievements</p>
								</div>
							</div>
							
							{/* Achievements */}
							{achievements.length > 0 && (
								<div className='mb-4'>
									<h3 style={{ ...FONTS.heading_04 }} className='mb-2'>Recent Achievements</h3>
									<div className='flex gap-2 flex-wrap'>
										{achievements.slice(-3).map((achievementId: string) => {
											const achievement = getAchievementInfo(achievementId);
											return (
												<div 
													key={achievementId}
													className='flex items-center gap-2 px-2 md:px-3 py-1 md:py-2 rounded-lg'
													style={{ backgroundColor: COLORS.light_orange, color: COLORS.white }}
													title={achievement.description}
												>
													{achievement.icon}
													<span style={{ ...FONTS.para_03, fontWeight: 'bold', fontSize: '11px' }} className='md:text-sm'>{achievement.title}</span>
												</div>
											);
										})}
									</div>
								</div>
							)}
						</Card>

						<Card className='p-4 md:p-6' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px` }}>
							<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4'>
								<h2 style={{ ...FONTS.heading_02 }}>Choose Your Challenge</h2>
								
								{/* Responsive Tab Buttons */}
								<div className='flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto'>
									<Button
										onClick={() => setCurrentMode('grammar')}
										className='px-3 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300'
										style={{
											background: currentMode === 'grammar' 
												? COLORS.blue_01 
												: COLORS.bg_Colour,
											border: `2px solid ${COLORS.blue_01}`,
											boxShadow: currentMode === 'grammar' 
												? `0 4px 15px rgba(52, 152, 219, 0.4)` 
												: `rgba(255, 255, 255, 0.7) -2px -2px 4px, rgba(189, 194, 199, 0.75) 2px 2px 4px`,
											transform: currentMode === 'grammar' ? 'scale(1.02)' : 'scale(1)',
											...FONTS.para_02,
											color: currentMode === 'grammar' ? COLORS.white : COLORS.blue_01,
											fontWeight: 'bold',
											fontSize: '12px'
										}}
									>
										<BookOpen size={14} className='sm:w-[18px] sm:h-[18px]' /> 
										<span className='text-xs sm:text-base'>Grammar Challenge</span>
									</Button>
									<Button
										onClick={() => grammarCompleted && setCurrentMode('speaking')}
										disabled={!grammarCompleted}
										className='px-3 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300'
										style={{
											background: currentMode === 'speaking' 
												? COLORS.light_green 
												: COLORS.bg_Colour,
											border: `2px solid ${grammarCompleted ? COLORS.light_green : COLORS.text_desc}`,
											boxShadow: currentMode === 'speaking' 
												? `0 4px 15px rgba(46, 204, 113, 0.4)` 
												: `rgba(255, 255, 255, 0.7) -2px -2px 4px, rgba(189, 194, 199, 0.75) 2px 2px 4px`,
											transform: currentMode === 'speaking' ? 'scale(1.02)' : 'scale(1)',
											opacity: grammarCompleted ? 1 : 0.6,
											...FONTS.para_02,
											color: currentMode === 'speaking' ? COLORS.white : grammarCompleted ? COLORS.light_green : COLORS.text_desc,
											fontWeight: 'bold',
											fontSize: '12px'
										}}
									>
										<Mic size={14} className='sm:w-[18px] sm:h-[18px]' /> 
										<span className='text-xs sm:text-base'>Speaking Practice</span>
										{!grammarCompleted && <Lock size={12} className='sm:w-4 sm:h-4' />}
									</Button>
								</div>
							</div>

							{currentMode === 'grammar' ? (
								<GrammarComponent 
									grammarCompleted={grammarCompleted}
									setGrammarCompleted={(completed) => {
										setGrammarCompleted(completed);
										if (completed) addXP(50); // Award XP for completing grammar
									}}
									grammarTestScore={grammarTestScore}
									setGrammarTestScore={setGrammarTestScore}
								/>
							) : (
								<SpeakingComponent 
									currentTopic={currentTopic}
									currentLevel={currentLevel}
									levelScores={levelScores}
									setLevelScores={(scores) => {
										setLevelScores(scores);
										// Award XP for good speaking scores
										const latestScore = Object.values(scores).pop() as number;
										if (latestScore >= 90) addXP(30);
										else if (latestScore >= 70) addXP(20);
										else if (latestScore >= 50) addXP(10);
									}}
									unlockedLevels={unlockedLevels}
									setUnlockedLevels={setUnlockedLevels}
									unlockedTopics={unlockedTopics}
									setUnlockedTopics={setUnlockedTopics}
								/>
							)}
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SpokenEnglishLearning;