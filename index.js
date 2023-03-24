const squares = document.querySelectorAll('.grid div')
const scoreDisplay = document.querySelector('.score-span')
const startBtn = document.querySelector('.start')
const gameOverDisplay = document.querySelector('.gameOver')
const bestScoreDisplay = document.querySelector('.bestScoreSpan')

const width = 30
const height = 20
let currentIndex = 0
let appleIndex = 0
let currentSnake = [2,1,0]
let direction = 1
let score = 0
let speed = 0.95
let startIntervalTime = 300
let intervalTime = startIntervalTime
let interval = 0
let previousKey = 39
let gameOver = false



scoreDisplay.innerHTML = score

function startGame(){
    if(startBtn.innerHTML == 'Continue'){
        startBtn.innerHTML = 'Pause'
        interval = setInterval(moveOutcomes, intervalTime)
        return
    }
    if(startBtn.innerHTML == 'Pause' && gameOver == false){
        startBtn.innerHTML = 'Continue'
        clearInterval(interval)
    }
    if(startBtn.innerHTML == 'Start!' || startBtn.innerHTML == 'Re-start!'){
        gameOver = false
        gameOverDisplay.style.display = 'none'
        startBtn.innerHTML = 'Pause'
        appleEated = 0
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        randomApple()
        score = 0
        scoreDisplay.innerHTML = score
        direction = 1
        intervalTime = startIntervalTime
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }
}

//function that deals with ALL the ove outcomes of the Snake
let scoreFormula
let appleEated = 0

function moveOutcomes(){

    //deals with snake hitting border and snake hitting self
    if(
        (currentSnake[0] + width >= (width * height) && direction == width) ||
        (currentSnake[0] % width == width -1 && direction == 1) ||
        (currentSnake[0] % width == 0 && direction == -1) ||
        (currentSnake[0] - width < 0 && direction == -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ){
        startBtn.innerHTML = 'Re-start!'
        gameOver = true
        gameOverDisplay.style.display = 'flex'
        return clearInterval(interval)
    }

    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)

    if(squares[currentSnake[0]].classList.contains('apple')){
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')   
        currentSnake.push(tail)
        randomApple()
        appleEated++
        scoreFormula = Math.round((((Math.random()+1) *2)*appleEated))
        score += scoreFormula 
        scoreDisplay.innerHTML = score
        if(bestScoreDisplay.innerHTML <= score){
            bestScoreDisplay.innerHTML = score
        }
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
    }

    squares[currentSnake[0]].classList.add('snake')

}

//generate new apple once apple is eaten
function randomApple(){
    do{
        appleIndex = Math.floor(Math.random()* squares.length)
    } while(squares[appleIndex].classList.contains('snake')){
        squares[appleIndex].classList.add('apple')
    }
}


//assign functions to keycodes
function control(e){
    squares[currentIndex].classList.remove('snake')

    if(e.keyCode == 39 && previousKey !== 37){
        previousKey = 39
        direction = +1
    }else if(e.keyCode == 38 && previousKey !== 40){
        previousKey = 38
        direction = -width
    } else if(e.keyCode == 37 && previousKey !== 39){
        previousKey = 37
        direction = -1
    }else if(e.keyCode == 40 && previousKey !== 38){
        previousKey = 40
        direction = +width
    }
}


document.addEventListener('keyup', control)

startBtn.addEventListener('click', startGame)

