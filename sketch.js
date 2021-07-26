// CREATING GAME STATE AND SCORE , LIFE , MODE , ENEMIES AND FIGHTER SHIP .

var PLAY = 1;
var END = 0;
var gameState = PLAY ;


var mode ;

var backgroundb, backgroundImg ;

var ship, shipimg;

var bullet ;

var enemyGroup , enemyImg  ; 

var bulletGroup ;

var enemy2Group,enemy2img ;

var enemy3Group , enemy3img ;

var enemyGroup4 , enemy4Img ;

var enemyGroup5,enemy5Img ;

var life ;

var life1,life1Img;

var life2,life2Img

var life3 ,life3Img;

var score ;

// PUTTING HIGH SCORE ;

localStorage["HS"] = 0 ;

// PUTTING SOUNDS  ;
var hitingsound , bullethitingsound ;


function preload(){
  
  // LOADING IMAGES AND SOUND EFFECTS 

  backgroundImg = loadImage("background.png")
  
  shipimg = loadImage("shship.png")
  
  enemyImg = loadImage("enemyship.png");
  
  enemy2img = loadImage("fireball.png");
  
  enemy3img = loadImage("fireball.png");
  
  enemy4Img = loadImage("meteroid image.png")
  
  enemy5Img = loadImage("meteroid image-1.png")
  
  
  life1Img = loadImage("shship.png");
  
  life2Img = loadImage("shship.png");
  
  life3Img = loadImage("shship.png");
  
  
  hitingsound = loadSound("mixkit-arcade-chiptune-explosion-1691.wav");
  
  
  bullethitingsound = loadSound("mixkit-pixel-chiptune-explosion-1692.wav");
  
  
}








function setup (){
  //CREATING CANVAS
  createCanvas(600,500)
  
  
  //  CREATING BACKGROUND
  backgroundb = createSprite(300,250);
  backgroundb.addImage(backgroundImg);
  backgroundb.scale= 2.5 ;
  backgroundb.velocityY =8;
  
  // CREATING FIGHTER SHIP 
  ship = createSprite(300,450,20,20);
  ship.scale = 0.25;
  ship.addImage(shipimg);
  
  //CREATING GROUPS FOR BULLET AMD ENEMIES 
  
  enemyGroup  = createGroup();
  
  bulletGroup = createGroup();
  
  enemy2Group = createGroup();
  
  enemy3Group = createGroup();
  
  enemy4Group = createGroup();
  
  enemy5Group = createGroup();
  
  
  // CREATING LIFES
  
  life1 = createSprite(20,20,20,20);
  life1.addImage(life1Img);
  life1.scale = 0.1 ;
  
  
  life2 = createSprite(55,20,20,20);
  life2.addImage(life2Img);
  life2.scale = 0.1 ;
  
  
  life3 = createSprite(90,20,20,20);
  life3 .addImage(life3Img);
  life3.scale = 0.1;
  
  // PUTIING SCORE ;
  score = 0;
  
  // PUTIING LIVES 
  life = 3 ;
  
  //PUTTING MODE 
  mode = 0; 
  
  
}




