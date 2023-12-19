const canvas = document.querySelector('.canvas');
const clearButton = document.querySelector('.clearButton');
const gridButton = document.querySelector('.gridButton');

let gridSize = 8;

let isDrawing = false;

let PIXEL_SIZE = 8;
let CANVAS_SIZE = 512;



document.addEventListener('mousedown',(event)=>{
    isDrawing=true 
    paint(event);
});

document.addEventListener('mouseup',() => {
    isDrawing = false;
});

document.addEventListener('mousemove', paint);


clearButton.addEventListener('click', clearCanvas);
gridButton.addEventListener('click', toggleGrid);


function toggleGrid(){
    switch(gridSize){
        case 8: gridSize = 16;
        break;
        case 16: gridSize = 32;
        break;
        case 32: gridSize = 64;
        break;
        case 64: gridSize = 8;
        break;
    }
    clearGrid();
    generateGrid();
}

function toggleHighlight(event){
    event.target.classList.toggle('highlight');
}

function paint(event){
    //isDrawing = true;
    // paintPixel(event);

    if(!event.target.classList.contains('grid') || !isDrawing) {
        return
    } else {
        let targetPixel = document.elementFromPoint(event.clientX,event.clientY);
        let rect = targetPixel.getBoundingClientRect();

        let coordinateToPaintY = rect.y;
        
        for(let i = PIXEL_SIZE; i <= CANVAS_SIZE / gridSize; i += PIXEL_SIZE){
            let coordinateToPaintX = rect.x;

            for (let i = PIXEL_SIZE; i <= CANVAS_SIZE / gridSize; i += PIXEL_SIZE){
                let elements = document.elementsFromPoint(coordinateToPaintX,coordinateToPaintY);
                //index 1 is always a div element with class "pixel".
                elements[1].classList.add('painted');
                coordinateToPaintX += PIXEL_SIZE;
            }
            coordinateToPaintY += PIXEL_SIZE;
        }
    }
}

function paintPixel(event) {
    if(isDrawing && event.target.classList.contains('pixel')) event.target.classList.add('painted')
}

function clearCanvas(){
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => {
        pixel.classList.remove('painted');
    })
}

function generatePixels() {
    for (let i = 0; i < CANVAS_SIZE / PIXEL_SIZE; i++) {

        let row = document.createElement('div');
        row.classList.add('row');
        canvas.appendChild(row);

        for (let i = 0; i < CANVAS_SIZE / PIXEL_SIZE; i++) {
            let pixel = document.createElement('div');
            pixel.classList.add('pixel');
            row.appendChild(pixel);
        }
    }
}

function generateGrid() {
    let gridY = 0;

    for (let i = 0; i < gridSize; i++) {
        let gridX = 0;
        let row = document.createElement('div');
        row.classList.add('gridRow');
        canvas.appendChild(row);

        for (let i = 0; i < gridSize; i++) {
            let grid = document.createElement('div');
            grid.classList.add('grid');
            grid.style.left = gridX + 'px';
            grid.style.top = gridY + 'px';
            switch(gridSize){
                case 8: grid.classList.add('size8');
                break;
                case 16: grid.classList.add('size16');
                break;
                case 32: grid.classList.add('size32');
                break;
                case 64: grid.classList.add('size64');
                break;
                default: grid.classList.add('size32');
            }
            grid.addEventListener('mouseenter', toggleHighlight);
            grid.addEventListener('mouseleave', toggleHighlight);
            row.appendChild(grid);
            gridX += CANVAS_SIZE / gridSize;
        }
        gridY += CANVAS_SIZE / gridSize;
    }
}

function clearGrid(){
    let gridList = document.querySelectorAll('.gridRow');
    let gridArray = [...gridList];
    gridArray.forEach((element)=>{
        element.remove();
    })
}

generatePixels();
generateGrid();
