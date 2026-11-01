const defaultColor = "#0000";

function createGrid(){
    const container = document.querySelector("#container");

    for(let i = 0; i < 256; i++){
        const div = document.createElement("div");
        div.className = "grid";
        container.appendChild(div);
    }
}




function rotateColors(){
    const getRandomHSL = () => {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * (95 - 70 + 1) + 70);
    const l = Math.floor(Math.random() * (96 - 85 + 1) + 85);
    return `hsl(${h}deg ${s}% ${l}%)`
    }

    const grids = document.querySelectorAll('.grid');

    grids.forEach((grid) => {
        grid.addEventListener("mouseenter", () =>{
            grid.style.backgroundColor = getRandomHSL();
        })
    })
}



function main(){
    createGrid();
    rotateColors();
}

main();


