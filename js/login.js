let counterForWrongLogged = 3;

 //User data as objects
let admin = {
    username: "admina",
    passwordAdmin: "password_A",
    role: "admin"
};

let guest = {
    username: "normalo",
    passwordGuest: "password_G",
    role: "non-admin"
};

//default: false
let adminIsLoggedIn;

const eventHandlerLogin = function () {
    setAllNoneButLogin();
    document.getElementById("formLogin").onsubmit = getUserLoginInput;
}

//The data, which we get from the user
function getUserLoginInput(e){
    e.preventDefault();
    let inputUsername = document.getElementById('username-login').value;
    let inputPassword = document.getElementById('password-login').value;
    loginCheck(inputUsername, inputPassword)
}

//The data from the user will check for a successfully login
function loginCheck(inputUsername, inputPassword){
      if(inputUsername && inputPassword){
        if(inputUsername === guest.username && inputPassword === guest.passwordGuest){
            //adminIsLoggedIn == false
            buttonSetter(adminIsLoggedIn);
            fromLoginToMain();
            document.getElementById('userName').innerHTML = ", " + inputUsername;
            return true
        }
        if(inputUsername === admin.username && inputPassword === admin.passwordAdmin){
            //adminIsLoggedIn == !false == true
            buttonSetter(!adminIsLoggedIn);
            fromLoginToMain();
            document.getElementById('userName').innerHTML = ", " + inputUsername;
            return true;
        }else{
            lock()
            return false;
        }
    }
}

 //to lock the user
function lock(){
    counterForWrongLogged--;
    if(counterForWrongLogged !== 0){
        alert('Dear User, your input is invalid.\n' + 'You have only ' + counterForWrongLogged + ' attempts left.');
    }else{
       document.getElementById('loginButton').style.backgroundColor = 'lightgrey';
       document.getElementById('loginButton').disabled = true;
       const btn = document.getElementById('loginButton');
       btn.style.pointerEvents = 'none';
       alert('Dear User, your number of attempts is achieved.\n' +
        'Your locked for the next time.');
    }
}
