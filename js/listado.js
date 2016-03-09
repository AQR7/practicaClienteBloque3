 $("#capaFrmListar").dialog({
         autoOpen: true,  // Es el valor por defecto
         // beforeClose: antesDeCerrarse,
         close: function () { 
         			$("#frmListar")[0].reset();
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
	

$.get('php/getListadoVentas.php',null,generarListadoVentas,'json');	


	
}






function generarListadoVentas(oArrayVentas, sEstado, oXHR){

	// Oculto todos los formularios 
	
	//$("#listado").remove();
	
	var oTabla = $('<table id="listadoVentas">').css("border","1px solid black").append("<tr><td>ID<td><td>Dni Cliente<td><td>Precio<td><td>Fecha<td><td>ID Inmueble<td><tr>");
	
	$(oArrayVentas).each(function(){		
			$("<tr><td>" + this.id + "</td><td>" + this.dniCliente + "</td><td>" + this.precio + "</td><td>" + this.fecha + "</td><td>" + this.idInmueble + "</td></tr>").appendTo(oTabla);
	});
	
	$(oTabla).appendTo("#listado");


	


}
