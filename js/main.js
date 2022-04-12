/*----- constants -----*/
const player1 = 1
const player2 = -1

/*----- app's state (variables) -----*/
let board
let turn = 1
let squareIdEl
let selectedPiece
let fearedAnimals = []

/*----- cached element references -----*/
const boardEl = document.querySelector('.board')

/*----- event listeners -----*/
boardEl.addEventListener('click', handleClick)



function move(evt, selectedPiece) {
    let destination = convertElId(evt)
    
    let x = selectedPiece[1]
    let y = selectedPiece[2]

    if (evt.target.classList.contains('move')) {
        // for player 1
        if (board[x][y].piece === 'E' && turn === 1) {
        evt.target.style.backgroundImage = 'url("img/black/ELEFANTE.png")'
        selectedPiece[0].style.backgroundImage = ''
        } else if (board[x][y].piece === 'L' && turn === 1) {
            evt.target.style.backgroundImage = 'url("img/black/LEON.png")'
            selectedPiece[0].style.backgroundImage = ''
        } else if (board[x][y].piece === 'M' && turn === 1) {
            evt.target.style.backgroundImage = 'url("img/black/RATON.png")'
            selectedPiece[0].style.backgroundImage = ''
        }
        // for player 2
        if (board[x][y].piece === 'E' &&  turn === -1) {
            evt.target.style.backgroundImage = 'url("img/white/ELEFANTE_BLANCO.png")'
            selectedPiece[0].style.backgroundImage = ''
            } else if (board[x][y].piece === 'L' &&  turn === -1) {
                evt.target.style.backgroundImage = 'url("img/white/LEON_BLANCO.png")'
                selectedPiece[0].style.backgroundImage = ''
            } else if (board[x][y].piece === 'M' &&  turn === -1) {
                evt.target.style.backgroundImage = 'url("img/white/RATON_BLANCO.png")'
                selectedPiece[0].style.backgroundImage = ''
            }
            
        removeHighlight()
        changeArrPosition(selectedPiece, destination)
        // instigate feared state to nearby animal
        addFear(destination)
        checkWinner()
        changeTurn()
        // check feared
        //fearedAnimals = checkFear()
    }
}
// check fear property
function checkFear() {
    let afraidAnimals = []
    board.forEach(subArr => subArr.forEach(obj => {
        if (obj.fear === true) {
            afraidAnimals.push(obj.idx)
        }
    }))
    
    return afraidAnimals
}


