<?php

namespace App\Http\Controllers;

use App\Models\BeneficiarioDocenteTest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BeneficiarioDocenteController extends Controller
{
    public function showTestToProffessor($id)
    {
        $tests = DB::select("select dt.id, dt.id_docente, dt.id_test, t.nombre, t.tiempo, t.descripcion, t.autor
        from docente_tests as dt, tests as t 
        where dt.id_docente=$id and dt.id_test=t.id");

        return response()->json($tests);
    }

    public function getBenefAssigning($id)
    {
        $getIdDocente = DB::select("select bdt.id, bdt.id_beneficiario, bdt.id_docente_test, u.email, 
        u.nombre as nombre_user, s.nombre as sede, u.perfil
        from beneficiario_docente_tests as bdt, users u, sedes as s
        where bdt.id_beneficiario=u.id and s.id=u.id_sede and bdt.id_docente_test=$id");
        foreach($getIdDocente as $benef) {
            if($benef->perfil != null) {
                $benef->perfil = stream_get_contents($benef->perfil);
            }
        }
        return response()->json($getIdDocente);
    }

    public function getBenefNotAssigning($id)
    {
        $getIdBenef = DB::select("select * from beneficiario_docente_tests where id_docente_test=$id");
        $getIdsany = true;
        $condition = "and id!=";
        foreach ($getIdBenef as $idBenef) {
            $getIdsany = false;
            if ($idBenef != end($getIdBenef)) {
                $condition = $condition . ' ' . $idBenef->id_beneficiario . ' ' . $condition;
            } else {
                $condition = $condition . ' ' . $idBenef->id_beneficiario;
            }
        }

        if ($getIdsany) {
            $getBenefNotAssigning = DB::select("select u.id, u.nombre as nombre_usuario, u.email, u.estado, u.perfil
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

   public function assignBenefToTest(Request $request)
    {
        $request->validate([
            "objeto" => "required",
            "id_docente_test" => "required"
        ]);

        $objeto = $request->objeto;

        foreach ($objeto as $valor) {
            $professorTest = new BeneficiarioDocenteTest();
            $professorTest->id_beneficiario = $valor;
            $professorTest->id_docente_test = $request->id_docente_test;
            $professorTest->save();
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
            DB::delete("DELETE from beneficiario_docente_tests 
            where id=$valor");
        }
        return response()->json(["msg" => "se ha eliminado"], 200);
    }
    
}
