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
        $respuestas = DB::select("SELECT * FROM respuestas ORDER BY id");
        
        foreach($respuestas as $respuesta) {
            $usuario = DB::select("SELECT nombre, email FROM users WHERE email='$respuesta->email_user'");
            $test = DB::select("SELECT nombre, descripcion FROM tests WHERE id='$respuesta->id_test'");

            $respuesta->usuario = $usuario;
            $respuesta->test = $test;

            $secciones = DB::select("SELECT id FROM seccions WHERE id_test='$respuesta->id_test'");
            $total = 0;
            foreach($secciones as $seccion) {                
                $preguntas = DB::select("SELECT id FROM preguntas WHERE id_seccion='$seccion->id'");
                foreach($preguntas as $pregunta) {
                    $max = DB::select("SELECT MAX(asignado) FROM puntuacions WHERE id_pregunta='$pregunta->id'");
                    $total = $total + $max[0]->max;
                }
            }
            
            $respuesta->total = $total;

            $resultados = DB::select("SELECT * FROM resultados WHERE id_respuesta='$respuesta->id'");
            $cont = 0;
            foreach($resultados as $resultado) {
                $puntuacion = DB::select("SELECT asignado FROM puntuacions WHERE id='$resultado->id_puntuacion'");
                $cont = $cont + $puntuacion[0]->asignado;
            }

            $respuesta->puntuacion = $cont;
        }

        return $respuestas;
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
