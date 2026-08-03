// =====================================
// AirDraw AI Ultimate Pro
// app.js - Paket 1
// =====================================
// =====================================
// Paket 3 - Profesyonel Efekt Motoru
// =====================================
// =====================================
// Paket 4 - AI Şekil Sistemi
// =====================================
// =====================================
// Paket 5 - Pro Sistem
// =====================================
window.drawContext = ctx;
window.drawCanvas = drawCanvas;
let hologramMode=true; // fixed
let history = [];

let redoStack = [];

let layers = [];

let currentLayer = 0;

hologramMode = false;

let shapePoints = [];

let shapeMode = false;

let autoCorrect = true;

let particles = [];

let rainbowMode = false;

let previousPoint = null;

let currentSpeed = 0;


const TRAIL_LENGTH = 15;
let trail = [];


// Elemanlar

const video = document.querySelector(".input_video");

const cameraCanvas =
document.getElementById("cameraCanvas");

const drawCanvas =
document.getElementById("drawCanvas");


const cameraCtx =
cameraCanvas.getContext("2d");


const ctx =
drawCanvas.getContext("2d");



const colorPicker =
document.getElementById("colorPicker");


const sizePicker =
document.getElementById("sizePicker");


const clearBtn =
document.getElementById("clearBtn");


const saveBtn =
document.getElementById("saveBtn");


const status =
document.getElementById("status");




// =====================================
// Ayarlar
// =====================================


const SETTINGS={

    color:"#00bfff",

    size:6,

    glow:25,

    smooth:0.35

};



// =====================================
// Değişkenler
// =====================================


let fingerPoint=null;

let lastPoint=null;


let drawEnabled=false;

let eraseEnabled=false;




// =====================================
// Canvas Boyutu
// =====================================


function resizeCanvas(){


    cameraCanvas.width =
    window.innerWidth;


    cameraCanvas.height =
    window.innerHeight;


    drawCanvas.width =
    window.innerWidth;


    drawCanvas.height =
    window.innerHeight;


}


resizeCanvas();


window.addEventListener(
"resize",
resizeCanvas
);




// =====================================
// Kontroller
// =====================================


colorPicker.oninput=()=>{

    SETTINGS.color =
    colorPicker.value;

};



sizePicker.oninput=()=>{


    SETTINGS.size =
    Number(sizePicker.value);


};




clearBtn.onclick=()=>{


    ctx.clearRect(

        0,

        0,

        drawCanvas.width,

        drawCanvas.height

    );


};





saveBtn.onclick=()=>{


    const link =
    document.createElement("a");


    link.download =
    "AirDraw.png";


    link.href =
    drawCanvas.toDataURL("image/png");


    link.click();


};





// =====================================
// Mesafe Hesabı
// =====================================


function distance(a,b){


    return Math.hypot(

        a.x-b.x,

        a.y-b.y

    );


}
function calculateDistance(a,b){

    return Math.hypot(

        a.x-b.x,

        a.y-b.y

    );

}




// =====================================
// El Hareketleri
// =====================================


// =====================================
// Paket 2 - Akıllı Gesture Sistemi
// =====================================


let lastGesture="";

let lastColorChange=0;



function fingerUp(hand,tip,pip){

    return hand[tip].y < hand[pip].y;

}



