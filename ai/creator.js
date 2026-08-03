// =====================================
// AI Creator Mode
// =====================================


let creatorMode=false;



function enableCreator(){


    creatorMode=true;


}



function disableCreator(){


    creatorMode=false;


}




// Basit AI çizim yardımcısı


function generateSketch(type){



switch(type){


case "ev":


drawHouse();

break;



case "kalp":


drawHeart();

break;



case "yıldız":


drawStar();

break;



}


}





function drawHouse(){


ctx.beginPath();


ctx.moveTo(300,300);

ctx.lineTo(500,300);

ctx.lineTo(500,500);

ctx.lineTo(300,500);

ctx.closePath();


ctx.strokeStyle="#00bfff";

ctx.lineWidth=6;

ctx.stroke();



ctx.beginPath();

ctx.moveTo(300,300);

ctx.lineTo(400,200);

ctx.lineTo(500,300);


ctx.stroke();


}



function drawHeart(){


ctx.beginPath();


ctx.moveTo(400,450);


ctx.bezierCurveTo(

250,
300,
300,
200,
400,
300

);


ctx.bezierCurveTo(

500,
200,
550,
300,
400,
450

);


ctx.stroke();



}




function drawStar(){


ctx.beginPath();


for(let i=0;i<10;i++){


let r =
i%2===0 ? 100:40;


let a =
i*Math.PI/5;


let x =
400+
Math.cos(a)*r;


let y =
300+
Math.sin(a)*r;


if(i===0)

ctx.moveTo(x,y);

else

ctx.lineTo(x,y);


}


ctx.closePath();

ctx.stroke();


}