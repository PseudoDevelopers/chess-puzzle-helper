const SET_ALL_ONE_BTN = document.getElementById('set-all-one-btn')
const SET_ALL_ZERO_BTN = document.getElementById('set-all-zero-btn')
const SET_RANDOM_BTN = document.getElementById('set-random-btn')

const CELLS = document.querySelectorAll('.cell')

let previousFlippedCell = null

// Setting value function
function flipCell(cell) {
    const value = getValue(cell)

    if (previousFlippedCell !== cell) {
        if (previousKeyContainingCell && previousFlippedCell) {
            // Flipping previous flipped Cell
            const previousCellValue = getValue(previousFlippedCell)

            if (previousCellValue === 1) setZero(previousFlippedCell)
            else/**********************/ setOne(previousFlippedCell)

            unflippedAsHint(previousFlippedCell)
        }

        if (previousKeyContainingCell) {
            previousFlippedCell = cell
            flippedAsHint(cell)
        }
    }
    else {
        previousFlippedCell = null
        unflippedAsHint(cell)
    }

    // Flipping current clicked Cell
    if (value === 1) setZero(cell)
    else/**********/ setOne(cell)
}

function setAllOne() {
    CELLS.forEach(setOne)
}

function setAllZero() {
    CELLS.forEach(setZero)
}

function setRandom() {
    for (i = 0; i < 10; i++) {
        setTimeout(() => {
            CELLS.forEach(cell => {
                if (Math.random() > 0.4) setOne(cell)
                else/******************/ setZero(cell)
            })
        }, i * 20)
    }
}


// ------------------------------------------------------------------------------------

const setOne/****/ = cell => cell.setAttribute('data-value', '1')
const setZero/***/ = cell => cell.setAttribute('data-value', '0')
const getValue/**/ = cell => parseInt(cell.getAttribute('data-value'))

function flippedAsHint(cell) {
    if (cell === previousKeyContainingCell) cell.setAttribute('title', 'Contain Key & also Flipped')
    else/*********************************/ cell.setAttribute('title', 'Flipped')

    cell.setAttribute('data-flipped-as-hint', '')
}
function unflippedAsHint(cell) {
    if (cell === previousKeyContainingCell) cell.setAttribute('title', 'Contain Key')
    else/*********************************/ cell.setAttribute('title', '')

    cell.removeAttribute('data-flipped-as-hint')
}





// ------------------------------------------------------------------------------------
// KEY functions

let previousKeyContainingCell = null

function setKey(cell) {
    if (previousKeyContainingCell)
        UNSET_KEY(previousKeyContainingCell)

    if (cell === previousKeyContainingCell) {
        UNSET_KEY(cell)
        previousKeyContainingCell = null

        if (previousFlippedCell) {    // Here we also have to remove flipped properties
            unflippedAsHint(previousFlippedCell)
            previousFlippedCell = null
        }

        SET_ALL_ONE_BTN.disabled = SET_ALL_ZERO_BTN.disabled = SET_RANDOM_BTN.disabled = false
    } else {
        SET_KEY(cell)
        previousKeyContainingCell = cell
        SET_ALL_ONE_BTN.disabled = SET_ALL_ZERO_BTN.disabled = SET_RANDOM_BTN.disabled = true
    }
}


// ----------------------------------------------

function SET_KEY(cell) {
    if (cell === previousFlippedCell) cell.setAttribute('title', 'Contain Key & also Flipped')
    else/***************************/ cell.setAttribute('title', 'Contain Key')

    cell.setAttribute('data-contain-key', '')
}
function UNSET_KEY(cell) {
    if (cell === previousFlippedCell) cell.setAttribute('title', 'Flipped')
    else/***************************/ cell.setAttribute('title', '')

    cell.removeAttribute('data-contain-key')
}
