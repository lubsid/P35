class Food {
    constructor(){
        this.image = loadImage("images/Milk.png");
        this.lastFed;
       
    }
    getFoodStock(){
        foodStockRef = database.ref('Food');
        foodStockRef.on("value",function(data){
           foodStock = data.val();
         })
    }

    updateFoodStock(){
        database.ref('/').update({
            Food: foodStock,
            feedTime: hour()
        });
    }

    deductFood(){
        if(foodStock >= 1){
            foodStock = foodStock - 1;
        }
    }

    addFood(){
        if(foodStock <= 19){
            foodStock++;
        }
    }

    display(){
        var x=80,y=100;
        
        imageMode(CENTER);
        //image(this.image, 720, 220, 70, 70);
        //milk = createSprite(720,720,70,70);
        //milk.addAnimation("milk",this.image);
        //milk.scale = 1;


        if(foodStock != 0){
            for(var i = 0;i < foodStock;i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x += 30;
            }
        }

    }
}