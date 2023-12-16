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
    markers = {}; // Clear the marker object

    // Add markers for each location
    Object.values(locations).forEach(locs => {
        let marker = L.marker([locs.Lat, locs.Lon], { objectID: locs._id }).addTo(map);
        marker.bindPopup(locs.Name);
        markers[locs._id] = marker;
    });
}

// gets all locations from the DB
function getAllLocations(){
    fetch('/api/loc', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(locations => addDBLocations(locations))
        .catch(error => console.error('Error:', error))
}

//adds locations to the list from the DB
function addDBLocations(locations){
    // Add markers for each location
    Object.values(locations).forEach(locs => {
        newListItem(
            locs
        );
    });
}

function getOneLocationAdd(objectID){
    fetch(`/api/loc/${objectID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(location => newListItem(location))
        .catch(error => console.error('Error:', error))
}

document.getElementById("formAdd").onsubmit = function (e) {
    getNewLocationData(e);
};

//The data, which we get from the user
function getNewLocationData(e, locationID){
    e.preventDefault()
    let inputLocationName, inputDescription, inputAddress, inputPostCode, inputCityName;

    if(e.submitter.id === "addLocationButton"){
        inputLocationName = document.getElementById('name-add').value;
        inputDescription = document.getElementById('description-add').value;
        inputAddress = document.getElementById('address-add').value;
        inputPostCode = document.getElementById('postCode-add').value;
        inputCityName = document.getElementById('city-add').value;
    }
    if(e.submitter.id === "duUpdateBtn"){
        inputLocationName = document.getElementById('name-du').value;
        inputDescription = document.getElementById('description-du').value;
        inputAddress = document.getElementById('address-du').value;
        inputPostCode = document.getElementById('postCode-du').value;
        inputCityName = document.getElementById('city-du').value;
    }

    if (!hasStreetAndNumber(inputAddress)) {
        alert('Please make sure to include both the street name and number in the address field.');
        return; // Prevent further execution of the function
    }

    getNewGeoData(e, locationID, inputLocationName, inputDescription, inputAddress, inputPostCode, inputCityName);

}


function getNewGeoData(e, locationID, inputLocationName, inputDescription, inputAddress, inputPostCode, inputCityName){
    // Use Nominatim Geocoding API to get latitude and longitude
    let nominatimUrl =
        `https://nominatim.openstreetmap.org/search?addressdetails=1&format=json&countrycodes=de&q=
        ${encodeURIComponent(inputPostCode)},
        ${encodeURIComponent(inputCityName)},
        ${encodeURIComponent(inputAddress)}`;

    //based on the url, we send a request to a webservice to get the lat and lon
    fetch(nominatimUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                let highestRankResult = data[0];

                if (highestRankResult.place_rank === 30
                    && isRoadInResponse(inputAddress, highestRankResult.address.road)
                    && isHouseNumberInResponse(inputAddress, highestRankResult.address.house_number)
                    && isPostCodeInResponse(inputPostCode, highestRankResult.address.postcode)
                    && isCityInResponse(inputCityName, highestRankResult.address.city)) {

                    let inputLat = parseFloat(highestRankResult.lat);
                    let inputLon = parseFloat(highestRankResult.lon);

                    //new location data will be sent to the server.
                    if(e.submitter.id === "addLocationButton"){
                        fetch('/api/loc', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                Name: inputLocationName,
                                Description: inputDescription,
                                Address: inputAddress,
                                Postcode: inputPostCode,
                                City: inputCityName,
                                Lat: inputLat,
                                Lon: inputLon,
                            }),
                        })
                            .then(response => response.json())
                            .then(location => newListItem(location))
                            .catch(error => console.error('Error:', error));
                    }
                    if(e.submitter.id === "duUpdateBtn"){
                        deleteLocation(e, locationID);
                        fetch(`/api/loc/${locationID}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                Name: inputLocationName,
                                Description: inputDescription,
                                Address: inputAddress,
                                Postcode: inputPostCode,
                                City: inputCityName,
                                Lat: inputLat,
                                Lon: inputLon,
                            }),
                        })
                            .catch(error => console.error('Error:', error))
                        getOneLocationAdd(locationID);
                    }

                } else {
                    // Handle low place_rank, which may indicate an inaccurate or ambiguous result
                    alert('Please provide a more specific and accurate address.');
                }
            } else {
                // No result, handle accordingly
                alert('Address not found. Please provide a more specific address.');
            }
        })
        .catch(error => console.error('Error during geocoding:', error));
}

function isRoadInResponse(inputAddress, responseAddress) {
    const cleanInputAddress = inputAddress.replace(/\b[A-Za-z]*\d+[A-Za-z]*\b/g, '').replace(/\d+/g, '').replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    const cleanResponseAddress = responseAddress.replace(/\b[A-Za-z]*\d+[A-Za-z]*\b/g, '').replace(/\d+/g, '').replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

    return cleanInputAddress === cleanResponseAddress;
}

function isHouseNumberInResponse(inputAddress, responseHouseNumber) {
    const cleanInputAddress = inputAddress.replace(/[^0-9]/g, '').trim();
    const cleanResponseHouseNumber = responseHouseNumber.replace(/[^0-9]/g, '').trim();

    return cleanInputAddress === cleanResponseHouseNumber;
}

function isPostCodeInResponse(inputPostCode, responsePostCode) {
    const cleanInputPostCode = inputPostCode.replace(/[^0-9]/g, '').trim();
    const cleanResponsePostCode = responsePostCode.replace(/[^0-9]/g, '').trim();

    return cleanInputPostCode === cleanResponsePostCode;
}

function isCityInResponse(inputCity, responseCity) {
    const cleanInputCity = inputCity.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    const cleanResponseCity = responseCity.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

    return cleanInputCity === cleanResponseCity;
}

let markers = [];

function newListItem(location){
    // Exclude the ID, Lat, Lon from the displayed information
    let nonEmptyValues = Object.entries(location)
        .filter(([key, value]) => key !== '_id' && key !== 'Lon' && key !== 'Lat' && typeof value === 'string' && value.trim() !== '')
        .map(([key, value]) => value);
    let listItemText = nonEmptyValues.join(', ');

    let addressListItem = document.createElement("li");
    addressListItem.setAttribute('data-id', location._id);
    addressListItem.appendChild(document.createTextNode(listItemText));
    document.getElementById('address-list').appendChild(addressListItem);

    fetch('/api/loc', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(locations => updateMapMarkers(locations))
        .catch(error => console.error('Error:', error))

    if(document.getElementById("add-container").style.display === "grid"){
        fromAddToMain();
        clearAddForm();
    }
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