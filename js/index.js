window.onload=inicio;


function inicio()
{
	
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


	
}