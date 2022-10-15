<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BeneficiarioDocenteController extends Controller
{
    public function getBeneficiaryNotAssigning($id)
    {
        $getIdDocente = DB::select("select * from beneficiario_docente_tests where id_test=$id");
        $getIdsany = true;
        $condition = "and u.id!=";
        foreach ($getIdDocente as $idProfessor) {
            $getIdsany = false;
            if ($idProfessor != end($getIdDocente)) {
                $condition = $condition . ' ' . $idProfessor->id_docente . ' ' . $condition;
            } else {
                $condition = $condition . ' ' . $idProfessor->id_docente;
            }
        }
        if ($getIdsany) {
            $getProfessorsNotAssigning = DB::select("SELECT u.id, u.nombre as nombre_user, u.email, 
            u.estado, s.nombre as nombre_sede from users u, sedes s 
            where u.id_rol=2 and u.id_sede=s.id");
        } else {
            $getProfessorsNotAssigning = DB::select("SELECT u.id, u.nombre as nombre_user, u.email,
             u.estado, s.nombre as nombre_sede 
             from users u, sedes s 
            where u.id_rol=2 and u.id_sede=s.id " . $condition);
        }

        return response()->json($getProfessorsNotAssigning);
    }
}
