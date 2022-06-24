function transformAndDownload() {

    const originalXMLPath = document.getElementById("SourceFile").value;
    const transformXSLPath = document.getElementById("XSLFile").value;

    const originalXML = loadXMLDoc(originalXMLPath);
    const transformXSL = loadXMLDoc(transformXSLPath);

    // code for Chrome, Firefox, Opera, etc.
    if (document.implementation && document.implementation.createDocument) {

        const xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(transformXSL);

        // const resultDocument = xsltProcessor.transformToFragment(originalXML, document);
        const resultDocument = xsltProcessor.transformToDocument(originalXML);

        const resultString = new XMLSerializer().serializeToString(resultDocument.documentElement);

        const downloadFile = document.getElementById("DownloadFile").checked;

        if (downloadFile) {

            downloadXML(resultString);

        } else {
            // Test only
            const elPreview = document.getElementById("Preview").style.display = "";
            const elResult = document.getElementById("Result").value = resultString;
        }

    }

}

function downloadXML(stringContent) {

    const targetFilename = document.getElementById("TargetFile").value;
    download(targetFilename, stringContent);

}

function download(filename, stringContent) {
    var element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(stringContent));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

}

function loadXMLDoc(filename) {

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", filename, false);

    try {
        xhttp.resposeType = "msxml-document";
    } catch (err) {

    }

    xhttp.send("");
    return xhttp.responseXML;

}


//============================================================================

function download() {

    const url = document.config.service.value;
    const api = document.querySelector('input[name="selectedApi"]:checked').value;
    const fullUrl = url + api;

    fetch(fullUrl)
        .then(response => response.json())
        .then(json => console.log(convertToCSV(json)));

}

function convertToCSV(json) {

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
            elements.push(...readJson(object[property]));
        } else {
            readKeys ? elements.push(property) : elements.push(object[property]);
        }

    }

    return elements;

}