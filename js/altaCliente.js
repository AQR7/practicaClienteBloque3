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
	if(validarAltaCliente())
	{
		$("mnuAltaCliente").disabled = true;
		var datos=$("#frmAltaCliente").serializeArray();
		var oJSON=JSON.stringify(datos);
		$.get("php/altaCliente.php", "datos="+oJSON, tratarAltaCliente, "json");
	}
 }
 
 
 function tratarAltaCliente(datos, textStatus, jqXHR)
 {
	if(textStatus=="success")
	{
		$("#pMensaje").text("");
		$("#divMensajes").dialog("open");
		$("#divMensajes").dialog("option","title","Estado");
		$("#pMensaje").append(datos[1]);
		$("#frmAltaCliente")[0].reset();

	}
}





function validarAltaCliente()
{
	var bValido=true;
	var sErrores = "";
	var altaCliente=document.getElementById("frmAltaCliente");	
	var dni=altaCliente.txtDni.value.trim();
	var nombre=altaCliente.txtNombreCliente.value.trim();
	var apellidos=altaCliente.txtApellidosCliente.value.trim();
	var telefono=altaCliente.txtTelefonoCliente.value.trim();
	
	
	var oExpReg = /^\d{8}[a-zA-Z]$/;
	
	if (oExpReg.test(dni) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaCliente.txtDni.focus();	
		}
	
		sErrores += " \n DNI incorrecto<br>";
		
		//Marcar error
		altaCliente.txtDni.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaCliente.txtDni.className = "form-control";	
	}
	
	
	var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(nombre) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaCliente.txtNombreCliente.focus();	
		}
	
		sErrores += "\n Nombre incorrecto<br>";
		
		//Marcar error
		altaCliente.txtNombreCliente.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		altaCliente.txtNombreCliente.className = "form-control";	
	}


	var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(apellidos) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaCliente.txtApellidosCliente.focus();	
		}
	
		sErrores += "\n Apellidos incorrecto<br>";
		
		//Marcar error
			altaCliente.txtApellidosCliente.className = "form-control error";
	}
	else 
	{
		//Desmarcar error
		altaCliente.txtApellidosCliente.className = "form-control";	
	}

	var oExpReg = /^\d{9}$/;
	
	if (oExpReg.test(telefono) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			altaCliente.txtTelefonoCliente.focus();	
		}
	
		sErrores += "\n Teléfono incorrecto<br>";
		
		//Marcar error
		altaCliente.txtTelefonoCliente.className = "error form-control";
	
	}
	else 
	{
		//Desmarcar error
		altaCliente.txtTelefonoCliente.className = "form-control";	
	}

	//Resultado
	if (bValido == false)
	{	
		$("#pMensaje").text("");
		$("#divMensajes").dialog("open");
		$("#divMensajes").dialog("option","title","Error");
		$("#pMensaje").append(sErrores);
	}
	
	return bValido;

}