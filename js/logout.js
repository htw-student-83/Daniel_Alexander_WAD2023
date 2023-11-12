function goToLogin(){
    document.getElementById('web-name').style.display = 'flex';
    document.getElementById('login-container').style.display = 'grid';
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('add-container').style.display = 'none';
    document.getElementById('du-container').style.display = 'none';
    document.getElementById('username-login').value = "";
    document.getElementById('password-login').value = "";
}

