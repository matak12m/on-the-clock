let clockHand = document.getElementById("clockHand");
let clockContainer = document.getElementById("clockContainer");


clockContainer.addEventListener("mousedown", mouseDown);
clockContainer.addEventListener("mouseup", mouseUp)


//these two functions enable/disabe rotation of the clock hand.
function mouseDown() {
    clockContainer.addEventListener("mousemove", rotate);
}

function mouseUp() {
    clockContainer.removeEventListener("mousemove", rotate)
}


//calculates the angle for the clockhand to rotate to, and rotates it.
function rotate() {
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;
    const clockCenterX = 100;
    const clockCenterY = 100;

    let difX = mouseX - clockCenterX;

    let y = Math.sin(difX) * Math.cos(clockCenterY);
    let x = Math.cos(mouseY) * Math.sin(clockCenterY) - Math.sin(mouseY) * Math.cos(clockCenterY) * Math.cos(difX);

    let angle = Math.atan2(y, x);

    console.log(angle);


    }
    

