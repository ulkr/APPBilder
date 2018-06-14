document.addEventListener('deviceready', function() {
    // erst jetzt ist APP geladen und ready um was zu tun!
    console.log( 'DEVICE READY!' );

    var bilder = [
      'das-paradies-fuer-wintersportler.jpg',
      'endlos-weite-schwuenge-ueber-perfekt-praeparierte-pisten-ziehen.jpg',
      'fruehlings-special-top-of-tyrol.jpg',
      'hotel-tia-monte-nahe-am-gletscher.jpg',
      'langlaufen-osttirol.jpeg',
      'open-faces-freeride-series-in-kappl.jpg',
      'psst-freeride-geheimtipp-ischgl-relax-if-you-can.jpg',
      'schloss-matzen-skigebiet.jpg',
      'schneebericht-wilder-kaiser-brixtental.jpeg',
      'skigebiet-venet.jpeg',
      'winterferien-in-den-kitzbueheler-alpen.jpg'
    ];

    var aktuell = 0;

    var showImage = function(i) {
      aktuell += i;
      if(aktuell < 0) aktuell = bilder.length - 1;
      if(aktuell > bilder.length - 1) aktuell = 0;
      $('#bilder').css({'background-image': 'url("img/' + bilder[aktuell] + '")'});
    }

    var playAudio = function() {
        document.getElementById("sound").play();
    }
    var pauseAudio = function() {
        document.getElementById("sound").pause();
        document.getElementById("sound").currentTime = 0;
    }

    var showNext = function() {
      showImage(1);
    }

    var showPrev = function() {
      showImage(-1);
    }

    var downX = 0;

    $(document).on('touchstart', '#bilder', function(event) {
      if(event.originalEvent.touches) {
        downX = event.originalEvent.changedTouches[0].clientX;
      } else {
        downX = event.originalEvent.clientX;
      }

      playAudio();
    });

    $(document).on('touchend', '#bilder', function(event) {
      try {
        var diffX = downX - event.originalEvent.changedTouches[0].clientX;
      } catch(e) {
        var diffX = downX - event.originalEvent.clientX;
      }
      if(diffX < -100) { showImage(1); }
      if(diffX > 100) { showImage(-1); }
      downX = 0;
      $('#bilder').css({left: 0, right: 0});

      pauseAudio();
    });

    $(document).on('click', '#next', showNext);
    $(document).on('click', '#prev', showPrev);

    $(document).ready(function() {
      console.log( 'DOM READY!' );
      showImage(0);

      window.addEventListener('deviceorientation', function(event) {
  			var diffX = event.gamma;
  			if(diffX < -10) $('#bilder').css({left:diffX*5});
  			if(diffX > 10) $('#bilder').css({right: -diffX*5});
  		});
    });
});
