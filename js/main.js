/*----- constants -----*/

/*----- app's state (variables) -----*/
let board = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]
/*----- cached element references -----*/
const boardEl = document.querySelector('.board')

/*----- event listeners -----*/
/*----- functions -----*/
function renderBoard() {
    for (let i = 0; i < 10; ++i) {
        let row = document.createElement('div')
        row.classList.add('row')
        
        // if (i % 2) {
        //     row.style.flexDirection = ''
        // } else {
        //     row.style.flexDirection = 'row-reverse'
        // }

        for (let j = 0; j < 10; j++) {
            let square = document.createElement('div')
            square.classList.add('square')
            square.setAttribute('id', j)
            // for each different row
            // change initial square color
            if (i % 2) {
                if (j % 2) {
                    square.style.backgroundColor = 'pink'
                } else {
                    square.style.backgroundColor = 'green'
                }
            } else {
                if (j % 2) {
                    square.style.backgroundColor = 'green'
                } else {
                    square.style.backgroundColor = 'pink'
                }
            }
            row.appendChild(square)
        }
        boardEl.appendChild(row)
    }
    
}

renderBoard()