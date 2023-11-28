<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class APIController extends Controller
{
    public function getTestToShow($idTest)
    {
        $test = DB::select("SELECT * FROM tests WHERE id='$idTest'");
        $test = $test[0];

        $caracteristicas = DB::select("SELECT * FROM caracteristicas WHERE id_test='$idTest' ORDER BY id");
        $test->caracteristicas = $caracteristicas;

        $secciones = DB::select("SELECT id, multimarcado, vacio, instruccion FROM seccions WHERE id_test='$idTest' ORDER BY orden");

        $preguntasTotales = [];
        foreach($secciones as $seccion) {
            $id_seccion = $seccion->id;
            $preguntas = DB::select("SELECT id, descripcion FROM preguntas WHERE id_seccion='$id_seccion' ORDER BY id");

            foreach($preguntas as $pregunta) {
                $reactivos = DB::select("SELECT id, descripcion FROM reactivos WHERE id_seccion='$id_seccion' ORDER BY id");
                foreach($reactivos as $reactivo) {
                    $puntuaciones = DB::select("SELECT id, id_reactivo, asignado FROM puntuacions WHERE id_pregunta='$pregunta->id' ORDER BY id_reactivo");
                    foreach($puntuaciones as $puntuacion) {
                        if($reactivo->id == $puntuacion->id_reactivo) {
                            $reactivo->value = $puntuacion->id;
                        }
                    }
                }
                $pregunta->reactivos = $reactivos;
                array_push($preguntasTotales, $pregunta);
            }
        }
        $test->preguntas = $preguntasTotales;
        return $test;
    }
}
