let mobileButton = document.getElementById("mobileButton")
let browserButton = document.getElementById("browserButton")


mobileButton.addEventListener("click", goToMobile);
browserButton.addEventListener("click", gotoBrowser);

function goToMobile() {
    window.location.replace("mobileGameplay.html");
}

function gotoBrowser () {
    window.location.replace("browserGameplay.html");
}