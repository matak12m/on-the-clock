let textContainer = document.getElementById("textContainer") 
let mainTextBox = document.getElementById("mainTextBox")
let textChoice1 = document.getElementById("textChoice1")
let textChoice2 = document.getElementById("textChoice2")
let textChoice3 = document.getElementById("textChoice3")

let objectName;

let dialogueArray = [];


//handles the textbox visibility and its contents

function showDialogue(name, isAtCampfire) {

    objectName = name;


    textContainer.style.visibility = "visible";
    mainTextBox.style.visibility = "visible";
    textChoice1.style.visibility = "visible";
    textChoice2.style.visibility = "visible";
    textChoice3.style.visibility = "visible";


    

    if (name == "pubFriend" && !isAtCampfire) {
        mainTextBox.textContent = "Hello there! When should I go to the campfire?"
        textChoice1.textContent = "Afternoon"
        textChoice2.textContent = "Evening"
        textChoice3.textContent = "Night"

    }
    

    textChoice1.addEventListener("click", choice1());
    textChoice2.addEventListener("click", choice2());
    textChoice3.addEventListener("click", choice3());



}


function choice1(){
    switch(objectName){
        case "pubFriend":
            //do stuff
            
    }

}
function choice2(){


}
function choice3(){


}