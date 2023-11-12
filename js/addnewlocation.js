function newLocation(){
    document.getElementById('web-name').style.display = 'none';
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('add-container').style.display = 'grid';
    document.getElementByClassName('mainButtons').style.display = 'flex';
    document.getElementById('du-container').style.display = 'none';
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