<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ModeloPreco extends Model
{
    protected $table = "modelos_precos";
    protected $fillable = ['preco','promocional','modelo_id'];

    use SoftDeletes;
}
