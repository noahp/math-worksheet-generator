type QuestionType = 'algebra' | 'simple-arithmetic' | 'tens-arithmetic';

interface Question {
	question: string;
	answer: number;
}

class SeededRandom {
	private seed: number;

	constructor(seed: number) {
		this.seed = seed;
	}

	next(): number {
		this.seed = (this.seed * 9301 + 49297) % 233280;
		return this.seed / 233280;
	}

	randomInt(min: number, max: number): number {
		return Math.floor(this.next() * (max - min + 1)) + min;
	}
}

function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAlgebraQuestion(rng: SeededRandom): Question {
	const a = rng.randomInt(10, 389);
	const maxX = 399 - a;
	const x = rng.randomInt(10, maxX);
	const result = a + x;

	return {
		question: `${a} + x = ${result}`,
		answer: x,
	};
}

function generateSimpleArithmetic(rng: SeededRandom): Question {
	const a = rng.randomInt(1, 19);
	const b = rng.randomInt(1, 20 - a);

	return {
		question: `${a} + ${b} = ?`,
		answer: a + b,
	};
}

function generateTensArithmetic(rng: SeededRandom): Question {
	const a = rng.randomInt(1, 9) * 10;
	const b = rng.randomInt(1, 9) * 10;

	return {
		question: `${a} + ${b} = ?`,
		answer: a + b,
	};
}

function generateWorksheet(type: QuestionType, seed: number, count: number = 20): Question[] {
	const questions: Question[] = [];
	const rng = new SeededRandom(seed);

	for (let i = 0; i < count; i++) {
		switch (type) {
			case 'algebra':
				questions.push(generateAlgebraQuestion(rng));
				break;
			case 'simple-arithmetic':
				questions.push(generateSimpleArithmetic(rng));
				break;
			case 'tens-arithmetic':
				questions.push(generateTensArithmetic(rng));
				break;
		}
	}

	return questions;
}

