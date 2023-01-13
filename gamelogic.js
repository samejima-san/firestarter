//there will be a grid of squares filled with numbers the max number will be 100 and they will periodically reduce in value based on the damage
//they incur via the fire as the game is shown on FLCL. The fire is supposed to spread from block to block but initially we will start with
//it being done randomly, lets just get base mechanics working then we can add additional features.

//the grid will be 10x10 and the fire will be on an individual block/fixed pattern of blocks

const POWER = 1; //the power of putting out the fires
const FIREPOWER = .5; //the power of the fire
const QUANTITY = 3; //the quantity of blocks in the grid, note: this number will be squared

//status is either OK, FIRE, DESTROYED, EMPTY
let grid = [];
let fireBlocks = [];

let initializeGrid = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        grid[i] = [];
        for (let j = 0; j < quantity; j++) {
            grid[i][j] = [100, "OK", 0];
            //the first value is the health, the second is the status, the third is the fire health
        }
    }
}

let SetFire = (x,y) => {
    if(grid[x][y][1] === "OK"){
        grid[x][y][1] = "FIRE";
        fireBlocks.append([x,y]);
        grid[x][y][2] = 3;
    }
}

let RemoveFireBlockOnOk = (x,y) => {
    if(grid[x][y][1] === "OK"){
        //loop through the fire blocks and remove the block that is now ok
        for(let i = 0; i < fireBlocks.length; i++){
            if(fireBlocks[i] === [x,y]){
                fireBlocks.splice(i,1);
            }
        }
    }
}

let ReduceSpread = (x,y) => {
    if(grid[x][y][1] === "FIRE"){
        grid[x][y][2] -= POWER;
        if(grid[x][y][2] === 0 || grid[x][y][2] < 0){
            grid[x][y][2] = 0;
            grid[x][y][1] = "OK";
        }
    }
}

let DamageFromFire = (x,y) => {
    grid[x][y][0] -= FIREPOWER;
    if(grid[x][y][0] === 0 || grid[x][y][0] < 0){
        grid[x][y][0] = 0;
        grid[x][y][1] = "DESTROYED";
    }
}

//choose which block to set on fire
let SelectRandomBlockForFire = () => {
    let x = Math.floor(Math.random() * QUANTITY);
    let y = Math.floor(Math.random() * QUANTITY);
    if(grid[x][y][1] === "OK"){
        SetFire(grid[x][y]);
    }
}

let SpreadToBlockNearby = (x,y) => {
    //get random number between 1 and 100
    let rand = Math.floor(Math.random() * 100) + 1;
    //if this block is on fire
    if(grid[x][y][1] === "FIRE"){
        //check the blocks around it
        if(rand % 7 === 0){
            //set the block above it on fire
            SetFire(x,y+1);
        }
        if(rand % 5 === 0){
            //set the block below it on fire
            SetFire(x,y-1);
        }
        if(rand % 3 === 0){
            //set the block to the left on fire
            SetFire(x-1,y);
        }
        if(rand % 4 === 0){
            //set the block to the right on fire
            SetFire(x+1,y);
        }
        //there is a chance the block next to it will catch fire
    }
}

//check blocks to see which should be taking damage from the fire
//im thinking of when we select which blocks are on fire we should also add that list of blocks that are on fire
//and we should remove them from the list when they are no longer on fire


