$(document).ready(function (){
	window.io = io.connect();
	var numOfEslogan = $('.eslogan-text').length;


	if(numOfEslogan <= 1){
		$('header').height('290px');
		$('.eslogan').css('margin','0 auto');
		$('.eslogan .wrapper').css('text-align', 'left');
	}else{
		$('header').height('477px');
		$('.eslogan').css('margin','0px 100px');
		$('.eslogan .wrapper').css('text-align', 'center');
	}

	/*io.on('aconnect', function (socket){
		if(!socket.content){
			console.log('Administrador Loggeado');
			$('.notification').css('display', 'block');
			io.emit('occupied');
		}
	});

	io.on('adisconnect', function (socket){
		console.log('Administrador Desconectado');
		$('.notification').css('display', 'none');
		io.emit('logout');
	});*/
});
/*ESTE ES EL PROBLEMA, SE LLAMA POR CADA CAMBIO DE PAGINA, NO POR CIERRE DE VENTANA*/
/*window.onbeforeunload = function (){
	io.emit('unload-logout');
}*/