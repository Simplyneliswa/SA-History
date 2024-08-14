// script.js
const questions = {
    easy: [
        { question: "What is the capital of South Africa?", answers: ["Johannesburg", "Pretoria", "Cape Town", "Durban"], correct: "Pretoria" },
        { question: "Who was the first black President of South Africa?", answers: ["Nelson Mandela", "Thabo Mbeki", "Jacob Zuma", "Kgalema Motlanthe"], correct: "Nelson Mandela" },
        { question: "Which South African city is known for the annual Stellenbosch Wine Festival?", answers: ["Cape Town", "Durban", "Stellenbosch", "Johannesburg"], correct: "Stellenbosch" },
        { question: "What is the traditional South African dish made from maize and served with meat or vegetables?", answers: ["Bunny Chow", "Pap", "Biltong", "Braai"], correct: "Pap" },
        { question: "Which South African town is famous for its ostrich farms?", answers: ["Oudtshoorn", "George", "Knysna", "Plett"], correct: "Oudtshoorn" },
        { question: "Which South African province is known for its diamond mining?", answers: ["Northern Cape", "Gauteng", "Limpopo", "Mpumalanga"], correct: "Northern Cape" },
        { question: "Which South African leader is known for his work in the anti-apartheid movement and was later awarded the Nobel Peace Prize?", answers: ["Nelson Mandela", "Oliver Tambo", "Desmond Tutu", "Steve Biko"], correct: "Desmond Tutu" },
        { question: "Which South African city is home to the Apartheid Museum?", answers: ["Johannesburg", "Cape Town", "Durban", "Pretoria"], correct: "Johannesburg" },
        { question: "Which South African province is known for its beaches along the Indian Ocean?", answers: ["KwaZulu-Natal", "Western Cape", "Eastern Cape", "Gauteng"], correct: "KwaZulu-Natal" },
        { question: "What is the South African term for a barbecue?", answers: ["Braai", "Potjiekos", "Bobotie", "Pap"], correct: "Braai" }
    ],
    medium: [
        { question: "Which South African leader was known as the 'Father of the Nation'?", answers: ["Nelson Mandela", "Steve Biko", "Oliver Tambo", "Robert Sobukwe"], correct: "Nelson Mandela" },
        { question: "Which political party came to power in South Africa in 1994?", answers: ["African National Congress (ANC)", "National Party", "Inkatha Freedom Party", "Democratic Alliance"], correct: "African National Congress (ANC)" },
        { question: "Which battle in 1879 is famous for the defeat of British troops by Zulu warriors?", answers: ["Battle of Isandlwana", "Battle of Rorke's Drift", "Battle of Blood River", "Battle of Ulundi"], correct: "Battle of Isandlwana" },
        { question: "Which year marked the official end of apartheid in South Africa?", answers: ["1990", "1994", "1996", "2000"], correct: "1994" },
        { question: "Who was the first black South African to win an Olympic gold medal?", answers: ["Cameron van der Burgh", "Wayde van Niekerk", "Josia Thugwane", "Caster Semenya"], correct: "Josia Thugwane" },
        { question: "What was the name of the resistance movement led by Steve Biko?", answers: ["Black Consciousness Movement", "ANC Youth League", "PAC", "South African Students' Organisation"], correct: "Black Consciousness Movement" },
        { question: "Which South African province is home to the Drakensberg Mountains?", answers: ["KwaZulu-Natal", "Western Cape", "Eastern Cape", "Mpumalanga"], correct: "KwaZulu-Natal" },
        { question: "Who was the first black Archbishop of Cape Town?", answers: ["Desmond Tutu", "Trevor Huddleston", "Nelson Mandela", "Steve Biko"], correct: "Desmond Tutu" },
        { question: "Which South African city is known for the annual Stellenbosch Wine Festival?", answers: ["Cape Town", "Durban", "Stellenbosch", "Johannesburg"], correct: "Stellenbosch" },
        { question: "What is the traditional South African dish made from maize and served with meat or vegetables?", answers: ["Bunny Chow", "Pap", "Biltong", "Braai"], correct: "Pap" }
    ],
    hard: [
        { question: "What was the primary goal of the South African Congress of Trade Unions (SACTU)?", answers: ["Labour rights", "Political reform", "Education", "Healthcare"], correct: "Labour rights" },
        { question: "Which South African leader was known for advocating the concept of 'Non-Racialism'?", answers: ["Nelson Mandela", "Oliver Tambo", "Desmond Tutu", "Steve Biko"], correct: "Oliver Tambo" },
        { question: "In what year was the South African Reserve Bank established?", answers: ["1921", "1933", "1948", "1961"], correct: "1921" },
        { question: "Which South African political figure was instrumental in the establishment of the South African Native National Congress (SANNC) in 1912?", answers: ["John Dube", "Sol Plaatje", "James Moroka", "Albert Luthuli"], correct: "John Dube" },
        { question: "Which South African movement was founded in 1912 to represent the interests of black South Africans?", answers: ["African National Congress", "South African Communist Party", "Congress of the People", "Pan Africanist Congress"], correct: "African National Congress" },
        { question: "What was the name of the first African-owned bank established in South Africa in 1946?", answers: ["The African Bank", "The South African Bank", "The People's Bank", "The Natal Bank"], correct: "The African Bank" },
        { question: "Which South African author won the Nobel Prize for Literature in 1991?", answers: ["Nadine Gordimer", "J.M. Coetzee", "Alan Paton", "Bessie Head"], correct: "J.M. Coetzee" },
        { question: "Which South African company was the first to be listed on the Johannesburg Stock Exchange?", answers: ["Anglo American", "De Beers", "Sasol", "Gold Fields"], correct: "Anglo American" },
        { question: "What was the primary focus of the Black Consciousness Movement in South Africa?", answers: ["Cultural pride", "Economic development", "Political reform", "International solidarity"], correct: "Cultural pride" }
    ]
};

