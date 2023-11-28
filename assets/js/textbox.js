


let textContainer = document.getElementById("textContainer") 
let mainTextBox = document.getElementById("mainTextBox")

let textChoice1 = document.getElementById("textChoice1")
let textChoice2 = document.getElementById("textChoice2")
let textChoice3 = document.getElementById("textChoice3")
let controlsBox = document.getElementById("controls")
let closeControlsButton = document.getElementById("close-button")


closeControlsButton.addEventListener("click", () => { closeControls() })


function closeControls() {
    controlsBox.style.visibility = "hidden";
    closeControlsButton.style.visibility = "hidden";

}



let dialogueArray = [];




//handles the textbox visibility and its contents

function showDialogue(name, isAtCampfire, specialTime) {



    



    
    mainTextBox.style.visibility = "visible";
    textChoice1.style.visibility = "hidden";
    textChoice2.style.visibility = "hidden";
    textChoice3.style.visibility = "hidden";
   
    //pub friend textboxes
    if (name == "pubFriend"){
        if (!isAtCampfire && time == specialTime) {
        appearTextBox(0, name, specialTime);

        mainTextBox.textContent = "Hey there! sorry, but I'm busy right now. The pub is full of customers!";
            


        }
        else if(!isAtCampfire && time != specialTime)  {
        appearTextBox(2, name, specialTime);

        mainTextBox.textContent = "Hey there! I have some free time right now. not a lot of customers.";
        textChoice1.textContent = "come to the campfire!";
        textChoice3.textContent = "see you later.";


        }
        else {
            appearTextBox(0, name, specialTime);
            mainTextBox.textContent = "I wonder what the others are doing. haven't seen any of them in the pub lately.";
        }

    }

    //text for the pub sign, which relates to the pub friends schedule
    if (name == "pubSign") {

        if (time == specialTime){
            appearTextBox(3, name, specialTime)

            mainTextBox.textContent = "the sign advertises meals for the " + pubFriend.specialTime + ". There is an eraser and chalk...";
            textChoice1.textContent = "advertise breakfasts";
            textChoice2.textContent = "advertise afternoon tea";
            textChoice3.textContent = "advertise dinners";
            
        }
        else {
            appearTextBox(0, name, specialTime)
            mainTextBox.textContent = "the sign advertises for the " + pubFriend.specialTime + ". there is an eraser and chalk, but someone's watching.";
        }
    }

    if (name == "pubSignObstacle") {
        appearTextBox(0, name, specialTime)
        mainTextBox.textContent = "Well met, stranger!";
    }

}



//makes the aappropriate amount of options visible
function appearTextBox(options, name, specialTime) {
    switch(options){
        
        case 0: {
        textContainer.style.visibility = "visible";
        textChoice1.style.visibility = "hidden";
        textChoice2.style.visibility = "hidden";
        textChoice3.style.visibility = "hidden";
        console.log("no options")
        break;
        }
        
        case 1: {
        textContainer.style.visibility = "visible";
        textChoice1.style.visibility = "hidden";
        textChoice2.style.visibility = "visible";
        textChoice3.style.visibility = "hidden";
        console.log("1 options")

        textChoice2.addEventListener("click", () => {  choice2(name, specialTime) });
        }
        break;

        case 2: {
        textContainer.style.visibility = "visible";
        textChoice1.style.visibility = "visible";
        textChoice2.style.visibility = "hidden";
        textChoice3.style.visibility = "visible";
        console.log("2 options")

        textChoice1.addEventListener("click", () => {  choice1(name, specialTime) });
        textChoice3.addEventListener("click", () => {  choice3(name, specialTime) });
        }
        break;

        case 3: {
        textContainer.style.visibility = "visible";
        textChoice1.style.visibility = "visible";
        textChoice2.style.visibility = "visible";
        textChoice3.style.visibility = "visible";
        console.log("3 options")

        
        textChoice1.addEventListener("click", () => { choice1(name, specialTime) });
        textChoice2.addEventListener("click", () => { choice2(name, specialTime) });
        textChoice3.addEventListener("click", () => { choice3(name, specialTime) });
        }
        break;
        
        
        

}
}






//handles getting rid of the textbox elements



//bug: for some reason the first if in this function always executes, even if the passed value is different
function disappearTextBox(disappearThis) {
    switch(disappearThis){
        case "onlyChoices":

    
    textChoice1.style.visibility = "hidden";
    textChoice2.style.visibility = "hidden";
    textChoice3.style.visibility = "hidden";
    console.log("disappearing choices")
    break;

        case "all":
    textContainer.style.visibility = "hidden";
    mainTextBox.style.visibility = "hidden";
    textChoice1.style.visibility = "hidden";
    textChoice2.style.visibility = "hidden";
    textChoice3.style.visibility = "hidden";
    console.log("disappearing whole textbox")
    break;

    
    }
}





function choice1(name, specialTime){
    console.log("selected choice 1")
    switch(name){
        case "pubFriend":
            disappearTextBox("onlyChoices");
            mainTextBox.textContent = "alright, see you there!"
            pubFriend.mapIndexX = 0;
            pubFriend.mapIndexY = 0;
            break;

        case "pubSign":
                    
            disappearTextBox("onlyChoices");
            mainTextBox.textContent = "you changed the advertisements. People should notice tomorrow."
            pubFriend.specialTime = "morning"

            break;
    }

 

}
function choice2(name, specialTime){
    console.log("selected choice 2")
    switch(name){
        case "pubSign":
        disappearTextBox("onlyChoices");
            mainTextBox.textContent = "you changed the advertisements. People should notice tomorrow."
            pubFriend.specialTime = "afternoon"

    }

    
}
function choice3(name, specialTime){
    console.log("selected choice 3")
    switch(name){
        case "pubSign":
        disappearTextBox("onlyChoices");
            mainTextBox.textContent = "you changed the advertisements. People should notice tomorrow."
            pubFriend.specialTime = "evening"

    }

}


