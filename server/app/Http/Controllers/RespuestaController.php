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
            //CONSEGUIR NOMBRE DEL USUARIO
            $usuario = DB::select("SELECT nombre FROM users WHERE email='$respuesta->email_user'");
            $respuesta->nombre_user = $usuario[0]->nombre;

            //CONSEGUIR DATOS DE TEST
            $docente_test = DB::select("SELECT id_docente, id_test FROM docente_tests WHERE id='$respuesta->id_docente_test'");
            $id_test = $docente_test[0]->id_test;
            $test = DB::select("SELECT nombre, descripcion FROM tests WHERE id='$id_test'");
            $respuesta->nombre_test = $test[0]->nombre;
            $respuesta->descripcion = $test[0]->descripcion;

            //CONSEGUIR DATOS DEL DOCENTE
            $id_docente = $docente_test[0]->id_docente;
            $docente = DB::select("SELECT nombre, email FROM users WHERE id='$id_docente'");
            $respuesta->nombre_docente = $docente[0]->nombre;
            $respuesta->email_docente = $docente[0]->email;

            //CONSEGUIR PUNTUACION TOTAL
            $secciones = DB::select("SELECT id FROM seccions WHERE id_test='$id_test'");
            $total = 0;
            foreach($secciones as $seccion) {                
                $preguntas = DB::select("SELECT id FROM preguntas WHERE id_seccion='$seccion->id'");
                foreach($preguntas as $pregunta) {
                    $max = DB::select("SELECT MAX(asignado) FROM puntuacions WHERE id_pregunta='$pregunta->id'");
                    $total = $total + $max[0]->max;
                }
            }
            $respuesta->total = $total;

            //CONSEGUIR PUNTUACION DEL TEST
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
            'email_user' => 'required',
            'id_docente_test' => 'required',
            'puntuaciones' => 'required'
        ]);

        $respuesta = new Respuesta();
        $respuesta->email_user = $request->email_user;
        $respuesta->id_docente_test = $request->id_docente_test;
        $respuesta->estado = 1;
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

    public function update(Request $request, $id)
    {
        $request->validate([
            'puntuaciones' => 'required'
        ]);

        $respuesta = Respuesta::find($id);
        $respuesta->estado = 1;
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

    public function getIdTest($id)
    {
        $respuesta = Respuesta::find($id);
        $id_test = DB::select("SELECT id_test FROM docente_tests WHERE id='$respuesta->id_docente_test'");
        $respuesta->id_test = $id_test[0]->id_test;
        return $respuesta;
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
