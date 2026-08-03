// =====================================
// Cloud Project Manager
// =====================================


let projects=[];



function saveProject(userId,data){


projects.push({


userId:userId,


data:data,


date:new Date()


});


}




function getProjects(userId){


return projects.filter(

p=>p.userId===userId

);


}



module.exports={

saveProject,

getProjects

};