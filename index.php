<?php

require_once "controladores/plantilla.controlador.php";
require_once "controladores/usuarios.controlador.php";
require_once "controladores/categorias.controlador.php";
require_once "controladores/productos.controlador.php";
require_once "controladores/clientes.controlador.php";
require_once "controladores/transacciones.controlador.php";
require_once "controladores/compras.controlador.php";
require_once "controladores/proveedor.controlador.php";

require_once "modelos/usuarios.modelo.php";
require_once "modelos/categorias.modelo.php";
require_once "modelos/productos.modelo.php";
require_once "modelos/clientes.modelo.php";
require_once "modelos/transacciones.modelo.php";
require_once "modelos/compra.modelo.php";
require_once "modelos/proveedor.modelo.php";

$plantilla = new ControladorPlantilla();
$plantilla -> ctrPlantilla();