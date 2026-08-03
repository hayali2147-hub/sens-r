// =====================================
// AirDraw AI
// Hologram Engine
// =====================================


let hologramParticles=[];



function createHologram(x,y){


for(let i=0;i<5;i++){


hologramParticles.push({


x:x,

y:y,


vx:(Math.random()-0.5)*4,


vy:(Math.random()-0.5)*4,


size:
Math.random()*6+2,


life:1


});


}



}



function renderHologram(ctx){



hologramParticles.forEach((p,index)=>{


p.x+=p.vx;

p.y+=p.vy;


p.life-=0.02;



ctx.save();


ctx.globalAlpha=p.life;



ctx.beginPath();


ctx.arc(

p.x,

p.y,

p.size,

0,

Math.PI*2

);



ctx.fillStyle="#00ffff";


ctx.shadowBlur=25;


ctx.shadowColor="#00ffff";


ctx.fill();


ctx.restore();



if(p.life<=0){

hologramParticles.splice(index,1);

}



});



}