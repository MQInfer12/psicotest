<?php

namespace App\Http\Controllers;

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
        u.nombre as nombre_user,
        s.nombre as sede
        from beneficiario_docente_tests as bdt, users u, sedes as s
        where bdt.id_beneficiario=u.id and s.id=u.id_sede and bdt.id_docente_test=$id");

        return response()->json($getIdDocente);
    }
}
