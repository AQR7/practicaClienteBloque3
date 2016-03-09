 $.get('php/getClientes.php',null,tratarGetClientes,'json');
$.get('php/getPropiedad.php',null,tratarGetPropiedad,'json');
 
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


function tratarGetPropiedad(oArrayCliente, sStatus, oXHR){

		$("#cmbInmuebleVentas").empty();
		$('<option value="0" >Seleccione un inmueble</option>').appendTo("#cmbInmuebleVentas");
		jQuery.each(oArrayCliente, function( i , elemento){
			$('<option value="' + elemento.id + '" >' +  elemento.id + '</option>').appendTo("#cmbInmuebleVentas");		
		});
}

function tratarGetClientes(oArrayCliente, sStatus, oXHR){

		$("#cmbClienteVentas").empty();
		$('<option value="0" >Seleccione un cliente</option>').appendTo("#cmbClienteVentas");
		jQuery.each(oArrayCliente, function( i , elemento){
			$('<option value="' + elemento.dni + '" >'+  elemento.nombre+" "+elemento.apellidos+ '</option>').appendTo("#cmbClienteVentas");		
		});
}

function procesoAltaVentas(){
	if (validarAltaVentas()){
	$.ajax({ url : "php/altaVentas.php",
			 data: $("#frmAltaVenta").serialize(),
			 async: true, // Valor por defecto
			 dataType :'json',
			 method: "POST",
			 cache: false, // ya por defecto es false para POST
			 success: tratarRespuestaAltaVentas,
			 });

	}
	
}

function tratarRespuestaAltaVentas(oArrayRespuesta,sStatus,oXHR)
{
	
	if(sStatus=="success")
	{
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
			$("#frmAltaVenta")[0].reset();
		}
		
	}

		

}


function validarAltaVentas()
{

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
	
		sErrores += "\n Id incorrecto <br>";
		
		//Marcar error
		frmAltaVenta.txtId.className = "form-control error";
	
	}
	else 
	{
		frmAltaVenta.txtId.className = "form-control";	
		
	}

	if (frmAltaVenta.cmbClienteVentas.value == 0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			frmAltaVenta.cmbClienteVentas.focus();	
		}
	
		sErrores += "\n Elije un cliente <br>";
		
		//Marcar error
		frmAltaVenta.cmbClienteVentas.className = "form-control error";
	
	}
	else 
	{
		frmAltaVenta.cmbClienteVentas.className = "form-control";	
	}
	
	if (oExpReg.test(frmAltaVenta.txtPrecio.value) == false || frmAltaVenta.txtPrecio.value.value < 0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			frmAltaVenta.txtPrecio.focus();	
		}
	
		sErrores += "\n Precio incorrecto <br>";
		
		//Marcar error
		frmAltaVenta.txtPrecio.className = "form-control error";
	
	}
	else 
	{
		frmAltaVenta.txtPrecio.className = "form-control";	
		
	}
	
	
	if(frmAltaVenta.txtFecha.value == ""  )
	{
		frmAltaVenta.txtFecha.className = "form-control error";
		
		sErrores += "\n Fecha incorrecta <br>";
		bValido = false;
	}
	else
	{
		frmAltaVenta.txtFecha.className = "form-control";	
	}
	
	
	if (frmAltaVenta.cmbInmuebleVentas.value == 0)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			frmAltaVenta.cmbInmuebleVentas.focus();	
		}
	
		sErrores += "\n Elije un inmueble <br>";
		
		//Marcar error
		frmAltaVenta.cmbInmuebleVentas.className = "form-control error";
	
	}
	else 
	{
		frmAltaVenta.cmbInmuebleVentas.className = "form-control";	
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

