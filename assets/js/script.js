const canvas = document.getElementById("the_canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
ctx.imageSmoothingEnabled = false;  //makes the pixelart assets crisp



//set up map tile system - 3x3 grid of tiles.
const mapTiles =
[
[1, 2, 3],
[4, 5, 6],
[7, 8, 9],];

mapIndexX = 0;
mapIndexY = 0;


let currentMapTile = mapTiles[mapIndexY][mapIndexX];






//function that holds data about all game objects regarding how theyre drawn
function GameObject(spritesheet, x, y, width, height){
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

}

let chicken = new Image();

chicken.src = "assets/img/chicken.png"

let player = new GameObject(chicken, 5, 5, 64, 64)




//function that hold the current input action as a string
function GamerInput(input){
    this.action = input;
}

//empty on default
let gamerInput = new GamerInput("None");

//handles inputs
function input(event) {

    //console.log(event);
    //console.log("Event type: " + event.type);
   
    //set the string to a different value depending on the event
    if (event.type === "keydown") {
        switch (event.key) {
            case "w":
                gamerInput = new GamerInput("Up")
                break;
            case "W":
                gamerInput = new GamerInput("Up")
                break;
            case "a": 
                gamerInput = new GamerInput("Left")
                break;
            case "A": 
                gamerInput = new GamerInput("Left")
                break;
            case "s":
                gamerInput = new GamerInput("Down")
                break;
            case "S":
                gamerInput = new GamerInput("Down")
                break;
            case "d":
                gamerInput = new GamerInput("Right")
                break;
            case "D":
                gamerInput = new GamerInput("Right")
                break;
            default: 
                gamerInput = new GamerInput("None")
        }
    } else {
        gamerInput = new GamerInput("None");
    }
}

//updates the canvas, in this case only moves the player

let frameCount = 0;
let playerDirection = 0;
function update() {


    movePlayer();

    if (player.x <5 || player.y<5 || player.x + player.width >= canvas.width || player.y + player.height >= canvas.height ){  //checks for collision with canvas sides
        switchMapTile();
    }
 
}





function movePlayer() {
    if (gamerInput.action === "Up" && player.y > 0) {    //moves the player, changes the direction, which is used for animating the farmer, and upticks framecount if the player is moving

        player.y -= 5;
        playerDirection = 2;
        frameCount++;
    } else if (gamerInput.action === "Down" && player.y + player.height < canvas.height) {

        player.y += 5;
        playerDirection = 0;
        frameCount++;
    } else if (gamerInput.action === "Left" && player.x > 0) {

        player.x -= 5;
        playerDirection = 1;
        frameCount++;
    } else if (gamerInput.action === "Right" && player.x + player.width < canvas.width) {

        player.x += 5;
        playerDirection = 3;
        frameCount++;
    } 

}



//checks if the player can move onto a different tile.
function switchMapTile() {
    if (player.x < 5 && mapIndexX > 0) {
        player.x = canvas.width - (player.width +10);
        mapIndexX--;
    }
    else if (player.x + player.width >= canvas.width && mapIndexX < 2) {
        player.x = 10;
        mapIndexX++;
    }
    else if (player.y < 5 && mapIndexY > 0) {
        player.y = canvas.height - (player.height + 10);
        mapIndexY--;
    }
    else if (player.y + player.height >= canvas.height && mapIndexY < 2) {
        player.y = 10;
        mapIndexY++;
    }

    currentMapTile = mapTiles[mapIndexY][mapIndexX]


    console.log(mapIndexX, mapIndexY)
    
}





//draws the new canvas state
function draw() {
    //console.log("drawing a new frame")
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(player.spritesheet, player.x, player.y, player.width, player.height);
    
    //ctx.drawImage(chickenObj.spritesheet, chichenObj.x, chickenObj.y, chickenObj.width, chickenObj.height)

    
}


//the main gameloop
function gameloop() {
    
    update();
    draw();
    
    window.requestAnimationFrame(gameloop);
    
}


window.requestAnimationFrame(gameloop); //calls the gameloop as long as the window is open


window.addEventListener('keydown', input);

window.addEventListener('keyup', input);