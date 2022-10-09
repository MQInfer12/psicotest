<?php

namespace App\Http\Controllers;

use App\Models\DocenteTest;
use Illuminate\Http\Request;

class DocenteTestController extends Controller
{
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
