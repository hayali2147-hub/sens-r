// =====================================
// Real Time Collaboration
// =====================================


const clients=[];



function addClient(socket){


clients.push(socket);


}



function broadcast(data){


clients.forEach(client=>{


client.send(
JSON.stringify(data)
);


});


}