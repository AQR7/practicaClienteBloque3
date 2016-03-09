 $.get('php/getPropiedad.php',null,tratarGetPropiedad,'json');
 $("#capaFrmModificarPropiedad").dialog({
	 autoOpen: true,  // Es el valor por defecto
	 // beforeClose: antesDeCerrarse,
	 close: function () { 
				$("#frmModificarPropiedad")[0].reset();
						},
	 closeOnEscape: false, // No se cierra con ESCAPE
	 hide: {
		 effect: "explode",
		 duration: 1000
	 },
	 show: "fold",
	 buttons: [{
		 text: "Aceptar",
		 click: procesoModPropiedad
	 }, {
		 text: "Cancelar",
		 click: function() {
			 $(this).dialog("close");
		 }
	 }]
 }); 
 
 	if(localStorage["empleados"] != null)
	{
		
		oArrayEmpleados = JSON.parse(localStorage["empleados"]);
		rellenaCombo(oArrayEmpleados);
	} 
	else 
	{
		$.get('php/getEmpleados.php',null,tratarGetEmpleados,'json');	
	}
 
 
 $("#cmbInmueble").change(function() 
{
 var valor=$("#cmbInmueble").val();

 if(valor!=0)
 {   
	$.get('php/getPropietarios.php',"valor="+valor,insertarEnCampos,'json');

 }
 else
 {
	frmModificarPropiedad.txtDireccion.value="";
	frmModificarPropiedad.cmbEmpleado.value=0;
	frmModificarPropiedad.txtM2.value="";
	
 }
 
 });
 
 
 function insertarEnCampos(oArrayInmueble, sStatus, oXHR)
{
	jQuery.each(oArrayInmueble, function( i , elemento)
	{
		frmModificarPropiedad.txtDireccion.value=elemento.direccion;
		
		if(elemento.m2=$("#cmbInmueble").val())
		{
			frmModificarPropiedad.cmbEmpleado.value=elemento.dniEmpleado;
		}
		
		frmModificarPropiedad.txtM2.value=elemento.m2;	
	});
}

 
 

function tratarGetPropiedad(oArrayCliente, sStatus, oXHR){

		$("#cmbInmueble").empty();
		$('<option value="0" >Seleccione un id de inmueble</option>').appendTo("#cmbInmueble");
		jQuery.each(oArrayCliente, function( i , elemento){
			$('<option value="' + elemento.id + '" >' +  elemento.id + '</option>').appendTo("#cmbInmueble");		
		});
}


function tratarGetEmpleados(oArrayEmpleados, sStatus, oXHR)
{
	rellenaCombo(oArrayEmpleados);
	// Guardar en localStorage
	localStorage["empleados"] = JSON.stringify(oArrayEmpleados);
}

function rellenaCombo(oArrayEmpleados)
{
	$("#cmbEmpleadoModificarPropiedad").empty();
	$('<option value="0" >Seleccione un empleado</option>').appendTo("#cmbEmpleadoModificarPropiedad");
	jQuery.each(oArrayEmpleados, function( i , elemento){
		$('<option value="' + elemento.dni + '" >'+  elemento.nombre+" "+elemento.apellidos+ '</option>').appendTo("#cmbEmpleadoModificarPropiedad");		
	});
}

function procesoModPropiedad()
{

	if (validarModPropietarios())
	{
		var oPropiedad = new Propiedad($('#cmbInmueble').val(),frmModificarPropiedad.txtDireccion.value,frmModificarPropiedad.cmbEmpleado.value,frmModificarPropiedad.txtM2.value);
		
		var sParametroGET = "propiedad=" + JSON.stringify(oPropiedad);
		
		// Script de envio
		var sURL = encodeURI("php/modificarPropiedad.php?");
		
		llamadaAjaxModPropiedad(sURL,sParametroGET);
	}
	
}

function llamadaAjaxModPropiedad(sURL,sParametroGET){

	oAjaxModPropiedad = objetoXHR();
	
	oAjaxModPropiedad.open("GET",sURL+sParametroGET,true);
		
	oAjaxModPropiedad.onreadystatechange = respuestaModPropiedad;

	oAjaxModPropiedad.send(null);
}

function respuestaModPropiedad(){

	if(oAjaxModPropiedad.readyState == 4 && oAjaxModPropiedad.status == 200)	
	{		
		var oArrayRespuesta = JSON.parse(oAjaxModPropiedad.responseText);
		
		if (oArrayRespuesta[0] == true)
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
			$("#frmModificarPropiedad")[0].reset();
		}
	}
}

function validarModPropietarios()
{

	var bValido=true;
	var sErrores = "";
	
	var modificarPropietario=document.getElementById("frmModificarPropiedad");	
	var id=modificarPropietario.cmbInmueble.value.trim();
	var direccion=modificarPropietario.txtDireccion.value.trim();
	var dni=modificarPropietario.cmbEmpleado.value.trim();
	var m2=modificarPropietario.txtM2.value.trim();

	
	if(id==0)
	{
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			modificarPropietario.cmbInmueble.focus();	
		}
	
		sErrores += "\n Elije un inmueble<BR>";
		
		//Marcar error
		modificarPropietario.cmbInmueble.className = "form-control error";
		
	}
	else
	{
		modificarPropietario.cmbInmueble.className = "form-control";			
	}
	
	
	var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(direccion) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			modificarPropietario.txtDireccion.focus();	
		}
	
		sErrores += "\n Dirección incorrecta<BR>";
		
		//Marcar error
		modificarPropietario.txtDireccion.className = "form-control error";
	}
	else 
	{
		//Desmarcar error
		modificarPropietario.txtDireccion.className = "form-control";	
	}
	
	if(dni==0)
	{
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			modificarPropietario.cmbEmpleado.focus();	
		}
	
		sErrores += "\n Elije un empleado<BR>";
		
		//Marcar error
		modificarPropietario.cmbEmpleado.className = "form-control error";
		
	}
	else
	{
		modificarPropietario.cmbEmpleado.className = "form-control";			
	}
	
	var oExpReg = /^(?:\+|-)?\d+$/;
	
	if (oExpReg.test(m2) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			modificarPropietario.txtM2.focus();	
		}
	
		sErrores += "\n M2 incorrecto<BR>";
		
		//Marcar error
		modificarPropietario.txtM2.className = "form-control error";
	
	}
	else 
	{
		modificarPropietario.txtM2.className = "form-control";	
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

