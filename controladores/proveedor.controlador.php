<?php

class ControladorProveedor{

    /*=============================================
    CREAR CLIENTES
    =============================================*/

    static public function ctrCrearProveedor(){

        if(isset($_POST["nuevoProveedor"])){

            if(preg_match('/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/', $_POST["nuevoCliente"]) &&
                preg_match('/^[0-9]+$/', $_POST["nuevoDocumentoId"]) &&
                preg_match('/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/', $_POST["nuevoEmail"]) &&
                preg_match('/^[()\-0-9 ]+$/', $_POST["nuevoTelefono"]) &&
                preg_match('/^[#\.\-a-zA-Z0-9 ]+$/', $_POST["nuevaDireccion"])){

                $tabla = "proveedor";

                $datos = array("nombre"=>$_POST["nuevoProveedor"],
                    "email"=>$_POST["nuevoEmail"],
                    "telefono"=>$_POST["nuevoTelefono"],
                    "direccion"=>$_POST["nuevaDireccion"]);

                $respuesta = ModeloProveedor::mdlIngresarProveedor($tabla, $datos);

                if($respuesta == "ok"){

                    echo'<script>

					swal({
						  type: "success",
						  title: "El proveedor ha sido guardado correctamente",
						  showConfirmButton: true,
						  confirmButtonText: "Cerrar",
						  closeOnConfirm: false
						  }).then((result) => {
									if (result.value) {

									window.location = "proveedor";

									}
								})

					</script>';

                }

            }else{

                echo'<script>

					swal({
						  type: "error",
						  title: "¡El proveedor no puede ir vacío o llevar caracteres especiales!",
						  showConfirmButton: true,
						  confirmButtonText: "Cerrar",
						  closeOnConfirm: false
						  }).then((result) => {
							if (result.value) {

							window.location = "proveedor";

							}
						})

			  	</script>';



            }

        }

    }

    /*=============================================
    MOSTRAR CLIENTES
    =============================================*/

    static public function ctrMostrarProveedor($item, $valor){

        $tabla = "proveedor";

        $respuesta = ModeloProveedor::mdlMostrarProveedor($tabla, $item, $valor);

        return $respuesta;

    }

    /*=============================================
    EDITAR CLIENTE
    =============================================*/

    static public function ctrEditarProveedor(){

        if(isset($_POST["editarCliente"])){

            if(preg_match('/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/', $_POST["editarCliente"]) &&
                preg_match('/^[0-9]+$/', $_POST["editarDocumentoId"]) &&
                preg_match('/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/', $_POST["editarEmail"]) &&
                preg_match('/^[()\-0-9 ]+$/', $_POST["editarTelefono"]) &&
                preg_match('/^[#\.\-a-zA-Z0-9 ]+$/', $_POST["editarDireccion"])){

                $tabla = "clientes";

                $datos = array("id"=>$_POST["idCliente"],
                    "nombre"=>$_POST["editarCliente"],
                    "documento"=>$_POST["editarDocumentoId"],
                    "email"=>$_POST["editarEmail"],
                    "telefono"=>$_POST["editarTelefono"],
                    "direccion"=>$_POST["editarDireccion"],
                    "fecha_nacimiento"=>$_POST["editarFechaNacimiento"]);

                $respuesta = ModeloClientes::mdlEditarCliente($tabla, $datos);

                if($respuesta == "ok"){

                    echo'<script>

					swal({
						  type: "success",
						  title: "El cliente ha sido cambiado correctamente",
						  showConfirmButton: true,
						  confirmButtonText: "Cerrar",
						  closeOnConfirm: false
						  }).then((result) => {
									if (result.value) {

									window.location = "clientes";

									}
								})

					</script>';

                }

            }else{

                echo'<script>

					swal({
						  type: "error",
						  title: "¡El cliente no puede ir vacío o llevar caracteres especiales!",
						  showConfirmButton: true,
						  confirmButtonText: "Cerrar",
						  closeOnConfirm: false
						  }).then((result) => {
							if (result.value) {

							window.location = "clientes";

							}
						})

			  	</script>';



            }

        }

    }

    /*=============================================
    ELIMINAR CLIENTE
    =============================================*/

    static public function ctrEliminarProveedor(){

        if(isset($_GET["idCliente"])){

            $tabla ="clientes";
            $datos = $_GET["idCliente"];

            $respuesta = ModeloClientes::mdlEliminarCliente($tabla, $datos);

            if($respuesta == "ok"){

                echo'<script>

				swal({
					  type: "success",
					  title: "El cliente ha sido borrado correctamente",
					  showConfirmButton: true,
					  confirmButtonText: "Cerrar",
					  closeOnConfirm: false
					  }).then((result) => {
								if (result.value) {

								window.location = "clientes";

								}
							})

				</script>';

            }

        }

    }

}