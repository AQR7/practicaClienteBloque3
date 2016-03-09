<?php

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$servidor  = "localhost";
$basedatos = "upoinmobiliaria";
$usuario   = "root";
$password  = "";

$id=$_REQUEST['txtIdInmueble'];
$direccion=$_REQUEST['txtDireccion'];
$dniEmpleado=$_REQUEST['cmbEmpleado'];
$m2=$_REQUEST['txtM2'];

$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "select id from inmueble where id = '".$id."' ";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$contador=mysql_num_rows($resultados);

if($contador>0)
{
	$mensaje= 'YA EXISTE ESE INMUEBLE';
	$error = 'true';

}
else
{
	$mensaje='INSERTADO CON EXITO';
	$error = 'false';
	
	$sql = "INSERT INTO `inmueble`(`id`, `direccion`, `dniEmpleado`, `m2`) VALUES($id,'$direccion','$dniEmpleado',$m2)";
	$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
	
}

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);
?>