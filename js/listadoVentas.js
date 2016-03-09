 $("#capaFrmListarVentas").dialog({
         autoOpen: true,  // Es el valor por defecto
         // beforeClose: antesDeCerrarse,
         close: function () { 
         			$("#frmListarVentas")[0].reset();
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
if (validarListadoVentas()){

var valor=frmListarVentas.precioVentas.value;

 
	$.get('php/getListadoVentasPrecio.php',"valor="+valor,generarListadoVentas,'json');
 
}
	
}






function generarListadoVentas(oArrayVentas, sEstado, oXHR){

	// Oculto todos los formularios 
	
	$("#listado").empty();
	
	var oTabla = $('<table id="listadoVentas" class="table table-bordered" >').append("<tr><td>ID</td><td>Dni Cliente</td><td>Precio</td><td>Fecha</td><td>ID Inmueble</td></tr>");
	
	$(oArrayVentas).each(function(){
	
	if(frmListarVentas.txtCalendarioAlternativo1.value < this.fecha){
if(frmListarVentas.txtCalendarioAlternativo2.value > this.fecha){
			$("<tr><td>" + this.id + "</td><td>" + this.dniCliente + "</td><td>" + this.precio + "</td><td>" + this.fecha + "</td><td>" + this.idInmueble + "</td></tr>").appendTo(oTabla);
	}}
	});
	
	$("#listado").dialog("open");
	$("#listado").dialog("option","title","Listado Ventas");
	$(oTabla).appendTo("#listado");

	


}

function validarListadoVentas(){

	var bValido=true;
	var sErrores = "";
	
	var oExpReg = /^(?:\+|-)?\d+$/;
	
	if (oExpReg.test(frmListarVentas.precioVentas.value) == false)
	{
	
		if(bValido == true)
		{
			bValido = false;		
			//Este campo obtiene el foco
			frmListarVentas.precioVentas.focus();	
		}
	
		sErrores += "\n Precio incorrecto <br>";
		
		//Marcar error
		frmListarVentas.precioVentas.className = "form-control error";
	
	}
	else 
	{
		frmListarVentas.precioVentas.className = "form-control";	
		
	}

	
	if(frmListarVentas.txtFechaVentas.value=="")
	{
		sErrores += "\n Fecha Entrada incorrecta <br>";
		frmListarVentas.txtFechaVentas.className = "form-control error";
		bValido = false;
		
	}
	else
	{
		frmListarVentas.txtFechaVentas.className = "form-control";	
		
	}
	
		
	if(frmListarVentas.txtFechaVentas2.value=="")
	{
		sErrores += "\n Fecha Salida incorrecta <br>";
		frmListarVentas.txtFechaVentas2.className = "form-control error";
		bValido = false;
		
	}else
	{
		frmListarVentas.txtFechaVentas2.className = "form-control";	
		
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