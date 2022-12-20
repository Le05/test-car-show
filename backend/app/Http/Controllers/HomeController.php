<?php

namespace App\Http\Controllers;


use App\Models\Combustivel;
use App\Models\Marca;
use App\Models\Modelo;
use App\Models\TipoTransmissaoVeiculo;
use App\Models\TipoVeiculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function buscarParametrosVeiculoNovo()
    {
        $combustiveis = Combustivel::all();
        $tiposVeiculos = TipoVeiculo::all();
        $marcas = Marca::all();
        $tiposTransmissoes = TipoTransmissaoVeiculo::all();

        return response()->json(compact(['combustiveis', 'tiposVeiculos', 'marcas', 'tiposTransmissoes']));
    }

    public function buscarVeiculos(Request $request)
    {
        $modelos = Modelo::withCount(['precos as max_preco' => function ($query) {
            $query->select(DB::raw('max(preco)'));
        }])->with([
            'marca', 'tipoTransmissao', 'tipoVeiculo', 'combustivel',
            'precos' => function($query){
                $query->orderBy('preco','desc');
            }
        ])->orderBy('max_preco','desc')
            ->when(($request->pesquisa),function ($query) use($request) {
                $query->where('nome','like',"%$request->pesquisa%");
            })
            ->get();


        return response()->json($modelos);
    }
}
