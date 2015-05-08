var AM = AM || {};

AM.Notitas = (function(){

	var _api = {};
	
	var _idMensaje = 1;
	var mensaje = [];
	var f = new Date();
	var dia = f.getDate();
	var _numeroMensajes = 0;
	var _mensajesAparecidos = [];
	var notify;

// título 
	mensaje[1] = new Mensaje(
		'YA TENEMOS NUEVA WEB',
		'Hoy miércoles 6 de Mayo estrenamos esta Web. ¡Bienvenido!',
		'', // url
		1, // importancia
		'6'); //fecha solo 2 
	
	mensaje[2] = new Mensaje(
		'SÚMATE',
		'Ahora en Común. Debate en conversación con candidaturas municipalistas',
		'https://www.google.com/calendar/event?eid=czNmcTEwbTBnNmhvYzR1cWNtaGJibnA1NzQgMTltZXFnZjQ5aTJnNXBjc2xpcGRtYmJ0Ym9AZw',
		3,
		'6');

	mensaje[3] = new Mensaje(
		'AYÚDANOS',
		'Apoya nuestra candidatura a través de microcréditos. ¡No te costará nada! Solo queremos estar en deuda con los ciudadanos.',
		'http://financia.ahoramadrid.org',
		2,
		'');

	mensaje[4] = new Mensaje(
		'GOBERNAR ES EDUCAR',
		'',
		'',
		4,
		'');

	mensaje[5] = new Mensaje(
		'¿SABÍAS QUE..?',
		'Hoy domingo, Manuela estará en Carabanchel hablando con los vecinos.',
		'#agenda', //anclas
		1,
		'1');	

	mensaje[6] = new Mensaje(
		'¿SABÍAS QUE..?',
		'Mensaje importante, que salga siempre.',
		'',
		6,
		'');	

	mensaje[7] = new Mensaje(
		'¿SABÍAS QUE..?',
		'Mensaje importante, que salga siempre.',
		'',
		3,
		'');	

	mensaje[8] = new Mensaje(
		'¿SABÍAS QUE..?',
		'Mensaje importante, que salga siempre.',
		'',
		2,
		'');	

	mensaje[9] = new Mensaje(
		'¿SABÍAS QUE..?',
		'Mensaje importante, que salga siempre.',
		'',
		3,
		'');	

	mensaje[10] = new Mensaje(
		'¿SABÍAS QUE..?',
		'Mensaje importante, que salga siempre.',
		'',
		9,
		'');	

	mensaje[11] = new Mensaje(
		'¿SABÍAS QUE..?',
		'Mensaje importante, que salga siempre.',
		'',
		10,
		'6');	
	
	
	
	function init() {
		
		$('.ver-notas').text(_api.getNoteNumber());
		elegirMensajes();
		
	    

		
        
	} //Fin init.


	_api.verNotas = function() {
	
		var notas = aleatorio(5,10);
		var a=1;
		var primeraNota = setTimeout(function() { sacarNotita(a,mensaje[a]); },4000);
		var intervalo = setInterval(function() {
			a++;
			sacarNotita(a,mensaje[a]);
			
			if(a == notas) {
				clearInterval(intervalo);
			}

		},aleatorio(15000,150000));
	}


	_api.mostrarTodasLasNotas = function() {
		
		notify.close();
		setTimeout(function() {
			_mensajesAparecidos.forEach(function(i){
				
				sacarNotita( '', mensaje[i]);
			});
		}, 700);
		
		
	}


	//Clase que crea la nota a añadir. 
	function Mensaje (titulo, texto, url, prioridad ,fecha) {
		this.id = _idMensaje;
		this.titulo = titulo;
		this.texto = texto;
		this.url = url;
		this.prioridad = prioridad;
		this.fecha = fecha;
		this.active = false;
		_idMensaje++;
		
	}

	function ordenarMensajes() {
		mensaje.sort(function (a, b){			
		    return (a.prioridad - b.prioridad);
		})
	}

	function elegirMensajes() {
		mensaje.forEach(function( i ) {
			if(i.fecha != "") {
				if(dia != i.fecha) {
					index = mensaje.indexOf(i);
					mensaje.splice(index,1);
				}
			}
		});
		ordenarMensajes();
		_api.verNotas();
	}

	function aleatorio(a,b) {
         return Math.round(Math.random()*(b-a)+parseInt(a));
         }

	
	function sacarNotita( a, mensaje ) {

		
		
		notify = $.notify({
		  // options
		  icon: 'glyphicon glyphicon-eye-open',
		  title: mensaje.titulo,
		  message: mensaje.texto,
		  url: mensaje.url,
		  target: '_blank'
		},{
		  // settings
		  
		  showProgressbar: false,
		  placement: {
		    from: "bottom",
		    align: "right"
		  },
		  offset: {
				x: 50,
				y: 100
			},
		  spacing: 10,
		  delay: 4500,
		  timer: 500,
		  url_target: '_blank',
		  mouse_over: 'pause',
		  animate: {
		    enter: 'animated fadeInUp',
		    exit: 'animated fadeOutDown'
		  },
		  onShow: EvalSound('audio1'),
		  onShown: null,
		  onClose: _api.addNoteNumber(a),
		  onClosed: null,
		  icon_type: 'class',
		  template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
		    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
		    '<span data-notify="icon" class="not-icon"></span> ' +
		    '<span class="not-title" data-notify="title">{1}</span> ' +
		    '<span data-notify="message" class="not-text">{2}</span>' +
		    '<div class="progress" data-notify="progressbar">' +
		      '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
		    '</div>' +
		    '<a href="{3}" target="{4}" data-notify="url"></a>' +
		  '</div>' 
		});
	}

	
	function EvalSound(soundobj) {
	  var thissound=document.getElementById(soundobj);
	  thissound.play();
	}

	
//Herramientas varias de la api.


	//Agrega la llamada a un archivo css en el index.html
	_api.getNoteNumber = function() {
		return _numeroMensajes;
	}

	//Elimina la llamada a un archivo css en el index.html
	_api.addNoteNumber = function( a ) {
		
		if (a == '') return;
		
		_numeroMensajes++;
		$('.ver-notas').text(_api.getNoteNumber());
		_api.addNotaActiva(a);
	}

	_api.restNoteNumber = function() {
		_numeroMensajes--;
		$('.ver-notas').text(_api.getNoteNumber());
	}

	_api.addNotaActiva = function( a ) {
		_mensajesAparecidos.push(a);
	}


	init();
	return _api;
})();
