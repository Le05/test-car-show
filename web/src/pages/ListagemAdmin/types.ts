export interface Modelo {
    preco: number
    id: number
    nome: string
    ano: string
    quantidade_portas: number
    quantidade_lugares: number
    hodometro: number
    marca_id: Marca
    tipo_transmissao_veiculo_id: number
    combustivel_id: number
    tipo_veiculo_id: number
    combustivel: Combustivel|null
    tipo_transmissao: TipoTransmissaoVeiculo|null
    tipo_veiculo: TipoVeiculo|null,
    imagem_url:string| null,
    precos:Precos[]
}

export interface Precos {
    id: number,
    preco: number
}

export interface Combustivel {
    id: number,
    nome: string
}

export interface TipoVeiculo {
    id: number,
    nome: string
}

export interface TipoTransmissaoVeiculo {
    id: number,
    nome: string
}

export interface Marca {
    id: number,
    nome: string
}

export interface Pagination {
    page: number,
    perpage: number,
    pages: number,
    total: number
}

export interface ResponseRequestModelos {
    meta: Pagination,
    data: Modelo[]
}