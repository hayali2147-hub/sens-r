// =====================================
// Subscription System
// =====================================


const plans={


free:{


ai:false,

cloud:false


},



pro:{


ai:true,

cloud:true


},



enterprise:{


ai:true,

cloud:true,

team:true


}



};



function getPlan(name){


return plans[name];


}