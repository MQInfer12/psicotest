<?php

namespace App\Http\Controllers;

use App\Models\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    public function index()
    {   
        $tests = DB::select("SELECT *
                                 FROM tests
                                 ORDER BY id");

        foreach($tests as $test) {
            $id_test = $test->id;
            $usuarios = DB::select("SELECT u.nombre, u.perfil
                                    FROM users as u, docente_tests as dt
                                    WHERE dt.id_test = '$id_test' AND dt.id_docente = u.id");
            foreach($usuarios as $usuario) {
                $usuario->perfil = stream_get_contents($usuario->perfil);
            }
            $test->usuarios = $usuarios;
        }        

        return response()->json($tests);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'tiempo' => 'required',
        ]);

        $test = new Test();
        $test->nombre = $request->nombre;
        $test->descripcion = $request->descripcion;
        $test->autor = "Admin";
        $test->tiempo = $request->tiempo;
        $test->save();

        return response()->json(["mensaje" => "se guardo correctamente"], 201);
    }

    public function show($id)
    {
        $showTest = DB::select("SELECT *
                                FROM tests
                                WHERE id='$id'");
        return response()->json($showTest);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'tiempo' => 'required',
        ]);

        $test = Test::findOrFail($id);
        $test->nombre = $request->nombre;
        $test->descripcion = $request->descripcion;
        $test->autor = "Admin";
        $test->tiempo = $request->tiempo;
        $test->save();

        return response()->json(["mensaje" => "se guardo correctamente"], 201);
    }

    public function destroy($id)
    {
        return Test::destroy($id);
    }
}
