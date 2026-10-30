function createGrid(){
    const container = document.querySelector("#container");

    for(let i = 0; i < 256; i++){
        const div = document.createElement("div");
        div.className = "grid";
        container.appendChild(div);
    }
}

createGrid();