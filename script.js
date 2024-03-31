const DATA=[
    {
        question: '1.My favourite sport …… tennis.', //каждый объект это один вопрос
        answers: [
            {
                id: '1',
                value: 'are',
                correct: false,
            },
            {
                id: '2',
                value: 'is',
                correct: true,
            },
            {
                id: '3',
                value: 'be',
                correct: false,
            },

        ]
    },
    {
        question: '2.Roberto is Italian. He’s …… Italy.', //каждый объект это один вопрос
        answers: [
            {
                id: '4',
                value: 'from',
                correct: true,
            },
            {
                id: '5',
                value: 'to',
                correct: false,
            },
            {
                id: '6',
                value: 'at',
                correct: false,
            },
            

        ]
    },
    {
        question: '3.…… you help me, please?', //каждый объект это один вопрос
        answers: [
            {
                id: '7',
                value: 'Have',
                correct: false,
            },
            {
                id: '8',
                value: 'Do',
                correct: false,
            },
            {
                id: '9',
                value: 'Can',
                correct: true,
            },
            

        ]
    },
    {
        question: '4.Moscow is the …… of Russia.', //каждый объект это один вопрос
        answers: [
            {
                id: '10',
                value: 'country',
                correct: false,
            },
            {
                id: '11',
                value: 'nationality',
                correct: false,
            },
            {
                id: '12',
                value: 'capital',
                correct: true,
            },
            

        ]
    },
    {
        question: '5.I leave for work …… quarter past eight.', //каждый объект это один вопрос
        answers: [
            {
                id: '13',
                value: 'in',
                correct: false,
            },
            {
                id: '14',
                value: 'at',
                correct: true,
            },
            {
                id: '15',
                value: 'on',
                correct: false,
            },
            

        ]
    },
    {
        question: '6.The doctor told me that I …… smoke.', //каждый объект это один вопрос
        answers: [
            {
                id: '16',
                value: 'mustn’t',
                correct: true,
            },
            {
                id: '17',
                value: 'won’t',
                correct: false,
            },
            {
                id: '18',
                value: 'doesn’t have',
                correct: false,
            },
            

        ]
    },
    {
        question: '7.…… that man in the red hat?', //каждый объект это один вопрос
        answers: [
            {
                id: '19',
                value: 'Whose',
                correct: false,
            },
            {
                id: '20',
                value: 'Who',
                correct: false,
            },
            {
                id: '21',
                value: 'Who’s',
                correct: true,
            },
            

        ]
    },
    {
        question: '8.Is …… your new car? It’s great!', //каждый объект это один вопрос
        answers: [
            {
                id: '22',
                value: 'these',
                correct: false,
            },
            {
                id: '23',
                value: 'that',
                correct: true,
            },
            {
                id: '24',
                value: 'there',
                correct: false,
            },
            

        ]
    },
    {
        question: '9.This letter is for Tom. Give it to ……', //каждый объект это один вопрос
        answers: [
            {
                id: '25',
                value: 'him',
                correct: true,
            },
            {
                id: '26',
                value: 'he',
                correct: false,
            },
            {
                id: '27',
                value: 'his',
                correct: false,
            },
            

        ]
    },
    {
        question: '10.We …… to school every day.', //каждый объект это один вопрос
        answers: [
            {
                id: '28',
                value: 'gos',
                correct: false,
            },
            {
                id: '29',
                value: 'goes',
                correct: false,
            },
            {
                id: '30',
                value: 'go',
                correct: true,
            },
            

        ]
    },
]; //сохраняем вопросы и ответы в массиве

let localResults={};

const quiz=document.getElementById('quiz');
const questions=document.getElementById('questions');
const indicator=document.getElementById('indicator');
const results=document.getElementById('results');
const btnNext =document.getElementById('btn-next');
const btnRestart =document.getElementById('btn-restart');

const renderQuestions = (index) => {
    renderIndicator(index+1);
    questions.dataset.currentStep = index;
    const renderAnswers = () => DATA[index].answers
    .map((answer)=> `
                <li>
                    <label>
                        <input class="answer-input" type="radio" name=${index} value=${answer.id}>
                        ${answer.value}
                    </label>
                </li>
            `)
        .join('');
    questions.innerHTML=`
        <div class="quiz-questions-item">
            <div class="quiz-questions-item_question">${DATA[index].question}</div>
             <ul class="quiz-questions-item_answers">${renderAnswers()}</ul>
        </div>
    `;
};


const renderResults = () => {
    let content = '';
    const getClassname = (answer, questionIndex) => {
        let classname = '';

        if(!answer.correct && answer.id === localResults[questionIndex]){
            classname='answer--invalid';
        }
        else if(answer.correct) {
            classname='answer--valid';

        }

        return classname;
    }
    const getAnswers = (questionIndex) => DATA[questionIndex].answers
    .map((answer) =>`<li class=${getClassname(answer, questionIndex)}>${answer.value}</li>`) 
        .join('');

    DATA.forEach((question, index) => {
        content += `
        <div class="quiz-results-item">
                <div class="quiz-results-item_question">${question.question}</div>
                <ul class="quiz-results-item_answers">${getAnswers(index)}</ul>
                </div>
        `;
    })
    results.innerHTML = content;
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML= `${currentStep}/${DATA.length}`;
};

quiz.addEventListener('change', (event) => { //listener слушатель 
    if (event.target.classList.contains('answer-input')){
        console.log('input'); //тут логика
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;

        console.log(localResults);
    }
})

quiz.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-next')){
        const nextQuestionIndex=Number(questions.dataset.currentStep) + 1;
        

        if(DATA.length === nextQuestionIndex){
            questions.classList.add('questions--hidden');
            indicator.classList.add('indicator--hidden');
            results.classList.add('results--visible');
            btnNext.classList.add('btn-next--hidden');
            btnRestart.classList.add('btn-restart--visible');

            renderResults();
        }
        else{
            renderQuestions(nextQuestionIndex);//переход к след вопрос
        }
        btnNext.disabled = true;

    }
});
quiz.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-restart')){
        localResults = {};
        results.innerHTML = '';
        questions.classList.remove('questions--hidden');
        indicator.classList.remove('indicator--hidden');
        results.classList.remove('results--visible');
        btnNext.classList.remove('btn-next--hidden');
        btnRestart.classList.remove('btn-restart--visible');
        renderQuestions(0);
    }
});

renderQuestions(0);