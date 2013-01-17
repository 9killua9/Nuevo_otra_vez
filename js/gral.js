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
        var causa = parseInt($("input[name=causa]").val());

        if(gasto != "")
        {
            $.ajax({
                    type:'POST',
                    url:'https://reiatsu.com.ar/phonegap/control/funciones.php',
                    data: 'h=cargaGasto&gasto='+gasto+'&causa='+causa,
                    dataType:'json',
                    success: function(v){
                        alert(v['aviso']);
                        $("#total").html(v['total']);
                    }
            });
        }
        else
            alert("el gasto no fue cargado");
    });
    // envia los datos a la base para saber quien hace las transferencias y donde 
    $("#validar").click(function(){

        var celular = parseInt($("input[name=numero]").val());
        var email   = $("input[name=email]").val();

        if(celular != "" && email != "")
        {
            $.ajax({
                    type:'POST',
                    url:'https://reiatsu.com.ar/phonegap/control/funciones.php',
                    data: 'h=valida&email='+email+'&celular='+celular,
                    dataType:'json',
                    success: function(v){
                        alert(v['aviso']);
                    }
            });
        }
        else
            alert("el gasto no fue cargado");
    });
}