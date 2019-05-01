$(document).ready(function(evente){
 
    mambodb.ref("/service").on("child_added", function (childSnapshot) {
       // console.log(childSnapshot.val());
        
        var service = childSnapshot.val().service;
        var des = childSnapshot.val().des;
        var price = childSnapshot.val().price;
        var time = childSnapshot.val().time;
        var img = childSnapshot.val().img;
    
       var article = $('<article>');
       article.addClass("col-6 col-12-xsmall work-item")
       var link = $("<a>");
       link.attr("href",'assets/images/fulls/01.jpg');
       link.addClass("image fit thumb");
       var image=$("<img>");
       image.attr("src",img);
    article.addClass("col-6 col-12-xsmall work-item");
    
        var newService = article.append(
            
            link.append(
                image
            ),
            $("<h3>").text(service),
            $("<p>").text(des),
            $("<p>").text("$ "+price +" / "+time)
        );
    
        $(".row").append(newService);
    });
    
});
