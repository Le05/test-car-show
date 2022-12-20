import * as yup from 'yup'

export const schema = yup.object({
    nome: yup.string().required('Nome é um campo obrigatório.'),
    ano: yup.string().required('Ano é um campo obrigatório.'),
    quantidade_portas: yup.string().required('Quantidade de portas é um campo obrigatório.'),
    quantidade_lugares: yup.string().required('Quantidade de lugares é um campo obrigatório.'),
    hodometro: yup.string().required('Hodometro é um campo obrigatório.'),
    marca_id: yup.string().required('Marca é um campo obrigatório.'),
    tipo_transmissao_veiculo_id: yup.string().required('Tipo transmissão é um campo obrigatório.'),
    tipo_veiculo_id: yup.string().required('Tipo do veículo é um campo obrigatório.'),
    combustivel_id: yup.string().required('Combustivel é um campo obrigatório.'),
}).required();