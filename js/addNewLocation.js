// Initialize Leaflet map
let map = L.map('map').setView([52.52150585, 13.412380949017187], 15);
// Initial coordinates for Alexanderplatz 1, 10178 Berlin

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

document.getElementById("formAdd").onsubmit = getNewLocationData;

//The data, which we get from the user
function getNewLocationData(e){
    e.preventDefault()
    let inputLocationName = document.getElementById('name-add').value;
    let inputDescription = document.getElementById('description-add').value;
    let inputAddress = document.getElementById('address-add').value;
    let inputPostCode = document.getElementById('postCode-add').value;
    let inputCityName = document.getElementById('city-add').value;
    let inputLat = document.getElementById('lat-add').value;
    let inputLon = document.getElementById('lon-add').value;

    if (!hasStreetAndNumber(inputAddress)) {
        alert('Please make sure to include both the street name and number in the address field.');
        return; // Prevent further execution of the function
    }

    // Check if user provided latitude and longitude
    if (inputLat && inputLon) {
        newListItem(inputLocationName, inputDescription, inputAddress, inputPostCode, inputCityName, inputLat, inputLon);
    } else {
        // Use OpenCage Geocoding API to get latitude and longitude
        let apiKey = '12761e8e169943a3963d765072b0cc34';
        let geocodingUrl =
            `https://api.opencagedata.com/geocode/v1/json?countrycode=de&q=
            ${encodeURIComponent(inputAddress)},
            ${encodeURIComponent(inputPostCode)},
            ${encodeURIComponent(inputCityName)}
            &key=${apiKey}`;

        fetch(geocodingUrl)
            .then(response => response.json())
            .then(data => {
                let highestConfidenceResult = getHighestConfidenceResult(data.results, 10);

                if (highestConfidenceResult) {
                    let inputLat = highestConfidenceResult.geometry.lat;
                    let inputLon = highestConfidenceResult.geometry.lng;
                    newListItem(inputLocationName, inputDescription, inputAddress,
                                inputPostCode, inputCityName, inputLat, inputLon);
                } else {
                    alert('Invalid or ambiguous address. Please provide a more specific address.');
                }
            })
            .catch(error => console.error('Error during geocoding:', error));
    }
}

function getHighestConfidenceResult(results, confidenceThreshold) {
    let highestConfidenceResult = null;
    let maxConfidence = confidenceThreshold;

    for (let result of results) {
        if (result.confidence === maxConfidence) {
            maxConfidence = result.confidence;
            highestConfidenceResult = result;
        }
    }

    return highestConfidenceResult;
}

function hasStreetAndNumber(address) {
    return /\s\d/.test(address) || /-\d/.test(address);
}

function newListItem(inputLocationName, inputDescription, inputAddress, inputPC, inputCityName, inputLat, inputLon){
    let addressListItem = document.createElement("li");
    let addressValues = [inputLocationName, inputDescription, inputAddress, inputPC, inputCityName, inputLat, inputLon];
    let nonEmptyValues = addressValues.filter(value => typeof value === 'string' && value.trim() !== '');
    let listItemText = nonEmptyValues.join(', ');
    addressListItem.appendChild(document.createTextNode(listItemText));
    document.getElementById('address-list').appendChild(addressListItem);
    fromAddToMain();
    clearAddForm();

    // Add a marker to the map
    let marker = L.marker([inputLat, inputLon]).addTo(map);
    marker.bindPopup(inputLocationName);
}

function clearAddForm(){
    document.getElementById('name-add').value = "";
    document.getElementById('description-add').value = "";
    document.getElementById('address-add').value = "";
    document.getElementById('postCode-add').value = "";
    document.getElementById('lat-add').value = "";
    document.getElementById('lon-add').value = "";
}

