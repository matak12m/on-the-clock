





closeControlsButton.addEventListener("click", () => { closeControls() })



let choice1Listener;
let choice2Listener;
let choice3Listener;

function closeControls() {
    controlsBox.style.visibility = "hidden";
    closeControlsButton.style.visibility = "hidden";

}



let dialogueArray = [];

let objectName;
let specialTime;
let blackSmithDialogueCount = 0;

textChoice1.addEventListener("click", () => { choice1(objectName, specialTime) });
textChoice2.addEventListener("click", () => { choice2(objectName, specialTime) });
textChoice3.addEventListener("click", () => { choice3(objectName, specialTime) });

//handles the textbox visibility and its contents

let travelFriendWrongTile = "default";
let travelFriendStarted = "false";

function showDialogue(passedName, isAtCampfire, passedSpecialTime) {

    objectName = passedName;
    specialTime = passedSpecialTime;

    



    textContainer.style.visibility = "visible";
    mainTextBox.style.visibility = "visible";
    textChoice1.style.visibility = "hidden";
    textChoice2.style.visibility = "hidden";
    textChoice3.style.visibility = "hidden";
   
    //pub friend textboxes
    if (objectName == "pubFriend"){
        if (!isAtCampfire && time == specialTime) {
        appearTextBox(0, objectName, specialTime);

        mainTextBox.textContent = "Hey there! sorry, but I'm busy right now. The market is full of customers!";
            


        }
        else if(!isAtCampfire && time != specialTime)  {
        appearTextBox(2, objectName, specialTime);

        mainTextBox.textContent = "Hey there! I have some free time right now. not a lot of people around";
        textChoice1.textContent = "come to the campfire!";
        textChoice3.textContent = "see you later.";


        }
        else {
            appearTextBox(0, objectName, specialTime);
            mainTextBox.textContent = "I wonder what the others are doing. haven't seen any of them in the market lately.";
        }

    }

    //text for the pub sign, which relates to the pub friends schedule
    if (objectName == "pubSign") {

        if (time == specialTime){
            appearTextBox(3, objectName, specialTime)

            mainTextBox.textContent = "the sign advertises market sales for the " + pubFriend.specialTime + ". There is an eraser and chalk...";
            textChoice1.textContent = "advertise morning bread";
            textChoice2.textContent = "advertise afternoon shipment";
            textChoice3.textContent = "advertise evening sellout";
            
        }
        else {
            appearTextBox(0, objectName, specialTime)
            mainTextBox.textContent = "the sign advertises for the " + pubFriend.specialTime + ". there is an eraser and chalk, but someone's watching.";
        }
    }

    if (objectName == "pubSignObstacle") {
        appearTextBox(0, objectName, specialTime)
        mainTextBox.textContent = "Well met, stranger!";
    }
    if (objectName == "travelFriendPet") { 
    appearTextBox(0, objectName, specialtime)
        mainTextBox.textContent = "Bok Bok"

    }

    //travelfriend textboxes
    if (objectName == "travelFriend") {
        if (travelFriendStarted = "false") {
        
            
        if (dialogueCount == 0){
            appearTextBox(1, objectName, specialTime)
            dialogueCount++;
        mainTextBox.textContent = "Hey, the wizard turned my chicken giant!"
        textChoice2.textContent = "continue"
        }
        else if (dialogueCount == 1){
            appearTextBox(1, objectName, specialTime)
            dialogueCount++;
        mainTextBox.textContent = " I need to lead it to the campfire if we want to have that roast."
        textChoice2.textContent = "continue"
        
        }
        else if (dialogueCount == 2){
            appearTextBox(1, objectName, specialTime)
            dialogueCount++;
        mainTextBox.textContent = "I think it knows what's going on, it keeps escaping and coming here."
        textChoice2.textContent = "continue"
        
        }
        else if (dialogueCount == 3){
            appearTextBox(1, objectName, specialTime)
            dialogueCount++;
        mainTextBox.textContent = "It's also scared of strangers, so i can't take it through the town "
        textChoice2.textContent = "continue"
        }
        else if (dialogueCount > 3) {
            choice2(objectName, specialTime)
        }
        else if (travelFriendWrongTile == "false"){
        appearTextBox(3, objectName, specialTime)
        mainTextBox.textContent = "I managed to get it over here. Where should I go next?"
        }

        else if (travelFriendWrongTile == "true") {
            appearTextBox(3, objectName, specialTime)
            mainTextBox.textContent = "the blasted thing got scared and ran away here."
        }
        else if (travelFriendWrongTile == "onPurpose") {
            appearTextBox(3, objectName, specialTime)
            mainTextBox.textContent = "Well, I followed the chicken here. What should I do next?"
        }
        }
        else if (travelFriendStarted=="true"){
            dialogueCount = 4;
            if (travelFriendWrongTile == "false"){
            
                appearTextBox(3, objectName, specialTime)
                mainTextBox.textContent = "I managed to get it over here. Where should I go next?"
                }
        
                else if (travelFriendWrongTile == "true") {
                    
                    appearTextBox(3, objectName, specialTime)
                    mainTextBox.textContent = "the blasted thing got scared and ran away here."
                }
                else if (travelFriendWrongTile == "onPurpose") {
                    
                    appearTextBox(3, objectName, specialTime)
                    mainTextBox.textContent = "Well, I followed the chicken here. What should I do next?"
                }
            }
    }

    if (objectName == "blackSmithFriend") {

        console.log(blackSmithFriend.specialTime)
            if (!isAtCampfire && time != specialTime){
                if (blackSmithDialogueCount == 0) {
                appearTextBox(1, objectName, specialTime);

                mainTextBox.textContent = "Oh hi. I can't really talk now, I'm behind on my work.";
                textChoice2.textContent = "Do you want me to help?"
                }
                else if (blackSmithDialogueCount == 1){
                    mainTextBox.textContent = "Thanks, I'l just finish up real quick."
                }
        
            } 
            else if(!isAtCampfire)  {
                appearTextBox(2, objectName, specialTime);
        
                mainTextBox.textContent = "Thanks again for helping me. I guess I can hang out for a bit. ";
                textChoice1.textContent = "come to the campfire!";
                textChoice3.textContent = "see you later.";
        
        
                }
                else if (isAtCampfire) {
                    appearTextBox(0, objectName, specialTime);
                    mainTextBox.textContent = "I guess it's been a while. Had too much work lately.";
                }
    }
    else if (objectName == "blackSmithMaster" && specialTime == time) {
        appearTextBox(0, objectName, specialTime) 
            mainTextBox.textContent = "Are you looking for your friend? He's still asleep. He was working late into the night.";
        
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

        }
        break;

        case 2: {
        textContainer.style.visibility = "visible";
        textChoice1.style.visibility = "visible";
        textChoice2.style.visibility = "hidden";
        textChoice3.style.visibility = "visible";
        console.log("2 options")

        }
        break;

        case 3: {
        textContainer.style.visibility = "visible";
        textChoice1.style.visibility = "visible";
        textChoice2.style.visibility = "visible";
        textChoice3.style.visibility = "visible";
        console.log("3 options")

        
        }
        break;

}
}






