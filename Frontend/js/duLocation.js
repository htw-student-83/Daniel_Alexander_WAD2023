function getOneLocationDU(locationID){
       fetch(`/api/loc/${locationID}`, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
           },
       })
           .then(response => response.json())
           .then(location => fillDUForm(location))
           .catch(error => console.error('Error:', error))
}

function fillDUForm(location){
    document.getElementById("name-du").value = location.Name;
    document.getElementById("description-du").value = location.Description;
    document.getElementById("address-du").value = location.Address;
    document.getElementById("postCode-du").value = location.Postcode;
    document.getElementById("city-du").value = location.City;
    document.getElementById("lat-du").value = location.Lat;
    document.getElementById("lon-du").value = location.Lon;

    document.getElementById("formDU").onsubmit = function (event){
        handleDUFormSubmission(event, location._id)
    }
}

function handleDUFormSubmission(event, locationID) {
    // Prevent the default form submission
    event.preventDefault();

    if (event.submitter.id === "duDeleteBtn") {
        deleteLocation(event, locationID);
    } else if (event.submitter.id === "duUpdateBtn") {
        updateLocation(event, locationID);
    }
}

function deleteLocation(event, locationID) {
    // Assuming locationId corresponds to the ID property in the location object
    if (markers[locationID]) {
        map.removeLayer(markers[locationID]);
        delete markers[locationID];

        // Remove the corresponding list item
        let listItem = document.querySelector(`[data-id="${locationID}"]`);
        if (listItem) {
            listItem.remove();
        }
    }

    if(event.submitter.id === "duDeleteBtn"){
        fetch(`/api/loc/${locationID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .catch(error => console.error('Error:', error));
    }

    // Return to the main view
    fromDUToMain();
}

function updateLocation(event, locationID){
    getNewLocationData(event, locationID);
}