let loginAttemptsRemaining= 3;

//User data as objects
let admin = {
    username: "admina",
    passwordAdmin: "a",
    role: "admin"
};

let guest = {
    username: "normalo",
    passwordGuest: "password_G",
    role: "non-admin"
};

const eventHandlerLogin = function () {
    setAllNoneButLogin();
    addDefaultLocation();
    document.getElementById("formLogin").onsubmit = getUserLoginInput;
}

//The data, which we get from the user
function getUserLoginInput(e){
    e.preventDefault();
    let inputUsername = document.getElementById('username-login').value;
    let inputPassword = document.getElementById('password-login').value;
    loginCheck(inputUsername, inputPassword)
}

//The data from the user will check for a successful login
function loginCheck(inputUsername, inputPassword){
      if(inputUsername && inputPassword){
        if(inputUsername === guest.username && inputPassword === guest.passwordGuest){
            handleSuccessfulLogin(false, inputUsername);
            return true
        }
        if(inputUsername === admin.username && inputPassword === admin.passwordAdmin){
            handleSuccessfulLogin(true, inputUsername);
            return true;
        }else{
            handleFailedLogin();
            return false;
        }
    }
}

// Handle a successful login
function handleSuccessfulLogin(isAdmin, username) {
    buttonSetter(isAdmin);
    fromLoginToMain();
    document.getElementById('userName').innerHTML = `, ${username}`;
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
