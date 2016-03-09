 <?php

// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "upoinmobiliaria";
$usuario   = "root";
$password  = "";

$datos=$_POST['datos'];

$oAlquiler = json_decode($datos);


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "SELECT `id` FROM `alquiler` WHERE `id`=".$oAlquiler->id." OR `idInmueble`=".$oAlquiler->idInmueble;


$resultados = mysql_query($sql, $conexion) or die(mysql_error());


$contador=mysql_num_rows($resultados);

if($contador>0)
{
	$mensaje= 'YA EXISTE ESE AlQUILER';
	$error = true;

}
else
{
	$mensaje='INSERTADO CON EXITO';
	$error = false;

	$sql = "insert into alquiler (id,dniCliente,Duracion,precio,fecha,idInmueble) VALUES ('$oAlquiler->id','$oAlquiler->dniCliente','$oAlquiler->duracion','$oAlquiler->precio','$oAlquiler->fecha','$oAlquiler->idInmueble')";

	$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
	
}

$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysql_close($conexion);

?> 