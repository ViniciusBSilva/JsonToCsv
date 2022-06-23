const json = [{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
}, {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
        }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
    }
}];


convertToCSV(json);

function readObject(object) {

    for (property in object) {

        if (typeof object[property] === "object") {
            readObject(object[property]);
        } else {
            console.log(`property Type = ${typeof property} | value = `, property);
            // console.log(`object[property] Type = ${typeof object[property]} | value =`, object[property]);
        }

    }

}

function convertToCSV(json) {

    readObject(json);

    const keys = Object.keys(json);
    // console.log(keys);

    const array = [keys].concat(json)
    // console.log("array", array);

    // console.log("=================================================================")
    return array.map(it => {
        // console.log("it", it);
        const values = Object.values(it)
        // console.log("values", values);
        const string = values.toString();
        // console.log("string", string);
        return string;
        // return Object.values(it).toString()
    }).join('\n')
}