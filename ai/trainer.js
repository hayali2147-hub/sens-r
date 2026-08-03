// =====================================
// AI Trainer
// =====================================



async function trainAI(){



let data =
aiMemory;



if(data.length<50){


console.log(
"Yeterli veri yok"
);


return;


}




let inputs=[];

let outputs=[];



data.forEach(item=>{


inputs.push(
item.input
);


outputs.push(
item.label
);


});



console.log(
"Eğitim verisi hazır",
inputs.length
);



// TensorFlow eğitim bölümü


}