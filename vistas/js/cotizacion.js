/*=============================================
CARGAR LA TABLA DINÁMICA
=============================================*/




var table2 = $('.tablaCotizacion').DataTable({

	"ajax":"ajax/datatable-cotizacion.ajax.php",
	"columnDefs": [

		{
			"targets": -5,
			 "data": null,
			 "defaultContent": '<img class="img-thumbnail imgTablaVenta" width="40px">'

		},

		{
			"targets": -2,
			 "data": null,
			 "defaultContent": '<div class="btn-group"><button class="btn btn-success limiteStock" ></button></div>'

		},

		{
			"targets": -1,
			 "data": null,
			 "defaultContent": '<div class="btn-group"><button class="btn btn-primary agregarProducto recuperarBoton" idProducto >Agregar</button></div>'

		}

	],

	"language": {

		"sProcessing":     "Procesando...",
		"sLengthMenu":     "Mostrar _MENU_ registros",
		"sZeroRecords":    "No se encontraron resultados",
		"sEmptyTable":     "Ningún dato disponible en esta tabla",
		"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
		"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
		"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
		"sInfoPostFix":    "",
		"sSearch":         "Buscar:",
		"sUrl":            "",
		"sInfoThousands":  ",",
		"sLoadingRecords": "Cargando...",
		"oPaginate": {
		"sFirst":    "Primero",
		"sLast":     "Último",
		"sNext":     "Siguiente",
		"sPrevious": "Anterior"
		},
		"oAria": {
			"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			"sSortDescending": ": Activar para ordenar la columna de manera descendente"
		}

	}

})

/*=============================================
ACTIVAR LOS BOTONES CON LOS ID CORRESPONDIENTES
=============================================*/

$( document ).ready(function() {

});

$(".tablaVentas tbody").on( 'click', 'button.agregarProducto', function () {

	var data = table2.row( $(this).parents('tr') ).data();


	$(this).attr("idProducto",data[5]);



})

/*=============================================
FUNCIÓN PARA CARGAR LAS IMÁGENES CON EL PAGINADOR Y EL FILTRO
=============================================*/

function cargarImagenesProductos(){

	 var imgTabla = $(".imgTablaVenta");

	 var limiteStock = $(".limiteStock");

      var boton =$(".idProducto");

	 for(var i = 0; i < imgTabla.length; i ++){

	    var data = table2.row( $(imgTabla[i]).parents('tr') ).data();

	    $(imgTabla[i]).attr("src",data[1]);

	    if(data[4] <= 10){

	    	$(limiteStock[i]).addClass("btn-danger");
	    	$(limiteStock[i]).html(data[4]);

	    }else if(data[4] > 11 && data[4] <= 15){

	    	$(limiteStock[i]).addClass("btn-warning");
	    	$(limiteStock[i]).html(data[4]);

	    }else{

	    	$(limiteStock[i]).addClass("btn-success");
	    	$(limiteStock[i]).html(data[4]);
	    }

  	}


}

setTimeout(function(){

  cargarImagenesProductos()

},300);

/*=============================================
CARGAMOS LAS IMÁGENES CUANDO INTERACTUAMOS CON EL PAGINADOR
=============================================*/

$(".dataTables_paginate").click(function(){

	cargarImagenesProductos()
})

/*=============================================
CARGAMOS LAS IMÁGENES CUANDO INTERACTUAMOS CON EL BUSCADOR
=============================================*/
$("input[aria-controls='DataTables_Table_0']").focus(function(){

	$(document).keyup(function(event){

		event.preventDefault();

		cargarImagenesProductos()

	})


})

/*=============================================
CARGAMOS LAS IMÁGENES CUANDO INTERACTUAMOS CON EL FILTRO DE CANTIDAD
=============================================*/

$("select[name='DataTables_Table_0_length']").change(function(){

	cargarImagenesProductos()

})

/*=============================================
CARGAMOS LAS IMÁGENES CUANDO INTERACTUAMOS CON EL FILTRO DE ORDENAR
=============================================*/

$(".sorting").click(function(){

	cargarImagenesProductos()

})

/*=============================================
AGREGANDO PRODUCTOS A LA VENTA DESDE LA TABLA
=============================================*/

