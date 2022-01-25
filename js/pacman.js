'use strict'
var gPacHtml = '<img class="pac" src="img/pacRight.gif"/>'
var gDeg = 0
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false,
        currCellContent: EMPTY
    }
    //if (board[gPacman.location.i][gPacman.location.j] === FOOD) updateFoodCount(false)
    if (board[gPacman.location.i][gPacman.location.j] === FOOD) gGame.foodCount --
    board[gPacman.location.i][gPacman.location.j] = gPacHtml
}

function movePacman(ev) {
    if (!gGame.isOn) return
    var nextLocation = getNextLocation(ev)
    var currCellContent = EMPTY
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return // return if cannot move

    if (nextCell === GHOST) {
        if (!isSuper) {
            gameOver();
            return
        }else { 
            removeGhost({ i: nextLocation.i, j: nextLocation.j })
        }

    }
    if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodCount --
        checkVictory() // add this function nd check if you can win. 
       // addToEmptyCellArr({ i: nextLocation.i, j: nextLocation.j })
    }
    if (nextCell === CHERRY) {
      //  addToEmptyCellArr({ i: nextLocation.i, j: nextLocation.j })
        updateScore(10)
    }
    if (nextCell === SUPER_FOOD) {
        if (!isSuper) {
            gGame.foodCount --
            startSuperMode()
            checkVictory()
        //    addToEmptyCellArr({ i: nextLocation.i, j: nextLocation.j })
        } else {
            currCellContent = SUPER_FOOD
        }

    }

    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = gPacman.currCellContent
    // update the DOM
    renderCell(gPacman.location, gPacman.currCellContent)

    // Move the pacman to new location
    // update the model
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = gPacHtml
    // update the DOM
    renderCell(gPacman.location, getPacmenHTML())
    gPacman.currCellContent = currCellContent
}

function getNextLocation(keyboardEvent) {
    // console.log('keyboardEvent.code', keyboardEvent.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }


    switch (keyboardEvent.code) {
        case 'ArrowUp':
            nextLocation.i--
            gDeg = -90           
            break;
        case 'ArrowDown':
            nextLocation.i++
            gDeg= 90
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gDeg=180
            gPacHtml = '<img class="pacleft"src="img/pacRight.gif"/>'
            break;
        case 'ArrowRight':
            nextLocation.j++
            gDeg=0
            gPacHtml = '<img class="pac"src="img/pacRight.gif"/>'
            break;
        default: return null
    }
    return nextLocation;
}

function getPacEl() {
    var elPac = document.querySelector('.pac')
    return elPac
}

function getPacmenHTML(){
    return `<img class="pac" style="transform:rotate(${gDeg}deg)" src="img/pacRight.gif"/>`
}