// add fear property to animal
function addFear(destination) {
    let row = destination[0]
    let column = destination[1]
    let piece = board[row][column].piece
    // check for animals that fear the moved piece
    // next to adjacent destination squares
    // add row above
    if (piece === 'M') {
        // if row exist
        if (board[row - 1] >= board[0]) {
            //and square is not out of bounds
            if (board[row - 1][column - 1] >= board[row - 1][0]) {
                if (board[row - 1][column - 1].piece === 'E' && board[row - 1][column - 1].player !== turn) {
                    board[row - 1][column - 1].fear = true
                }
            }
            if (board[row - 1][column + 1] <= board[row - 1][9]) {
                if (board[row - 1][column + 1].piece === 'E' && board[row - 1][column + 1].player !== turn) {
                    board[row - 1][column + 1].fear = true
                }
            }
            if (board[row - 1][column].piece === 'E' && board[row - 1][column].player !== turn) {
                board[row - 1][column].fear = true
            }
        }
        // add row below
        if (board[row + 1] <= board[9]) {
            if (board[row + 1][column - 1] >= board[row + 1][0]) {
                if (board[row + 1][column - 1].piece === 'E' && board[row + 1][column - 1].player !== turn) {
                    board[row + 1][column - 1].fear = true
                }
            }
            if (board[row + 1][column + 1] <= board[row + 1][9]) {
                if (board[row + 1][column + 1].piece === 'E' && board[row + 1][column + 1].player !== turn) {
                    board[row + 1][column + 1].fear = true
                }
            }
            if (board[row + 1][column].piece === 'E' && board[row + 1][column].player !== turn) {
                board[row + 1][column].fear = true
            }
        }
        if (board[row][column + 1] <= board[row][9]) {
            if (board[row][column + 1].piece === 'E' && board[row][column + 1].player !== turn) {
                board[row][column + 1].fear = true
            }
        }
        if (board[row][column - 1] >= board[row][0]) {
            if (board[row][column - 1].piece === 'E' && board[row][column - 1].player !== turn) {
                board[row][column - 1].fear = true
            }
        }
    } 
    if (piece === 'L') {
        // if row exist
        if (board[row - 1] >= board[0]) {
            //and square is not out of bounds
            if (board[row - 1][column - 1] >= board[row - 1][0]) {
                if (board[row - 1][column - 1].piece === 'M' && board[row - 1][column - 1].player !== turn) {
                    board[row - 1][column - 1].fear = true
                }
            }
            if (board[row - 1][column + 1] <= board[row - 1][9]) {
                if (board[row - 1][column + 1].piece === 'M' && board[row - 1][column + 1].player !== turn) {
                    board[row - 1][column + 1].fear = true
                }
            }
            if (board[row - 1][column].piece === 'M' && board[row - 1][column].player !== turn) {
                board[row - 1][column].fear = true
            }
        }
        // add row below
        if (board[row + 1] <= board[9]) {
            if (board[row + 1][column - 1] >= board[row + 1][0]) {
                if (board[row + 1][column - 1].piece === 'M' && board[row + 1][column - 1].player !== turn) {
                    board[row + 1][column - 1].fear = true
                }
            }
            if (board[row + 1][column + 1] <= board[row + 1][9]) {
                if (board[row + 1][column + 1].piece === 'M' && board[row + 1][column + 1].player !== turn) {
                    board[row + 1][column + 1].fear = true
                }
            }
            if (board[row + 1][column].piece === 'M' && board[row + 1][column].player !== turn) {
                board[row + 1][column].fear = true
            }
        }
        if (board[row][column + 1] <= board[row][9]) {
            if (board[row][column + 1].piece === 'M' && board[row][column + 1].player !== turn) {
                board[row][column + 1].fear = true
            }
        }
        if (board[row][column - 1] >= board[row][0]) {
            if (board[row][column - 1].piece === 'M' && board[row][column - 1].player !== turn) {
                board[row][column - 1].fear = true
            }
        }
    } if (piece === 'E') {
        // if row exist
        if (board[row - 1] >= board[0]) {
            //and square is not out of bounds
            if (board[row - 1][column - 1] >= board[row - 1][0]) {
                if (board[row - 1][column - 1].piece === 'L' && board[row - 1][column - 1].player !== turn) {
                    board[row - 1][column - 1].fear = true
                }
            }
            if (board[row - 1][column + 1] <= board[row - 1][9]) {
                if (board[row - 1][column + 1].piece === 'L' && board[row - 1][column + 1].player !== turn) {
                    board[row - 1][column + 1].fear = true
                }
            }
            if (board[row - 1][column].piece === 'L' && board[row - 1][column].player !== turn) {
                board[row - 1][column].fear = true
            }
        }
        // add row below
        if (board[row + 1] <= board[9]) {
            if (board[row + 1][column - 1] >= board[row + 1][0]) {
                if (board[row + 1][column - 1].piece === 'L' && board[row + 1][column - 1].player !== turn) {
                    board[row + 1][column - 1].fear = true
                }
            }
            if (board[row + 1][column + 1] <= board[row + 1][9]) {
                if (board[row + 1][column + 1].piece === 'L' && board[row + 1][column + 1].player !== turn) {
                    board[row + 1][column + 1].fear = true
                }
            }
            if (board[row + 1][column].piece === 'L' && board[row + 1][column].player !== turn) {
                board[row + 1][column].fear = true
            }
        }
        if (board[row][column + 1] <= board[row][9]) {
            if (board[row][column + 1].piece === 'L' && board[row][column + 1].player !== turn) {
                board[row][column + 1].fear = true
            }
        }
        if (board[row][column - 1] >= board[row][0]) {
            if (board[row][column - 1].piece === 'L' && board[row][column - 1].player !== turn) {
                board[row][column - 1].fear = true
            }
        }
    } 
}



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

