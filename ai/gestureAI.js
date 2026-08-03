// =====================================
// Gesture AI
// =====================================


let gestureHistory=[];



function rememberGesture(data){


gestureHistory.push(data);



if(
gestureHistory.length>50
){

gestureHistory.shift();

}


}





function analyzeGesture(){


if(
gestureHistory.length<10
)
return;



let input =
gestureHistory.flat();



let prediction =
predictGesture(input);



return prediction;


}