function fillDUForm(objectID){
    document.getElementById("name-du").value = listOfAllLocations[objectID].Name;
    document.getElementById("description-du").value = listOfAllLocations[objectID].Description;
    document.getElementById("address-du").value = listOfAllLocations[objectID].Address;
    document.getElementById("postCode-du").value = listOfAllLocations[objectID].Postcode;
    document.getElementById("city-du").value = listOfAllLocations[objectID].City;
    document.getElementById("lat-du").value = listOfAllLocations[objectID].Lat;
    document.getElementById("lon-du").value = listOfAllLocations[objectID].Lon;

    //EventListener delete and update
    // Remove existing submit event listener using a named function
    document.getElementById("formDU").removeEventListener("submit", handleDUFormSubmission);

    // Add a new submit event listener with a named function
    document.getElementById("formDU").addEventListener("submit", function (e) {
        handleDUFormSubmission(e, objectID);
    });
}

function handleDUFormSubmission(e, objectID) {
    // Prevent the default form submission
    e.preventDefault();

    if (e.submitter.id === "duDeleteBtn") {
        deleteLocation(objectID);
    } else if (e.submitter.id === "duUpdateBtn") {
        updateLocation(e, objectID);
    }
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

function updateLocation(e, locationId){
    console.log("updateLocation called for locationId:", locationId);
    deleteLocation(locationId);
    getNewLocationData(e, "update", locationId);
}