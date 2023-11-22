function fillDUForm(objectID){
    document.getElementById("name-du").value = listOfAllLocations[objectID].Name;
    document.getElementById("description-du").value = listOfAllLocations[objectID].Description;
    document.getElementById("address-du").value = listOfAllLocations[objectID].Address;
    document.getElementById("postCode-du").value = listOfAllLocations[objectID].Postcode;
    document.getElementById("city-du").value = listOfAllLocations[objectID].City;
    document.getElementById("lat-du").value = listOfAllLocations[objectID].Lat;
    document.getElementById("lon-du").value = listOfAllLocations[objectID].Lon;

    //EventListener delete and update
    document.getElementById("formDU").addEventListener("submit", function(){ deleteLocation(objectID); });
    document.getElementById("formDU").addEventListener("logoutBtn", function(){ updateLocation(objectID); });
}

function deleteLocation(locationId) {
    // Assuming locationId corresponds to the ID property in the location object
    if (markers[locationId]) {
        map.removeLayer(markers[locationId]);
        delete markers[locationId];
        delete listOfAllLocations[locationId];

        // Remove the corresponding list item
        let listItem = document.querySelector(`[data-id="${locationId}"]`);
        if (listItem) {
            listItem.remove();
        }
    }
    // Return to the main view
    fromDUToMain();
}

function updateLocation(locationId){
    deleteLocation(locationId);

    let inputName = document.getElementById("name-du").value;
    let inputDescription = document.getElementById("description-du").value; 
    let inputAddresss = document.getElementById("address-du").value;
    let inputPostcode = document.getElementById("postCode-du").value;
    let inputCityname =  document.getElementById("city-du").value;
    let inputLat = document.getElementById("lat-du").value;
    let inputLon = document.getElementById("lon-du").value;

    calculateGeocoordinates();

    newListItem(inputName, inputDescription, inputAddresss,
        inputPostcode, inputCityname, inputLat, inputLon);
}