/*----- functions -----*/
initialize()
// call functions to initialize game
function initialize() {
    createBoardArray()
    defineAnimalObjs()
    renderBoard()
    renderOasis()
    renderPieces()
}
// create and define board array
function createBoardArray() {
    // create an array with 10 nested arrays
    board = [[], [], [], [], [], [], [], [], [], []]
    // add 10 objects per subarray
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
// render oasis on DOM board
function renderOasis() {
    let oasisEls = [ document.getElementById('33'), document.getElementById('36'), document.getElementById('63'), document.getElementById('66')]
    oasisEls.forEach(oasisEl => {
        oasisEl.style.backgroundColor = '#2387bf'
    })   
}
// render pieces on starting squares
function renderPieces() {
    // player 1
    let blkElephantEls = [document.getElementById('4'), document.getElementById('5')]
    blkElephantEls.forEach(ele => ele.style.backgroundImage = 'url("img/black/ELEFANTE.png")')
    let blkLionEls = [document.getElementById('13'), document.getElementById('16')]
    blkLionEls.forEach(ele => ele.style.backgroundImage = 'url("img/black/LEON.png")')
    let blkMouseEls = [document.getElementById('14'), document.getElementById('15')]
    blkMouseEls.forEach(ele => ele.style.backgroundImage = 'url("img/black/RATON.png")')
    // player 2
    let startWhiteEles = [document.getElementById('94'), document.getElementById('95')]
    startWhiteEles.forEach(ele => ele.style.backgroundImage = 'url("img/white/ELEFANTE_BLANCO.png")')
    let startWhiteLions = [document.getElementById('83'), document.getElementById('86')]
    startWhiteLions.forEach(ele => ele.style.backgroundImage = 'url("img/white/LEON_BLANCO.png")')
    let startWhiteMice = [document.getElementById('84'), document.getElementById('85')]
    startWhiteMice.forEach(ele => ele.style.backgroundImage = 'url("img/white/RATON_BLANCO.png")')    
}
// remove highlight from piece and possible moves
function removeHighlight() {
    const highlightPiece = document.querySelector('.highlight')
    const highLightMoves = document.querySelectorAll('.move')
    // remove highlight from selected piece before highlighting another
    if (highlightPiece) highlightPiece.classList.remove('highlight')
    // remove highlight from animals possible moves
    if (highLightMoves) highLightMoves.forEach(squareEl => squareEl.classList.remove('move'))
}
// handle clicked pieces and destination squares
function handleClick(evt) {
   
    // convert square id element into array of numbers
    squareIdEl = convertElId(evt)
    let rowIdx = squareIdEl[0]
    let columnIdx = squareIdEl[1]
    // check if any animals are in a state of fear
    fearedAnimals = checkFear()

    if (fearedAnimals.length > 0) {
        // limit selected pieces to afraid ones
        fearedAnimals.forEach(animal => {
            document.getElementById(animal).classList.add('fear')
        })
    }
    // check to see if clicked square has a selected player piece
    if (board[rowIdx][columnIdx].occupied && board[rowIdx][columnIdx].player === turn) {
        selectedPiece = [evt.target, rowIdx, columnIdx]
        removeHighlight()
        addHighlight(selectedPiece)
        possibleMoves(rowIdx, columnIdx)
    }
    // call move function if piece was selected
    if (selectedPiece[0] !== evt.target) {
        move(evt, selectedPiece)
    } 
    
}
// highlight piece if clicked
function addHighlight(selectedPiece) {
    let row = selectedPiece[1]
    let column = selectedPiece[2]
    let arrObj = board[row][column]
    if (arrObj.piece && arrObj.player === turn) {
        document.getElementById(selectedPiece[0].id).classList.add('highlight')
    }
}
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
    if (result === true) turn === 1 ? console.log('Player 1 wins!!') : console.log('Player 2 wins!!')  
}
// switch players when turn ends
function changeTurn() {
    turn === 1 ? turn = -1 : turn = 1
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

    // diagonalMoves.forEach(element => document.getElementById(element).classList.add('move'))
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
    // columnMoves.forEach(element => document.getElementById(element).classList.add('move'))
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
    // rowMoves.forEach(element => document.getElementById(element).classList.add('move'))
    return rowMoves
}

// define possible moves for each selected piece
function possibleMoves(idx1, idx2) {
    let rowMoves
    let columnMoves
    let diagonalMoves
    let moves
    let fearedAnimalId
    let fearedSqrs
    let results = []
    let selectedPiece = board[idx1][idx2]
    // check to see if a players piece is afraid
    // define possible moves for mice
    if (selectedPiece.piece === 'M' && selectedPiece.player === turn) {
        rowMoves = checkRow(idx1, selectedPiece)
        columnMoves = checkColumn(idx1, idx2)
        fearedAnimalId = findFearedAnimals(selectedPiece.piece)
        fearedSqrs = activateFearSqr(fearedAnimalId)
        moves = [...rowMoves, ...columnMoves]
        results = moves.filter(ele => !fearedSqrs.includes(ele))
        results.forEach(element => document.getElementById(element).classList.add('move'))
    }
    // define possible moves for lions
    if (selectedPiece.piece === 'L' && selectedPiece.player === turn) {
        moves = checkDiagonals(selectedPiece)
        fearedAnimalId = findFearedAnimals(selectedPiece.piece)
        fearedSqrs = activateFearSqr(fearedAnimalId)
        results = moves.filter(ele => !fearedSqrs.includes(ele))
        results.forEach(element => document.getElementById(element).classList.add('move'))
    }
    // define possible moves for elephants
    if (selectedPiece.piece === 'E' && selectedPiece.player === turn) {
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