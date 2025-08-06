import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GrammarComponentProps {
	grammarCompleted: boolean;
	setGrammarCompleted: (completed: boolean) => void;
	grammarTestScore: number;
	setGrammarTestScore: (score: number) => void;
}

const GrammarComponent = ({ grammarCompleted, setGrammarCompleted, grammarTestScore, setGrammarTestScore }: GrammarComponentProps) => {
	const [showGrammarTest, setShowGrammarTest] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
	const [testCompleted, setTestCompleted] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 7;

	const grammarContent = [
		{
			title: "1. Tenses (Present, Past, Future)",
			content: (
				<div className='ml-4 space-y-2'>
					<p style={{ ...FONTS.para_03 }}><strong>Present Simple:</strong> Used for facts and regular actions.<br/>Example: I go to school every day.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Present Continuous:</strong> Actions happening now.<br/>Example: I am talking to you.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Present Perfect:</strong> Action that just happened or has relevance to now.<br/>Example: I have eaten lunch.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Past Simple:</strong> Completed actions in the past.<br/>Example: She watched a movie yesterday.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Past Continuous:</strong> Ongoing past actions.<br/>Example: They were playing football.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Past Perfect:</strong> Past before another past action.<br/>Example: He had left before I arrived.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Future Simple:</strong> To show future actions.<br/>Example: I will call you later.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Future Continuous:</strong> Action in progress at a future time.<br/>Example: I will be studying at 8 p.m.</p>
				</div>
			)
		},
		{
			title: "2. Subject-Verb Agreement",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>Singular subjects need singular verbs. Example: He plays.</p>
					<p style={{ ...FONTS.para_03 }}>Plural subjects need plural verbs. Example: They play.</p>
				</div>
			)
		},
		{
			title: "3. Parts of Speech",
			content: (
				<div className='ml-4 space-y-1'>
					<p style={{ ...FONTS.para_03 }}><strong>Noun</strong> – Person/place/thing (dog, city)</p>
					<p style={{ ...FONTS.para_03 }}><strong>Pronoun</strong> – Replaces noun (he, they)</p>
					<p style={{ ...FONTS.para_03 }}><strong>Verb</strong> – Action word (run, eat)</p>
					<p style={{ ...FONTS.para_03 }}><strong>Adjective</strong> – Describes noun (happy, fast)</p>
					<p style={{ ...FONTS.para_03 }}><strong>Adverb</strong> – Describes verb/adjective (quickly, very)</p>
					<p style={{ ...FONTS.para_03 }}><strong>Preposition</strong> – Shows place/time (on, in, at)</p>
					<p style={{ ...FONTS.para_03 }}><strong>Conjunction</strong> – Connects words/sentences (and, but)</p>
					<p style={{ ...FONTS.para_03 }}><strong>Interjection</strong> – Emotion/exclamation (wow!, oh!)</p>
				</div>
			)
		},
		{
			title: "4. Articles",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}><strong>A/An</strong> – Indefinite articles (a pen, an apple)</p>
					<p style={{ ...FONTS.para_03 }}><strong>The</strong> – Definite article (the sun)</p>
				</div>
			)
		},
		{
			title: "5. Pronouns",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}><strong>Subject:</strong> I, you, he, she, it, we, they</p>
					<p style={{ ...FONTS.para_03 }}><strong>Object:</strong> me, you, him, her, us, them</p>
					<p style={{ ...FONTS.para_03 }}><strong>Possessive:</strong> my, your, his, her, our, their</p>
					<p style={{ ...FONTS.para_03 }}>Example: She gave me her book.</p>
				</div>
			)
		},
		{
			title: "6. Modal Verbs",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>Used to express possibility, ability, permission, or obligation:</p>
					<p style={{ ...FONTS.para_03 }}><strong>can, could, will, would, may, might, should, must</strong></p>
					<p style={{ ...FONTS.para_03 }}>Example: You must wear a seatbelt.</p>
				</div>
			)
		},
		{
			title: "7. Question Formation",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}><strong>Yes/No Questions:</strong> Do you like tea?</p>
					<p style={{ ...FONTS.para_03 }}><strong>WH Questions:</strong> What do you want?</p>
					<p style={{ ...FONTS.para_03 }}><strong>Tag Questions:</strong> You're coming, aren't you?</p>
				</div>
			)
		},
		{
			title: "8. Imperative Sentences",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>Used to give commands, advice, or requests.</p>
					<p style={{ ...FONTS.para_03 }}>Example: Sit down. / Please be quiet.</p>
				</div>
			)
		},
		{
			title: "9. Prepositions",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}><strong>Place:</strong> in, on, under, behind</p>
					<p style={{ ...FONTS.para_03 }}><strong>Time:</strong> at, in, on, since, for</p>
					<p style={{ ...FONTS.para_03 }}>Example: The book is on the table.</p>
				</div>
			)
		},
		{
			title: "10. Adjectives and Adverbs",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}><strong>Adjective:</strong> Describes noun (a fast car)</p>
					<p style={{ ...FONTS.para_03 }}><strong>Adverb:</strong> Describes verb/adjective (he runs fast)</p>
				</div>
			)
		},
		{
			title: "11. Comparison",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}><strong>Positive:</strong> big</p>
					<p style={{ ...FONTS.para_03 }}><strong>Comparative:</strong> bigger</p>
					<p style={{ ...FONTS.para_03 }}><strong>Superlative:</strong> biggest</p>
					<p style={{ ...FONTS.para_03 }}>Example: This house is bigger than that one.</p>
				</div>
			)
		},
		{
			title: "12. Sentence Types",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}><strong>Simple:</strong> I eat rice.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Compound:</strong> I eat rice and I drink milk.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Complex:</strong> I eat rice because I'm hungry.</p>
				</div>
			)
		},
		{
			title: "13. Conditional Sentences",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}><strong>Zero Conditional:</strong> If you heat ice, it melts.</p>
					<p style={{ ...FONTS.para_03 }}><strong>First:</strong> If I study, I will pass.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Second:</strong> If I were rich, I would travel.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Third:</strong> If I had known, I would have told you.</p>
				</div>
			)
		},
		{
			title: "14. Gerunds & Infinitives",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}><strong>Gerund:</strong> Verb + ing (Reading is fun)</p>
					<p style={{ ...FONTS.para_03 }}><strong>Infinitive:</strong> to + Verb (I like to read)</p>
				</div>
			)
		},
		{
			title: "15. Direct and Indirect Speech",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}><strong>Direct:</strong> He said, "I am happy."</p>
					<p style={{ ...FONTS.para_03 }}><strong>Indirect:</strong> He said that he was happy.</p>
				</div>
			)
		},
		{
			title: "16. Passive Voice",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}><strong>Active:</strong> She writes a letter.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Passive:</strong> A letter is written by her.</p>
				</div>
			)
		},
		{
			title: "17. Phrasal Verbs",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>Verb + preposition or adverb</p>
					<p style={{ ...FONTS.para_03 }}>Example: Give up (quit), take off (remove), look after (care)</p>
				</div>
			)
		},
		{
			title: "18. Common Sentence Patterns",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>I want to… (I want to learn English.)</p>
					<p style={{ ...FONTS.para_03 }}>Can you…? (Can you help me?)</p>
					<p style={{ ...FONTS.para_03 }}>I'm going to… (I'm going to the market.)</p>
				</div>
			)
		},
		{
			title: "19. Short Answers",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}>Yes, I am. / No, I'm not.</p>
					<p style={{ ...FONTS.para_03 }}>Yes, she can. / No, she can't.</p>
				</div>
			)
		},
		{
			title: "20. Everyday Spoken Grammar",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}><strong>Gonna</strong> (going to) - I'm gonna eat.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Wanna</strong> (want to) - I wanna go.</p>
					<p style={{ ...FONTS.para_03 }}><strong>Gotta</strong> (have got to) - I gotta leave.</p>
					<p style={{ ...FONTS.para_03, fontStyle: 'italic' }}>(Used in casual speech, not formal writing)</p>
				</div>
			)
		},
		{
			title: "21. Common Mistakes to Avoid",
			content: (
				<div className='ml-4'>
					<p style={{ ...FONTS.para_03 }}><X size={16} color={COLORS.light_red} style={{ display: 'inline', marginRight: '4px' }} /> He go to school. <CheckCircle size={16} color={COLORS.light_green} style={{ display: 'inline', marginLeft: '8px', marginRight: '4px' }} /> He goes to school.</p>
					<p style={{ ...FONTS.para_03 }}><X size={16} color={COLORS.light_red} style={{ display: 'inline', marginRight: '4px' }} /> I didn't knew. <CheckCircle size={16} color={COLORS.light_green} style={{ display: 'inline', marginLeft: '8px', marginRight: '4px' }} /> I didn't know.</p>
				</div>
			)
		}
	];

	const totalPages = Math.ceil(grammarContent.length / itemsPerPage);
	const currentItems = grammarContent.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

	const grammarQuestions = [
		{
			question: "Which sentence is grammatically correct?",
			options: ["He go to school daily", "He goes to school daily", "He going to school daily", "He gone to school daily"],
			correct: 1
		},
		{
			question: "Choose the correct past tense:",
			options: ["I eated lunch", "I eat lunch", "I ate lunch", "I eating lunch"],
			correct: 2
		},
		{
			question: "Which is the correct question form?",
			options: ["Do you like tea?", "You like tea?", "Like you tea?", "You do like tea?"],
			correct: 0
		},
		{
			question: "Select the correct article:",
			options: ["I saw a elephant", "I saw an elephant", "I saw the elephant", "I saw elephant"],
			correct: 1
		},
		{
			question: "Which sentence uses correct subject-verb agreement?",
			options: ["They was playing", "They were playing", "They is playing", "They are play"],
			correct: 1
		}
	];

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
		if (score > 95) {
			setGrammarCompleted(true);
			localStorage.setItem('grammarCompleted', 'true');
		}
		setTestCompleted(true);
		setShowGrammarTest(false);
	};

	return (
		<>
			{/* Grammar Test Modal */}
			{showGrammarTest && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<Card className='p-6 max-w-2xl w-full mx-4' style={{ backgroundColor: COLORS.bg_Colour }}>
						<h2 style={{ ...FONTS.heading_02 }} className='mb-4'>Grammar Test - Score 95+ to unlock Speaking</h2>
						<div className='mb-4'>
							<p style={{ ...FONTS.para_02 }}>Question {currentQuestion + 1} of {grammarQuestions.length}</p>
							<div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
								<div 
									className='h-2 rounded-full transition-all duration-300'
									style={{ 
										width: `${((currentQuestion + 1) / grammarQuestions.length) * 100}%`,
										background: COLORS.blue_01
									}}
								></div>
							</div>
						</div>
						<div className='mb-6'>
							<h3 style={{ ...FONTS.heading_04 }} className='mb-4'>{grammarQuestions[currentQuestion].question}</h3>
							<div className='space-y-3'>
								{grammarQuestions[currentQuestion].options.map((option, index) => (
									<div 
										key={index}
										className='p-3 rounded cursor-pointer border-2 transition-all'
										onClick={() => {
											const newAnswers = [...selectedAnswers];
											newAnswers[currentQuestion] = index;
											setSelectedAnswers(newAnswers);
										}}
										style={{
											background: selectedAnswers[currentQuestion] === index ? COLORS.light_blue : COLORS.white,
											borderColor: selectedAnswers[currentQuestion] === index ? COLORS.blue_01 : COLORS.text_desc,
											color: selectedAnswers[currentQuestion] === index ? COLORS.white : COLORS.text_desc
										}}
									>
										<p style={{ ...FONTS.para_02 }}>{option}</p>
									</div>
								))}
							</div>
						</div>
						<div className='flex justify-between'>
							<Button
								onClick={() => setShowGrammarTest(false)}
								className='px-4 py-2 rounded'
								style={{
									background: COLORS.text_desc,
									color: COLORS.white,
									...FONTS.para_02
								}}
							>
								Cancel
							</Button>
							<div className='flex gap-2'>
								{currentQuestion > 0 && (
									<Button
										onClick={() => setCurrentQuestion(currentQuestion - 1)}
										className='px-4 py-2 rounded'
										style={{
											background: COLORS.light_blue,
											color: COLORS.white,
											...FONTS.para_02
										}}
									>
										Previous
									</Button>
								)}
								{currentQuestion < grammarQuestions.length - 1 ? (
									<Button
										onClick={() => setCurrentQuestion(currentQuestion + 1)}
										disabled={selectedAnswers[currentQuestion] === undefined}
										className='px-4 py-2 rounded'
										style={{
											background: selectedAnswers[currentQuestion] !== undefined ? COLORS.blue_01 : COLORS.text_desc,
											color: COLORS.white,
											opacity: selectedAnswers[currentQuestion] !== undefined ? 1 : 0.5,
											...FONTS.para_02
										}}
									>
										Next
									</Button>
								) : (
									<Button
										onClick={handleTestSubmit}
										disabled={selectedAnswers.length !== grammarQuestions.length || selectedAnswers.includes(undefined)}
										className='px-4 py-2 rounded'
										style={{
											background: selectedAnswers.length === grammarQuestions.length && !selectedAnswers.includes(undefined) ? COLORS.light_green : COLORS.text_desc,
											color: COLORS.white,
											opacity: selectedAnswers.length === grammarQuestions.length && !selectedAnswers.includes(undefined) ? 1 : 0.5,
											...FONTS.para_02
										}}
									>
										Submit Test
									</Button>
								)}
							</div>
						</div>
					</Card>
				</div>
			)}

			<Card className='p-4 mb-6' style={{ backgroundColor: COLORS.bg_Colour, boxShadow: `inset 2px 2px 3px rgba(189, 194, 199, 0.75), inset -2px -2px 3px rgba(255, 255, 255, 0.7)` }}>
				<div className='flex justify-between items-start mb-4'>
					<h3 style={{ ...FONTS.heading_04 }}>Spoken English Grammar – Full Guide</h3>
					<div className='flex items-center gap-2'>
						{!grammarCompleted && (
							<Button
								onClick={() => setShowGrammarTest(true)}
								className='px-4 py-2 rounded-lg'
								style={{
									background: COLORS.bg_Colour,
									color: COLORS.blue_01,
									border: `2px solid ${COLORS.blue_01}`,
									boxShadow: `rgba(255, 255, 255, 0.7) -2px -2px 2px, rgba(189, 194, 199, 0.75) 2px 2px 2px`,
									...FONTS.para_02,
									fontWeight: 'bold'
								}}
							>
								Take Test
							</Button>
						)}
						{grammarCompleted && (
							<span style={{ ...FONTS.para_03, color: COLORS.light_green, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
								<CheckCircle size={16} /> Completed
							</span>
						)}
					</div>
				</div>
				<div className='min-h-96'>
					<div className='space-y-4'>
						{currentItems.map((item, index) => (
							<div key={index}>
								<h4 style={{ ...FONTS.heading_05, color: item.title.includes('Common Mistakes') ? COLORS.light_red : COLORS.blue_01 }}>{item.title}</h4>
								{item.content}
							</div>
						))}
					</div>
					
					<div className='flex justify-between items-center mt-6 pt-4 border-t' style={{ borderColor: COLORS.text_desc }}>
						<Button
							onClick={() => setCurrentPage(currentPage - 1)}
							disabled={currentPage === 0}
							className='flex items-center gap-2 px-4 py-2 rounded'
							style={{
								background: currentPage === 0 ? COLORS.text_desc : COLORS.blue_01,
								color: COLORS.white,
								opacity: currentPage === 0 ? 0.5 : 1,
								...FONTS.para_02
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
								background: currentPage === totalPages - 1 ? COLORS.text_desc : COLORS.blue_01,
								color: COLORS.white,
								opacity: currentPage === totalPages - 1 ? 0.5 : 1,
								...FONTS.para_02
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