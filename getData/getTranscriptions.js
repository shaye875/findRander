import fs from 'fs'

export async function getArr() {
    try {
        const res = await fetch("https://spiestestserver.onrender.com/transcriptions")
        const arrTranc = await res.text()
        return arrTranc
    } catch (err) {
        console.error(err);
    }
}

export async function toJsonTranc() {
    const arr =  await getArr()
    return new Promise((res) => {
        fs.writeFile("./data/TRANSCRIPTIONS.json",arr, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("data added");
            }
        })
    })

}


