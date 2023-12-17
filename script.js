let canvas = document.querySelector('.canvas');

let gridSize = 16;

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