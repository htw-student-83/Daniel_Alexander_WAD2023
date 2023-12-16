function getOneLocationDU(objectID){
       fetch(`/api/loc/${objectID}`, {
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

    document.getElementById("formDU").onsubmit = function (e){
        handleDUFormSubmission(e, location)
    }
}

function handleDUFormSubmission(e, location) {
    // Prevent the default form submission
    e.preventDefault();

    if (e.submitter.id === "duDeleteBtn") {
        deleteLocation(location);
    } else if (e.submitter.id === "duUpdateBtn") {
        updateLocation(e, location);
    }
}

function deleteLocation(location) {
    // Assuming locationId corresponds to the ID property in the location object
    if (markers[location._id]) {
        map.removeLayer(markers[location._id]);
        delete markers[location._id];

        // Remove the corresponding list item
        let listItem = document.querySelector(`[data-id="${location._id}"]`);
        if (listItem) {
            listItem.remove();
        }
    }

    fetch(`/api/loc/${location._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .catch(error => console.error('Error:', error));

    // Return to the main view
    fromDUToMain();
}

function updateLocation(e, location){
    getNewLocationData(e, location);
    fromDUToMain();
}