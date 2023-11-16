// Initialize Leaflet map
let map = L.map('map').setView([52.52150585, 13.412380949017187], 15);
// Initial coordinates for Alexanderplatz 1, 10178 Berlin

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);



//The data, which we get from the user
function getNewLocationData(){
    let inputCityName = "";
    let inputLocationName = document.getElementById('name-add').value;
    let inputDescribing = document.getElementById('description-add').value;
    let inputAdress = document.getElementById('address-add').value;
    let inputPC = document.getElementById('postCode-add').value;
    if(document.getElementById('Berlin').value !=="Berlin"){
        inputCityName = document.getElementById('Berlin').value;
    }else{
        inputCityName = document.getElementById('Brandenburg').value;
    }
    let inputLat = document.getElementById('lat-add').value;
    let inputLon = document.getElementById('lon-add').value;
    if(inputLocationName || inputAdress.length || inputPC){
        newListItem(inputLocationName, inputDescribing, inputAdress, inputPC, inputCityName, inputLat, inputLon);
    }else{
         alert("The fields with * are required.")
    }
}

function newListItem(inputLocationName, inputDescribing, inputAdress, inputPC, inputCityName, inputLat, inputLon){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(inputLocationName+ ', ' + inputDescribing+ ', '+ inputAdress +', '+ inputPC + ', '+ inputCityName + ', ' + inputLat + ', '+ inputLon ));
    //li.textContent = name;
    //li.textContent = inputLocationName;
    //li.setAttribute('Describing', inputDescribing);
    //li.setAttribute('Address', inputAdress);
    //li.setAttribute('Postcode', inputPC);
    //li.setAttribute('CityName', inputCityName);
    //li.setAttribute('data-lat', inputLat);
    //li.setAttribute('data-lon', inputLon);
    document.getElementById('table').appendChild(li);
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

