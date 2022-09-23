<?php

namespace App\Http\Controllers;

use App\Models\Grupo;
use Illuminate\Http\Request;

class GrupoController extends Controller
{
    public function index()
    {
        return Grupo::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
            'id_docente' => 'required',
        ]);

        $grupo = new Grupo();
        $grupo->titulo = $request->titulo;
        $grupo->descripcion = $request->descripcion;
        $grupo->id_docente = $request->id_docente;

        $grupo->save();

        return response()->json(["mensaje" => "se guardo correctamente"], 201);
    }

    public function show($id)
    {
        return Grupo::find($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
            'id_docente' => 'required',
        ]);

        $grupo = Grupo::findOrFail($id);
        $grupo->titulo = $request->titulo;
        $grupo->descripcion = $request->descripcion;
        $grupo->id_docente = $request->id_docente;

        $grupo->save();

        return response()->json(["mensaje" => "se actualizo correctamente"], 201);
    }

    public function destroy($id) 
    {
        return Grupo::destroy($id);
    }
}
