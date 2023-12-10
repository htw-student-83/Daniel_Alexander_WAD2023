import axios from 'axios';

class User{
    constructor(username, password, role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}

axios.default.baseURI("http://localhost:8000/");

//User data as objects
let admin = new User("admina", "a", "admin");
let guest = new User("normalo", "g", "non-admin");

let loginAttemptsRemaining= 3;

const eventHandlerLogin = function () {
    setAllNoneButLogin();
    addDefaultLocation();
    document.getElementById("formLogin").onsubmit = getUserLoginInput;
}

function resetAttemptCount(){
    loginAttemptsRemaining = 3;
}

//The data, which we get from the user
function getUserLoginInput(e){
    e.preventDefault();
    let inputUsername = document.getElementById('username-login').value;
    let inputPassword = document.getElementById('password-login').value;
    loginCheck(inputUsername, inputPassword)
}


//Copie The data from the user will check for a successful login
async function loginCheckTest(inputUsername, inputPassword){
    if(inputUsername && inputPassword){
        const loginData = await axios.get('/users' + inputUsername + inputPassword)
        if(loginData && loginData.role !== "admin"){
            handleSuccessfulLogin(false, inputUsername);
        }else if(loginData && loginData.role === "admin"){
            handleSuccessfulLogin(true, inputUsername);
        }else{
            handleFailedLogin();
        }
    }
}


//The data from the user will check for a successful login
function loginCheck(inputUsername, inputPassword){
      if(inputUsername && inputPassword){
        if(inputUsername === guest.username && inputPassword === guest.password){
            handleSuccessfulLogin(false, inputUsername);
        }else if(inputUsername === admin.username && inputPassword === admin.password){
            handleSuccessfulLogin(true, inputUsername);
        }else{
            handleFailedLogin();
        }
    }
}

// Handle a successful login
function handleSuccessfulLogin(isAdmin, inputUsername) {
    buttonSetter(isAdmin);
    fromLoginToMain();
    document.getElementById('userName').innerHTML = `, ${inputUsername}`;
}

// Handle a failed login attempt
function handleFailedLogin() {
    loginAttemptsRemaining--;
    if (loginAttemptsRemaining !== 0) {
        alert(`Dear User, your input is invalid.\nYou have only ${loginAttemptsRemaining} attempts left.`);
    } else {
        disableLoginButton();
        alert('Dear User, your number of attempts is achieved.\nYou are locked for the next time.');
    }
}

// Disable the login button after a certain number of failed attempts
function disableLoginButton() {
    const loginButton = document.getElementById('loginButton');
    loginButton.style.backgroundColor = 'lightgrey';
    loginButton.disabled = true;
    loginButton.style.pointerEvents = 'none';
}
