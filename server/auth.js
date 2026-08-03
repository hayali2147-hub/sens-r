// =====================================
// AirDraw Cloud Authentication
// =====================================


let users=[];



function register(username,password){


let user={


id:Date.now(),


username,


password,


plan:"free"



};


users.push(user);


return user;


}




function login(username,password){


return users.find(
u=>
u.username===username &&
u.password===password
);


}



module.exports={

register,

login

};