function draw(){
  // BACKGROUND TO CLEAR THE SCREEN
  background("backGroundImg");
  
  // DRAW ALL THE SPRITES
  drawSprites()
  
  //CREATING EDGES
  edges =   createEdgeSprites();

  //RESETING BACKGROUND
   if(backgroundb.y>400){
    backgroundb.y =height/2
  }
  
  
  
  // DISPLAYING TEXT BEFORE THE GAME START BY USING MODE
  if(mode == 0 ){
    
    textSize(18)
    fill("white")
    noStroke();
    text("PRESS ENTER TO START GAME",200,100);
    text("PRESS SPACE TO SHOOT ",220 ,130);
    text("TRY TO SUVIVE FOR LONG.USE THE MOUSE TO MOVE THE ROCKET",2 ,200);
  text("YOU HAVE 3 LIVES ",15,60 );
    
    //ENTER TO START THE GAME 
    
    if(keyDown("enter")){
      mode = 1 ;
    }
  }
  
  
  
  // GAME STATE = PLAY ; 
  
  if(mode == 1 && gameState === PLAY){
  
  //SHIP MOVING USING THE MOUSE 
  ship.x = World.mouseX;
  
    //SHIP SHOULD COLLIDE THE EDGES
  ship.collide(edges);
  
    
    // SHOOTING BULLETS USING SPACE KEY 
 if(keyWentDown("space")){
  createbullet();
   
 }
  
  
  
  // BULLET HITTING ENEMIES AND ADDING SOUND EFFECTS
   
  if(enemyGroup.isTouching(bulletGroup)){
    enemyGroup.destroyEach();
    bulletGroup.destroyEach();
    bullethitingsound.play();
  }

    
   if(enemy2Group.isTouching(bulletGroup)){
    enemy2Group.destroyEach();
    bulletGroup.destroyEach();
      bullethitingsound.play();
    
  }
  
    
   if(enemy3Group.isTouching(bulletGroup)){
    enemy3Group.destroyEach();
    bulletGroup.destroyEach();
      bullethitingsound.play();
  }
  
    
  if(enemy4Group.isTouching(bulletGroup)){
    enemy4Group.destroyEach();
    bulletGroup.destroyEach();
     bullethitingsound.play();
  }
  
    
  if(enemy5Group.isTouching(bulletGroup)){
    enemy5Group.destroyEach();
    bulletGroup.destroyEach();
     bullethitingsound.play();
  }
  
  
  // ENEMIES HITTING SHIP LIFE SHOULD DECREASE  AND ADDING SOUND EFFECT 
    
   if(ship.isTouching(enemyGroup)){
     life = life-1;
     enemyGroup.destroyEach();
     hitingsound.play();
   } 
    
    
    
    if(ship.isTouching(enemy2Group)){
     life = life-1;
     enemy2Group.destroyEach();
       hitingsound.play();
   }  
    
    
     if(ship.isTouching(enemy3Group)){
     life = life-1;
     enemy3Group.destroyEach();
        hitingsound.play();
   } 
    
    
     if(ship.isTouching(enemy4Group)){
     life = life-1;
     enemy4Group.destroyEach();
        hitingsound.play();
   } 
    
    
     if(ship.isTouching(enemy5Group)){
     life = life-1;
     enemy5Group.destroyEach();
        hitingsound.play();
   } 
    
    
 
  
    // SCORING SYSTEM PER 60 FRAMECOUNT
  score = score + Math.round(frameCount/50);
  
    
    //CALLING ENEMY 1 ;
   createenemy();
 
  
  // SCORE INCREASING ENEMY1 DESTROY AND CREATING OTHER ENEMIES 
  if(score >= 10000 && enemyGroup.isTouching(edges)) {
 
  enemyGroup.setLifetimeEach(0);
  enemyGroup.destroyEach();
  enemyGroup.setVelocityYEach(0);
  enemyGroup.setVisibleEach(false); 
  enemyGroup.pointToEach(-100,-100);
  enemyGroup.setScaleEach(0);
  enemyGroup.bounceOff(edges);
    
    // ALLING ENEMY2,ENEMY3
    createenemy2();
    createenemy3();
    
    

  }
  
  // SCORE INCREASING MORE THE ENEMY2, ENEMY3  DESTROY
  if(score >= 25000 ){
    
   
  
  enemy2Group.destroyEach();
  enemy2Group.setLifetimeEach(0);
  enemy2Group.setVelocityYEach(0);
  
     
    
  enemy3Group.destroyEach();
  enemy3Group.setLifetimeEach(0);
  enemy3Group.setVelocityYEach(0);
    
    // CALLING NEW ENEMES 
    createenemy4();
    createenemy5();
    
  }
  
    // LIFE LEFT 2 THEN LIFE3 NOT VISIBLE TO KNOW HOW MANY LIVES LEFT
    if(life === 2){
      
    life3.x = -100;
    life3.y = -100;
      
    }
    
    // LIFE LEFT 1 THEN LIFE2 DESTROY TO KNOW HOW MANY LIVES LEFT
    if(life === 1){
      
      life2.x= -200;
      life2.y -400;

    }
    
    // LIFE LEFT 0 LIFE1 DESTROY AND GAME STATE = END ;
    if(life === 0){
      
      life1.x = -300;
      life.y= -400;
      
      gameState = END ; 
      
    }
     
  }
  else{
    // WHEN GAME STATE COMES TO END
    if(gameState === END){
      // BACKGROUND VELOCITY STOPS 
      backgroundb.velocityY = 0;
      
      //DISPLAYING TEXT WHEN GAME STATE = END ;
      textSize(20);
      fill("white");
      noStroke();
     
      text("GAMEOVER!",200,200);
      text("PRESS ENTER TO PLAY AGAIN",200,250);
      
      // ENEMIES GROUPS DESTROY BULLETGROUP DESTROY
     
      enemyGroup.destroyEach();
      
      enemy2Group.destroyEach();
      
      enemy3Group.destroyEach();
      
      enemy4Group.destroyEach();
      
      enemy5Group.destroyEach();
      
      bulletGroup.destroyEach();
      
      
      // KEY PRESSED ENTER RESET THE GAME 
      if(keyDown("enter")){
        
        reset();
      }
      
    }
    
  }
  
  
  
  // DISPLAYING SCORE AND HIGH SCORE .
  
  textSize(20);
  fill("blue");
  stroke("blue");
  text("Score = " + score , 400,20)
  text("HIGHEST SCORE = " + localStorage["HS"],280,50);
  
 
}


