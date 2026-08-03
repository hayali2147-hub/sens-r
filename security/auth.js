// =====================================
// Authentication
// =====================================



function createUser(name){


return {


id:
Date.now(),


name:name,


created:
new Date()


};


}




function checkUser(user){


return user &&
user.id;


}