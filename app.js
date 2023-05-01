const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = 'black';

let currentColor = DEFAULT_COLOR;
let currentValue = DEFAULT_SIZE;

const grid = document.getElementById('grid');
const selectedColor = document.getElementById('color');
const sizeSlider = document.getElementById('sizeSlider');
const currentSize = document.getElementById('currentSize');
const clearButton = document.getElementById('clear');
const eraserButton = document.getElementById('eraser');
const rainbowButton = document.getElementById('rainbow');
const gridButton = document.getElementById('gridButton');

let eraserEnabled = false;
let rainbowEnabled = false;
let gridEnabled = false;
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

selectedColor.oninput = (e) => {
    setCurrentColor(e.target.value);
}

sizeSlider.onmousemove = (e) => {
    updateSizeValue(e.target.value);
}

sizeSlider.onchange = (e) => {
    changeSize(e.target.value);
}

clearButton.onclick = () => {
    clearGrid();
    setupGrid(currentValue);
}

eraserButton.onclick = () => {
    if (!eraserEnabled) {
        setCurrentColor('white');
        enableButton(eraserButton);
        eraserEnabled = true;
        rainbowButton.style = '';
        rainbowEnabled = false;
    } else {
        setCurrentColor(selectedColor.value);
        eraserButton.style = '';
        eraserEnabled = false;
    }
}

gridButton.onclick = () => {
    const gridElements = document.querySelectorAll('.grid-element');
    if (!gridEnabled) {
        gridEnabled = true;
        enableButton(gridButton);
        gridElements.forEach((element) => {
            element.style.border = '1px solid black';
        })
    } else {
        disableButton(gridButton);
        gridEnabled = false;
        gridElements.forEach((element) => {
            element.style.border = '';
        })
    }
}

rainbowButton.onclick = () => {
    if (!rainbowEnabled) {
        rainbowEnabled = true;
        eraserButton.style = '';
        eraserEnabled = false;
        enableButton(rainbowButton);
    } else {
        setCurrentColor(selectedColor.value);
        rainbowEnabled = false;
        rainbowButton.style = '';
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE)
}

function clearGrid() {
    grid.innerHTML = '';
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        grid.appendChild(gridElement);
        gridElement.addEventListener('mousedown', changeColor);
        gridElement.addEventListener('mouseover', changeColor)
    }
    if(gridEnabled) {
        const gridElements = document.querySelectorAll('.grid-element');
        gridElements.forEach((element) => {
            element.style.border = '1px solid black';
        })
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (rainbowEnabled && !eraserEnabled) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        e.target.style.backgroundColor = `#${randomColor}`;
        return;
    }
    e.target.style.backgroundColor = currentColor;
}

function setCurrentColor(newColor) {
    currentColor = newColor
}

function changeSize(size) {
    clearGrid();
    updateSizeValue(size);
    setupGrid(size);
}

function updateSizeValue(size) {
    currentSize.innerText = `${size} x ${size}`;
}

function enableButton(button) {
    button.size = 1.5;
    button.style.border = '1px solid black';
    button.style.borderRadius = '5px';
    button.style.boxShadow = '0px 0px 5px black';
    button.style.backgroundColor = 'lightblue';
}

function disableButton(button) {
    button.style = '';
}
