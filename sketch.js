var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImage, obstacle, obstaceImage;
var foodGroup, obstacleGroup;
var score, survivalTime;
var gameOver, gameOverImg;
var monkey;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  gameOverImg = loadImage("gameOver.png");
  monkey = loadImage("Monkey_08.png");

  FoodGroup= new Group();
  obstacleGroup= new Group();
}

function setup() {
  createCanvas(800,400);

  score = 0;
  survivalTime=0;
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-2;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,380,800,6);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale  = 0.5;
  gameOver.visible=false;
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  ground.velocityX = -2;
  ground.x = ground.width/2;
    
  if((touches.length > 0 || keyDown("SPACE")) && player.y  >= height-120) {
    player.velocityY = -10;
     touches = [];
  }
  
  if(keyDown("space")){
    player.velocityY = -10;
  }
  
  player.velocityY = player.velocityY + 0.8;
  player.collide(ground);

    if(World.frameCount%100===0){
      fruits();
   }
    
    if(World.frameCount%300===0){
      stones();
   }
    
    if(player.isTouching(FoodGroup)){
       FoodGroup.destroyEach();
       score=score+1;
        }
    
    if(player.isTouching(obstacleGroup)){
      obstacleGroup.destroyEach();
      gameOver.visible=true;
      ground.velocityX=0;
      ground.velocityY=0;
      player.velocityX=0;
      player.velocityY=0;
      backgr.velocityX=0;
      backgr.velocityY=0;
      banana.velocityX=0;
      banana.velocityY=0;
      player.addImage(monkey);
    }
  }

  drawSprites();

  textSize(20);
  fill("white") ;
  text("Score: "+ score, 500,50);
  
  textSize(20);
  fill("white");
  var survivalTime=Math.round(getFrameRate()/1);
  text("Survival Time: "+ survivalTime,300,50);
}

function fruits(){
  banana=createSprite(670,Math.round(random(170,230)),10,10);
  banana.addImage(bananaImage);
  banana.scale=0.05;
  banana.velocityX=-3;
  FoodGroup.add(banana);
}

function stones(){
  obstacle=createSprite(670,380,10,10);
  obstacle.addImage(obstaceImage);
  obstacle.velocityX=-4;
  obstacle.scale=0.2;
  obstacleGroup.add(obstacle);
}
