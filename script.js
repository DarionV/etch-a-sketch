const canvas = document.querySelector('.canvas');
const clearButton = document.querySelector('.clearButton');
const gridButton = document.querySelector('.gridButton');

let gridSize = 8;

let isDrawing = false;

let PIXEL_SIZE = 16;

for (let i = 0; i < 32; i++) {

    let row = document.createElement('div');
    row.classList.add('row');
    canvas.appendChild(row);

    for (let i = 0; i < 32; i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');
        row.appendChild(pixel);
    }

}

document.addEventListener('mousedown',(event) => {
    // isDrawing = true;
    // paintPixel(event);

    let targetPixel = document.elementFromPoint(event.clientX,event.clientY);
    let rect = targetPixel.getBoundingClientRect();
    let markerY = rect.y;
    
    for(let i = PIXEL_SIZE; i <= 512/gridSize; i += PIXEL_SIZE){
        let markerX = rect.x;
        

        for (let i = PIXEL_SIZE; i <= 512 / gridSize; i += PIXEL_SIZE){
            let marker = document.createElement('div');
            marker.classList.add('marker');
            marker.style.left = markerX + PIXEL_SIZE / 2 + 'px';
            marker.style.top = markerY + PIXEL_SIZE / 2 + 'px';
            canvas.appendChild(marker);
            let elements = document.elementsFromPoint(markerX,markerY);
            elements[1].style.backgroundColor = 'white';
            markerX += PIXEL_SIZE;
        }

        markerY += PIXEL_SIZE;
    }

});

// document.addEventListener('mouseup',() => {
//     isDrawing = false;
// });

//document.addEventListener('mousemove', paintPixel);


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

function getCooridinatesToPaint(event){

}