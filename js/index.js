window.onload=inicio;


function inicio()
{
	$("#divMensajes").dialog( {autoOpen:false,
								modal:true});
	
	$("#listado").dialog( {autoOpen:false,
	width:550,
								modal:true});
	
	
	$('#mnuAltaCliente').click(function()
	{
			
		// Verifico si ya he cargado el formulario antes
		if( $('#frmAltaCliente').size() == 0 )
		{
		
			$('<div title="Alta cliente" id="capaFrmAltaCliente"></div>').appendTo('#formularios').load("html/altaCliente.html", function(){ $.getScript("js/altaCliente.js")});

		} 
		else 
		{
			// Lo abro si está cerrado
			$('#capaFrmAltaCliente').dialog("open");
		}
		
	});
	
	
	$('#mnuAltaPropiedad').click(function()
	{
			
		// Verifico si ya he cargado el formulario antes
		if( $('#frmAltaPropiedad').size() == 0 )
		{
		
			$('<div title="Alta propiedad" id="capaFrmAltaPropiedad"></div>').appendTo('#formularios').load("html/altaPropiedad.html", function(){ $.getScript("js/altaPropiedad.js")});

		} 
		else 
		{
			// Lo abro si está cerrado
			$('#capaFrmAltaPropiedad').dialog("open");
		}
		
	});
	
		
	
	$('#mnuAltaVenta').click(function(){
			
		// Verifico si ya he cargado el formulario antes
		if( $('#VentasForm').size() == 0 ){
		
			$('<div title="Alta Ventas" id="capaFrmAltaVentas"></div>').appendTo('#formularios').load("html/altaVentas.html", function(){ $.getScript("js/altaVentas.js")});
			
			
		} else {
			// Lo abro si está cerrado
			$('#capaFrmAltaVentas').dialog("open");
		}
		
	});
		
			$('#mnuAltaAlquiler').click(function(){
			
		// Verifico si ya he cargado el formulario antes
		if( $('#alquilerForm').size() == 0 ){
		
			$('<div title="Alta Alquiler" id="capaFrmAltaAlquiler"></div>').appendTo('#formularios').load("html/altaAlquiler.html", function(){ $.getScript("js/altaAlquiler.js")});
			
			
		} else {
			// Lo abro si está cerrado
			$('#capaFrmAltaAlquiler').dialog("open");
		}
		
	});
	
	$('#mnuModificarCliente').click(function(){
			
		// Verifico si ya he cargado el formulario antes
		if( $('#frmModificarCliente').size() == 0 ){
		
			$('<div title="Modificar Clientes" id="capaFrmModificarCliente"></div>').appendTo('#formularios').load("html/modificarCliente.html", function(){ $.getScript("js/modificarCliente.js")});
			
			
		} else {
			// Lo abro si está cerrado
			$('#capaFrmModificarCliente').dialog("open");
		}
		
	});	
	$('#mnuModificarPropiedad').click(function(){
			
		// Verifico si ya he cargado el formulario antes
		if( $('#frmModificarPropiedad').size() == 0 ){
		
			$('<div title="Modificar Propiedad" id="capaFrmModificarPropiedad"></div>').appendTo('#formularios').load("html/modificarPropiedad.html", function(){ $.getScript("js/modificarPropiedad.js")});
			
			
		} else {
			// Lo abro si está cerrado
			$('#capaFrmModificarPropiedad').dialog("open");
		}
		
		
	});

	
	$('#mnuListados').click(function(){
			
		// Verifico si ya he cargado el formulario antes
		if( $('#frmListar').size() == 0 ){
		
			$('<div title="Listar" id="capaFrmListar"></div>').appendTo('#formularios').load("html/listado.html", function(){ $.getScript("js/listado.js")});
			
			
		} else {
			// Lo abro si está cerrado
			$('#capaFrmListar').dialog("open");
		}
		
		
	});

	
	$('#mnuListarVentas').click(function(){
			
		// Verifico si ya he cargado el formulario antes
		if( $('#frmListarVentas').size() == 0 ){
		
			$('<div title="Listado Ventas" id="capaFrmListarVentas"></div>').appendTo('#formularios').load("html/listadoVentas.html", function(){ $.getScript("js/listadoVentas.js")});
			
			
		} else {
			// Lo abro si está cerrado
			$('#capaFrmListarVentas').dialog("open");
		}
		
		
	});
	
	$('#mnuListarAlquileres').click(function(){
			
		// Verifico si ya he cargado el formulario antes
		if( $('#frmListarAlquiler').size() == 0 ){
		
			$('<div title="Listado Alquiler" id="capaFrmListarAlquiler"></div>').appendTo('#formularios').load("html/listadoAlquiler.html", function(){ $.getScript("js/listadoAlquiler.js")});
			
			
		} else {
			// Lo abro si está cerrado
			$('#capaFrmListarAlquiler').dialog("open");
		}
		
		
	});
	
	$('#mnuListarCliente').click(function()
	{	
		ajax = new XMLHttpRequest();
        ajax.open('POST', encodeURI("./php/getClientesListado.php?"));

		// Para peticiones con metodo POST        
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
        ajax.addEventListener('readystatechange', tratarRespuesta, false);
        ajax.send();
        
        
		
		
	});
	
	
	
	function tratarRespuesta()
    {
        if(ajax.readyState == 4 && ajax.status == 200){
        
      		//Recojo el documento XML en variable global
            oXML = ajax.responseXML;
            
            procesaXML(oXML);
        }
    }
    
    function procesaXML(oXML)
	{
    
    	$("#listado").text("");
		
		var nCliente = oXML.getElementsByTagName("cliente").length;
		var dni = oXML.getElementsByTagName("dni");
		var nombre= oXML.getElementsByTagName("nombre");
		var apellidos = oXML.getElementsByTagName("apellidos");
		var telefono = oXML.getElementsByTagName("telefono");

		
		$("#listado").dialog("open");
		$("#listado").dialog("option","title","Listado de clientes");
		
		var tabla="<table class='table table-bordered'>";
		tabla+="<tr><td>DNI</td><td>NOMBRE</td><td>APELLIDOS</td><td>TELEFONO</td></tr>";
		for(i=0;i<nCliente;i++)
		{
			tabla+="<tr>";
			tabla+="<td>"+dni[i].textContent+"</td><td>"+nombre[i].textContent+"</td><td>"+apellidos[i].textContent+"</td><td>"+telefono[i].textContent+"</td>";
			tabla+="</tr>";
		}
		tabla+="</table>";
		document.getElementById("listado").innerHTML=tabla;
    	
		
	}
	
		
	$('#mnuListarPropiedades').click(function()
	{
			
		$.get('php/listadoPropietario.php',null,generarListadoPropietario,'json');	
		
		
	});
	
	
	function generarListadoPropietario(oArrayProp, sEstado, oXHR)
	{
		
		$("#listado").empty();
		
		var oTabla = $('<table class="table table-bordered" id="listadoPropietario">').css("border","black thin solid").append("<tr><td>ID</td><td>Dirección</td><td>Dni Empleado</td><td>M2</td></tr>");
		
		$(oArrayProp).each(function(){		
				$("<tr><td>" + this.id + "</td><td>" + this.direccion + "</td><td>" + this.dniEmpleado + "</td><td>" + this.m2 + "</td></tr>").appendTo(oTabla);
		});
		
		$("#listado").dialog("open");
		$("#listado").dialog("option","title","Listado Propiedades");
		$(oTabla).appendTo("#listado");


	}
	
	
	
	function tratarGetEmpleados(oArrayEmpleados, sStatus, oXHR){

		rellenaCombo(oArrayEmpleados);
		
		// Guardar en localStorage
		localStorage["empleados"] = JSON.stringify(oArrayEmpleados);
		

}
	
	
	
	
	
}