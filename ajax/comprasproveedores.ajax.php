<?php
require_once "../controladores/productos.controlador.php";
require_once "../modelos/productos.modelo.php";

class TablaProductos
{
    public function mostrarTablaProveedores($id)
    {
        $item = null;
        $valor = null;

        $productos = ControladorProductos::ctrMostrarProductosProveedor($item, $valor, $id);

        echo '{
			"data": [';

        for ($i = 0; $i < count($productos) - 1; $i++) {

            echo '[
			      "' . ($i + 1) . '",
			      "' . $productos[$i]["imagen"] . '",
			      "' . $productos[$i]["codigo"] . '",
			      "' . $productos[$i]["descripcion"] . '",
			      "' . $productos[$i]["stock"] . '",
			      "' . $productos[$i]["id"] . '"
			    ],';

        }

        echo '[
			      "' . count($productos) . '",
			      "' . $productos[count($productos) - 1]["imagen"] . '",
			      "' . $productos[count($productos) - 1]["codigo"] . '",
			      "' . $productos[count($productos) - 1]["descripcion"] . '",
			      "' . $productos[count($productos) - 1]["stock"] . '",
			      "' . $productos[count($productos) - 1]["id"] . '"
			    ]
			]
		}';

    }

    public function mostrarTabla($id)
    {

        $item = null;
        $valor = null;

        $productos = ControladorProductos::ctrMostrarProductos($item, $valor, $id);


        echo '{
			"data": [';

        for ($i = 0; $i < count($productos) - 1; $i++) {

            echo '[
			      "' . ($i + 1) . '",
			      "' . $productos[$i]["imagen"] . '",
			      "' . $productos[$i]["codigo"] . '",
			      "' . $productos[$i]["descripcion"] . '",
			      "' . $productos[$i]["stock"] . '",
			      "' . $productos[$i]["id"] . '"
			    ],';

        }

        echo '[
			      "' . count($productos) . '",
			      "' . $productos[count($productos) - 1]["imagen"] . '",
			      "' . $productos[count($productos) - 1]["codigo"] . '",
			      "' . $productos[count($productos) - 1]["descripcion"] . '",
			      "' . $productos[count($productos) - 1]["stock"] . '",
			      "' . $productos[count($productos) - 1]["id"] . '"
			    ]
			]
		}';

    }

}

/*=============================================
ACTIVAR TABLA DE PRODUCTOS
=============================================*/

$activar = new TablaProductos();
if (isset($_POST["seleccionarCliente"])) {
    echo "hola";
    $activar->mostrarTablaProveedores($_POST["seleccionarCliente"]);
} else {
    $activar->mostrarTabla($_POST["seleccionarCliente"]);
}

