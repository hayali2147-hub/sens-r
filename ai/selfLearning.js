// =====================================
// Self Learning AI
// =====================================



let learningMode=false;



function startLearning(){


learningMode=true;


console.log(
"AI öğrenme başladı"
);


}



function stopLearning(){


learningMode=false;


}





function learnGesture(input,label){



if(!learningMode)
return;



saveMemory({

input:input,

label:label,

time:Date.now()

});


}