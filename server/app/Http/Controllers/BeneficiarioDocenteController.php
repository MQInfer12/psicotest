<?php

namespace App\Http\Controllers;

use App\Models\Respuesta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BeneficiarioDocenteController extends Controller
{
    public function showTestToProffessor($id) //BIEN
    {
        $tests = DB::select("SELECT dt.id, dt.id_docente, dt.id_test, t.nombre, t.tiempo, t.descripcion, t.autor
                             from docente_tests as dt, tests as t 
                             where dt.id_docente=$id and dt.id_test=t.id");

        return response()->json($tests);
    }

    public function getBenefAssigning($id)
    {
        $getIdDocente = DB::select("SELECT bdt.id, bdt.email_user, bdt.id_docente_test, u.email, 
                                    u.nombre as nombre_user, s.nombre as sede, u.perfil
                                    from respuestas as bdt, users u, sedes as s
                                    where bdt.email_user=u.email and s.id=u.id_sede and bdt.id_docente_test=$id");

        foreach($getIdDocente as $benef) {
            if($benef->perfil != null) {
                $benef->perfil = stream_get_contents($benef->perfil);
            }
        }
        return response()->json($getIdDocente);
    }

    public function getBenefNotAssigning($id) //FUNCIONA
    {
        $getIdBenef = DB::select("SELECT * from respuestas where id_docente_test=$id");
        $getIdsany = true;
        $condition = "and email !=";
        
        foreach ($getIdBenef as $idBenef) {
            $getIdsany = false;
            if ($idBenef != end($getIdBenef)) {
                $condition = $condition . " '" . $idBenef->email_user . "' " . $condition;
            } else {
                $condition = $condition . " '" . $idBenef->email_user . "'";
            }
        }

        if ($getIdsany) {
            $getBenefNotAssigning = DB::select("SELECT u.id, u.nombre as nombre_usuario, u.email, u.estado, u.perfil
            from users as u where u.id_rol=1");
            foreach($getBenefNotAssigning as $benef) {
                if($benef->perfil != null) {
                    $benef->perfil = stream_get_contents($benef->perfil);
                }
            }
        } else {
            $getBenefNotAssigning = DB::select("SELECT u.id, u.nombre as nombre_usuario, u.email, u.estado, u.perfil
            from users as u where u.id_rol=1 " . $condition);
            foreach($getBenefNotAssigning as $benef) {
                if($benef->perfil != null) {
                    $benef->perfil = stream_get_contents($benef->perfil);
                }
            }
        }

        return response()->json($getBenefNotAssigning);
    }

   public function assignBenefToTest(Request $request) //FUNCIONA
    {
        $request->validate([
            "objeto" => "required",
            "id_docente_test" => "required"
        ]);

        $objeto = $request->objeto;

        foreach ($objeto as $valor) {
            $benefTest = new Respuesta();
            $benefTest->email_user = $valor;
            $benefTest->id_docente_test = $request->id_docente_test;
            $benefTest->estado = 0;
            $benefTest->save();
        }

        return response()->json(["mensaje" => "se guardo correctamente"], 201);
    }

    public function deleteBenefAssigning(Request $request)
    {
        $request->validate([
            "objeto" => "required",
            "id_docente_test" => "required"
        ]);

        $objeto = $request->objeto;

        foreach ($objeto as $valor) {
            DB::delete("DELETE from respuestas where email_user='$valor' AND id_docente_test='$request->id_docente_test'");
        }
        return response()->json(["msg" => "se ha eliminado"], 200);
    }
    
}
