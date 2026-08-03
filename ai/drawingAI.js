// =====================================
// Drawing AI
// =====================================



let drawingMemory=[];



function rememberStroke(point){


drawingMemory.push({

x:point.x,

y:point.y

});


if(
drawingMemory.length>200
)
{

drawingMemory.shift();

}


}





function predictDrawing(){


if(
drawingMemory.length<20
)
return;



// AI modeli buraya bağlanacak


return {

type:"unknown",

confidence:0


};


}