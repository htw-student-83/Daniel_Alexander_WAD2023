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

    if(!inputLocationName == "" || !inputDescribing == "" || !inputAdress == ""){
        newListItem(inputLocationName, inputDescribing, inputAdress, inputPC, inputCityName, inputLat, inputLon);
    }else{
         alert("The fields with * are required.")
    }
}

function newListItem(inputLocationName, inputDescribing, inputAdress, inputPC, inputCityName, inputLat, inputLon){
     var li = document.createElement("li");
     li.appendChild(document.createTextNode(inputLocationName + ', '
                                             + inputDescribing + ', '
                                             + inputAdress +', '
                                             + inputPC + ', '
                                             + inputCityName + ', '
                                             + inputLat + ', '
                                             + inputLon) + ', ');
     document.getElementById('table')appendChild(li);

}


