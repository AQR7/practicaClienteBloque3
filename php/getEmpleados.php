<?php
// Cabecera para indicar que vamos a enviar datos JSON y que no haga cach� de los datos.
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); 

/* Utilizar el fichero dbcreacion.sql inclu�do en la carpeta para crear la base de datos, usuario y tabla en tu servidor MySQL.
Si fuera necesario modifica los datos de la configuraci�n y ad�ptalos a tu entorno de trabajo.*/

// Configuraci�n BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "upoinmobiliaria";
$usuario   = "root";
$password  = "";

// Creamos la conexi�n al servidor.
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos, $conexion) or die(mysql_error());

// Consulta SQL para obtener los datos de los clientes
$sql = "SELECT * FROM empleado ";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());
while ($fila = mysql_fetch_array($resultados, MYSQL_ASSOC)) {
    // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
    $datos[] = $fila;
}

// funci�n de PHP que convierte a formato JSON el array.
echo json_encode($datos); 

mysql_close($conexion);

?> 