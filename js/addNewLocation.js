function newLocationAdd(){
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('add-container').style.display = 'grid';
}

function fromAddToMain(){
    document.getElementById('add-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'grid';
}

//The data, which we get from the user
function getNewLocationData(){
    let inputLocationName = document.getElementById('name-add').value;
    let inputDescribing = document.getElementById('description-add').value;
    let inputAdress = document.getElementById('address-add').value;
    let inputPC = document.getElementById('postCode-add').value;
    let inputCityName = document.getElementById('city-add').value;
    let inputLat = document.getElementById('lat-add').value;
    let inputLon = document.getElementById('lon-add').value;
}