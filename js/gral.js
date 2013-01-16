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

// Declaracion de variables
$url     = 'php/funciones.php';
$urlFbk  = 'php/facebook/facebookphp.php';
$nImagen = 0;

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

function funcionesDeCarga()
{
	$(window).mousemove(function(a){
		tp = a.pageY;
		lt = a.pageX;
	}).resize(function(){
        // Volver a cargar los datos y sacar las medidas cuando se resizea la pantalla ^^ 
        $w = parseInt($(window).width());
        $h = parseInt($(window).height());
    });

    $("input[name=busqueda]").change(function(){
        if($(this).val() == "calle")
            $("input[name=nombre]").attr("placeholder","ej:Cabildo,Belgrano,Argentina");
        else
            $("input[name=nombre]").attr("placeholder","ej:Belgrano,Argentina");
    })
} // Termina funciones de carga