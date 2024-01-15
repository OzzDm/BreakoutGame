const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const startGame = document.querySelector('.start')
const blockWidth = 100
const blockHeight = 20
const gridWidth = 560
const gridHeight = 300
const ballDiameter = 20
const minBallYPosition = 30
let xDirection = 1
let yDirection = 1
let boardXPosition = 230
let boardYPosition = 10
let ballXPosition = 270
let ballYPosition = 30
let timerId


//add board
const board = document.createElement('div')
board.classList.add('board')
board.style.left = boardXPosition + 'px'
board.style.bottom = boardYPosition + 'px'
grid.appendChild(board)

//add board
const ball =document.createElement('div')
ball.classList.add('ball')
ball.style.left = ballXPosition+'px'
ball.style.bottom = ballYPosition+'px'
grid.appendChild(ball)

class Block{
    constructor(xAxis, yAxis){
       this.bottomLeft = [xAxis,yAxis]
       this.bottomRight = [xAxis + blockWidth, yAxis] 
       this.topLeft = [xAxis, yAxis + blockHeight]
       this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// draw all boxes
const blocks = [
    new Block(10,270),    
    new Block(120,270),   
    new Block(230,270),  
    new Block(340,270),   
    new Block(450,270),
    new Block(10,240),    
    new Block(120,240),   
    new Block(230,240),  
    new Block(340,240),   
    new Block(450,240),
    new Block(10,210),    
    new Block(120,210),   
    new Block(230,210),  
    new Block(340,210),   
    new Block(450,210)
]

function addBlock(){
    for(i=0;i < blocks.length;i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0]+'px'
        block.style.bottom = blocks[i].bottomLeft[1]+'px'
        grid.appendChild(block)
    }    
}

//draw ball
function drawBall(){
    ball.style.left = ballXPosition+'px'
    ball.style.bottom = ballYPosition+'px'
    grid.appendChild(ball)
}

// move board 
function moveBoard(e){
    if(e.key === 'ArrowRight' && boardXPosition < gridWidth - blockWidth){
        boardXPosition += 10
    } 
    else if(e.key === 'ArrowLeft' && boardXPosition > 0){
        boardXPosition -= 10
    }    
    board.style.left = boardXPosition+'px'
    grid.appendChild(board)
}

// move ball
function moveBall(){
    if(ballYPosition >= minBallYPosition - blockHeight)
    {
        ballXPosition += xDirection*10
        ballYPosition += yDirection*10
        drawBall()
    } else{
        scoreDisplay.innerHTML = 'You Lose! Refresh page to restart'
        document.removeEventListener('keydown',moveBoard)
    }
    detectCollision()   
}

function changeDirection(toDirection){
    if(toDirection === 'x')
        xDirection *= -1
    else if(toDirection === 'y')
        yDirection *= -1
}

function detectCollision(){

    //block collision
    for(let i=0; i < blocks.length; i++){
        if(ballXPosition >= blocks[i].bottomLeft[0] && ballXPosition < blocks[i].bottomRight[0]
            && ballYPosition + ballDiameter >=  blocks[i].bottomLeft[1] && ballYPosition < blocks[i].topLeft[1]){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            // console.log(allBlocks)
            // console.log(i)
            // if(i===0 || i===1)  debugger
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)            
            changeDirection('y')
            if(blocks.length === 0)
            {
                scoreDisplay.innerHTML = 'You Win!'
                clearInterval(timerId)
                document.removeEventListener('keydown',moveBoard)
            }
        }
    }

    //board collision
    if((ballYPosition === minBallYPosition && (ballXPosition <= boardXPosition + blockWidth) && (ballXPosition >= boardXPosition)))
        changeDirection('y')

    //wall collision
    if(ballXPosition >= gridWidth - ballDiameter || (ballXPosition <= 0))
        changeDirection('x')
    if(ballYPosition >= gridHeight - ballDiameter/2)
    {   
        changeDirection('y')
    }
}

startGame.addEventListener('click',(e) => {
    timerId = setInterval(moveBall,100)
    e.target.classList.remove('start')
})
document.addEventListener('keydown',moveBoard)


addBlock()
