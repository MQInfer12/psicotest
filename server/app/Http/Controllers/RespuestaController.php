<?php

namespace App\Http\Controllers;

use App\Models\Respuesta;
use App\Models\Resultado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RespuestaController extends Controller
{
    public function index()
    {
        return Respuesta::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_test' => 'required',
            'email_user' => 'required',
            'puntuaciones' => 'required'
        ]);

        $respuesta = new Respuesta();
        $respuesta->id_test = $request->id_test;
        $respuesta->email_user = $request->email_user;
        $respuesta->save();

        $puntuaciones = $request->puntuaciones;
        foreach($puntuaciones as $puntuacion) {
            $resultado = new Resultado();
            $resultado->id_respuesta = $respuesta->id;
            $resultado->id_puntuacion = $puntuacion;
            $resultado->save();
        }

        return response()->json(["mensaje" => "se guardo correctamente"], 201);
    }

    public function show($id)
    {
        $respuesta = Respuesta::find($id);
        $id_respuesta = $respuesta->id;
        $resultados = DB::select("SELECT * FROM resultados WHERE id_respuesta='$id_respuesta'");
        foreach($resultados as $resultado) {
            $id_puntuacion = $resultado->id_puntuacion;
            $puntuacion = DB::select("SELECT * FROM puntuacions WHERE id='$id_puntuacion'");
            $resultado->puntuacion = $puntuacion;
        }
        $respuesta->resultados = $resultados;
        return $respuesta;
    }

    public function destroy($id)
    {
        return Respuesta::destroy($id);
    }
}
