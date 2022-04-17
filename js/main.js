/*----- constants -----*/
const playerOne = 1
const playerTwo = -1

/*----- app's state (variables) -----*/
let board
let turn
let sqrElIdx
let selectedPiece
let fearedAnimals = []
let renderedBoard = false

/*----- cached element references -----*/
const boardEl = document.querySelector('.board')
const resetBtnEl = document.querySelector('.button')
const playerOneEl = document.querySelector('.one')
const playerTwoEl = document.querySelector('.two')

/*----- event listeners -----*/
boardEl.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', initialize)

/*----- functions -----*/
initialize()

function initialize() {
    turn = 1

   // if board was already created
    if (renderedBoard) {
        clearBoard()
        resetName()
    }
    createBoardArray()
    defineAnimalObjs()
    renderBoard()
    renderOasis()
    renderPieces()
    showPlayerTurn()
}
// create and define board array
function createBoardArray() {
    // create an array with 10 nested arrays
    board = [[], [], [], [], [], [], [], [], [], []]
    // add 10 objects per nested array
    board.forEach(subArray => {
        for (let i = 0; i < 10; i ++) {
            subArray.push({})
        }
    })
    // add key/value pairs for every object
    let count = 0
    board.forEach(subArray => subArray.forEach(object => {
        object.idx = count
        object.player = null
        object.piece = null
        object.occupied = null
        object.fear = null
        count++
    }))
}
// define animal objects in board array
function defineAnimalObjs() {
    // Player 1
    Object.assign(board[0][4], {player: 1, piece: 'E', occupied: true})
    Object.assign(board[0][5], {player: 1, piece: 'E', occupied: true})
    Object.assign(board[1][3], {player: 1, piece: 'L', occupied: true})
    Object.assign(board[1][6], {player: 1, piece: 'L', occupied: true})
    Object.assign(board[1][4], {player: 1, piece: 'M', occupied: true})
    Object.assign(board[1][5], {player: 1, piece: 'M', occupied: true})
    // Player 2
    Object.assign(board[9][4], {player: -1, piece: 'E', occupied: true})
    Object.assign(board[9][5], {player: -1, piece: 'E', occupied: true})
    Object.assign(board[8][3], {player: -1, piece: 'L', occupied: true})
    Object.assign(board[8][6], {player: -1, piece: 'L', occupied: true})
    Object.assign(board[8][4], {player: -1, piece: 'M', occupied: true})
    Object.assign(board[8][5], {player: -1, piece: 'M', occupied: true}) 
}
// render board in DOM
function renderBoard() {
    let counter = 0
    // if board was already created, do not recreate it
    if (renderedBoard) return
    // create row elements
    for (let i = 0; i < 10; ++i) {
        let row = document.createElement('div')
        row.classList.add('row')
        // create square elements for each row
        for (let j = 0; j < 10; j++) {
            let square = document.createElement('div')
            square.classList.add('square')
            square.setAttribute('id', counter)
            // for each new row; reverse color scheme
            if (i % 2) {
                if (j % 2) {
                    square.style.backgroundColor = '#f5deb3' // light wheat
                } else {
                    square.style.backgroundColor = '#d9a420' // dark wheat
                }
            } else {
                if (j % 2) {
                    square.style.backgroundColor = '#d9a420' // dark wheat
                } else {
                    square.style.backgroundColor = '#f5deb3' // light wheat
                }
            }
            row.appendChild(square)
            counter++
        }
        boardEl.appendChild(row)
    }
    // set value to true after creating board
    renderedBoard = true
    
}
// render oasis elements
function renderOasis() {
   [document.getElementById('33'), document.getElementById('36'), 
   document.getElementById('63'), document.getElementById('66')].forEach(oasisEl => oasisEl.style.backgroundColor = '#2387bf')
       
}
// render animals on starting squares
function renderPieces() {
    // player 1
    let blkElephantEls = [document.getElementById('4'), document.getElementById('5')]
    blkElephantEls.forEach(square => square.style.backgroundImage = 'url("img/black/black_elephant.png")')
    let blkLionEls = [document.getElementById('13'), document.getElementById('16')]
    blkLionEls.forEach(square => square.style.backgroundImage = 'url("img/black/black_lion.png")')
    let blkMouseEls = [document.getElementById('14'), document.getElementById('15')]
    blkMouseEls.forEach(square => square.style.backgroundImage = 'url("img/black/black_mouse.png")')
    // player 2
    let redElephantEls = [document.getElementById('94'), document.getElementById('95')]
    redElephantEls.forEach(square => square.style.backgroundImage = 'url("img/red/red_elephant.png")')
    let redLionEls = [document.getElementById('83'), document.getElementById('86')]
    redLionEls.forEach(square => square.style.backgroundImage = 'url("img/red/red_lion.png")')
    let redMouseEls = [document.getElementById('84'), document.getElementById('85')]
    redMouseEls.forEach(square => square.style.backgroundImage = 'url("img/red/red_mouse.png")')    
}

