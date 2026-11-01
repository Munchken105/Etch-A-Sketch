const defaultColor = "#0000";

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




function rotateColors(){
    const getRandomHSL = () => {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * (95 - 70 + 1) + 70);
    const l = Math.floor(Math.random() * (96 - 85 + 1) + 85);
    return `hsl(${h}deg ${s}% ${l}%)`
    }

    const grids = document.querySelectorAll('.grid');

    grids.forEach((grid) => {
        let entered = 0;
        grid.addEventListener("mouseenter", () =>{
            if(entered == 0){
                grid.style.backgroundColor = getRandomHSL();
                grid.style.opacity = "0.1";
                entered++;
            }

            else{
                let currentOpacity = parseFloat(grid.style.opacity) || 0;
                let newOpacity = currentOpacity + 0.1;
                if (newOpacity > 1){
                    newOpacity = 1;
                }
                grid.style.opacity = newOpacity.toString();
            }
        })
    })
}

function promptUser(){
    const btn = document.querySelector(".btn");
    let input;
    btn.addEventListener("click", () => {
        let loopCondition = true;
        while(loopCondition){
            input = prompt("Enter the number of squares per side for a new grid");
            if (input === null){
                console.log("input was NULL for some reason?");
                return;
            }
            input = Number(input);

            if(!Number.isInteger(input)){
                alert("input must be a number a integer");
            }
            else if(input > 100 || input <= 0){
                alert("input cant be less than or equal to 0 and has to be less than 100");
            }
            else {
                loopCondition = false;
            }
        }
        createGrid(input);
        rotateColors();
    });
}



function main(){
    createGrid();
    rotateColors();
    promptUser();
}

main();


