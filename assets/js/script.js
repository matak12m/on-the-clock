const canvas = document.getElementById("the_canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
ctx.imageSmoothingEnabled = false;  //makes the pixelart assets crisp


const moveSpeed =5;





let interactArray = [pubFriend, pubSign, pubSignObstacle, travelFriend, blacksmithStall, blackSmithFriend, blackSmithMaster];




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
            case " ": 
                gamerInput = new GamerInput("Interact")
                console.log(dialogueCount)
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
const playerCollisionX = -50;
const playerCollisionY = -50;

function update() {

    if (gamerInput != "None"){
    manageInput();
    }
    

    if (player.x <playerCollisionX || player.y<playerCollisionY || player.x + player.width >= canvas.width || player.y + player.height >= canvas.height ){  //checks for collision with canvas sides
        switchMapTile();
    }
 
    if (pubFriend.mapIndexX == 0 && pubFriend.mapIndexY == 0 && blackSmithFriend.mapIndexX == 0 && blackSmithFriend.mapIndexY == 0
        && travelFriend.mapIndexX == 0 && travelFriend.mapIndexY == 0 && player.mapIndexX == 0 && player.mapIndexY == 0 && gameOver == "false") {
            endOfGame();
            
    }

}







let canInteract = 1;
function manageInput() {
    if (gamerInput.action === "Up" && player.y > playerCollisionY - 5) {    //moves the player, changes the direction, which is used for animating the farmer, and upticks framecount if the player is moving

        player.y -= moveSpeed;
        playerDirection = 3;
        frameCount++;
        player.y.onchange = disappearTextBox("all");
        
    } else if (gamerInput.action === "Down" && player.y + player.height < canvas.height) {

        player.y += moveSpeed;
        playerDirection = 2;
        frameCount++;
        player.y.onchange = disappearTextBox("all");
        
    } else if (gamerInput.action === "Left" && player.x > playerCollisionX - 5) {

        player.x -= moveSpeed;
        playerDirection = 1;
        frameCount++;
        player.x.onchange = disappearTextBox("all");
        
    } else if (gamerInput.action === "Right" && player.x + player.width < canvas.width) {

        player.x += moveSpeed;
        playerDirection = 0;
        frameCount++;
        player.x.onchange = disappearTextBox("all");
        
    } 
    else if(gamerInput.action === "Interact" && canInteract == 1) {
        for (i = 0; i < interactArray.length; i++){
            if (interactArray[i].mapIndexX == player.mapIndexX && interactArray[i].mapIndexY == player.mapIndexY && isCollide(interactArray[i], player) && interactArray[i].absenceTime != time ) {
                interact(interactArray[i]);
                canInteract = 0;
                console.log("pressed space")
                break;
            }
        }
    }
    else if (gamerInput.action == "None") {
        walkIndex = 1;
        frameCount = 0;
        canInteract = 1;
    }

    if (frameCount > 5) {
        walkCycle();
        frameCount = 0;
    }


}   

//checks for collision between two object
function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}


// intracts with the NPC
function interact(NPC) {

    console.log("interacting with " + NPC.name);
    let isAtCampfire = false;
    if (NPC.mapIndexX == 0 && NPC.mapIndexY == 0) {
        isAtCampfire = true;
    }

    showDialogue(NPC.name, isAtCampfire, NPC.specialTime);

    



    // if NPC - send to textbox handler
    //textbox handler willl function based on the .name property of the objects
    //else if item - do something else (?)


}



//checks if the player can move onto a different tile.
function switchMapTile() {
    if (player.x < playerCollisionX && player.mapIndexX > 0) {
        player.x = canvas.width - (player.width +10);
        player.mapIndexX--;
    }
    else if (player.x + player.width >= canvas.width && player.mapIndexX < 2) {
        player.x = 10;
        player.mapIndexX++;
    }
    else if (player.y < playerCollisionY && player.mapIndexY > 0) {
        player.y = canvas.height - (player.height + 10);
        player.mapIndexY--;
    }
    else if (player.y + player.height >= canvas.height && player.mapIndexY < 2) {
        player.y = 10;
        player.mapIndexY++;
    }



    console.log(player.mapIndexX, player.mapIndexY)
    
}


const scale = 2;
const width = 64;
const height = 64;
const sWidth = width * scale;
const sHeight = height * scale;
const walkLoop = [0, 1, 2, 3, 4, 5];
let walkIndex = 0;


function walkCycle() {
    
    
walkIndex++;
        if (walkIndex >= walkLoop.length) {
         walkIndex = 0;
         //console.log("walk cycle change");
    }
}


//used for characters
function drawCharacter (frameX, frameY, canvasX, canvasY, spritesheet) {  //siplifies the frame drawing process, we can pass 1 for frameX to signify second collumn (instead of passing the height)
    ctx.drawImage(spritesheet, frameX * width, frameY * height, width, height, canvasX, canvasY, sWidth, sHeight);
}

//used for buildings and other elements
function drawElement(imgWidth, imgHeight, imgFrameX, imgFrameY, imgCanvasX, imgCanvasY, imgSpritesheet, scale) {
    ctx.drawImage(imgSpritesheet, imgFrameX * imgWidth, imgFrameY * imgHeight, imgWidth, imgHeight, imgCanvasX, imgCanvasY, imgWidth * scale, imgHeight * scale);

}