// handle clicked pieces and destination squares
function handleClick(evt) {
   
    // convert square id element into array of numbers
    sqrElIdx = convertElId(evt)
    let rowIdx = sqrElIdx[0]
    let columnIdx = sqrElIdx[1]

    // check to see if clicked square has a player's animal
    if (board[rowIdx][columnIdx].player === turn) {
        selectedPiece = [evt.target, rowIdx, columnIdx]
        removeHighlight()
        document.getElementById(evt.target.id).classList.add('highlight')
        findPossibleMoves(rowIdx, columnIdx)
    }
    // call move function if piece was selected
    if (selectedPiece[0] !== evt.target) {
        move(evt, selectedPiece)
    } 
    
}

// remove all highlights
function removeHighlight() {
    let hglAnimalEl = document.querySelector('.highlight')
    let hglMovesEl = document.querySelectorAll('.move')
    // remove highlight from selected piece before highlighting another
    if (hglAnimalEl) hglAnimalEl.classList.remove('highlight')
    // remove highlight from animal's possible moves
    if (hglMovesEl) hglMovesEl.forEach(squareEl => squareEl.classList.remove('move'))
}

// // highlight square when player's animal is clicked
// function addHighlight(selectedPiece, d) {
//     document.getElementById(selectedPiece[0].id).classList.add('highlight')
// }

// convert square ele id from string to array of nums to access board array
function convertElId(evt) {
    let rowColumnIdx = []
    let rowIdx, columnIdx
    if (parseInt(evt.target.id) < 10) {
        rowIdx = 0
        columnIdx = parseInt(evt.target.id)
    } else {
        rowIdx = parseInt(evt.target.id.charAt(0))
        columnIdx = parseInt(evt.target.id.charAt(1))
    }
    rowColumnIdx.push(rowIdx, columnIdx)
    return rowColumnIdx 
}
// check to see if there are at least 3 pieces from the same player on the oasis
function checkWinner() {
    let oasis1 = board[3][3]
    let oasis2 = board[3][6]
    let oasis3 = board[6][3]
    let oasis4 = board[6][6]
    let result

    if (oasis1.occupied && oasis1.player === turn) {
        if (oasis2.occupied && oasis2.player === turn) {
            if ((oasis3.occupied && oasis3.player === turn) || (oasis4.occupied && oasis4.player === turn)) {
                result = true
            }
        } else if (oasis3.occupied && oasis3.player === turn && oasis4.occupied && oasis4.player === turn) {
                result = true
        }
    } else if (oasis2.occupied && oasis2.player === turn) {
        if ((oasis3.occupied && oasis3.player ===  turn) && (oasis4.occupied && oasis4.player === turn)) {
                result = true
        }
    }
    if (result === true) turn === 1 ? playerOneEl.innerText = 'WINNER!' :  playerTwoEl.innerText = 'WINNER!'
}
// switch players when turn ends
function changeTurn() {
    turn === 1 ? turn = -1 : turn = 1
    showPlayerTurn()
}
// show player turn in DOM
function showPlayerTurn() {
    if (turn === 1) {
        playerOneEl.style.border = '0.5vh solid black'
        playerOneEl.style.borderRadius = '1.5vh'
        playerTwoEl.style.border = ''
        playerTwoEl.style.borderRadius = ''
    } else {
        playerTwoEl.style.border = '0.5vh solid #922d03'
        playerTwoEl.style.borderRadius = '1.5vh'
        playerOneEl.style.border = ''
        playerOneEl.style.borderRadius = ''
    }
}

