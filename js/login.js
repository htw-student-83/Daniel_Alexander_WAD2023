function setAllNoneButLogin(){
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('add-container').style.display = 'none';
    document.getElementById('du-container').style.display = 'none';
}

//The data, which we get from the user
function getUserLoginInput(){
    let inputUsername = document.getElementById('username-login').value;
    let inputPassword = document.getElementById('password-login').value;
    loginCheck(inputUsername, inputPassword)
}


//The data from the user will check for a successfully login
function loginCheck(inputUsername, inputPassword){
    //the data for an successfully access
    const admin = "admina"
    const guest = "normalo"
    const passwordAdmin = "password_A"
    const passwordGuest = "password_G"

    if(inputUsername && inputPassword){
        if(inputUsername === admin && inputPassword === passwordAdmin){
            //The login is non visible
            //show the mainscreeen with all options.
            //Thema Visibility nach schauen
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('main-container').style.display = 'grid';
            document.getElementById('web-name').style.display = 'none';
            document.getElementById('mainAddBtn').style.display = "block";
            document.getElementById('duUpdateBtn').style.display = "block"
            document.getElementById('duDeleteBtn').style.display = "block"
            document.getElementById('userName').innerHTML = ", " + inputUsername;
            return true;
        }

        if(inputUsername === guest && inputPassword === passwordGuest){
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
