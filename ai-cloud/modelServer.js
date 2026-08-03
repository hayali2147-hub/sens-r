// =====================================
// AI Model Server
// =====================================


let activeModels={


vision:"v2",

drawing:"v3",

gesture:"v2"


};



function getAIModel(name){


return activeModels[name];


}



function updateAIModel(
name,
version
){


activeModels[name]=version;


}