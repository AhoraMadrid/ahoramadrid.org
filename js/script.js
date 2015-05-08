jQuery(document).ready(function($) {

  var alto;
  var isDesktop;
  var altoManu, altoNacho;
  var candidato;

  function init () {
    
    alto = $(window).height();
    isDesktop = $(window).width()>590;
    //$('section').css('height',alto);

    /*var posicionManu = $('#paralax-manu').offset();
    altoManu = posicionManu.top;

    var posicionNacho = $('#paralax-nacho').offset();
    altoNacho = posicionNacho.top;*/

    //Funciones solo desktop:
    if(isDesktop){
      
      $('#ahoraMadrid').css('height',alto);
      
      paralax();
      
      /*$(window).scroll(function() {
        //fijarMenu();
      });*/

    }

    //Funciones solo movil:
    else {
      $('body').addClass('movil');
    }

    //Funciones comunes:
   /// menu();
    animacionAnclas();
    //mostrarAlt();
    //AM.Notitas.verNotas();
    verTodas();

    
 /*   var tuits = setInterval(function() {
      
      twitterFetcher.fetch(configTweet);
      claseRedonda();
    },10000); */
    
    
    efectosWow();
      
    $('.usquare_module_wrapper').uSquare();

  } // Fin init()



$( window ).resize(function() {
    alto = $(window).height();
    isDesktop = $(window).width()>590;
    $('#ahoraMadrid').css('height',alto);
});


function efectosWow() {
  $('.pos-right').each(function() {
    $(this).addClass('wow fadeInRight');
  });
  $('.pos-left').each(function() {
    $(this).addClass('wow fadeInLeft');
  });

  new WOW().init();
}




function verTodas() {
  $('.ver-notas').on('click', function(e) {
    e.preventDefault();
    AM.Notitas.mostrarTodasLasNotas();
  });
}


function fijarMenu() {
  posicionMenu = $('.container-fluid').offset();
  topPos = posicionMenu.top;
  if(topPos * 2 < $(window).scrollTop() + $('.container-fluid').height()) {
    $('.container-fluid').css({ 
      'bottom':'initial', 
      'top':'0', 
      'position':'fixed'
    });
  }
  else {
    $('.container-fluid').css({ 
      'position':'absolute',
      'bottom':0
    });
  }
}
    
    //Funcion cambia color candidatos hover
    /*
    
    $('.usquare_block > img').hover(function () {
        var candidato = $(this).attr('src');
        var numero = candidato.match(/\d+/);
        this.src = 'img/candidatos/' + numero + '_v.jpg';
    }, function () {
        this.src = 'img/candidatos/' + numero + '.jpg';
    });
*/

//Funcion paralax
function paralax() {
  
  var s = skrollr.init({
          constants: {
              altura: alto
              //manuela: altoManu
          },
          smoothScrolling:false
      });
}




//Animación anclas suaves

function animacionAnclas() {
  $('.menuItem').on('click', function (e) {
      
      e.preventDefault();
      var obtenerAncla = $(this).attr('href');
      $('body, html').stop(true, true).animate({
          scrollTop: $(obtenerAncla).offset().top
      }, 1000);
  }); 
}






  init();

});
















