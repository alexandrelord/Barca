/*----- constants -----*/
const player1 = 1
const player2 = -1

/*----- app's state (variables) -----*/
let board
let turn = 1
let currentPossibleMoves = []
/*----- cached element references -----*/
const boardEl = document.querySelector('.board')

/*----- event listeners -----*/

boardEl.addEventListener('click', function(evt) {
    let squareId = evt.target.id
    let idx1, idx2
    if (parseInt(squareId) < 10) {
        idx1 = 0
        idx2 = parseInt(squareId)
    } else {
        idx1 = parseInt(squareId.charAt(0))
        idx2 = parseInt(squareId.charAt(1))
    }
    //changeIdx(evt)
    removeHighlight()
    addHighlight(idx1, idx2, evt, turn)
    currentPossibleMoves = possibleMoves(idx1, idx2)

    // currentPossibleMoves.forEach(element =>
    //     element.addEventListener('click', function() {
    //         console.log('dude')
    //     }))
    
    // addEventListener('click', function(evt) {
    //     let squareId = evt.target.id
    //     let idx1, idx2
    // if (parseInt(squareId) < 10) {
    //     idx1 = 0
    //     idx2 = parseInt(squareId)
    // } else {
    //     idx1 = parseInt(squareId.charAt(0))
    //     idx2 = parseInt(squareId.charAt(1))
    // }
    // let squareClicked = board[idx1][idx2]
    //     squareClicked.style.backgroundImage = 'url("img/black/RATON.png")'

    // }))
})

// function changeIdx(evt) {
//     let squareId = evt.target.id
// }

function possibleMoves(idx1, idx2) {
    let rowMoves
    let columnMoves
    let diagonalMoves
    let moves
    // if mouse - moves are up/down || left/right
    let pieceClicked = board[idx1][idx2]
    if (pieceClicked.piece === 'M' && pieceClicked.player === turn) {
        rowMoves = checkRow(idx1, pieceClicked)
        columnMoves = checkColumn(idx1, idx2)

        moves = [...rowMoves, ...columnMoves]
        return moves
    }
    if (pieceClicked.piece === 'L' && pieceClicked.player === turn) {
        diagonalMoves = checkDiagonals(pieceClicked)
        return diagonalMoves
    }
    if (pieceClicked.piece === 'E' && pieceClicked.player === turn) {
        rowMoves = checkRow(idx1, pieceClicked)
        columnMoves = checkColumn(idx1, idx2)
        diagonalMoves = checkDiagonals(pieceClicked)
        moves = [...rowMoves, ...columnMoves, ...diagonalMoves]
        return moves
    }
    
}

function checkDiagonals(pieceClicked) {
    let diagonalMoves = []
    let row, column, strIdx
    console.log(pieceClicked.idx)

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

    diagonalMoves.forEach(element => document.getElementById(element).classList.add('move'))
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
    // connect possible column moves to piece
    columnMoves.forEach(element => document.getElementById(element).classList.add('move'))
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

    // connect possible row moves to piece
    rowMoves.forEach(element => document.getElementById(element).classList.add('move'))
    return rowMoves
}


/*----- functions -----*/
initialize()

function initialize() {
    createBoardArray()
    setUpPieces()
    renderBoard()
    renderOasis()
    renderPieces()
}
// find elegant method to create a multi-dimensional array
function createBoardArray() {
    board = [
      [{ player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }],
      [{ player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }],
      [{ player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }],
      [{ player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }],
      [{ player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }],
      [{ player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }],
      [{ player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }],
      [{ player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }],
      [{ player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }],
      [{ player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }, { player: null, piece: null, predator: null, pray: null, occupied: null }]
    ]
    let count = 0
    board.forEach(subArr => subArr.forEach(square => {
        square.idx = count
        count++  
    }))
  }

function setUpPieces() {
    // copies properties from source object to target object => Object.assign(target, source)
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

function renderBoard() {
    let counter = 0
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
        document.querySelector('.board').appendChild(row)
    }
    
}

function renderOasis() {
    let oasisEls = [ document.getElementById('33'), document.getElementById('36'), document.getElementById('63'), document.getElementById('66')]
    oasisEls.forEach(oasisEl => {
        oasisEl.style.backgroundColor = '#2387bf'
    })   
}

function renderPieces() {
    // render pieces and add them to starting squares
    let blkElephantEls = [document.getElementById('4'), document.getElementById('5')]
    blkElephantEls.forEach(ele => ele.style.backgroundImage = 'url("img/black/ELEFANTE.png")')
    let blkLionEls = [document.getElementById('13'), document.getElementById('16')]
    blkLionEls.forEach(ele => ele.style.backgroundImage = 'url("img/black/LEON.png")')
    let blkMouseEls = [document.getElementById('14'), document.getElementById('15')]
    blkMouseEls.forEach(ele => ele.style.backgroundImage = 'url("img/black/RATON.png")')
    
    let startWhiteEles = [document.getElementById('94'), document.getElementById('95')]
    startWhiteEles.forEach(ele => ele.style.backgroundImage = 'url("img/white/ELEFANTE_BLANCO.png")')
    let startWhiteLions = [document.getElementById('83'), document.getElementById('86')]
    startWhiteLions.forEach(ele => ele.style.backgroundImage = 'url("img/white/LEON_BLANCO.png")')
    let startWhiteMice = [document.getElementById('84'), document.getElementById('85')]
    startWhiteMice.forEach(ele => ele.style.backgroundImage = 'url("img/white/RATON_BLANCO.png")')    
}

function removeHighlight() {
    const highlightPiece = document.querySelector('.highlight')
    const highLightMoves = document.querySelectorAll('.move')
    // remove highlight from selected piece before highlighting another
    if (highlightPiece) highlightPiece.classList.remove('highlight')
    // remove highlight from possible squares selected piece can move to
    if (highLightMoves) highLightMoves.forEach(squareEl => squareEl.classList.remove('move'))
    
}

function addHighlight(idx1, idx2, evt, turn) {
    let arrObj = board[idx1][idx2]
    if (arrObj.piece && arrObj.player === turn) {
        document.getElementById(evt.target.id).classList.add('highlight')
    }
}