$(".tablaVentas tbody").on("click", "button.agregarProducto", function(){

	var idProducto = $(this).attr("idProducto");



	var datos = new FormData();
    datos.append("idProducto", idProducto);
  //  $(this).removeClass("btn-primary agregarProducto");
     $.ajax({

     	url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      	    var descripcion = respuesta["descripcion"];
          	var stock = respuesta["stock"];
          	var precio = respuesta["precio_venta"];
            if(stock>0) {
              //  $(this).removeClass("btn-primary agregarProducto");

                $(this).removeClass("btn-primary agregarProducto");
                $(this).addClass("btn-default");

                $(".nuevoProducto").append(
                    '<div class="row" style="padding:5px 15px">' +

                    '<!-- Descripción del producto -->' +

                    '<div class="col-xs-6" style="padding-right:0px">' +

                    '<div class="input-group">' +

                    '<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProducto" idProducto="' + idProducto + '"><i class="fa fa-times"></i></button></span>' +

                    '<input type="text" class="form-control nuevaDescripcionProducto" idProducto="' + idProducto + '" name="agregarProducto" value="' + descripcion + '" readonly required>' +

                    '</div>' +

                    '</div>' +

                    '<!-- Cantidad del producto -->' +

                    '<div class="col-xs-3">' +

                    '<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" min="1" value="1" stock="' + stock + '" nuevoStock="' + Number(stock - 1) + '" required>' +

                    '</div>' +

                    '<!-- Precio del producto -->' +

                    '<div class="col-xs-3 ingresoPrecio" style="padding-left:0px">' +

                    '<div class="input-group">' +

                    '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>' +

                    '<input type="text" class="form-control nuevoPrecioProducto" precioReal="' + precio + '" name="nuevoPrecioProducto" value="' + precio + '" readonly required>' +

                    '</div>' +

                    '</div>' +

                    '</div>')
            }else{
                $(this).removeClass("btn-primary agregarProducto");
                $(this).addClass("btn-default");

                swal({
                    title: "Este Producto se ha agotado",
                    text: "",
                    type: "warning",
                    confirmButtonText: "¡Cerrar!"
                });
			}

	        // SUMAR TOTAL DE PRECIOS

	        sumarTotalPrecios()

	        // AGREGAR IMPUESTO

	        agregarImpuesto()

	        // AGRUPAR PRODUCTOS EN FORMATO JSON

	        listarProductos()

	        // PONER FORMATO AL PRECIO DE LOS PRODUCTOS

	        $(".nuevoPrecioProducto").number(true, 2);

      	}

     })

});

/*=============================================
QUITAR PRODUCTOS DE LA VENTA Y RECUPERAR BOTÓN
=============================================*/

$(".formularioVenta").on("click", "button.quitarProducto", function(){

	$(this).parent().parent().parent().parent().remove();

	var idProducto = $(this).attr("idProducto");

	$("button.recuperarBoton[idProducto='"+idProducto+"']").removeClass('btn-default');

	$("button.recuperarBoton[idProducto='"+idProducto+"']").addClass('btn-primary agregarProducto');

	if($(".nuevoProducto").children().length == 0){

		$("#nuevoImpuestoTransaccion").val(0);
		$("#nuevoTotalVenta").val(0);
		$("#totalTransaccion").val(0);
		$("#nuevoCambioEfectivo").val(0);
		$("#nuevoValorEfectivo").val(0);
		$("#nuevoTotalVenta").attr("total",0);

	}else{

		// SUMAR TOTAL DE PRECIOS

    	sumarTotalPrecios()

    	// AGREGAR IMPUESTO

        agregarImpuesto()

        // AGRUPAR PRODUCTOS EN FORMATO JSON

        listarProductos()

	}

})

/*=============================================
AGREGANDO PRODUCTOS DESDE EL BOTÓN PARA DISPOSITIVOS
=============================================*/

$(".btnAgregarProducto").click(function(){

	if($('#nuevoCambioEfectivo').val()>0) {
        var datos = new FormData();
        datos.append("traerProductos", "ok");

        $.ajax({

            url: "ajax/productos.ajax.php",
            method: "POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (respuesta) {

                $(".nuevoProducto").append(
                    '<div class="row" style="padding:5px 15px">' +

                    '<!-- Descripción del producto -->' +

                    '<div class="col-xs-6" style="padding-right:0px">' +

                    '<div class="input-group">' +

                    '<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProducto" idProducto><i class="fa fa-times"></i></button></span>' +

                    '<select class="form-control nuevaDescripcionProducto" idProducto name="nuevaDescripcionProducto" required>' +

                    '<option>Seleccione el producto</option>' +

                    '</select>' +

                    '</div>' +

                    '</div>' +

                    '<!-- Cantidad del producto -->' +

                    '<div class="col-xs-3 ingresoCantidad">' +

                    '<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" min="1" value="1" stock nuevoStock required>' +

                    '</div>' +

                    '<!-- Precio del producto -->' +

                    '<div class="col-xs-3 ingresoPrecio" style="padding-left:0px">' +

                    '<div class="input-group">' +

                    '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>' +

                    '<input type="text" class="form-control nuevoPrecioProducto" precioReal="" name="nuevoPrecioProducto" value="' + precio + '" readonly required>' +

                    '</div>' +

                    '</div>' +

                    '</div>');


                // AGREGAR LOS PRODUCTOS AL SELECT

                respuesta.forEach(funcionForEach);

                function funcionForEach(item, index) {

                    $(".nuevaDescripcionProducto").append(
                        '<option idProducto="' + item.id + '" value="' + item.descripcion + '">' + item.descripcion + '</option>'
                    )

                }

                // SUMAR TOTAL DE PRECIOS

                sumarTotalPrecios()

                // AGREGAR IMPUESTO

                agregarImpuesto()

                // PONER FORMATO AL PRECIO DE LOS PRODUCTOS

                $(".nuevoPrecioProducto").number(true, 2);

            }


        })
    }

})

