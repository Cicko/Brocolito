$(document).ready(function () {

   if( navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
   ){
     $('.leaderboard').css("width", "60%");
     $('.ads').css("display","none");
    }
   else {
     $('.leaderboard').css("width", "20%");
    }
});
