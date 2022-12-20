<?php

namespace App\Classes;

use Illuminate\Support\Facades\DB;

class Datatable
{
    private $dados = [];
    private $pagination;

    private $qtdRegistros = 0;

    public function __construct($query, $pagination, $sort)
    {

        if (!$sort) {
            $sort['field'] = "created_at";
            $sort['sort'] = "desc";
        }

        $this->qtdRegistros = $query->count();
        $this->pagination = $pagination;

        $this->dados = $query->when($sort && $sort['field'], function ($query) use ($sort) {
            $query->orderBy($sort['field'], $sort['sort']);
        })
            ->offset(($pagination['page'] - 1) * $pagination['perpage'])
            ->limit($pagination['perpage'])
            ->get();
    }

    public function dadosRetorno($retornarModelo = false)
    {
        $retorno = [
            'meta' => [
                'page' => $this->pagination['page'] ? $this->pagination['page'] : 1,
                'pages' => floor(($this->qtdRegistros - 1) / $this->pagination['perpage']) + 1,
                'perpage' => $this->pagination['perpage'],
                'total' => $this->qtdRegistros,
            ],
            'data' => $retornarModelo ? $this->dados : $this->dados->toArray()
        ];

        return $retorno;
    }

}