/*=============================================
SELECCIONAR PRODUCTO
=============================================*/

$(".formularioVenta").on("change", "select.nuevaDescripcionProducto", function(){

	var nombreProducto = $(this).val();

	var nuevoPrecioProducto = $(this).parent().parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioProducto");

	var nuevaCantidadProducto = $(this).parent().parent().parent().children(".ingresoCantidad").children(".nuevaCantidadProducto");

	var datos = new FormData();
    datos.append("nombreProducto", nombreProducto);


	  $.ajax({

     	url:"ajax/productos.ajax.php",
      	method: "POST",
      	data: datos,
      	cache: false,
      	contentType: false,
      	processData: false,
      	dataType:"json",
      	success:function(respuesta){

      	    $(nuevaCantidadProducto).attr("stock", respuesta["stock"]);
      	    $(nuevaCantidadProducto).attr("nuevoStock", Number(respuesta["stock"])-1);
      	    $(nuevoPrecioProducto).val(respuesta["precio_venta"]);
      	    $(nuevoPrecioProducto).attr("precioReal", respuesta["precio_venta"]);

  	      // AGRUPAR PRODUCTOS EN FORMATO JSON

	        listarProductos()

      	}

      })
})

/*=============================================
MODIFICAR LA CANTIDAD
=============================================*/

$(".formularioVenta").on("change", "input.nuevaCantidadProducto", function(){

	var precio = $(this).parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioProducto");

	var precioFinal = $(this).val() * precio.attr("precioReal");

	precio.val(precioFinal);

	var nuevoStock = Number($(this).attr("stock")) - $(this).val();

	$(this).attr("nuevoStock", nuevoStock);

	if(Number($(this).val()) > Number($(this).attr("stock"))){

		$(this).val(1);
        precioFinal = $(this).val() * precio.attr("precioReal");
        precio.val(precioFinal);
		swal({
	      title: "La cantidad supera el Stock",
	      text: "¡Sólo hay "+$(this).attr("stock")+" unidades!",
	      type: "error",
	      confirmButtonText: "¡Cerrar!"
	    });


	}

	// SUMAR TOTAL DE PRECIOS

	sumarTotalPrecios()

	// AGREGAR IMPUESTO

    agregarImpuesto()

    // AGRUPAR PRODUCTOS EN FORMATO JSON

    listarProductos()

})

/*=============================================
SUMAR TODOS LOS PRECIOS
=============================================*/

function sumarTotalPrecios(){

	var precioItem = $(".nuevoPrecioProducto");
	var arraySumaPrecio = [];

	for(var i = 0; i < precioItem.length; i++){

		 arraySumaPrecio.push(Number($(precioItem[i]).val()));

	}

	function sumaArrayPrecios(total, numero){

		return total + numero;

	}

	var sumaTotalPrecio = arraySumaPrecio.reduce(sumaArrayPrecios);

	$("#nuevoTotalTransaccion").val(sumaTotalPrecio);
	$("#totalTransaccion").val(sumaTotalPrecio);
	$("#nuevoTotalTransaccion").attr("total",sumaTotalPrecio);


}

/*=============================================
FUNCIÓN AGREGAR IMPUESTO
=============================================*/

function agregarImpuesto(){

	var impuesto = $("#nuevoImpuestoTransaccion").val();
	var precioTotal = $("#nuevoTotalTransaccion").attr("total");

	var precioImpuesto = Number(precioTotal * impuesto/100);

	var totalConImpuesto = Number(precioImpuesto) + Number(precioTotal);

	$("#nuevoTotalTransaccion").val(totalConImpuesto);

	$("#totalTransaccion").val(totalConImpuesto);

	$("#nuevoPrecioImpuesto").val(precioImpuesto);

	$("#nuevoPrecioNeto").val(precioTotal);

}

/*=============================================
CUANDO CAMBIA EL IMPUESTO
=============================================*/

$("#nuevoImpuestoTransaccion").change(function(){

	agregarImpuesto();

});

