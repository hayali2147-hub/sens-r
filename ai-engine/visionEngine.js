// =====================================
// Computer Vision Engine
// =====================================


function analyzeFrame(frame){


return {


objects:[],

confidence:0


};


}




function detectHand(hand){


return {


gesture:"unknown",

confidence:0


};


}



module.exports={

analyzeFrame,

detectHand

};