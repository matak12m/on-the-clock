let clockHand = document.getElementById("clockHand");
let clockContainer = document.getElementById("clockContainer");


clockContainer.addEventListener("mousedown", mouseDown);
clockContainer.addEventListener("mouseup", mouseUp)
clockHand.addEventListener("mouseover", preventRotation);
clockHand.addEventListener("mouseout", preventRotationStop)



let canRotate = 1;
let degrees = 0; //global so it can be read by the gameplay script.
let time = "morning";




//these two functions enable/disabe rotation of the clock hand.
function mouseDown() {
    clockContainer.addEventListener("mousemove", rotate);
}

function mouseUp() {
    clockContainer.removeEventListener("mousemove", rotate)
    let previousTime = time;
    determineTime();
    if (previousTime!=time) {

        if (previousTime == "morning") {
            if (time == "afternoon"){
                var timeDifference = 1;
            }
            else if (time == "evening") {
                var timeDifference = 2;
            }
            else if (time == "night") {
                var timeDifference = 3;
            }
        }
        if (previousTime == "afternoon") {
            if (time == "evening"){
                var timeDifference = 1;
            }
            else if (time == "night") {
                var timeDifference = 2;
            }
            else if (time == "morning") {
                var timeDifference = 3;
            }
        }
        if (previousTime == "evening") {
            if (time == "night"){
                var timeDifference = 1;
            }
            else if (time == "morning") {
                var timeDifference = 2;
            }
            else if (time == "afternoon") {
                var timeDifference = 3;
            }
        }
        if (previousTime == "night") {
            if (time == "morning"){
                var timeDifference = 1;
            }
            else if (time == "afternoon") {
                var timeDifference = 2;
            }
            else if (time == "evening") {
                var timeDifference = 3;
            }   
            
        }
        timeChange(timeDifference);
    }
}





//the coordinates from getAngleDegrees are from the element that the mouse is hovering over. if the mouse is over the clockHand, it would rotate it to the incorrect place. these functions prevent that.
function preventRotation() {
    canRotate = 0;
}

function preventRotationStop() {
    canRotate = 1;
}







//rotates the clockhand
function rotate() {

    if (canRotate == 1) {
        let rotateIndex = getAngleDegrees();

        clockHand.style.rotate = rotateIndex;
    }
  

    }

//calculates the angle the clockhand should be rotated to.
function getAngleDegrees() {
    const clockCenterX = 100;
    const clockCenterY = 100;

    let mouseX = event.offsetX;
    let mouseY = event.offsetY;

    if ((mouseX < 95 || mouseX > 105) && (mouseY < 95 || mouseY > 105)) { //prevents rapid jumping of the clock through moving through the center

        let deltaX = clockCenterX - mouseX;
        let deltaY = clockCenterY - mouseY;
        let radians = Math.atan2(deltaY, deltaX)
        degrees = ((radians * 180) / Math.PI) - 90;

        degrees = (degrees + 360) % 360;
    }
    //console.log('degrees:', {degrees })
    return degrees + "deg";
}


function determineTime(){
    if (degrees <  90){ 
        time = "morning";
    }
    else if (degrees < 180) {
        time =  "afternoon";
    }
    else if (degrees < 270) {
        time = "evening";
    }
    else {
        time = "night";
    }
    console.log(time);
    time.onchange = disappearTextBox("all");
}

//manages what happens when the time is changed
function timeChange(timeDifference) {

    pubFriend.mapIndexX = 1;
    pubFriend.mapIndexY = 1;


    for (i = 0; i <timeDifference; i++) {

        if (travelFriendNewX != travelFriend.mapIndexX || travelFriendNewY !=travelFriend.mapIndexY) { //the friend didnt move
            if (travelFriendNewX < 0 || travelFriendNewY< 0)
            {
                travelFriendWrongTile = "true";
                moveChickenBack();
            }
            else if ((travelFriendNewX == 2 && travelFriendNewY == 1) || (travelFriendNewX == 2 && travelFriendNewY == 0)   //checks if travelfriend is going onto a valid tile - a tile with no people, and if the player told them to move
                ||(travelFriendNewX == 1 && travelFriendNewY == 0) || (travelFriendNewX == 0 && travelFriendNewY == 0)) {

                    travelFriend.mapIndexX = travelFriendNewX;
                    travelFriend.mapIndexY = travelFriendNewY;
                    travelFriendWrongTile = "false";
                    
                }
            else {
                travelFriendWrongTile ="true";
                moveChickenBack();
            }
        }   
        else {

            travelFriendWrongTile ="true";
            moveChickenBack();
               
            }
        }

        travelFriendPet.mapIndexX = travelFriend.mapIndexX;
        travelFriendPet.mapIndexY = travelFriend.mapIndexY;
        
        
    

}




function moveChickenBack() {
    if (travelFriend.mapIndexX == 2 && travelFriend.mapIndexY == 2)
    {
        
        travelFriendNewX = travelFriend.mapIndexX;
        travelFriendNewY = travelFriend.mapIndexY;
        travelFriendWrongTile = "true";
    }
    else if (travelFriend.mapIndexX == 2) {

        travelFriend.mapIndexY ++;
        travelFriendNewX = travelFriend.mapIndexX;
        travelFriendNewY = travelFriend.mapIndexY;
        travelFriendWrongTile = "true";
    
    }
    else if (travelFriend.mapIndexY == 0){

        travelFriend.mapIndexX ++;
        travelFriendNewX = travelFriend.mapIndexX;
        travelFriendNewY = travelFriend.mapIndexY;
        travelFriendWrongTile = "true";
        
    }

}