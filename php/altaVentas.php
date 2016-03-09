<?php

// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "upoinmobiliaria";
$usuario   = "root";
$password  = "";

$id=$_REQUEST['txtId'];
$dni=$_REQUEST['txtDniCliente'];
$inmueble=$_REQUEST['txtIdImueble'];
$precio=$_REQUEST['txtPrecio'];
$fecha=$_REQUEST['txtCalendarioAlternativo'];

// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());



$mensaje='INSERTADO CON EXITO';
$error = false;

// Inserto el registro
$sql = "insert into ventas (id, dniCliente,precio,fecha,idInmueble) VALUES ($id,'$dni',$precio,'$fecha',$inmueble)";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
	
// Formateo la respuesa como un array JSON
$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysql_close($conexion);

?> 