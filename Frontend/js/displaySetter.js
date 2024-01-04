function setAllNoneButLogin(){
    setDisplay('main-container', false);
    setDisplay('add-container', false);
    setDisplay('du-container', false);
}

function buttonSetter(role){
    if(role === "admin"){
        document.getElementById('mainAddBtn').style.display = "block";
        document.getElementById('duUpdateBtn').style.display = "block"
        document.getElementById('duDeleteBtn').style.display = "block"
        document.getElementById('duCancelBtn').style.justifyContent = "none"
    }
    if(role === "non-admin"){
        document.getElementById('mainAddBtn').style.display = "none";
        document.getElementById('duUpdateBtn').style.display = "none"
        document.getElementById('duDeleteBtn').style.display = "none"
        document.getElementById('duButtonContainer').style.justifyContent = "center"
    }
}

function setDisplay(containerID, isDisplay) {
    const container = document.getElementById(containerID);
    container.style.display = isDisplay ? 'grid' : 'none';

    if (containerID === 'login-container') {
        document.getElementById('web-name').style.display = isDisplay ? 'flex' : 'none';
    }
}

function fromLoginToMain(){
    setDisplay('login-container', false)
    setDisplay('main-container', true);
}

document.getElementById("mainAddBtn").onclick = fromMainToAdd;

function fromMainToAdd(){
    setDisplay('main-container', false);
    setDisplay('add-container', true);
}

document.getElementById("addCancelButton").onclick = fromAddToMain;

function fromAddToMain(){
    setDisplay('main-container', true);
    setDisplay('add-container', false);
    clearAddForm();
}

document.getElementById("address-list").onclick = fromMainToDU;

function fromMainToDU(event){
    setDisplay('main-container', false);
    setDisplay('du-container', true);
    getOneLocationDU(event.target.dataset.id);
}

document.getElementById("duCancelBtn").onclick = fromDUToMain;

function fromDUToMain(){
    setDisplay('main-container', true);
    setDisplay('du-container', false);
}

document.getElementById("logoutBtn").onclick = logout;

function logout(){
    setDisplay('login-container', true);
    setAllNoneButLogin();
    resetAttemptCount();
    document.getElementById('username-login').value = "";
    document.getElementById('password-login').value = "";
}

window.onload = eventHandlerLogin;