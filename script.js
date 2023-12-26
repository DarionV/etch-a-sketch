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

document.addEventListener('touchmove', (element)=>{
    isDrawing = true;
    paint(element);
});

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
function toggleHighlight(event){
   if(!isGridVisible) event.target.classList.toggle('highlight');
   resetActivePixels();
}
function paint(event){
    console.log('paint');
    if(!event.target.classList.contains('grid') || !isDrawing ) return;

    event.preventDefault();
    let selectedSquare = getPixelCoordinates(event);
    let randomColor = getRandomColor();
    paintPixels(selectedSquare, randomColor);
}
function getPixelCoordinates(event){
    console.log('getPixelsCoordinates');
    if(event.touches == undefined) {
        return  document.elementFromPoint(event.clientX,event.clientY);
   }
   else { 
       return document.elementFromPoint(event.touches[0].clientX,event.touches[0].clientY);
   }
}
function paintPixels(selectedSquare, randomColor){
    console.log('paintPixels');
    let rect = selectedSquare.getBoundingClientRect();
    let coordinateToPaintY = rect.y;

    for(let i = PIXEL_SIZE; i <= CANVAS_SIZE / gridSize; i += PIXEL_SIZE){
        let coordinateToPaintX = rect.x;

        for (let i = PIXEL_SIZE; i <= CANVAS_SIZE / gridSize; i += PIXEL_SIZE){
            let elements = document.elementsFromPoint(coordinateToPaintX,coordinateToPaintY);
            let pixelsToPaint = elements.find(checkPixel);
            if(pixelsToPaint.classList.contains('active')) return;
            
            if(!isErasing) { 
                paintSelectedPixels(pixelsToPaint,randomColor);
            }
            else {
                paintBlack(pixelsToPaint); 
            }
            coordinateToPaintX += PIXEL_SIZE;
        }
        coordinateToPaintY += PIXEL_SIZE;
    }
}
function paintSelectedPixels(pixels, randomColor){

    if(pixels.classList.contains('active')) return;
                
    pixels.classList.add('active');

    if(isTechnicolor) paintTechnicolor(pixels, randomColor);

    //Will add a class and will not effect technicolored pixels
    paintWhite(pixels);
}
function paintWhite(pixels){
    pixels.classList.add('paintedWhite');
    pixels.classList.remove('paintedBlack');
}
function paintTechnicolor(pixels, randomColor){
    pixels.style.backgroundColor = randomColor;
    pixels.style.boxShadow = `0px 0px 15px ${randomColor}`;
    pixels.style.filter='brightness(130%)';
}
function paintBlack(pixels){
    pixels.classList.add('paintedBlack');
    pixels.classList.remove('paintedWhite');
    pixels.style = '';
}
function checkPixel (element) {
    return element.classList.contains('pixel');
}

function paintPixel(event) {
    if(isDrawing && event.target.classList.contains('pixel')) event.target.classList.add('painted');
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
    let squareY = 0;

    for (let i = 0; i < gridSize; i++) {
        let squareX = 0;
        let row = addRow();

        for (let i = 0; i < gridSize; i++) {
            let square = createSquare(squareX, squareY);
            row.appendChild(square);
            squareX += CANVAS_SIZE / gridSize;
        }
        squareY += CANVAS_SIZE / gridSize;
    }
}
function createSquare(x,y){
    let square = document.createElement('div');
    square.classList.add('grid');
    square.style.left = x + 'px';
    square.style.top = y + 'px';
    switch(gridSize){
        case 8: square.classList.add('size8');
        break;
        case 16: square.classList.add('size16');
        break;
        case 32: square.classList.add('size32');
        break;
        case 64: square.classList.add('size64');
        break;
        default: square.classList.add('size32');
    }
    square.addEventListener('mouseenter', toggleHighlight);
    square.addEventListener('mouseleave', toggleHighlight);
    square.addEventListener('pointerleave', resetActivePixels);

    if(isGridVisible) square.classList.add('highlight');

    return square;
}
function addRow(){
    let row = document.createElement('div');
    row.classList.add('gridRow');
    canvas.appendChild(row);
    return row;
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
    randomInt = Math.floor(Math.random() * max);
    return randomInt; 
}

generatePixels();
generateGrid();
