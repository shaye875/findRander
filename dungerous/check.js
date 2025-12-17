
import fs from 'fs'

function arrCall(){
   return new Promise((res,rej)=>{
    fs.readFile("./data/TRANSCRIPTIONS.json","utf8",(err,data)=>{
        if(err){
            rej(err); 
        }else{
            res(JSON.parse(data))
        }
   }) 
})}

function arrPeople(){
     return new Promise((res,rej)=>{
    fs.readFile("./data/PEOPLE.json","utf8",(err,data)=>{
        if(err){
            rej(err); 
        }else{
            res(JSON.parse(data))
        }
   }) 
})}



function levelDung(call){
    const words = ["death","knife","bomb","attack"]
    let list = call.content.split(" ")
    let sum = 0
    list.forEach((word1)=>{
        for(let word2 of words){
            if(word1[word1.length-1] === ","){
                word1 = word1.slice(0,word1.length-1)
            }
            if(word1.toLowerCase() === word2.toLowerCase()){
                sum+=1
            }
        }
    })
    return {age:call.age,levelDungerous:sum}
}

function averge(list){
    let sum = 0
    list.forEach((n)=>{
        sum+=n
    })
    return sum/list.length
}

export async function arrAgeDung(){
    arrCall().then((arr)=>{
        let obj = {}
        arr.forEach((c)=>{
            let ageDung = levelDung(c)
            let bool = true
            for(let k in obj){
                if(Number(k) === Number(ageDung.age)){
                    bool = false
                }
            }
            if(ageDung.levelDungerous >0){
            if(bool === true){
                obj[ageDung.age] = [ageDung.levelDungerous]
            }else{
                obj[ageDung.age].push(ageDung.levelDungerous)
            }
        }
        })
        const top3 = []
        let bool = true
        for(let k in obj){
            if(top3.length<3){
                top3.push(k)
            }else{
                for(let age of top3){
                    console.log(top3);
                    
                    if(Number(averge(obj[k])) > Number(averge(obj[age]))){
                        console.log(k,Number(averge(obj[k]),age,Number(averge(obj[age]))))
                        top3[top3.indexOf(age)] = k
                        break
                    }
                }
            }
           
        }
        console.log(top3);
    })
    
    
}
arrAgeDung()






