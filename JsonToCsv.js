function download() {

    const url = document.config.service.value;
    const api = document.querySelector('input[name="selectedApi"]:checked').value;
    const fullUrl = url + api;

    fetch(fullUrl)
        .then(response => response.json())
        .then(json => downloadFile(getFilename(api), convertToCsv(json)));

}

function downloadFile(filename, fileContentString) {

    const element = document.createElement("a");;
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(fileContentString));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

}

function getFilename(param) {
    return param + ".csv";
}

function convertToCsv(json) {

    // Create an array from the JSON string (or just use it if it's already an array)
    const jsonArray = Array.isArray(json) ? json : [json];

    // Iterate recursively through the keys of the first line of the JSON to get nested keys and use all as header
    const jsonKeys = readJson(jsonArray[0], true);

    // Iterate recursively through the JSON elements to get nested values
    const jsonValues = [];
    jsonArray.forEach(item => {
        jsonValues.push(readJson(item))
    });

    // Concat results
    const resultArray = [].concat([jsonKeys], jsonValues);

    // Return results with each line (item) separated by "\n"
    return resultArray.join("\n");

}

/* 
 * Parameter readKeys ->  toogle read keys / read values 
 * false = read ONLY values  (DEFAULT) 
 * true = read ONLY keys
 */
function readJson(object, readKeys = false) {

    const elements = [];

    // iterate through every property
    for (property in object) {

        /* If value is an object it means it's a nested property.
         *  In that case this function must be called again in order to 
         *  iterate through the nested properties and get back
         */
        if (typeof object[property] === "object") {
            // spread so this function won't return nested arrays
            elements.push(...readJson(object[property], readKeys));
        } else {
            // readKeys ? elements.push(handleCsvValue(property)) : elements.push(handleCsvValue(object[property]));
            elements.push(handleCsvValue(readKeys ? property : object[property]));
        }

    }

    return elements;

}

function handleCsvValue(csvValue) {
    if (typeof csvValue === "string") {
        return csvValue.indexOf(",") >= 0 ? `"${csvValue}"` : csvValue;
    } else {
        return csvValue;
    }
}