/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { Lock, Trophy, Flame, Target, Award, BookOpen, Mic, Star } from 'lucide-react';
import GrammarComponent from './GrammarComponent';
import SpeakingComponent from './SpeakingComponent';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { speakEngUpdateThunks } from './service';

const SpokenEnglishLearning = () => {
	const engScore: any = useSelector((state: RootState) => state.ProfileSlice.engscore)
	const [currentTopic, setCurrentTopic] = useState('Professional Introduction');
	const [currentLevel, setCurrentLevel] = useState('Beginner');
	const [currentMode, setCurrentMode] = useState<'grammar' | 'speaking'>('grammar');
	const [grammarCompleted, setGrammarCompleted] = useState(engScore?.grammarCompleted);
	const [grammarTestScore, setGrammarTestScore] = useState(engScore?.grammarTestScore);
	const [unlockedLevels, setUnlockedLevels] = useState<string[]>(engScore?.unlockedLevels);
	const [unlockedTopics, setUnlockedTopics] = useState<Record<string, string[]>>({
		Beginner: ['Professional Introduction'],
		Intermediate: [],
		Advanced: [],
		Professional: []
	});
	const [levelScores, setLevelScores] = useState<Record<string, number>>(engScore?.levelScores);
	const [dailyStreak, setDailyStreak] = useState(engScore?.dailyStreak);
	const [totalXP, setTotalXP] = useState(engScore?.totalXP);
	const [achievements, setAchievements] = useState<string[]>(engScore?.achievements);
	const [lastPracticeDate, setLastPracticeDate] = useState<Date | null>(engScore?.lastPracticeDate);
	const dispatch = useDispatch<AppDispatch>()
	const levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];
	const streakUpdated = useRef(false);
	type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';

	const topics: Record<Level, string[]> = {
		Beginner: ['Professional Introduction', 'Career Goals', 'Skills & Strengths', 'Work Experience'],
		Intermediate: ['Job Interview', 'Team Collaboration', 'Problem Solving', 'Project Management'],
		Advanced: ['Business Presentations', 'Client Communication', 'Performance Review', 'Industry Analysis'],
		Professional: ['Executive Leadership', 'Strategic Planning', 'Stakeholder Management', 'Innovation & Growth']
	};


	useEffect(() => {
		(async () => {
			setGrammarCompleted(engScore?.grammarCompleted || false);
			setGrammarTestScore(engScore?.grammarTestScore || 0);
			setUnlockedLevels(engScore?.unlockedLevels || ['Beginner']);
			setUnlockedTopics(engScore?.unlockedTopics || {
				Beginner: ['Professional Introduction'],
				Intermediate: [],
				Advanced: [],
				Professional: []
			});
			setLevelScores(engScore?.levelScores || {});
			setDailyStreak(engScore?.dailyStreak ?? 0);
			setTotalXP(engScore?.totalXP || 0);
			setAchievements(engScore?.achievements || []);
			setLastPracticeDate(engScore?.lastPracticeDate ? new Date(engScore?.lastPracticeDate) : null);
			if (!engScore?.unlockedTopics[engScore?.unlockedLevels[0]]?.includes(currentTopic)) {
				const firstTopic = engScore?.unlockedTopics[engScore?.unlockedLevels[0]][0];
				if (firstTopic) setCurrentTopic(firstTopic);
			}
		})();
	}, [currentTopic, engScore?.achievements, engScore?.dailyStreak, engScore?.grammarCompleted, engScore?.grammarTestScore, engScore?.lastPracticeDate, engScore?.levelScores, engScore?.totalXP, engScore?.unlockedLevels, engScore?.unlockedTopics]);

	useEffect(() => {
		if (!streakUpdated.current && engScore) {
			(async () => {
				const today = new Date();
				let newStreak = dailyStreak;

				if (lastPracticeDate) {
					const daysDiff = Math.floor((today.getTime() - lastPracticeDate.getTime()) / (1000 * 60 * 60 * 24));
					if (daysDiff === 1) {
						newStreak = dailyStreak + 1;
					} else if (daysDiff > 1) {
						newStreak = 1;
					}
				} else {
					newStreak = 1;
				}

				if (newStreak !== dailyStreak) {
					setDailyStreak(newStreak);
					dispatch(speakEngUpdateThunks({ dailyStreak: newStreak, lastPracticeDate: today.toISOString() }));
				}

				setLastPracticeDate(today);
				streakUpdated.current = true;
			})();
		}
	}, [dailyStreak, dispatch, lastPracticeDate, engScore]);

	const addXP = async (points: number) => {
		const newXP = totalXP + points;
		setTotalXP(newXP);
		dispatch(speakEngUpdateThunks({ totalXP: newXP }))
		checkAchievements(newXP);
	};

	const checkAchievements = async (xp: number) => {
		const newAchievements = [...achievements];
		if (xp >= 100 && !achievements.includes('first-100')) newAchievements.push('first-100');
		if (xp >= 500 && !achievements.includes('xp-master')) newAchievements.push('xp-master');
		if (dailyStreak >= 7 && !achievements.includes('week-warrior')) newAchievements.push('week-warrior');
		if (grammarCompleted && !achievements.includes('grammar-guru')) newAchievements.push('grammar-guru');
		if (newAchievements.length > achievements.length) {
			setAchievements(newAchievements);
			dispatch(speakEngUpdateThunks({ achievements: newAchievements }))
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


	const onGrammarCompleted = async (completed: boolean) => {
		setGrammarCompleted(completed);
		dispatch(speakEngUpdateThunks({ grammarCompleted: completed }))
		if (completed) addXP(50);
	};

	const onGrammarTestScoreChange = async (score: number) => {
		setGrammarTestScore(score);
		dispatch(speakEngUpdateThunks({ grammarTestScore: score }))
	};

	const onSpeakingUpdate = async (updates: {
		levelScores?: Record<string, number>;
		unlockedLevels?: string[];
		unlockedTopics?: Record<string, string[]>;
	}) => {
		if (updates.levelScores) setLevelScores(prev => ({ ...prev, ...updates.levelScores }));
		if (updates.unlockedLevels) setUnlockedLevels(updates.unlockedLevels);
		if (updates.unlockedTopics) setUnlockedTopics(updates.unlockedTopics);
		dispatch(speakEngUpdateThunks(updates))
	};

	return (
		<div className='relative w-full max-w-7xl mx-auto p-4 md:p-6'>
			<div className='flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]'>
				<div className='w-full lg:w-80 flex-shrink-0 lg:h-full'>
					<div className='lg:sticky lg:top-0 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto'>
						<Card className='p-4 h-fit' style={{ backgroundColor: COLORS.bg_Colour }}>
							<h2 style={{ ...FONTS.heading_03 }} className='mb-4'>Learning Path</h2>
							<div className='space-y-4'>
								{levels?.map((level, i) => {
									const isUnlocked = unlockedLevels?.includes(level);
									const isActive = currentLevel === level;
									return (
										<div key={level} className='relative'>
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
													{i + 1}
												</div>
												<span style={{ ...FONTS.para_02, fontWeight: isActive ? 'bold' : 'normal' }}>
													<span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
														{level} {!isUnlocked && <Lock size={12} />}
													</span>
												</span>
											</div>
											{isActive && (
												<div className='ml-9 mt-2 space-y-2'>
													{(topics['Beginner' as Level])?.map((topic: any) => {
														const isTopicUnlocked = unlockedTopics?.[currentLevel as Level]?.includes(topic);
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
																		<span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
																			{topic} {!isTopicUnlocked && <Lock size={10} />}
																		</span>
																	</span>
																	{levelScores?.[`${currentLevel}-${topic}`] && levelScores?.[`${currentLevel}-${topic}`] >= 90 && (
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
											{i < levels.length - 1 && (
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
				<div className='flex-1 lg:h-full lg:overflow-y-auto'>
					<div className='space-y-6'>
						<Card className='p-4 md:p-6' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px` }}>
							<h1 style={{ ...FONTS.heading_01 }} className='text-center mb-2'>English Mastery Challenge</h1>
							<p style={{ ...FONTS.para_01 }} className='text-center mb-4'>Classie-style grammar and speaking practice</p>
							<div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4'>
								<div className='text-center p-2 md:p-3 rounded-lg' style={{ backgroundColor: COLORS.white, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75)` }}>
									<div className='flex items-center justify-center mb-1'><Flame size={16} color={COLORS.light_orange} className='md:w-5 md:h-5' /></div>
									<p style={{ ...FONTS.heading_03, color: COLORS.light_orange, fontSize: '14px' }} className='md:text-base'>{dailyStreak}</p>
									<p style={{ ...FONTS.para_03, fontSize: '11px' }} className='md:text-sm'>Day Streak</p>
								</div>
								<div className='text-center p-2 md:p-3 rounded-lg' style={{ backgroundColor: COLORS.white, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75)` }}>
									<div className='flex items-center justify-center mb-1'><Target size={16} color={COLORS.blue_01} className='md:w-5 md:h-5' /></div>
									<p style={{ ...FONTS.heading_03, color: COLORS.blue_01, fontSize: '14px' }} className='md:text-base'>{totalXP}</p>
									<p style={{ ...FONTS.para_03, fontSize: '11px' }} className='md:text-sm'>Total XP</p>
								</div>
								<div className='text-center p-2 md:p-3 rounded-lg' style={{ backgroundColor: COLORS.white, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75)` }}>
									<div className='flex items-center justify-center mb-1'><Trophy size={16} color={COLORS.light_green} className='md:w-5 md:h-5' /></div>
									<p style={{ ...FONTS.heading_03, color: COLORS.light_green, fontSize: '14px' }} className='md:text-base'>{Object.keys(levelScores ?? []).length}</p>
									<p style={{ ...FONTS.para_03, fontSize: '11px' }} className='md:text-sm'>Completed</p>
								</div>
								<div className='text-center p=2 md:p-3 rounded-lg' style={{ backgroundColor: COLORS.white, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75)` }}>
									<div className='flex items-center justify-center mb-1'><Award size={16} color={COLORS.purple_01} className='md:w-5 md:h-5' /></div>
									<p style={{ ...FONTS.heading_03, color: COLORS.purple_01, fontSize: '14px' }} className='md:text-base'>{achievements?.length}</p>
									<p style={{ ...FONTS.para_03, fontSize: '11px' }} className='md:text-sm'>Achievements</p>
								</div>
							</div>
							{achievements?.length > 0 && (
								<div className='mb-4'>
									<h3 style={{ ...FONTS.heading_04 }} className='mb-2'>Recent Achievements</h3>
									<div className='flex gap-2 flex-wrap'>
										{achievements.slice(-3).map(id => {
											const info = getAchievementInfo(id);
											return (
												<div key={id} className='flex items-center gap-2 px-2 md:px-3 py-1 md:py-2 rounded-lg' style={{ backgroundColor: COLORS.light_orange, color: COLORS.white }} title={info.description}>
													{info.icon}
													<span style={{ ...FONTS.para_03, fontWeight: 'bold', fontSize: '11px' }} className='md:text-sm'>{info.title}</span>
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
								<div className='flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto'>
									<Button
										onClick={() => setCurrentMode('grammar')}
										className='px-3 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300'
										style={{
											background: currentMode === 'grammar' ? COLORS.blue_01 : COLORS.bg_Colour,
											border: `2px solid ${COLORS.blue_01}`,
											boxShadow: currentMode === 'grammar' ? `0 4px 15px rgba(52, 152, 219, 0.4)` : `rgba(255, 255, 255, 0.7) -2px -2px 4px, rgba(189, 194, 199, 0.75) 2px 2px 4px`,
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
											background: currentMode === 'speaking' ? COLORS.light_green : COLORS.bg_Colour,
											border: `2px solid ${grammarCompleted ? COLORS.light_green : COLORS.text_desc}`,
											boxShadow: currentMode === 'speaking' ? `0 4px 15px rgba(46, 204, 113, 0.4)` : `rgba(255, 255, 255, 0.7) -2px -2px 4px, rgba(189, 194, 199, 0.75) 2px 2px 4px`,
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
									setGrammarCompleted={onGrammarCompleted}
									grammarTestScore={grammarTestScore}
									setGrammarTestScore={onGrammarTestScoreChange}
								/>
							) : (
								<SpeakingComponent
									currentTopic={currentTopic}
									currentLevel={currentLevel}
									levelScores={levelScores}
									setLevelScores={(scores) => {
										onSpeakingUpdate({ levelScores: scores });
									}}
									unlockedLevels={unlockedLevels}
									setUnlockedLevels={(levels) => {
										onSpeakingUpdate({ unlockedLevels: levels });
									}}
									unlockedTopics={unlockedTopics}
									setUnlockedTopics={(topics) => {
										onSpeakingUpdate({ unlockedTopics: topics });
									}}
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