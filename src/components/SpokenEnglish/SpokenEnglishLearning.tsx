import { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { Mic, Square } from 'lucide-react';

const SpokenEnglishLearning = () => {
	const [isRecording, setIsRecording] = useState(false);
	const [transcript, setTranscript] = useState('');
	const [feedback, setFeedback] = useState('');
	const [currentTopic, setCurrentTopic] = useState('Self Introduction');
	const [currentLevel, setCurrentLevel] = useState('Beginner');
	const [unlockedLevels, setUnlockedLevels] = useState(['Beginner']);
	const [unlockedTopics, setUnlockedTopics] = useState({ Beginner: ['Self Introduction'], Intermediate: [], Advanced: [], Professional: [] });
	const [score, setScore] = useState(0);
	const [sessionTime, setSessionTime] = useState(0);
	const [wordsPerMinute, setWordsPerMinute] = useState(0);
	const [pronunciationScore, setPronunciationScore] = useState(0);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const recognitionRef = useRef<SpeechRecognition | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

	const topics = {
		Beginner: ['Self Introduction', 'Family & Friends', 'Daily Routine', 'Food & Drinks'],
		Intermediate: ['Travel & Tourism', 'Work & Career', 'Hobbies & Interests', 'Health & Fitness'],
		Advanced: ['Business Meetings', 'Presentations', 'Negotiations', 'Academic Discussions'],
		Professional: ['Leadership', 'Strategic Planning', 'Client Relations', 'Public Speaking']
	};

	useEffect(() => {
		if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			recognitionRef.current = new SpeechRecognition();
			recognitionRef.current.continuous = true;
			recognitionRef.current.interimResults = true;
			recognitionRef.current.lang = 'en-US';
			recognitionRef.current.maxAlternatives = 1;
			recognitionRef.current.serviceURI = '';
			console.log('Speech recognition initialized');

			recognitionRef.current.onresult = (event) => {
				let interimTranscript = '';
				let finalTranscript = '';
				
				for (let i = event.resultIndex; i < event.results.length; i++) {
					if (event.results[i].isFinal) {
						finalTranscript += event.results[i][0].transcript;
					} else {
						interimTranscript += event.results[i][0].transcript;
					}
				}
				
				if (finalTranscript || interimTranscript) {
					setTranscript(prev => (prev + ' ' + (finalTranscript || interimTranscript)).trim());
				}
			};
			
			recognitionRef.current.onerror = (event) => {
				console.error('Speech recognition error:', event.error);
				if (event.error === 'no-speech') {
					setFeedback('No speech detected. Please speak louder or check microphone.');
				} else if (event.error === 'audio-capture') {
					setFeedback('Microphone not accessible. Please check permissions.');
				} else if (event.error === 'not-allowed') {
					setFeedback('Microphone permission denied. Please allow access.');
				} else {
					setFeedback('Speech recognition error. Please try again.');
				}
			};
			
			recognitionRef.current.onend = () => {
				if (isRecording) {
					try {
						recognitionRef.current?.start();
					} catch (error) {
						console.log('Recognition restart failed:', error);
					}
				}
			};
		}
	}, []);

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ 
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true,
					sampleRate: 44100
				}
			});
			mediaRecorderRef.current = new MediaRecorder(stream);
			
			setIsRecording(true);
			setTranscript('');
			setFeedback('');
			setSessionTime(0);
			setScore(0);
			setWordsPerMinute(0);
			setPronunciationScore(0);
			
			timerRef.current = setInterval(() => {
				setSessionTime(prev => prev + 1);
			}, 1000);
			
			if (recognitionRef.current) {
				try {
					recognitionRef.current.start();
					console.log('Speech recognition started');
				} catch (error) {
					console.error('Failed to start recognition:', error);
					setFeedback('Failed to start voice recognition. Please try again.');
				}
			} else {
				setFeedback('Speech recognition not supported in this browser.');
			}
		} catch (error) {
			console.error('Error accessing microphone:', error);
			setFeedback('Microphone access denied. Please allow access and try again.');
		}
	};

	const stopRecording = () => {
		setIsRecording(false);
		
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
		
		if (recognitionRef.current) {
			recognitionRef.current.stop();
		}
		
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
		}
		
		// Calculate metrics after stopping
		setTimeout(() => {
			const currentTranscript = transcript.trim();
			console.log('Final transcript:', currentTranscript);
			if (currentTranscript) {
				calculateMetrics(currentTranscript);
				generateAIFeedback(currentTranscript);
			} else {
				setFeedback('No speech detected. Please check your microphone and try again.');
			}
		}, 1000);
	};

	const calculateMetrics = (text: string) => {
		if (!text.trim()) return;
		
		const words = text.trim().split(/\s+/).filter(word => word.trim().length > 0);
		const wordCount = words.length;
		const minutes = sessionTime > 0 ? sessionTime / 60 : 0.1;
		const wpm = Math.max(1, Math.round(wordCount / minutes));
		
		console.log('Calculating metrics:', { wordCount, sessionTime, minutes, wpm });
		
		setWordsPerMinute(wpm);
		
		// Pronunciation scoring
		const avgWordLength = wordCount > 0 ? words.reduce((sum, word) => sum + word.length, 0) / wordCount : 0;
		const complexWords = words.filter(word => word.length > 6).length;
		const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
		const vocabularyRatio = wordCount > 0 ? uniqueWords / wordCount : 0;
		
		let pronScore = 50;
		pronScore += Math.min(25, avgWordLength * 3);
		pronScore += Math.min(15, complexWords * 2);
		pronScore += Math.min(10, vocabularyRatio * 20);
		
		const finalPronScore = Math.round(Math.min(100, pronScore));
		setPronunciationScore(finalPronScore);
		
		// Overall score
		let totalScore = 20; // Base score
		if (wpm >= 120 && wpm <= 180) totalScore += 40;
		else if (wpm >= 80) totalScore += 30;
		else if (wpm >= 40) totalScore += 20;
		
		totalScore += Math.round(finalPronScore * 0.4);
		const finalScore = Math.min(100, Math.max(0, totalScore));
		
		console.log('Final scores:', { wpm, finalPronScore, finalScore });
		setScore(finalScore);
		
		// Unlock next topic if score >= 90
		if (finalScore >= 90) {
			const currentTopics = topics[currentLevel as keyof typeof topics];
			const currentTopicIndex = currentTopics.indexOf(currentTopic);
			
			if (currentTopicIndex < currentTopics.length - 1) {
				const nextTopic = currentTopics[currentTopicIndex + 1];
				setUnlockedTopics(prev => ({
					...prev,
					[currentLevel]: prev[currentLevel as keyof typeof prev].includes(nextTopic) 
						? prev[currentLevel as keyof typeof prev] 
						: [...prev[currentLevel as keyof typeof prev], nextTopic]
				}));
			} else {
				// All topics completed, unlock next level
				const levelOrder = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];
				const currentIndex = levelOrder.indexOf(currentLevel);
				if (currentIndex < levelOrder.length - 1) {
					const nextLevel = levelOrder[currentIndex + 1];
					if (!unlockedLevels.includes(nextLevel)) {
						setUnlockedLevels(prev => [...prev, nextLevel]);
						const firstTopicOfNextLevel = topics[nextLevel as keyof typeof topics][0];
						setUnlockedTopics(prev => ({
							...prev,
							[nextLevel]: [firstTopicOfNextLevel]
						}));
					}
				}
			}
		}
	};

	const generateAIFeedback = (text: string) => {
		if (!text.trim()) return;
		
		const words = text.trim().split(/\s+/).filter(w => w.length > 0);
		const wordCount = words.length;
		const minutes = sessionTime > 0 ? sessionTime / 60 : 0.1;
		const currentWpm = Math.round(wordCount / minutes);
		
		let feedback = '';
		
		if (wordCount < 3) {
			feedback = 'Try speaking more words to get better analysis.';
		} else if (currentWpm < 40) {
			feedback = 'Good start! Try to speak a bit faster for more natural flow.';
		} else if (currentWpm > 200) {
			feedback = 'You\'re speaking very fast! Slow down for better clarity.';
		} else if (currentWpm >= 80 && currentWpm <= 150) {
			feedback = 'Excellent speaking pace! Your fluency is very good.';
		} else {
			feedback = `Good speaking! You spoke ${wordCount} words in ${sessionTime} seconds.`;
		}
		
		setFeedback(feedback);
	};

	const getTopicPrompt = (topic: string, level: string) => {
		const prompts: Record<string, Record<string, string>> = {
			Beginner: {
				'Self Introduction': 'Tell me your name, age, and where you live. Speak for 1 minute.',
				'Family & Friends': 'Describe your family members and your best friend.',
				'Daily Routine': 'What do you do from morning to evening every day?',
				'Food & Drinks': 'What is your favorite food? Why do you like it?'
			},
			Intermediate: {
				'Travel & Tourism': 'Describe a place you visited recently. What made it special?',
				'Work & Career': 'Explain your current job and future career goals.',
				'Hobbies & Interests': 'Discuss your hobbies and how they benefit you.',
				'Health & Fitness': 'How do you maintain your health and fitness?'
			},
			Advanced: {
				'Business Meetings': 'Present a business proposal for a new product launch.',
				'Presentations': 'Explain a complex topic to a professional audience.',
				'Negotiations': 'Negotiate terms for a business partnership.',
				'Academic Discussions': 'Analyze the impact of technology on education.'
			},
			Professional: {
				'Leadership': 'Describe your leadership philosophy and management style.',
				'Strategic Planning': 'Outline a 5-year strategic plan for business growth.',
				'Client Relations': 'Handle a difficult client situation professionally.',
				'Public Speaking': 'Deliver a keynote speech on industry trends.'
			}
		};
		return prompts[level]?.[topic] || 'Speak about the given topic for 2 minutes.';
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
											{level} {!isUnlocked && '🔒'}
										</span>
									</div>
									
									{/* Topics for current level */}
									{isActive && (
										<div className='ml-9 mt-2 space-y-2'>
											{topics[currentLevel as keyof typeof topics].map((topic, topicIndex) => {
												const isTopicUnlocked = unlockedTopics[currentLevel as keyof typeof unlockedTopics].includes(topic);
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
														<span style={{ ...FONTS.para_03, fontSize: '13px' }}>
															{topic} {!isTopicUnlocked && '🔒'}
														</span>
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
				<h2 style={{ ...FONTS.heading_02 }} className='mb-6'>Speaking Practice</h2>

				<Card className='p-4 mb-6' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75), inset -2px -2px 3px rgba(255, 255, 255, 0.7)` }}>
					<div className='flex justify-between items-start mb-2'>
						<h3 style={{ ...FONTS.heading_04 }}>Practice Prompt:</h3>
						<span style={{ ...FONTS.para_02, color: COLORS.blue_01, fontWeight: 'bold' }}>{currentLevel}</span>
					</div>
					<p style={{ ...FONTS.para_02, lineHeight: '1.6' }}>{getTopicPrompt(currentTopic, currentLevel)}</p>
					<div className='mt-3 p-2 rounded' style={{ backgroundColor: COLORS.light_blue,  }}>
						<p style={{ ...FONTS.para_03, color: COLORS.black, fontWeight: 'bold', textAlign: 'center' }}>
							💡 Score 90+ to unlock next level/topic
						</p>
					</div>
				</Card>

				<div className='text-center mb-6'>
					<Button
						onClick={isRecording ? stopRecording : startRecording}
						className={`px-6 py-3 rounded-full ${isRecording ? 'animate-pulse' : ''} flex items-center gap-2`}
						style={{
							background: isRecording 
								? `linear-gradient(to right, ${COLORS.light_red}, #ff4444)` 
								: `linear-gradient(to right, ${COLORS.light_green}, ${COLORS.green_text})`,
							color: COLORS.white,
							boxShadow: `0px 2px 4px 0px rgba(255,255,255,0.75) inset, 3px 3px 3px 0px rgba(255,255,255,0.25) inset, -8px -8px 12px 0px ${isRecording ? COLORS.light_red : COLORS.light_green} inset, 4px 4px 8px 0px rgba(189,194,199,0.75)`,
							...FONTS.heading_05
						}}
					>
						{isRecording ? <Square size={20} /> : <Mic size={20} />}
						{isRecording ? 'Stop Recording' : 'Start Speaking'}
					</Button>
				</div>

				{transcript && (
					<Card className='p-4 mb-4' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px` }}>
						<h3 style={{ ...FONTS.heading_04 }} className='mb-2'>What you said:</h3>
						<p style={{ ...FONTS.para_02, backgroundColor: COLORS.white, padding: '12px', borderRadius: '8px', boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75)` }}>
							{transcript}
						</p>
					</Card>
				)}

				{feedback && (
					<Card className='p-4' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px`, border: `2px solid ${COLORS.light_green_03}` }}>
						<h3 style={{ ...FONTS.heading_04, color: COLORS.light_green }} className='mb-2'>
							AI Feedback:
						</h3>
						<p style={{ ...FONTS.para_02, color: COLORS.green_text }}>
							{feedback}
						</p>
					</Card>
				)}
			</Card>

			<Card className='p-6' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px` }}>
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
			</Card>
			</div>
		</div>
	);
};

export default SpokenEnglishLearning;