<?php

namespace App\Traits;

use App\Models\PreguntaDimension;
use App\Models\Puntuacion;
use Illuminate\Support\Facades\DB;

trait PuntuacionesNaturales {
    public function getPuntuacionesNaturales($dimensiones) {
        $naturales = [];
        foreach($dimensiones as $dimension) {
            $natural = $this->getPuntuacionNatural($dimension->id);
            $naturales[] = array(
                "id" => $dimension->id,
                "valores" => $natural
            );
        }
        return $naturales;
    }

    public function getPuntuacionNatural($id) {
        $preguntas = PreguntaDimension::where('id_dimension',$id)->pluck('id_pregunta')->toArray();
        $naturales = [];
        if(count($preguntas)) {
            $arrayDeArrays = [];
            foreach($preguntas as $pregunta) {
                $array = Puntuacion::where('id_pregunta', $pregunta)->pluck('asignado')->toArray();
                $options = DB::select("SELECT s.vacio, s.multimarcado FROM seccions as s, preguntas as p WHERE p.id_seccion=s.id AND p.id='$pregunta'")[0];
                $vacio = $options->vacio;
                $multimarcado = $options->multimarcado;
                if($multimarcado) {
                    $array = $this->possibleCombinations($array);
                }
                if($vacio && !in_array(0, $array)) {
                    $array[] = 0;
                }
                $arrayDeArrays[] = $array;
            }
            $posibilidades = $this->calcularPosibilidad($arrayDeArrays, 0);
            sort($posibilidades);
            foreach($posibilidades as $posibilidad) {
                $naturales[] = $posibilidad;
            }
        }

        //CODIGO PARA OBTENER LAS CONVERSIONES
        $conversiones = DB::select(
            "SELECT c.id_escala_dimension, c.convertido, c.natural
            FROM conversions as c, dimensions as d, escalas as e, escala_dimensions as ed
            WHERE ed.id_dimension=d.id AND ed.id_escala=e.id 
            AND c.id_escala_dimension=ed.id 
            AND d.id='$id'"
        );
        $idsEscalaDimension = DB::select(
            "SELECT ed.id, e.id as id_escala
            FROM dimensions as d, escalas as e, escala_dimensions as ed
            WHERE ed.id_dimension=d.id AND ed.id_escala=e.id
            AND d.id='$id'
            ORDER BY e.id"
        );
        $newNaturales = [];
        foreach($naturales as $natural) {
            $conversionesPorNatural = [];
            foreach($idsEscalaDimension as $escalaDimension) {
                $flagEncontrado = false;
                foreach($conversiones as $conversion) {
                    if($conversion->natural == $natural && $conversion->id_escala_dimension == $escalaDimension->id) {
                        $conversion->id_escala = $escalaDimension->id_escala;
                        $conversionesPorNatural[] = $conversion;
                        $flagEncontrado = true;
                    }
                }
                if(!$flagEncontrado) {
                    $conversionesPorNatural[] = array(
                        "id_escala_dimension" => $escalaDimension->id,
                        "id_escala" => $escalaDimension->id_escala,
                        "convertido" => "",
                        "natural" => $natural
                    );
                }
            }
            $newNaturales[] = array(
                "natural" => $natural,
                "conversiones" => $conversionesPorNatural
            );
        }
        return $newNaturales;
    }

    public function calcularPosibilidad($arrayDeArrays, $index) {
        if(count($arrayDeArrays) - 1 === $index) {
            return array_unique($arrayDeArrays[$index]);
        } else {
            $primerArray = $arrayDeArrays[$index];
            $segundoArray = $this->calcularPosibilidad($arrayDeArrays, $index + 1);
            $posibilidadesNuevas = $this->sumarArrays($primerArray, $segundoArray);
            return $posibilidadesNuevas;
        }
    }

    public function sumarArrays($primerArray, $segundoArray) {
        $arrayNuevo = [];
        foreach($primerArray as $primero) {
            foreach($segundoArray as $segundo) {
                $posibilidad = $primero + $segundo;
                if(!in_array($posibilidad, $arrayNuevo)) {
                    $arrayNuevo[] = $posibilidad;
                }
            }
        }
        return $arrayNuevo;
    }

    public function possibleCombinations($array) {
        $combinations = [];
        $iterations = pow(2, count($array));
        for($i = 1; $i < $iterations; $i++) {
            $bin = sprintf("%0".count($array)."d", decbin($i));
            $combination = 0;
            for($j = 0; $j < strlen($bin); $j++) {
                if(intval($bin[$j])) {
                    $combination += $array[$j];
                }
            }
            if(!in_array($combination, $combinations)) {
                $combinations[] = $combination;
            }
        }
        return $combinations;
    }
}