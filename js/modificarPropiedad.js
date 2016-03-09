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
 
 $("#cmbInmueble").change(function() 
{
 var valor=$("#cmbInmueble").val();

 if(valor!=0)
 {
	$.get('php/getPropietarios.php',"valor="+valor,insertarEnCampos,'json');

	//$("#txtDniEmpleado").val("");
	//$("#txtM2").val("");
	//$("#txtDireccion").val();
 }
 else
 {
	//$("#txtDireccion").val("");
	//$("#txtDniEmpleado").val("");
	//$("#txtM2").val("");
	frmModificarPropiedad.txtDireccion.value="";
frmModificarPropiedad.txtDniEmpleado.value="";
frmModificarPropiedad.txtM2.value="";
	
 }
 
 });
 
 
 function insertarEnCampos(oArrayInmueble, sStatus, oXHR)
{
	jQuery.each(oArrayInmueble, function( i , elemento)
	{
		frmModificarPropiedad.txtDireccion.value=elemento.direccion;
		frmModificarPropiedad.txtDniEmpleado.value=elemento.dniEmpleado;
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



function procesoModPropiedad(){

	// Aqui habría que hacer la validacion del formulario
	// if (validarAltaUbicacion()){
	
	//Desactivar boton de envio
	
	

	
	

	/*
	alert($('#cmbInmueble').val());
	alert(frmModificarPropiedad.txtDireccion.value);
	alert(frmModificarPropiedad.txtAccion.value);
	
	alert(frmModificarPropiedad.txtDniEmpleado.value);
	alert(frmModificarPropiedad.txtM2.value);

	
	*/


	
	if (validarModPropietarios()){
	
	
	var oPropiedad = new Propiedad($('#cmbInmueble').val(),frmModificarPropiedad.txtDireccion.value,frmModificarPropiedad.txtDniEmpleado.value,frmModificarPropiedad.txtM2.value);
	
	
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

	if(oAjaxModPropiedad.readyState == 4 && oAjaxModPropiedad.status ==200)	{
				
		var oArrayRespuesta = JSON.parse(oAjaxModPropiedad.responseText);
		
		if (oArrayRespuesta[0] == true){
			alert("Error : " + oArrayRespuesta[1]);
		} else {
			alert("OK : " + oArrayRespuesta[1]);
			$("#frmModificarPropiedad")[0].reset();
		}
		
	

		
	}
}
function validarModPropietarios(){

	var bValido=true;
	var sErrores = "";
	
	var modificarPropietario=document.getElementById("frmModificarPropiedad");			
	var direccion=modificarPropietario.txtDireccion.value.trim();
	var dni=modificarPropietario.txtDniEmpleado.value.trim();
	var m2=modificarPropietario.txtM2.value.trim();

var oExpReg = /[a-zA-Z\s]{3,40}/;
	
	if (oExpReg.test(direccion) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			modificarPropietario.txtDireccion.focus();	
		}
	
		sErrores += "\n Dirección incorrecto";
		
		//Marcar error
			modificarPropietario.txtDireccion.className = "form-control error";
	}
	else 
	{
		//Desmarcar error
		modificarPropietario.txtDireccion.className = "form-control";	
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
	
		sErrores += "\n id m2 incorrecto";
		
		//Marcar error
		modificarPropietario.txtM2.className = "form-control error";
	
	}
	else 
	{
		modificarPropietario.txtM2.className = "form-control";	
		
	}

	
	
	if (bValido == false)
	{	
		
	}
	
	return bValido;
}