//handles getting rid of the textbox elements

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




let dialogueCount = 0;
let travelFriendNewX = 2;
let travelFriendNewY = 2;



function choice1(objectName, specialTime){
    console.log("selected choice 1")
    switch(objectName){
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
        case "travelFriend":
            if (dialogueCount == 5) {
                disappearTextBox("onlyChoices");
                mainTextBox.textContent = "alright, I can do that. just give me some time. I'm not sure I can hold it in one place for long, though..."
                travelFriendNewY--;
                
                
        console.log(travelFriend.mapIndexX + " " + travelFriendNewX)
        console.log(travelFriend.mapIndexY + " " + travelFriendNewY)
                
            }
            break;
        case "blackSmithFriend":
            disappearTextBox("onlyChoices");
            mainTextBox.textContent = "heading there now."
            blackSmithFriend.mapIndexX = 0;
            blackSmithFriend.mapIndexY = 0;
            break;
    }
        

 

}
function choice2(objectName, specialTime){
    console.log("selected choice 2")
    switch(objectName){
        case "pubSign":
        disappearTextBox("onlyChoices");
            mainTextBox.textContent = "you changed the advertisements. People should notice tomorrow."
            pubFriend.specialTime = "afternoon"
            break;

        case "travelFriend":

            if (dialogueCount == 1){
                dialogueCount++;
            mainTextBox.textContent = " I need to lead it to the campfire if we want to have that roast."
            textChoice2.textContent = "continue"
            
            }
            else if (dialogueCount == 2){
                dialogueCount++;
            mainTextBox.textContent = "I think it knows what's going on, it keeps escaping and coming here."
            textChoice2.textContent = "continue"
            
            }
            else if (dialogueCount == 3){
                dialogueCount++;
            mainTextBox.textContent = "It's also scared of strangers, so i can't take it through the town "
            textChoice2.textContent = "continue"
            
            }


            else if (dialogueCount == 4){
                appearTextBox(3, objectName, specialTime);
                blackSmithDialogueCount++;
                
                if (travelFriendWrongTile == "default") {
                    mainTextBox.textContent = "Anyways, tell me where to go. I can't see what's ahead."
                }
                travelFriendStarted = "true";
                textChoice1.textContent = "Go North"
                textChoice2.textContent = "Go West"
                textChoice3.textContent = "Go back"
               
            }
            else if (dialogueCount == 5) {
                disappearTextBox("onlyChoices")
                mainTextBox.textContent = "alright, I can do that. just give me some time. I'm not sure I can hold it in one place for long, though..."
                travelFriendNewX--;
                
                
                
        console.log(travelFriend.mapIndexX + " " + travelFriendNewX)
        console.log(travelFriend.mapIndexY + " " + travelFriendNewY)
                
                
            }
            break;


        case "blackSmithFriend":
            if (blackSmithDialogueCount == 0) {
                appearTextBox(1, objectName, specialTime);
                blackSmithDialogueCount = 1;
                mainTextBox.textContent = "oh, um. sure, if you're free. here, hold this..."
                textChoice2.textContent = "continue"
                if (time == "afternoon"){
                    blackSmithFriend.specialTime = "evening"
                }
                else if (time == "evening") {
                    blackSmithFriend.specialTime = "night"
                }
                else if (time == "night") {
                    blackSmithFriend.specialTime = "afternoon"
                }
                else {
                    console.log("ERROR at black smith friend specialTime determination!")
                }
            }
            else if (blackSmithDialogueCount == 1){
                disappearTextBox("onlyChoices")
                mainTextBox.textContent = "Thanks, I'l just finish up real quick."

                
            }
    }

    
}
function choice3(objectName, specialTime){
    console.log("selected choice 3")
    switch(objectName){
        case "pubSign":
        disappearTextBox("onlyChoices");
            mainTextBox.textContent = "you changed the advertisements. People should notice tomorrow."
            pubFriend.specialTime = "evening"
            break;

        case "travelFriend":
            if (dialogueCount == 5) {
                disappearTextBox("onlyChoices");
                mainTextBox.textContent = "alright, I can do that. just give me some time. I'm not sure I can hold it in one place for long, though..."
                travelFriendWrongTile = "onPurpose"
                
                
        console.log(travelFriend.mapIndexX + " " + travelFriendNewX)
        console.log(travelFriend.mapIndexY + " " + travelFriendNewY)
                

                }
            break;
    }



}




