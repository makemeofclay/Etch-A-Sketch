// Make new square div
const makeSquares = (size: number, canvas: HTMLElement) => {
    if (!(canvas instanceof HTMLElement))
    {
        throw new Error('Element with id "canvas" was not found.');
    }
    const square = document.createElement("div");
    square.classList.add("squares", "active");
    square.style.display = "flex";
    square.style.aspectRatio = "1 / 1"

    for (let j: number = 0; j < size**2; j++)
    {
        canvas.appendChild(square.cloneNode(true));
    }
    const squares = document.querySelectorAll('canvas div');
    squares.forEach(square => {
        square.classList.add('active')
    })
    // formatting
    canvas.style.display = "grid";
    canvas.style.gridTemplateColumns = `repeat(${MAXSIZE}, auto)`
    canvas.style.gridTemplateRows = `repeat(${MAXSIZE}, auto)`
};
const reset = (MAXSIZE: number, canvas: HTMLElement) => {
    const squares = document.querySelectorAll(".squares");
    squares.forEach(square => {
        square.remove();
    });
    makeSquares(MAXSIZE, canvas);
}
// Create a 16 x 16 grid of grid div squares
let MAXSIZE: number = 16;
const canvas = document.getElementById("canvas");
if (!(canvas instanceof HTMLElement))
{
    throw new Error('Element with id "canvas" was not found.');
}
// Reset canvas
const controls: any = document.querySelector("#controls");
const resetButton = document.createElement("button");
resetButton.textContent = "reset";
resetButton.classList.add("reset");
controls.append(resetButton);
//Set Canvas Size
const setSizeButton = document.createElement("button");
setSizeButton.textContent = "set size";
setSizeButton.classList.add("setSize");
controls.append(setSizeButton);


// Initial canvas upon site open
makeSquares(MAXSIZE, canvas);

// Main draw function
canvas.addEventListener("mouseover", (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;

    const square = e.target.closest(".squares");

    if (square) {
        square.classList.remove("active");
    }
});

resetButton.addEventListener("click", (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    reset(MAXSIZE, canvas);
});

setSizeButton.addEventListener("click", (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    while(true)
    {
        let newSize: any = prompt("Input new size. Must be less than or equal to 100");
        if (!(Number.isNaN(newSize)))
        {   
            MAXSIZE = Number(newSize);
            if (MAXSIZE <= 100 && Number.isInteger(MAXSIZE)) break;
        }
    }
    reset(MAXSIZE, canvas);
});