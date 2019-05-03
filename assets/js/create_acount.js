$(document).ready(function () {
    $("#register").on("click", function () {
        $("#createAccount").modal({
            backdrop: 'static',
            keyboard: false
        });
    });
    $("#create").on("click", function(event){
        event.preventDefault();
        var user=null;
        var email= $("#email").val();
        var pass =$("#password").val();
        var name = $("#name").val();
        var last = $("#last").val();
        var gender = $("#gender").val();
        var zip = $("#zip").val();

        //create account in firebase

        firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(function(){
            user = firebase.auth().currentUser;
        }).then(function() {
            user.updateProfile({
                displayName:userDisplay
            });
        });


        if ( user !== "") {
          

            var newUser = {
                name:name,
                last:last,
                gender:gender,
                zip:zip
            }
            
            mambodb.ref("/user").push(newUser);
           
        } else {
            console.log("error");
        }
    });
});
