-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-03-2016 a las 13:33:22
-- Versión del servidor: 5.5.39
-- Versión de PHP: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `upoinmobiliaria`
--
CREATE DATABASE IF NOT EXISTS `upoinmobiliaria` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `upoinmobiliaria`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquiler`
--

DROP TABLE IF EXISTS `alquiler`;
CREATE TABLE IF NOT EXISTS `alquiler` (
`id` int(3) NOT NULL,
  `dniCliente` varchar(9) NOT NULL,
  `Duracion` int(3) NOT NULL,
  `precio` int(7) NOT NULL,
  `fecha` date NOT NULL,
  `idInmueble` int(3) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `alquiler`
--

INSERT INTO `alquiler` (`id`, `dniCliente`, `Duracion`, `precio`, `fecha`, `idInmueble`) VALUES
(1, '12345678A', 45, 12, '2016-03-23', 1),
(2, '12345678B', 34, 55, '2016-03-30', 2),
(3, '12345678O', 34, 1234, '2016-03-23', 7),
(4, '12345678B', 234, 343, '2016-03-16', 3),
(5, '12345678B', 232, 232, '2016-03-23', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellidos` varchar(40) NOT NULL,
  `telefono` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`dni`, `nombre`, `apellidos`, `telefono`) VALUES
('12345678A', 'Alberto', 'Quevedo Rodríguez', 123456789),
('12345678B', 'Fran', 'Rodríguez De la Peña', 123456788),
('12345678C', 'Luis', 'Gomez Martinez', 987654321),
('12345678Q', 'Juanito', 'Perez', 123456765);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

DROP TABLE IF EXISTS `empleado`;
CREATE TABLE IF NOT EXISTS `empleado` (
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellidos` varchar(40) NOT NULL,
  `telefono` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`dni`, `nombre`, `apellidos`, `telefono`) VALUES
('12345678X', 'Felipe', 'Alvarez', 123456789),
('12345678Y', 'Marta', 'Guillen', 987654321),
('12345678Z', 'Carmen', 'Prada', 123456788),
('12345685R', 'Daniel', 'Portillo', 741258963),
('54678932D', 'Aziz', 'Labib ', 456321798);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmueble`
--

DROP TABLE IF EXISTS `inmueble`;
CREATE TABLE IF NOT EXISTS `inmueble` (
  `id` int(3) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `dniEmpleado` varchar(9) NOT NULL,
  `m2` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `inmueble`
--

INSERT INTO `inmueble` (`id`, `direccion`, `dniEmpleado`, `m2`) VALUES
(1, 'Calle Inventada', '12345678A', 1234),
(2, 'Calle de la calle', '12345678B', 234),
(3, 'Plaza de España', '12345678B', 213),
(4, 'Callecita n4', '12345678C', 4),
(7, 'Distrito 9', '12345678A', 22222),
(17, 'Avenida escondida', '12345678A', 33333);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

DROP TABLE IF EXISTS `ventas`;
CREATE TABLE IF NOT EXISTS `ventas` (
  `id` int(3) NOT NULL,
  `dniCliente` varchar(9) NOT NULL,
  `precio` int(7) NOT NULL,
  `fecha` date NOT NULL,
  `idInmueble` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `dniCliente`, `precio`, `fecha`, `idInmueble`) VALUES
(1, '12345678A', 100, '2016-03-11', 4),
(2, '12345678B', 11111, '2016-02-02', 2),
(3, '12345678Q', 445, '2016-04-06', 1),
(4, '12345678A', 2332, '2016-03-16', 3),
(5, '12345678R', 4445, '2016-03-17', 17);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alquiler`
--
ALTER TABLE `alquiler`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`), ADD KEY `dniCliente` (`dniCliente`), ADD KEY `idInmueble` (`idInmueble`), ADD KEY `dniCliente_2` (`dniCliente`), ADD KEY `idInmueble_2` (`idInmueble`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
 ADD PRIMARY KEY (`dni`), ADD UNIQUE KEY `dni` (`dni`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
 ADD PRIMARY KEY (`dni`), ADD UNIQUE KEY `dni` (`dni`);

--
-- Indices de la tabla `inmueble`
--
ALTER TABLE `inmueble`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`), ADD KEY `dniEmpleado` (`dniEmpleado`), ADD KEY `dniEmpleado_2` (`dniEmpleado`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `idInmueble_2` (`idInmueble`), ADD UNIQUE KEY `id` (`id`), ADD KEY `idInmueble` (`idInmueble`), ADD KEY `dniCliente` (`dniCliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alquiler`
--
ALTER TABLE `alquiler`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
