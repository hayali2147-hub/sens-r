// =====================================
// AI Model Manager
// =====================================


let activeModel="default";



function loadModel(name){


activeModel=name;


console.log(

"Model aktif:",
name

);


}



function getModel(){


return activeModel;


}