/**
 *
 *@author: Leandro Salar, Marcelo Salar.
 *@version: 0.1;
 **/
/* ---------------------------------------------
------ Solucion para simplificar Ajax ----------
------------------------------------------------ */
/**
$('#trip input#leavedate, #trip input#returndate').datepicker({ dateFormat: 'D, M d, yy', showOn: 'button', buttonImage: 'calendar.gif', buttonImageOnly: true }); // format: Thurs, Jan 31, 2008, only show when the user clicks the calendar
 **/

/* ---------------------------------------------
------ COMIENZO DEL CUERPO ---------------------
------------------------------------------------ */
//$url = 'https://reiatsu.com.ar/phonegap/control/funciones.php';
  $url = 'funciones.php';
// Documento de inicio.
$(document).bind("mobileinit",function(){
    $("img").attr("alt","cargando...");

    $w = parseInt($(window).width());
    $h = parseInt($(window).height());
    
    $(".nada").click(function(a){
    	a.preventDefault();
    }).submit(function(a){
    	a.preventDefault();
    });

});


// funcions de carga 
function funcionesDeCarga()
{
    // Comienza el formulario en vio de cargar gastos
    $("#enviarGasto").click(function(){
        var gasto = parseInt($("input[name=gasto]").val());
        var causa = $("input[name=causa]").val();
        var celular =  $("#guardaCelular").html();

        if(gasto != "")
        {
            $.ajax({
                    type:'POST',
                    url:$url,
                    data: 'h=cargaGasto&gasto='+gasto+'&causa='+causa+'&celular='+celular,
                    dataType:'json',
                    success: function(v){
                        alert(v['aviso']);
                        $.mobile.changePage( "#etapa0" );
                        $("#total").html(v['total']);
                    }
            });
        }
        else
            alert("el gasto no fue cargado");
    });

    // Comienza el formulario en vio de cargar Cobro
    $("#enviarCobro").click(function(){
        var cobro   = parseInt($("input[name=cobro]").val());
        var cliente = $("input[name=cliente]").val();
        var celular =  $("#guardaCelular").html();

        if(cobro != "")
        {
            $.ajax({
                    type:'POST',
                    url:$url,
                    data: 'h=cargaCobro&cobro='+cobro+'&cliente='+cliente+'&celular='+celular,
                    dataType:'json',
                    success: function(v){
                        alert(v['aviso']);
                        $.mobile.changePage( "#etapa0" );
                        $("#total").html(v['total']);
                    }
            });
        }
        else
            alert("el cobro no fue cargado");
    });

    // envia los datos a la base para saber quien hace las transferencias y donde 
    $("#validar").click(function(){

        var celular = parseInt($("input[name=numero]").val());
        var email   = $("input[name=email]").val();
        
        $("#guardaCelular").html(celular);

        if(celular != "" && email != "")
        {
            $.ajax({
                    type:'POST',
                    url:$url,
                    data: 'h=valida&email='+email+'&celular='+celular,
                    dataType:'json',
                    success: function(v){
                        $.mobile.changePage( "#etapa0" );

                        var celular =  $("#guardaCelular").html();
                        $.ajax({
                                type:'POST',
                                url:$url,
                                data: 'h=traeTotalAlMes&celular='+celular,
                                dataType:'json',
                                success: function(v){
                                    if( v['aviso'] == "si")
                                    {
                                        $("#total").html(v['total']);
                                    }
                                    else
                                    {
                                        $("#cargainicialmenucontenedor").show();
                                        $("#total").html(0);
                                    }

                                }
                        });
                    }
            });
        }
        else
            alert("el gasto no fue cargado");
    });
}