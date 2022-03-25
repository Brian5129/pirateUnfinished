class Boat{
    constructor(x,y,w,h,bp,boatAnimation){
        var BoatOptions={
            restitution:0.8, 
        friction:1.0, 
        density:1.0
        }
        this.animation=boatAnimation
        this.speed=0.05

    this.body=Bodies.rectangle(x,y,w,h,BoatOptions)
    World.add(world,this.body)
        this.Boat=loadImage("assets/boat.png")
        this.width=w
this.height=h
this.bp=bp
    }
    animate(){
        this.speed=this.speed+0.05
    }
    
    remove(index){
        //changing the animation of boat to the broken boat
        this.animation=brokenAnimation
        this.speed=0.05
        this.width=250
        this.height=250
        //set time out function is used when we want to execute a certain piece of code or a certain function after a certain time
        setTimeout(()=>{
            //removing the boat from the world
            World.remove(world,boats[index].body)
            //deleting the same boat from the boats array
            delete boats[index]
        },2000)
    }
display(){
    var pos=this.body.position
    //var index=Math.round(random(0,3))
    var index=floor(this.speed%this.animation.length)
    push()
    translate (pos.x,pos.y)
    imageMode(CENTER)
    image(this.animation[index],0,this.bp,this.width,this.height)
    pop()
}
}