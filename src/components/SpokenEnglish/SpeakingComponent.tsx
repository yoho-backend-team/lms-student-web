import { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { Mic, Square, CheckCircle, Lightbulb } from 'lucide-react';
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
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
	const lastTranscriptRef = useRef<string>('');

	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition
	} = useSpeechRecognition();

	const topics = {
		Beginner: ['Self Introduction', 'Family & Friends', 'Daily Routine', 'Food & Drinks'],
		Intermediate: ['Travel & Tourism', 'Work & Career', 'Hobbies & Interests', 'Health & Fitness'],
		Advanced: ['Business Meetings', 'Presentations', 'Negotiations', 'Academic Discussions'],
		Professional: ['Leadership', 'Strategic Planning', 'Client Relations', 'Public Speaking']
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
		
		// Level-wise harder scoring
		let totalScore = 10;
		let minTime = 30;
		let minWords = 30;
		let wpmMin = 80;
		let wpmMax = 200;
		
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
		<>
			<Card className='p-4 mb-6' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75), inset -2px -2px 3px rgba(255, 255, 255, 0.7)` }}>
				<div className='flex justify-between items-start mb-2'>
					<h3 style={{ ...FONTS.heading_04 }}>Speaking Practice:</h3>
					<div className='flex items-center gap-2'>
						<span style={{ ...FONTS.para_02, color: COLORS.blue_01, fontWeight: 'bold' }}>{currentLevel}</span>
						{levelScores[`${currentLevel}-${currentTopic}`] && (
							<span style={{ ...FONTS.para_03, color: COLORS.light_green, fontWeight: 'bold' }}>
								<span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={12} /> {levelScores[`${currentLevel}-${currentTopic}`]}</span>
							</span>
						)}
					</div>
				</div>
				<p style={{ ...FONTS.para_02, lineHeight: '1.6' }}>{getTopicPrompt(currentTopic, currentLevel)}</p>
				<div className='mt-3 p-2 rounded' style={{ backgroundColor: COLORS.light_blue }}>
					<p style={{ ...FONTS.para_03, color: COLORS.black, fontWeight: 'bold', textAlign: 'center' }}>
						<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Lightbulb size={16} /> Score 90+ to unlock next level/topic</span>
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
						background: (isRecording || listening) ? COLORS.light_red : COLORS.bg_Colour,
						color: (isRecording || listening) ? COLORS.white : COLORS.light_green,
						border: `3px solid ${(isRecording || listening) ? COLORS.light_red : COLORS.light_green}`,
						boxShadow: (isRecording || listening) 
							? `inset 2px 2px 4px rgba(0,0,0,0.2), inset -2px -2px 4px rgba(255,255,255,0.1)`
							: `rgba(255, 255, 255, 0.7) -4px -4px 6px, rgba(189, 194, 199, 0.75) 4px 4px 6px`,
						opacity: !browserSupportsSpeechRecognition ? 0.5 : 1,
						...FONTS.heading_04,
						fontWeight: 'bold',
						transition: 'all 0.3s ease'
					}}
				>
					{(isRecording || listening) ? <Square size={24} /> : <Mic size={24} />}
					{(isRecording || listening) ? 'Stop Recording' : 'Start Speaking'}
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
		</>
	);
};

export default SpeakingComponent;