function checkDiagonals(pieceClicked) {
    let diagonalMoves = []
    let row, column, strIdx

    if (pieceClicked.idx < 10) {
        row = 0
        column = pieceClicked.idx
    } else {
        strIdx = String(pieceClicked.idx).split('')
        row = parseInt(strIdx[0])
        column = parseInt(strIdx[1])
    }
    
    // diagonal up/left
    for (let i = row - 1; i >= 0; i--) {
        column--
        if (i < 0 || column < 0) break
        if (board[i][column].occupied === null) diagonalMoves.push(board[i][column].idx)
        else break  
    }
    // diagonal down/right
    if (pieceClicked.idx < 10) column = pieceClicked.idx
    else column = parseInt(strIdx[1])
    for (let i = row + 1; i <= 9; i++) {
        column++
        if (i > 9 || column > 9) break
        if (board[i][column].occupied === null) diagonalMoves.push(board[i][column].idx)  
        else break 
    }
    // diagonal up/right
    if (pieceClicked.idx < 10) column = pieceClicked.idx
    else column = parseInt(strIdx[1])
    for (let i = row - 1; i >= 0; i--) {
        column++
        if (i < 0 || column > 9) break
        if (board[i][column].occupied === null) diagonalMoves.push(board[i][column].idx)   
        else break
    }
    // // diagonal down/left
    if (pieceClicked.idx < 10) column = pieceClicked.idx
    else column = parseInt(strIdx[1])
    for (let i = row + 1; i <= 9; i++) {
        column--
        if (i > 9 || column < 0) break
        if (board[i][column].occupied === null) diagonalMoves.push(board[i][column].idx)   
        else break
    }

    return diagonalMoves
}

function checkColumn(idx1, idx2) {
    let columnMoves = []
    //up check
    for (let i = idx1 - 1; i >= 0; i--) {
        if (board[i][idx2].occupied === null) {
            columnMoves.push(board[i][idx2].idx)
        } else break
    }
    // down check
    for (let i = idx1 + 1; i <= 9; i++) {
        if (board[i][idx2].occupied === null) {
            columnMoves.push(board[i][idx2].idx)
        } else break
    }
    return columnMoves
}
            
function checkRow(idx1, pieceClicked) {

    let rowMoves = []
    // left check
    for (let i = pieceClicked.idx - board[idx1][0].idx - 1; i >= 0; i--) {
        if (board[idx1][i].occupied === null) {
            rowMoves.push(board[idx1][i].idx)
        }
        else break
    }
    // right check
    for (let i = pieceClicked.idx - board[idx1][0].idx + 1; i <= (board[idx1][9].idx - board[idx1][0].idx); i++) {
        if (board[idx1][i].occupied === null) {
            rowMoves.push(board[idx1][i].idx)
        }
        else break
    }
    return rowMoves
}

// define possible moves for each selected piece
function findPossibleMoves(idx1, idx2) {
    let rowMoves
    let columnMoves
    let diagonalMoves
    let moves
    let fearedAnimalId
    let fearedSqrs
    let results = []
    let selectedPiece = board[idx1][idx2]
    // define possible moves for mice
    if (selectedPiece.piece === 'M') {
        rowMoves = checkRow(idx1, selectedPiece)
        columnMoves = checkColumn(idx1, idx2)
        fearedAnimalId = findFearedAnimals(selectedPiece.piece)
        fearedSqrs = activateFearSqr(fearedAnimalId)
        moves = [...rowMoves, ...columnMoves]
        results = moves.filter(ele => !fearedSqrs.includes(ele))
        results.forEach(element => document.getElementById(element).classList.add('move'))
    }
    // define possible moves for lions
    if (selectedPiece.piece === 'L') {
        moves = checkDiagonals(selectedPiece)
        fearedAnimalId = findFearedAnimals(selectedPiece.piece)
        fearedSqrs = activateFearSqr(fearedAnimalId)
        results = moves.filter(ele => !fearedSqrs.includes(ele))
        results.forEach(element => document.getElementById(element).classList.add('move'))
    }
    // define possible moves for elephants
    if (selectedPiece.piece === 'E') {
        rowMoves = checkRow(idx1, selectedPiece)
        columnMoves = checkColumn(idx1, idx2)
        diagonalMoves = checkDiagonals(selectedPiece)
        fearedAnimalId = findFearedAnimals(selectedPiece.piece)
        fearedSqrs = activateFearSqr(fearedAnimalId)
        moves = [...rowMoves, ...columnMoves, ...diagonalMoves]
        results = moves.filter(ele => !fearedSqrs.includes(ele))
        results.forEach(element => document.getElementById(element).classList.add('move'))
    } 
}

