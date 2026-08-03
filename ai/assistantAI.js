// =====================================
// AI Creative Assistant
// =====================================


function aiSuggest(){


let suggestions=[

"Çizgileri yumuşat",

"Renk kontrastını artır",

"Neon efekti ekle",

"Şekli düzelt",

"Perspektif ekle"

];


let random =
suggestions[
Math.floor(
Math.random()*suggestions.length
)
];


return random;


}




function runAssistant(){


let result =
aiSuggest();


aiStatus.innerHTML =
"AI Önerisi: "+result;


}