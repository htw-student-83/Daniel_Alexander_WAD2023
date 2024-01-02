let loginAttemptsRemaining= 3;

const eventHandlerLogin = function () {
    setAllNoneButLogin();
    getAllLocations();
    document.getElementById("formLogin").onsubmit = getUserLoginInput;
}

function resetAttemptCount(){
    loginAttemptsRemaining = 3;
}

//The data, which we get from the user
// Assuming you're using Fetch API
function getUserLoginInput(e) {
    e.preventDefault();
    let inputUsername = document.getElementById('username-login').value;
    let inputPassword = document.getElementById('password-login').value;

    // Send a POST request to your server
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: inputUsername,
            password: inputPassword,
        }),
    })
        .then(response => response.json())
        .then(user => handleLoginResponse(user))
        .catch(error => console.error('Error:', error));
}

//The data from the user will check for a successful login
function handleLoginResponse(user){
      if(user && user.role && user.firstname){
          handleSuccessfulLogin(user.role, user.firstname);
        }else{
            handleFailedLogin();
        }
}

// Handle a successful login
function handleSuccessfulLogin(role, firstname) {
    buttonSetter(role);
    fromLoginToMain();
    document.getElementById('userName').innerHTML = `, ${firstname}`;
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