function detectGesture(hand){



    const thumbIndex =
    distance(hand[4],hand[8]);



    const indexMiddle =
    distance(hand[8],hand[12]);



    const thumbPinky =
    distance(hand[4],hand[20]);



    // Parmak durumları
    if(hologramMode && fingerPoint){


createHologram(

fingerPoint.x,

fingerPoint.y

);


addEnergy(

fingerPoint.x,

fingerPoint.y

);


}


    const indexOpen =
    fingerUp(hand,8,6);



    const middleOpen =
    fingerUp(hand,12,10);



    const ringOpen =
    fingerUp(hand,16,14);



    const pinkyOpen =
    fingerUp(hand,20,18);



    const allOpen =
    indexOpen &&
    middleOpen &&
    ringOpen &&
    pinkyOpen;



    // ✋ Avuç açık

    if(allOpen){


        drawEnabled=false;

        eraseEnabled=false;


        lastGesture="Duraklat";


        return;

    }



    // ☝️ Çizim

    if(
        thumbIndex < 0.06 &&
        indexOpen
    ){


        drawEnabled=true;

        eraseEnabled=false;


        lastGesture="Kalem";


        return;
        {
"input":[
0.5,
0.2,
0.1
],
"label":"kalem"
}

    }




    // ✌️ Silgi


    if(
        indexMiddle < 0.06 &&
        middleOpen
    ){


        drawEnabled=true;

        eraseEnabled=true;


        lastGesture="Silgi";


        return;
        {
"input":[
0.7,
0.3,
0.2
],
"label":"silgi"
}


    }




    // 🤏 Kalınlık kontrolü


    if(thumbIndex < 0.10){


        let size =
        Math.floor(
        thumbIndex*300
        );


        SETTINGS.size =
        Math.max(
        1,
        Math.min(
        40,
        size
        )
        );


        sizePicker.value =
        SETTINGS.size;


        lastGesture="Kalınlık";


    }





    // 🤌 Renk değişimi


    if(
        thumbPinky < 0.06
    ){


        let now =
        performance.now();



        if(now-lastColorChange>800){


            const colors=[

                "#00bfff",
                "#ff0055",
                "#00ff66",
                "#ffff00",
                "#ffffff",
                "#ff00ff"

            ];



            let index =
            colors.indexOf(
            SETTINGS.color
            );



            index++;



            if(index>=colors.length)
            index=0;



            SETTINGS.color =
            colors[index];



            colorPicker.value =
            SETTINGS.color;



            lastColorChange=now;


        }



        lastGesture="Renk";

    }


}





// =====================================
// MediaPipe
// =====================================


const hands =
new Hands({

    locateFile:(file)=>{

        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;

    }

});



hands.setOptions({


    maxNumHands:1,


    modelComplexity:1,


    minDetectionConfidence:0.8,


    minTrackingConfidence:0.8


});





hands.onResults((results)=>{


    if(

        !results.multiHandLandmarks ||

        results.multiHandLandmarks.length===0

    ){


        fingerPoint=null;

        lastPoint=null;


        status.innerHTML="El algılanmadı";


        return;

    }



    const hand =
    results.multiHandLandmarks[0];
    let neuralData=[];


hand.forEach(point=>{


neuralData.push(
point.x,
point.y,
point.z
);


});



rememberGesture(neuralData);

rememberStroke(
fingerPoint
);



    detectGesture(hand);



    fingerPoint={


        x:
        (1-hand[8].x)
        *
        drawCanvas.width,



        y:
        hand[8].y
        *
        drawCanvas.height


    };



    status.innerHTML =
"Mod: " + lastGesture;

});
learnGesture(

neuralData,

lastGesture

);




// =====================================
// Kamera
// =====================================


const camera =
new Camera(video,{


    onFrame:async()=>{


        await hands.send({

            image:video

        });


    },


    width:1280,


    height:720


});



camera.start();






// =====================================
// Çizim Motoru
// =====================================


