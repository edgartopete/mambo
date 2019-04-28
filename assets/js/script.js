 // accedo al servicio de autenticación
 var authService = firebase.auth();
    
    
 // manejador de eventos para loguearse
 $("#btnGoogle").on("click", function(){
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('email');
  authService.signInWithPopup(provider)
        .then(function(result) {
            // logueado con éxito
            window.location.replace("HomeMambo.html");
            console.log('Hemos autenticado al usuario ', result.user);
        })
        .catch(function(error) {
            // Fallo de login
            console.log('Se ha encontrado un error:', error);
        });
 });
 /*document.getElementById('botonlogin').addEventListener('click', function() {
   var provider = new firebase.auth.GoogleAuthProvider();
   provider.addScope('email');
   authService.signInWithPopup(provider)
         .then(function(result) {
             // logueado con éxito
             console.log('Hemos autenticado al usuario ', result.user);
         })
         .catch(function(error) {
             // Fallo de login
             console.log('Se ha encontrado un error:', error);
         });
 })*/

 //facebook
 $("#btnFacebook").on("click",function(){
// creo el provider de autenticación
var provider = new firebase.auth.FacebookAuthProvider();
 
// opcionalmente modifico el scope
provider.addScope('user_friends');

// accedo al servicio de autenticación
var authService = firebase.auth();
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
 /*document.getElementById('loginfacebook').addEventListener('click', function() {
     // creo el provider de autenticación
     var provider = new firebase.auth.FacebookAuthProvider();
 
     // opcionalmente modifico el scope
     provider.addScope('user_friends');
 
     // accedo al servicio de autenticación
     var authService = firebase.auth();
   // autentico con Facebook
     authService.signInWithPopup(provider)
             .then(function(result) {
                 //todo correcto
                 console.log('autenticado usuario ', result.user);
             })
             .catch(function(error) {
                 console.log('Detectado un error:', error);
             });
     })*/
 //manejador de eventos para cerrar sesión (logout)
 $("#btnLogout").on("click",function(){
  authService.signOut();
 });
 
 
 
 // manejador de eventos para los cambios del estado de autenticación
 authService.onAuthStateChanged(function(user) {
   if (user) {
    console.log(window.location.pathname);
     if(window.location.pathname != "/HomeMambo.html" ){
      console.log('AuthStateChanged', user);
      //window.location.replace("HomeMambo.html"); 
      
     }
     
   } else {
    if(window.location.pathname != "/index.html" ){
     
      //window.location.replace("index.html");  
     }
    
   }
 });
 
  
