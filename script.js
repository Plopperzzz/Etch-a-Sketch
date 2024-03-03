let numCells = 100;
const grid = document.querySelector('#gridContainer');
let cellWidth = 1 / numCells;//Math.floor(grid.clientWidth/numCells);

function cellHover(e){
    e.target.style.backgroundColor = 'black';
}

function buildGrid(numCells, cellWidth, element){
    for(let i = 0; i < numCells * (numCells); ++i)
    {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.style.width = `${cellWidth * 100}%`;
        div.style.height = `${cellWidth * 100}%`;

        div.addEventListener('mouseover', cellHover);

        element.appendChild(div);


    }
}

buildGrid(numCells, cellWidth, grid);
