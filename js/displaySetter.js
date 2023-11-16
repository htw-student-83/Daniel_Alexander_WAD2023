function setAllNoneButLogin(){
    setDisplayMain(false);
    setDisplayAdd(false);
    setDisplayDU(false);
}

function buttonSetter(isAdmin){
    if(isAdmin){
        document.getElementById('mainAddBtn').style.display = "block";
        document.getElementById('duUpdateBtn').style.display = "block"
        document.getElementById('duDeleteBtn').style.display = "block"
    }
    if(!isAdmin){
        document.getElementById('mainAddBtn').style.display = "none";
        document.getElementById('duUpdateBtn').style.display = "none"
        document.getElementById('duDeleteBtn').style.display = "none"
    }
}

function setDisplayLogin(isLogin){
    if(isLogin){
        document.getElementById('web-name').style.display = 'flex';
        document.getElementById('login-container').style.display = 'grid';
    }
    if(!isLogin){
        document.getElementById('web-name').style.display = 'none';
        document.getElementById('login-container').style.display = 'none';
    }
}

function setDisplayMain(isMain){
    if(isMain){
        document.getElementById('main-container').style.display = 'grid';
    }
    if(!isMain){
        document.getElementById('main-container').style.display = 'none';
    }
}

function setDisplayAdd(isAdd){
    if(isAdd){
        document.getElementById('add-container').style.display = 'grid';
    }
    if(!isAdd){
        document.getElementById('add-container').style.display = 'none';
    }
}

function setDisplayDU(isDU){
    if(isDU){
        document.getElementById('du-container').style.display = 'grid';
    }
    if(!isDU){
        document.getElementById('du-container').style.display = 'none';
    }
}

function setLoginNone(){
    setDisplayLogin(false)
}

function fromLoginToMain(){
    setLoginNone();
    setDisplayMain(true);
}

document.getElementById("mainAddBtn").onclick = fromMainToAdd;

function fromMainToAdd(){
    setDisplayMain(false);
    setDisplayAdd(true);
}

document.getElementById("addCancelButton").onclick = fromAddToMain;

function fromAddToMain(){
    setDisplayMain(true);
    setDisplayAdd(false);
}

function fromMainToDU(){
    setDisplayMain(false);
    setDisplayDU(true);
}

document.getElementById("duCancelBtn").onclick = fromDUToMain;

function fromDUToMain(){
    setDisplayMain(true);
    setDisplayDU(false);
}

document.getElementById("logoutBtn").onclick = logout;

function logout(){
    setDisplayLogin(true)
    setAllNoneButLogin();
    document.getElementById('username-login').value = "";
    document.getElementById('password-login').value = "";
}

window.onload = eventHandlerLogin;