'use strict'
const GHOST = 'GHOST';
const GHOST_IMG=['<img src="img/ghost1.png"/>','<img src="img/ghost2.png"/>','<img src="img/ghost3.png"/>','<img src="img/ghost4.png"/>']
var gGhosts;
var gIntervalGhosts;
var gDeadGhosts=[];
// console.log('ghost')

function createGhost(board,id) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor(),
        id:id
    }
    console.log(ghost)
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

}


function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = [];
    for (var i = 0; i < 3; i++) {
        createGhost(board,i)
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL||nextCell===SUPER_FOOD) return  // return if cannot move
    if (nextCell === GHOST) return
    if (nextCell === gPacHtml&&!isSuper) {  // hitting a pacman?  call gameOver
        gameOver();
        return
    }
    // moving from corrent position:
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent  // update the model
    renderCell(ghost.location, ghost.currCellContent) // update the DOM



    ghost.location = {   // Move the ghost to new location
        i: nextLocation.i,
        j: nextLocation.j
    }
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST  // update the model
    renderCell(ghost.location, getGhostHTML(ghost)) // update the DOM
}

function removeGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) {
          if(gGhosts[i].currCellContent === FOOD){
             gBoard[location.i][location.j]= gGhosts[i].currCellContent
             gGhosts[i].currCellContent=EMPTY
             gGame.foodCount--
          }  
         gDeadGhosts.push(gGhosts[i])
         console.log(gDeadGhosts)
          gGhosts.splice(i,1)
        }
    }

}

function getGhostHTML(ghost) {
    // return `<span style="color:${ghost.color};">${GHOST}</span>`
    return `<span>${GHOST_IMG[ghost.id]}</span>`
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

