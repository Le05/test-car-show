<?php

namespace App\Models;

use App\Classes\FormataTudo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Modelo extends Model
{
    protected $fillable = ['nome', 'ano', 'quantidade_portas', 'quantidade_lugares', 'hodometro', 'marca_id',
        'tipo_transmissao_veiculo_id', 'combustivel_id', 'tipo_veiculo_id','imagem_url','preco'];
    protected $table = "modelos";

    use SoftDeletes;

    public function marca()
    {
        return $this->belongsTo(Marca::class, 'marca_id');
    }

    public function tipoTransmissao()
    {
        return $this->belongsTo(TipoTransmissaoVeiculo::class, 'tipo_transmissao_veiculo_id');

    }

    public function tipoVeiculo()
    {
        return $this->belongsTo(TipoVeiculo::class, 'tipo_veiculo_id');

    }

    public function combustivel()
    {
        return $this->belongsTo(Combustivel::class, 'combustivel_id');

    }

    public function precos()
    {
        return $this->hasMany(ModeloPreco::class, 'modelo_id');
    }

    public static function transform($attributes)
    {
        if (isset($attributes['preco']))
            $attributes['preco'] = FormataTudo::formatar($attributes['preco'],'moeda','banco');

        return $attributes;
    }

    public static function create(array $attributes = [], array $options = [])
    {
        DB::beginTransaction();
        $attributes = self::transform($attributes);
        $attributesExtract = extrairDados($attributes, (new Modelo())->getFillable());
        $created = (new static)->newQuery()->create($attributesExtract);

//        ModeloPreco::create(['preco' => $attributes['preco'], 'promocional' => false, 'modelo_id' => $created->id]);
        DB::commit();
        return $created;
    }

    public function update(array $attributes = [], array $options = [])
    {
        DB::beginTransaction();
        $attributes = self::transform($attributes);
        $attributes = extrairDados($attributes, (new Modelo())->getFillable());
        $updated = parent::update($attributes);
        DB::commit();

        return $updated;
    }

}
