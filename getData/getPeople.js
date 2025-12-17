import fs from 'fs'

export async function getPeople(){
    try{
    const res = await fetch("https://spiestestserver.onrender.com/people")
    const arrPeople = await res.text()
    return arrPeople
    }catch(err){
        console.error(err)
    }
}


export async function toJson(){
    const arr =await getPeople()
    return new Promise((res)=>{
        fs.writeFile("data/PEOPLE.json",arr,(err)=>{
        if(err){
            rej(err);
            
        }else{
            res("people added");
        }
    })
})
}

