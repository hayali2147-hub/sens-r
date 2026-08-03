// =====================================
// AI Voice Assistant
// =====================================



function startAssistant(){


const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(!SpeechRecognition){

alert(
"Tarayıcı desteklemiyor"
);

return;

}



let voice =
new SpeechRecognition();



voice.lang="tr-TR";


voice.start();



voice.onresult=e=>{


let command =
e.results[0][0].transcript
.toLowerCase();



if(command.includes("ev çiz")){


generateSketch("ev");


}



if(command.includes("kalp çiz")){


generateSketch("kalp");


}



if(command.includes("yıldız çiz")){


generateSketch("yıldız");


}



if(command.includes("temizle")){


clearBtn.click();


}



};


}