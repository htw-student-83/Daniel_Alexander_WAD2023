function fillDUForm(objectID){
    document.getElementById("name-du").value = listOfAllLocations[objectID].Name;
    document.getElementById("description-du").value = listOfAllLocations[objectID].Description;
    document.getElementById("address-du").value = listOfAllLocations[objectID].Address;
    document.getElementById("postCode-du").value = listOfAllLocations[objectID].Postcode;
    document.getElementById("city-du").value = listOfAllLocations[objectID].City;
    document.getElementById("lat-du").value = listOfAllLocations[objectID].Lat;
    document.getElementById("lon-du").value = listOfAllLocations[objectID].Lon;

    //EventListener delete
    document.getElementById("formDU").addEventListener("submit", function(){ deleteLocation(objectID); });
}

//document.getElementById("formDU").onclick = deleteLocation;

function deleteLocation(objectID) {
    console.log(listOfAllLocations)
    // Get the unique ID of the location
    const locationID = listOfAllLocations[objectID].ID;

    // Remove the location from listOfAllLocations
    delete listOfAllLocations[objectID];

    // Remove the corresponding list item from the UI
    let listItemToRemove = document.querySelector(`[data-id="${objectID}"]`);
    if (listItemToRemove) {
        listItemToRemove.remove();
    }

    // Remove the corresponding marker from the map
    if (markers[locationID]) {
        markers[locationID].remove();
        delete markers[locationID];
    }

    updateMapMarkers(listOfAllLocations)

    // Return to the main view
    fromDUToMain();

    console.log(listOfAllLocations)
}