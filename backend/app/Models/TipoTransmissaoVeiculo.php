<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoTransmissaoVeiculo extends Model
{
    protected $fillable = ['nome'];
    protected $table = "tipos_transmissoes_veiculos";

}
