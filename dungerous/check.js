
import { lookupService } from 'dns/promises';
import fs from 'fs'

async function arrCall(){
   return new Promise((res,rej)=>{
    fs.readFile("./data/TRANSCRIPTIONS.json","utf8",(err,data)=>{
    res(JSON.parse(data))
   }) 
})}

async function arrPeople(){
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

function sortByAverge(obj){
    let objavg = {}
    for(let k in obj){
        objavg[k] = averge(obj[k])
    }
    const list = Object.entries(objavg)
    list.sort((a,b)=>b[1]-a[1])
    return list
}

export async function arrAgeDung(){
    return new Promise((res)=>{
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
        const list =sortByAverge(obj)
        res([list[0],list[1],list[2]])
    })
})
    
    
}

export async function report(){
    const top3 =await arrAgeDung().then(async(top)=>{
    const people =await arrPeople().then(async(arr)=>{
    const listPeople = arr.filter((p)=>{
        top.forEach((a)=>{
            if(a[0] === p.age){
                return p
            }
        })
    })
    const res =await fetch(`https://spiestestserver.onrender.com/report?data=${listPeople}`)
    const data =await res.text()
    console.log(data);
    })
})
}








