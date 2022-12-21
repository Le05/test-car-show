import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { Api } from '../../services/api'
import { Modelo } from '../ListagemAdmin/types'

export function Home() {
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [pesquisa, setPesquisa] = useState("");

    const navigation = [
        { name: 'Comprar', href: '#', current: true },
        { name: 'Vender', href: '#', current: false },
        // { name: 'Projects', href: '#', current: false },
        // { name: 'Calendar', href: '#', current: false },
    ]

    function classNameNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        buscarVeiculos();
    }, []);

    async function buscarVeiculos() {
        await Api.get<Modelo[]>(`/buscar-veiculos`,{
            params:{
                'pesquisa':pesquisa
            }
        }).then(({ data }) => {
            setModelos(data);
        });
    }

    async function pesquisar() {
        buscarVeiculos();
      }

    

    return (
        <div className='bg-gray-50'>
            <Disclosure as="nav" className="bg-gray-800 border-b border-blue-700">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="block h-10 w-auto lg:hidden"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                        <img
                                            className="hidden h-10 w-auto lg:block"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                            <Link
                                                to="/login"
                                                className="text-white hover:text-gray-300 flex px-1 py-2 rounded-md text-base font-medium"

                                            >
                                                <span className="mr-1">Entrar</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                                <Link
                                    to="/login"
                                    className="text-gray-300 hover:text-gray-700 flex px-3 py-2 rounded-md text-base font-medium"

                                >
                                    <span className="mr-1">Entrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </Link>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <div className='flex justify-center'>
                <div className="relative text-gray-600 w-full mx-3 md:mx-0 md:w-1/2 rounded shadow px-5 py-1 border my-12 bg-white">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <div>
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </span>
                    <input  onInput={(text) => { setPesquisa(text.currentTarget.value); pesquisar() }} type="text" name="pesquisa" autoComplete='off' className="py-2 w-full rounded-md pl-5 focus:outline-none "
                        placeholder="Digite a marca ou modelo ..." />
                </div>
            </div>

            <div className='mx-auto max-w-7xl p-3 lg:p-0'>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    {
                        modelos.map((modelo) => (
                            <div key={modelo.id} className='w-full shadow-lg rounded-b bg-white'>
                                <img className='w-full' src={"http://127.0.0.1:8000/storage"+modelo.imagem_url} alt="" />
                                <div className='p-3'>
                                    <div className='flex justify-between items-center'>
                                        <div className='w-3/4 flex flex-col'>
                                            <span className='font-bold text-base'>{modelo.nome} ({modelo.ano})</span>
                                            <span className='text-sm text-gray-400'>{modelo?.tipo_veiculo?.nome}</span>
                                        </div>
                                        {/* <span className='rounded border border-red-400 px-1 text-sm text-red-400 w-1/4'>Promoção</span> */}
                                    </div>
                                    <div className='grid grid-cols-2 mt-3 gap-2'>

                                        <div className='flex flex-col items-center justify-between p-2'>
                                            <svg className='h-12 w-12' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                viewBox="0 0 460 460">
                                                <g>
                                                    <path d="M95.252,283.11c-13.807,0-25.039,11.232-25.039,25.039s11.232,25.039,25.039,25.039s25.039-11.233,25.039-25.039
                                                S109.059,283.11,95.252,283.11z M95.252,318.188c-5.536,0-10.039-4.504-10.039-10.039s4.503-10.039,10.039-10.039
                                                s10.039,4.503,10.039,10.039S100.788,318.188,95.252,318.188z"/>
                                                    <path d="M357.012,283.11c-13.807,0-25.04,11.232-25.04,25.039s11.233,25.039,25.04,25.039c13.806,0,25.038-11.233,25.038-25.039
                                                S370.818,283.11,357.012,283.11z M357.012,318.188c-5.536,0-10.04-4.504-10.04-10.039s4.504-10.039,10.04-10.039
                                                c5.535,0,10.038,4.503,10.038,10.039S362.547,318.188,357.012,318.188z"/>
                                                    <path d="M409.227,196.421l-66.917-7.645l-35.714-58.056c-10.905-17.728-30.61-28.741-51.424-28.741H133.676
                                                c-34.925,0-65.792,23.518-75.063,57.193l-0.948,3.445c-4.607,16.733-17.845,30.052-34.549,34.762
                                                C9.506,201.217,0,213.773,0,227.914v83.012c0,4.142,3.358,7.5,7.5,7.5h38.557c4.757,22.798,25.006,39.978,49.195,39.978
                                                s44.438-17.18,49.195-39.978h163.37c4.757,22.798,25.006,39.978,49.195,39.978s44.438-17.18,49.195-39.978h40.477
                                                c3.813,0,7.02-2.861,7.452-6.65l5.874-51.483C463.614,228.69,440.834,200.037,409.227,196.421z M15,294.313h31.949
                                                c-0.843,2.938-1.43,5.983-1.724,9.113H15V294.313z M95.252,343.404c-19.44,0-35.255-15.815-35.255-35.255
                                                s15.815-35.256,35.255-35.256s35.255,15.816,35.255,35.256S114.692,343.404,95.252,343.404z M357.012,343.404
                                                c-19.44,0-35.255-15.815-35.255-35.255s15.815-35.256,35.255-35.256s35.255,15.816,35.255,35.256S376.452,343.404,357.012,343.404z
                                                M357.012,257.893c-16.987,0-32.021,8.48-41.122,21.42H182.425c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h126.284
                                                c-0.843,2.938-1.43,5.983-1.724,9.113H145.279c-2.389-25.504-23.909-45.533-50.027-45.533c-16.987,0-32.021,8.48-41.122,21.42H15
                                                v-51.399c0-7.455,5.012-14.075,12.187-16.098c21.728-6.126,38.947-23.452,44.94-45.218l0.948-3.445
                                                c7.484-27.186,32.405-46.174,60.601-46.174h121.496c15.643,0,30.452,8.277,38.647,21.6l37.626,61.164
                                                c1.207,1.962,3.249,3.26,5.537,3.522l70.541,8.059c16.002,1.831,28.943,12.335,34.67,26.276h-23.413c-4.142,0-7.5,3.358-7.5,7.5
                                                s3.358,7.5,7.5,7.5h26.578c0.052,1.975-0.023,3.975-0.253,5.993l-2.364,20.72h-44.608
                                                C389.033,266.373,373.998,257.893,357.012,257.893z M407.038,303.426c-0.293-3.13-0.881-6.175-1.724-9.113h35.716l-1.04,9.113
                                                H407.038z"/>
                                                    <path d="M255.565,215.222h-15.76c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h15.76c4.142,0,7.5-3.358,7.5-7.5
                                                S259.708,215.222,255.565,215.222z"/>
                                                    <path d="M154.846,222.722c0-4.142-3.358-7.5-7.5-7.5h-15.76c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h15.76
                                                C151.488,230.222,154.846,226.864,154.846,222.722z"/>
                                                    <path d="M164.136,283.941c-1.314-3.113-4.658-5.069-8.025-4.546c-3.049,0.474-5.522,2.768-6.213,5.776
                                                c-1.496,6.51,6.051,11.564,11.54,7.829C164.343,291.024,165.476,287.186,164.136,283.941
                                                C163.946,283.491,164.326,284.401,164.136,283.941z"/>
                                                    <path d="M286.014,143.391c-6.531-10.637-18.348-17.245-30.841-17.245h-121.5c-24.087,0-45.371,16.217-51.761,39.443l-0.943,3.438
                                                c-2.468,8.956-6.268,24.34-6.429,24.991c-0.553,2.238-0.045,4.606,1.376,6.422c1.422,1.815,3.599,2.876,5.905,2.876h227.64
                                                c2.717,0,5.222-1.469,6.547-3.841c1.326-2.372,1.265-5.275-0.159-7.589L286.014,143.391z M199.352,141.145v47.169h-69.054v-47.018
                                                c1.115-0.098,2.24-0.151,3.375-0.151H199.352z M95.432,173.002l0.944-3.441c2.86-10.395,9.865-18.839,18.922-23.747v42.499H91.432
                                                C92.697,183.321,94.242,177.323,95.432,173.002z M214.352,188.314v-47.169h40.821c7.316,0,14.235,3.868,18.062,10.1l22.807,37.069
                                                H214.352z"/>
                                                </g>
                                            </svg>
                                            <span className='text-sm'>{modelo.tipo_veiculo?.nome}</span>
                                        </div>

                                        <div className='flex flex-col items-center justify-between bg-white p-2'>
                                            <svg className='h-12 w-12' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                viewBox="0 0 512 512">
                                                <g>
                                                    <g>
                                                        <path d="M281.6,51.2H102.4c-14.14,0-25.6,11.46-25.6,25.6v128c0,14.14,11.46,25.6,25.6,25.6h179.2c14.14,0,25.6-11.46,25.6-25.6
                v-128C307.2,62.66,295.74,51.2,281.6,51.2z M281.6,204.8H102.4v-128h179.2V204.8z"/>
                                                    </g>
                                                </g>
                                                <g>
                                                    <g>
                                                        <path d="M402.423,39.697c-6.272-3.021-14.003-0.503-17.126,5.871c-3.098,6.323-0.478,14.003,5.871,17.126
                c12.297,6.033,27.785,15.505,41.088,26.121c-0.256-0.051-0.657-0.145-0.888-0.196c-7.074-1.476-13.679,3.123-15.053,10.052
                c-1.374,6.946,3.123,13.679,10.052,15.053c14.942,2.978,31.479,9.83,34.398,14.157c0.008,0.043,0.034,0.077,0.034,0.119v217.6
                c0,14.123-11.477,25.6-25.6,25.6c-14.123,0-25.6-11.477-25.6-25.6V166.4c0-28.228-22.972-51.2-51.2-51.2V25.6
                c0-14.14-11.46-25.6-25.6-25.6H51.2C37.06,0,25.6,11.46,25.6,25.6v460.8c0,14.14,11.46,25.6,25.6,25.6h281.6
                c14.14,0,25.6-11.46,25.6-25.6V140.8c14.123,0,25.6,11.477,25.6,25.6v179.2c0,28.228,22.972,51.2,51.2,51.2s51.2-22.972,51.2-51.2
                V128C486.4,82.15,411.025,43.904,402.423,39.697z M332.8,486.4H51.2V25.6h281.6V486.4z"/>
                                                    </g>
                                                </g></svg>
                                            <span className='mt-2 text-sm'>{modelo.combustivel?.nome}</span>
                                        </div>

                                        <div className='flex flex-col items-center justify-between bg-white p-2'>
                                            <svg className='h-12 w-12' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512">
                                                <g>
                                                    <path d="M242.105,115.922L242.105,115.922h-0.006V96.015V56.188h0.006h16.804v59.734h-0.018v0.012l-8.391-0.012H242.105z
                                                    M39.555,317.098l41.919-7.389l16.908-2.979v-0.012h0.006l-1.478-8.334l-1.442-8.193h-0.006v-0.012l-58.83,10.368L39.555,317.098z
                                                    M411.266,169.234l-30.228,17.437v0.012l0,0l4.663,8.086l3.735,6.452l0,0l51.731-29.864l-8.405-14.549L411.266,169.234z
                                                    M150.24,390.923l-6.623-5.556l0,0l0,0l-38.402,45.749l12.879,10.805l16.71-19.919l21.687-25.842l0,0L150.24,390.923z
                                                    M432.562,386.81l8.394-14.559l-18.046-10.421l-33.673-19.458v0.012l0,0l-4.641,8.027l-3.753,6.514l0,0v0.012L432.562,386.81z
                                                    M36.703,242.282l20.98,3.686l37.84,6.69v-0.012h0.006l2.5-14.215l0.405-2.329v-0.012l-58.827-10.382L36.703,242.282z
                                                    M461.04,226.158l-15.989,2.813l-42.841,7.542v0.012h-0.006l2.163,12.256l0.757,4.279l0,0v0.012l58.836-10.367L461.04,226.158z
                                                    M189.346,128.104v0.012l13.636-4.974l2.143-0.78h0.006l-20.422-56.14l-15.791,5.757l2.911,8.003L189.346,128.104L189.346,128.104z
                                                    M67.814,386.431l51.725-29.86v-0.012l0,0l-6.469-11.201l-1.93-3.346l0,0l0,0l-51.734,29.861l8.402,14.552h0.006V386.431z
                                                    M343.782,396.432l38.396,45.773L395.04,431.4v-0.012l-38.385-45.762v0.012v-0.012l-8.931,7.495L343.782,396.432L343.782,396.432z
                                                    M59.625,170.992L59.625,170.992l51.731,29.876l0,0l7.276-12.613l1.12-1.936v-0.012l-51.731-29.864L59.625,170.992z
                                                    M463.877,300.973L463.877,300.973l-58.824-10.379l-0.626,3.547l-2.294,13.004l58.83,10.379L463.877,300.973z M118.408,101.05
                                                    l-12.868,10.802l14.109,16.81l24.291,28.948l0,0l0,0l7.601-6.384l5.26-4.412l0,0l0.006-0.012L118.408,101.05z M311.249,80.203
                                                    L295.846,122.5l0.012,0.012l0,0l10.521,3.818l5.261,1.912l0,0h0.006l20.434-56.126l-15.794-5.742L311.249,80.203z M353.712,155.154
                                                    l3.263,2.731l0,0l0,0l38.402-45.767l-12.873-10.79h-0.006l0,0l-38.396,45.752l0,0v0.012L353.712,155.154z M250.507,27.021
                                                    C112.382,27.021,0,139.394,0,277.531c0,79.57,37.333,150.535,95.361,196.462h25.36C57.036,431.778,14.939,359.49,14.939,277.531
                                                    c0-129.896,105.673-235.568,235.567-235.568c129.898,0,235.571,105.672,235.571,235.568c0,81.959-42.097,154.247-105.785,196.462
                                                    h25.363c58.02-45.927,95.358-116.892,95.358-196.462C501.015,139.399,388.633,27.021,250.507,27.021z M201.607,387.234
                                                    c5.255,0,7.876-5.236,7.876-15.698c0-10.829-2.568-16.255-7.713-16.255c-5.423,0-8.139,5.503-8.139,16.521
                                                    C193.631,382.093,196.294,387.234,201.607,387.234z M179.152,336.71h44.553v69.699h-44.553V336.71z M189.177,372.009
                                                    c0,6.124,1.052,10.793,3.165,14.032c2.11,3.233,5.048,4.858,8.819,4.858c4.031,0,7.164-1.702,9.41-5.083
                                                    c2.246-3.398,3.372-8.299,3.372-14.735c0-12.986-3.978-19.482-11.931-19.482c-4.158,0-7.33,1.708-9.531,5.172
                                                    C190.276,360.211,189.177,365.294,189.177,372.009z M229.56,336.71h43.754v69.699H229.56V336.71z M241.053,389.327
                                                    c1.738,1.04,4.359,1.572,7.874,1.572c4.17,0,7.459-1.123,9.847-3.369s3.594-5.213,3.594-8.89c0-3.547-1.111-6.348-3.334-8.394
                                                    c-2.233-2.033-5.378-3.062-9.445-3.062c-0.993,0-2.065,0.035-3.233,0.106v-11.136h14.287v-3.925h-18.403V371.3
                                                    c2.92-0.213,4.909-0.319,5.964-0.319c3.136,0,5.538,0.697,7.214,2.092c1.679,1.396,2.524,3.346,2.524,5.828
                                                    c0,2.519-0.822,4.527-2.471,6.053c-1.646,1.525-3.807,2.281-6.493,2.281c-2.689,0-5.326-0.839-7.93-2.518v4.61H241.053z
                                                    M277.848,336.71h44.006v69.699h-44.006V336.71z M288.788,372.009c0,6.124,1.053,10.793,3.168,14.032
                                                    c2.11,3.233,5.049,4.858,8.819,4.858c4.031,0,7.17-1.702,9.41-5.083c2.246-3.398,3.369-8.299,3.369-14.735
                                                    c0-12.986-3.984-19.482-11.935-19.482c-4.154,0-7.329,1.708-9.533,5.172C289.888,360.211,288.788,365.294,288.788,372.009z
                                                    M301.225,387.234c5.249,0,7.879-5.236,7.879-15.698c0-10.829-2.571-16.255-7.714-16.255c-5.426,0-8.139,5.503-8.139,16.521
                                                    C293.245,382.093,295.905,387.234,301.225,387.234z M257.815,300.725c-1.052,0-1.974,0.379-2.943,0.58L140.064,200.018
                                                    L242.191,314.97c-0.068,0.579-0.358,1.1-0.358,1.673c0,8.849,7.144,16,15.982,16c8.784,0,15.924-7.151,15.924-16
                                                    C273.751,307.877,266.6,300.725,257.815,300.725z"/>
                                                </g></svg>
                                            <span className='mt-2 text-sm'>{modelo.hodometro} KM</span>
                                        </div>

                                        <div className='flex flex-col items-center justify-between bg-white p-2'>
                                            <svg className='h-12 w-12' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                viewBox="0 0 512 512">
                                                <g transform="translate(1 1)">
                                                    <g>
                                                        <path d="M502.467,186.733h-34.133c-3.413,0-6.827,2.56-7.68,5.973l-23.893,70.827h-23.04l-23.04-38.4
                                                        c-1.707-2.56-4.267-4.267-7.68-4.267h-34.133v-25.6c0-5.12-3.413-8.533-8.533-8.533H280.6V152.6h25.6
                                                        c5.12,0,8.533-3.413,8.533-8.533v-51.2c0-5.12-3.413-8.533-8.533-8.533H152.6c-5.12,0-8.533,3.413-8.533,8.533v51.2
                                                        c0,5.12,3.413,8.533,8.533,8.533h25.6v34.133h-68.267c-2.56,0-4.267,0.853-5.973,2.56s-2.56,3.413-2.56,5.973v25.6H41.667
                                                        c-5.12,0-8.533,3.413-8.533,8.533v51.2H16.067V255c0-5.12-3.413-8.533-8.533-8.533S-1,249.88-1,255v68.267
                                                        c0,5.12,3.413,8.533,8.533,8.533s8.533-3.413,8.533-8.533v-25.6h17.067v68.267c0,5.12,3.413,8.533,8.533,8.533h64l31.573,47.787
                                                        c1.707,1.707,4.267,3.413,6.827,3.413H383c3.413,0,5.973-1.707,7.68-5.12l23.04-46.08h23.893l23.04,46.08
                                                        c1.707,3.413,4.267,5.12,7.68,5.12h34.133c5.12,0,8.533-3.413,8.533-8.533V195.267C511,190.147,507.587,186.733,502.467,186.733z
                                                        M161.133,101.4h136.533v34.133h-25.6h-85.333h-25.6V101.4z M195.267,152.6h68.267v34.133h-68.267V152.6z M50.2,357.4V237.933
                                                        h51.2V357.4H50.2z M377.027,408.6H148.333l-29.867-45.204V229.4v-25.6h68.267h85.333H331.8v25.6c0,5.12,3.413,8.533,8.533,8.533
                                                        h37.547l22.187,36.978v87.609L377.027,408.6z M417.133,357.4v-76.8H434.2v76.8H417.133z M493.933,408.6h-20.48l-22.187-42.789
                                                        v-93.714l23.04-68.297h19.627V408.6z"/>
                                                    </g>
                                                </g>
                                            </svg>
                                            <span className='mt-2 text-sm'>{modelo.tipo_transmissao?.nome}</span>
                                        </div>

                                    </div>
                                    <div className='mt-5 flex justify-between items-center'>
                                        <span className='text-2xl font-medium'>R$ {(modelo.preco / 100).toLocaleString()}</span>
                                        <button className='py-2 px-4 bg-gray-700 hover:bg-gray-800 rounded text-white'>Ver detalhes</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    );
}