let rows = 80;
let columns = 104;

let matrix = [];
let arr = [];

let horizontalDirection = 1; 
let verticalDirection = 0;

let slot = 0;
document.getElementById("slot1").style.border = "3px solid aqua";

let inventory = [ 
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];

// Used in inventory functions to output block names to Inventory GUI
const blockIDs = {
  "rgb(125, 231, 5)": "Leaves",
  "rgb(66, 41, 26)": "Trunks",
  "green": "Grass",
  "rgb(101, 67, 33)": "Dirt"
}

function inventoryAddItem(item){
  // Searches if item matches any item already in inventory. If not, adds item to first empty slot.
  let foundSlot = false;
  for(var i = 0; i < inventory.length; i++) {
        if(inventory[i][0] == item){
          inventory[i].push(item)
          document.getElementById("slot"+(i+1)).style.backgroundColor = inventory[i][0] // Adds color of block to slot i
          document.getElementById("slot"+(i+1)).innerHTML = blockIDs[inventory[i][0]] + " x"+inventory[i].length // Adds amount of block to slot i
          foundSlot = true;
          return;
        }
  }
  if(foundSlot == false){
    for(var i = 0; i < inventory.length; i++) {
        if(inventory[i].length == 0){
            inventory[i].push(item)
            document.getElementById("slot"+(i+1)).style.backgroundColor = inventory[i][0]
            document.getElementById("slot"+(i+1)).innerHTML = blockIDs[inventory[i][0]] + " x"+inventory[i].length
            return;
          }
    }
  }
}

function inventoryRemoveItem(item){
  // Removes item from inventory. 
  // If there are still other items present of the same type, then subtract 1 from inventory GUI count of that item.
  // If there are no more items of that type left, then remove all background color and text for that slot.
  for(var i = 0; i < inventory.length; i++) {
      if(inventory[i][0] == item) {
          inventory[i].pop()
          if(inventory[i].length !== 0){
            document.getElementById("slot"+(i+1)).innerHTML = blockIDs[inventory[i][0]] + " x"+inventory[i].length
          }
          if(inventory[i].length == 0){
            document.getElementById("slot"+(i+1)).style.backgroundColor = "";
            document.getElementById("slot"+(i+1)).innerHTML = ""
          }
      }
  }
}

function loadNewScene(){
  // Clears all table cells of color and set to "white" / ""
  for(i=1;i<=rows*columns;i++){
    document.getElementById("_"+i).style.backgroundColor = "";
  }
  arr = []

  startTimeTerrain = performance.now()
  terrainCreate(rows,columns);
  endTimeTerrain = performance.now()

  document.getElementById("output").innerHTML = "Terrain generated in "+(endTimeTerrain-startTimeTerrain)+" ms</br>";

  // Places character ontop of the leftmost grass square
  num = arr[0]-columns; 
  x = Math.round(num/columns);
  y = 0;
  document.getElementById(matrix[x][y]).style.backgroundColor = "red";
  
}

function matrixCreate(rows,columns) {
  let count = 0;
  
  for(i=0;i<=rows-1;i++) {
    matrix.push([])
    for(f=0;f<=columns-1;f++) {
      count++
      matrix[i][f] = "_"+count
    }
  }
}

