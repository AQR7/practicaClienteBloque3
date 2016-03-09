<?php

// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "upoinmobiliaria";
$usuario   = "root";
$password  = "";

$sPropiedad=$_REQUEST['propiedad'];

$oPropiedad = json_decode($sPropiedad);


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());



$mensaje='UPDATE CON EXITO';
$error = false;

// Inserto el registro
//$sql = "insert into Casas (CodCasa,CodPropietario,CodUbic,Descripcion,Habitaciones,Piscina,Precio) VALUES ($codigo,'$oCasa->CodPropietario',$oCasa->CodUbicacion,'$oCasa->Descripcion',$oCasa->Habitaciones,'$oCasa->Piscina',$oCasa->Precio)";

$sql = "UPDATE inmueble SET id=$oPropiedad->id,direccion='$oPropiedad->direccion',dniEmpleado='$oPropiedad->dni',m2=$oPropiedad->m2 WHERE id='$oPropiedad->id'";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
	
// Formateo la respuesa como un array JSON
$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysql_close($conexion);

?> 