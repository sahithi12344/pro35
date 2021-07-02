var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database,position
var background1,bg,birdImg,birdGroup,bird1
var sword 
var swordG,swordGroup
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
   birdImg = loadImage("flight.png");
  }

//Function to set initial environment


function setup() {
  database=firebase.database();
  createCanvas(1200,600);

  background1  = createSprite(0,0,1200,600)
  background1.addImage(bg)
  background1.velocityX=2
  
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  ballonpos = database.ref('balloon/height')
  ballonpos.on("value",readHeight,showError)

//swordGroup=new Group();


}

// function to display UI

function draw() {
  background("white");

  if (background1.x < 0){
    background1.x = background1.width/2;
  }


   if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  
  }drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
 
}



function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x' : height.x + x ,
    'y' : height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("error in your codes/ error in data base");
}
