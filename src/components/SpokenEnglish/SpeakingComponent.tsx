import { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { Mic, Square, Lightbulb, Trophy, Star, Timer, Volume2, RotateCcw } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface SpeakingComponentProps {
	currentTopic: string;
	currentLevel: string;
	levelScores: Record<string, number>;
	setLevelScores: (scores: Record<string, number>) => void;
	unlockedLevels: string[];
	setUnlockedLevels: (levels: string[]) => void;
	unlockedTopics: Record<string, string[]>;
	setUnlockedTopics: (topics: Record<string, string[]>) => void;
}

const SpeakingComponent = ({ 
	currentTopic, 
	currentLevel, 
	levelScores, 
	setLevelScores,
	unlockedLevels,
	setUnlockedLevels,
	unlockedTopics,
	setUnlockedTopics
}: SpeakingComponentProps) => {
	const [isRecording, setIsRecording] = useState(false);
	const [feedback, setFeedback] = useState('');
	const [score, setScore] = useState(0);
	const [sessionTime, setSessionTime] = useState(0);
	const [wordsPerMinute, setWordsPerMinute] = useState(0);
	const [pronunciationScore, setPronunciationScore] = useState(0);
	const [showFeedbackModal, setShowFeedbackModal] = useState(false);

	const [attempts, setAttempts] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
	const lastTranscriptRef = useRef<string>('');

	useEffect(() => {
		const savedBestScore = localStorage.getItem(`bestScore-${currentLevel}-${currentTopic}`);
		if (savedBestScore) setBestScore(parseInt(savedBestScore));
	}, [currentLevel, currentTopic]);

	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition
	} = useSpeechRecognition();

	const topics = {
		Beginner: ['Professional Introduction', 'Career Goals', 'Skills & Strengths', 'Work Experience'],
		Intermediate: ['Job Interview', 'Team Collaboration', 'Problem Solving', 'Project Management'],
		Advanced: ['Business Presentations', 'Client Communication', 'Performance Review', 'Industry Analysis'],
		Professional: ['Executive Leadership', 'Strategic Planning', 'Stakeholder Management', 'Innovation & Growth']
	};

	// Auto-off when no speech for 10 seconds
	useEffect(() => {
		if (isRecording) {
			// Clear existing silence timer
			if (silenceTimerRef.current) {
				clearTimeout(silenceTimerRef.current);
			}
			// Start new silence timer
			silenceTimerRef.current = setTimeout(() => {
				stopRecording();
			}, 10000); // 10 seconds
			
			lastTranscriptRef.current = transcript;
		} else {
			// Clear timer when not recording
			if (silenceTimerRef.current) {
				clearTimeout(silenceTimerRef.current);
			}
		}
	}, [transcript, isRecording]);

	useEffect(() => {
		if (!browserSupportsSpeechRecognition) {
			setFeedback('Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.');
		}
	}, [browserSupportsSpeechRecognition]);

	const startRecording = async () => {
		if (!browserSupportsSpeechRecognition) {
			setFeedback('Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.');
			return;
		}

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
			resetTranscript();
			setFeedback('');
			setSessionTime(0);
			setScore(0);
			setWordsPerMinute(0);
			setPronunciationScore(0);
			
			timerRef.current = setInterval(() => {
				setSessionTime(prev => prev + 1);
			}, 1000);
			
			SpeechRecognition.startListening({ 
				continuous: true,
				language: 'en-US'
			});
			console.log('Speech recognition started with react-speech-recognition');
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
		
		if (silenceTimerRef.current) {
			clearTimeout(silenceTimerRef.current);
		}
		
		SpeechRecognition.stopListening();
		
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

	const checkTopicRelevance = (text: string, topic: string): { isRelevant: boolean; score: number; feedback: string } => {
		const topicKeywords: Record<string, string[]> = {
			'Professional Introduction': ['name', 'role', 'experience', 'skills', 'background', 'expertise', 'professional', 'career', 'qualifications', 'achievements', 'industry', 'position'],
			'Career Goals': ['goals', 'ambition', 'future', 'career', 'growth', 'development', 'objectives', 'aspirations', 'plan', 'vision', 'success', 'advancement'],
			'Skills & Strengths': ['skills', 'strengths', 'abilities', 'competencies', 'expertise', 'talent', 'proficient', 'capable', 'knowledge', 'experience', 'technical', 'soft skills'],
			'Work Experience': ['experience', 'work', 'job', 'role', 'responsibilities', 'achievements', 'projects', 'company', 'position', 'career', 'professional', 'accomplishments'],
			'Job Interview': ['interview', 'position', 'role', 'qualifications', 'experience', 'skills', 'company', 'opportunity', 'candidate', 'fit', 'motivation', 'questions'],
			'Team Collaboration': ['team', 'collaboration', 'teamwork', 'colleagues', 'cooperation', 'communication', 'support', 'together', 'group', 'collective', 'partnership', 'synergy'],
			'Problem Solving': ['problem', 'solution', 'solve', 'challenge', 'issue', 'approach', 'analysis', 'resolution', 'strategy', 'method', 'critical thinking', 'decision'],
			'Project Management': ['project', 'management', 'planning', 'timeline', 'resources', 'team', 'deliverables', 'milestones', 'budget', 'coordination', 'execution', 'completion'],
			'Business Presentations': ['presentation', 'business', 'audience', 'data', 'results', 'analysis', 'proposal', 'strategy', 'insights', 'recommendations', 'professional', 'communicate'],
			'Client Communication': ['client', 'customer', 'communication', 'relationship', 'service', 'needs', 'requirements', 'satisfaction', 'professional', 'support', 'feedback', 'expectations'],
			'Performance Review': ['performance', 'review', 'goals', 'achievements', 'feedback', 'improvement', 'development', 'evaluation', 'progress', 'objectives', 'growth', 'assessment'],
			'Industry Analysis': ['industry', 'market', 'trends', 'analysis', 'competition', 'opportunities', 'challenges', 'growth', 'insights', 'research', 'data', 'business'],
			'Executive Leadership': ['leadership', 'executive', 'vision', 'strategy', 'decision', 'management', 'team', 'organization', 'direction', 'influence', 'responsibility', 'guidance'],
			'Strategic Planning': ['strategy', 'planning', 'goals', 'objectives', 'vision', 'future', 'growth', 'development', 'business', 'market', 'competitive', 'long-term'],
			'Stakeholder Management': ['stakeholder', 'management', 'relationship', 'communication', 'expectations', 'interests', 'engagement', 'alignment', 'collaboration', 'influence', 'partnership', 'value'],
			'Innovation & Growth': ['innovation', 'growth', 'development', 'creative', 'new', 'improvement', 'technology', 'opportunity', 'change', 'progress', 'advancement', 'transformation']
		};

		const keywords = topicKeywords[topic] || [];
		const textLower = text.toLowerCase();
		const matchedKeywords = keywords.filter(keyword => textLower.includes(keyword.toLowerCase()));
		const relevanceScore = Math.round((matchedKeywords.length / Math.max(keywords.length, 1)) * 100);

		const isRelevant = relevanceScore >= 30; // At least 30% keyword match
		const feedback = isRelevant 
			? `Good! Your response is relevant to ${topic}.` 
			: `Please speak more about ${topic}. Try to include relevant keywords and stay on topic.`;

		return { isRelevant, score: relevanceScore, feedback };
	};

	const checkGrammar = (text: string): { hasErrors: boolean; score: number; feedback: string } => {
		const commonErrors = [
			{ pattern: /\b(he|she|it)\s+(go|do|have)\b/gi, correction: 'Use goes/does/has for he/she/it' },
			{ pattern: /\b(I|you|we|they)\s+(goes|does|has)\b/gi, correction: 'Use go/do/have for I/you/we/they' },
			{ pattern: /\bdidnt\s+(went|came|saw)\b/gi, correction: "Use base form after didn't (go/come/see)" },
			{ pattern: /\ba\s+[aeiou]/gi, correction: 'Use "an" before vowel sounds' },
			{ pattern: /\ban\s+[bcdfghjklmnpqrstvwxyz]/gi, correction: 'Use "a" before consonant sounds' },
			{ pattern: /\bmuch\s+(books|people|things)\b/gi, correction: 'Use "many" with countable nouns' },
			{ pattern: /\bmany\s+(water|money|time)\b/gi, correction: 'Use "much" with uncountable nouns' }
		];

		let errorCount = 0;
		let corrections: string[] = [];

		commonErrors.forEach(error => {
			const matches = text.match(error.pattern);
			if (matches) {
				errorCount += matches.length;
				corrections.push(error.correction);
			}
		});

		const words = text.trim().split(/\s+/).length;
		const errorRate = words > 0 ? (errorCount / words) * 100 : 0;
		const grammarScore = Math.max(0, Math.round(100 - (errorRate * 10)));
		const hasErrors = errorCount > 0;

		const feedback = hasErrors 
			? `Grammar issues found: ${corrections.slice(0, 2).join(', ')}. Score: ${grammarScore}%`
			: `Good grammar! Score: ${grammarScore}%`;

		return { hasErrors, score: grammarScore, feedback };
	};

	const calculateMetrics = (text: string) => {
		if (!text.trim()) return;
		
		// Check topic relevance first
		const topicCheck = checkTopicRelevance(text, currentTopic);
		if (!topicCheck.isRelevant) {
			setFeedback(`❌ Topic Relevance Issue: ${topicCheck.feedback}\n\nPlease try again and speak specifically about "${currentTopic}".`);
			setScore(0);
			setShowFeedbackModal(true);
			return;
		}

		// Check grammar
		const grammarCheck = checkGrammar(text);
		if (grammarCheck.hasErrors && grammarCheck.score < 60) {
			setFeedback(`❌ Grammar Issues: ${grammarCheck.feedback}\n\nPlease improve your grammar and try again.`);
			setScore(0);
			setShowFeedbackModal(true);
			return;
		}
		
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
		
		// Level-wise harder scoring
		let totalScore = 10;
		let minTime = 30;
		let minWords = 30;
		let wpmMin = 80;
		let wpmMax = 200;

		// Add topic relevance and grammar bonus
		totalScore += Math.round(topicCheck.score * 0.2); // Up to 20 points for topic relevance
		totalScore += Math.round(grammarCheck.score * 0.15); // Up to 15 points for grammar
		
		// Different requirements per level
		if (currentLevel === 'Beginner') {
			totalScore = 15;
			minTime = 45;
			minWords = 80;
			wpmMin = 60;
		} else if (currentLevel === 'Intermediate') {
			totalScore = 10;
			minTime = 75;
			minWords = 120;
			wpmMin = 80;
		} else if (currentLevel === 'Advanced') {
			totalScore = 5;
			minTime = 105;
			minWords = 180;
			wpmMin = 100;
		} else if (currentLevel === 'Professional') {
			totalScore = 0;
			minTime = 135;
			minWords = 250;
			wpmMin = 120;
		}
		
		// WPM scoring
		if (wpm >= wpmMin && wpm <= wpmMax) totalScore += 30;
		else if (wpm >= wpmMin - 20) totalScore += 20;
		else if (wpm >= wpmMin - 40) totalScore += 10;
		
		// Time and word requirements
		if (sessionTime >= minTime) totalScore += 20;
		if (wordCount >= minWords) totalScore += 15;
		
		totalScore += Math.round(finalPronScore * 0.35);
		const finalScore = Math.min(100, Math.max(0, totalScore));
		
		console.log('Final scores:', { wpm, finalPronScore, finalScore });
		setScore(finalScore);
		
		// Update best score
		if (finalScore > bestScore) {
			setBestScore(finalScore);
			localStorage.setItem(`bestScore-${currentLevel}-${currentTopic}`, finalScore.toString());
		}

		// Save score if >= 90
		if (finalScore >= 90) {
			const newScores = { ...levelScores, [`${currentLevel}-${currentTopic}`]: finalScore };
			setLevelScores(newScores);
			localStorage.setItem('levelScores', JSON.stringify(newScores));
			const currentTopics = topics[currentLevel as keyof typeof topics];
			const currentTopicIndex = currentTopics.indexOf(currentTopic);
			
			if (currentTopicIndex < currentTopics.length - 1) {
				const nextTopic = currentTopics[currentTopicIndex + 1];
				const newTopics = {
					...unlockedTopics,
					[currentLevel]: (unlockedTopics[currentLevel as keyof typeof unlockedTopics] as string[]).includes(nextTopic) 
						? (unlockedTopics[currentLevel as keyof typeof unlockedTopics] as string[]) 
						: [...(unlockedTopics[currentLevel as keyof typeof unlockedTopics] as string[]), nextTopic]
				};
				setUnlockedTopics(newTopics);
				localStorage.setItem('unlockedTopics', JSON.stringify(newTopics));
			} else {
				// All topics completed, unlock next level
				const levelOrder = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];
				const currentIndex = levelOrder.indexOf(currentLevel);
				if (currentIndex < levelOrder.length - 1) {
					const nextLevel = levelOrder[currentIndex + 1];
					if (!unlockedLevels.includes(nextLevel)) {
						const newLevels = [...unlockedLevels, nextLevel];
						setUnlockedLevels(newLevels);
						localStorage.setItem('unlockedLevels', JSON.stringify(newLevels));
						
						const firstTopicOfNextLevel = topics[nextLevel as keyof typeof topics][0];
						const newTopics = {
							...unlockedTopics,
							[nextLevel]: [firstTopicOfNextLevel]
						};
						setUnlockedTopics(newTopics);
						localStorage.setItem('unlockedTopics', JSON.stringify(newTopics));
					}
				}
			}
		}

		// Show feedback modal
		setShowFeedbackModal(true);
		setAttempts(prev => prev + 1);
	};

	const generateAIFeedback = (text: string) => {
		if (!text.trim()) return;
		
		const words = text.trim().split(/\s+/).filter(w => w.length > 0);
		const wordCount = words.length;
		const minutes = sessionTime > 0 ? sessionTime / 60 : 0.1;
		const currentWpm = Math.round(wordCount / minutes);
		
		let feedback = '';
		let tips = [];
		
		if (wordCount < 3) {
			feedback = 'Try speaking more words to get better analysis.';
			tips.push('Speak for at least 30 seconds to get detailed feedback');
		} else if (currentWpm < 40) {
			feedback = 'Good start! Try to speak a bit faster for more natural flow.';
			tips.push('Practice speaking at 80-120 words per minute', 'Read aloud daily to improve pace');
		} else if (currentWpm > 200) {
			feedback = 'You\'re speaking very fast! Slow down for better clarity.';
			tips.push('Take pauses between sentences', 'Focus on clear pronunciation');
		} else if (currentWpm >= 80 && currentWpm <= 150) {
			feedback = 'Excellent speaking pace! Your fluency is very good.';
			tips.push('Great job! Keep practicing to maintain consistency');
		} else {
			feedback = `Good speaking! You spoke ${wordCount} words in ${sessionTime} seconds.`;
			tips.push('Try to speak more naturally and fluently');
		}
		
		// Add level-specific tips
		if (currentLevel === 'Beginner') {
			tips.push('Focus on clear pronunciation and simple sentences');
		} else if (currentLevel === 'Intermediate') {
			tips.push('Use varied vocabulary and connect your ideas');
		} else if (currentLevel === 'Advanced') {
			tips.push('Demonstrate complex grammar and professional vocabulary');
		} else if (currentLevel === 'Professional') {
			tips.push('Show leadership language and strategic thinking');
		}
		
		// Add topic and grammar feedback
		const topicCheck = checkTopicRelevance(text, currentTopic);
		const grammarCheck = checkGrammar(text);
		
		let additionalFeedback = '';
		if (topicCheck.score < 50) {
			additionalFeedback += `\n📝 Topic Relevance: ${topicCheck.score}% - Try to include more relevant keywords about "${currentTopic}".`;
		}
		if (grammarCheck.score < 80) {
			additionalFeedback += `\n📚 Grammar: ${grammarCheck.feedback}`;
		}
		
		setFeedback(feedback + '\n\nTips: ' + tips.join('. ') + additionalFeedback);
	};

	const resetPractice = () => {
		setScore(0);
		setSessionTime(0);
		setWordsPerMinute(0);
		setPronunciationScore(0);
		setFeedback('');
		resetTranscript();
		setAttempts(0);
		setShowFeedbackModal(false);
	};

	const speakPrompt = () => {
		if ('speechSynthesis' in window) {
			const utterance = new SpeechSynthesisUtterance(getTopicPrompt(currentTopic, currentLevel));
			utterance.rate = 0.8;
			utterance.pitch = 1;
			window.speechSynthesis.speak(utterance);
		}
	};

	const getTopicPrompt = (topic: string, level: string) => {
		const prompts: Record<string, Record<string, string>> = {
			Beginner: {
				'Professional Introduction': 'Introduce yourself professionally. Include your name, role, experience, and key skills.',
				'Career Goals': 'Describe your career goals and how you plan to achieve them in the next 3-5 years.',
				'Skills & Strengths': 'Explain your key professional skills and strengths with specific examples.',
				'Work Experience': 'Describe your work experience and key achievements in your career.'
			},
			Intermediate: {
				'Job Interview': 'Answer common interview questions: Why should we hire you? What are your strengths?',
				'Team Collaboration': 'Describe how you work effectively in teams and handle team challenges.',
				'Problem Solving': 'Explain your approach to solving complex problems at work with examples.',
				'Project Management': 'Describe how you manage projects from planning to completion.'
			},
			Advanced: {
				'Business Presentations': 'Present quarterly business results and recommendations to stakeholders.',
				'Client Communication': 'Handle a challenging client situation and maintain professional relationships.',
				'Performance Review': 'Conduct a performance review discussion with constructive feedback.',
				'Industry Analysis': 'Analyze current industry trends and their impact on business strategy.'
			},
			Professional: {
				'Executive Leadership': 'Present your leadership vision and strategy for organizational transformation.',
				'Strategic Planning': 'Outline a comprehensive strategic plan for market expansion and growth.',
				'Stakeholder Management': 'Manage conflicting stakeholder interests in a major business decision.',
				'Innovation & Growth': 'Present an innovation strategy to drive business growth and competitive advantage.'
			}
		};
		return prompts[level]?.[topic] || 'Speak about the given topic for 2 minutes.';
	};

	return (
		<>
			{/* Feedback Modal */}
			{showFeedbackModal && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<Card className='p-6 max-w-lg w-full mx-4' style={{ backgroundColor: COLORS.bg_Colour }}>
						<div className='text-center'>
							<div className='mb-4'>
								{score >= 90 ? (
									<Trophy size={64} color={COLORS.light_orange} className='mx-auto mb-2' />
								) : score >= 70 ? (
									<Star size={64} color={COLORS.blue_01} className='mx-auto mb-2' />
								) : (
									<Timer size={64} color={COLORS.text_desc} className='mx-auto mb-2' />
								)}
							</div>
							
							<h3 style={{ ...FONTS.heading_02, color: score >= 90 ? COLORS.light_green : score >= 70 ? COLORS.blue_01 : COLORS.light_red }} className='mb-2'>
								{score >= 90 ? 'Excellent!' : score >= 70 ? 'Good Job!' : 'Keep Practicing!'}
							</h3>
							
							<div className='grid grid-cols-2 gap-4 mb-4'>
								<div className='text-center p-3 rounded' style={{ backgroundColor: COLORS.white }}>
									<p style={{ ...FONTS.heading_03, color: COLORS.blue_01 }}>{score}</p>
									<p style={{ ...FONTS.para_03 }}>Score</p>
								</div>
								<div className='text-center p-3 rounded' style={{ backgroundColor: COLORS.white }}>
									<p style={{ ...FONTS.heading_03, color: COLORS.light_green }}>{bestScore}</p>
									<p style={{ ...FONTS.para_03 }}>Best</p>
								</div>
								<div className='text-center p-3 rounded' style={{ backgroundColor: COLORS.white }}>
									<p style={{ ...FONTS.heading_03, color: COLORS.purple_01 }}>{wordsPerMinute}</p>
									<p style={{ ...FONTS.para_03 }}>WPM</p>
								</div>
								<div className='text-center p-3 rounded' style={{ backgroundColor: COLORS.white }}>
									<p style={{ ...FONTS.heading_03, color: COLORS.light_orange }}>{pronunciationScore}%</p>
									<p style={{ ...FONTS.para_03 }}>Clarity</p>
								</div>
							</div>
							
							{feedback && (
								<div className='mb-4 p-3 rounded text-left' style={{ backgroundColor: '#f0f8ff', border: `1px solid ${COLORS.blue_01}` }}>
									<p style={{ ...FONTS.para_03, color: COLORS.text_desc, whiteSpace: 'pre-line' }}>{feedback}</p>
								</div>
							)}
							
							<div className='flex gap-3 justify-center'>
								<Button
									onClick={() => setShowFeedbackModal(false)}
									className='px-4 py-2 rounded'
									style={{
										background: COLORS.blue_01,
										color: COLORS.white,
										...FONTS.para_02
									}}
								>
									Continue
								</Button>
								<Button
									onClick={() => {
										resetPractice();
									}}
									className='px-4 py-2 rounded flex items-center gap-2'
									style={{
										background: COLORS.light_green,
										color: COLORS.white,
										...FONTS.para_02
									}}
								>
									<RotateCcw size={16} /> Try Again
								</Button>
							</div>
						</div>
					</Card>
				</div>
			)}

			<Card className='p-4 mb-6' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75), inset -2px -2px 3px rgba(255, 255, 255, 0.7)` }}>
				<div className='flex justify-between items-start mb-2'>
					<h3 style={{ ...FONTS.heading_04 }}>Speaking Practice: {currentTopic}</h3>
					<div className='flex items-center gap-3'>
						<span style={{ ...FONTS.para_02, color: COLORS.blue_01, fontWeight: 'bold' }}>{currentLevel}</span>
						{bestScore > 0 && (
							<div className='flex items-center gap-1 px-2 py-1 rounded' style={{ backgroundColor: COLORS.light_orange, color: COLORS.white }}>
								<Star size={14} />
								<span style={{ ...FONTS.para_03, fontWeight: 'bold' }}>{bestScore}</span>
							</div>
						)}
						{levelScores[`${currentLevel}-${currentTopic}`] && (
							<div className='flex items-center gap-1 px-2 py-1 rounded' style={{ backgroundColor: COLORS.light_green, color: COLORS.white }}>
								<Trophy size={14} />
								<span style={{ ...FONTS.para_03, fontWeight: 'bold' }}>Unlocked</span>
							</div>
						)}
					</div>
				</div>
				
				<div className='flex items-start gap-3 mb-3'>
					<p style={{ ...FONTS.para_02, lineHeight: '1.6', flex: 1 }}>{getTopicPrompt(currentTopic, currentLevel)}</p>
					<Button
						onClick={speakPrompt}
						className='p-2 rounded'
						style={{
							background: COLORS.light_blue,
							color: COLORS.white
						}}
						title='Listen to prompt'
					>
						<Volume2 size={16} />
					</Button>
				</div>
				
				{/* Topic Keywords */}
				<div className='mb-3 p-3 rounded-lg' style={{ backgroundColor: '#f8f9fa', border: `1px solid ${COLORS.blue_01}` }}>
					<h4 style={{ ...FONTS.para_02, fontWeight: 'bold', color: COLORS.blue_01, marginBottom: '8px' }}>💡 Include these keywords:</h4>
					<div className='flex flex-wrap gap-2'>
						{(() => {
							const topicKeywords: Record<string, string[]> = {
								'Professional Introduction': ['name', 'role', 'experience', 'skills', 'background', 'expertise', 'professional', 'career', 'qualifications', 'achievements', 'industry', 'position'],
								'Career Goals': ['goals', 'ambition', 'future', 'career', 'growth', 'development', 'objectives', 'aspirations', 'plan', 'vision', 'success', 'advancement'],
								'Skills & Strengths': ['skills', 'strengths', 'abilities', 'competencies', 'expertise', 'talent', 'proficient', 'capable', 'knowledge', 'experience', 'technical', 'soft skills'],
								'Work Experience': ['experience', 'work', 'job', 'role', 'responsibilities', 'achievements', 'projects', 'company', 'position', 'career', 'professional', 'accomplishments'],
								'Job Interview': ['interview', 'position', 'role', 'qualifications', 'experience', 'skills', 'company', 'opportunity', 'candidate', 'fit', 'motivation', 'questions'],
								'Team Collaboration': ['team', 'collaboration', 'teamwork', 'colleagues', 'cooperation', 'communication', 'support', 'together', 'group', 'collective', 'partnership', 'synergy'],
								'Problem Solving': ['problem', 'solution', 'solve', 'challenge', 'issue', 'approach', 'analysis', 'resolution', 'strategy', 'method', 'critical thinking', 'decision'],
								'Project Management': ['project', 'management', 'planning', 'timeline', 'resources', 'team', 'deliverables', 'milestones', 'budget', 'coordination', 'execution', 'completion'],
								'Business Presentations': ['presentation', 'business', 'audience', 'data', 'results', 'analysis', 'proposal', 'strategy', 'insights', 'recommendations', 'professional', 'communicate'],
								'Client Communication': ['client', 'customer', 'communication', 'relationship', 'service', 'needs', 'requirements', 'satisfaction', 'professional', 'support', 'feedback', 'expectations'],
								'Performance Review': ['performance', 'review', 'goals', 'achievements', 'feedback', 'improvement', 'development', 'evaluation', 'progress', 'objectives', 'growth', 'assessment'],
								'Industry Analysis': ['industry', 'market', 'trends', 'analysis', 'competition', 'opportunities', 'challenges', 'growth', 'insights', 'research', 'data', 'business'],
								'Executive Leadership': ['leadership', 'executive', 'vision', 'strategy', 'decision', 'management', 'team', 'organization', 'direction', 'influence', 'responsibility', 'guidance'],
								'Strategic Planning': ['strategy', 'planning', 'goals', 'objectives', 'vision', 'future', 'growth', 'development', 'business', 'market', 'competitive', 'long-term'],
								'Stakeholder Management': ['stakeholder', 'management', 'relationship', 'communication', 'expectations', 'interests', 'engagement', 'alignment', 'collaboration', 'influence', 'partnership', 'value'],
								'Innovation & Growth': ['innovation', 'growth', 'development', 'creative', 'new', 'improvement', 'technology', 'opportunity', 'change', 'progress', 'advancement', 'transformation']
							};
							return (topicKeywords[currentTopic] || []).map((keyword, index) => (
								<span 
									key={index}
									className='px-2 py-1 rounded-full text-xs '
									style={{ 
										background: COLORS.light_blue, 
										color: COLORS.white,
										...FONTS.para_03
									}}
								>
									{keyword}
								</span>
							));
						})()
						}
					</div>
				</div>
				
				<div className='mt-3 p-3 rounded' style={{ backgroundColor: COLORS.light_blue }}>
					<p style={{ ...FONTS.para_03, color: COLORS.black, fontWeight: 'bold', textAlign: 'center' }}>
						<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
							<Lightbulb size={16} /> Score 90+ to unlock next level/topic
							{attempts > 0 && <span className='ml-2'>• Attempts: {attempts}</span>}
						</span>
					</p>
				</div>
			</Card>

			<Card className='p-4 mb-6' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px` }}>
				<h3 style={{ ...FONTS.heading_04, color: COLORS.blue_01 }} className='mb-3'>Professional Speaking Guidelines</h3>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<div className='p-3 rounded' style={{ backgroundColor: COLORS.white, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75)` }}>
						<h4 style={{ ...FONTS.para_02, fontWeight: 'bold', color: COLORS.light_green }} className='mb-2'>Pronunciation</h4>
						<ul style={{ ...FONTS.para_03, lineHeight: '1.5' }}>
							<li>• Clear articulation</li>
							<li>• Proper word stress</li>
							<li>• Consistent pace</li>
						</ul>
					</div>
					<div className='p-3 rounded' style={{ backgroundColor: COLORS.white, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75)` }}>
						<h4 style={{ ...FONTS.para_02, fontWeight: 'bold', color: COLORS.light_green }} className='mb-2'>Fluency</h4>
						<ul style={{ ...FONTS.para_03, lineHeight: '1.5' }}>
							<li>• Natural flow</li>
							<li>• Smooth transitions</li>
							<li>• Confident delivery</li>
						</ul>
					</div>
					<div className='p-3 rounded' style={{ backgroundColor: COLORS.white, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75)` }}>
						<h4 style={{ ...FONTS.para_02, fontWeight: 'bold', color: COLORS.light_green }} className='mb-2'>Professional</h4>
						<ul style={{ ...FONTS.para_03, lineHeight: '1.5' }}>
							<li>• Formal vocabulary</li>
							<li>• Structured responses</li>
							<li>• Engaging tone</li>
						</ul>
					</div>
				</div>
			</Card>

			<div className='text-center mb-6'>
				
				<Button
					onClick={isRecording ? stopRecording : startRecording}
					disabled={!browserSupportsSpeechRecognition}
					className={`px-8 py-4 rounded-xl ${(isRecording || listening) ? 'animate-pulse' : ''} flex items-center gap-3`}
					style={{
						background: (isRecording || listening) 
							? COLORS.light_red 
							: COLORS.light_green,
						color: COLORS.white,
						border: 'none',
						boxShadow: (isRecording || listening) 
							? `0 4px 15px rgba(255, 107, 107, 0.4)`
							: `0 4px 15px rgba(52, 152, 219, 0.4)`,
						opacity: !browserSupportsSpeechRecognition ? 0.5 : 1,
						...FONTS.heading_04,
						fontWeight: 'bold',
						transition: 'all 0.3s ease',
						transform: (isRecording || listening) ? 'scale(1.05)' : 'scale(1)'
					}}
				>
					{(isRecording || listening) ? <Square size={28} /> : <Mic size={28} />}
					{(isRecording || listening) ? 'Stop Recording' : 'Start Speaking'}
				</Button>
				
				{(isRecording || listening) && (
					<div className='mt-4 flex items-center justify-center gap-2'>
						<Timer size={20} color={COLORS.light_red} />
						<span style={{ ...FONTS.para_02, color: COLORS.light_red, fontWeight: 'bold' }}>
							{Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
						</span>
					</div>
				)}
			</div>

			{transcript && (
				<Card className='p-4 mb-4' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px` }}>
					<h3 style={{ ...FONTS.heading_04 }} className='mb-2'>What you said:</h3>
					<p style={{ ...FONTS.para_02, backgroundColor: COLORS.white, padding: '12px', borderRadius: '8px', boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75)` }}>
						{transcript}
					</p>
				</Card>
			)}

			{(score > 0 || sessionTime > 0) && !showFeedbackModal && (
				<Card className='p-4 mb-4' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `rgba(255, 255, 255, 0.7) -4px -4px 4px, rgba(189, 194, 199, 0.75) 5px 5px 4px` }}>
					<h3 style={{ ...FONTS.heading_04 }} className='mb-3'>Session Results</h3>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						<div className='text-center p-3 rounded' style={{ backgroundColor: COLORS.white }}>
							<p style={{ ...FONTS.heading_03, color: COLORS.blue_01 }}>{score}</p>
							<p style={{ ...FONTS.para_03 }}>Overall Score</p>
						</div>
						<div className='text-center p-3 rounded' style={{ backgroundColor: COLORS.white }}>
							<p style={{ ...FONTS.heading_03, color: COLORS.light_green }}>{wordsPerMinute}</p>
							<p style={{ ...FONTS.para_03 }}>Words/Min</p>
						</div>
						<div className='text-center p-3 rounded' style={{ backgroundColor: COLORS.white }}>
							<p style={{ ...FONTS.heading_03, color: COLORS.purple_01 }}>{pronunciationScore}%</p>
							<p style={{ ...FONTS.para_03 }}>Pronunciation</p>
						</div>
						<div className='text-center p-3 rounded' style={{ backgroundColor: COLORS.white }}>
							<p style={{ ...FONTS.heading_03, color: COLORS.light_orange }}>{Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}</p>
							<p style={{ ...FONTS.para_03 }}>Duration</p>
						</div>
					</div>
				</Card>
			)}
		</>
	);
};

export default SpeakingComponent;