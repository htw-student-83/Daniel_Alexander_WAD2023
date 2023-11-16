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
    newListItem(inputLocationName, inputDescription, inputAddress, inputPostCode, inputCityName, inputLat, inputLon);
}

function newListItem(inputLocationName, inputDescription, inputAddress, inputPC, inputCityName, inputLat, inputLon){
    let addressListItem = document.createElement("li");

    // Create an array to hold non-empty values
    let addressValues = [inputLocationName, inputDescription, inputAddress, inputPC, inputCityName, inputLat, inputLon];

    // Filter out empty values
    let nonEmptyValues = addressValues.filter(value => value.trim() !== '');

    // Join non-empty values with commas
    let listItemText = nonEmptyValues.join(', ');

    addressListItem.appendChild(document.createTextNode(listItemText));

    document.getElementById('address-list').appendChild(addressListItem);
    fromAddToMain();
    makeAddFormClear();
    // Add a marker to the map
    let marker = L.marker([inputLat, inputLon]).addTo(map);
    marker.bindPopup(inputLocationName);

}



function makeAddFormClear(){
    document.getElementById('name-add').value = "";
    document.getElementById('description-add').value = "";
    document.getElementById('address-add').value = "";
    document.getElementById('postCode-add').value = "";
    inputCityName = "";
    document.getElementById('lat-add').value = "";
    document.getElementById('lon-add').value = "";
}

