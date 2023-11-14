function setAllNoneButLogin(){
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('add-container').style.display = 'none';
    document.getElementById('du-container').style.display = 'none';
}


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

let currentLoggedUser = false;

//The data, which we get from the user
function getUserLoginInput(){
    let inputUsername = document.getElementById('username-login').value;
    let inputPassword = document.getElementById('password-login').value;
    loginCheck(inputUsername, inputPassword)
}


//The data from the user will check for a successfully login
function loginCheck(inputUsername, inputPassword){
      if(inputUsername && inputPassword){
        if(inputUsername === admin.username && inputPassword === admin.passwordAdmin){
            //The login is non visible
            //show the mainscreeen with all options.
            //Thema Visibility nach schauen
            currentLoggedUser = true;
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('main-container').style.display = 'grid';
            document.getElementById('web-name').style.display = 'none';
            document.getElementById('mainAddBtn').style.display = "block";
            document.getElementById('duUpdateBtn').style.display = "block"
            document.getElementById('duDeleteBtn').style.display = "block"
            document.getElementById('userName').innerHTML = ", " + inputUsername;
            return true;
        }

        if(inputUsername === guest.username && inputPassword === guest.passwordGuest){
            currentLoggedUser = true;
            //show the mainscreeen with only the logout option
            document.getElementById('web-name').style.display = 'none';
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('main-container').style.display = 'grid';
            document.getElementById('mainAddBtn').style.display = "none";
            document.getElementById('duUpdateBtn').style.display = "none"
            document.getElementById('duDeleteBtn').style.display = "none"
            document.getElementById('userName').innerHTML = ", " + inputUsername;
            return true
        }else{
            alert('Dear User, your input is invalid.');
            return false;
        }
    }

}
