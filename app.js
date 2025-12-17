import readLineSync from 'readline-sync'
import { searchPeopleByAge, searchPeopleByName } from './search/searchPeople.js';
import { toJson } from './getData/getPeople.js';
import { toJsonTranc } from './getData/getTranscriptions.js';
import { arrAgeDung } from './dungerous/check.js';

async function menu() {
    let flag = true
    while (flag) {
        console.log("1.add to jeson arr of people");
        console.log("2.add to json arr of cals");
        console.log("3.search people by name");
        console.log("4.seaech people by age");
        console.log("5.get top ages dunjers");
        console.log("0.exit");

        let choich = Number(readLineSync.question())
        switch (choich) {
            case 1:
                await toJson()
                break
            case 2:
                await toJsonTranc()
            case 3:
                searchPeopleByName()
            case 4:
                searchPeopleByAge()
            case 5:
                await arrAgeDung()
            case 0:
                flag = false
        }
    }
}
await menu()