function getHTML(): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Math Worksheet Generator</title>
	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		body {
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			min-height: 100vh;
			padding: 2rem;
		}

		.container {
			max-width: 900px;
			margin: 0 auto;
			background: white;
			border-radius: 16px;
			box-shadow: 0 20px 60px rgba(0,0,0,0.3);
			padding: 2rem;
		}

		h1 {
			color: #333;
			margin-bottom: 2rem;
			text-align: center;
			font-size: 2.5rem;
		}

		.controls {
			display: flex;
			gap: 1rem;
			margin-bottom: 2rem;
			flex-wrap: wrap;
			justify-content: center;
		}

		button {
			padding: 1rem 2rem;
			font-size: 1rem;
			border: none;
			border-radius: 8px;
			cursor: pointer;
			font-weight: 600;
			transition: all 0.3s;
			box-shadow: 0 4px 6px rgba(0,0,0,0.1);
		}

		button:hover {
			transform: translateY(-2px);
			box-shadow: 0 6px 12px rgba(0,0,0,0.15);
		}

		.btn-algebra {
			background: #667eea;
			color: white;
		}

		.btn-simple {
			background: #f093fb;
			color: white;
		}

		.btn-tens {
			background: #4facfe;
			color: white;
		}

		.btn-print {
			background: #43e97b;
			color: white;
		}

		.btn-show-answers {
			background: #fa709a;
			color: white;
		}

		#worksheet {
			margin-top: 2rem;
		}

		.worksheet-header {
			text-align: center;
			margin-bottom: 2rem;
			padding-bottom: 1rem;
			border-bottom: 3px solid #333;
		}

		.worksheet-header h2 {
			color: #333;
			margin-bottom: 0.5rem;
		}

		.worksheet-header .date {
			color: #666;
			font-size: 0.9rem;
		}

		.questions {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
			padding: 1rem 0;
		}

		.question {
			padding: 1rem;
			background: #f8f9fa;
			border-radius: 8px;
			border-left: 4px solid #667eea;
		}

		.question-number {
			font-weight: bold;
			color: #667eea;
			margin-bottom: 0.3rem;
		}

		.question-text {
			font-size: 1.2rem;
			color: #333;
			margin-bottom: 0.3rem;
		}

		.answer-line {
			border: 2px solid #ccc;
			padding: 0.5rem;
			min-height: 2.5rem;
			border-radius: 4px;
			background: white;
		}

		.answer {
			display: none;
			color: #28a745;
			font-weight: bold;
			font-size: 1.1rem;
		}

		.show-answers .answer {
			display: block;
		}

		.empty-state {
			text-align: center;
			color: #666;
			padding: 3rem;
			font-size: 1.1rem;
		}

		@media print {
			@page {
				size: letter;
				margin: 0.5in;
			}

			* {
				-webkit-print-color-adjust: exact;
				print-color-adjust: exact;
			}

			html {
				font-size: 16px !important;
			}

			body {
				background: white;
				padding: 0;
				margin: 0;
				overflow: hidden;
			}

			.container {
				box-shadow: none;
				padding: 0;
				margin: 0;
				max-width: 100%;
				border-radius: 0;
				overflow: hidden;
			}

			.controls {
				display: none !important;
			}

			a[href] {
				display: none !important;
			}

			h1 {
				display: none !important;
			}

			#worksheet {
				margin-top: 0;
				overflow: hidden;
			}

			.worksheet-header {
				margin-bottom: 10pt;
				padding-bottom: 4pt;
				border-bottom: 2px solid #000;
			}

			.worksheet-header h2 {
				font-size: 14pt;
				color: #000;
				margin: 0;
			}

			.worksheet-header .date {
				color: #000;
				font-size: 10pt;
				margin-top: 3pt;
			}

			.questions {
				gap: 4pt;
				padding: 0;
				row-gap: 4pt;
				column-gap: 6pt;
				width: 100%;
				overflow: hidden;
			}

			.question {
				break-inside: avoid;
				page-break-inside: avoid;
				background: white;
				border-left: 2px solid #000;
				padding: 3pt 4pt;
				border-radius: 0;
				margin: 0;
				width: 100%;
				box-sizing: border-box;
			}

			.question-number {
				color: #000;
				font-size: 9pt;
				margin-bottom: 2pt;
				line-height: 1.15;
			}

			.question-text {
				font-size: 11pt;
				color: #000;
				margin-bottom: 2pt;
				line-height: 1.25;
			}

			.answer-line {
				border: 1px solid #000;
				padding: 2pt 3pt;
				min-height: 18pt;
				border-radius: 0;
				background: white;
			}

			.answer {
				display: none !important;
			}

			.empty-state {
				display: none;
			}
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>📝 Math Worksheet Generator</h1>

		<div class="controls">
			<button class="btn-algebra" onclick="generateWorksheet('algebra')">
				Algebra (123 + x = 1125)
			</button>
			<button class="btn-simple" onclick="generateWorksheet('simple-arithmetic')">
				Simple Arithmetic (&lt;20)
			</button>
			<button class="btn-tens" onclick="generateWorksheet('tens-arithmetic')">
				Tens Arithmetic
			</button>
			<button class="btn-print" onclick="window.print()">
				🖨️ Print
			</button>
			<button class="btn-show-answers" onclick="toggleAnswers()">
				👁️ Show/Hide Answers
			</button>
		</div>

		<div style="text-align: center; margin-top: 1rem;">
			<a href="https://github.com/noahp/math-worksheet-generator" target="_blank" style="color: #667eea; text-decoration: none; font-size: 0.9rem;">
				View on GitHub
			</a>
		</div>

		<div id="worksheet">
			<div class="empty-state">
				Select a worksheet type above to generate 20 questions
			</div>
		</div>
	</div>

	<script>
		let showingAnswers = false;

		// Load worksheet from URL params on page load
		window.addEventListener('DOMContentLoaded', () => {
			const params = new URLSearchParams(window.location.search);
			const type = params.get('type');
			const seed = params.get('seed');

			if (type && seed) {
				generateWorksheet(type, parseInt(seed, 10));
			}
		});

		function toggleAnswers() {
			showingAnswers = !showingAnswers;
			const worksheet = document.getElementById('worksheet');
			if (showingAnswers) {
				worksheet.classList.add('show-answers');
			} else {
				worksheet.classList.remove('show-answers');
			}
		}

		async function generateWorksheet(type, seed) {
			const url = seed ? \`/api/generate?type=\${type}&seed=\${seed}\` : \`/api/generate?type=\${type}\`;
			const response = await fetch(url);
			const data = await response.json();

			// Update URL with type and seed
			const newUrl = new URL(window.location);
			newUrl.searchParams.set('type', type);
			newUrl.searchParams.set('seed', data.seed);
			window.history.pushState({}, '', newUrl);

			const typeTitles = {
				'algebra': 'Algebra Practice',
				'simple-arithmetic': 'Simple Arithmetic (Numbers < 20)',
				'tens-arithmetic': 'Tens Arithmetic'
			};

			const html = \`
				<div class="worksheet-header">
					<h2>\${typeTitles[type]}</h2>
					<div class="date">Name: __________________ Date: __________________</div>
				</div>
				<div class="questions">
					\${data.questions.map((q, i) => \`
						<div class="question">
							<div class="question-number">Question \${i + 1}</div>
							<div class="question-text">\${q.question}</div>
							<div class="answer-line">
								<span class="answer">x = \${q.answer}</span>
							</div>
						</div>
					\`).join('')}
				</div>
			\`;

			document.getElementById('worksheet').innerHTML = html;
			showingAnswers = false;
		}
	</script>
</body>
</html>`;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		// Serve the main HTML page
		if (url.pathname === '/') {
			return new Response(getHTML(), {
				headers: {
					'Content-Type': 'text/html',
				},
			});
		}

		// API endpoint to generate worksheets
		if (url.pathname === '/api/generate') {
			const type = url.searchParams.get('type') as QuestionType;
			const seedParam = url.searchParams.get('seed');

			if (!type || !['algebra', 'simple-arithmetic', 'tens-arithmetic'].includes(type)) {
				return new Response(JSON.stringify({ error: 'Invalid type' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			const seed = seedParam ? parseInt(seedParam, 10) : Math.floor(Math.random() * 1000000);
			const questions = generateWorksheet(type, seed, 20);

			return new Response(JSON.stringify({ questions, seed }), {
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		return new Response('Not Found', { status: 404 });
	},
} satisfies ExportedHandler<Env>;
