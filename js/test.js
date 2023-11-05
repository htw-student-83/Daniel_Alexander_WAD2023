// the data for an successfully access
let admin = "admina"
let passwordAdmin = "a_1234"

let guest = "guest"
let passwordGuest = "g_1234"

//The data, which we get from the user
let inputUsername = document.getElementById('username-login').value;
let inputPassword = document.getElementById('password-login').value;

function checkData(admin, passwordAdmin, guest, passwordGuest){
    switch(inputUsername){
        case admin:
            if(inputPassword === passwordAdmin){
                //TODO
            }
        //TODO
        case guest:
            if(inputPassword === passwordGuest){
                //TODO
            }
        default
        //TODO
    }
}