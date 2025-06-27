const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["São Paulo", "Brasília", "Rio de Janeiro", "Belo Horizonte"],
        answer: "Brasília"
    },
    {
        question: "Quem descobriu o Brasil?",
        options: ["Pedro Álvares Cabral", "Cristovão Colombo", "Tiradentes", "Zumbi dos Palmares"],
        answer: "Pedro Álvares Cabral"
    },
    {
        question: "Qual é um dos biomas do brasil?",
        options: ["Amazonas", "Deserto", "Mata Indica", "Pantanal"],
        answer: "Pantanal"
    },
    {
        question: "O que se comemora no dia 7 de Setembro?",
        options: ["Proclamação da republica", "Tiradentes", "Independência do Brasil", "Dia dos Candangos"],
        answer: "Independência do Brasil"
    },
    {
        question: "Em qual destes produtos o Brasil mais se destaca?",
        options: ["Agro", "Tecnologia", "Armas", "Máquinas"],
        answer: "Agro"
    },
]

let currentQuestion = 0
let score = 0

const questionE1 = $('#question')
const optionsE1 = $('#options')
const nextBtn = $('#next-btn')
const progressBar = $('#progress-bar')
const quizContainer = $('#quiz-container')
const resultContainer = $('#result-container')
const scoreE1 = $('#score')

loadQuestion()

function loadQuestion() {
    const q = questions[currentQuestion]

    quizContainer.hide()

    questionE1.text(q.question)
    optionsE1.empty()

    q.options.forEach(option => {
        const $btn = $("<button>")
            .addClass("btn btn-outline-primary mb-2 w-100")
            .text(option)
            .on("click", function () {
                selectedOption($(this), option)
            })

        optionsE1.append($btn)
    })

    updateProgress()

    quizContainer.slideDown(1100)
}

function selectedOption($button, selectedOption) {
    const correct = questions[currentQuestion].answer

    $("#options button").prop("disabled", true).each(function () {
        const $btn = $(this)
        if ($btn.text() === correct) {
            $btn.removeClass("btn-outline-primary").addClass("btn-success")
        } else if ($btn.text() === selectedOption) {
            $btn.removeClass("btn-outline-primary").addClass("btn-danger")
        }
    })

    if (selectedOption === correct) {
        score++
    }
}

nextBtn.on("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++
        loadQuestion()
    } else {
        updateProgress()
        showResult()
    }
})

function showResult() {
    quizContainer.addClass("d-none")
    resultContainer.fadeIn(3000)
    resultContainer.removeClass("d-none")
    scoreE1.text(`${score} de ${questions.length}`)
}
function restartQuiz() {
    currentQuestion = 0
    score = 0
    quizContainer.removeClass("d-none")
    resultContainer.addClass("d-none")
    loadQuestion()
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100
    progressBar.css("width", `${progress}%`)
    progressBar.text(`${Math.round(progress)}%`)
}