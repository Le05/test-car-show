<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Combustivel extends Model
{
    protected $fillable = ['nome'];
    protected $table = "combustiveis";
}
