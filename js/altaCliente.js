 $("#capaFrmAltaCliente").dialog({
	 autoOpen: true,  // Es el valor por defecto
	 // beforeClose: antesDeCerrarse,
	 close: function () { 
				$("#frmAltaCliente")[0].reset();
						},
	 closeOnEscape: false, // No se cierra con ESCAPE
	 hide: {
		 effect: "explode",
		 duration: 1000
	 },
	 show: "fold",
	 buttons: [{
		 text: "Aceptar",
		 click: procesoAltaCliente
	 }, {
		 text: "Cancelar",
		 click: function() {
			 $(this).dialog("close");
		 }
	 }]
 }); 
 
 function procesoAltaCliente()
 {
	$("mnuAltaCliente").disabled = true;
	var datos=$("#frmAltaCliente").serializeArray();
	var oJSON=JSON.stringify(datos);
	$.get("php/altaCliente.php", "datos="+oJSON, tratarAltaCliente, "json");
 }
 
 
 function tratarAltaCliente(datos, textStatus, jqXHR)
 {
	if(textStatus=="success")
	{
		alert(datos[1]);
		$("#frmAltaCliente")[0].reset();
	}
	else
	{
		
		alert(datos[0]);
		
	}
	 	
	//Activar boton de envio
	$("mnuAltaCliente").disabled = false;
}
