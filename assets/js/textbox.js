


let textContainer = document.getElementById("textContainer") 
let mainTextBox = document.getElementById("mainTextBox")
let textChoice1 = document.getElementById("textChoice1")
let textChoice2 = document.getElementById("textChoice2")
let textChoice3 = document.getElementById("textChoice3")

let objectName;

let dialogueArray = [];




//handles the textbox visibility and its contents

function showDialogue(name, isAtCampfire, specialTime) {



    

    objectName = name;


    
    mainTextBox.style.visibility = "visible";
   
    //pub friend textboxes
    if (name == pubFriend){
        if (!isAtCampfire && time == specialTime) {
        appearTextBox(0)

        mainTextBox.textContent = "Hey there! sorry, but I'm busy right now. The pub is full of customers!";



        }
        else if(!isAtCampfire && time != specialTime)  {
        appearTextBox(2)

        mainTextBox.textContent = "Hey there! I have some free time right now. not a lot of customers.";
        textChoice1.textContent = "come to the campfire!";
        textChoice3.textContent = "see you later.";


        }
        else {
            appearTextBox(0)
            mainTextBox.textContent = "I wonder what the others are doing. haven't seen any of them in the pub lately.";
        }

    }

    //text for the pub sign, which relates to the pub friends schedule
    if (name == pubSign) {

        if (time == specialTime){
            appearTextBox(3)

            mainTextBox.textContent = "the sign advertises meals for the " + pubFriend.specialTime + ". There is an eraser and chalk...";
            textChoice1.textContent = "advertise breakfasts";
            textChoice2.textContent = "advertise afternoon tea";
            textChoice3.textContent = "advertise dinners";
            
        }
        else {
            appearTextBox(0)
            mainTextBox.textContent = "the sign advertises for the " + pubFriend.specialTime + ". there is an eraser and chalk, but someone's watching.";
        }
    }

    if (name == pubSignObstacle) {
        appearTextBox(0)
        mainTextBox.textContent = "Well met, stranger!";
    }


   // textChoice1.addEventListener("click", choice1(name, specialTime));
    //textChoice2.addEventListener("click", choice2(name, specialTime));
    //textChoice3.addEventListener("click", choice3(name, specialTime));



}



//makes the aappropriate amount of options visible
function appearTextBox(options) {
    if (options == 3) {
        textContainer.style.visibility = "visible";
        textChoice1.style.visibility = "visible";
        textChoice2.style.visibility = "visible";
        textChoice3.style.visibility = "visible";
    }
    else if (options == 2) {
        textContainer.style.visibility = "visible";
        textChoice1.style.visibility = "visible";
        textChoice3.style.visibility = "visible";
    }
    else if (options == 1) {
        textContainer.style.visibility = "visible";
        textChoice2.style.visibility = "visible";
        }
    else if (options == 0) {
        textContainer.style.visibility = "visible";

    }
}






//handles getting rid of the textbox elements
function disappearTextBox(all) {
    if(all = true) {
    textContainer.style.visibility = "hidden";
    mainTextBox.style.visibility = "hidden";
    textChoice1.style.visibility = "hidden";
    textChoice2.style.visibility = "hidden";
    textChoice3.style.visibility = "hidden";
    }
    else if (all = "onlyChoices") {
    textChoice1.style.visibility = "hidden";
    textChoice2.style.visibility = "hidden";
    textChoice3.style.visibility = "hidden";

    }
    console.log("disappearing textbox")
}





function choice1(name, specialTime){
    switch(name){
        case "pubFriend":
            disappearTextBox("onlyChoices");
            mainTextBox.textContent = "alright, see you there!"
            pubFriend.mapIndexX = 0;
            pubFriend.mapIndexY = 0;

        case "pubSign":
                    
            disappearTextBox("onlyChoices");
            mainTextBox.textContent = "you changed the advertisements. People should notice tomorrow."
            pubFriend.specialTime = "morning"
    }


}
function choice2(name, specialTime){
    switch(name){
        case "pubSign":
        disappearTextBox("onlyChoices");
            mainTextBox.textContent = "you changed the advertisements. People should notice tomorrow."
            pubFriend.specialTime = "afternoon"

    }

}
function choice3(name, specialTime){
    switch(name){
        case "pubSign":
        disappearTextBox("onlyChoices");
            mainTextBox.textContent = "you changed the advertisements. People should notice tomorrow."
            pubFriend.specialTime = "evening"

    }

}



//bug: choices execute automatically without input from the player. 
//intended input - clicking on the respective choice box

//bug: the text isnt changing in the textboxes. 