let canvas = document.querySelector('.canvas');

let gridSize = 32;

let isDrawing = false;

let mousePosition = {
    xPosition: 0,
    yPosition: 0,
};

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

document.addEventListener('mousedown',() => {
    isDrawing = true;
});

document.addEventListener('mouseup',() => {
    isDrawing = false;
});

document.addEventListener('mousemove', paintPixel);


function paintPixel(event) {
    if(isDrawing && event.target.classList.contains('pixel')) event.target.classList.add('highlight')
}