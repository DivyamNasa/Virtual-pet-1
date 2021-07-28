//Create variables here
var dog, happyDog , database, foodS, foodStock;
var dogImg,bgimage;
var button;

function preload()
{

	//load images here

  dogImg = loadImage("Dog.png")
  happyDog = loadImage("happydog.png")
  bgimage   = loadImage("download.jpg");

}

function setup() {
	createCanvas(500, 500);

  dog = createSprite(250,290,20,30);
  dog.addImage(dogImg);
  dog.scale=0.3;

  database = firebase.database();
  foodStock = database.ref('Food')
  foodStock.on("value", readStock);

 button = createButton('Buy food');
  
}


function draw() {  

background(bgimage)

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}

if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg);
}

if(foodS===0){
 foodS=20
}

button.position(displayWidth/2 + 30, displayHeight/2);


button.mousePressed(()=>{
  foodS=20
})

  drawSprites();

  //add styles here
  stroke("black")
  fill("lightblue");
  textSize(30);
  text("food = "+foodS,190,160);
  fill("yellow");
  text("press the up arrow to feed your dog",14,90);





}

function readStock(data){



  foodS=data.val();
  
}

function writeStock(x) {

  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }

  database.ref("/").update({
  Food:x
  })
  
  }





