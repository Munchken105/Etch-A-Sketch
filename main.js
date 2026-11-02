const defaultColor = "#000000";
const defaultMode = "draw";
let mode = defaultMode;
let selectedColor = defaultColor;
let isDrawing = false;

function createGrid(input = 16){
    const container = document.querySelector("#container");
    const gridSize = input * input;
    container.replaceChildren();
    for(let i = 0; i < gridSize; i++){
        const div = document.createElement("div");
        div.className = "grid";
        div.style.flex = `0 0 calc(100% /${input})`;
        container.appendChild(div);
    }
}

const getRandomHSL = () => {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * (95 - 70 + 1) + 70);
    const l = Math.floor(Math.random() * (96 - 60 + 1) + 60);
    return `hsl(${h}deg ${s}% ${l}%)`
}


function colorGrid(grid){
        if(mode === "rainbow"){
            if (grid.dataset.mode !== "rainbow"){
                grid.style.backgroundColor = getRandomHSL();
                grid.style.opacity = "0.1";
                grid.dataset.mode = "rainbow"
                return;
            }
        }
        else if(mode === "draw"){
            if (grid.dataset.color !== selectedColor || grid.dataset.mode !== "draw"){
                grid.style.backgroundColor = selectedColor;
                grid.dataset.color = selectedColor;
                grid.dataset.mode = "draw";
                grid.style.opacity = "0.1";
                return;
            }
        }

        else if(mode === "eraser"){
            grid.style.backgroundColor = "";
            grid.style.opacity = "1";
            delete grid.dataset.mode;
            delete grid.dataset.color;
            return;
        }
        let currentOpacity = parseFloat(grid.style.opacity) || 0;
        let newOpacity = currentOpacity + 0.1;
        if (newOpacity > 1){
            newOpacity = 1;
        }
        grid.style.opacity = newOpacity.toString();
}


function draw(){
    const grids = document.querySelectorAll('.grid');

    grids.forEach((grid) => {
        grid.addEventListener("mouseenter", () =>{
            if(!isDrawing) return;
            colorGrid(grid);

        })
        grid.addEventListener("mousedown", (e) => {
            if(e.button === 0){
                isDrawing = true;
                colorGrid(grid);
            }
        });
    });
}

function mouseState(){
        document.addEventListener("mouseup", () => {
        isDrawing = false;
    });
}

function selectMode(){
    const color = document.querySelector("#color");
    const rainbow = document.querySelector("#rainbow");
    const eraser = document.querySelector("#eraser");
    const container = document.querySelector("#container");

    color.addEventListener("click", () => {
        mode = "draw";
        container.classList.remove("eraser-cursor");
    });
    rainbow.addEventListener("click", () => {
        mode = "rainbow"
        container.classList.remove("eraser-cursor");
    });
    eraser.addEventListener("click", () => {
        mode = "eraser";
        container.classList.add("eraser-cursor");
    });
}

function selectColor(){
    const picker = document.querySelector("#picker");
    picker.value = selectedColor;

    picker.addEventListener("input", () => {
        selectedColor = picker.value;
    });
}



function clearBoard(){
    const btn = document.querySelector("#clear");
    btn.addEventListener("click", () => {
        console.log("fired");
        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => {
            grid.style.backgroundColor = "";
            grid.style.opacity = "1";
            delete grid.dataset.color;
            delete grid.dataset.mode;
        });
    });
}

function main(){
    createGrid();
    draw();
    clearBoard();
    selectMode();
    selectColor();
    mouseState();
}

main();
