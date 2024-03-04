let numCells = 10;
let cellWidth = 1 / numCells;
let colorState = false;
let shadeState = true;
let colorPicker = document.querySelector('#colorPicker');
        colorPicker.value = '#f23121';
let initColor = colorPicker.value;
let increment = [];

colorPicker.addEventListener('change', e => {
    initColor = e.target.value;
});

const grid = document.querySelector('#gridContainer');

// Button to control number of cells
const cellsBtn = document.querySelector('#cellsBtn');
cellsBtn.addEventListener('click', e => {
    const input = prompt("Type number of cells");
    if (input === null) {
        return;
    }
    if(parseInt(input) > 100)
    {
        alert("Please pick a smaller number");
        return;
    }
    const grid = document.querySelector('.grid-container');

    grid.remove();
    const newGrid = document.createElement('div');
    newGrid.classList.add('grid-container');

    console.log(input.value);
    buildGrid(parseInt(input), 1 / parseInt(input), newGrid);
    document.body.appendChild(newGrid);
})

// setup color button
const colorBtn = document.querySelector('#colorBtn');
colorBtn.addEventListener('click', () => {
    colorState = !colorState;
    shadeState = false;
    if (colorState) {
        colorBtn.style.backgroundColor = 'red';
    }
    else {
        colorBtn.style.backgroundColor = 'white';
    }
    document.querySelector('#shadeBtn').backgroundColor = 'white';
});


// setup shaded button
const shadedBtn = document.querySelector('#shadedBtn');
shadedBtn.addEventListener('click', () => {

    shadeState = !shadeState;
    colorState = false;
    document.querySelector('#colorBtn').style.backgroundColor = 'white';
});

// Takes hex value 
function HexToRGB(rgb) {
    return [parseInt(rgb.slice(1, 3), 16), parseInt(rgb.slice(3, 5), 16), parseInt(rgb.slice(5, 7), 16)];
}

// takes hex values
function getIncrement(startColor, endColor, iterations) {
    if(startColor === '#000')
    {
        startColor = '#000000';
    }
    if(endColor === '#000')
    {
        endColor = '#000000';
    }

    console.log('start: ' + startColor);
    console.log('end: ' + endColor);
    const rgbStart = HexToRGB(startColor);
    const rgbEnd = HexToRGB(endColor);
    const incFun = (x,y,z) => {return (y - x)/z};

    const retArray = [incFun(rgbStart[0], rgbEnd[0], iterations), incFun(rgbStart[1], rgbEnd[1], iterations), incFun(rgbStart[2], rgbEnd[2], iterations)];

    return retArray;
}

// Updates div color depending on selected options
function cellHover(e) {
    let color;

    if (shadeState) {

        // get current div background color and convert to hex
        const computedStyle = getComputedStyle(e.target);
        color = computedStyle.getPropertyValue('background-color');
        const rgbValues = color.match(/\d+/g);
        const hexColor = '#'+parseInt(rgbValues[0]).toString(16) + parseInt(rgbValues[1]).toString(16)+parseInt(rgbValues[2]).toString(16);

        // get color picker color
        const colorPicker = document.querySelector('#colorPicker').value;
        const incArray = getIncrement(hexColor, colorPicker, 10);


        // increment the current divs background color
        const red = Math.floor(parseInt(rgbValues[0]) + incArray[0]);
        const green = Math.floor(parseInt(rgbValues[1]) + incArray[1]);
        const blue = Math.floor(parseInt(rgbValues[2]) + incArray[2]);

        // convert back to RGB
        color = `rgb(${red}, ${green}, ${blue})`;
    }
    else if (colorState) {

        // rainbow (random colors)
        color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;

    }
    else {

        // just the selected color
        color = initColor;

    }

    e.target.style.backgroundColor = color;
}

function buildGrid(numCells, cellWidth, element) {
    const clearBtn = document.querySelector('#clearBtn');

    // creating each div inside the parent "grid" div
    // based on the percentage needed to fit x divs
    for (let i = 0; i < numCells * (numCells); ++i) {

        // clear button
        const div = document.createElement('div');

        div.classList.add('cell');
        div.style.width = `${cellWidth * 100}%`;
        div.style.height = `${cellWidth * 100}%`;

        // Add events to div to change color
        div.addEventListener('mouseover', cellHover);
        clearBtn.addEventListener('click', () => {
            div.style.backgroundColor = 'white';
        })
        element.appendChild(div);
    }
}

buildGrid(numCells, cellWidth, grid);
