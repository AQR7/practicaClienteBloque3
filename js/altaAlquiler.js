
	
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



function procesoAltaAlquiler(){

	// Aqui habría que hacer la validacion del formulario
	// if (validarAltaPropietario()){
	
	//Creo un objeto propietario
	
	if (validarAltaAlquiler()){
	var oAlquiler = new Alquiler(frmAltaAlquiler.txtId.value,frmAltaAlquiler.txtDniCliente.value,frmAltaAlquiler.txtDuracion.value,frmAltaAlquiler.txtPrecio.value,frmAltaAlquiler.txtCalendarioAlternativo.value,frmAltaAlquiler.txtIdInmueble.value);
	
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
		
		if (oArrayRespuesta[0] == true){
			alert("Error : " + oArrayRespuesta[1]);
		} else {
		
			alert("OK : " + oArrayRespuesta[1]);
			$("#frmAltaAlquiler")[0].reset();
			
		}
	}
}


function validarAltaAlquiler(){

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
	
		sErrores += "\n id  incorrecto";
		
		//Marcar error
		frmAltaAlquiler.txtId.className = "form-control error";
	
	}
	else 
	{
		frmAltaAlquiler.txtId.className = "form-control";	
		
	}

	if (oExpReg.test(frmAltaAlquiler.txtDuracion.value) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			frmAltaAlquiler.txtDuracion.focus();	
		}
	
		sErrores += "\n Duraccion  incorrecto";
		
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
	
		sErrores += "\n precio  incorrecto";
		
		//Marcar error
		frmAltaAlquiler.txtPrecio.className = "form-control error";
	
	}
	else 
	{
		frmAltaAlquiler.txtPrecio.className = "form-control";	
		
	}
	
	
	if(frmAltaAlquiler.txtFecha.value == ""  ){
		frmAltaAlquiler.txtFecha.className = "form-control error";
		bValido = false;
	}else{
		frmAltaAlquiler.txtFecha.className = "form-control";	
	}


	
	

	
	
	
	/*
	if(frmAltaAlquiler.txtFecha.value="")
	{
	frmAltaAlquiler.txtPrecio.className = "form-control error";	
	}
	else
	{
	frmAltaAlquiler.txtPrecio.className = "form-control";	
	
	}
	*/
	
	
	if (bValido == false)
	{	
		
	}
	
	return bValido;



}


	


