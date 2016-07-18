

var gotItemAudio;
var gotItem2Audio;
var gotItem3Audio;
var gotItem4Audio;

var mouthAudio;
var rudaNOOAudio;
var marceAudio;

$(document).ready(function() {

var getaudio = $('#brocolitoMusic')[0];

var p1 = new Promise (function () {
   gotItemAudio = $('#gotItemSound')[0];
   gotItem2Audio = $('#gotItem2Sound')[0];
   gotItem3Audio = $('#gotItem3Sound')[0];
   gotItem4Audio = $('#gotItem4Sound')[0];

});
var p2 = new Promise (function () {
  mouthAudio = $('#mouthSound')[0];
});

var p3 = new Promise (function () {
  rudaNOOAudio = $('#rudaNOOSound')[0];
});

var p4 = new Promise (function () {
  marceAudio = $('#marceSound')[0];
});

Promise.all([p1, p2, p3, p4]).then (function () {
  mouthAudio.load();
  gotItemAudio.load();
  gotItem2Audio.load();
  gotItem3Audio.load();
  gotItem4Audio.load();
  rudaNOOAudio.load();
  marceAudio.load();
})


 /* Get the audio from the player (using the player's ID), the [0] is necessary */
 var mouseovertimer;
 /* Global variable for a timer. When the mouse is hovered over the speaker it will start playing after hovering for 1 second, if less than 1 second it won't play (incase you accidentally hover over the speaker) */
 var audiostatus = 'off';
 /* Global variable for the audio's status (off or on). It's a bit crude but it works for determining the status. */




 $(document).on('mouseenter', '.speaker', function() {
   /* Bonus feature, if the mouse hovers over the speaker image for more than 1 second the audio will start playing */
   if (!mouseovertimer) {
     mouseovertimer = window.setTimeout(function() {
       mouseovertimer = null;
       if (!$('.speaker').hasClass("speakerplay")) {
         getaudio.load();
         /* Loads the audio */
         getaudio.play();
         /* Play the audio (starting at the beginning of the track) */
         $('.speaker').addClass('speakerplay');
         return false;
       }
     }, 1000);
   }
 });

 $(document).on('mouseleave', '.speaker', function() {
   /* If the mouse stops hovering on the image (leaves the image) clear the timer, reset back to 0 */
   if (mouseovertimer) {
     window.clearTimeout(mouseovertimer);
     mouseovertimer = null;
   }
 });

 $(document).on('click touchend', '.speaker', function() {
   /* Touchend is necessary for mobile devices, click alone won't work */
   if (!$('.speaker').hasClass("speakerplay")) {
     if (audiostatus == 'off') {
       $('.speaker').addClass('speakerplay');
       getaudio.load();
       getaudio.play();
       window.clearTimeout(mouseovertimer);
       audiostatus = 'on';
       return false;
     } else if (audiostatus == 'on') {
       $('.speaker').addClass('speakerplay');
       getaudio.play()
     }
   } else if ($('.speaker').hasClass("speakerplay")) {
     getaudio.pause();
     $('.speaker').removeClass('speakerplay');
     window.clearTimeout(mouseovertimer);
     audiostatus = 'on';
   }
 });

 $('#brocolitoMusic').on('ended', function() {
   $('.speaker').removeClass('speakerplay');
   /*When the audio has finished playing, remove the class speakerplay*/
   audiostatus = 'off';
   /*Set the status back to off*/
 });



 });



 function playMouth () {
   mouthAudio.play();
 }

 function playMarce () {
   marceAudio.play();
 }

 function playRudaNOO () {
   rudaNOOAudio.play();
 }

 function playGotItem (number) {
   switch (number) {
     case 0:
      if (!gotItemAudio.paused) {
        gotItemAudio.pause();
        gotItemAudio.currentTime = 0;
      }
      gotItemAudio.play();
      break;
    case 1:
      if (!gotItemAudio.paused) {
        gotItemAudio.pause();
        gotItemAudio.currentTime = 0;
      }
      gotItem2Audio.play();
      break;
    case 2:
      if (!gotItem2Audio.paused) {
        gotItem2Audio.pause();
        gotItem2Audio.currentTime = 0;
      }
      gotItem3Audio.play();
      break;
    case 3:
      if (!gotItem3Audio.paused) {
        gotItem3Audio.pause();
        gotItem3Audio.currentTime = 0;
      }
      gotItem4Audio.play();
    default:
      if (!gotItem4Audio.paused) {
        gotItem4Audio.pause();
        gotItem4Audio.currentTime = 0;
      }
      gotItem4Audio.play();
  }
}
