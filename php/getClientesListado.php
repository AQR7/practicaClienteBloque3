<?php
// Cabecera para indicar que vamos a enviar datos XML y que no haga caché de los datos.
header('Content-Type: application/xml');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); 

/* Utilizar el fichero dbcreacion.sql incluído en la carpeta para crear la base de datos, usuario y tabla en tu servidor MySQL.
Si fuera necesario modifica los datos de la configuración y adáptalos a tu entorno de trabajo.*/

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upoinmobiliaria";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos, $conexion) or die(mysql_error());

// Consulta SQL para obtener los datos de los clientes
$sql = "SELECT * FROM cliente; ";

$cadena="";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());
while ($fila = mysql_fetch_array($resultados)) 
{
$cadena.="<cliente>";

	$cadena.="<dni>";
		$cadena.=$fila[0];
	$cadena.="</dni>";
	
	$cadena.="<nombre>";
		$cadena.=$fila[1];
	$cadena.="</nombre>";
	
	$cadena.="<apellidos>";
		$cadena.=$fila[2];
	$cadena.="</apellidos>";
	
	$cadena.="<telefono>";
		$cadena.=$fila[3];
	$cadena.="</telefono>";
	
$cadena.="</cliente>";
}

$xml = '<?xml version="1.0" encoding="UTF-8"?>';
  $xml .= '<CLIENTES>';
  $xml .= $cadena;
  $xml .= '</CLIENTES>';
  
echo $xml; 

mysql_close($conexion);

?> 