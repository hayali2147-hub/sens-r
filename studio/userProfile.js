// =====================================
// User Profile
// =====================================


let userProfile={


name:"User",

style:"Neon",

level:1


};



function updateProfile(data){


userProfile={

...userProfile,

...data

};


localStorage.setItem(

"profile",

JSON.stringify(userProfile)

);


}



function getProfile(){


return userProfile;


}