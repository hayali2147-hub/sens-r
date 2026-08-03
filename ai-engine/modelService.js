// =====================================
// AI Model Service
// =====================================


let models={

gesture:"v1",

drawing:"v1",

vision:"v1"

};



function getModel(type){


return models[type];


}



function updateModel(type,version){


models[type]=version;


}



module.exports={

getModel,

updateModel

};