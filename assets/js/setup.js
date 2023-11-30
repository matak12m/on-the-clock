//image and sprite setups

let chicken = new Image();
let parsnip = new Image();
let campFireSprite = new Image();
let SignSprite = new Image();
let produceStall = new Image();
let blacksmithStall = new Image();


//character spritesheets
let lightSkin = new Image();
let overalls = new Image();
let brownShoes = new Image();
let brownSkin = new Image();
let redShirt = new Image();
let darkBluePants = new Image();
let blackSkinIdle = new Image();



chicken.src = "assets/img/chicken.png"
parsnip.src = "assets/img/parsnip.png"

campFireSprite.src = "assets/img/Campfire.png"
SignSprite.src = "assets/img/Wood_Sign.png"

produceStall.src = "assets/img/commerce/marketplace/commerce_marketplace_stall.png"
blacksmithStall.src = "assets/img/commerce/gear/waepon_gear_stall.png"

lightSkin.src = "assets/img/character_walk_body_light.png"
overalls.src = "assets/img/character_walk_clothes_fullbody_overhalls_blue.png"
brownShoes.src = "assets/img/character_walk_clothes_shoes_brown.png"
brownSkin.src = "assets/img/character_walk_body_brown.png"

redShirt.src = "assets/img/character_walk_clothes_chest_colored_shirt_red.png"

darkBluePants.src = "assets/img/character_walk_clothes_legs_pants_blue_dark.png"
blackSkinIdle.src = "assets/img/character/adult/idle/character_body/character_idle_body_black.png"








//game objects setups



//function that holds data about all game objects regarding how theyre drawn, as well as some data that the game logic relies on
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



let player = new GameObject("player", brownSkin, 5, 5, 64, 64, 0, 0);
let playerClothes = new GameObject("playerClothes", overalls)
let playerShoes = new GameObject("playerShoes", brownShoes)

let pubFriend = new GameObject("pubFriend", lightSkin, 220, 300, 64, 64, 1, 1, "night", "morning");
let pubFriendShirt = new GameObject("pubFriendShirt", redShirt);
let pubFriendPants = new GameObject("pubFriendPants", darkBluePants);
let pubFriendShoes = new GameObject("pubFriendShoes", brownShoes);

let marketCrowd1 = new GameObject("marketCrowd1", brownSkin, 200, 354, 64, 64, 1, 1)
let marketCrowd2 = new GameObject("marketCrowd2", lightSkin, 236, 327, 64, 64, 1, 1)
let marketCrowd3 = new GameObject("marketCrowd3", lightSkin, 304, 311, 64, 64, 1, 1)
let marketCrowdClothes = new GameObject("marketCrowdClothes", overalls)

let pubSign = new GameObject("pubSign", SignSprite, 100, 300, 64, 64, 1, 2, "none", "night");
let pubSignObstacle = new GameObject("pubSignObstacle", lightSkin, 150, 100, 64, 64, 1, 2, "night");
let pubSignObstacleClothes = new GameObject("pubSignObstacleClothes", overalls)

let travelFriend = new GameObject("travelFriend", blackSkinIdle, 350, 350, 64, 64, 2, 2, "none", "none")
let travelFriendShirt = new GameObject("travelFriendShirt", redShirt)
let travelFriendPants = new GameObject("travelFriendPants",darkBluePants)
let travelFriendShoes = new GameObject("travelFriendShoes", brownShoes)

let travelFriendPet = new GameObject("travelFriendPet", chicken, 350, 375, 180, 180, 2, 2, "none", "none");

let blackSmithFriend = new GameObject("blackSmithFriend", lightSkin, 240, 75, 64, 64, 0, 2, "morning", "none");
let blackSmithFriendShirt = new GameObject("balckSmithFriendClothes", redShirt);
let blackSmithFriendPants = new GameObject("balckSmithFriendClothes", darkBluePants);
let blackSmithFriendShoes = new GameObject("balckSmithFriendClothes", brownShoes);



//getting elements by ID
let clockHand = document.getElementById("clockHand");
let clockContainer = document.getElementById("clockContainer");

let textContainer = document.getElementById("textContainer") 
let mainTextBox = document.getElementById("mainTextBox")


let textChoice1 = document.getElementById("textChoice1")
let textChoice2 = document.getElementById("textChoice2")
let textChoice3 = document.getElementById("textChoice3")
let controlsBox = document.getElementById("controls")
let closeControlsButton = document.getElementById("close-button")