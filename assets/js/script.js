 // accedo al servicio de autenticación de google
 var authService = firebase.auth();
    
    
 // manejador de eventos para realizar login con google account
 $("#btnGoogle").on("click", function(){
   // creo el provider de autenticación
  var provider = new firebase.auth.GoogleAuthProvider();
  //se modifca el scope
  provider.addScope('email');
  authService.signInWithPopup(provider)
        .then(function(result) {

            localStorage.setItem("email",result.user.email); 
            // logueado con éxito
            window.location.replace("HomeMambo.html");
            console.log('Hemos autenticado al usuario ', result.user);
        })
        .catch(function(error) {
            // Fallo de login
            console.log('Se ha encontrado un error:', error);
        });
 });

 //manejador de eventos para realizar login con account facebook
 $("#btnFacebook").on("click",function(){
// creo el provider de autenticación
var provider = new firebase.auth.FacebookAuthProvider();
// se modifica el scope
provider.addScope('default');

// accedo al servicio de autenticación
//var authService = firebase.auth();
// autentico con Facebook
authService.signInWithPopup(provider)
        .then(function(result) {
            //todo correcto
            console.log('autenticado usuario ', result.user);
        })
        .catch(function(error) {
            console.log('Detectado un error:', error);
        });
 });
//manejador de eventos para realizar login con correo electronico
 $("#btnlogin").on("click",function(event){
  event.preventDefault();
  var email=$("#inputEmail").val();
  localStorage.setItem("email",email); 
  var password=$("#inputPassword").val();
 
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;

      console.log(errorMessage);

    });
    localStorage.setItem("email",email); 
});
 
 //manejador de eventos para cerrar sesión (logout)
 $("#btnLogout").on("click",function(){
  console.log("logout",window.location.pathname)
  authService.signOut();
  localStorage.clear();
 });
 
 
 
 // manejador de eventos para los cambios del estado de autenticación
 authService.onAuthStateChanged(function(user) {
   
   if (user) {
     if(window.location.pathname != "/mambo/HomeMambo.html"){
      window.location.replace("HomeMambo.html"); 
     }
     
     
   } else {

    if(window.location.pathname != "/mambo/index.html" ){ 
      window.location.replace("index.html");  
     }
    
   }
 });
 
  
