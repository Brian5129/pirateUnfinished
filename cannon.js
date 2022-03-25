class Cannon{
    constructor(x,y,w,h,a){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.a=a
     this.gunImage=loadImage("assets/canon.png")
     this.canonbase=loadImage("assets/cannonBase.png")
    }
    display(){
        //moving the gun up and down using the left and right arrow keys
        
        if(keyIsDown(LEFT_ARROW) && this.a>-30){
            this.a=this.a-1
            
        }
        if(keyIsDown(RIGHT_ARROW) && this.a<70){
            this.a=this.a+1
        }
        //code to create the cannon gun
        push()
        imageMode(CENTER)
        translate(this.x,this.y)
        rotate (this.a)
        image(this.gunImage,0,0,this.w,this.h) 
        pop() 



       
        //code to create the cannon base
        image (this.canonbase,70,22,200,200)


    }
}
