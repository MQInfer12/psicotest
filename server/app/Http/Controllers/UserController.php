<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        /*  $users = User::all();
        return $users; */
        $showUser = DB::select("
        
        
        select u.id, u.nombre as nombreUser, u.email, u.perfil, u.genero, 
        u.edad, u.id_sede, u.id_rol, u.estado, r.nombre as rol , 
        s.nombre as nombreSede from users u, rols r, sedes s where 
        u.id_rol=r.id and u.id_sede=s.id; 
        ");
        return response()->json($showUser);
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

    public function Search($email)
    {
        $user = DB::select("select * from users where email like '$email%'");
        return response()->json($user, 200);
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

    public function able($id)
    {
        $user = User::findOrFail($id);

        if (!$user->estado) {
            $user->estado = true;
        } else {
            $user->estado = false;
        }

        $user->save();

        return response()->json(["mensaje" => "se actualizo correctamente"], 201);
    }
}
