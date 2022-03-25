const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var balls=[]
var boats=[]
//array to hold images for the boat animation
var boatAnimation=[]
var boatData,boatSheet
//variables for creating the broken boat animation
var brokenAnimation=[]
var brokenData,brokenSheet
//variables for creating the water splash animation
var splashAnimation=[]
var splashData,splashSheet
function preload() {
 bg=loadImage("assets/background.gif")
 towerImage=loadImage("assets/tower.png")
 boatData=loadJSON("assets/boat/boat.json")
 boatSheet=loadImage("assets/boat/boat.png")
 brokenData=loadJSON("assets/boat/brokenBoat.json")
 brokenSheet=loadImage("assets/boat/brokenBoat.png")
 splashData=loadJSON("assets/waterSplash/waterSplash.json")
 splashSheet=loadImage("assets/waterSplash/waterSplash.png")
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  var groundoptions={
    isStatic:true
  }
 ground=Bodies.rectangle(0,height-5,width*2,5,groundoptions)
 World.add(world,ground)
 tower=Bodies.rectangle(160,350,160,310,groundoptions)
 World.add(world,tower)
 angleMode(DEGREES)
 angle=15
 cannon=new Cannon(180,110,100,100,angle)
//extracting the images from the sheet one by one and storing them in an array
var boatFrames=boatData.frames
for (var i=0;i<boatFrames.length;i++){
  var pos=boatFrames[i].position
  var img=boatSheet.get(pos.x,pos.y,pos.w,pos.h)
  boatAnimation.push(img)
}
//extracting the images from the borken boat sheet one by one and storing them in an empty array
var brokenFrames=brokenData.frames
for (var i=0;i<brokenFrames.length;i++){
  var pos=brokenFrames[i].position
  var img=brokenSheet.get(pos.x,pos.y,pos.w,pos.h)
  brokenAnimation.push(img)
}
//extracting the images from the splash sheet one by one and storing them in an empty array
var splashFrames=splashData.frames
for (var i=0;i<splashFrames.length;i++){
  var pos=splashFrames[i].position
  var img=splashSheet.get(pos.x,pos.y,pos.w,pos.h)
  splashAnimation.push(img)
}
}

function draw() {
  background(189);
  image(bg,0,0,width,height)
 
  Engine.update(engine);
fill ("green")
  rect(ground.position.x,ground.position.y,width,5)
  push()
  imageMode(CENTER)
  image(towerImage,tower.position.x,tower.position.y,160,310)
  pop()
  cannon.display()
 showBoats()
  for(var i=0;i<balls.length;i=i+1){
    showCannonballs(balls[i],i)
    collisionWithBoat(i)
  }
}
//function to detect collision between boats and cannonballs
function collisionWithBoat(index){
  for (d=0;d<boats.length;d++){
    if (balls[index]!==undefined && boats[d]!==undefined){
      var collision=Matter.SAT.collides(balls[index].body,boats[d].body)
      //checking if the collision happened
      if (collision.collided){
        boats[d].remove(d)
        //removing the particular ball that hit the boat
        World.remove(world,balls[index].body)
        delete balls[index]
      }
    }
  }
}

//function to display the cannonballs
function showCannonballs(ball,i){
if (ball){
  ball.display()
  if (ball.body.position.y>=height-100){
    ball.remove(i)
  }
}
}
function showBoats(){
  if (boats.length>0){
if (boats[boats.length-1].body.position.x<width-300 || boats[boats.length-1]==undefined){
  var positions=[-20,-40,-60,-70,-80]
  var p=random(positions)
  boat=new Boat(width-80,height-60,150,150,p,boatAnimation)
    boats.push(boat)
}
    //extracting the boats one by on from the boats array and displaying them and setting a velocity to them
    for(var i=0;i<boats.length;i=i+1){
      Matter.Body.setVelocity(boats[i].body,{x:-1,y:0})
      boats[i].display()
  boats[i].animate() 
    }
  }
  else{
    boat=new Boat(width-80,height-60,150,150,-80,boatAnimation)
    boats.push(boat)
  }
}
function keyPressed(){
  if (keyCode==DOWN_ARROW){
    cannonball=new CannonBall(cannon.x,cannon.y)
    balls.push(cannonball)
  }
}
function keyReleased(){
  if (keyCode==DOWN_ARROW){
    cannonball.shoot()
  }
} 
