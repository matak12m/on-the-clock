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
    determineTime();
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


