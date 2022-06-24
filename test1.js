const example = [{
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

convertToCSV(example);

function convertToCSV(json) {

    // Create an array from the JSON string (or just use it if it's already an array)
    const jsonArray = Array.isArray(json) ? json : [json];

    // Iterate recursively through the keys of the first line of the JSON to get nested keys and use all as header
    const jsonKeys = readKeys(jsonArray[0]);

    // Iterate recursively through the JSON elements to get nested values
    const jsonValues = [];
    jsonArray.forEach(item => {
        jsonValues.push(readValues(item))
    });

    // Concat results
    const resultArray = [].concat([jsonKeys], jsonValues);

    // Return results with each line (item) separated by "\n"
    return resultArray.join("\n");

}

function readValues(object) {

    const values = [];

    // iterate through every property
    for (property in object) {

        /* If value is an object it means it's a nested property.
        *  In that case this function must be called again in order to 
        *  iterate through the nested properties and get back
        */
        if (typeof object[property] === "object") {
            // spread so this function won't return nested arrays
            values.push(...readValues(object[property]));   
        } else {
            values.push(object[property]);
        }

    }

    return values;

}

function readKeys(object) {

    const keys = [];

    for (property in object) {

        if (typeof object[property] === "object") {
            keys.push(...readKeys(object[property]));
        } else {
            keys.push(property);
        }

    }

    return keys;

}