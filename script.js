const video = document.querySelector(".input_video");

const cameraCanvas = document.getElementById("cameraCanvas");
const cameraCtx = cameraCanvas.getContext("2d");

const drawCanvas = document.getElementById("drawCanvas");
const drawCtx = drawCanvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const sizePicker = document.getElementById("sizePicker");

const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");

let lastX = null;
let lastY = null;

function resize(){

    cameraCanvas.width = window.innerWidth;
    cameraCanvas.height = window.innerHeight;

    drawCanvas.width = window.innerWidth;
    drawCanvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

clearBtn.onclick=()=>{

    drawCtx.clearRect(
        0,
        0,
        drawCanvas.width,
        drawCanvas.height
    );

};

saveBtn.onclick=()=>{

    const a=document.createElement("a");

    a.download="AirDraw.png";

    a.href=drawCanvas.toDataURL();

    a.click();

};

const hands=new Hands({

locateFile:(file)=>{

return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;

}

});

hands.setOptions({

maxNumHands:1,

modelComplexity:1,

minDetectionConfidence:0.7,

minTrackingConfidence:0.7

});

hands.onResults(onResults);
const camera = new Camera(video, {
    onFrame: async () => {
        await hands.send({ image: video });
    },
    width: 1280,
    height: 720
});

camera.start();

// Buradan sonra fonksiyon başlar

function onResults(results){

    cameraCtx.clearRect(0,0,cameraCanvas.width,cameraCanvas.height);

    cameraCtx.save();

    cameraCtx.scale(-1,1);
    cameraCtx.drawImage(
        results.image,
        -cameraCanvas.width,
        0,
        cameraCanvas.width,
        cameraCanvas.height
    );
    cameraCtx.restore();

    if(!results.multiHandLandmarks || results.multiHandLandmarks.length===0){
        lastX = null;
        lastY = null;
        return;
    }

    for(const landmarks of results.multiHandLandmarks){

        drawConnectors(
            cameraCtx,
            landmarks,
            HAND_CONNECTIONS,
            {
                color:"#00FFFF",
                lineWidth:2
            }
        );

        drawLandmarks(
            cameraCtx,
            landmarks,
            {
                color:"#00BFFF",
                lineWidth:1,
                radius:3
            }
        );

        // İşaret parmağı ucu
        const finger = landmarks[8];

        const x = (1 - finger.x) * drawCanvas.width;
        const y = finger.y * drawCanvas.height;

        if(lastX === null){
            lastX = x;
            lastY = y;
        }

        drawCtx.beginPath();
        drawCtx.moveTo(lastX,lastY);
        drawCtx.lineTo(x,y);

        drawCtx.strokeStyle = colorPicker.value;
        drawCtx.lineWidth = sizePicker.value;
        drawCtx.lineCap = "round";
        drawCtx.lineJoin = "round";

        // Neon efekti
        drawCtx.shadowBlur = 20;
        drawCtx.shadowColor = colorPicker.value;

        drawCtx.stroke();

        lastX = x;
        lastY = y;
    }
}