function Alquiler(iId,sDniCliente,iDuracion,iPrecio,dFecha,iIdInmueble){
	this.id = iId;
	this.dniCliente = sDniCliente;
	this.duracion = iDuracion;
	this.precio = iPrecio;
	this.fecha = dFecha;
	this.idInmueble = iIdInmueble;
}

function Cliente(sDni,sNombre,sApellidos,iTelefono){
	this.dni = sDni;
	this.nombre = sNombre;
	this.apellidos = sApellidos;
	this.telefono = iTelefono;
	
}

function Propiedad(iId,sDireccion,sDni,iM2){
	this.id = iId;
	this.direccion = sDireccion;
	this.dni = sDni;
	this.m2 = iM2;
	
}


