// =====================================
// 3D Particle System
// =====================================


let energyPoints=[];



function addEnergy(x,y){


energyPoints.push({

x:x,

y:y,

z:Math.random()*100,


life:1


});


}



function drawEnergy(ctx){



energyPoints.forEach((p,i)=>{


p.life-=0.01;


ctx.beginPath();


ctx.arc(

p.x,

p.y,

p.z/50,

0,

Math.PI*2

);



ctx.fillStyle=
`rgba(0,255,255,${p.life})`;



ctx.fill();



if(p.life<=0)

energyPoints.splice(i,1);



});



}