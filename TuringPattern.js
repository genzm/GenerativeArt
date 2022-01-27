let lattice;
let next;
const n=70;
const equi=4;
let columns;
let rows;

function drawState(state){
    for(let i=0; i<n; i++){
        for(let j=0; j<n; j++){
            if(state[i][j]==1){
                fill(3);
            }
            if(state[i][j]==0){
                fill(240);
            }
            stroke(0);
            ellipse(i*n, j*n, n-1, n-1)
        }
    }    

}

function updateLattice(){
    for(let i=1; i<columns-1; i++){
        for(let j=1; j<width-1; j++){
            let neibhbors=0;
            for(let m=-1; m<2; m++){
                for(let n=-1; n<2; n++){
                    neibhbors +=lattice[i+m][j+n];
                }
            }
            neibhbors-=lattice[i][j]; //neibhborsは周囲8の合計

            if((lattice[i][j]==1)&&(neibhbors<equi)){
                next[i][j]=0;
            }
            else if((lattice[i][j]==0)&&(neibhbors>equi)){
                next[i][j]=1;
            }
            else{
                next[i][j]=lattice[i][j]
            }
        }
    }
    // Swap!
    let temp = lattice;
    lattice = next;
    next = temp;

}

function reStart(){
    for(let i=0; i<columns; i++){
        for(let j=0; j<columns; j++){
            if(i==0|| j==0|| i==columns-1 || j==rows-1){
                lattice[i][j]=0;
            }
            else{
                lattice[i][j]=floor(random(2));
            }
            next[i][j]=0;
        }
    }
}
function setup(){
    createCanvas(5000, 5000);
    columns=floor(width/n);
    rows=floor(height/n);
    lattice=new Array(columns);
    for(let i=0; i<columns; i++){
        lattice[i]=new Array(rows);
    }
    next=new Array(columns);
    for(let i=0; i<columns; i++){
        next[i]=new Array(rows);
    }
    reStart();
}

function draw(){
    background(255);
    updateLattice();
    drawState(lattice);
}

function mousePressed() {
    reStart();
}
