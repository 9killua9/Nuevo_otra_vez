<?php

date_default_timezone_set('America/Argentina/Buenos_Aires');

function conectame()
{
    /*$host       = "190.228.29.195";
    $user       = "killua";
    $pass       = "alone999";
    $dataBase   = "reiatsu_chocopix";*/
    $host       = "localhost";
    $user       = "root";
    $pass       = "";
    $dataBase   = "acarreo";
    $r          = false;    
    
	if(@mysql_connect($host,$user,$pass))
		if(@mysql_select_db($dataBase))
			$r = true;

    return $r;
}


$h = $_POST['h'];


if(conectame())
{
	if( $h == "valida" )
	{
		$email 		= $_POST['email'];
		$celular 	= $_POST['celular'];
		$r['aviso'] = "hola";
		/*if( $celular != '1137762637')
		{*/
			$sql = 'select * from usuarios where celular ="'.$celular.'" AND email = "'.$email.'"';
			$res = @mysql_query($sql);
			while( $re = @mysql_fetch_array($res) )
			{
				$r['id'] 		= $re['id'];
				$r['email'] 	= $re['email'];
				$r['celular'] 	= $re['celular'];
				$r['nombre'] 	= $re['nombre'];
			}
		/*}*/

		echo json_encode($r);
	}
	elseif( $h == "cargaGasto" )
	{
		$gasto 		= $_POST['gasto'];
		$causa 		= $_POST['causa'];
		$celular 	= $_POST['celular'];
		if($causa == "")
			$causa = "-";

		$mes 	= date("n");
		$anio 	= date("Y");
		$fecha  = date("j/n/Y H:i:s");

		$sql = 'INSERT INTO `gastos`(`id`,`mes`,`anio`,`monto`,`fecha_hora_de_carga_de_dato`,`causa`,`celular`) VALUES ( NULL,'.$mes.','.$anio.','.$gasto.',"'.$fecha.'","'.$causa.'","'.$celular.'");';
		
		if( @mysql_query($sql) )
			$sql = 'UPDATE `total` SET `total`= total - '.$gasto.' WHERE `mes`='.$mes.' AND `anio` ='.$anio.' AND `celular`="'.$celular.'";';

		if( @mysql_query($sql) )
			$r['aviso'] = "Gasto cargado";

		$sql = 'SELECT * FROM total WHERE mes ='.$mes.' AND anio = '.$anio.' AND celular= "'.$celular.'"';

		$res = @mysql_query($sql);

		while( $re = @mysql_fetch_array($res) )
		{
			$r['total'] 		= $re['total'];
		}

		echo json_encode($r);
	}
	elseif( $h == "cargaCobro" )
	{
		$cobro 		= $_POST['cobro'];
		$cliente 	= $_POST['cliente'];
		$celular 	= $_POST['celular'];
		if($cliente == "")
			$cliente = "-";

		$mes 	= date("n");
		$anio 	= date("Y");
		$fecha  = date("j/n/Y H:i:s");

		$sql = 'INSERT INTO `agregados`(`id`,`mes`,`anio`,`monto`,`fecha_hora_de_carga_de_dato`,`cliente`,`celular`) VALUES ( NULL,'.$mes.','.$anio.','.$cobro.',"'.$fecha.'","'.$cliente.'","'.$celular.'");';
		
		if( @mysql_query($sql) )
			$sql = 'UPDATE `total` SET `total`= total + '.$cobro.' WHERE `mes`='.$mes.' AND `anio` ='.$anio.' AND `celular`="'.$celular.'";';

		if( @mysql_query($sql) )
			$r['aviso'] = "Cobro cargado";

		$sql = 'SELECT * FROM total WHERE mes ='.$mes.' AND anio = '.$anio.' AND celular= "'.$celular.'"';;

		$res = @mysql_query($sql);

		while( $re = @mysql_fetch_array($res) )
		{
			$r['total'] 		= $re['total'];
		}

		echo json_encode($r);
	}
	elseif( $h == "traeTotalAlMes" )
	{

		$mes 	= date("n");
		$anio 	= date("Y");
		$celular = $_POST['celular'];
		
		$sql = 'SELECT * FROM total WHERE mes ='.$mes.' AND anio = '.$anio.' AND celular= "'.$celular.'"';;

		$res = @mysql_query($sql);
		$r['aviso'] 	= "no ".$sql;
		while( $re = @mysql_fetch_array($res) )
		{
			$r['total'] 		= $re['total'];
			$r['aviso'] 	= "si";
		}

		echo json_encode($r);
	}
}
else
{
	$r['aviso'] = "sistema ocupado";
	echo json_encode($r);
}

// INSERT INTO `total`(`id`,`mes`,`anio`,`total`,`fecha_hora_de_carga_de_dato`) VALUES ( NULL,'1','2013','5000','17/1/2013 2:10:3');
?>