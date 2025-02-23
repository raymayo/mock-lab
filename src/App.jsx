import { useState } from 'react';
import CopyJSONExample from './CopyJSONExample.jsx';

function App() {
	const [examData, setExamData] = useState(null);
	const [userAnswers, setUserAnswers] = useState({});
	const [showResults, setShowResults] = useState(false);
	const [score, setScore] = useState(0);

	// Function to shuffle questions
	const shuffleQuestions = (questions) => {
		return questions.sort(() => Math.random() - 0.5);
	};

	// Function to handle file upload
	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const json = JSON.parse(e.target.result);
				json.questions = shuffleQuestions(json.questions);
				setExamData(json);
				setUserAnswers({});
				setShowResults(false);
				setScore(0);
			} catch (error) {
				alert('Invalid JSON file', error);
			}
		};
		reader.readAsText(file);
	};

	// Function to handle answer selection
	const handleAnswerSelect = (questionIndex, answer) => {
		setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
	};

	// Function to submit exam
	const handleSubmit = () => {
		let newScore = 0;
		examData.questions.forEach((q, index) => {
			if (userAnswers[index] === q.answer) {
				newScore += 1;
			}
		});
		setScore(newScore);
		setShowResults(true);
		localStorage.setItem(
			'mockExamResults',
			JSON.stringify({ userAnswers, score: newScore })
		);
	};

	// Function to reset exam
	const handleReset = () => {
		setUserAnswers({});
		setShowResults(false);
		setScore(0);
		setExamData((prev) => ({
			...prev,
			questions: shuffleQuestions(prev.questions),
		}));
	};

	return (
		<div className="p-6 max-w-2xl mx-auto">
			{!examData ? (
				<div className="flex flex-col items-center gap-8">
          <div className='text-center'>
					<h2 className="text-7xl font-extrabold">MockLab</h2>
					<p className="text-lg">Experiment with test questions.</p>
          </div>
					<label className="border border-zinc-200 p-2 cursor-pointer bg-gray-100 hover:bg-gray-200 transition rounded-lg font-semibold shadow text-xl">
						<input
							type="file"
							accept=".json"
							onChange={handleFileUpload}
							className="hidden"
						/>
						Add Exam File
					</label>

					<div className="questions rounded-lg max-w-2xl mx-auto p-4 text-center">
						<h1 className="text-3xl font-bold mb-4">Welcome to MockLab! 🎓</h1>
						<p className="text-gray-700 mb-4">
							MockExam is a simple and effective way to practice for your
							upcoming tests. Just upload a JSON file containing multiple-choice
							questions, and the app will generate a practice exam for you.
						</p>
					</div>

					<div className="questions rounded-lg max-w-2xl mx-auto p-4 text-center">
						<h2 className="text-xl font-semibold">How It Works:</h2>
						<ul className="text-gray-700 text-left mt-2 space-y-2">
							<li>
								✅ <strong>Upload a JSON File</strong> – The file should contain
								questions, answer choices, and correct answers.
							</li>
							<li>
								✅ <strong>Take the Exam</strong> – Answer each question at your
								own pace.
							</li>
							<li>
								✅ <strong>View Your Results</strong> – See your score and
								review correct answers.
							</li>
							<li>
								✅ <strong>Track Your Progress</strong> – Your past results are
								saved, and you can clear them anytime.
							</li>
						</ul>
					</div>
					<CopyJSONExample />
				</div>
			) : !showResults ? (
				<div>
					<h2 className="text-2xl font-bold text-center">
						{examData.examTitle}
					</h2>
					{examData.questions.map((q, index) => (
						<div
							key={index}
							className="my-4 border-b border-zinc-200 p-4 flex flex-col gap-2">
							<p className="font-semibold">{q.question}</p>
							{q.options.map((option, optIndex) => (
								<label
									key={optIndex}
									className="questions block p-4 rounded-lg cursor-pointer">
									<input
										type="radio"
										name={`question-${index}`}
										value={option}
										onChange={() => handleAnswerSelect(index, option)}
									/>{' '}
									{option}
								</label>
							))}
						</div>
					))}
					<button
						className="submit text-white px-4 py-2 rounded m-4"
						onClick={handleSubmit}>
						Submit Exam
					</button>
				</div>
			) : (
				<div>
					<h2 className="text-2xl font-bold mb-4">Results</h2>
					<p className="text-lg font-semibold my-2">
						Score:{' '}
						<span className="questions p-1 rounded ">
							{score} / {examData.questions.length}
						</span>
					</p>
					{examData.questions.map((q, index) => (
						<div key={index} className="mb-4 questions p-4 rounded-lg">
							<p className="font-semibold">{q.question}</p>
							<p className="text-green-600">Correct Answer: {q.answer}</p>
							<p className="text-gray-600">
								Your Answer: {userAnswers[index] || 'No Answer'}
							</p>
						</div>
					))}
					<button
						className="mt-4 bg-red-500 text-white px-4 py-2 rounded mr-4"
						onClick={handleReset}>
						Reset Exam
					</button>
					<button
						className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
						onClick={() => document.getElementById('fileUpload').click()}>
						Upload New Exam
					</button>
					<input
						id="fileUpload"
						type="file"
						accept=".json"
						onChange={handleFileUpload}
						className="hidden"
					/>
				</div>
			)}
		</div>
	);
}

export default App;
