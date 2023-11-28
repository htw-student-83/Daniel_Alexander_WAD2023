// Initialize Leaflet map
let map = L.map('map').setView([52.52150585, 13.412380949017187], 15);
// Initial coordinates for Alexanderplatz 1, 10178 Berlin

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

function updateMapMarkers(locations) {
    // Clear existing markers
    Object.values(markers).forEach(marker => {
        map.removeLayer(marker);
    });
    markers = {}; // Clear the markers object

    // Add markers for each location
    Object.values(locations).forEach(location => {
        let marker = L.marker([location.Lat, location.Lon], { objectID: location.ID }).addTo(map);
        marker.bindPopup(location.Name);
        markers[location.ID] = marker;
    });
}

function addDefaultLocation(){

    let formType = "add";
    // Add markers for each location
    Object.values(listOfAllDefaultLocations).forEach(location => {
        newListItem(
            location.Name,
            location.Description,
            location.Address,
            location.Postcode,
            location.City,
            location.Lat,
            location.Lon,
            formType
        );
    });
}

document.getElementById("formAdd").onsubmit = function (e) {
    getNewLocationData(e, "add");
};

//The data, which we get from the user
function getNewLocationData(e, formType, locationID){
    e.preventDefault()
    let inputLocationName, inputDescription, inputAddress, inputPostCode, inputCityName, ID;

    if (formType === 'add') {
        inputLocationName = document.getElementById('name-add').value;
        inputDescription = document.getElementById('description-add').value;
        inputAddress = document.getElementById('address-add').value;
        inputPostCode = document.getElementById('postCode-add').value;
        inputCityName = document.getElementById('city-add').value;
    } else if (formType === 'update') {
        inputLocationName = document.getElementById('name-du').value;
        inputDescription = document.getElementById('description-du').value;
        inputAddress = document.getElementById('address-du').value;
        inputPostCode = document.getElementById('postCode-du').value;
        inputCityName = document.getElementById('city-du').value;
        ID = locationID;
        console.log("getNewLocationData" + locationID)
    }

    if (!hasStreetAndNumber(inputAddress)) {
        alert('Please make sure to include both the street name and number in the address field.');
        return; // Prevent further execution of the function
    }

    // Check if user provided latitude and longitude
    // Use OpenCage Geocoding API to get latitude and longitude
    let apiKey = '12761e8e169943a3963d765072b0cc34';
    let geocodingUrl =
        `https://api.opencagedata.com/geocode/v1/json?countrycode=de&q=
        ${encodeURIComponent(inputPostCode)},
        ${encodeURIComponent(inputCityName)},
        ${encodeURIComponent(inputAddress)}
        &key=${apiKey}`;

    fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
            let highestConfidenceResult = getHighestConfidenceResult(data.results, 10);

            if (highestConfidenceResult || inputAddress === data.results.components.road + " " + data.results.components.house_number) {
                if(formType === "update"){
                    deleteLocation(ID);
                }
                let inputLat = highestConfidenceResult.geometry.lat;
                let inputLon = highestConfidenceResult.geometry.lng;
                newListItem(inputLocationName, inputDescription, inputAddress,
                            inputPostCode, inputCityName, inputLat, inputLon, formType, ID);
            } else {
                alert('Invalid or ambiguous address. Please provide a more specific address.');
            }
        })
        .catch(error => console.error('Error during geocoding:', error))
}

let markers = [];
let listOfAllLocations = {};

function newListItem(inputLocationName, inputDescription, inputAddress, inputPC, inputCityName, inputLat, inputLon, formType, locID){
    let addressObject;

    if(formType === "add"){
        addressObject =
            {
                Name: inputLocationName,
                Description: inputDescription,
                Address: inputAddress,
                Postcode: inputPC,
                City: inputCityName,
                Lat: inputLat,
                Lon: inputLon,
                ID: generateUniqueId()
            };
    }else if (formType === "update") {
        // Create a deep copy of the existing object before modifying it
        console.log("elseIf " + locID)
        console.log(listOfAllLocations)
        addressObject =
            {
                Name: inputLocationName,
                Description: inputDescription,
                Address: inputAddress,
                Postcode: inputPC,
                City: inputCityName,
                Lat: inputLat,
                Lon: inputLon,
                ID: locID
            };
    }
    console.log("newListItem: " + addressObject.Name)
    listOfAllLocations[addressObject.ID] = addressObject;

    let nonEmptyValues = Object.values(addressObject).filter(value => typeof value === 'string' && value.trim() !== '');
    let listItemText = nonEmptyValues.join(', ');
    let addressListItem = document.createElement("li");
    addressListItem.setAttribute('data-id', addressObject.ID.toString());
    addressListItem.appendChild(document.createTextNode(listItemText));
    document.getElementById('address-list').appendChild(addressListItem);

    updateMapMarkers(listOfAllLocations);

    if(document.getElementById("add-container").style.display === "grid"){
        fromAddToMain();
        clearAddForm();
    }

    console.log(listOfAllLocations)
    console.log(markers)
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substring(2, 11);
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

function clearAddForm(){
    document.getElementById('name-add').value = "";
    document.getElementById('description-add').value = "";
    document.getElementById('address-add').value = "";
    document.getElementById('postCode-add').value = "";
    document.getElementById('lat-add').value = "";
    document.getElementById('lon-add').value = "";
}