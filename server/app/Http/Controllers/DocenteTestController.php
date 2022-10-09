<?php

namespace App\Http\Controllers;

use App\Models\DocenteTest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DocenteTestController extends Controller
{
    public function index($id)
    {
        $showTests = DB::select("SELECT dt.id, u.email, u.perfil,
        te.id as id_test, u.id as id_usuario
        from docente_tests dt, users u, tests te
        where dt.id_docente=u.id and dt.id_test=te.id and dt.id_test=$id");
            
        foreach ($showTests as $user) {
                if ($user->perfil != null) {
                    $user->perfil = stream_get_contents($user->perfil);
                }
            }
        return response()->json($showTests);
    }



    public function store(Request $request)
    {
        $request->validate([
            "objeto" => "required",
            "id_test" => "required"
        ]);

        $objeto = $request->objeto;

        foreach ($objeto as $valor) {
            $professorTest = new DocenteTest();
            $professorTest->id_docente = $valor;
            $professorTest->id_test = $request->id_test;
            $professorTest->save();
        }

        return response()->json(["mensaje" => "se guardo correctamente"], 201);
    }
}
