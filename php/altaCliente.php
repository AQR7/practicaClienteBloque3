<?php

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "upoinmobiliaria";
$usuario   = "root";
$password  = "";

$datos=$_REQUEST['datos'];

$oCliente= json_decode($datos);

$dni=$oCliente[0]->value;
$nombre=$oCliente[1]->value;
$apellidos=$oCliente[2]->value;
$telefono=$oCliente[3]->value;


$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "select dni from cliente where dni = '".$dni."' ";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());


$contador=mysql_num_rows($resultados);

if($contador>0)
{
	$mensaje= 'YA EXISTE ESE CLIENTE';
	$error = true;

}
else
{
	$mensaje='INSERTADO CON EXITO';
	$error = false;

	$sql = "INSERT INTO cliente (DNI,Nombre,Apellidos,Telefono) VALUES ('$dni','$nombre','$apellidos','$telefono')";

	$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
	
}
$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);
?>