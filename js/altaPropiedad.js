 $("#capaFrmAltaPropiedad").dialog({
	 autoOpen: true,  // Es el valor por defecto
	 // beforeClose: antesDeCerrarse,
	 close: function () { 
				$("#frmAltaPropiedad")[0].reset();
						},
	 closeOnEscape: false, // No se cierra con ESCAPE
	 hide: {
		 effect: "explode",
		 duration: 1000
	 },
	 show: "fold",
	 buttons: [{
		 text: "Aceptar",
		 click: procesoAltaPropiedad
	 }, {
		 text: "Cancelar",
		 click: function() {
			 $(this).dialog("close");
		 }
	 }]
 }); 
 
if(localStorage["empleados"] != null)
{
	
	oArrayUbicaciones = JSON.parse(localStorage["empleados"]);
	rellenaCombo(oArrayUbicaciones);
} 
else 
{
	$.get('php/getEmpleados.php',null,tratarGetEmpleados,'json');
	
} 
 
 function procesoAltaPropiedad()
 {
	 
	if(validarAltaPropiedad())
	{
		var datos=$("#frmAltaPropiedad").serialize();
		$.post("php/altaPropiedad.php",datos,tratarAltaPropiedad,'json');
	}
	else
	{
		alert("NO VALIDO");
	}
	 
 }
 
 
 function tratarAltaPropiedad(datos, textStatus, jqXHR)
 {
	
	if(textStatus=="success")
	{
		alert(datos[1]);
		$("#frmAltaPropiedad")[0].reset();
	}
	else
	{
		alert(datos[0]);
	}
}



	function tratarGetEmpleados(oArrayEmpleados, sStatus, oXHR)
	{
		rellenaCombo(oArrayEmpleados);
		// Guardar en localStorage
		localStorage["empleados"] = JSON.stringify(oArrayEmpleados);
		

	}
	
	function rellenaCombo(oArrayEmpleados)
	{
		$("#cmbEmpleadoAltaPropiedad").empty();
		$('<option value="0" >Seleccione un empleado</option>').appendTo("#cmbEmpleadoAltaPropiedad");
		jQuery.each(oArrayEmpleados, function( i , elemento){
			$('<option value="' + elemento.dni + '" >'+  elemento.nombre+" "+elemento.apellidos+ '</option>').appendTo("#cmbEmpleadoAltaPropiedad");		
		});
	}

	function validarAltaPropiedad()
	{
		var bValido=true;
		var sErrores = "";
		var altaPropiedad=document.getElementById("frmAltaPropiedad");
		var id=altaPropiedad.txtIdInmueble.value.trim();
		var direccion=altaPropiedad.txtDireccion.value.trim();
		var empleado=altaPropiedad.cmbEmpleado.value.trim();
		var m2=altaPropiedad.txtM2.value.trim();
		
		if(id=="")
		{
			
			if(bValido == true)
			{
				bValido = false;		
				//Este campo obtiene el foco
				altaPropiedad.txtIdInmueble.focus();	
			}
		
			sErrores += "\n Introduzca un id";
			
			//Marcar error
			altaPropiedad.txtIdInmueble.className = "form-control error";
		}
		else
		{
			altaPropiedad.txtIdInmueble.className = "form-control";	
		}
		
		var oExpReg = /[a-zA-Z\s]{3,40}/;
		
		if (oExpReg.test(direccion) == false)
		{
		
			if(bValido == true)
			{
				bValido = false;		
				//Este campo obtiene el foco
				altaPropiedad.txtDireccion.focus();	
			}
		
			sErrores += "\nNombre incorrecto";
			
			//Marcar error
			altaPropiedad.txtDireccion.className = "form-control error";
		
		}
		else 
		{
			//Desmarcar error
			altaPropiedad.txtDireccion.className = "form-control";	
		}
		
		if(empleado==0)
		{
			
			if(bValido == true)
			{
				bValido = false;		
				//Este campo obtiene el foco
				altaPropiedad.cmbEmpleado.focus();	
			}
		
			sErrores += "\n Elija un empleado";
			
			//Marcar error
			altaPropiedad.cmbEmpleado.className = "form-control error";
		
		}
		else 
		{
			//Desmarcar error
			altaPropiedad.cmbEmpleado.className = "form-control";	
		}

		var oExpReg = /^\d+$/;
		
		if (oExpReg.test(m2) == false)
		{
		
			if(bValido == true)
			{
				bValido = false;		
				//Este campo obtiene el foco
				altaPropiedad.txtM2.focus();	
			}
		
			sErrores += "\n Introduzca los M2";
			
			//Marcar error
			altaPropiedad.txtM2.className = "error form-control";
		
		}
		else 
		{
			//Desmarcar error
			altaPropiedad.txtM2.className = "form-control";	
		}

		//Resultado
		if (bValido == false)
		{	
			
		}
		
		return bValido;
		
	}