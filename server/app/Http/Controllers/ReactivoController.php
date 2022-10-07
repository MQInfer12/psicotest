<?php

namespace App\Http\Controllers;

use App\Models\Reactivo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReactivoController extends Controller
{
    public function index()
    {
        return Reactivo::all();
    }

    public function reactivosBySeccion($idSeccion)
    {
        return DB::select("SELECT * FROM reactivos WHERE id_seccion='$idSeccion' ORDER BY id");
    }

    public function store(Request $request)
    {
        $request->validate([
            "id_seccion" => "required",
            "descripcion" => "required"
        ]);

        $pregunta = new Reactivo();
        $pregunta->id_seccion = $request->id_seccion;
        $pregunta->descripcion = $request->descripcion;
        $pregunta->save();

        return response()->json(["mensaje" => "se guardo correctamente"], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            "id_seccion" => "required",
            "descripcion" => "required"
        ]);

        $pregunta = Reactivo::findOrFail($id);
        $pregunta->id_seccion = $request->id_seccion;
        $pregunta->descripcion = $request->descripcion;
        $pregunta->save();

        return response()->json(["mensaje" => "se guardo correctamente"], 201);
    }

    public function destroy($id)
    {
        return Reactivo::destroy($id);
    }
}
