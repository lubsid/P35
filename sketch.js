//Create variables here
var dog, happyDog, hungryDog, database, foodS,foodStockRef,database;
var frameCountNow = 0;
var fedTime, lastFed, foodObj;
var milk, input, name;
var foodStock=20;

function preload()
{
  //load images here
  hungryDog = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(1200,500);
  database = firebase.database();
  
  foodObj = new Food();
  foodObj.getFoodStock();

  dog = createSprite(width/2+250,height/2,10,10);
  dog.addAnimation("hungry",hungryDog);
  dog.addAnimation("happy",happyDog);
  dog.scale = 0.3;

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  var feed = createButton("Feed the dog");
  feed.position(950,95);
  feed.mousePressed(feedDog);

  var addFood = createButton("Add food");
  addFood.position(1050,95);
  addFood.mousePressed(addFoods);

  var input = createInput("Pet name");
  input.position(950,120);

  var button = createButton("Confirm");
  button.position(1000,145);
  button.mousePressed(()=>{
    input.hide();
    button.hide();
  
    name = input.value();
    var greeting = createElement('h3');
    greeting.html("Pet's name: "+name);
    greeting.position(width/2+850,height/2+200);
  });
}

function draw() { 
  background(46, 139, 87);

 
  //console.log(foodStock);

  

  foodObj.display();


  

  drawSprites();
  //add styles here
  textSize(32);
  fill("red");
  //text("Amount of Food: "+foodStock,width/2-150,50);
  textSize(20);
  text("Last fed: "+lastFed+":00",300,95);
  //text("Press the up arrow key to feed the dog!",width/2-200,100);
}

function feedDog(){
  foodObj.deductFood();
  foodObj.updateFoodStock();
  dog.changeAnimation("happy", happyDog);
}

function addFoods(){
  foodObj.addFood();
  foodObj.updateFoodStock();
}

async function hour(){
  var site = await fetch("http://worldtimeapi.org/api/timezone/America/New_York");
  var siteJSON = await site.json();
  var datetime = siteJSON.datetime;
  var hourTime = datetime.slice(11,13);
  return hourTime;
}

function createName(){
  input.hide();
  button.hide();

  name = input.value();
  var greeting = createElement('h3');
  greeting.html("Pet's name: "+name);
  greeting.position(width/2+850,height/2+200);
}