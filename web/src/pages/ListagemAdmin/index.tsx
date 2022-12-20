import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { parseCookies } from 'nookies'
import { useAuth } from '../../contexts/auth/useAuth'
import Logo from '../../assets/Logo.png';
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar, MagnifyingGlass } from "phosphor-react";
import { Api } from '../../services/api'
import { Pagination, ResponseRequestModelos, Modelo, TipoVeiculo, Combustivel, Marca, TipoTransmissaoVeiculo, } from './types'
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { formataMoeda } from '../../services/formatting'
import { ModalNovoModelo } from '../../components/Modais/NovoModelo/modalNovoModelo';

export function ListagemAdmin() {
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modeloSelecionado, setModeloSelecionado] = useState<Modelo|null>(null);
  const [pesquisa, setPesquisa] = useState("");
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [tiposVeiculos, setTiposVeiculos] = useState<TipoVeiculo[]>([]);
  const [combustiveis, setCombustiveis] = useState<Combustivel[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [tiposTransmissoes, setTiposTransmissoes] = useState<TipoTransmissaoVeiculo[]>([]);

  const [pagination, setPagination] = useState<Pagination>({ page: 1, perpage: 10, pages: 1 } as Pagination)
  let [startDate, endDate] = [moment().subtract('months', 2).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];

  useEffect(() => {
    if(!showModal)
      buscarVeiculos();
  }, [showModal]);

  useEffect(() => {
    buscarParametros();
  }, []);

  async function buscarVeiculos() {
    await Api.get<ResponseRequestModelos>(`/modelo/buscar-todos?order_by=created_at&pagination[page]=${pagination.page}&pagination[perpage]=${pagination.perpage}&pesquisa=${pesquisa}`).then(({ data }) => {
      setModelos(data.data);
      setPagination(data.meta);
    });

    // if (localStorage.getItem('dados-novo-veiculo')) {
    // const { tiposVeiculos, combustiveis, marcas, tiposTransmissoes } = JSON.parse(localStorage.getItem('dados-novo-veiculo') ?? "{}");
    // } else {
  }

  async function buscarParametros() {
    await Api.get<any>(`/buscar-parametros-veiculo-novo`).then(({ data }) => {
      let { tiposVeiculos, combustiveis, marcas, tiposTransmissoes } = data;

      setTiposVeiculos(tiposVeiculos);
      setCombustiveis(combustiveis);
      setMarcas(marcas);
      setTiposTransmissoes(tiposTransmissoes);
    });
  }

  async function updatePage(page: number) {
    pagination.page = page;
    setPagination(pagination);
    buscarVeiculos();
  }

  async function pesquisar() {
    buscarVeiculos();
  }

  function selecionarModelo (id:number|null) {
    let modelo = modelos.find((modelo) => modelo.id == id);

    if(!modelo)
      setModeloSelecionado(null);
    else
      setModeloSelecionado(modelo);
    
    setShowModal(true)
  }
  return (
    <div>
      <ToastContainer />
      {/* <Toast message="ete" messageType="teste" visible={true} /> */}
      <div className='absolute top-0 w-screen h-44 bg-gray-1 z-10'></div>
      <div className="bg-gray-2 absolute top-0 h-full w-full"></div>

      <div className="z-20 absolute top-0 w-full bg-white">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-32"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {/* <a
                        key="1"
                        href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        teste
                      </a> */}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}

                      <button
                        type="button"
                        className="group py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-default hover:bg-green-dark focus:ring-green-light"
                        onClick={() => selecionarModelo(null)}
                      >
                        Novo Modelo
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded-full"
                                  // src={user?.avatar_url}
                                  alt=""
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              show={open}
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                <Menu.Item>
                                  <a
                                    href="#"
                                    onClick={auth.logout}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                  >
                                    Sair
                                  </a>
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    <button
                      type="button"
                      className="group py-2 px-4 mr-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-default hover:bg-green-dark focus:ring-green-light"
                      onClick={() => setShowModal(true)}
                    >
                      Nova Transação
                    </button>

                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                {/* <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"> */}
                {/* <a
                  key="1"
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  teste
                </a> */}
                {/* </div> */}
                <div className="pt-4 pb-3 border-t border-gray-700">
                  {/* <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        // src={user?.avatar_url}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">Diego Fernandes</div>
                      <div className="text-sm font-medium leading-none text-gray-400">diego@rocketseat.com.br</div>
                    </div>
                    <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div> */}
                  <div className="mt-3 px-2 space-y-1">
                    <a
                      href="#"
                      onClick={auth.logout}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      Sair
                    </a>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className="max-w-7xl mx-auto py-10 px-4 lg:px-8">
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-auto">
              {
                transactionsType.map((transactionType) => (
                  <div key={transactionType.id} className={`flex justify-between rounded bg-gray-4 p-5 h-32 ${transactionType.id == 3 ? 'bg-green-dark' : ''}`}>
                    <div className="flex flex-col justify-between">
                      <span className='text-white text-lg'>
                        {transactionType.description}
                      </span>
                      <span className='text-white text-3xl font-bold'>{formataMoeda(transactionType.total)}</span>
                    </div>
                    {
                      transactionType.id == 1 ?
                        <ArrowCircleUp className='w-8 h-8 text-green-light' /> : transactionType.id == 2 ?
                          <ArrowCircleDown className='w-8 h-8 text-red-default' /> :
                          <CurrencyDollar className='w-8 h-8 text-white' />
                    }
                  </div>
                ))
              }
            </div> */}

            <div className="flex justify-between items-center mt-14">
              <input
                // {...register('email')}
                id="pesquisa"
                name="pesquisa"
                type="text"
                autoComplete="off"
                onInput={(text) => { setPesquisa(text.currentTarget.value); pesquisar() }}
                required
                className="appearance-none relative block w-full border px-3 py-3 my-3 mr-4 bg-white placeholder-gray-400 rounded focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Busque por nome ou marca"
              />

              {/* <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-5 rounded inline-flex items-center border border-green-dark"
                onClick={pesquisar}>
                <MagnifyingGlass className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className='hidden md:block'>Pesquisar</span>
              </button> */}

            </div>

            <div>
              <div className="items mb-8 mt-3 ">
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr className='text-center'>
                        <th>Nome</th>
                        <th>Hodometro</th>
                        <th>Ano</th>
                        <th>Combustivel</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        modelos.map((modelo) => (
                          <tr className='text-center' key={modelo.id}>
                            <td>{modelo.nome}</td>
                            <td>{modelo.hodometro} Km</td>
                            <td>{modelo.ano}</td>
                            <td>{modelo.combustivel?.nome}</td>
                            <td>
                            <button className="bg-blue-500 rounded p-1 text-white hover:bg-blue-600 mr-1" onClick={() => selecionarModelo(modelo.id)}>
                                <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </button>
                              <button className="bg-red-700 rounded p-1 text-white hover:bg-red-800 ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>


              </div>
              <div className="flex items-center justify-between border-t border-gray-1 rounded bg-gray-1 px-4 py-3 sm:px-6">
                {/* <div className="flex flex-1 justify-between sm:hidden">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </a>
                </div> */}
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">
                      <span className="font-medium"></span>
                      Mostrando {(pagination.page * pagination.perpage) - pagination.perpage} até {pagination.page * pagination.perpage} de {pagination.total} registros
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      {/* <a
                        href="#"
                        className="relative inline-flex items-center rounded-l-md bg-gray-3 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-green-dark hover:text-white focus:z-20"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                      </a> */}
                      {
                        [...Array(pagination.pages).values()].map((value, index) => (
                          <a key={index}
                            href="#"
                            onClick={() => { updatePage(index + 1) }}
                            aria-current="page"
                            className={`relative z-10 inline-flex items-center ${pagination.page == index + 1 ? 'bg-green-dark' : 'bg-gray-3'} px-4 py-2 text-sm font-medium text-white focus:z-20`}
                          >
                            {index + 1}
                          </a>
                        ))
                      }
                      {/* <a
                        href="#"
                        className="relative inline-flex items-center rounded-r-md bg-gray-3 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-green-dark hover:text-white focus:z-20"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                      </a> */}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showModal && <ModalNovoModelo setOpenModal={setShowModal}
        title="Novo Modelo" tiposVeiculos={tiposVeiculos} combustiveis={combustiveis} marcas={marcas}
        tiposTransmissoes={tiposTransmissoes} modeloSelecionado={modeloSelecionado} />}
    </div>
  )
}