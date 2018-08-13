<?php

require_once "conexion.php";

class ModeloTransacciones{

	/*=============================================
	MOSTRAR Transaccion
	=============================================*/

	static public function mdlMostrarTransacciones($tabla, $item, $valor){

		if($item != null){

		    if($valor==1){
                $stmt = Conexion::conectar()->prepare("SELECT * FROM  $tabla  INNER JOIN clientes ON clientes.id=transaccion.cod_persona WHERE $item = :$item ");
                $stmt -> bindParam(":".$item, $valor, PDO::PARAM_STR);

                $stmt -> execute();

                return $stmt -> fetchAll();

            }elseif($valor==2){
                $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla INNER JOIN proveedores ON proveedores.id_proveedor=transaccion.cod_persona WHERE $item = :$item  ORDER BY id ASC ");
                $stmt -> bindParam(":".$item, $valor, PDO::PARAM_STR);

                $stmt -> execute();

                return $stmt -> fetchAll();
            }



		}else{
		    if($valor==1){
                $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla INNER  JOIN  clientes  ON clientes.id=transaccion.cod_persona ORDER BY id ASC");
                $stmt -> execute();

                return $stmt -> fetchAll();
            }else{
                $stmt = Conexion::conectar()->prepare("select * from transaccion INNER JOIN proveedores on transaccion.cod_persona=proveedores.id_proveedo");
                $stmt -> execute();

                return $stmt -> fetchAll();
            }




		}
		
		//$stmt -> close();

		$stmt = null;

	}
    static public function mdlMostrarTransaccion($tabla, $item, $valor,$idtrans){

        if($item != null){

            $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE $item = :$item AND id=:id ORDER BY id ASC ");

            $stmt -> bindParam(":".$item, $valor, PDO::PARAM_STR);
            $stmt -> bindParam(":id", $idtrans, PDO::PARAM_INT);

            $stmt -> execute();

            return $stmt -> fetch();

        }else{

            $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla  ORDER BY id ASC");

            $stmt -> execute();

            return $stmt -> fetchAll();

        }

        $stmt -> close();

        $stmt = null;

    }
	/*=============================================
	REGISTRO DE VENTA
	=============================================*/

	static public function mdlIngresarTransacciones($tabla, $datos){



		$stmt = Conexion::conectar()->prepare(" CALL ProcedimientoInsertar(".$datos["cod_persona"].", ".$datos["id_usuario"].", '".$datos["productos"]."', ".$datos["impuesto"].", ".$datos["neto"].",".$datos["total"].", ".$datos["metodo_pago"].",".$datos["tipo_transaccion"].",".$datos["abono"].",".$datos["exedente"].")");


//		$stmt->bindParam(":cod_persona", $datos["cod_persona"], PDO::PARAM_INT);
//		$stmt->bindParam(":id_usuario", $datos["id_usuario"], PDO::PARAM_INT);
//		$stmt->bindParam(":productos", $datos["productos"], PDO::PARAM_STR);
//		$stmt->bindParam(":impuesto", $datos["impuesto"], PDO::PARAM_STR);
//		$stmt->bindParam(":neto", $datos["neto"], PDO::PARAM_STR);
//		$stmt->bindParam(":total", $datos["total"], PDO::PARAM_STR);
//		$stmt->bindParam(":metodo_pago", $datos["metodo_pago"], PDO::PARAM_STR);
//		$stmt->bindParam(":tipo_transaccion", $datos["tipo_transaccion"], PDO::PARAM_STR);


		try{
            $stmt->execute();
            $stmt->closeCursor();
            return  print_r($datos);

        }catch (PDOException $e){
		    return $e->getMessage();
        }




		$stmt = null;

	}

	/*=============================================
	EDITAR VENTA
	=============================================*/

	static public function mdlEditarTransacciones($tabla, $datos){

		$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET  cod_persona = :cod_persona, id_vendedor = :id_vendedor, productos = :productos, impuesto = :impuesto, neto = :neto, total= :total, metodo_pago = :metodo_pago,tipo_transaccion=:tipo_transaccion abono=:abono,exdente=:exedente WHERE id = :id");

		$stmt->bindParam(":id", $datos["id"], PDO::PARAM_INT);
		$stmt->bindParam(":cod_persona", $datos["cod_persona"], PDO::PARAM_INT);
		$stmt->bindParam(":id_vendedor", $datos["idVendedor"], PDO::PARAM_INT);
		$stmt->bindParam(":productos", $datos["productos"], PDO::PARAM_STR);
		$stmt->bindParam(":impuesto", $datos["impuesto"], PDO::PARAM_STR);
		$stmt->bindParam(":neto", $datos["neto"], PDO::PARAM_STR);
		$stmt->bindParam(":total", $datos["total"], PDO::PARAM_STR);
		$stmt->bindParam(":metodo_pago", $datos["metodo_pago"], PDO::PARAM_STR);
		$stmt->bindParam(":tipo_transaccion", $datos["tipo_transaccion"], PDO::PARAM_STR);
		$stmt->bindParam(":abono", $datos["abono"], PDO::PARAM_STR);
		$stmt->bindParam(":exedente", $datos["exedente"], PDO::PARAM_STR);

		if($stmt->execute()){

			return "ok";

		}else{

			return "error";
		
		}

		$stmt->close();
		$stmt = null;

	}

	/*=============================================
	ELIMINAR VENTA
	=============================================*/

	static public function mdlEliminarTransacciones($tabla, $datos){

		$stmt = Conexion::conectar()->prepare("DELETE FROM $tabla WHERE id = :id");

		$stmt -> bindParam(":id", $datos, PDO::PARAM_INT);

		if($stmt -> execute()){

			return "ok";
		
		}else{

			return "error";	

		}

		$stmt -> close();

		$stmt = null;

	}

}