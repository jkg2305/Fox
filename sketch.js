var PLAY = 1;
var END = 0;
var gameState = PLAY;

 var ground,groundImage;
var fox ,foxImage;
//var jumpSound;
 var obstacle,obstacleImage;
var coin ,coinImage;
var background,backgroundImg
 var restart,restartImage,reset;

function preload(){
 
 groundImage=loadImage("ground2.png") ;
 foxImage=loadImage("fox.png"); 
 obstacleImage=loadImage("obstacle.png"); 
 coinImage=loadImage("coin.png"); 
 backgroundImg=loadImage("14031728.jpg") 
restartImage=loadImage("restart.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  background=createSprite(width-10,300,400,400);
  background.addImage("background",backgroundImg)
 background.x = background.width/2; 
  
  ground = createSprite(width/2,height-10,width,125);
 ground.addImage("ground",groundImage);
  
 fox=createSprite(60,height-330,20,20); 
 fox.addImage(foxImage); 
  fox.scale=0.1;
  
 //Score variables and Groups 
  score=0;
  CoinGroup=createGroup();
  ObstacleGroup=createGroup(); 
  
  restart=createSprite(200,200,20,20);
  restart.addImage(restartImage);
  
  
console.log("Hello" + 5);
  

  score = 0;
  
}

function draw() {
  
 // background("green");
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is message ",gameState)
  
  
  if(gameState === PLAY){
  //  gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -(2+2*score/100);
    //scoring
    score = score + Math.round(frameCount/60);
    
     if(touches.lenth > 0 ||keyDown("SPACE")&& fox.y  >= height-120) { 
        fox.velocity= -12;
        touches =[];
        } 
       
     //add gravity
    fox.velocityY = fox.velocityY + 0.8  
       
       
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& fox.y >= 100) {
        fox.velocityY = -12;
      
    }
    
   
  
  fox.collide(ground);
    
  
    
  if(ObstacleGroup.isTouching(fox)){
  gameState = END;
 }
    
    if(CoinGroup.isTouching(fox)){
    score=score+1;
    
  }  
   
  
    
    
    
  }
   else if (gameState === END) {
     console.log("hey")
    
      restart.visible = true;
     
      ground.velocityX = 0;
      
     
    
      //set lifetime of the game objects so that they are never destroyed
   ObstacleGroup.setLifetimeEach(-1);
    CoinGroup.setLifetimeEach(-1);
     
     ObstacleGroup.setVelocityXEach(0);
     CoinGroup.setVelocityXEach(0);    
   
         
     
   }   
   
  
 
 
  
  //spawn obstacles on the ground
    spawnObstacle();
  
 //spawn coin on the ground
    spawncoin(); 
  
  
  fox.setCollider("rectangle",0,0,fox.width,fox.height);
  fox.debug =false; 
  
  if(mousePressedOver(restart)) {
      reset();
    } 
  
  drawSprites()
}


 function spawnObstacle() {
  //write code here to create a banana
  if (frameCount % 250 === 0){
    var obstacle = createSprite(400,350,40,10);
    obstacle .addImage( obstacleImage);
    obstacle .scale = 0.1;
    obstacle .velocityX =- 1;
    
    //generate random obstacles
    var rand = Math.round(random(1));

obstacle.scale = 0.1;
    obstacle.lifetime = 360;
ObstacleGroup.add(obstacle);
  } 
 }

function spawncoin() {
  //write code here to create a banana
  if (frameCount % 150 === 0){
    var coin = createSprite(400,100,40,10);
    coin .addImage( coinImage);
    coin .scale = 0.1;
    coin .velocityX =- 1;
    
    //generate random obstacles
    var rand = Math.round(random(1));

coin.scale = 0.1;
    coin.lifetime = 360;
CoinGroup.add(coin);
  } 
 }

function reset(){
gameState=PLAY;  
//gameOver.visible=false;
restart.visible=false; 
 CoinGroup.destroyEach();
 ObstacleGroup.destroyEach();
//  fox=createSprite(60,height-330,20,20);
   fox.addImage("running",foxImage);
  fox.scale=0.1;
  score=0;
}
