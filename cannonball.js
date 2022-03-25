class CannonBall{
    constructor(x,y){
        var CannonBalloptions={
            isStatic:true
        }
        this.r=30
        this.body=Bodies.circle(x,y,this.r,CannonBalloptions)
        World.add(world,this.body)
        this.CannonBall=loadImage("assets/cannonball.png")
        this.animation=[this.CannonBall]
        this.speed=0.05
        this.isSink=false
        this.trajectory=[]
    }
        animate(){
            this.speed=this.speed+0.05
    }
    shoot(){
        var newAngle=cannon.a-30
        newAngle=newAngle*(3.14/180)
        var Velocity=p5.Vector.fromAngle(newAngle)
        Velocity.mult(0.5)
        Matter.Body.setStatic(this.body,false)
        Matter.Body.setVelocity(this.body,{x:Velocity.x*(180/3.14),y:Velocity.y*(180/3.14)})
    }
    remove(index){
        this.isSink=true
        //stoping the cannonballs before deleting them
        Matter.Body.setVelocity(this.body,{x:0,y:0})
        this.animation=splashAnimation
        this.speed=0.05
        this.r=140
        //set time out function is used when we want to execute a certain piece of code or a certain function after a certain time
        setTimeout(()=>{
            //removing the boat from the world
            World.remove(world,this.body)
            //deleting the same boat from the boats array
            delete balls[index]
        },1000)
    }
    display(){
        var angle=this.body.angle
        var pos=this.body.position
        var index=floor(this.speed%this.animation.length)
        push()
        imageMode(CENTER)
        rotate(angle)
        translate(pos.x,pos.y)
        image(this.animation[index],0,0,this.r,this.r)
        pop()
        //this.trajectory[[3,2],[7,4],[6,8],[5,1]]
        //this.trajectory[0][0],this.trajectory[0][1]
        //this.trajectory[1][0],this.trajectory[1][1]
        //this.trajectory[2][0],this.trajectory[2][1]
        //this.trajectory[3][0],this.trajectory[3][1]


        //getting the x and y positions of each cannonball and pushing them in the trajectory
        if (this.body.velocity.x>0){
            var position=[this.body.position.x,this.body.position.y]
            this.trajectory.push(position)
        }
        //extracting the x y positions of the ball one by one from the trajectory array and displaying the image of a tiny cannonball at all of those positions
        for(var i=0;i<this.trajectory.length;i=i+1){
            image(this.CannonBall,this.trajectory[i][0],this.trajectory[i][1],5,5)
        }
        
    
        
    }
}
