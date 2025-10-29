/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import {
	CheckCircle,
	X,
	ChevronLeft,
	ChevronRight,
	Trophy,
	Target,
	Zap,
	Heart,
	Volume2,
} from 'lucide-react';

interface GrammarComponentProps {
	grammarCompleted: boolean;
	setGrammarCompleted: (completed: boolean) => void;
	grammarTestScore: number;
	setGrammarTestScore: (score: number) => void;
}

const GrammarComponent = ({
	grammarCompleted,
	setGrammarCompleted,
	grammarTestScore,
	setGrammarTestScore,
}: GrammarComponentProps) => {
	const [showGrammarTest, setShowGrammarTest] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [showExplanation, setShowExplanation] = useState(false);
	const [streak, setStreak] = useState(0);
	const [hearts, setHearts] = useState(5);
	const [showResult, setShowResult] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showCareerGoals, setShowCareerGoals] = useState(false);
	const [currentCareerQuestion, setCurrentCareerQuestion] = useState(0);
	const [selectedCareerAnswers, setSelectedCareerAnswers] = useState<number[]>(
		[]
	);
	const [showCareerExplanation, setShowCareerExplanation] = useState(false);
	const [careerTestScore, setCareerTestScore] = useState(0);
	const [showCareerResult, setShowCareerResult] = useState(false);
	const [showSkills, setShowSkills] = useState(false);
	const [showWorkExperience, setShowWorkExperience] = useState(false);
	const [currentSkillsQuestion, setCurrentSkillsQuestion] = useState(0);
	const [selectedSkillsAnswers, setSelectedSkillsAnswers] = useState<number[]>(
		[]
	);
	const [showSkillsExplanation, setShowSkillsExplanation] = useState(false);
	const [skillsTestScore, setSkillsTestScore] = useState(0);
	const [showSkillsResult, setShowSkillsResult] = useState(false);

	const [currentWorkQuestion, setCurrentWorkQuestion] = useState(0);
	const [selectedWorkAnswers, setSelectedWorkAnswers] = useState<number[]>([]);
	const [showWorkExplanation, setShowWorkExplanation] = useState(false);
	const [workTestScore, setWorkTestScore] = useState(0);
	const [showWorkResult, setShowWorkResult] = useState(false);

	const itemsPerPage = 7;

	useEffect(() => {
		const savedStreak = localStorage.getItem('grammarStreak');
		if (savedStreak) setStreak(parseInt(savedStreak));

		if (grammarCompleted) {
			setShowCareerGoals(true);
		}
	}, [grammarCompleted]);

	const speakText = (text: string) => {
		if ('speechSynthesis' in window) {
			// Stop any currently playing speech
			if (isPlaying) {
				window.speechSynthesis.cancel();
				setIsPlaying(false);
				return;
			}

			const utterance = new SpeechSynthesisUtterance(text);
			utterance.rate = 0.8;
			utterance.pitch = 1;
			utterance.volume = 1;

			utterance.onstart = () => setIsPlaying(true);
			utterance.onend = () => {
				setIsPlaying(false);
			};
			utterance.onerror = () => {
				setIsPlaying(false);
			};

			window.speechSynthesis.speak(utterance);
		}
	};

	useEffect(() => {
		return () => {
			if (window.speechSynthesis) {
				window.speechSynthesis.cancel();
			}
		};
	}, []);

	useEffect(() => {
		const savedCareerAnswers = localStorage.getItem('careerAnswers');
		if (savedCareerAnswers) {
			setSelectedCareerAnswers(JSON.parse(savedCareerAnswers));
		}
	}, []);

	const grammarQuestions = [
		{
			question: 'Which sentence is grammatically correct?',
			options: [
				'He go to school daily',
				'He goes to school daily',
				'He going to school daily',
				'He gone to school daily',
			],
			correct: 1,
			explanation:
				"Third person singular (he/she/it) requires 's' or 'es' at the end of the verb in present simple tense.",
		},
		{
			question: 'Choose the correct past tense:',
			options: [
				'I eated lunch',
				'I eat lunch',
				'I ate lunch',
				'I eating lunch',
			],
			correct: 2,
			explanation:
				"'Eat' is an irregular verb. Its past tense is 'ate', not 'eated'.",
		},
		{
			question: 'Which is the correct question form?',
			options: [
				'Do you like tea?',
				'You like tea?',
				'Like you tea?',
				'You do like tea?',
			],
			correct: 0,
			explanation:
				"Yes/No questions in present simple use 'Do/Does' + subject + base verb.",
		},
		{
			question: 'Select the correct article:',
			options: [
				'I saw a elephant',
				'I saw an elephant',
				'I saw the elephant',
				'I saw elephant',
			],
			correct: 1,
			explanation:
				"Use 'an' before words that start with vowel sounds. 'Elephant' starts with 'e' sound.",
		},
		{
			question: 'Which sentence uses correct subject-verb agreement?',
			options: [
				'They was playing',
				'They were playing',
				'They is playing',
				'They are play',
			],
			correct: 1,
			explanation:
				"Plural subjects like 'they' use 'were' in past continuous, not 'was'.",
		},
		{
			question: 'Complete: I _____ to the store yesterday.',
			options: ['go', 'goes', 'went', 'going'],
			correct: 2,
			explanation:
				"'Yesterday' indicates past time, so we use past tense 'went'.",
		},
		{
			question: 'Choose the correct preposition: She is good _____ math.',
			options: ['in', 'at', 'on', 'with'],
			correct: 1,
			explanation: "We use 'good at' when talking about skills or abilities.",
		},
		{
			question: 'Which is the correct comparative form?',
			options: ['more big', 'bigger', 'most big', 'bigest'],
			correct: 1,
			explanation:
				"Short adjectives like 'big' form comparatives by adding '-er': bigger.",
		},
		{
			question:
				'Select the correct modal verb: You _____ wear a helmet while riding.',
			options: ['can', 'must', 'might', 'would'],
			correct: 1,
			explanation:
				"'Must' expresses strong obligation or necessity for safety.",
		},
		{
			question: 'Choose the correct form: I enjoy _____ books.',
			options: ['read', 'to read', 'reading', 'reads'],
			correct: 2,
			explanation:
				"After 'enjoy', we use gerund (verb + ing): enjoying reading.",
		},
	];

	const careerGoalsContent = {
		childtitle: 'Career Goals',
		questions: [
			{
				title: 'What is a SMART goal?',
				options: [
					{
						text: 'A simple, manageable, achievable, realistic, timely goal',
						correct: false,
					},
					{
						text: 'Specific, measurable, achievable, relevant, time-bound goal',
						correct: true,
					},
					{
						text: 'Smart, meaningful, actionable, reasonable, targeted goal',
						correct: false,
					},
					{
						text: 'Strategic, manageable, actionable, realistic, timely goal',
						correct: false,
					},
				],
				explanation:
					'SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound.',
			},
			{
				title: 'Why are career goals important?',
				options: [
					{ text: 'They help you get promotions faster', correct: false },
					{ text: 'They provide direction and motivation', correct: true },
					{ text: 'They impress your boss', correct: false },
					{ text: 'They guarantee success', correct: false },
				],
				explanation:
					'Career goals give you direction and help you stay motivated and focused.',
			},
			{
				title: 'How often should you review your career goals?',
				options: [
					{ text: 'Once a year', correct: false },
					{ text: 'Every 6-12 months', correct: true },
					{ text: 'Only when you change jobs', correct: false },
					{ text: 'Once every 5 years', correct: false },
				],
				explanation:
					'Regular reviews (every 6-12 months) help keep your goals relevant.',
			},
			{
				title: 'What should you consider when setting career goals?',
				options: [
					{ text: 'Only your current skills', correct: false },
					{
						text: 'Your interests, values, skills, and market trends',
						correct: true,
					},
					{ text: 'What your friends are doing', correct: false },
					{ text: 'Only the salary potential', correct: false },
				],
				explanation:
					'Effective goals consider multiple factors including your interests and market conditions.',
			},
			{
				title: 'Which is an example of a long-term career goal?',
				options: [
					{ text: 'Complete a training course this month', correct: false },
					{ text: 'Become a department head in 5 years', correct: true },
					{ text: 'Update your resume', correct: false },
					{ text: 'Network with 3 people this week', correct: false },
				],
				explanation: 'Long-term goals typically span 3-5 years or more.',
			},
		],
	};

	const skillsAndStrengthsContent = {
		childtitle: 'Skills & Strengths',
		questions: [
			{
				title: 'What are hard skills?',
				options: [
					{
						text: 'Personal attributes that help you work well with others',
						correct: false,
					},
					{
						text: 'Technical, teachable abilities specific to a job',
						correct: true,
					},
					{ text: 'Skills that are difficult to learn', correct: false },
					{ text: "Natural talents you're born with", correct: false },
				],
				explanation:
					'Hard skills are technical, measurable abilities gained through training.',
			},
			{
				title: 'Which is an example of a soft skill?',
				options: [
					{ text: 'Programming in Python', correct: false },
					{ text: 'Speaking a foreign language', correct: false },
					{ text: 'Communication', correct: true },
					{ text: 'Operating machinery', correct: false },
				],
				explanation:
					'Soft skills are interpersonal skills like communication and teamwork.',
			},
			{
				title: 'How can you identify your strengths?',
				options: [
					{ text: 'Ask for feedback from others', correct: false },
					{ text: 'Reflect on tasks you enjoy and do well', correct: false },
					{
						text: 'Take assessments and analyze past successes',
						correct: false,
					},
					{ text: 'All of the above', correct: true },
				],
				explanation: 'Multiple approaches help identify your true strengths.',
			},
			{
				title: 'Why is it important to develop both hard and soft skills?',
				options: [
					{
						text: 'Hard skills get you hired, soft skills get you promoted',
						correct: true,
					},
					{
						text: 'Soft skills are more important than hard skills',
						correct: false,
					},
					{ text: 'Employers only care about hard skills', correct: false },
					{ text: 'Soft skills are easier to develop', correct: false },
				],
				explanation: 'Both skill types are valuable for career success.',
			},
			{
				title: 'How can you improve your skills?',
				options: [
					{ text: 'Take courses and practice regularly', correct: true },
					{ text: 'Wait for natural improvement over time', correct: false },
					{ text: 'Only learn from mistakes', correct: false },
					{ text: 'Focus only on your strongest skills', correct: false },
				],
				explanation:
					'Active learning and practice are key to skill development.',
			},
		],
	};

	const workExperienceContent = {
		childtitle: 'Work Experience',
		questions: [
			{
				title: 'How should you describe your work experience on a resume?',
				options: [
					{ text: 'List every task you ever performed', correct: false },
					{ text: 'Use action verbs and quantify achievements', correct: true },
					{ text: 'Write long paragraphs about each job', correct: false },
					{ text: 'Focus only on job titles and dates', correct: false },
				],
				explanation: 'Use action verbs and numbers to demonstrate impact.',
			},
			{
				title: 'What is the most effective way to explain employment gaps?',
				options: [
					{ text: 'Lie about the dates', correct: false },
					{
						text: 'Be honest and focus on skills gained during that time',
						correct: true,
					},
					{ text: 'Avoid mentioning them', correct: false },
					{ text: 'Make excuses', correct: false },
				],
				explanation:
					'Honesty and emphasis on relevant skills is the best approach.',
			},
			{
				title: 'How far back should your work history go on a resume?',
				options: [
					{ text: '10-15 years', correct: true },
					{ text: 'Your entire career history', correct: false },
					{ text: 'Only your current job', correct: false },
					{ text: 'Only the last 5 years', correct: false },
				],
				explanation: 'Typically, include 10-15 years of relevant experience.',
			},
			{
				title: 'What should you include when describing work experience?',
				options: [
					{ text: 'Only job titles', correct: false },
					{
						text: 'Responsibilities, achievements, and skills used',
						correct: true,
					},
					{ text: 'Your salary at each position', correct: false },
					{ text: 'Reasons for leaving each job', correct: false },
				],
				explanation:
					'Focus on responsibilities, achievements, and relevant skills.',
			},
			{
				title: 'How can you make unrelated experience relevant?',
				options: [
					{ text: 'Focus on transferable skills', correct: true },
					{ text: 'Exaggerate your responsibilities', correct: false },
					{ text: 'Leave it off your resume', correct: false },
					{ text: 'Change job titles to sound more relevant', correct: false },
				],
				explanation:
					'Highlight transferable skills that apply to the target role.',
			},
		],
	};

	const grammarContent = [
		{
			title: '1. Tenses (Present, Past, Future)',
			content: (
				<div className='ml-4 space-y-2'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Present Simple:</strong> Used for facts and regular actions.
						<br />
						Example: I go to school every day.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Present Continuous:</strong> Actions happening now.
						<br />
						Example: I am talking to you.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Present Perfect:</strong> Action that just happened or has
						relevance to now.
						<br />
						Example: I have eaten lunch.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Past Simple:</strong> Completed actions in the past.
						<br />
						Example: She watched a movie yesterday.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Past Continuous:</strong> Ongoing past actions.
						<br />
						Example: They were playing football.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Past Perfect:</strong> Past before another past action.
						<br />
						Example: He had left before I arrived.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Future Simple:</strong> To show future actions.
						<br />
						Example: I will call you later.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Future Continuous:</strong> Action in progress at a future
						time.
						<br />
						Example: I will be studying at 8 p.m.
					</p>
				</div>
			),
		},
		{
			title: '2. Subject-Verb Agreement',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						Singular subjects need singular verbs. Example: He plays.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						Plural subjects need plural verbs. Example: They play.
					</p>
				</div>
			),
		},
		{
			title: '3. Parts of Speech',
			content: (
				<div className='ml-4 space-y-1'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Noun</strong> – Person/place/thing (dog, city)
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Pronoun</strong> – Replaces noun (he, they)
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Verb</strong> – Action word (run, eat)
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Adjective</strong> – Describes noun (happy, fast)
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Adverb</strong> – Describes verb/adjective (quickly, very)
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Preposition</strong> – Shows place/time (on, in, at)
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Conjunction</strong> – Connects words/sentences (and, but)
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Interjection</strong> – Emotion/exclamation (wow!, oh!)
					</p>
				</div>
			),
		},
		{
			title: '4. Articles',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>A/An</strong> – Indefinite articles (a pen, an apple)
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>The</strong> – Definite article (the sun)
					</p>
				</div>
			),
		},
		{
			title: '5. Pronouns',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Subject:</strong> I, you, he, she, it, we, they
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Object:</strong> me, you, him, her, us, them
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Possessive:</strong> my, your, his, her, our, their
					</p>
					<p style={{ ...FONTS.para_03 }}>Example: She gave me her book.</p>
				</div>
			),
		},
		{
			title: '6. Modal Verbs',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						Used to express possibility, ability, permission, or obligation:
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>can, could, will, would, may, might, should, must</strong>
					</p>
					<p style={{ ...FONTS.para_03 }}>Example: You must wear a seatbelt.</p>
				</div>
			),
		},
		{
			title: '7. Question Formation',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Yes/No Questions:</strong> Do you like tea?
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>WH Questions:</strong> What do you want?
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Tag Questions:</strong> You're coming, aren't you?
					</p>
				</div>
			),
		},
		{
			title: '8. Imperative Sentences',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						Used to give commands, advice, or requests.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						Example: Sit down. / Please be quiet.
					</p>
				</div>
			),
		},
		{
			title: '9. Prepositions',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Place:</strong> in, on, under, behind
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Time:</strong> at, in, on, since, for
					</p>
					<p style={{ ...FONTS.para_03 }}>Example: The book is on the table.</p>
				</div>
			),
		},
		{
			title: '10. Adjectives and Adverbs',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Adjective:</strong> Describes noun (a fast car)
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Adverb:</strong> Describes verb/adjective (he runs fast)
					</p>
				</div>
			),
		},
		{
			title: '11. Comparison',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Positive:</strong> big
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Comparative:</strong> bigger
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Superlative:</strong> biggest
					</p>
					<p style={{ ...FONTS.para_03 }}>
						Example: This house is bigger than that one.
					</p>
				</div>
			),
		},
		{
			title: '12. Sentence Types',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Simple:</strong> I eat rice.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Compound:</strong> I eat rice and I drink milk.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Complex:</strong> I eat rice because I'm hungry.
					</p>
				</div>
			),
		},
		{
			title: '13. Conditional Sentences',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Zero Conditional:</strong> If you heat ice, it melts.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>First:</strong> If I study, I will pass.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Second:</strong> If I were rich, I would travel.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Third:</strong> If I had known, I would have told you.
					</p>
				</div>
			),
		},
		{
			title: '14. Gerunds & Infinitives',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Gerund:</strong> Verb + ing (Reading is fun)
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Infinitive:</strong> to + Verb (I like to read)
					</p>
				</div>
			),
		},
		{
			title: '15. Direct and Indirect Speech',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Direct:</strong> He said, "I am happy."
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Indirect:</strong> He said that he was happy.
					</p>
				</div>
			),
		},
		{
			title: '16. Passive Voice',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Active:</strong> She writes a letter.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Passive:</strong> A letter is written by her.
					</p>
				</div>
			),
		},
		{
			title: '17. Phrasal Verbs',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>Verb + preposition or adverb</p>
					<p style={{ ...FONTS.para_03 }}>
						Example: Give up (quit), take off (remove), look after (care)
					</p>
				</div>
			),
		},
		{
			title: '18. Common Sentence Patterns',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						I want to… (I want to learn English.)
					</p>
					<p style={{ ...FONTS.para_03 }}>Can you…? (Can you help me?)</p>
					<p style={{ ...FONTS.para_03 }}>
						I'm going to… (I'm going to the market.)
					</p>
				</div>
			),
		},
		{
			title: '19. Short Answers',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>Yes, I am. / No, I'm not.</p>
					<p style={{ ...FONTS.para_03 }}>Yes, she can. / No, she can't.</p>
				</div>
			),
		},
		{
			title: '20. Everyday Spoken Grammar',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Gonna</strong> (going to) - I'm gonna eat.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Wanna</strong> (want to) - I wanna go.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<strong>Gotta</strong> (have got to) - I gotta leave.
					</p>
					<p style={{ ...FONTS.para_03, fontStyle: 'italic' }}>
						(Used in casual speech, not formal writing)
					</p>
				</div>
			),
		},
		{
			title: '21. Common Mistakes to Avoid',
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>
						<X
							size={16}
							color={COLORS.light_red}
							style={{ display: 'inline', marginRight: '4px' }}
						/>{' '}
						He go to school.{' '}
						<CheckCircle
							size={16}
							color={COLORS.light_green}
							style={{
								display: 'inline',
								marginLeft: '8px',
								marginRight: '4px',
							}}
						/>{' '}
						He goes to school.
					</p>
					<p style={{ ...FONTS.para_03 }}>
						<X
							size={16}
							color={COLORS.light_red}
							style={{ display: 'inline', marginRight: '4px' }}
						/>{' '}
						I didn't knew.{' '}
						<CheckCircle
							size={16}
							color={COLORS.light_green}
							style={{
								display: 'inline',
								marginLeft: '8px',
								marginRight: '4px',
							}}
						/>{' '}
						I didn't know.
					</p>
				</div>
			),
		},
	];

	const handleAnswerSelect = (answerIndex: number) => {
		const newAnswers = [...selectedAnswers];
		newAnswers[currentQuestion] = answerIndex;
		setSelectedAnswers(newAnswers);

		setShowExplanation(true);

		if (answerIndex === grammarQuestions[currentQuestion].correct) {
			const newStreak = streak + 1;
			setStreak(newStreak);
			localStorage.setItem('grammarStreak', newStreak.toString());
		} else {
			setHearts(Math.max(0, hearts - 1));
			setStreak(0);
			localStorage.setItem('grammarStreak', '0');
		}
	};

	const handleNext = () => {
		setShowExplanation(false);
		if (currentQuestion < grammarQuestions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			handleTestSubmit();
		}
	};

	const handleTestSubmit = () => {
		let correctAnswers = 0;
		selectedAnswers.forEach((answer, index) => {
			if (answer === grammarQuestions[index].correct) {
				correctAnswers++;
			}
		});
		const score = Math.round((correctAnswers / grammarQuestions.length) * 100);
		setGrammarTestScore(score);
		localStorage.setItem('grammarTestScore', JSON.stringify(score));
		if (score >= 80) {
			setGrammarCompleted(true);
			localStorage.setItem('grammarCompleted', 'true');
			setShowCareerGoals(true);
		}
		setShowResult(true);
	};

	const handleCareerAnswerSelect = (answerIndex: number) => {
		const newAnswers = [...selectedCareerAnswers];
		newAnswers[currentCareerQuestion] = answerIndex;
		setSelectedCareerAnswers(newAnswers);
		localStorage.setItem('careerAnswers', JSON.stringify(newAnswers));
		setShowCareerExplanation(true);
	};

	const handleCareerNext = () => {
		setShowCareerExplanation(false);
		if (currentCareerQuestion < careerGoalsContent.questions.length - 1) {
			setCurrentCareerQuestion(currentCareerQuestion + 1);
		} else {
			handleCareerTestSubmit();
		}
	};

	const handleCareerTestSubmit = () => {
		let correctAnswers = 0;
		selectedCareerAnswers.forEach((answer, index) => {
			if (careerGoalsContent.questions[index].options[answer]?.correct) {
				correctAnswers++;
			}
		});
		const score = Math.round(
			(correctAnswers / careerGoalsContent.questions.length) * 100
		);
		setCareerTestScore(score);
		setShowCareerResult(true);
		setShowSkills(true);
	};

	// Skills handlers
	const handleSkillsAnswerSelect = (answerIndex: number) => {
		const newAnswers = [...selectedSkillsAnswers];
		newAnswers[currentSkillsQuestion] = answerIndex;
		setSelectedSkillsAnswers(newAnswers);
		setShowSkillsExplanation(true);
	};

	const handleSkillsNext = () => {
		setShowSkillsExplanation(false);
		if (
			currentSkillsQuestion <
			skillsAndStrengthsContent.questions.length - 1
		) {
			setCurrentSkillsQuestion(currentSkillsQuestion + 1);
		} else {
			handleSkillsTestSubmit();
		}
	};

	const handleSkillsTestSubmit = () => {
		let correctAnswers = 0;
		selectedSkillsAnswers.forEach((answer, index) => {
			if (skillsAndStrengthsContent.questions[index].options[answer]?.correct) {
				correctAnswers++;
			}
		});
		const score = Math.round(
			(correctAnswers / skillsAndStrengthsContent.questions.length) * 100
		);
		setSkillsTestScore(score);
		setShowSkillsResult(true);
		setShowWorkExperience(true);
	};

	// Work Experience handlers
	const handleWorkAnswerSelect = (answerIndex: number) => {
		const newAnswers = [...selectedWorkAnswers];
		newAnswers[currentWorkQuestion] = answerIndex;
		setSelectedWorkAnswers(newAnswers);
		setShowWorkExplanation(true);
	};

	const handleWorkNext = () => {
		setShowWorkExplanation(false);
		if (currentWorkQuestion < workExperienceContent.questions.length - 1) {
			setCurrentWorkQuestion(currentWorkQuestion + 1);
		} else {
			handleWorkTestSubmit();
		}
	};

	const handleWorkTestSubmit = () => {
		let correctAnswers = 0;
		selectedWorkAnswers.forEach((answer, index) => {
			if (workExperienceContent.questions[index].options[answer]?.correct) {
				correctAnswers++;
			}
		});
		const score = Math.round(
			(correctAnswers / workExperienceContent.questions.length) * 100
		);
		setWorkTestScore(score);
		setShowWorkResult(true);
	};

	// Work Experience Component
	if (showWorkExperience) {
		return (
			<Card
				className='p-4 mb-6'
				style={{
					backgroundColor: COLORS.bg_Colour,
					boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75), inset -2px -2px 3px rgba(255, 255, 255, 0.7)`,
				}}
			>
				<div className='flex justify-between items-start mb-4'>
					<h3 style={{ ...FONTS.heading_04 }}>
						{workExperienceContent.childtitle}
					</h3>
				</div>

				{!showWorkResult ? (
					<>
						<p style={{ ...FONTS.para_02 }}>
							Question {currentWorkQuestion + 1} of{' '}
							{workExperienceContent.questions.length}
						</p>

						<div className='space-y-3 mt-4'>
							<h4 style={{ ...FONTS.heading_05, marginBottom: '12px' }}>
								{workExperienceContent.questions[currentWorkQuestion].title}
							</h4>
							{workExperienceContent.questions[currentWorkQuestion].options.map(
								(option, index) => {
									const isSelected =
										selectedWorkAnswers[currentWorkQuestion] === index;
									const isCorrect = option.correct;
									let bgColor = COLORS.white;
									let borderColor = COLORS.text_desc;
									let textColor = COLORS.text_desc;

									if (showWorkExplanation) {
										if (isCorrect) {
											bgColor = '#e8f5e8';
											borderColor = COLORS.light_green;
											textColor = COLORS.green_text;
										} else if (isSelected) {
											bgColor = '#ffe8e8';
											borderColor = COLORS.light_red;
											textColor = COLORS.light_red;
										}
									} else if (isSelected) {
										bgColor = COLORS.light_blue;
										borderColor = COLORS.blue_01;
										textColor = COLORS.white;
									}

									return (
										<div
											key={index}
											className={`p-4 rounded-lg border-2 ${
												!showWorkExplanation
													? 'cursor-pointer hover:shadow-md'
													: ''
											}`}
											style={{
												background: bgColor,
												borderColor: borderColor,
												color: textColor,
											}}
											onClick={() =>
												!showWorkExplanation && handleWorkAnswerSelect(index)
											}
										>
											{option.text}
										</div>
									);
								}
							)}
						</div>

						{showWorkExplanation && (
							<div
								className='mt-4 p-4 rounded-lg'
								style={{
									backgroundColor: '#f0f8ff',
									border: `2px solid ${COLORS.blue_01}`,
								}}
							>
								<p style={{ ...FONTS.para_03, color: COLORS.text_desc }}>
									{
										workExperienceContent.questions[currentWorkQuestion]
											.explanation
									}
								</p>
							</div>
						)}

						{showWorkExplanation && (
							<Button
								onClick={handleWorkNext}
								className='mt-4 px-6 py-2 rounded-lg'
								style={{ background: COLORS.light_green, color: COLORS.white }}
							>
								{currentWorkQuestion <
								workExperienceContent.questions.length - 1
									? 'Continue'
									: 'Finish'}
							</Button>
						)}
					</>
				) : (
					<div className='text-center py-8'>
						<Trophy
							size={64}
							color={
								workTestScore >= 80 ? COLORS.light_orange : COLORS.text_desc
							}
							className='mx-auto mb-4'
						/>
						<p style={{ ...FONTS.heading_03 }}>Score: {workTestScore}%</p>
						<p style={{ ...FONTS.para_02 }}>
							{workTestScore >= 80
								? 'Great job! You understand Work Experience.'
								: 'Keep practicing to improve your knowledge.'}
						</p>
						<Button
							onClick={() => {
								setShowWorkResult(false);
								setCurrentWorkQuestion(0);
								setSelectedWorkAnswers([]);
								setShowWorkExplanation(false);
							}}
							className='px-6 py-2 rounded-lg mt-4'
							style={{ background: COLORS.blue_01, color: COLORS.white }}
						>
							Restart Work Experience
						</Button>
					</div>
				)}
			</Card>
		);
	}

	// Skills & Strengths Component
	if (showSkills) {
		return (
			<Card
				className='p-4 mb-6'
				style={{
					backgroundColor: COLORS.bg_Colour,
					boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75), inset -2px -2px 3px rgba(255, 255, 255, 0.7)`,
				}}
			>
				<div className='flex justify-between items-start mb-4'>
					<h3 style={{ ...FONTS.heading_04 }}>
						{skillsAndStrengthsContent.childtitle}
					</h3>
				</div>

				{!showSkillsResult ? (
					<>
						<p style={{ ...FONTS.para_02 }}>
							Question {currentSkillsQuestion + 1} of{' '}
							{skillsAndStrengthsContent.questions.length}
						</p>

						<div className='space-y-3 mt-4'>
							<h4 style={{ ...FONTS.heading_05, marginBottom: '12px' }}>
								{
									skillsAndStrengthsContent.questions[currentSkillsQuestion]
										.title
								}
							</h4>
							{skillsAndStrengthsContent.questions[
								currentSkillsQuestion
							].options.map((option, index) => {
								const isSelected =
									selectedSkillsAnswers[currentSkillsQuestion] === index;
								const isCorrect = option.correct;
								let bgColor = COLORS.white;
								let borderColor = COLORS.text_desc;
								let textColor = COLORS.text_desc;

								if (showSkillsExplanation) {
									if (isCorrect) {
										bgColor = '#e8f5e8';
										borderColor = COLORS.light_green;
										textColor = COLORS.green_text;
									} else if (isSelected) {
										bgColor = '#ffe8e8';
										borderColor = COLORS.light_red;
										textColor = COLORS.light_red;
									}
								} else if (isSelected) {
									bgColor = COLORS.light_blue;
									borderColor = COLORS.blue_01;
									textColor = COLORS.white;
								}

								return (
									<div
										key={index}
										className={`p-4 rounded-lg border-2 ${
											!showSkillsExplanation
												? 'cursor-pointer hover:shadow-md'
												: ''
										}`}
										style={{
											background: bgColor,
											borderColor: borderColor,
											color: textColor,
										}}
										onClick={() =>
											!showSkillsExplanation && handleSkillsAnswerSelect(index)
										}
									>
										{option.text}
									</div>
								);
							})}
						</div>

						{showSkillsExplanation && (
							<div
								className='mt-4 p-4 rounded-lg'
								style={{
									backgroundColor: '#f0f8ff',
									border: `2px solid ${COLORS.blue_01}`,
								}}
							>
								<p style={{ ...FONTS.para_03, color: COLORS.text_desc }}>
									{
										skillsAndStrengthsContent.questions[currentSkillsQuestion]
											.explanation
									}
								</p>
							</div>
						)}

						{showSkillsExplanation && (
							<Button
								onClick={handleSkillsNext}
								className='mt-4 px-6 py-2 rounded-lg'
								style={{ background: COLORS.light_green, color: COLORS.white }}
							>
								{currentSkillsQuestion <
								skillsAndStrengthsContent.questions.length - 1
									? 'Continue'
									: 'Finish'}
							</Button>
						)}
					</>
				) : (
					<div className='text-center py-8'>
						<Trophy
							size={64}
							color={
								skillsTestScore >= 80 ? COLORS.light_orange : COLORS.text_desc
							}
							className='mx-auto mb-4'
						/>
						<p style={{ ...FONTS.heading_03 }}>Score: {skillsTestScore}%</p>
						<p style={{ ...FONTS.para_02 }}>
							{skillsTestScore >= 80
								? 'Great job! You understand Skills & Strengths.'
								: 'Keep practicing to improve your knowledge.'}
						</p>
						<Button
							onClick={() => {
								setShowSkillsResult(false);
								setCurrentSkillsQuestion(0);
								setSelectedSkillsAnswers([]);
								setShowSkillsExplanation(false);
							}}
							className='px-6 py-2 rounded-lg mt-4'
							style={{ background: COLORS.blue_01, color: COLORS.white }}
						>
							Restart Skills & Strengths
						</Button>
					</div>
				)}
			</Card>
		);
	}

	// Career Goals Component
	if (showCareerGoals) {
		return (
			<Card
				className='p-4 mb-6'
				style={{
					backgroundColor: COLORS.bg_Colour,
					boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75), inset -2px -2px 3px rgba(255, 255, 255, 0.7)`,
				}}
			>
				<div className='flex justify-between items-start mb-4'>
					<h3 style={{ ...FONTS.heading_04 }}>
						{careerGoalsContent.childtitle}
					</h3>
				</div>

				{!showCareerResult ? (
					<>
						<p style={{ ...FONTS.para_02 }}>
							Question {currentCareerQuestion + 1} of{' '}
							{careerGoalsContent.questions.length}
						</p>

						<div className='space-y-3 mt-4'>
							<h4 style={{ ...FONTS.heading_05, marginBottom: '12px' }}>
								{careerGoalsContent.questions[currentCareerQuestion].title}
							</h4>
							{careerGoalsContent.questions[currentCareerQuestion].options.map(
								(option, index) => {
									const isSelected =
										selectedCareerAnswers[currentCareerQuestion] === index;
									const isCorrect = option.correct;
									let bgColor = COLORS.white;
									let borderColor = COLORS.text_desc;
									let textColor = COLORS.text_desc;

									if (showCareerExplanation) {
										if (isCorrect) {
											bgColor = '#e8f5e8';
											borderColor = COLORS.light_green;
											textColor = COLORS.green_text;
										} else if (isSelected) {
											bgColor = '#ffe8e8';
											borderColor = COLORS.light_red;
											textColor = COLORS.light_red;
										}
									} else if (isSelected) {
										bgColor = COLORS.light_blue;
										borderColor = COLORS.blue_01;
										textColor = COLORS.white;
									}

									return (
										<div
											key={index}
											className={`p-4 rounded-lg border-2 ${
												!showCareerExplanation
													? 'cursor-pointer hover:shadow-md'
													: ''
											}`}
											style={{
												background: bgColor,
												borderColor: borderColor,
												color: textColor,
											}}
											onClick={() =>
												!showCareerExplanation &&
												handleCareerAnswerSelect(index)
											}
										>
											{option.text}
										</div>
									);
								}
							)}
						</div>

						{showCareerExplanation && (
							<div
								className='mt-4 p-4 rounded-lg'
								style={{
									backgroundColor: '#f0f8ff',
									border: `2px solid ${COLORS.blue_01}`,
								}}
							>
								<p style={{ ...FONTS.para_03, color: COLORS.text_desc }}>
									{
										careerGoalsContent.questions[currentCareerQuestion]
											.explanation
									}
								</p>
							</div>
						)}

						{showCareerExplanation && (
							<Button
								onClick={handleCareerNext}
								className='mt-4 px-6 py-2 rounded-lg'
								style={{ background: COLORS.light_green, color: COLORS.white }}
							>
								{currentCareerQuestion < careerGoalsContent.questions.length - 1
									? 'Continue'
									: 'Finish'}
							</Button>
						)}
					</>
				) : (
					<div className='text-center py-8'>
						<Trophy
							size={64}
							color={
								careerTestScore >= 80 ? COLORS.light_orange : COLORS.text_desc
							}
							className='mx-auto mb-4'
						/>
						<p style={{ ...FONTS.heading_03 }}>Score: {careerTestScore}%</p>
						<p style={{ ...FONTS.para_02 }}>
							{careerTestScore >= 80
								? 'Great job! You understand Career Goals.'
								: 'Keep practicing to improve your knowledge.'}
						</p>
						<Button
							onClick={() => {
								setShowCareerResult(false);
								setCurrentCareerQuestion(0);
								setSelectedCareerAnswers([]);
								setShowCareerExplanation(false);
							}}
							className='px-6 py-2 rounded-lg mt-4'
							style={{ background: COLORS.blue_01, color: COLORS.white }}
						>
							Restart Career Goals
						</Button>
					</div>
				)}
			</Card>
		);
	}

	const totalPages = Math.ceil(grammarContent.length / itemsPerPage);
	const currentItems = grammarContent.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage
	);

	return (
		<>
			{showGrammarTest && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<Card
						className='p-6 max-w-2xl w-full mx-4'
						style={{ backgroundColor: COLORS.bg_Colour }}
					>
						{/* Header with hearts and streak */}
						<div className='flex justify-between items-center mb-4'>
							<div className='flex items-center gap-2'>
								<Zap size={20} color={COLORS.light_orange} />
								<span
									style={{
										...FONTS.para_02,
										fontWeight: 'bold',
										color: COLORS.light_orange,
									}}
								>
									{streak}
								</span>
							</div>
							<div className='flex items-center gap-1'>
								{[...Array(5)].map((_, i) => (
									<Heart
										key={i}
										size={16}
										fill={i < hearts ? COLORS.light_red : 'none'}
										color={i < hearts ? COLORS.light_red : COLORS.text_desc}
									/>
								))}
							</div>
						</div>

						<h2 style={{ ...FONTS.heading_02 }} className='mb-4'>
							Grammar Challenge - Score 80+ to unlock Speaking
						</h2>
						<div className='mb-4'>
							<p style={{ ...FONTS.para_02 }}>
								Question {currentQuestion + 1} of {grammarQuestions.length}
							</p>
							<div className='w-full bg-gray-200 rounded-full h-3 mt-2'>
								<div
									className='h-3 rounded-full transition-all duration-500'
									style={{
										width: `${
											((currentQuestion + 1) / grammarQuestions.length) * 100
										}%`,
										background: COLORS.light_green,
									}}
								></div>
							</div>
						</div>

						{!showResult ? (
							<>
								<div className='mb-6'>
									<h3 style={{ ...FONTS.heading_04 }} className='mb-4'>
										{grammarQuestions[currentQuestion].question}
									</h3>
									<div className='space-y-3'>
										{grammarQuestions[currentQuestion].options.map(
											(option, index) => {
												const isSelected =
													selectedAnswers[currentQuestion] === index;
												const isCorrect =
													index === grammarQuestions[currentQuestion].correct;

												let bgColor = COLORS.white;
												let borderColor = COLORS.text_desc;
												let textColor = COLORS.text_desc;

												if (showExplanation) {
													if (isCorrect) {
														bgColor = '#e8f5e8';
														borderColor = COLORS.light_green;
														textColor = COLORS.green_text;
													} else if (isSelected) {
														bgColor = '#ffe8e8';
														borderColor = COLORS.light_red;
														textColor = COLORS.light_red;
													}
												} else if (isSelected) {
													bgColor = COLORS.light_blue;
													borderColor = COLORS.blue_01;
													textColor = COLORS.white;
												}

												return (
													<div
														key={index}
														className={`p-4 rounded-lg border-2 transition-all duration-300 ${
															!showExplanation
																? 'cursor-pointer hover:shadow-md hover:bg-white'
																: ''
														}`}
														onClick={() =>
															!showExplanation && handleAnswerSelect(index)
														}
														style={{
															background: bgColor,
															borderColor: borderColor,
															color: textColor,
															transform: isSelected
																? 'scale(1.02)'
																: 'scale(1)',
														}}
													>
														<div className='flex items-center justify-between'>
															<p
																style={{
																	...FONTS.para_02,
																	fontWeight: isSelected ? 'bold' : 'normal',
																}}
															>
																{option}
															</p>
															{showExplanation && isCorrect && (
																<CheckCircle
																	size={20}
																	color={COLORS.light_green}
																/>
															)}
															{showExplanation && isSelected && !isCorrect && (
																<X size={20} color={COLORS.light_red} />
															)}
														</div>
													</div>
												);
											}
										)}
									</div>

									{showExplanation && (
										<div
											className='mt-4 p-4 rounded-lg'
											style={{
												backgroundColor: '#f0f8ff',
												border: `2px solid ${COLORS.blue_01}`,
											}}
										>
											<h4
												style={{
													...FONTS.para_02,
													fontWeight: 'bold',
													color: COLORS.blue_01,
												}}
												className='mb-2'
											>
												Explanation:
											</h4>
											<p style={{ ...FONTS.para_03, color: COLORS.text_desc }}>
												{grammarQuestions[currentQuestion].explanation}
											</p>
										</div>
									)}
								</div>

								<div className='flex justify-between'>
									<Button
										onClick={() => {
											setShowGrammarTest(false);
											setCurrentQuestion(0);
											setSelectedAnswers([]);
											setShowExplanation(false);
											setHearts(5);
										}}
										className='px-4 py-2 rounded'
										style={{
											background: COLORS.text_desc,
											...FONTS.para_02,
											color: COLORS.white,
										}}
									>
										Exit
									</Button>

									{showExplanation && (
										<Button
											onClick={handleNext}
											className='px-6 py-2 rounded-lg'
											style={{
												background: COLORS.light_green,
												...FONTS.para_02,
												color: COLORS.white,
												fontWeight: 'bold',
											}}
										>
											{currentQuestion < grammarQuestions.length - 1
												? 'Continue'
												: 'Finish'}
										</Button>
									)}
								</div>
							</>
						) : (
							<div className='text-center py-8'>
								<Trophy
									size={64}
									color={
										grammarTestScore >= 80
											? COLORS.light_orange
											: COLORS.text_desc
									}
									className='mx-auto mb-4'
								/>
								<h3
									style={{
										...FONTS.heading_02,
										color:
											grammarTestScore >= 80
												? COLORS.light_green
												: COLORS.light_red,
									}}
									className='mb-2'
								>
									{grammarTestScore >= 80
										? 'Congratulations!'
										: 'Keep Practicing!'}
								</h3>
								<p
									style={{ ...FONTS.heading_03, color: COLORS.blue_01 }}
									className='mb-2'
								>
									Score: {grammarTestScore}%
								</p>
								<p
									style={{ ...FONTS.para_02, color: COLORS.text_desc }}
									className='mb-6'
								>
									{grammarTestScore >= 80
										? 'Speaking practice is now unlocked!'
										: 'You need 80% or higher to unlock speaking practice.'}
								</p>
								<div className='flex gap-4 justify-center'>
									<Button
										onClick={() => {
											setShowGrammarTest(false);
											setShowResult(false);
											setCurrentQuestion(0);
											setSelectedAnswers([]);
											setShowExplanation(false);
											setHearts(5);
										}}
										className='px-6 py-2 rounded-lg'
										style={{
											background: COLORS.blue_01,
											...FONTS.para_02,
											color: COLORS.white,
										}}
									>
										Continue
									</Button>
									{grammarTestScore < 80 && (
										<Button
											onClick={() => {
												setShowResult(false);
												setCurrentQuestion(0);
												setSelectedAnswers([]);
												setShowExplanation(false);
												setHearts(5);
											}}
											className='px-6 py-2 rounded-lg'
											style={{
												background: COLORS.light_green,
												...FONTS.para_02,
												color: COLORS.white,
											}}
										>
											Try Again
										</Button>
									)}
								</div>
							</div>
						)}
					</Card>
				</div>
			)}

			<Card
				className='p-4 mb-6'
				style={{
					backgroundColor: COLORS.bg_Colour,
					boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75), inset -2px -2px 3px rgba(255, 255, 255, 0.7)`,
				}}
			>
				<div className='flex justify-between items-start mb-4'>
					<h3 style={{ ...FONTS.heading_04 }}>
						Spoken English Grammar – Full Guide
					</h3>
					<div className='flex items-center gap-2'>
						<div className='flex items-center gap-3'>
							{streak > 0 && (
								<div
									className='flex items-center gap-1 px-3 py-1 rounded-full'
									style={{
										backgroundColor: COLORS.light_orange,
										color: COLORS.white,
									}}
								>
									<Zap size={16} />
									<span style={{ ...FONTS.para_03, fontWeight: 'bold' }}>
										{streak} streak
									</span>
								</div>
							)}

							{grammarCompleted && (
								<div
									className='flex items-center gap-2 px-4 py-2 rounded-lg'
									style={{
										backgroundColor: COLORS.light_green,
										color: COLORS.white,
									}}
								>
									<Trophy size={18} />
									<span style={{ ...FONTS.para_02, fontWeight: 'bold' }}>
										Completed - {grammarTestScore}%
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='min-h-96'>
					<div className='space-y-4'>
						{currentItems.map((item, index) => {
							const getTextContent = (element: any): string => {
								if (typeof element === 'string') return element;
								if (element?.props?.children) {
									if (Array.isArray(element.props.children)) {
										return element.props.children
											.map((child: any) => getTextContent(child))
											.join(' ');
									}
									return getTextContent(element.props.children);
								}
								return '';
							};

							return (
								<div key={index}>
									<div className='flex items-center justify-between mb-2'>
										<h4
											style={{
												...FONTS.heading_05,
												color: item.title.includes('Common Mistakes')
													? COLORS.light_red
													: COLORS.blue_01,
											}}
										>
											{item.title}
										</h4>
										<Button
											onClick={() => {
												const getDetailedExplanation = (
													title: string,
													content: string
												) => {
													const explanations: Record<string, string> = {
														'1. Tenses (Present, Past, Future)':
															'Tenses show when an action happens. Present tense describes current actions or facts. Past tense describes completed actions. Future tense describes actions that will happen. Each tense has simple, continuous, and perfect forms. For example, I eat is present simple, I am eating is present continuous, and I have eaten is present perfect.',
														'2. Subject-Verb Agreement':
															'The subject and verb must match in number. Singular subjects take singular verbs, plural subjects take plural verbs. This is fundamental for correct English grammar. For example, he runs but they run.',
														'3. Parts of Speech':
															'Every word in English belongs to a part of speech category. Nouns name things, verbs show actions, adjectives describe nouns, adverbs modify verbs or adjectives. Understanding parts of speech helps you construct proper sentences.',
														'4. Articles':
															'Articles are small words that come before nouns. A and an are indefinite articles used with singular countable nouns. The is the definite article used when referring to specific things. Use an before vowel sounds.',
														'5. Pronouns':
															'Pronouns replace nouns to avoid repetition. Subject pronouns do the action, object pronouns receive the action, possessive pronouns show ownership. Using pronouns correctly makes your speech more natural.',
														'6. Modal Verbs':
															'Modal verbs express possibility, ability, permission, or obligation. They help you express different meanings and attitudes. Can shows ability, must shows obligation, may shows possibility. They are essential for polite and precise communication.',
														'7. Question Formation':
															'Questions follow specific patterns in English. Yes-no questions use auxiliary verbs like do, does, did. WH questions use question words like what, where, when. Tag questions confirm information. Proper question formation is crucial for communication.',
														'8. Imperative Sentences':
															'Imperative sentences give commands, make requests, or offer advice. They usually start with the base form of a verb. They can be polite with please or direct without it. Understanding imperatives helps in giving clear instructions.',
														'9. Prepositions':
															'Prepositions show relationships between words, especially regarding time, place, and direction. Common prepositions include in, on, at, by, for. Learning preposition usage improves your accuracy in describing locations and time.',
														'10. Adjectives and Adverbs':
															'Adjectives describe nouns and make your speech more descriptive. Adverbs modify verbs, adjectives, or other adverbs, often ending in -ly. Using them correctly adds detail and precision to your communication.',
														'11. Comparison':
															'Comparison shows differences between things. Comparative forms compare two things, superlative forms compare three or more. Short adjectives add -er and -est, long adjectives use more and most. This helps express preferences and differences.',
														'12. Sentence Types':
															'English has three main sentence types. Simple sentences have one main clause. Compound sentences join two independent clauses. Complex sentences have a main clause and dependent clauses. Varying sentence types makes your speech more interesting.',
														'13. Conditional Sentences':
															'Conditionals express hypothetical situations and their results. Zero conditional states facts, first conditional shows likely future results, second conditional shows unlikely situations, third conditional shows past hypothetical situations. They are essential for expressing possibilities.',
														'14. Gerunds & Infinitives':
															'Gerunds are verb forms ending in -ing used as nouns. Infinitives are to plus base verb forms. Some verbs are followed by gerunds, others by infinitives. Learning these patterns improves your fluency and naturalness.',
														'15. Direct and Indirect Speech':
															'Direct speech quotes exact words, indirect speech reports what someone said. When changing from direct to indirect, verb tenses often change, pronouns adjust, and time expressions modify. This skill is important for reporting conversations.',
														'16. Passive Voice':
															'Passive voice emphasizes the action or result rather than who does it. It uses be plus past participle. Active voice is usually preferred, but passive voice is useful when the doer is unknown or unimportant.',
														'17. Phrasal Verbs':
															'Phrasal verbs combine verbs with prepositions or adverbs to create new meanings. They are very common in spoken English. Learning phrasal verbs makes your English sound more natural and native-like.',
														'18. Common Sentence Patterns':
															'English follows predictable sentence patterns. Learning these patterns helps you construct sentences automatically. Common patterns include subject-verb-object and there is-there are constructions.',
														'19. Short Answers':
															'Short answers are polite responses to yes-no questions. They avoid repetition while being complete. Using auxiliary verbs in short answers shows good English grammar knowledge and sounds natural.',
														'20. Everyday Spoken Grammar':
															'Spoken English often uses contractions and informal forms. These make speech faster and more natural. However, know when to use formal versus informal grammar depending on the situation.',
														'21. Common Mistakes to Avoid':
															'Learning common mistakes helps you avoid them. Many mistakes involve subject-verb agreement, irregular verbs, and word order. Being aware of these patterns improves your accuracy significantly.',
													};
													return (
														explanations[title] ||
														`Let me explain ${title}. ${content}`
													);
												};
												const detailedExplanation = `${
													item.title
												}. ${getDetailedExplanation(
													item.title,
													getTextContent(item.content)
												)} Now let me read the specific examples: ${getTextContent(
													item.content
												)} This grammar topic covers: ${getTextContent(
													item.title
												)}. Understanding this concept is important for proper English grammar.`;
												speakText(detailedExplanation);
											}}
											className='p-1 rounded-full'
											style={{
												background: isPlaying
													? COLORS.light_red
													: 'transparent',
												color: isPlaying ? COLORS.white : COLORS.blue_01,
											}}
										>
											<Volume2 size={14} />
										</Button>
									</div>
									{item.content}
								</div>
							);
						})}
					</div>

					{!grammarCompleted && currentPage === 2 && (
						<div
							className='text-center mt-6 pt-4 border-t'
							style={{ borderColor: COLORS.text_desc }}
						>
							<Button
								onClick={() => {
									setShowGrammarTest(true);
									setCurrentQuestion(0);
									setSelectedAnswers([]);
									setShowExplanation(false);
									setShowResult(false);
									setHearts(5);
								}}
								className='px-6 py-3 rounded-lg flex items-center gap-2 mb-4'
								style={{
									background: COLORS.blue_01,
									boxShadow: `rgba(255, 255, 255, 0.7) -2px -2px 4px, rgba(189, 194, 199, 0.75) 2px 2px 4px`,
									...FONTS.para_02,
									color: COLORS.white,
									fontWeight: 'bold',
								}}
							>
								<Target size={18} />
								Start Challenge
							</Button>
						</div>
					)}

					<div
						className='flex justify-between items-center mt-6 pt-4 border-t'
						style={{ borderColor: COLORS.text_desc }}
					>
						<Button
							onClick={() => setCurrentPage(currentPage - 1)}
							disabled={currentPage === 0}
							className='flex items-center gap-2 px-4 py-2 rounded'
							style={{
								background:
									currentPage === 0 ? COLORS.text_desc : COLORS.blue_01,
								opacity: currentPage === 0 ? 0.5 : 1,
								...FONTS.para_02,
								color: COLORS.white,
							}}
						>
							<ChevronLeft size={16} /> Previous
						</Button>

						<span style={{ ...FONTS.para_02, color: COLORS.text_desc }}>
							Page {currentPage + 1} of {totalPages}
						</span>

						<Button
							onClick={() => setCurrentPage(currentPage + 1)}
							disabled={currentPage === totalPages - 1}
							className='flex items-center gap-2 px-4 py-2 rounded'
							style={{
								background:
									currentPage === totalPages - 1
										? COLORS.text_desc
										: COLORS.blue_01,
								opacity: currentPage === totalPages - 1 ? 0.5 : 1,
								...FONTS.para_02,
								color: COLORS.white,
							}}
						>
							Next <ChevronRight size={16} />
						</Button>
					</div>
				</div>
			</Card>
		</>
	);
};

export default GrammarComponent;
