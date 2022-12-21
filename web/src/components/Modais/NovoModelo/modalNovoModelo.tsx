import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { X } from "phosphor-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Api } from "../../../services/api";
import { formataMoeda } from "../../../services/formatting";
import { Button } from "../../Buttons/button"
import { schema } from "./formSchema";
import { IFormInputs } from "./types";

export function ModalNovoModelo(props: any) {
    const { setOpenModal, title, marcas, tiposTransmissoes, tiposVeiculos, combustiveis, modeloSelecionado } = props;

    const { register, handleSubmit, formState: { errors }, watch } = useForm<IFormInputs>({
        mode: "onSubmit",
        resolver: yupResolver(schema)
    });

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
          }
    });

    //   const files = acceptedFiles.map(file => {
    //     console.log(file);
    //   });

    function gerarAnos(anoInicio: number): number[] {
        let anos: number[] = [];
        for (let i = 0; i < 30; i++) {
            anos.push(anoInicio + i);
        }

        return anos;
    }


    const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.value = formatarValor(e.currentTarget.value);
        return e;
    }, []);

    function formatarValor(valueProp:string)
    {
        let value = valueProp;
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d)(\d{2})$/, "$1,$2");
        value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

        return value;
    }

    async function enviarForm(form: IFormInputs) {
        try {

            let url = '/modelo/criar';

            if (form.id) {
                url = 'modelo/alterar';
            }

            const response = await Api.post(url, form);

            if(acceptedFiles.length > 0){
                let formData = new FormData();
                formData.append('id',response.data.id);
                formData.append('file',acceptedFiles[0]);

                await Api.post("/modelo/upload", formData);

            }
            
            setOpenModal(false);
        } catch (error) {
        }
    }


    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 max-w-3xl mx-3 sm:mx-auto">
                    {/*content*/}
                    <div className="bg-white border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-3 outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-center justify-between px-5 pt-3 rounded-t">
                            <h3 className="text-xl font-semibold ">
                                {title}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setOpenModal(false)}
                            >
                                <X className="block w-8 h-8" color="#fafafa" weight="bold" aria-hidden="true" />
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 pb-0 flex-auto">
                            <form className="" noValidate
                                onSubmit={handleSubmit(enviarForm)}
                            >
                                <input {...register('id')} type="hidden" id="id" name="id" defaultValue={modeloSelecionado?.id ?? ''} />

                                <div className="min-w-[260px] md:min-w-[400px] flex flex-wrap">
                                    <div className="w-full px-2">
                                        <label>Nome</label>
                                        <input
                                            {...register('nome')}
                                            id="nome"
                                            name="nome"
                                            type="text"
                                            autoComplete="off"
                                            required
                                            defaultValue={modeloSelecionado?.nome ?? ''}
                                            className={`appearance-none relative block w-full border px-3 py-3 my-1 mr-4 bg-white placeholder-gray-400 rounded focus:outline-none focus:z-10 sm:text-sm
                                            ${errors.nome ? 'border-red-600 focus:border-red-600' : ''}`}
                                        />
                                        <small className="text-red-600">{errors.nome?.message}</small>
                                    </div>

                                    <div className="w-full px-2">
                                        <label>Marca</label>
                                        <select
                                            {...register('marca_id')}
                                            id="marca_id"
                                            name="marca_id"
                                            defaultValue={modeloSelecionado?.marca_id ?? ''}
                                            className={`appearance-none relative block w-full border px-3 py-3 my-1 mr-4  bg-white placeholder-gray-400 rounded focus:outline-none focus:z-10 sm:text-sm
                                            ${errors.marca_id ? 'text-red-600' : ''}`}
                                        >
                                            <option disabled value="" className=""></option>
                                            {
                                                marcas.map((marca: any) => (
                                                    <option key={marca.id} value={marca.id}>{marca.nome}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="w-1/2 px-2">
                                        <label>Hodômetro</label>
                                        <input
                                            {...register('hodometro')}
                                            id="hodometro"
                                            name="hodometro"
                                            type="number"
                                            autoComplete="off"
                                            required
                                            defaultValue={modeloSelecionado?.hodometro ?? ''}
                                            className={`appearance-none relative block w-full border px-3 py-3 my-1 mr-4 bg-white placeholder-gray-400 rounded focus:outline-none focus:z-10 sm:text-sm
                                            ${errors.nome ? 'border-red-600 focus:border-red-600' : ''}`}
                                            placeholder="Hodometro atual"
                                        />
                                        <small className="text-red-600">{errors.hodometro?.message}</small>
                                    </div>


                                    <div className="w-1/2 px-2">
                                        <label>Ano</label>
                                        <select
                                            {...register('ano')}
                                            id="ano"
                                            name="ano"
                                            defaultValue={modeloSelecionado?.ano ?? ''}
                                            className={`appearance-none relative block w-full border px-3 py-3 my-1 mr-4 bg-white placeholder-gray-400 rounded focus:outline-none focus:z-10 sm:text-sm
                                            ${errors.ano ? 'text-red-600' : ''}`}
                                        >
                                            <option disabled value="" className="text-gray-400">Selecione o ano do veiculo</option>
                                            {
                                                gerarAnos(moment().year() - 29).map(ano => (
                                                    <option key={ano} value={ano}>{ano}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="w-1/2 px-2">
                                        <label>Quantidade portas</label>
                                        <select
                                            {...register('quantidade_portas')}
                                            id="quantidade_portas"
                                            name="quantidade_portas"
                                            defaultValue={modeloSelecionado?.quantidade_portas ?? ''}
                                            className={`appearance-none relative block w-full border px-3 py-3 my-1 mr-4 bg-white placeholder-gray-400 rounded focus:outline-none focus:z-10 sm:text-sm
                                            ${errors.quantidade_portas ? 'text-red-600' : ''}`}
                                        >
                                            <option disabled value="" className="text-gray-400">Selecione o quantidade de portas</option>
                                            <option value="2">2</option>
                                            <option value="2">3</option>
                                            <option value="2">4</option>
                                            <option value="2">5</option>
                                        </select>
                                    </div>

                                    <div className="w-1/2 px-2">
                                        <label>Quantidade lugares</label>
                                        <select
                                            {...register('quantidade_lugares')}
                                            id="quantidade_lugares"
                                            name="quantidade_lugares"
                                            defaultValue={modeloSelecionado?.quantidade_lugares ?? ''}
                                            className={`appearance-none relative block w-full border px-3 py-3 my-1 mr-4 bg-white placeholder-gray-400 rounded focus:outline-none focus:z-10 sm:text-sm
                                            ${errors.quantidade_lugares ? 'text-red-600' : ''}`}
                                        >
                                            <option disabled value="" className="text-gray-400">Selecione o quantidade de lugares</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                    </div>

                                    <div className="w-1/2 px-2">
                                        <label>Tipo Combustível</label>
                                        <select
                                            {...register('combustivel_id')}
                                            id="combustivel_id"
                                            name="combustivel_id"
                                            defaultValue={modeloSelecionado?.combustivel_id ?? ''}
                                            className={`appearance-none relative block w-full border px-3 py-3 my-1 mr-4 bg-white placeholder-gray-400 rounded focus:outline-none focus:z-10 sm:text-sm
                                            ${errors.ano ? 'text-red-600' : ''}`}
                                        >
                                            <option disabled value="" className="text-gray-400">Selecione o combustivel</option>
                                            {
                                                combustiveis.map((combustivel: any) => (
                                                    <option key={combustivel.id} value={combustivel.id}>{combustivel.nome}</option>
                                                ))
                                            }
                                        </select>
                                    </div>


                                    <div className="w-1/2 px-2">
                                        <label>Tipo Transmissão</label>
                                        <select
                                            {...register('tipo_transmissao_veiculo_id')}
                                            id="tipo_transmissao_veiculo_id"
                                            name="tipo_transmissao_veiculo_id"
                                            defaultValue={modeloSelecionado?.tipo_transmissao_veiculo_id ?? ''}
                                            className={`appearance-none relative block w-full border px-3 py-3 my-1 mr-4 bg-white placeholder-gray-400 rounded focus:outline-none focus:z-10 sm:text-sm
                                            ${errors.tipo_transmissao_veiculo_id ? 'text-red-600' : ''}`}
                                        >
                                            <option disabled value="" className="text-gray-400">Selecione o tipo de transmissão</option>
                                            {
                                                tiposTransmissoes.map((tipoTransmissao: any) => (
                                                    <option key={tipoTransmissao.id} value={tipoTransmissao.id}>{tipoTransmissao.nome}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="w-1/2 px-2">
                                        <label>Tipo veículo</label>
                                        <select
                                            {...register('tipo_veiculo_id')}
                                            id="tipo_veiculo_id"
                                            name="tipo_veiculo_id"
                                            defaultValue={modeloSelecionado?.tipo_veiculo_id ?? ''}
                                            className={`appearance-none relative block w-full border px-3 py-3 my-1 mr-4 bg-white placeholder-gray-400 rounded focus:outline-none focus:z-10 sm:text-sm
                                            ${errors.tipo_veiculo_id ? 'text-red-600' : ''}`}
                                        >
                                            <option disabled value="" className="text-gray-400">Selecione o ano do veiculo</option>
                                            {
                                                tiposVeiculos.map((tipoVeiculo: any) => (
                                                    <option key={tipoVeiculo.id} value={tipoVeiculo.id}>{tipoVeiculo.nome}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="w-1/2 px-2">
                                        <label>Valor</label>
                                        <input
                                            {...register('preco')}
                                            id="preco"
                                            name="preco"
                                            type="text"
                                            autoComplete="off"
                                            required
                                            defaultValue={formataMoeda(modeloSelecionado?.preco) ?? ''}
                                            className={`appearance-none relative block w-full border px-3 py-3 my-1 mr-4 bg-white placeholder-gray-400 rounded focus:outline-none focus:z-10 sm:text-sm
                                            ${errors.nome ? 'border-red-600 focus:border-red-600' : ''}`}
                                            placeholder="Preço"
                                            onKeyUp={handleKeyUp}
                                        />
                                        <small className="text-red-600">{errors.preco?.message}</small>
                                    </div>
                                    <div className="w-full" {...getRootProps()}>
                                        <label className="block text-sm font-medium text-gray-700">Foto do modelo</label>
                                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6">
                                            <div className="space-y-1 text-center">
                                                <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Envie uma foto do modelo
                                                        </span>
                                                        <input {...getInputProps()} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        {
                                            acceptedFiles.map(file => (
                                                <li key={file.name}>
                                                    {file.name}
                                                </li>
                                            ))
                                        }
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-between md:justify-end py-6 rounded-b">
                                    <Button type="button" labelName="Sair" color="bg-gray-100" dimension="w-1/2 md:w-1/3" hover="" onClick={() => { setOpenModal(false) }} isLoading={false} />
                                    <Button type="submit" className="text-white ml-2" labelName="Salvar" color="bg-gray-800" dimension="w-1/2 md:w-1/3" hover="hover:bg-green-dark" isLoading={false} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}