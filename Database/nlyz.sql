-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-06-2024 a las 06:22:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nlyz`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `Id_compra` int(11) NOT NULL,
  `Id_producto` int(11) NOT NULL,
  `Correo` varchar(60) NOT NULL,
  `Nombre` varchar(60) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `Nombre` varchar(60) NOT NULL,
  `Correo` varchar(60) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`Nombre`, `Correo`, `Contrasena`, `Rol`) VALUES
('Eduardo', 'eduardomejia1432@gmail.com', '$2a$08$g9CXHKnmdXOWWlomhbXBVOdW1ypwxD/Ad7.A6xoKBpPtptboy2xGa', 'admin'),
('administrador', 'gaelsalmen@gmail.com', '$2a$08$H9JHxgdc2yQSU2/Dctufq.Dlg3gfNMEUsCaROs7DG4nOLMpbXlmiW', 'admin'),
('Prueba', 'prueba@gmail.com', '$2a$08$I.VRGmf.sfVgv3hYq.SrcOWJB6O9nWqT2XoQdppprVV.4zfJpEtKi', 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `Id_producto` int(11) NOT NULL,
  `Nombre` varchar(60) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `tipo` varchar(80) NOT NULL,
  `Marca` varchar(30) NOT NULL,
  `Color` varchar(30) NOT NULL,
  `Talla` varchar(30) NOT NULL,
  `Precio` double NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`Id_producto`, `Nombre`, `imagen`, `tipo`, `Marca`, `Color`, `Talla`, `Precio`, `descripcion`, `cantidad`) VALUES
(5, 'Zapato Blackmont ', 'source/c2.webp', 'shoes', 'BlackMont', 'Negro', '22-27', 330, 'Zapato de meter de material sintetico', 10),
(6, 'Tenis Rebook', 'source/c3.webp', 'shoes', 'Reebok', 'Negro', '22-26', 330, 'Teni de piso, comodo y reforzado', 4),
(7, 'Tenis Adidas ', 'source/c4.webp', 'shoes', 'Adidas', 'Negro', '22-27', 320, 'Teni de deporte, comodiadd a cada paso', 6),
(8, 'Tenis Sport', 'source/c5.webp', 'shoes', 'Sport', 'Rojo-Negro', '22-28', 310, 'Teni de suela comoda', 12),
(9, 'Tenis Adidas ', 'source/c6.webp', 'shoes', 'Adidas', 'Negro', '22-26', 320, 'Tenis de ejercicio y deporte, con suela reforzada', 6),
(10, 'Zapato Kitzia Renata', 'source/c7.webp', 'shoes', 'Kitzia Renata', 'Negro', '18-24', 290, 'Zapato femenino escolar de correa', 22),
(11, 'Zapato Blackmont ', 'source/c8.webp', 'shoes', 'BlackMont', 'Negro', '22-26', 310, 'Zapato escolar de piso, suela reforzada', 14),
(12, 'Zapato Kitzia Renata', 'source/c9.webp', 'shoes', 'Kitzia Renata', 'Negro', '23-24', 290, 'Zapato femenino escolar de correa', 4),
(13, 'Shot Salpich', 'source/p1.webp', 'jeans', 'Salpich', 'Azul Marino', 'T9-13', 280, 'Short de mezclilla para mujer', 6),
(14, 'Pantalon ABRSDM', 'source/p2.webp', 'jeans', 'ABTSDM', 'Azul Marino', '28-38', 330, 'Pantalon entubado para hombre', 12),
(15, 'Shot Salpich', 'source/p3.webp', 'jeans', 'Salpich', 'Azul cielo', 'T3-9', 280, 'Short de mezclilla para mujer', 7),
(16, 'Pantalon para niño Bochoto\'s', 'source/p4.webp', 'jeans', 'Bochitos´s', 'Petroleo', '10', 250, 'Pantalon de mezclilla para niño', 2),
(17, 'Pantalon MEN ABTS', 'source/p5.webp', 'jeans', 'MEN ABTS', 'Petroleo', '28-38', 330, 'Pantalon vaquero de mezclilla para caballero', 8),
(18, 'Pantalon Entubado ABTSDM', 'source/p6.webp', 'jeans', 'ABTSDM', 'Azul cielo', '28-28', 330, 'Pantalon entubado de mezclilla para hombre', 12),
(19, 'Pantalon Entubado ABTSDM', 'source/p7.webp', 'jeans', 'ABTSDM', 'Petroleo', '28-38', 330, 'Pantalon entubado de mezclilla para hombre', 6),
(20, 'Pantalon Entubado ABTSDM', 'source/p8.webp', 'jeans', 'ABTSDM', 'Negro', '28', 300, 'Pantalon entubado de mezclilla para hombre', 1),
(21, 'Pantalon Salpich', 'source/p9.webp', 'jeans', 'Salpich', 'azul marino', '9', 280, 'Pantalon holgado de mezclilla para dama', 2),
(22, 'Playera Adidas ', 'source/t1.webp', 't_shirts', 'Adidas', 'Verde pantano', 'EG', 100, 'Playera deportiva de licra para caballero', 3),
(23, 'Playera PREZZAGIO', 'source/t2.webp', 't_shirts', 'PREZZAGIO', 'Negra', 'G', 190, 'Playera de caballero con diseño de palmera', 2),
(24, 'Playera POLO', 'source/t3.webp', 't_shirts', 'POLO', 'Rosa', 'G-EG', 220, 'Playera polo de caballero color rosa', 3),
(25, 'Playera POLO', 'source/t4.webp', 't_shirts', 'POLO', 'Azul marino', 'G-EG', 220, 'Playera polo de caballero coolor azul marino', 3),
(26, 'Playera STAR 57', 'source/t5.webp', 't_shirts', 'STAR 57', 'Café', 'EG', 120, 'Playera de algodón para caballero', 2),
(27, 'Playera POLO', 'source/t6.webp', 't_shirts', 'POLO', 'Blanco', 'M-G-EG', 220, 'Playera polo de caballero color blanco', 4),
(28, 'Playera Adidas ', 'source/t7.webp', 't_shirts', 'Adidas', 'Blanco', 'G', 120, 'Playera deportiva de licra para caballero', 3),
(29, 'Playera PREZZAGIO', 'source/t8.webp', 't_shirts', 'PREZZAGIO', 'Gris', 'G', 190, 'Playera de caballero con diseño de palmera', 3),
(30, 'Playera POLO', 'source/t9.webp', 't_shirts', 'POLO', 'Blanco', 'G', 220, 'Playera polo de caballero de tommy', 3),
(31, 'Boxer de caballero', 'source/s1.webp', 'underwear', 'GALA', 'Gris Oscuro', 'G', 30, 'Boxer de caballero', 4),
(32, 'Boxer de caballero', 'source/s2.webp', 'underwear', 'GALA', 'Gris', 'G', 30, 'Boxer de caballero', 6),
(33, 'Boxer de caballero', 'source/s3.webp', 'underwear', 'GALA', 'Rojo', 'G', 30, 'Boxer de caballero', 4),
(34, 'Bikini de dama', 'source/s4.webp', 'underwear', 'ROSA', 'Melon', 'Unitalla', 25, 'Bikin de mujer', 3),
(35, 'Bikini de dama', 'source/s5.webp', 'underwear', 'ROSA', 'Menta', 'Unitalla', 25, 'Bikin de mujer', 3),
(36, 'Bikini de dama', 'source/s6.webp', 'underwear', 'ROSA', 'Amarillo', 'Unitalla', 25, 'Bikin de mujer', 4),
(37, 'Truza de niño', 'source/s7.webp', 'underwear', 'Chapas', 'Rojo', 'Ch', 30, 'Truza de niño', 2),
(38, 'Truza de niño', 'source/s8.webp', 'underwear', 'Chapas', 'Verde pantano', 'Ch', 30, 'Truza de niño', 2),
(39, 'Truza de niño', 'source/s9.webp', 'underwear', 'Chapas', 'Azul', 'Ch', 30, 'Truza de niño', 4),
(42, 'Tenis Rapid', 'source/c1.webp', 'shoes', 'Rapid', 'Negro-verde Neon', '22-26', 320, 'Calzado deportivo como para caminatas y ejercicio', 8);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`Id_compra`),
  ADD KEY `Id_producto` (`Id_producto`),
  ADD KEY `Correo` (`Correo`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`Correo`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`Id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `Id_compra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `Id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`Id_producto`) REFERENCES `productos` (`Id_producto`),
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`Correo`) REFERENCES `login` (`Correo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
