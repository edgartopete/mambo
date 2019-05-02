$(document).ready(function(event){
   
    mambodb.ref("/service").on("child_added", function (childSnapshot) {
       // console.log(childSnapshot.val());
        
        var service = childSnapshot.val().service;
        var des = childSnapshot.val().des;
        var price = childSnapshot.val().price;
        var time = childSnapshot.val().time;
        var img = childSnapshot.val().img;
    
       var article = $('<article>');
       article.addClass("col-6 col-12-xsmall work-item")
       //var link = $("<a href='HomeMambo.html' class='image fit thumb' data-poptrox='iframe, 600x400'>");
        var link = $('<a>');
       link.attr("href",'HomeMambo.html');
       link.addClass("image fit thumb");
       //link.attr('data-poptrox','iframe, 600x400');
       
       var image=$("<img>");
       image.attr("src",img);
        //article.addClass("col-6 col-12-xsmall work-item");
    
        var newService = article.append(
            
            link.append(
                image
            ),
            $("<h3>").text(service),
            $("<p>").text(des),
            $("<p>").text("$ "+price +" / "+time)
        
        );
    
        $(".row").append(newService);

        $('#two').poptrox({
            caption: function($a) { return $a.next('h3').text(); },
            overlayColor: '#2c2c2c',
            overlayOpacity: 0.85,
            popupCloserText: '',
            popupLoaderText: '',
            selector: '.work-item a.image',
            usePopupCaption: true,
            usePopupDefaultStyling: false,
            usePopupEasyClose: false,
            usePopupNav: true,
            windowMargin: (breakpoints.active('<=small') ? 0 : 50)
        });

        
    });
    //manejador de eventos para cerrar sesión (logout)
    $("#btnLogout").on("click",function(){
        console.log("logout",window.location.pathname)
        authService.signOut();
    });
     // manejador de eventos para los cambios del estado de autenticación
     authService.onAuthStateChanged(function(user) {
    
    if (user) {
      if(window.location.pathname != "/mambo/Storefront_Handlab.html"){
       window.location.replace("Storefront_Handlab.html"); 
      }
      
      
    } else {
    
     if(window.location.pathname != "/mambo/index.html" ){ 
       window.location.replace("index.html");  
      }
     
    }
    });
});
