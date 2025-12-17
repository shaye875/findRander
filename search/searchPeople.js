import fs from 'fs'
import readLineSync from 'readline-sync'


export function searchPeopleByName() {
    const name = readLineSync.question("enter a name: ")
    fs.readFile("./data/PEOPLE.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const arrData = JSON.parse(data)
            let bool = true
            arrData.forEach((p) => {
                if (p.name.toLowerCase() === name.toLowerCase()) {
                    console.log(p);
                    bool = false
                }
            })
            if (bool === true) {
                console.log("not found");
            }
        }
    })
}

export function searchPeopleByAge(){
    const age = readLineSync.question("enter a age: ")
     fs.readFile("./data/PEOPLE.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const arrData = JSON.parse(data)
            let bool = true
            arrData.forEach((p) => {
                if (Number(p.age) === Number(age)) {
                    console.log(p);
                    bool = false
                }
            })
            if (bool === true) {
                console.log("not found");
            }
        }
    })
}
