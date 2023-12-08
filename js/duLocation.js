import axios from 'axios';
function fillDUForm(objectID){
    console.log("fillDuForm:" + objectID);
    document.getElementById("name-du").value = listOfAllLocations[objectID].Name;
    document.getElementById("description-du").value = listOfAllLocations[objectID].Description;
    document.getElementById("address-du").value = listOfAllLocations[objectID].Address;
    document.getElementById("postCode-du").value = listOfAllLocations[objectID].Postcode;
    document.getElementById("city-du").value = listOfAllLocations[objectID].City;
    document.getElementById("lat-du").value = listOfAllLocations[objectID].Lat;
    document.getElementById("lon-du").value = listOfAllLocations[objectID].Lon;

    // Check if the event listener is already added
    if (!document.getElementById("formDU").hasEventListener) {
        // Define a named function for the event listener
        function handleFormSubmit(e) {
            e.preventDefault();
            const updatedObjectID = objectID;  // Capture the current objectID
            handleDUFormSubmission(e, updatedObjectID);
        }

        // Add a new submit event listener with the named function
        document.getElementById("formDU").addEventListener("submit", handleFormSubmit);

        // Set the flag to indicate that the event listener is added
        document.getElementById("formDU").hasEventListener = true;
    } else {
        // If the event listener is already added, update the stored objectID
        document.getElementById("formDU").updatedObjectID = objectID;
    }
}

function handleDUFormSubmission(e, objectID) {
    // Prevent the default form submission
    e.preventDefault();

    // Get the stored updatedObjectID or use the provided objectID
    const updatedObjectID = document.getElementById("formDU").updatedObjectID || objectID;

    if (e.submitter.id === "duDeleteBtn") {
        deleteLocation(updatedObjectID);
    } else if (e.submitter.id === "duUpdateBtn") {
        updateLocation(e, updatedObjectID);
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

// Copie
async function deleteLocationDB(locationId) {
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
        await axios.delete('/loc/delete', locationId);
    }
    // Return to the main view
    fromDUToMain();
}

function updateLocation(e, locationId){
    getNewLocationData(e, "update", locationId);
}