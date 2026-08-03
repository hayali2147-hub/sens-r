// =====================================
// Project Manager
// =====================================


function saveProject(name){


let project={


name:name,


image:
drawCanvas.toDataURL(),


date:
new Date()


};



localStorage.setItem(

"project_"+name,

JSON.stringify(project)

);


}




function loadProject(name){


let data =
localStorage.getItem(
"project_"+name
);



if(!data)
return;



let project =
JSON.parse(data);



let img =
new Image();



img.onload=()=>{


ctx.drawImage(
img,
0,
0
);


};



img.src =
project.image;


}