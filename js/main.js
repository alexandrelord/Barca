/*----- constants -----*/

/*----- app's state (variables) -----*/
let board = [
    [0, 0, 0, 0, 'E', 'E', 0, 0, 0, 0],
    [0, 0, 0, 'L', 'M', 'M', 'L', 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 'L', 'M', 'M', 'L', 0, 0, 0],
    [0, 0, 0, 0, 'E', 'E', 0, 0, 0, 0],
  ]
/*----- cached element references -----*/
const boardEl = document.querySelector('.board')

/*----- event listeners -----*/
/*----- functions -----*/
function renderBoard() {
    let counter = 0
    // create row elements
    for (let i = 0; i < 10; ++i) {
        let row = document.createElement('div')
        row.classList.add('row')
        // create square elements
        for (let j = 0; j < 10; j++) {
            let square = document.createElement('div')
            square.classList.add('square')
            square.setAttribute('id', counter)
            // for each new row; reverse color scheme
            if (i % 2) {
                if (j % 2) {
                    square.style.backgroundColor = '#f5deb3'
                } else {
                    square.style.backgroundColor = '#d9a420'
                }
            } else {
                if (j % 2) {
                    square.style.backgroundColor = '#d9a420'
                } else {
                    square.style.backgroundColor = '#f5deb3'
                }
            }
            row.appendChild(square)
            counter++
        }
        boardEl.appendChild(row)
    }
    
}

function renderOasis() {
    let oasisEls = [ document.getElementById('33'), document.getElementById('36'), document.getElementById('63'), document.getElementById('66')]
    oasisEls.forEach(oasisEl => oasisEl.style.backgroundColor = '#2387bf')   
}

function renderPieces() {
    let elephantEl = document.getElementById('4')
    
}

renderBoard()
renderOasis()