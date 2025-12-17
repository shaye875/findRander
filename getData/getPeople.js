import fs from 'fs'

export async function getPeople(){
    try{
    const res = await fetch("https://spiestestserver.onrender.com/people")
    const arrPeople = await res.text()
    return arrPeople
    }catch(err){
        console.error(err);
    }
}


export async function toJson(){
    fs.writeFile("./data/PEOPLE.json",await getPeople(),(err)=>{
        if(err){
            console.error(err);
            
        }else{
            console.log("people added");
        }
    })
}


