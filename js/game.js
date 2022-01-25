'use strict'
const WALL = '<img class="wall" src="img/wall.png"/>'
const FOOD = '<img class="food" src="img/food.png"/>'
const EMPTY = ' ';
const SUPER_FOOD = '<img class="wall" src="img/superfood.gif"/>'
const CHERRY = '<img class="wall" src="img/cherry2.gif"/>'
const SIZE = 10

var isSuper = false
var gIntervalCherry
var gEmptyCells=[]
var gBoard;
var gGame = {
    score: 0,
    foodCount: 0,
    isOn: false
}

function init() {
    document.querySelector('.gameover h1').innerText = 'Game Over!'
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    console.table(gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gIntervalCherry = setInterval(addCherry,15000)
    // startSuperMode()
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }else{
                board[i][j] = FOOD;
                gGame.foodCount++
            }
        }
    }
    board[1][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][8] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    return board;
}

function updateScore(diff = 0) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function endSuperMode(){
    var elTable = document.querySelector('table')
    elTable.style.backgroundColor='black'
    for(var i=0;i<3;i++){
        if(i<gDeadGhosts.length) gGhosts.push(gDeadGhosts[i])
        gGhosts[i].id=i
        renderCell(gGhosts[i].location,getGhostHTML(gGhosts[i]))
    }
    gDeadGhosts=[];
    isSuper = false
}

function startSuperMode(){
    isSuper = true
    var elTable = document.querySelector('table')
    console.log(elTable)
    elTable.style.backgroundColor='rgb(100, 23, 0)'
    for(var i=0;i<gGhosts.length;i++){
        gGhosts[i].id = 3
        renderCell({i:gGhosts[i].location.i,j:gGhosts[i].location.j},getGhostHTML(gGhosts[i]))
    }
    setTimeout(endSuperMode,5000)
}

// function updateFoodCount(isAdd) {
//     if (isAdd) gGame.foodCount++;
//     else gGame.foodCount--;
//     // console.log(gGame.foodCount)
//     if (gGame.foodCount <= 0) gameOver()
// }

function gameOver(isVictory=false) {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    if (isVictory) {
        var elVictory = document.querySelector('.gameover h1')
        elVictory.innerText = 'Victory!'
    }
    var elRestarModal = document.querySelector('.gameover')
    elRestarModal.style.display = 'block'
}

function resetGame() {
    gGame.score = 0
    gGame.foodCount = 0
    updateScore()
    var elRestarModal = document.querySelector('.gameover')
    elRestarModal.style.display = 'none'
    init()
}

function addCherry(){
   var emptyCells =  getEmptyCells()
    if (!emptyCells.length) return
    var cherryIdx= getRandomIntInclusive(0,emptyCells.length-1)
    var currCell = emptyCells[cherryIdx]
    gBoard[currCell.i][currCell.j]=CHERRY
    renderCell(emptyCells[cherryIdx],CHERRY)
    emptyCells.splice(cherryIdx,1)
}


function checkVictory(){
    if(gGame.foodCount <= 0){
        
        gameOver(1)
    } 
    console.log(gGame.foodCount)
    return false
}