// =====================================
// AirDraw Neural Core
// =====================================


let neuralModel=null;



async function loadNeuralModel(){


try{


neuralModel =
await tf.loadLayersModel(
"models/model.json"
);



console.log(
"Neural AI hazır"
);



}

catch(e){


console.log(
"Model bulunamadı"
);


}


}





function predictGesture(input){


if(!neuralModel)
return null;



let tensor =
tf.tensor([input]);



let result =
neuralModel.predict(tensor);



return result;

}



loadNeuralModel();