const canvas = document.querySelector('.canvas');
const clearButton = document.querySelector('.clear-button');
const paintButton = document.querySelector('.paint-button');
const gridToggleButton = document.querySelector('.grid-button');
const gridSlider = document.querySelector('.grid-slider');
const technicolorButton = document.querySelector('.technicolor-button');
const technicolorLight = document.querySelector('.technicolor-light');

const technicolor = ['3e8dcf', '883274', 'd9373a', 'e26e38', 'fced4f', '4aa44d','cedb51','53b6ed','204c9d','5f318c','f6c546'];

let gridSize = 16;

let isDrawing = false;
let isErasing = false;
let isGridVisible = false;
let isTechnicolor = false;

let currentRandomInt;
let randomInt;

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

technicolorButton.addEventListener('click',toggleTechnicolor);

clearButton.addEventListener('click', clearCanvas);

paintButton.addEventListener('click', ()=>{
    (isErasing) ? isErasing = false : isErasing = true;
    paintButton.classList.toggle('off');
    paintButton.classList.toggle('on');
})

gridSlider.oninput = function() {
    changeGridSize(this.value);
}

gridSlider.addEventListener('mousedown',()=>{
    if(!isGridVisible && gridToggleButton.classList.contains('off')) {
        toggleGrid(false);
    }
})

gridSlider.addEventListener('mouseup', ()=>{
    if(isGridVisible && gridToggleButton.classList.contains('off')) {
        toggleGrid(false);
    }
}) 

gridToggleButton.addEventListener('click', ()=> {toggleGrid(true)});

function changeGridSize(size){
    switch(size){
        case '1': gridSize = 64;
        break;
        case '2': gridSize = 32;
        break;
        case '3': gridSize = 16;
        break;
        case '4': gridSize = 8;
        break;
        default: gridSize = 8;
    }
    clearGrid();
    generateGrid();
}

function toggleTechnicolor(){
    clearCanvas();
    if (isTechnicolor) { 
        isTechnicolor = false;
        technicolorLight.classList.remove('on');
     } else {
        isTechnicolor = true;
        technicolorLight.classList.add('on');
     }
}

function toggleGrid(shouldToggleButton){

    getRandomColor();

    if(shouldToggleButton){
    gridToggleButton.classList.toggle('off');
    gridToggleButton.classList.toggle('on');
    }

    let gridList = document.querySelectorAll('.grid');
    let gridArray = [...gridList];
    
    if (isGridVisible) {
        isGridVisible = false;
        gridArray.forEach((element)=>{
            element.classList.remove('highlight');
        });
    } else{
        isGridVisible = true;
        gridArray.forEach((element)=>{
            element.classList.add('highlight');
        });
    }
}

function changeGrid(){
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
   if(!isGridVisible) event.target.classList.toggle('highlight');
   resetActivePixels();
}

function paint(event){
 
    if(!event.target.classList.contains('grid') || !isDrawing ) {
        return
    } else {
        let randomColor = getRandomColor();
        event.preventDefault();
        let targetPixel = document.elementFromPoint(event.clientX,event.clientY);
        let rect = targetPixel.getBoundingClientRect();

        let coordinateToPaintY = rect.y;
        
        for(let i = PIXEL_SIZE; i <= CANVAS_SIZE / gridSize; i += PIXEL_SIZE){
            let coordinateToPaintX = rect.x;

            for (let i = PIXEL_SIZE; i <= CANVAS_SIZE / gridSize; i += PIXEL_SIZE){
                let elements = document.elementsFromPoint(coordinateToPaintX,coordinateToPaintY);
                let pixelsToPaint = elements.find(checkPixel);
                
                if(!isErasing) {
                    if(pixelsToPaint.classList.contains('active')) return;
                    
                    pixelsToPaint.classList.add('active');

                    if(isTechnicolor) { 
                        pixelsToPaint.style.backgroundColor = randomColor;
                        pixelsToPaint.style.boxShadow = `0px 0px 15px ${randomColor}`;
                        pixelsToPaint.style.filter='brightness(130%)';
                    }
                    pixelsToPaint.classList.add('paintedWhite');
                    pixelsToPaint.classList.remove('paintedBlack');
                }
                else {
                     pixelsToPaint.classList.add('paintedBlack');
                     pixelsToPaint.classList.remove('paintedWhite');
                     pixelsToPaint.style = '';
                }    
                coordinateToPaintX += PIXEL_SIZE;
            }
            coordinateToPaintY += PIXEL_SIZE;
        }
    }
}

function checkPixel (element) {
    return element.classList.contains('pixel');
}

function paintPixel(event) {
    if(isDrawing && event.target.classList.contains('pixel')) event.target.classList.add('painted')
}

function clearCanvas(){
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => {
        pixel.classList.remove('paintedWhite');
        pixel.classList.add('paintedBlack');
        pixel.style = '';
    })
}

function resetActivePixels(){
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => {
        pixel.classList.remove('active');
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
            if(isGridVisible) grid.classList.add('highlight');
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

function getRandomColor(){
    let randomColorIndex = getRandomInt(technicolor.length)
    return ('#' + technicolor[randomColorIndex]);
}

function getRandomInt(max){
    while(randomInt == currentRandomInt) {
     randomInt = Math.floor(Math.random() * max);
    }
    currentRandomInt = randomInt;
    return randomInt; 
}

generatePixels();
generateGrid();