function render(){
if(!lastPoint){

    lastPoint=fingerPoint;
    return;

}
if(shapeMode){

    shapePoints.push({

        x:fingerPoint.x,

        y:fingerPoint.y

    });

}


    requestAnimationFrame(render);
    
    renderHologram(ctx);


drawEnergy(ctx);



    if(

        !drawEnabled ||

        !fingerPoint

    ){


        lastPoint=null;

        return;

    }
    setInterval(()=>{

saveHistory();

},3000);
    

// Hareket hızı hesaplama

if(previousPoint){

    currentSpeed =
    Math.hypot(
        fingerPoint.x - previousPoint.x,
        fingerPoint.y - previousPoint.y
    );

}


previousPoint = {

    x:fingerPoint.x,

    y:fingerPoint.y

};



// Smooth hareket

fingerPoint.x =
fingerPoint.x * SETTINGS.smooth +
(lastPoint ? lastPoint.x : fingerPoint.x)
*
(1-SETTINGS.smooth);


fingerPoint.y =
fingerPoint.y * SETTINGS.smooth +
(lastPoint ? lastPoint.y : fingerPoint.y)
*
(1-SETTINGS.smooth);


    if(!lastPoint){


        lastPoint={

            x:fingerPoint.x,

            y:fingerPoint.y

        };


        return;

    }




    // SİLGİ


    if(eraseEnabled){


        ctx.save();



        ctx.globalCompositeOperation =
        "destination-out";



        ctx.beginPath();



        ctx.arc(

            fingerPoint.x,

            fingerPoint.y,

            SETTINGS.size*3,

            0,

            Math.PI*2

        );



        ctx.fill();



        ctx.restore();


    }


    // KALEM


    else{


        ctx.beginPath();


        ctx.moveTo(

            lastPoint.x,

            lastPoint.y

        );



        ctx.lineTo(

            fingerPoint.x,

            fingerPoint.y

        );



        // Hız bazlı kalınlık

let dynamicSize =
SETTINGS.size +
currentSpeed * 0.15;



ctx.lineWidth =
Math.min(
50,
dynamicSize
);



// Gökkuşağı modu

if(rainbowMode){


    ctx.strokeStyle =
    `hsl(
    ${Date.now()/5 % 360},
    100%,
    50%
    )`;


}else{


    ctx.strokeStyle =
    SETTINGS.color;


}



ctx.shadowBlur =
SETTINGS.glow + 15;


ctx.shadowColor =
ctx.strokeStyle;

        ctx.lineCap =
        "round";



        ctx.shadowBlur =
        SETTINGS.glow;



        ctx.shadowColor =
        SETTINGS.color;



        ctx.stroke();



    }





    lastPoint={


        x:fingerPoint.x,


        y:fingerPoint.y


    };



}




render();

if(fingerPoint){
createParticle(fingerPoint.x,fingerPoint.y);
}




updateParticles();

function createParticle(x,y){


    particles.push({

        x:x,

        y:y,

        size:
        Math.random()*5+2,

        life:1,

        speedX:
        (Math.random()-0.5)*3,

        speedY:
        (Math.random()-0.5)*3

    });


}



function updateParticles(){


    for(let i=particles.length-1;i>=0;i--){


        let p =
        particles[i];


        p.x += p.speedX;

        p.y += p.speedY;


        p.life-=0.03;



        ctx.globalAlpha =
        p.life;


        ctx.beginPath();


        ctx.arc(

            p.x,

            p.y,

            p.size,

            0,

            Math.PI*2

        );


        ctx.fillStyle =
        SETTINGS.color;


        ctx.fill();



        if(p.life<=0){

            particles.splice(i,1);

        }


    }


    ctx.globalAlpha=1;


}
rainbowBtn.onclick=()=>{

    rainbowMode =
    !rainbowMode;

};
function analyzeShape(){


    if(shapePoints.length < 20)
        return;



    let first =
    shapePoints[0];


    let last =
    shapePoints[
    shapePoints.length-1
    ];



    let close =
    calculateDistance(
        first,
        last
    );



    let minX=Infinity;
    let maxX=-Infinity;

    let minY=Infinity;
    let maxY=-Infinity;



    shapePoints.forEach(p=>{


        minX=Math.min(
        minX,p.x
        );


        maxX=Math.max(
        maxX,p.x
        );


        minY=Math.min(
        minY,p.y
        );


        maxY=Math.max(
        maxY,p.y
        );


    });



    let width =
    maxX-minX;


    let height =
    maxY-minY;



    // Daire

    if(
        close < 80 &&
        Math.abs(width-height)<80
    ){

        drawCircle(
            minX,
            minY,
            width
        );


        status.innerHTML=
        "AI: Daire algılandı";


    }



    // Kare


    else if(
        Math.abs(width-height)<60
    ){


        drawSquare(
            minX,
            minY,
            width,
            height
        );


        status.innerHTML=
        "AI: Kare algılandı";

    }


    // Üçgen


    else{


        drawTriangle(
            minX,
            minY,
            width,
            height
        );


        status.innerHTML=
        "AI: Üçgen algılandı";


    }



    shapePoints=[];

}
function drawCircle(x,y,size){


ctx.beginPath();


ctx.arc(

x+size/2,

y+size/2,

size/2,

0,

Math.PI*2

);


ctx.strokeStyle=SETTINGS.color;

ctx.lineWidth=SETTINGS.size;

ctx.stroke();


}
function drawSquare(x,y,w,h){


ctx.strokeRect(

x,

y,

w,

h

);


}
function drawTriangle(x,y,w,h){


ctx.beginPath();


ctx.moveTo(

x+w/2,

y

);


ctx.lineTo(

x,

y+h

);


ctx.lineTo(

x+w,

y+h

);


ctx.closePath();


ctx.strokeStyle=
SETTINGS.color;


ctx.lineWidth=
SETTINGS.size;


ctx.stroke();


}
shapeBtn.onclick=()=>{


shapeMode =
!shapeMode;


shapePoints=[];


status.innerHTML =
shapeMode ?
"AI Şekil Açık":
"Normal Çizim";


};
function saveHistory(){

    history.push(
        drawCanvas.toDataURL()
    );


    if(history.length > 30){

        history.shift();

    }


    redoStack=[];

}