//draws the new canvas state
function draw() {
    //console.log("drawing a new frame")
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBackground(player.mapIndexX, player.mapIndexY);


 if (checkOnTile(pubFriend)) {
        drawCharacter(1, 2, pubFriend.x, pubFriend.y, pubFriend.spritesheet);
        drawCharacter(1, 2, pubFriend.x, pubFriend.y, pubFriendShirt.spritesheet);
        drawCharacter(1, 2, pubFriend.x, pubFriend.y, pubFriendPants.spritesheet);
        drawCharacter(1, 2, pubFriend.x, pubFriend.y, pubFriendShoes.spritesheet);

        if (pubFriend.specialTime == time) {
            //draws a crowd to make the busy time more realistic
            drawCharacter(4, 3, marketCrowd2.x, marketCrowd2.y, marketCrowd2.spritesheet);
            drawCharacter(4, 3, marketCrowd2.x, marketCrowd2.y, marketCrowdClothes.spritesheet);

            drawCharacter(4, 3, marketCrowd3.x, marketCrowd3.y, marketCrowd3.spritesheet);
            drawCharacter(4, 3, marketCrowd3.x, marketCrowd3.y, marketCrowdClothes.spritesheet);

            drawCharacter(4, 3, marketCrowd1.x, marketCrowd1.y, marketCrowd1.spritesheet);
            drawCharacter(4, 3, marketCrowd1.x, marketCrowd1.y, marketCrowdClothes.spritesheet);

        }

    }
if (checkOnTile(pubSign)) {
    ctx.drawImage(pubSign.spritesheet, pubSign.x, pubSign.y, pubSign.width, pubSign.height);
}
if (checkOnTile(pubSignObstacle)) {
    drawCharacter(1, 2, pubSignObstacle.x, pubSignObstacle.y, pubSignObstacle.spritesheet);
    drawCharacter(1, 2, pubSignObstacle.x, pubSignObstacle.y, pubSignObstacleClothes.spritesheet);
}

if (checkOnTile(travelFriend)) { 
    drawCharacter(1, 2, travelFriend.x, travelFriend.y, travelFriend.spritesheet);
    drawCharacter(1, 2, travelFriend.x, travelFriend.y, travelFriendShirt.spritesheet);
    drawCharacter(1, 2, travelFriend.x, travelFriend.y, travelFriendPants.spritesheet);
    drawCharacter(1, 2, travelFriend.x, travelFriend.y, travelFriendShoes.spritesheet);
    drawElement(travelFriendPet.width, travelFriendPet.height, 0, 0, travelFriendPet.x, travelFriendPet.y, travelFriendPet.spritesheet, 0.25 );
}

if (checkOnTile(blackSmithFriend)) {
    drawCharacter(1, 1, blackSmithFriend.x, blackSmithFriend.y, blackSmithFriend.spritesheet);
    drawCharacter(1, 1, blackSmithFriend.x, blackSmithFriend.y, blackSmithFriendShirt.spritesheet);
    drawCharacter(1, 1, blackSmithFriend.x, blackSmithFriend.y, blackSmithFriendPants.spritesheet);
    drawCharacter(1, 1, blackSmithFriend.x, blackSmithFriend.y, blackSmithFriendShoes.spritesheet);
}

    //draws player
    drawCharacter( walkIndex, playerDirection, player.x, player.y, player.spritesheet);
    drawCharacter( walkIndex, playerDirection, player.x, player.y, playerClothes.spritesheet);
    drawCharacter( walkIndex, playerDirection, player.x, player.y, playerShoes.spritesheet);


if (gameOver == "true") {
    ctx.fillStyle = "black";
        ctx.globalAlpha = (fadeOutCounter * 0.1);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
}

    //ctx.drawImage(chickenObj.spritesheet, chichenObj.x, chickenObj.y, chickenObj.width, chickenObj.height)

    
}

//returns true if the player is on the same tile as the object
function checkOnTile(object) {
    
    if (object.mapIndexX == player.mapIndexX && object.mapIndexY == player.mapIndexY && object.absenceTime != time) {
        return 1;
    }
    else {
        return 0;
    }
}

//draws the background of the tile the player is on.
function drawBackground(mapX, mapY) {
    if (mapX == 0 && mapY == 0) {
        drawElement(64, 64, 0, 0, 150, 150, campFireSprite, 1);
    }
    else if (mapX == 1 && mapY == 1){
        drawElement(128, 128, 0, 0, 200, 180, produceStall, 2)
        
        drawElement(128, 128, 1, 0, 20, 200, produceStall, 2)
    }
    else if (mapX == 0 && mapY ==2) {
        drawElement(128, 128, 0, 0, 100, 0, blacksmithStall, 2)
    }
    else if (mapX == 1 && mapY == 2) {
        drawElement(176, 176, 0, 1, 250, -100, houseWalls, 2);
        drawElement(176, 176, 0, 3, 250, -150, roofs, 2);
        drawElement(88, 90, 8, 4, 0, 0, houseWalls, 2);
        drawElement(80, 90, 8,6, 0, -30, roofs, 2);
    }


}



//the main gameloop
function gameloop() {

    if (gameOver == "false") {
        update();
    }
     
     draw();
     
    window.requestAnimationFrame(gameloop);
    
}

let gameOver = "false"
let fadeOutCounter = 0;

function endOfGame() {
    
    setInterval(() => {fadeOut()}, 1000);
    
}


function fadeOut() {
    gameOver = "true";
    
    if (fadeOutCounter <= 10) {
        
        fadeOutCounter ++;
    }
    else {
        showDialogue("EndOfGame", "none")
    }
    

}


window.requestAnimationFrame(gameloop); //calls the gameloop as long as the window is open


window.addEventListener('keydown', input);

window.addEventListener('keyup', input);