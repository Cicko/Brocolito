
(function(exports) {
    "use strict";

    var adPosition = $('.ads').offset();


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

       $('.leaderboard ol li').css("font-size", 14);

       // ads
       $('.ads').css("display","none");


       // Tutorial
       $('#tutorial').css("display","none");

       // Visitors counter
       $('#visitsCounter').css("display","none");
      }
     else { // PC
       $('#brocolitoTitle').css("font-size", 170);


       $('#facebooklogin').css("right", "5%");
       $('#facebooklogin').css("top", "15%");

       // speaker
       $('speaker').css("top", "5%");
       $('speaker').css("right", "5%");

       // Leaderboard

       var olElement = document.getElementsByTagName("ol")[0];
       var h1Element = document.getElementById("h1-highscore");
       var boundingRect = olElement.getBoundingClientRect();
       var h1Rect = h1Element.getBoundingClientRect()
       var olHeight = boundingRect.bottom - boundingRect.top;
       var h1Height = h1Rect.bottom - h1Rect.top;


       var isChrome = !!window.chrome && !!window.chrome.webstore;
       //if (isChrome)
       //var offset = $('.leaderboard').
       console.log($('.leaderboard'));
       $('.leaderboard').css("height",(olHeight + h1Height));

       $('.leaderboard').css("width", "20%");

       // Brocolito image
       $('#brocolitoImage').css("left", "52%");

       $('#tutorial').css("right","10%");
       $('#tutorial').css("top", "65%");

       var p = $( "#startButton" );
       var position = p.offset();

/*
       $('#startButton').hover(function(){
            $('.ads').css({top: position.top, left: position.left, position:'absolute'});
       }, function () {
            $('.ads').css("left", "10%");
            $('.ads').css("bottom", "15%");
       });

       $('#startButton').click(function() {
         $('.ads').click();
       })
*/
       $('.ads').css("left", "10%");
       $('.ads').css("bottom", "15%");

       $('#donationText').css("position", "absolute");
       $('#donationText').css("color", "black");
       $('#donationText').css("left", "10%");
       $('#donationText').css("bottom", "55%");


       $('#extraLife').css("color","black");

       $('.ads').click(function () {
         extraLife = true;
         $('#extraLife').text("Extra Life: Yes");
         $('#extraLifeInput').val("yes");
       });

      }
    });

    exports.haveExtraLife = function () {
      return extraLife;
    }



})(this);