function undo(){


    if(history.length===0)
        return;


    redoStack.push(
        drawCanvas.toDataURL()
    );


    let img =
    new Image();


    img.onload=()=>{


        ctx.clearRect(

        0,

        0,

        drawCanvas.width,

        drawCanvas.height

        );


        ctx.drawImage(
        img,
        0,
        0
        );


    };


    img.src =
    history.pop();



}




function redo(){


if(redoStack.length===0)
return;



history.push(
drawCanvas.toDataURL()
);



let img =
new Image();



img.onload=()=>{


ctx.clearRect(
0,
0,
drawCanvas.width,
drawCanvas.height
);


ctx.drawImage(
img,
0,
0
);


};



img.src =
redoStack.pop();



}

undoBtn.onclick=()=>{

undo();

};



redoBtn.onclick=()=>{

redo();

};

svgBtn.onclick=()=>{


let svg =
`
<svg 
xmlns="http://www.w3.org/2000/svg"
width="${drawCanvas.width}"
height="${drawCanvas.height}">


<image 
href="${drawCanvas.toDataURL()}"
width="100%"
height="100%"/>


</svg>
`;



let blob =
new Blob(
[svg],
{
type:"image/svg+xml"
}
);



let link =
document.createElement("a");



link.download=
"AirDraw.svg";


link.href=
URL.createObjectURL(blob);


link.click();



};
voiceBtn.onclick=()=>{


const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(!SpeechRecognition){

alert("Ses desteklenmiyor");

return;

}



let recognition =
new SpeechRecognition();



recognition.lang="tr-TR";



recognition.start();



recognition.onresult=e=>{


let text =
e.results[0][0].transcript;



if(text.includes("temizle")){


ctx.clearRect(
0,
0,
drawCanvas.width,
drawCanvas.height
);


}



if(text.includes("geri al")){

undo();

}



if(text.includes("kaydet")){


saveBtn.click();


}


};


};
if(hologramMode){


ctx.shadowBlur=50;


ctx.globalAlpha=
0.7+
Math.random()*0.3;


}
else{


ctx.globalAlpha=1;


}
hologramBtn.onclick=()=>{


hologramMode=
!hologramMode;


};
creatorBtn.onclick=()=>{


creatorMode=
!creatorMode;


status.innerHTML =
creatorMode ?
"AI Creator Aktif":
"Normal Mod";


};



voiceBtn.onclick=()=>{


startAssistant();


};
function updateAIStatus(){


let result =
predictDrawing();



if(result){


aiStatus.innerHTML =
"AI: "+result.type;


}


}
learnBtn.onclick=()=>{


startLearning();


status.innerHTML=
"AI öğreniyor";


};



trainBtn.onclick=()=>{


trainAI();


status.innerHTML=
"AI eğitim tamamlandı";


};