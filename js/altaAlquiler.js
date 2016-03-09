$.get('php/getClientes.php',null,tratarGetClientes,'json');
$.get('php/getPropiedad.php',null,tratarGetPropiedad,'json');
 $("#capaFrmAltaAlquiler").dialog({
         autoOpen: true,  // Es el valor por defecto
         // beforeClose: antesDeCerrarse,
         close: function () { 
         			$("#frmAltaAlquiler")[0].reset();
         					},
         closeOnEscape: false, // No se cierra con ESCAPE
         hide: {
             effect: "explode",
             duration: 1000
         },
         show: "fold",
         buttons: [{
             text: "Aceptar",
             click: procesoAltaAlquiler
         }, {
             text: "Cancelar",
             click: function() {
                 $(this).dialog("close");
             }
         }]
     });  

function tratarGetPropiedad(oArrayCliente, sStatus, oXHR){

		$("#cmbInmuebleAlquiler").empty();
		$('<option value="0" >Seleccione un inmueble</option>').appendTo("#cmbInmuebleAlquiler");
		jQuery.each(oArrayCliente, function( i , elemento){
			$('<option value="' + elemento.id + '" >' +  elemento.id + '</option>').appendTo("#cmbInmuebleAlquiler");		
		});
}

function tratarGetClientes(oArrayCliente, sStatus, oXHR){

		$("#cmbClienteAlquiler").empty();
		$('<option value="0" >Seleccione un cliente</option>').appendTo("#cmbClienteAlquiler");
		jQuery.each(oArrayCliente, function( i , elemento){
			$('<option value="' + elemento.dni + '" >'+  elemento.nombre+" "+elemento.apellidos+ '</option>').appendTo("#cmbClienteAlquiler");		
		});
}


function procesoAltaAlquiler(){


	
	if (validarAltaAlquiler())
	{
	var oAlquiler = new Alquiler(frmAltaAlquiler.txtId.value,$('#cmbClienteAlquiler').val(),frmAltaAlquiler.txtDuracion.value,frmAltaAlquiler.txtPrecio.value,frmAltaAlquiler.txtCalendarioAlternativo.value,$('#cmbInmuebleAlquiler').val());
	
	// Formateo de parametro POST
	var sParametroPOST = "datos=" + JSON.stringify(oAlquiler);
	
	// Codifico para envio
	sParametroPOST = encodeURI(sParametroPOST);
	
	// Script de envio
	var sURL = encodeURI("php/altaAlquiler.php");
	
	llamadaAjaxAltaAlquiler(sURL,sParametroPOST);
	}
}

	
/* LLAMADAS AJAX */
function llamadaAjaxAltaAlquiler(sURL,sParametroPOST){

	oAjaxAltaAlquiler = objetoXHR();
	
	oAjaxAltaAlquiler.open("POST",sURL,true);
	
	// Para peticiones con metodo POST        
    oAjaxAltaAlquiler.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	oAjaxAltaAlquiler.onreadystatechange = respuestaAltaAlquiler;
//	oAjaxAltaProp.addEventListener("readystatechange",respuestaAltaProp,false);

	oAjaxAltaAlquiler.send(sParametroPOST);
}

function respuestaAltaAlquiler(){

	if(oAjaxAltaAlquiler.readyState == 4 && oAjaxAltaAlquiler.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxAltaAlquiler.responseText);
		
		if(oArrayRespuesta[0]==true)
		{
			$("#pMensaje").text("");
			$("#divMensajes").dialog("open");
			$("#divMensajes").dialog("option","title","Estado");
			$("#pMensaje").append(oArrayRespuesta[1]);
		}
		else
		{
			$("#pMensaje").text("");
			$("#divMensajes").dialog("open");
			$("#divMensajes").dialog("option","title","Estado");
			$("#pMensaje").append(oArrayRespuesta[1]);
			$("#frmAltaAlquiler")[0].reset();
		}
	}
}


function validarAltaAlquiler()
{

	var bValido=true;
	var sErrores = "";
	
	var oExpReg = /^(?:\+|-)?\d+$/;
	
	if (oExpReg.test(frmAltaAlquiler.txtId.value) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			frmAltaAlquiler.txtId.focus();	
		}
	
		sErrores += "\n Id incorrecto  <br>";
		
		//Marcar error
		frmAltaAlquiler.txtId.className = "form-control error";
	
	}
	else 
	{
		frmAltaAlquiler.txtId.className = "form-control";	
		
	}

	if(frmAltaAlquiler.cmbClienteAlquiler.value==0)
	{
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			frmAltaAlquiler.cmbClienteAlquiler.focus();	
		}
	
		sErrores += "\n Elije un cliente  <br>";
		
		//Marcar error
		frmAltaAlquiler.cmbClienteAlquiler.className = "form-control error";
	
	}
	else 
	{
		frmAltaAlquiler.cmbClienteAlquiler.className = "form-control";	
		
	}
	
	
	if (oExpReg.test(frmAltaAlquiler.txtDuracion.value) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			frmAltaAlquiler.txtDuracion.focus();	
		}
	
		sErrores += "\n Duración incorrecta  <br>";
		
		//Marcar error
		frmAltaAlquiler.txtDuracion.className = "form-control error";
	
	}
	else 
	{
		frmAltaAlquiler.txtDuracion.className = "form-control";	
		
	}
	
	if (oExpReg.test(frmAltaAlquiler.txtPrecio.value) == false || frmAltaAlquiler.txtPrecio.value.value < 0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			frmAltaAlquiler.txtPrecio.focus();	
		}
	
		sErrores += "\n Precio incorrecto  <br>";
		
		//Marcar error
		frmAltaAlquiler.txtPrecio.className = "form-control error";
	
	}
	else 
	{
		frmAltaAlquiler.txtPrecio.className = "form-control";	
		
	}
	
	
	if(frmAltaAlquiler.txtFecha.value == ""  ){
		sErrores += "\n Fecha incorrecta  <br>";
		frmAltaAlquiler.txtFecha.className = "form-control error";
		bValido = false;
	}else{
		frmAltaAlquiler.txtFecha.className = "form-control";	
	}

	if(frmAltaAlquiler.cmbInmuebleAlquiler.value==0)
	{
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			frmAltaAlquiler.cmbInmuebleAlquiler.focus();	
		}
	
		sErrores += "\n Elije un inmueble <br> ";
		
		//Marcar error
		frmAltaAlquiler.cmbInmuebleAlquiler.className = "form-control error";
	
	}
	else 
	{
		frmAltaAlquiler.cmbInmuebleAlquiler.className = "form-control";	
	}
	
	if (bValido == false)
	{
	$("#pMensaje").text("");
	$("#divMensajes").dialog("open");
	$("#divMensajes").dialog("option","title","Error");
	$("#pMensaje").append(sErrores);

		
	}
	
	return bValido;



}


	


