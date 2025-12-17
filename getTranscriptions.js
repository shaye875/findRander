import fs from 'fs'

export async function getArr() {
    const res = await fetch("https://spiestestserver.onrender.com/transcriptions")
    const arrTranc = await res.text()
    return arrTranc
}

export async function toJsonTranc() {
    fs.writeFile("./data/TRANSCRIPTIONS.json",await getArr(),(err)=>{
        if(err){
            console.error(err);
        }else{
            console.log("data added");
        }
    })
}
