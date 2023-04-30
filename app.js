const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = 'black';
let currentColor = DEFAULT_COLOR;

const grid = document.getElementById('grid');
const selectedColor = document.getElementById('color');


selectedColor.oninput = (e) => {
    currentColor = e.target.value;
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE)
}

function clearGrid(){
    grid.innerHTML = '';
}

function setupGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size*size; i++){
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        grid.appendChild(gridElement);
        gridElement.addEventListener('mousedown', changeColor);
    }
}

function changeColor(e){
    e.target.style.backgroundColor = currentColor;
}