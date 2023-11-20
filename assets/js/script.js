const canvas = document.getElementById("the_canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
ctx.imageSmoothingEnabled = false;  //makes the pixelart assets crisp









//function that holds data about all game objects regarding how theyre drawn
function GameObject(name, spritesheet, x, y, width, height, mapIndexX, mapIndexY, absenceTime, specialTime){
    this.name = name;
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mapIndexX = mapIndexX;
    this.mapIndexY = mapIndexY;
    this.absenceTime = absenceTime;
    this.specialTime = specialTime;

}



let chicken = new Image();
let parsnip = new Image();
chicken.src = "assets/img/chicken.png"
parsnip.src = "assets/img/parsnip.png"


let player = new GameObject("player", chicken, 5, 5, 64, 64, 0, 0, 0);
let pubFriend = new GameObject("pubFriend", chicken, 220, 300, 64, 64, 1, 0, "night", "afternoon");
let pubSign = new GameObject("pubSign", parsnip, 150, 300, 64, 64, 1, 2, "none", "night");
let pubSignObstacle = new GameObject("pubSignObstacle", chicken, 250, 300, 64, 64, 1, 2, "night");

let interactArray = [pubFriend, pubSign, pubSignObstacle];


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

    if (gamerInput != "None"){
    manageInput();
    }
    

    if (player.x <5 || player.y<5 || player.x + player.width >= canvas.width || player.y + player.height >= canvas.height ){  //checks for collision with canvas sides
        switchMapTile();
    }
 
    
    

}








function manageInput() {
    if (gamerInput.action === "Up" && player.y > 0) {    //moves the player, changes the direction, which is used for animating the farmer, and upticks framecount if the player is moving

        player.y -= 5;
        playerDirection = 2;
        frameCount++;
        player.y.onchange = disappearTextBox(true);
    } else if (gamerInput.action === "Down" && player.y + player.height < canvas.height) {

        player.y += 5;
        playerDirection = 0;
        frameCount++;
        player.y.onchange = disappearTextBox(true);
    } else if (gamerInput.action === "Left" && player.x > 0) {

        player.x -= 5;
        playerDirection = 1;
        frameCount++;
        player.x.onchange = disappearTextBox(true);
    } else if (gamerInput.action === "Right" && player.x + player.width < canvas.width) {

        player.x += 5;
        playerDirection = 3;
        frameCount++;
        player.x.onchange = disappearTextBox(true);
    } 
    else if(gamerInput.action === "Interact") {
        for (i = 0; i < interactArray.length; i++){
            if (interactArray[i].mapIndexX == player.mapIndexX && interactArray[i].mapIndexY == player.mapIndexY && isCollide(interactArray[i], player) && interactArray[i].absenceTime != time ) {
                interact(interactArray[i]);
                break;
            }
        }
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
    if (player.x < 5 && player.mapIndexX > 0) {
        player.x = canvas.width - (player.width +10);
        player.mapIndexX--;
    }
    else if (player.x + player.width >= canvas.width && player.mapIndexX < 2) {
        player.x = 10;
        player.mapIndexX++;
    }
    else if (player.y < 5 && player.mapIndexY > 0) {
        player.y = canvas.height - (player.height + 10);
        player.mapIndexY--;
    }
    else if (player.y + player.height >= canvas.height && player.mapIndexY < 2) {
        player.y = 10;
        player.mapIndexY++;
    }



    console.log(player.mapIndexX, player.mapIndexY)
    
}





//draws the new canvas state
function draw() {
    //console.log("drawing a new frame")
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBackground(player.mapIndexX, player.mapIndexY);


 if (checkOnTile(pubFriend)) {
        ctx.drawImage(pubFriend.spritesheet, pubFriend.x, pubFriend.y, pubFriend.width, pubFriend.height);
    }
if (checkOnTile(pubSign)) {
    ctx.drawImage(pubSign.spritesheet, pubSign.x, pubSign.y, pubSign.width, pubSign.height);
}
if (checkOnTile(pubSignObstacle)) {
    ctx.drawImage(pubSignObstacle.spritesheet, pubSignObstacle.x, pubSignObstacle.y, pubSignObstacle.width, pubSignObstacle.height);
}


    
    ctx.drawImage(player.spritesheet, player.x, player.y, player.width, player.height);

   
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
        ctx.drawImage(parsnip, 200, 200, 40, 40);
    }



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