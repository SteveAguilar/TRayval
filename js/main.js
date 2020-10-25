$(document).ready(function(){
	var imgItems = $('.slider li').length; // Numero de Slides
	var imgPos = 1;

	// Agregando paginacion --
	for(i = 1; i <= imgItems; i++){
		$('.pagination').append('<li><span class="fa fa-circle"></span></li>');
	} 
	//------------------------

	$('.slider li').hide(); // Ocultanos todos los slides
	$('.slider li:first').show(); // Mostramos el primer slide
	$('.pagination li:first').css({'color': '#CD6E2E'}); // Damos estilos al primer item de la paginacion

	// Ejecutamos todas las funciones
	$('.pagination li').click(pagination);
	$('.right span').click(nextSlider);
	$('.left span').click(prevSlider);


	setInterval(function(){
		nextSlider();
	}, 5000);

	// FUNCIONES =========================================================

	function pagination(){
		var paginationPos = $(this).index() + 1; // Posicion de la paginacion seleccionada

		$('.slider li').hide(); // Ocultamos todos los slides
		$('.slider li:nth-child('+ paginationPos +')').fadeIn(); // Mostramos el Slide seleccionado

		// Dandole estilos a la paginacion seleccionada
		$('.pagination li').css({'color': '#858585'});
		$(this).css({'color': '#CD6E2E'});

		imgPos = paginationPos;

	}

	function nextSlider(){
		if( imgPos >= imgItems){imgPos = 1;} 
		else {imgPos++;}

		$('.pagination li').css({'color': '#858585'});
		$('.pagination li:nth-child(' + imgPos +')').css({'color': '#CD6E2E'});

		$('.slider li').hide(); // Ocultamos todos los slides
		$('.slider li:nth-child('+ imgPos +')').fadeIn(); // Mostramos el Slide seleccionado

	}

	function prevSlider(){
		if( imgPos <= 1){imgPos = imgItems;} 
		else {imgPos--;}

		$('.pagination li').css({'color': '#858585'});
		$('.pagination li:nth-child(' + imgPos +')').css({'color': '#CD6E2E'});

		$('.slider li').hide(); // Ocultamos todos los slides
		$('.slider li:nth-child('+ imgPos +')').fadeIn(); // Mostramos el Slide seleccionado
	}

	$("#zn-form-button").on("click", function() {
		var A = $("#zn_form_field_nombre_o_razon_social1_0").val();
		var B = $("#zn_form_field_asunto1_1").val();
		var C = $("#zn_form_field_e_mail1_2").val();
		var D = $("#zn_form_field_telefono1_3").val();
		var E = $("#zn_form_field_mensaje1_4").val();
		var expr = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
		if(A == ""){
			alert("Ingrese un nombre o razón social");
		}
		else {
			if (B == ""){
			alert("Ingrese un asunto");
		} else {
			if (C == "" || !expr.test(C)){
				alert("Ingrese un correo válido");
			} else {
				if (D == ""){
					alert("Ingrese un telefono");
				} else {
					if (E == ""){
						alert("Ingrese un mensaje");
					}else{
						$("#zn-form-button").prop('disabled', true);
						Email.send({
							Host : "smtp.gmail.com",
							Username : "TransRayvalNoReply@gmail.com",
							Password : "transrayval@Noreply",
							To : 'servicios@transrayval.com',
							From : "TransRayvalNoReply@gmail.com",
							Subject : B,
							Body : 'Nombre o Razón Social: '+A+'<br>Correo: '+C+'<br>Telefono: '+D+'<br>Mensaje: '+E
							}).then( function (message){
								if(message == "OK"){
									alert("Su mensaje ha sido enviado.\nNos pondremos pronto en contacto con usted")
									$("#zn_form_field_nombre_o_razon_social1_0").val("");
									$("#zn_form_field_asunto1_1").val("");
									$("#zn_form_field_e_mail1_2").val("");
									$("#zn_form_field_telefono1_3").val("");
									$("#zn_form_field_mensaje1_4").val("");
									$("#zn-form-button").prop('disabled', false);
								}else{
									alert("Su mensaje no pudo ser enviado,vuelva a intentarlo más tarde")
									$("#zn-form-button").prop('disabled', false);
								}								
							});
					}
				}
			}
		}
	}
	});
});