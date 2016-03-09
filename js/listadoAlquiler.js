 $("#capaFrmListarAlquiler").dialog({
         autoOpen: true,  // Es el valor por defecto
         // beforeClose: antesDeCerrarse,
         close: function () { 
         			$("#frmListarAlquiler")[0].reset();
         					},
         closeOnEscape: false, // No se cierra con ESCAPE
         hide: {
             effect: "explode",
             duration: 1000
         },
         show: "fold",
         buttons: [{
             text: "Aceptar",
             click: listar
         }, {
             text: "Cancelar",
             click: function() {
                 $(this).dialog("close");
             }
         }]
     });  


function listar(){
if (validarListadoAlquiler()){

	var valor=frmListarAlquiler.precioAlquiler.value;
	
	$.get('php/getListadoVentasAlquiler.php',"valor="+valor,generarListadoAlquiler,'json');
 
}
	
}



function generarListadoAlquiler(oArrayAlquiler, sEstado, oXHR)
{

		
	$("#listado").empty();
	var oTabla = $('<table class="table table-bordered" id="listadoVentas">').append("<tr><td>ID</td><td>Dni Cliente</td><td>Precio</td><td>Fecha</td><td>ID Inmueble</td></tr>");
	
	$(oArrayAlquiler).each(function(){
	
	if(frmListarAlquiler.txtCalendarioAlternativo3.value < this.fecha)
	{
		if(frmListarAlquiler.txtCalendarioAlternativo4.value > this.fecha)
		{
			$("<tr><td>" + this.id + "</td><td>" + this.dniCliente + "</td><td>" + this.precio + "</td><td>" + this.fecha + "</td><td>" + this.idInmueble + "</td></tr>").appendTo(oTabla);
		}
	}
	});
	
	$("#listado").dialog("open");
	$("#listado").dialog("option","title","Listado Alquiler");
	$(oTabla).appendTo("#listado");


	


}

function validarListadoAlquiler()
{

	var bValido=true;
	var sErrores = "";

	var oExpReg = /^(?:\+|-)?\d+$/;
	
	if (oExpReg.test(frmListarAlquiler.precioAlquiler.value) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			frmListarAlquiler.precioAlquiler.focus();	
		}
	
		sErrores += "\n Precio  incorrecto <br>";
		
		//Marcar error
		frmListarAlquiler.precioAlquiler.className = "form-control error";
	
	}
	else 
	{
		frmListarAlquiler.precioAlquiler.className = "form-control";	
		
	}

	if(frmListarAlquiler.txtFechaAlquiler.value=="")
	{
		frmListarAlquiler.txtFechaAlquiler.className = "form-control error";
		sErrores += "\n Fecha Entrada incorrecta <br>";
		
		bValido = false;
		
	}
	else
	{
		frmListarAlquiler.txtFechaAlquiler.className = "form-control";	
		
	}
	
		
	if(frmListarAlquiler.txtFechaAlquiler2.value=="")
	{
		frmListarAlquiler.txtFechaAlquiler2.className = "form-control error";
		sErrores += "\n Fecha Salida incorrecta <br>";
		bValido = false;
		
	}
	else
	{
		frmListarAlquiler.txtFechaAlquiler2.className = "form-control";	
		
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