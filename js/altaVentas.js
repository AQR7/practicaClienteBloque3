 $("#capaFrmAltaVentas").dialog({
         autoOpen: true,  // Es el valor por defecto
         // beforeClose: antesDeCerrarse,
         close: function () { 
         			$("#frmAltaVenta")[0].reset();
         					},
         closeOnEscape: false, // No se cierra con ESCAPE
         hide: {
             effect: "explode",
             duration: 1000
         },
         show: "fold",
         buttons: [{
             text: "Aceptar",
             click: procesoAltaVentas
         }, {
             text: "Cancelar",
             click: function() {
                 $(this).dialog("close");
             }
         }]
     });  


function procesoAltaVentas(){
	if (validarAltaVentas()){
	$.ajax({ url : "php/altaVentas.php",
			 data: $("#frmAltaVenta").serialize(),
			 async: true, // Valor por defecto
			 dataType :'json',
			 method: "POST",
			 cache: false, // ya por defecto es false para POST
			 success: tratarRespuestaAltaVentas,
			 error :tratarErrorAltaVentas
			 });

	}
	
}



function tratarRespuestaAltaVentas(oArrayRespuesta,sStatus,oXHR){
		if (oArrayRespuesta[0] == true){
			alert("Error : " + oArrayRespuesta[1]);
		} else {
			alert("OK : " + oArrayRespuesta[1]);
			$("#frmAltaVenta")[0].reset();
		}
		

}

function tratarErrorAltaVentas(oXHR,sStatus,sError){

	alert("sStatus : " + sStatus);
	alert("sError : " + sError);
	

}



function validarAltaVentas(){

var bValido=true;
	var sErrores = "";
	
	


	
	var oExpReg = /^(?:\+|-)?\d+$/;
	
	if (oExpReg.test(frmAltaVenta.txtId.value) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			frmAltaVenta.txtId.focus();	
		}
	
		sErrores += "\n id  incorrecto";
		
		//Marcar error
		frmAltaVenta.txtId.className = "form-control error";
	
	}
	else 
	{
		frmAltaVenta.txtId.className = "form-control";	
		
	}

	
	
	if (oExpReg.test(frmAltaVenta.txtPrecio.value) == false || frmAltaVenta.txtPrecio.value.value < 0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			frmAltaVenta.txtPrecio.focus();	
		}
	
		sErrores += "\n precio  incorrecto";
		
		//Marcar error
		frmAltaVenta.txtPrecio.className = "form-control error";
	
	}
	else 
	{
		frmAltaVenta.txtPrecio.className = "form-control";	
		
	}
	
	
	if(frmAltaVenta.txtFecha.value == ""  ){
		frmAltaVenta.txtFecha.className = "form-control error";
		bValido = false;
	}else{
		frmAltaVenta.txtFecha.className = "form-control";	
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

