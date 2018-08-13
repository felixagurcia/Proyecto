<div class="content-wrapper">

  <section class="content-header">
    
    <h1>
      
      Administrar compras
    
    </h1>

    <ol class="breadcrumb">
      
      <li><a href="inicio"><i class="fa fa-dashboard"></i> Inicio</a></li>
      
      <li class="active">Administrar compras</li>
    
    </ol>

  </section>

  <section class="content">

    <div class="box">

      <div class="box-header with-border">
  
        <a href="crear-compra">

          <button class="btn btn-primary">
            
            Agregar compras

          </button>

        </a>

      </div>

      <div class="box-body">
        
       <table class="table table-bordered table-striped dt-responsive tablas">
         
        <thead>
         
         <tr>
           
           <th style="width:10px">#</th>
           <th>Código factura</th>
           <th>Proveedor</th>
           <th>Usuario</th>
           <th>Forma de pago</th>
           <th>Neto</th>
           <th>Total</th> 
           <th>Fecha</th>
           <th>Acciones</th>

         </tr> 

        </thead>

        <tbody>

        <?php

          $item = 'tipo_transaccion';
          $valor = 2;

          $respuesta = ControladorTransaccion::ctrMostrar($item, $valor);



          foreach ($respuesta as $key => $value) {


           echo '<tr>

                  <td>'.($key+1).'</td>

                  <td>'.$value["id"].'</td>';

                  $itemCliente = "id";
                  $valorCliente = $value["cod_persona"];

                  $respuestaCliente = ControladorClientes::ctrMostrarClientes($itemCliente, $valorCliente);

                  echo '<td>'.$value["nombre"].'</td>';

                  $itemUsuario = "id";
                  $valorUsuario = $value["id_usuario"];

                  $respuestaUsuario = ControladorUsuarios::ctrMostrarUsuarios($itemUsuario, $valorUsuario);

                  echo '<td>'.$respuestaUsuario["nombre"].'</td>

                  <td>'.$value["metodo_pago"].'</td>

                  <td>$ '.number_format($value["neto"],2).'</td>

                  <td>$ '.number_format($value["total"],2).'</td>

                  <td>'.$value["fecha"].'</td>

                  <td>

                    <div class="btn-group">
                        
                      <button class="btn btn-info"><i class="fa fa-print"></i></button>

                      <button class="btn  btn-warning btnEditarCompra" idCompra="'.$value["id"].'"><i class="fa fa-pencil"></i></button>

                      <button class="btn btn-danger btnEliminarCompra" idCompra="'.$value["id"].'"><i class="fa fa-times"></i></button>

                    </div>  

                  </td>

                </tr>';
            }

        ?>
               
        </tbody>

       </table>

       <?php

      $eliminarVenta = new ControladorTransaccion();
      $eliminarVenta -> ctrEliminarTransaccion();

      ?>
       

      </div>

    </div>

  </section>

</div>