function move(evt, selectedPiece) {
    let destination = convertElId(evt)
    let rowIdx = selectedPiece[1]
    let columnIdx = selectedPiece[2]

    if (evt.target.classList.contains('move')) {
        // for player 1
        if (board[rowIdx][columnIdx].piece === 'E' && turn === 1) {
        evt.target.style.backgroundImage = 'url("img/black/black_elephant.png")'
        selectedPiece[0].style.backgroundImage = ''
        } else if (board[rowIdx][columnIdx].piece === 'L' && turn === 1) {
            evt.target.style.backgroundImage = 'url("img/black/black_lion.png")'
            selectedPiece[0].style.backgroundImage = ''
        } else if (board[rowIdx][columnIdx].piece === 'M' && turn === 1) {
            evt.target.style.backgroundImage = 'url("img/black/black_mouse.png")'
            selectedPiece[0].style.backgroundImage = ''
        }
        // for player 2
        if (board[rowIdx][columnIdx].piece === 'E' &&  turn === -1) {
            evt.target.style.backgroundImage = 'url("img/red/red_elephant.png")'
            selectedPiece[0].style.backgroundImage = ''
            } else if (board[rowIdx][columnIdx].piece === 'L' &&  turn === -1) {
                evt.target.style.backgroundImage = 'url("img/red/red_lion.png")'
                selectedPiece[0].style.backgroundImage = ''
            } else if (board[rowIdx][columnIdx].piece === 'M' &&  turn === -1) {
                evt.target.style.backgroundImage = 'url("img/red/red_mouse.png")'
                selectedPiece[0].style.backgroundImage = ''
            }
            
        removeHighlight()
        changeArrPosition(selectedPiece, destination)
        checkWinner()
        changeTurn()
        checkFear()
        showFear()
    }
}
// show animals in state of fear
function showFear() {
    board.forEach(subArr => subArr.forEach(obj => {
        if (obj.fear) {
            document.getElementById(obj.idx).classList.add('fear')
        } else {
            document.getElementById(obj.idx).classList.remove('fear')
        }
    }))
}
// check if current player's animals have opposing feared animals on adjacent sqrs
function checkFear() {

    let adjacentSqrs = [{x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: -1}, {x: 0, y: 1}, {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}]
    let adjacentX
    let adjacentY
    let miceSqrs = []
    let elephantSqrs = []
    let lionSqrs = []
    
    // find all player's animals and save the idxs in an array
    board.forEach(subArr => subArr.forEach(obj => {
        if (obj.piece === 'M' && obj.player === turn) {
            let MiceObj = {x: board.indexOf(subArr), y: subArr.indexOf(obj)}
            miceSqrs.push(MiceObj)
        }
        if (obj.piece === 'L' && obj.player === turn) {
            let lionObj = {x: board.indexOf(subArr), y: subArr.indexOf(obj)}
            lionSqrs.push(lionObj)
        }
        if (obj.piece === 'E' && obj.player === turn) {
            let elephantObj = {x: board.indexOf(subArr), y: subArr.indexOf(obj)}
            elephantSqrs.push(elephantObj)
        }
    }))
    // reset all feared states to null before checking adjacent sqrs
    for (let i = 0; i < 2; i++) {
        board[miceSqrs[i].x][miceSqrs[i].y].fear = null
        board[lionSqrs[i].x][lionSqrs[i].y].fear = null
        board[elephantSqrs[i].x][elephantSqrs[i].y].fear = null
    }
    
    // loop over mouse positions and check if feared animal can be found on adjacent sqrs
    for (let i = 0; i < 2; i ++) {
        for (let j = 0; j < 8; j++) {
            adjacentX =  miceSqrs[i].x + adjacentSqrs[j].x
            adjacentY = miceSqrs[i].y + adjacentSqrs[j].y

            if (adjacentX > 0 && adjacentY > 0 && adjacentX < 9 && adjacentY < 9) {
                if (board[adjacentX][adjacentY].piece === 'L' && board[adjacentX][adjacentY].player !== turn) {
                    board[miceSqrs[i].x][miceSqrs[i].y].fear = true
                }
                if (board[miceSqrs[i].x][miceSqrs[i].y].fear) break
            }
        }
        // if (!board[miceSqrs[i].x][miceSqrs[i].y].fear) document.getElementById(board[miceSqrs[i].x][miceSqrs[i].y].idx).classList.remove('fear')
    }
    // loop over lion positions and check if feared animal can be found on adjacent sqrs
    for (let i = 0; i < 2; i ++) {
        for (let j = 0; j < 8; j++) {
            adjacentX =  lionSqrs[i].x + adjacentSqrs[j].x
            adjacentY = lionSqrs[i].y + adjacentSqrs[j].y

            if (adjacentX > 0 && adjacentY > 0 && adjacentX < 9 && adjacentY < 9) {
                if (board[adjacentX][adjacentY].piece === 'E' && board[adjacentX][adjacentY].player !== turn) {
                    board[lionSqrs[i].x][lionSqrs[i].y].fear = true  
                }
                if (board[lionSqrs[i].x][lionSqrs[i].y].fear) break
            }
        }
    }
    // loop over elephant positions and check if feared animal can be found on adjacent sqrs
    for (let i = 0; i < 2; i ++) {
        for (let j = 0; j < 8; j++) {
            adjacentX =  elephantSqrs[i].x + adjacentSqrs[j].x
            adjacentY = elephantSqrs[i].y + adjacentSqrs[j].y

            if (adjacentX > 0 && adjacentY > 0 && adjacentX < 9 && adjacentY < 9) {
                if (board[adjacentX][adjacentY].piece === 'M' && board[adjacentX][adjacentY].player !== turn) {
                    board[elephantSqrs[i].x][elephantSqrs[i].y].fear = true  
                }
                if (board[elephantSqrs[i].x][elephantSqrs[i].y].fear) break
            }
        }
    }
}
// change the array position of the animal that was recently moved
function changeArrPosition(selectedPiece, destination) {
    let oldRow = selectedPiece[1]
    let oldColumn =  selectedPiece[2]
    let newRow = destination[0]
    let newColumn = destination[1]

    let oldObj = board[oldRow][oldColumn]
    let newObj = board[newRow][newColumn]

    Object.keys(oldObj).forEach(function(key) {
        if(key !== 'idx') newObj[key] = oldObj[key]
        if (key === 'fear') {
            document.getElementById(oldObj.idx).classList.remove('fear')
            newObj.fear = null
        }
    })
    Object.assign(oldObj, {player: null, piece: null, occupied: null, fear: null})
    
}

