$(document).ready(function () {

   if( navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
   ){
     // Brocolito title
     $('#brocolitoTitle').css("font-size", 60);
     $('#brocolitoTitle').css("left", "-20%");

     // Brocolito image
     $('#brocolitoImage').css("width", "60%");
     $('#brocolitoImage').css("height", "40%");
     $('#brocolitoImage').css("right", "-27%");

     // speaker
     $('speaker').css("left", "10%");
     $('speaker').css("bottom", "10%");



     // leaderboard
     $('.leaderboard').css("width", "60%");
     $('.leaderboard').css("height", "56.5%");

     $('.leaderboard ol li').css("font-size", 14);

     // ads
     $('.ads').css("display","none");


     // Tutorial
     $('#tutorial').css("display","none");

     // Visitors counter
     $('#visitsCounter').css("display","none");
    }
   else {
     $('#brocolitoTitle').css("font-size", 170);


     // speaker
     $('speaker').css("top", "5%");
     $('speaker').css("right", "5%");

     // Leaderboard
     $('.leaderboard').css("width", "20%");

     // Brocolito image
     $('#brocolitoImage').css("left", "52%");

     $('#tutorial').css("right","10%");
     $('#tutorial').css("top", "65%");


     $('#startButton').hover(function(){
      $('.ads').css("left","45%");
      $('.ads').css("bottom", "10%");
    }, function () {
      $('.ads').css("left", "10%");
      $('.ads').css("bottom", "15%");
    });




    }
});
