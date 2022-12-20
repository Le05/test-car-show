<?php

namespace App\Http\Controllers;

use App\Classes\Datatable;
use App\Classes\Upload;
use App\Models\Modelo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ModeloController extends Controller
{
    public function criar(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'ano' => 'required',
            'quantidade_portas' => 'required',
            'quantidade_lugares' => 'required',
            'hodometro' => 'required',
            'marca_id' => 'required',
            'tipo_transmissao_veiculo_id' => 'required',
            'tipo_veiculo_id' => 'required',
            'combustivel_id' => 'required',
            'preco' => 'required'
        ]);

        try {
            $modelo = Modelo::create($request->all());
            return response()->json($modelo);
        } catch (\Exception $e){
            return response()->json(['message' => $e->getMessage()],400);
        }
    }

    public function alterar(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);

        try {
            $modelo = Modelo::find($request->id);

            if(!$modelo)
                throw new \Exception("Nenhum modelo encontrado!");

            $modelo->update($request->all());

            return response()->json($modelo);
        } catch (\Exception $e){
            return response()->json(['message' => $e->getMessage()],400);
        }
    }

    public function deletar(Request $request)
    {
        try {
            $modelo = Modelo::find($request->id);

            if(!$modelo)
                throw new \Exception("Nenhum modelo encontrado!");

            $modelo->delete();

            return response()->json($modelo);
        } catch (\Exception $e){
            return response()->json(['message' => $e->getMessage()],400);
        }
    }

    public function buscarTodos(Request $request)
    {
        try {
            $modelosQuery = Modelo::with([
                'marca','tipoTransmissao','tipoVeiculo','combustivel','precos'
            ])->when(($request->pesquisa),function ($query) use($request) {
                $query->where('nome','like',"%$request->pesquisa%");
            });

            $dataTable = new Datatable($modelosQuery, $request->pagination, null);
            $modelos = $dataTable->dadosRetorno();
            return response()->json($modelos);
        } catch (\Exception $e){
            return response()->json(['message' => $e->getMessage()],400);
        }
    }

    public function buscarPorId(Request $request)
    {
        try {
            $modelo = Modelo::find($request->id);
            return response()->json($modelo);
        } catch (\Exception $e){
            return response()->json(['message' => $e->getMessage()],400);
        }
    }

    public function upload(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'file' => 'required',
        ]);

        try {
            $modelo = Modelo::find($request->id);

            if(!$modelo)
                throw new \Exception("Nenhum modelo encontrado!");

            $nomeArquivo = Carbon::now()->toISOString() . rand(100, 999) . '_' . $request->file->getClientOriginalName();


            Storage::putFileAs("/anexos/modelos/", request()->file('file'), $nomeArquivo);

            $path = "/anexos/modelos/" . $nomeArquivo;

            $modelo->imagem_url = $path;
            $modelo->save();

            return response()->json($modelo);
        } catch (\Exception $e){
            return response()->json(['message' => $e->getMessage()],400);
        }
    }
}
