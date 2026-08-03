// =====================================
// Cloud Storage Layer
// =====================================



async function uploadFile(file){


console.log(
"Dosya buluta gönderildi"
);



return {


url:
"cloud://airdraw/file"


};


}




async function deleteFile(id){


console.log(
"Dosya silindi",
id
);


}