// CREATING BULLETS
function createbullet(){
  
  bullet = createSprite(300,450,1,10);
  bullet.shapeColor = "yellow"
  bullet.velocityY = -12;
  bullet.lifetime = 50;
  bullet.x = ship.x
  
  bulletGroup.add(bullet);
      
  }
  

// CREATING DIFFERENT ENEMIES LIKE ENEMY[1,2,3,4,5];

function createenemy(){
  
  if(frameCount%100 === 0){
    
    enemy1 = createSprite(-100,-100,20,20);
    enemy1.x= Math.round(random(20,580));
    enemy1.scale  = 0.9 ;
    enemy1.velocityY= Math.round(random(9,12)); 
    enemy1.addImage(enemyImg);
    enemy1.y = -10;
    enemy1.lifetime = 150;
    
    enemyGroup.add(enemy1)
    
  }
}





function createenemy2(){
  
  if(frameCount % 100 === 0){
    
    enemy2 = createSprite(-10,-10,20,20);
    enemy2.y= Math.round(random(20,150));
    enemy2.scale = 0.1;
    enemy2.velocityY= Math.round(random(5,15)); 
    enemy2.velocityX = Math.round(random(5,15));
    enemy2.addImage(enemy2img);
    enemy2.x = Math.round(random(-50,-10));
    enemy2.lifetime = 150;
    enemy2.rotationSpeed = 10 ;
    enemy2.debug = false ;
    enemy2.setCollider("circle",0,0,200)
    
    enemy2Group.add(enemy2)
    
    
  }
 
  }



function createenemy3(){
  
  if(frameCount % 100 === 0){
    
  enemy3 = createSprite(660,100,20,20);
  enemy3.addImage(enemy3img);
  enemy3.scale = 0.1 ;
  enemy3.velocityX = Math.round(random(-6,-18)) ;
  enemy3.velocityY = Math.round(random(5,16)) ;
  enemy3.x = Math.round(random(610,700));
  enemy3.y = Math.round(random(20,100));
  enemy3.rotationSpeed = 10 ;
  enemy3.lifetime = 150 ;
  enemy3.setCollider("circle",0,0,200);
  enemy3. debug = false ;
    
  enemy3Group.add(enemy3)
    
  }
    
  }



function createenemy4(){
  
  if(frameCount % 50 === 0){
    
  enemy4 = createSprite(660,100,20,20);
  enemy4.addImage(enemy4Img);
  enemy4.scale = 0.1 ;
  enemy4.velocityX = Math.round(random(-10,-20)) ;
  enemy4.velocityY = Math.round(random(10,20)) ;
  enemy4.x = Math.round(random(610,700));
  enemy4.y = Math.round(random(20,100));
  enemy4.rotationSpeed = 0 ;
  enemy4.lifetime = 150 ;
  enemy4.setCollider("circle",0,0,200);
  enemy4. debug = false ; 
    
  enemy4Group.add(enemy4);
    
  }
    
  }




function createenemy5(){
  
  if(frameCount%50 === 0){
    
    enemy5 = createSprite(-100,-100,20,20);
    enemy5.y= Math.round(random(20,150));
    enemy5.scale = 0.1;
    enemy5.velocityY=Math.round(random(10,20)); 
    enemy5.velocityX = Math.round(random(10,20));
    enemy5.addImage(enemy5Img);
    enemy5.x = Math.round(random(-100,-10));
    enemy5.lifetime = 150;
    enemy5.rotationSpeed = 0 ;
    enemy5.debug = false ;
    enemy5.setCollider("circle",0,0,200);
    
    enemy5Group.add(enemy5)
      
  }
     
  }



// CREATING RESET FUNCTION ;

  function reset(){
    
  gameState = PLAY ;
  
    life1.x = 20 ;
    life1.y = 20;
    
    
    life2.x = 55 ; 
    life2.y = 20;
    
    
    
    life3.x = 90;
    life3.y = 20;
    
    
  enemyGroup.destroyEach();
    
  enemy2Group.destroyEach();
    
  enemy3Group.destroyEach();
    
  enemy4Group.destroyEach(); 
    
  enemy5Group.destroyEach();
    
    
    backgroundb.velocityY = 8; 
    
    
    // DISPLAYING HIGH SCORE SCORED BY THE SHIP 
    if(localStorage["HS"]<score){
      
      localStorage["HS"] = score ;
      
    }
    
    // SCORE SHOULD = 0 ; AND LIFE AGAIN LEFT = 3 ; AND MODE  = 1 ;
    // NOT DISPLAYING THE TEXT BEFORE THE GAME START WHEN RESETED ; 
    
score = 0;
    
life  =3 ;
    
mode = 1 ;
    
score = score + Math.round(frameCount/50);
    
  }
  




// THATS ALL ABOUT THIS GAME !
// PLAY MY GAME AND ENJOY IT !!
// THANK YOU !!!








