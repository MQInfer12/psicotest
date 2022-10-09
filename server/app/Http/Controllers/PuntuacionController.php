<?php

namespace App\Http\Controllers;

use App\Models\Puntuacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PuntuacionController extends Controller
{
    public function index()
    {
        return Puntuacion::all();
    }

    public function puntuacionesByReactivos(Request $request)
    {
        $reactivos = $request->reactivos;

        if(count($reactivos) != 0) {
            $query = "SELECT * FROM puntuacions WHERE ";
            foreach($reactivos as $index => $reactivo) {
                $query = $query . " id_reactivo = '$reactivo' OR";
            }
            $query = $query . "DER BY id_pregunta";
    
            $puntuaciones = DB::select($query);
            return $puntuaciones;
        } else {
            return [];
        }
    }

    public function update(Request $request, Puntuacion $puntuacion)
    {
        //
    }

    public function destroy($id)
    {
        return Puntuacion::destroy($id);
    }
}