const game = {
    level: 'easy',
    score: 0,
    questionIndex: 0,
    time: 25,
    timerInterval: null,
    questions: questions.easy,

    startGame: function() {
        this.score = 0;
        this.questionIndex = 0;
        this.time = 25;
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('timer').textContent = `Time: ${this.time}`;
        document.getElementById('start').style.display = 'none';
        document.getElementById('end-game').style.display = 'block';
        this.loadQuestions();
    },

    loadQuestions: function() {
        this.showQuestion();
        this.startTimer();
    },

    showQuestion: function() {
        const currentQuestion = this.questions[this.questionIndex];
        if (!currentQuestion) {
            this.checkLevel();
            return;
        }
        document.getElementById('question').textContent = currentQuestion.question;
        const answersDiv = document.getElementById('answers');
        answersDiv.innerHTML = '';
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', () => this.checkAnswer(answer));
            answersDiv.appendChild(button);
        });
    },

    checkAnswer: function(selectedAnswer) {
        const currentQuestion = this.questions[this.questionIndex];
        const buttons = document.querySelectorAll('#answers button');
        buttons.forEach(button => {
            if (button.textContent === currentQuestion.correct) {
                button.classList.add('correct');
            } else if (button.textContent === selectedAnswer) {
                button.classList.add('incorrect');
            }
        });

        if (selectedAnswer === currentQuestion.correct) {
            this.score += 10;
            document.getElementById('score').textContent = `Score: ${this.score}`;
        }

        this.questionIndex++;
        clearInterval(this.timerInterval);
        this.time = 25;
        document.getElementById('timer').textContent = `Time: ${this.time}`;
        setTimeout(() => {
            this.showQuestion();
            this.startTimer();
        }, 1000);
    },

    startTimer: function() {
        this.timerInterval = setInterval(() => {
            this.time--;
            document.getElementById('timer').textContent = `Time: ${this.time}`;
            if (this.time <= 0) {
                clearInterval(this.timerInterval);
                this.questionIndex++;
                this.time = 25;
                document.getElementById('timer').textContent = `Time: ${this.time}`;
                this.showQuestion();
            }
        }, 1000);
    },

    checkLevel: function() {
        if (this.score < 80) {
            document.getElementById('message').textContent = `Level Failed! Your score is ${this.score}.`;
            this.resetGame();
            return;
        }
        document.getElementById('message').textContent = 'Moving to the next level...';
        setTimeout(() => {
            if (this.level === 'easy') {
                this.level = 'medium';
                this.questions = questions.medium;
            } else if (this.level === 'medium') {
                this.level = 'hard';
                this.questions = questions.hard;
            } else {
                document.getElementById('message').textContent = `Game Over! Your final score is ${this.score}.`;
                this.resetGame();
                return;
            }
            this.questionIndex = 0;
            this.startGame();
        }, 1000); // 1-second delay before moving to the next level
    },

    resetGame: function() {
        this.level = 'easy';
        this.score = 0;
        this.questionIndex = 0;
        this.time = 25;
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('timer').textContent = `Time: ${this.time}`;
        document.getElementById('message').textContent = '';
        document.getElementById('start').style.display = 'block';
        document.getElementById('end-game').style.display = 'none';
    }
};

document.getElementById('start').addEventListener('click', () => game.startGame());
document.getElementById('end-game').addEventListener('click', () => {
    game.resetGame();
    document.getElementById('start').style.display = 'block';
    document.getElementById('end-game').style.display = 'none';
});
