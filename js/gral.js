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
    $url = 'http://www.reiatsu.com.ar/phonegap/control/funciones.php';
  /*$url = 'funciones.php';*/
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

function limpiarInputs()
{
    $("input[type=text]").val("");
}
// funcions de carga 
function funcionesDeCarga()
{
    chequeaLogueo();
    // Comienza el formulario en vio de cargar gastos
    $("#enviarGasto").click(function(){
        var gasto = parseInt($("input[name=gasto]").val());
        var causa = $("input[name=causa]").val();
        var celular =  $("#guardaCelular").html();
            habilit = $(this).attr("id");

        desHabilitaId(habilit);

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
                        limpiarInputs();

                        habilitaId(habilit)
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
            habilit = $(this).attr("id");

        desHabilitaId(habilit);

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
                        limpiarInputs();
                        habilitaId(habilit);
                    }
            });
        }
        else
            alert("el cobro no fue cargado");
    });

    // Comienza el formulario en vio de cargar Cobro
    $("#resumen").click(function(){
        var celular =  $("#guardaCelular").html();
            habilit = $(this).attr("id");

        desHabilitaId(habilit);
        $.ajax({
                type:'POST',
                url:$url,
                data: 'h=resumen&celular='+celular,
                dataType:'json',
                success: function(v)
                {
                    $.mobile.changePage( "#etapa2" );
                    
                    $i=0;
                    $ht = '';
                    bandera1 = 0;
                    bandera2 = 0;
                    bandera3 = 0;
                    bandera4 = 0;
                    bandera5 = 0;
                    bandera6 = 0;
                    bandera7 = 0;
                    bandera8 = 0;
                    bandera9 = 0;
                    bandera10 = 0;
                    bandera11 = 0;
                    bandera12 = 0;

                    for($i=0; $i < v['vueltas']; $i++)
                    {
                        if(v[$i]['que'] == 'agregados')
                        {
                            style = 'colorAgregado';
                        }
                        else
                        {
                            style = 'colorGasto';
                        }

                            if(v[$i]['mes'] == 1 && bandera1 == 0)
                            {
                                        bandera1 =1;
                                        $ht += '<div class="floatLeft w100 titulito">ENERO</div>';
                            }
                            if(v[$i]['mes'] == 2 && bandera2 == 0)
                            {           
                                        bandera2 = 1;
                                        $ht += '<div class="floatLeft w100 titulito">FEBRERO</div>';
                            }
                            if(v[$i]['mes'] == 3 && bandera3 == 0)
                            {
                                        bandera3 = 1
                                        $ht += '<div class="floatLeft w100 titulito">MARZO</div>';
                            }
                            if(v[$i]['mes'] == 4 && bandera4 == 0)
                            {
                                        bandera4 =1
                                        $ht += '<div class="floatLeft w100 titulito">ABRIL</div>';
                            }
                            if(v[$i]['mes'] == 5 && bandera5 == 0)
                            {
                                        bandera5 = 1
                                        $ht += '<div class="floatLeft w100 titulito">MAYO</div>';
                            }
                            if(v[$i]['mes'] == 6  && bandera6 == 0)
                            {
                                        bandera3 = 6
                                        $ht += '<div class="floatLeft w100 titulito">JUNIO</div>';
                            }
                            if(v[$i]['mes'] == 7 && bandera7 == 0)
                            {
                                        bandera7 = 7
                                        $ht += '<div class="floatLeft w100 titulito">JULIO</div>';
                            }
                            if(v[$i]['mes'] == 8  && bandera8 == 0)
                            {
                                        bandera8 = 1
                                        $ht += '<div class="floatLeft w100 titulito">AGOSTO</div>';
                            }
                            if(v[$i]['mes'] == 9 && bandera9 == 0)
                            {
                                        bandera9 = 1
                                        $ht += '<div class="floatLeft w100 titulito">SEPTIEMBRE</div>';
                            }
                            if(v[$i]['mes'] == 10  && bandera10 == 0)
                           {
                                        bandera10 = 1
                                        $ht += '<div class="floatLeft w100 titulito">OCTUBRE</div>';
                           }
                            if(v[$i]['mes'] == 11 && bandera11 == 0)
                           {
                                        bandera11 == 1
                                        $ht += '<div class="floatLeft w100 titulito">NOVIEMBRE</div>';
                           }
                            if(v[$i]['mes'] == 12 && bandera12 == 0)
                           {
                                        bandera12 = 1
                                        $ht += '<div class="floatLeft w100 titulito">DICIEMBRE</div>';
                           }

                            $ht += '<div class="floatLeft w100 cuerpito '+style+'">\
                                    <div class="floatLeft w70">'+v[$i]['de']+'</div>\
                                    <div class="floatLeft w30">'+v[$i]['monto']+'</div>\
                                    </div>';
                    }
                    
                    $("#muestraResumen").html($ht);

                    limpiarInputs();
                    habilitaId(habilit);
                }
            });
    });
    
    // envia los datos a la base para saber quien hace las transferencias y donde 
    $("#validar").click(function(){
        var celular = parseInt($("input[name=numero]").val());
        var email   = $("input[name=email]").val();
            habilit = $(this).attr("id");

        desHabilitaId(habilit);

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

                        window.localStorage.setItem("celular", celular);
                        keyname = window.localStorage.key("celular");
                        // keyname is now equal to "key"
                        celular = window.localStorage.getItem(keyname);
                        
                        traeDatos(celular,habilit);
                    }
            });
        }
        else
            alert("el gasto no fue cargado");
    });
}
function traeDatos(celular,habilit)
{
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

                limpiarInputs();
                habilitaId(habilit);
            }
    });
}
function desHabilitaId(habilit)
{
    $("#"+habilit).attr("id",habilit+"X").addClass("cambiaColor");
}
function habilitaId(habilit)
{
    $("#"+habilit+'X').attr("id",habilit).removeClass("cambiaColor");
}
function chequeaLogueo()
{
    if( window.localStorage.getItem("celular") != null || window.localStorage.getItem("celular") != "NULL")
    {
        keyname = window.localStorage.key("celular");
        // keyname is now equal to "key"
        celular = window.localStorage.getItem(keyname);
        
        $("#guardaCelular").html(celular);
        traeDatos(celular);
        $.mobile.changePage( "#etapa0" );
    }
}