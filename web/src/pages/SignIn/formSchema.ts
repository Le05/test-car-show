import * as yup from 'yup'

export const schema = yup.object({
    email: yup.string().required('Email é um campo obrigatório.'),
    name: yup.string().required('Nome é um campo obrigatório.'),
    password: yup.string().required('Senha é um campo obrigatório.'),
}).required();