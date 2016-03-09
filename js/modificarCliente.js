$.get('php/getClientes.php',null,tratarGetClientes,'json');
 $("#capaFrmModificarCliente").dialog({
	 autoOpen: true,  // Es el valor por defecto
	 // beforeClose: antesDeCerrarse,
	 close: function () { 
				$("#frmModificarCliente")[0].reset();
		
						},
	 closeOnEscape: false, // No se cierra con ESCAPE
	 hide: {
		 effect: "explode",
		 duration: 1000
	 },
	 show: "fold",
	 buttons: [{
		 text: "Aceptar",
		 click: procesoModificarCliente
	 }, {
		 text: "Cancelar",
		 click: function() {
			 $(this).dialog("close");
		 }
	 }]
 });
 

$("#cmbClienteModificar").change(function() 
{
 var valor=$("#cmbClienteModificar").val();

 if(valor!=0)
 {
	$.get('php/getCliente.php',"valor="+valor,insertarEnCampos,'json');
 }
 else
 {
	$("#txtNombreCliente").val("");
	$("#txtApellidosCliente").val("");
	$("#txtTelefonoCliente").val("");
 }
 
 
 
 
});

function procesoModificarCliente(){

	if(validarModificarCliente())
	{
		var oCliente = new Cliente($('#cmbClienteModificar').val(),frmModificarCliente.txtNombreCliente.value,frmModificarCliente.txtApellidosCliente.value,frmModificarCliente.txtTelefonoCliente.value);
		
		// Formateo de parametro POST
		var sParametroPOST = "clientes=" + JSON.stringify(oCliente);
		
		// Llamada POST con Jquery	
		$.post("php/modificarCliente.php",sParametroPOST,tratarModificarCliente,'json');
	}
	
	
}	


function tratarModificarCliente(oRespuesta,sEstado,oXHR){

		if (oRespuesta[0] == true)
		{
			alert("Error : " + oRespuesta[1]);
			$("#frmModificarCliente")[0].reset();
		} else 
		{
			alert("OK : " + oRespuesta[1]);
		}
	
}



function tratarGetClientes(oArrayCliente, sStatus, oXHR){

		$("#cmbClienteModificar").empty();
		$('<option value="0" >Seleccione un cliente</option>').appendTo("#cmbClienteModificar");
		jQuery.each(oArrayCliente, function( i , elemento){
			$('<option value="' + elemento.dni + '" >'+  elemento.nombre+" "+elemento.apellidos+ '</option>').appendTo("#cmbClienteModificar");		
		});
}

function insertarEnCampos(oArrayCliente, sStatus, oXHR)
{
	jQuery.each(oArrayCliente, function( i , elemento)
	{
		$("#txtNombreCliente").val(elemento.nombre);
		$("#txtApellidosCliente").val(elemento.apellidos);
		$("#txtTelefonoCliente").val(elemento.telefono);	
	});
}

function validarModificarCliente()
{
	var bValido=true;
	var sErrores = "";
	
	var modificarCliente=document.getElementById("frmModificarCliente");
	var dni=modificarCliente.cmbCliente.value.trim();
	var nombre=modificarCliente.txtNombreCliente.value.trim();
	var apellidos=modificarCliente.txtApellidosCliente.value.trim();
	var telefono=modificarCliente.txtTelefonoCliente.value.trim();
	
	
	if(dni==0)
	{
		
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			modificarCliente.cmbCliente.focus();	
		}
	
		sErrores += "\n Elija un cliente";
		
		//Marcar error
		modificarCliente.cmbCliente.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		modificarCliente.cmbCliente.className = "form-control";	
	}
	var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(nombre) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			modificarCliente.txtNombreCliente.focus();	
		}
	
		sErrores += "\nNombre incorrecto";
		
		//Marcar error
		modificarCliente.txtNombreCliente.className = "form-control error";
	
	}
	else 
	{
		//Desmarcar error
		modificarCliente.txtNombreCliente.className = "form-control";	
	}


	var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(apellidos) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			modificarCliente.txtApellidosCliente.focus();	
		}
	
		sErrores += "\n Apellidos incorrecto";
		
		//Marcar error
			modificarCliente.txtApellidosCliente.className = "form-control error";
	}
	else 
	{
		//Desmarcar error
		modificarCliente.txtApellidosCliente.className = "form-control";	
	}

	var oExpReg = /^\d{9}$/;
	
	if (oExpReg.test(telefono) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			modificarCliente.txtTelefonoCliente.focus();	
		}
	
		sErrores += "\n Teléfono incorrecto";
		
		//Marcar error
		modificarCliente.txtTelefonoCliente.className = "error form-control";
	
	}
	else 
	{
		//Desmarcar error
		modificarCliente.txtTelefonoCliente.className = "form-control";	
	}

	//Resultado
	if (bValido == false)
	{	
		
	}
	
	return bValido;

}

