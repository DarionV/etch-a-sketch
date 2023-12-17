const canvas = document.querySelector('.canvas');
const clearButton = document.querySelector('.clearButton');
const gridButton = document.querySelector('.gridButton');

let gridSize = 32;

let isDrawing = false;

for (let i = 0; i < gridSize; i++) {

    let row = document.createElement('div');
    row.classList.add('row');
    canvas.appendChild(row);

    for (let i = 0; i < gridSize; i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');
        row.appendChild(pixel);
    }

}

document.addEventListener('mousedown',(event) => {
    isDrawing = true;
    paintPixel(event);
});

document.addEventListener('mouseup',() => {
    isDrawing = false;
});

document.addEventListener('mousemove', paintPixel);


clearButton.addEventListener('click', clearCanvas);


function paintPixel(event) {
    if(isDrawing && event.target.classList.contains('pixel')) event.target.classList.add('painted')
}

function clearCanvas(){
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => {
        pixel.classList.remove('painted');
    })
}