/*=============================================
FORMATO AL PRECIO FINAL
=============================================*/

$("#nuevoTotalTransaccion").number(true, 2);

/*=============================================
SELECCIONAR MÉTODO DE PAGO
=============================================*/

$("#nuevoMetodoPago").change(function(){

	var metodo = $(this).val();

	if(metodo == "1"){

		$(this).parent().parent().removeClass("col-xs-6");

		$(this).parent().parent().addClass("col-xs-4");

		$(this).parent().parent().parent().children(".cajasMetodoPago").html(

			 '<div class="col-xs-4">'+

			 	'<div class="input-group">'+

			 		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+

			 		'<input type="text" class="form-control" id="nuevoValorEfectivo" name="nuevoValorEfectivo" placeholder="000000" required>'+

			 	'</div>'+

			 '</div>'+

			 '<div class="col-xs-4" id="capturarCambioEfectivo" style="padding-left:0px">'+

			 	'<div class="input-group">'+

			 		'<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+

			 		'<input type="text" class="form-control" id="nuevoCambioEfectivo" placeholder="000000" readonly required>'+

			 	'</div>'+

			 '</div>'

		 )

		// Agregar formato al precio

		$('#nuevoValorEfectivo').number( true, 2);
      	$('#nuevoCambioEfectivo').number( true, 2);


      	// Listar método en la entrada
      	listarMetodos()

	}else{

		$(this).parent().parent().removeClass('col-xs-4');

		$(this).parent().parent().addClass('col-xs-6');

		 $(this).parent().parent().parent().children('.cajasMetodoPago').html(

		 	'<div class="col-xs-6" style="padding-left:0px">'+

                '<div class="input-group">'+

                  '<input type="number" min="0" class="form-control" id="nuevoCodigoTransaccion" placeholder="Código transacción"  required>'+

                  '<span class="input-group-addon"><i class="fa fa-lock"></i></span>'+

                '</div>'+

              '</div>')

	}



})

/*=============================================
CAMBIO EN EFECTIVO
=============================================*/
$(".formularioVenta").on("keyup", "input#nuevoValorEfectivo", function(){

	var efectivo = $(this).val();

	var cambio =  Number(efectivo) - Number($('#nuevoTotalTransaccion').val());


	var nuevoCambioEfectivo = $(this).parent().parent().parent().children('#capturarCambioEfectivo').children().children('#nuevoCambioEfectivo');

	nuevoCambioEfectivo.val(cambio);
    if(cambio<0){
        $('#boton').attr("disabled", true);

    }else {
        $('#boton').attr("disabled", false);
	}

})

/*=============================================
CAMBIO TRANSACCIÓN
=============================================*/
$(".formularioVenta").on("change", "input#nuevoCodigoTransaccion", function(){

	// Listar método en la entrada
     listarMetodos()


})


/*=============================================
LISTAR TODOS LOS PRODUCTOS
=============================================*/

function listarProductos(){

	var listaProductos = [];

	var descripcion = $(".nuevaDescripcionProducto");

	var cantidad = $(".nuevaCantidadProducto");

	var precio = $(".nuevoPrecioProducto");

	for(var i = 0; i < descripcion.length; i++){

		listaProductos.push({ "id" : $(descripcion[i]).attr("idProducto"),
							  "descripcion" : $(descripcion[i]).val(),
							  "cantidad" : $(cantidad[i]).val(),
							  "stock" : $(cantidad[i]).attr("nuevoStock"),
							  "precio" : $(precio[i]).attr("precioReal"),
							  "total" : $(precio[i]).val()})

	}

	$("#listaProductos").val(JSON.stringify(listaProductos));

}

/*=============================================
LISTAR MÉTODO DE PAGO
=============================================*/

function listarMetodos(){

	var listaMetodos = "";

	if($("#nuevoMetodoPago").val() == "1"){

		$("#listaMetodoPago").val("1");

	}else{

		$("#listaMetodoPago").val($("#nuevoMetodoPago").val()+"-"+$("#nuevoCodigoTransaccion").val());

	}

}

/*=============================================
BOTON EDITAR VENTA
=============================================*/

$(".btnEditarVenta").click(function(){

	var idVenta = $(this).attr("idVenta");

	window.location = "index.php?ruta=editar-venta&idVenta="+idVenta;


})


/*=============================================
BORRAR VENTA
=============================================*/

$(".btnEliminarVenta").click(function(){

  var idVenta = $(this).attr("idVenta");

  swal({
        title: '¿Está seguro de borrar la venta?',
        text: "¡Si no lo está puede cancelar la accíón!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrar venta!'
      }).then((result) => {
        if (result.value) {

            window.location = "index.php?ruta=ventas&idVenta="+idVenta;
        }

  })

})


