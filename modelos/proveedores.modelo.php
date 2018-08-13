<?php
require_once "conexion.php";

class Modeloproveedores{

    public static function mostrartProveedores(){
        $stmt = Conexion::conectar()->prepare("SELECT * FROM  proveedores ");
        $stmt -> execute();
        return $stmt -> fetchAll();
    }
    public static function mostrartProductoProveedores($id){
        $stmt = Conexion::conectar()->prepare("SELECT * FROM  productos where id_proveedor='".$id."'");
        $stmt -> execute();
        return $stmt -> fetchAll();
    }



}