// function finds index of feared animals for selected piece
function findFearedAnimals(piece) {
    // create variable that will hold idxs of feared animal
    let fearedAnimals = []
    // check idx of feared animal from opposite player
    if (piece === 'M') {
        board.forEach(subArr => subArr.forEach(obj => {
           if (obj.piece === 'L' && obj.player !==  turn) {
               fearedAnimals.push(obj.idx)
           }
        }))
    } else if (piece === 'L') {
        board.forEach(subArr => subArr.forEach(obj => {
            if (obj.piece === 'E' && obj.player !==  turn) {
             fearedAnimals.push(obj.idx)
            }
         }))
    } else {
        board.forEach(subArr => subArr.forEach(obj => {
            if (obj.piece === 'M' && obj.player !==  turn) {
             fearedAnimals.push(obj.idx)
            }
         }))
    }
    // return array of feared animals' idxs
    return fearedAnimals
}
// define the adjacent square next to feared animals
// need to apply DRY solution!!
function activateFearSqr(fearedSqr) {
    let fearedSqrs = []
    
    let firstFeared = fearedSqr[0].toString()
    let secondFeared = fearedSqr[1].toString()
    
    // check if this can be done with checkId function
    let rowNum1, columnNum1
    if (parseInt(firstFeared) < 10) {
        rowNum1 = 0
        columnNum1 = parseInt(firstFeared)
    } else {
        rowNum1 = parseInt(firstFeared.charAt(0))
        columnNum1 = parseInt(firstFeared.charAt(1))
    }
    let rowNum2, columnNum2
    if (parseInt(secondFeared) < 10) {
        rowNum2 = 0
        columnNum2 = parseInt(secondFeared)
    } else {
        rowNum2 = parseInt(secondFeared.charAt(0))
        columnNum2 = parseInt(secondFeared.charAt(1))
    }
    // first feared animal
    // add row above visually
    if (board[rowNum1 - 1] >= board[0]) {
        if (board[rowNum1 - 1][columnNum1 - 1] >= board[rowNum1 - 1][0]) {
            fearedSqrs.push(board[rowNum1 - 1][columnNum1 - 1].idx)
        }
        if (board[rowNum1 - 1][columnNum1 + 1] <= board[rowNum1 - 1][9]) {
            fearedSqrs.push(board[rowNum1 - 1][columnNum1 + 1].idx)
        }
        fearedSqrs.push(board[rowNum1 - 1][columnNum1].idx)
    }
    // add row below visually
    if (board[rowNum1 + 1] <= board[9]) {
        if (board[rowNum1 + 1][columnNum1 - 1] >= board[rowNum1 + 1][0]) {
            fearedSqrs.push(board[rowNum1 + 1][columnNum1 - 1].idx)
        }
        if (board[rowNum1 + 1][columnNum1 + 1] <= board[rowNum1 + 1][9]) {
            fearedSqrs.push(board[rowNum1 + 1][columnNum1 + 1].idx)
        } 
        fearedSqrs.push(board[rowNum1 + 1][columnNum1].idx)
        
    }
    // add middle row
    if (board[rowNum1][columnNum1 + 1] <= board[rowNum1][9]) {
            fearedSqrs.push(board[rowNum1][columnNum1 + 1].idx)
    }
    if (board[rowNum1][columnNum1 - 1] >= board[rowNum1][0]) {
            fearedSqrs.push(board[rowNum1][columnNum1 - 1].idx) 
    }
    // second feared animal
    // add row above visually
    if (board[rowNum2 - 1] >= board[0]) {
        if (board[rowNum2 - 1][columnNum2 - 1] >= board[rowNum2 - 1][0]) {
            fearedSqrs.push(board[rowNum2 - 1][columnNum2 - 1].idx)
        }
        if (board[rowNum2 - 1][columnNum2 + 1] <= board[rowNum2 - 1][9]) {
            fearedSqrs.push(board[rowNum2 - 1][columnNum2 + 1].idx)
        } 
        fearedSqrs.push(board[rowNum2 - 1][columnNum2].idx)
        
    }
    // add row below visually
    if (board[rowNum2 + 1] <= board[9]) {
        if (board[rowNum2 + 1][columnNum2 - 1] >= board[rowNum2 + 1][0]) {
            fearedSqrs.push(board[rowNum2 + 1][columnNum2 - 1].idx)
        }
        if (board[rowNum2 + 1][columnNum2 + 1] <= board[rowNum2 + 1][9]) {
            fearedSqrs.push(board[rowNum2 + 1][columnNum2 + 1].idx)
        }
        fearedSqrs.push(board[rowNum2 + 1][columnNum2].idx)
        
    }
    // add middle row
    if (board[rowNum2][columnNum2 + 1] <= board[rowNum2][9]) {
            fearedSqrs.push(board[rowNum2][columnNum2 + 1].idx)
    }
    if (board[rowNum2][columnNum2 - 1] >= board[rowNum2][0]) {
            fearedSqrs.push(board[rowNum2][columnNum2 - 1].idx) 
    }

    // return array of feared squares
    return fearedSqrs  
}

function clearBoard() {
    let squareEls = document.querySelectorAll('.square')
    squareEls.forEach(square => {
        square.style.backgroundImage = ''
        square.classList.remove('fear')
    })
    removeHighlight() 
}

function resetName() {
    if (playerOneEl.innerText === 'WINNER!') playerOneEl.innerText = 'player one'
    if (playerTwoEl.innerText === 'WINNER!') playerTwoEl.innerText = 'player two'
}