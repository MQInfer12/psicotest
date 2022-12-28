<?php

namespace App\Http\Controllers;

use App\Models\Puntuacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PuntuacionController extends Controller
{
    public function puntuacionesByReactivos(Request $request)
    {
        $reactivos = $request->reactivos;

        if(count($reactivos) != 0) {
            $query = "SELECT * FROM puntuacions WHERE ";
            foreach($reactivos as $index => $reactivo) {
                $query = $query . " id_reactivo = '$reactivo' OR";
            }
            $query = $query . "DER BY id_reactivo";
    
            $puntuaciones = DB::select($query);
            return $puntuaciones;
        } else {
            return [];
        }
    }

    public function puntuacionesBySeccion($id)
    {
        $puntuaciones = DB::select(
            "SELECT DISTINCT on (pu.id) pu.id, pu.id_pregunta, pu.id_reactivo, pu.asignado 
            FROM puntuacions as pu, preguntas as pr, reactivos as r
            WHERE (pu.id_pregunta=pr.id AND pr.id_seccion='$id') OR (pu.id_reactivo=r.id AND r.id_seccion='$id')"
        );
        return $puntuaciones;
    }

    public function massUpdate(Request $request)
    {
        $puntuaciones = $request->puntuaciones;
        foreach($puntuaciones as $puntuacion) {
            $new = Puntuacion::findOrFail($puntuacion['id']);
            $new->asignado = $puntuacion['asignado'];
            $new->save();
        }
        return response()->json(["mensaje" => "se guardo correctamente"], 201);
    }
}
