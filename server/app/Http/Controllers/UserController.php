<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return $users;
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'email' => 'required',
            'password' => 'required',
            'genero' => 'required',
            'edad' => 'required',
            'id_sede' => 'required',
            'id_rol' => 'required',
            'estado' => 'required',
        ]);

        $user = new User();
        $user->nombre = $request->nombre;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->genero = $request->genero;
        $user->edad = $request->edad;
        $user->id_sede = $request->id_sede;
        $user->id_rol = $request->id_rol;
        $user->estado = $request->estado;

        $user->save();

        return response()->json(["mensaje" => "se guardo correctamente"], 201);
    }

    public function show($id)
    {
        $user = User::find($id);
        return $user;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required',
            'email' => 'required',
            'genero' => 'required',
            'edad' => 'required',
            'id_sede' => 'required',
            'id_rol' => 'required',
        ]);

        $user = User::findOrFail($id);
        $user->nombre = $request->nombre;
        $user->email = $request->email;
        $user->genero = $request->genero;
        $user->edad = $request->edad;
        $user->id_sede = $request->id_sede;
        $user->id_rol = $request->id_rol;

        $user->save();

        return response()->json(["mensaje" => "se actualizo correctamente"], 201);
    }
}
