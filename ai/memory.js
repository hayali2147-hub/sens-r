// =====================================
// AI Memory System
// =====================================


let aiMemory=[];



function saveMemory(data){


aiMemory.push(data);



if(aiMemory.length>1000){

aiMemory.shift();

}



localStorage.setItem(

"airdraw_memory",

JSON.stringify(aiMemory)

);


}




function loadMemory(){


let data =
localStorage.getItem(
"airdraw_memory"
);



if(data){

aiMemory =
JSON.parse(data);

}


}



loadMemory();