function tableCreate(rows,columns) {
  let wrapper = document.getElementById("wrapper")
  let tbl = document.createElement("table");
  let tblBody = document.createElement("tbody");
  let count = 0;

  for (let j = 0; j < rows; j++) {
    let row = document.createElement("tr");
    for (let i = 0; i < columns; i++) {
      count++
      let cell = document.createElement("td");
      cell.setAttribute('id',"_"+count);
      cell.className = "platformerCell"
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  wrapper.appendChild(tbl);
  tbl.id ="platformer";
}

function terrainCreate(rows,columns){
  // Places starting cell of terrain generation on the middle leftmost square.
  let num = (Math.floor(rows/2))*columns+1
  arr.push(num)
  // Defines grass
  // The next grass block can either be placed up-right, forward, or down-right.
  for(i=0;i<=columns-2;i++){
    let random = Math.random()
    if(num>rows*columns){
      num=num-(columns-1)
      arr.push(num)
    }
    else if(num<columns){
      num=num+(columns+1);
      arr.push(num)
    }
    else if(random<0.25) {
      num=num+(columns+1);
      arr.push(num)
    }
    else if(random<0.65) {
      num++;
      arr.push(num)
    }
    else if(random<=1){
      num=num-(columns-1);
      arr.push(num)
    }
  }
  let id;
  // Colors cell ID grass-green according to elements in arr.
  for (let i = 0; i <= columns-1; i++) {
    id = arr[i]
    document.getElementById("_"+id).style.backgroundColor = "green";
    // Colors all cell IDs below grass brown.
    for (let l = id+columns; l <= (rows*columns); l=l+columns) {
      document.getElementById("_"+l).style.backgroundColor = "#654321";
    }
  }
  let maxTreeCount = Math.floor(columns/15)
  let randTreePos;
  for(let i=0;i<=maxTreeCount;i++) {
      // Trees are always 4 cells away from the border
      // Places trunk of tree
      randTreePos = arr[Math.floor(Math.random() * ((columns -4) - 4) + 4)]-columns
      document.getElementById("_"+randTreePos).style.backgroundColor = "rgb(66, 41, 26)";
      document.getElementById("_"+(randTreePos-columns)).style.backgroundColor = "rgb(66, 41, 26)";

      // Creates leaves
      /* Follows pattern of: 
            9 10 11
            6 7 8
            3 4 5
              2
              1
      */
      let leavesStart = (randTreePos-columns)-columns-1 // Sets start of leaves up-left of top trunk block
      for (let row = 1; row <= 3; row++) {
        for (let i = 0; i <=2; i++) {
          document.getElementById("_"+(leavesStart+i)).style.backgroundColor = "rgb(125, 231, 5)";
        }
        leavesStart = leavesStart - columns
      }
  }
}

let startTimeTable = performance.now()
tableCreate(rows,columns)
let endTimeTable = performance.now()

let startTimeMatrix = performance.now()
matrixCreate(rows,columns)
let endTimeMatrix = performance.now()

let startTimeTerrain = performance.now()
terrainCreate(rows,columns);
let endTimeTerrain = performance.now()

document.getElementById("output").innerHTML = 
  "Table generated in "+(endTimeTable-startTimeTable).toFixed(0)+" ms</br>"+
  "Matrix generated in "+(endTimeMatrix-startTimeMatrix).toFixed(0)+" ms</br>"+
  "Terrain generated in "+(endTimeTerrain-startTimeTerrain).toFixed(0)+" ms</br></br>"+
  "Welcome to a:</br>"+
  "Table Open world game!</br></br>"+
  "← → ↑ ↓: Movement</br>"+
  "R: Break block</br>"+
  "F: Place block</br>"+
  "Arrow keys: Define direction of player</br>"+
  "Num Row: Inv. Selection"

// Places character on top of the grass in the middle of the scene.
let num = arr[Math.round(arr.length/2)]-columns;
let x = Math.round(num/columns)-1;
let y = (num%columns)-1; 

document.getElementById(matrix[x][y]).style.backgroundColor = "red";



// Gravity and jump variables
let isJumping = false;
let jumpHeight = 0;
const maxJumpHeight = 4; // Number of cells the player can jump
const gravitySpeed = 50; // Lower value means faster gravity

function applyGravity() {
  if (isJumping) return;
  
  if (x < rows - 1 && document.getElementById(matrix[x + 1][y]).style.backgroundColor === "") {
    document.getElementById(matrix[x][y]).style.backgroundColor = "";
    x++;
    document.getElementById(matrix[x][y]).style.backgroundColor = "red";
  }
}

setInterval(applyGravity, gravitySpeed);

function jump() {
  if (isJumping) return;

  isJumping = true;
  let jumpInterval = setInterval(() => {
    if (jumpHeight < maxJumpHeight && x > 0 && document.getElementById(matrix[x - 1][y]).style.backgroundColor === "") {
      document.getElementById(matrix[x][y]).style.backgroundColor = "";
      x--;
      jumpHeight++;
      document.getElementById(matrix[x][y]).style.backgroundColor = "red";
    } else {
      clearInterval(jumpInterval);
      isJumping = false;
      jumpHeight = 0;
    }
  }, gravitySpeed);
}



document.addEventListener('keydown', function checkKey(e) {
 
 //*****NEW*****
  if (e.key == 'ArrowUp' && !isJumping) {
    // Jumpww
    jump();
  }
  //**********

    else if (e.key == 'ArrowDown') {
        // down arrow
        if (x >= columns-1 || document.getElementById(matrix[x+1][y]).style.backgroundColor != "") {
          return;
        }
        else {
          document.getElementById(matrix[x][y]).style.backgroundColor = "";
          document.getElementById(matrix[x+1][y]).style.backgroundColor = "red";
          x++;
        }
      
    }
    else if (e.key == 'ArrowLeft') {
       // left arrow
       if (y <= 0 || (document.getElementById(matrix[x-1][y-1]).style.backgroundColor != "" && document.getElementById(matrix[x][y-1]).style.backgroundColor != "")) {
          return;
        }
        else if(document.getElementById(matrix[x][y-1]).style.backgroundColor != "") {
          document.getElementById(matrix[x][y]).style.backgroundColor = "";
          document.getElementById(matrix[x-1][y-1]).style.backgroundColor = "red";
          x--;
          y--;
        }
        else {
          document.getElementById(matrix[x][y]).style.backgroundColor = "";
          document.getElementById(matrix[x][y-1]).style.backgroundColor = "red";
          y--;
        }
    }
    else if (e.key == 'ArrowRight') {
       // right arrow
       if (y == columns-1) {
          loadNewScene();
        }
        else if(document.getElementById(matrix[x-1][y+1]).style.backgroundColor != "" && document.getElementById(matrix[x][y+1]).style.backgroundColor != ""){
          return;
        }
        else if (document.getElementById(matrix[x][y+1]).style.backgroundColor != "") {
          document.getElementById(matrix[x][y]).style.backgroundColor = "";
          document.getElementById(matrix[x-1][y+1]).style.backgroundColor = "red";
          x--;
          y++;
        }
        else {
          document.getElementById(matrix[x][y]).style.backgroundColor = "";
          document.getElementById(matrix[x][y+1]).style.backgroundColor = "red";
          y++;
        }
    }
});

document.addEventListener('keyup', function directionFunc(e) {
  if(e.key == 'ArrowUp') {
    verticalDirection = -1;
    horizontalDirection = 0;
  }
  else if(e.key == 'ArrowDown'){
    verticalDirection = 1
    horizontalDirection = 0;
  }
  else if(e.key == 'ArrowLeft'){
    horizontalDirection = -1
    verticalDirection = 0;
  }
  else if(e.key == 'ArrowRight'){
    horizontalDirection = 1
    verticalDirection = 0;
  }
});

document.addEventListener('keypress', function slotSelection(e){
  if(e.key == '1'){
    document.getElementById("slot"+(slot+1)).style.border = "1px solid black";
    document.getElementById("slot1").style.border = "3px solid aqua";
    slot = 0
  }
  else if(e.key == '2'){
    document.getElementById("slot"+(slot+1)).style.border = "1px solid black";
    document.getElementById("slot2").style.border = "3px solid aqua";
    slot = 1
  }
  else if(e.key == '3'){
    document.getElementById("slot"+(slot+1)).style.border = "1px solid black";
    document.getElementById("slot3").style.border = "3px solid aqua";
    slot = 2
  }
  else if(e.key == '4'){
    document.getElementById("slot"+(slot+1)).style.border = "1px solid black";
    document.getElementById("slot4").style.border = "3px solid aqua";
    slot = 3
  }
  else if(e.key == '5'){
    document.getElementById("slot"+(slot+1)).style.border = "1px solid black";
    document.getElementById("slot5").style.border = "3px solid aqua";
    slot = 4
  }
  else if(e.key == '6'){
    document.getElementById("slot"+(slot+1)).style.border = "1px solid black";
    document.getElementById("slot6").style.border = "3px solid aqua";
    slot = 5
  }
  else if(e.key == '7'){
    document.getElementById("slot"+(slot+1)).style.border = "1px solid black";
    document.getElementById("slot7").style.border = "3px solid aqua";
    slot = 6
  }
  else if(e.key == '8'){
    document.getElementById("slot"+(slot+1)).style.border = "1px solid black";
    document.getElementById("slot8").style.border = "3px solid aqua";
    slot = 7
  }
})

document.addEventListener('keypress', function miningFunc(e){
  if(e.key == 'r'){
    if(document.getElementById(matrix[x+verticalDirection][y+horizontalDirection]).style.backgroundColor == "")
      return;
    else {
      inventoryAddItem(document.getElementById(matrix[x+verticalDirection][y+horizontalDirection]).style.backgroundColor)
      document.getElementById(matrix[x+verticalDirection][y+horizontalDirection]).style.backgroundColor = "";
    }
  }
});

document.addEventListener('keypress', function buildFunc(e){
  if(e.key == 'f'){
    if(document.getElementById(matrix[x+verticalDirection][y+horizontalDirection]).style.backgroundColor != ""){
      return;
    }
    else {
      document.getElementById(matrix[x+verticalDirection][y+horizontalDirection]).style.backgroundColor = inventory[slot][0];
      inventoryRemoveItem(document.getElementById(matrix[x+verticalDirection][y+horizontalDirection]).style.backgroundColor)
    }
  }
});
