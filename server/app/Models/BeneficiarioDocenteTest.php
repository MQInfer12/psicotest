<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BeneficiarioDocenteTest extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_beneficiario',
        'id_docente_test'
    ];
}
